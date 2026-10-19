#!/usr/bin/env node
// The company's event log (company/ops/events.jsonl): append-only, the source for HQ (/hq).
// Schema and rooms: company/ops/events.md.
//
//   node tools/events.mjs add --type=T --room=R --actor=A --summary="…" [--agent=L] [--subjects=a,b]
//                             [--refs=p1,p2] [--state=S] [--body="…" | --body-file=path | --body-file=- (stdin)]
//                             [--id=I] [--source=S] [--chooser=C] [--tool-use-id=T]   (written by .claude/hooks/agent-events.mjs)
//                             [--class=decision|correction|routing] [--minutes=N]   (type founder; metrics.md §C)
//                             [--accepted=library|opfix]                            (an accepted outcome; metrics.md §C)
//   node tools/events.mjs backfill [--transcripts=<dir>]   git history + session transcripts (idempotent)
//            [--types=stopped,usage] [--since=<ISO>] [--dry]  only those types / from that time; --dry counts, writes nothing
//   node tools/events.mjs add … --spool      append to the hook spool instead of the log (tools/lib/events-spool.mjs)
//   node tools/events.mjs fold [--dry]        fold the spool into the log (dedupe by id) and empty it; chief of staff, before an events commit
//                                             one fold at a time (<spool>/fold.lock); exit 2 when a live fold holds it (F1)
//   node tools/events.mjs report  --agent=L --actor=ROLE --summary="…" [--key=K] [--room=R] [--refs=…] [--body…]
//   node tools/events.mjs stopped --agent=L --actor=ROLE --summary="…" [--key=K] …
//            hand-written report / stopped event (state done / stopped; room from the actor). --key names the run:
//            its tool-use id, the ·xxxx suffix of its label, or batch=<file>#B<n> (tools/lib/inflight.mjs). When the
//            event would close no open dispatch, it is still written and a warning names the nearest open ones (r5 B2).
//            `add` takes --key too (written as the event's `key` field).
//   node tools/events.mjs tail [n]
//
// S3_EVENTS=<file> points every command at another log (tests, fixtures); default company/ops/events.jsonl.
// S3_SPOOL=<dir> points at another spool; see tools/lib/events-spool.mjs for how the spool is found.
// Unparseable lines are skipped and counted on stderr, never thrown (E1).

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mergeById, readJsonlFile, readSpool, spoolDir, spoolFileFor, spoolFiles } from "./lib/events-spool.mjs";
import { ageText, keyArg, nearest, q as shq, replay } from "./lib/inflight.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOG = process.env.S3_EVENTS ? path.resolve(process.env.S3_EVENTS) : path.join(ROOT, "company/ops/events.jsonl");
const rel = (f) => { const r = path.relative(ROOT, f); return !r || r.startsWith("..") ? f : r; };
const hash = (s, n = 10) => crypto.createHash("sha1").update(s).digest("hex").slice(0, n);

// E1 (company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md): an unparseable line (a merge conflict
// marker, a torn write) is skipped and counted, never thrown, so one bad line cannot stop every later write.
// The count goes to stderr, where the agent-events hook log and the caller see it.
function readFile(file) {
  const r = readJsonlFile(file);
  if (r.bad.length) {
    process.stderr.write(`events: ${r.bad.length} unreadable line(s) skipped in ${rel(file)}\n`);
  }
  return r.events;
}
const readLog = () => readFile(LOG);

// Appends events whose id is not yet in `file` (default the log). Returns the number written.
function append(events, file = LOG, alsoHave = []) {
  const have = new Set([...readFile(file), ...alsoHave].map((e) => e.id));
  const fresh = events.filter((e) => !have.has(e.id) && (have.add(e.id), true));
  if (!fresh.length) return 0;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, fresh.map((e) => JSON.stringify(e)).join("\n") + "\n");
  return fresh.length;
}

// ------------------------------------------------------------------ fold (ruling H2; F1 and F2 of e1c9162)

/** True when `pid` is a running process (EPERM: it runs, under another user). */
export function pidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return e.code === "EPERM";
  }
}
const sleepMs = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
// The pid in a lock file: null when the file is gone, NaN when it holds no pid. An empty file may be a lock created a
// moment ago whose pid is not written yet, so an empty or garbled read is retried once after 50 ms.
function readPid(f) {
  const once = () => {
    try {
      const t = fs.readFileSync(f, "utf8").trim();
      return /^\d+$/.test(t) ? Number(t) : NaN;
    } catch (e) {
      if (e.code === "ENOENT") return null;
      throw e;
    }
  };
  const v = once();
  if (!Number.isNaN(v)) return v;
  sleepMs(50);
  return once();
}
// Create `f` holding our pid, exclusively. true = created; false = it exists.
function createExclusive(f) {
  try {
    const fd = fs.openSync(f, "wx");
    fs.writeSync(fd, String(process.pid));
    fs.closeSync(fd);
    return true;
  } catch (e) {
    if (e.code === "EEXIST") return false;
    throw e;
  }
}

export const FOLD_LOCK = "fold.lock";

/**
 * F1: one fold at a time. `<spool>/fold.lock` is created with O_EXCL and holds the folder's pid. A lock held by a
 * live pid is refused (error code EFOLDLOCKED, with the pid). A lock whose pid is dead (or whose content is not a pid
 * after a grace moment for a lock being written) is taken over, but only inside `fold.lock.takeover`, a second
 * O_EXCL file, so two folds that both find the same dead lock cannot both take it: the one that gets the takeover
 * file re-reads the lock, removes it only if it still holds the dead pid, and creates its own. A takeover file whose
 * pid is dead is removed the same way on the next try; a live one means another fold is taking over, so we refuse.
 * Returns release(), which removes the lock only if it still holds our pid.
 */
export function acquireFoldLock(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const lock = path.join(dir, FOLD_LOCK);
  const takeover = `${lock}.takeover`;
  const refuse = (pid, what = "a fold") => {
    const err = new Error(`fold: ${what} is already running (pid ${pid}, ${rel(lock)}); not folding. Run it again when that one has finished.`);
    err.code = "EFOLDLOCKED";
    err.pid = pid;
    return err;
  };
  for (let attempt = 0; attempt < 5; attempt++) {
    if (createExclusive(lock)) {
      return () => {
        if (readPid(lock) === process.pid) fs.rmSync(lock, { force: true });
      };
    }
    const held = readPid(lock);
    if (held === null) continue; // released between our two calls: try again
    if (pidAlive(held)) throw refuse(held);
    // The lock is stale (dead pid, or no pid): take it over under the takeover file.
    if (!createExclusive(takeover)) {
      const t = readPid(takeover);
      if (t !== null && pidAlive(t)) throw refuse(t, "a fold taking over a stale lock");
      if (t !== null && Object.is(readPid(takeover), t)) fs.rmSync(takeover, { force: true }); // its taker died
      continue;
    }
    try {
      // Remove the lock only if it still is the stale one we judged; a fold that took it meanwhile keeps it.
      if (Object.is(readPid(lock), held)) fs.rmSync(lock, { force: true });
    } finally {
      fs.rmSync(takeover, { force: true });
    }
  }
  throw refuse(readPid(lock), "a fold (lock could not be taken after 5 tries)");
}

/**
 * Fold the spool into the log (ruling H2), holding the fold lock (F1). Each active spool file is renamed to
 * *.folding-<pid> first, so hook writes that arrive during the fold start a new file. A *.folding-<pid> file is
 * adopted only when that pid is dead (a fold that died); a live pid's file is left alone and counted in `skipped`.
 * Events are appended in ts order, deduped by id against the log. F2: an append that opened a file just before the
 * rename can land in the renamed file after it was read, so each renamed file is re-read after the append, once it
 * has stopped growing for `settleMs`, and any id not yet folded is appended before the file is removed. (Writers
 * through `events.mjs add --spool` also re-append when their file was renamed under them; see spoolAppend.)
 * Unparseable spool lines are kept in <spool>/unparsed-<stamp>.txt for a person to look at.
 * Returns { folded, duplicates, unparsed, files, late, skipped }.
 */
export function fold({ log = LOG, dir = spoolDir(), dry = false, settleMs = 100 } = {}) {
  const files = spoolFiles(dir);
  if (dry) {
    const s = readSpool(dir);
    const have = new Set(readFile(log).map((e) => e.id));
    const fresh = new Set(s.events.filter((e) => !have.has(e.id)).map((e) => e.id));
    return { folded: fresh.size, duplicates: s.events.length - fresh.size, unparsed: s.skipped, files: files.length, late: 0, skipped: 0 };
  }
  const release = acquireFoldLock(dir);
  try {
    const work = [];
    const skipped = [];
    // Adopt dead folds' files first (read into `work` before any rename, so a same-named target is never overwritten unread).
    const adopted = new Map();
    for (const f of spoolFiles(dir)) {
      const m = f.match(/\.folding-(\d+)$/);
      if (!m) continue;
      const pid = Number(m[1]);
      if (pid !== process.pid && pidAlive(pid)) skipped.push(f);
      else adopted.set(f, readJsonlFile(f));
    }
    for (const f of spoolFiles(dir)) {
      if (/\.folding-\d+$/.test(f)) {
        if (adopted.has(f)) work.push(f);
        continue;
      }
      let to = `${f}.folding-${process.pid}`;
      if (adopted.has(to)) to = `${f}.${Date.now()}.folding-${process.pid}`; // never rename over an unread file
      fs.renameSync(f, to);
      work.push(to);
    }
    const parts = new Map(); // file -> { events, bad, size }
    for (const f of work) {
      const r = adopted.get(f) ?? readJsonlFile(f);
      parts.set(f, { ...r, size: fs.existsSync(f) ? fs.statSync(f).size : 0 });
    }
    const events = [];
    const bad = [];
    for (const r of parts.values()) {
      // F5: loops, not push(...spread): a spread over ~120k elements overflows the call stack (RangeError).
      for (const e of r.events) events.push(e);
      for (const l of r.bad) bad.push(l);
    }
    events.sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
    let folded = append(events.filter((e) => e && e.id), log);
    // F2: re-read each renamed file once it has stopped growing; fold anything that arrived after the first read.
    let late = 0;
    const seen = new Set(events.map((e) => e?.id));
    const deadline = Date.now() + Math.max(settleMs * 10, 1000);
    for (const f of work) {
      let size = parts.get(f).size;
      for (;;) {
        if (settleMs > 0) sleepMs(settleMs);
        const now = fs.existsSync(f) ? fs.statSync(f).size : 0;
        if (now === size || Date.now() > deadline) break;
        size = now;
      }
      const again = readJsonlFile(f);
      const extra = again.events.filter((e) => e && e.id && !seen.has(e.id) && (seen.add(e.id), true));
      if (extra.length) {
        late += extra.length;
        folded += append(extra, log);
      }
      const known = new Set(parts.get(f).bad);
      for (const l of again.bad) if (!known.has(l)) bad.push(l);
    }
    if (bad.length) fs.writeFileSync(path.join(dir, `unparsed-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`), bad.join("\n") + "\n");
    for (const f of work) fs.rmSync(f, { force: true });
    return { folded, duplicates: events.length + late - folded, unparsed: bad.length, files: work.length, late, skipped: skipped.length };
  } finally {
    release();
  }
}

/**
 * The spool writer (`add --spool`). F2, writer side: an append into a file that a fold renamed before or during the
 * write may land after the fold read it. After the append, if the path no longer names the file we wrote (renamed,
 * or replaced by a new file), the event is appended again to the current spool file. The fold dedupes by id, so a
 * second copy costs nothing; a lost copy cannot happen unless the writer dies between the two appends.
 */
export function spoolAppend(e, file = spoolFileFor(new Date()), have = []) {
  if (have.some((x) => x?.id === e.id)) return 0;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const line = JSON.stringify(e) + "\n";
  const fd = fs.openSync(file, "a");
  let ino;
  try {
    fs.writeSync(fd, line);
    ino = fs.fstatSync(fd).ino;
  } finally {
    fs.closeSync(fd);
  }
  let still = false;
  try {
    still = fs.statSync(file).ino === ino;
  } catch {}
  if (!still) fs.appendFileSync(file, line);
  return 1;
}

export const ROOM_BY_ROLE = {
  "demo-builder": "build-floor",
  "fact-checker": "fact-check",
  "learner-evaluator": "learner-review",
  "pedagogy-critic": "learner-review",
  "qa-tester": "qa-lab",
  "accessibility-reviewer": "qa-lab",
  "release-manager": "launch-room",
  "principal-engineer": "engineering",
  "principal-engineer-ops": "ops-room",
  "vp-rnd": "rnd-office",
  "vp-marketing": "marketing",
  "rnd-lead": "rnd-office",
  "research-lead": "research-office",
  "rnd-engineer": "rnd-lab",
  "research-scientist": "research-lab",
  "platform-engineer": "app-team",
  "community-engineer": "app-team",
  "evaluation-steward": "constitution",
  "backend-engineer": "backend",
  "privacy-reviewer": "privacy-review",
  "growth-designer": "growth",
  "analytics-steward": "growth",
  "tools-lead": "tools",
  "hq-engineer": "tools",
  "lifehacks-safety-reviewer": "lifehacks-safety",
  "vp-personalization": "personalization",
  "learner-model-engineer": "model-lab",
  // Personalization org (2026-10-16, W-1945): Science and the VP in the personalization room; Learner Model, Eval and Customer Data in the model lab.
  "personalization-engineer": "model-lab",
  "learner-data-engineer": "model-lab",
  "personalization-eval": "model-lab",
  "lesson-dims-owner": "personalization",
  "applied-scientist-personalization": "personalization",
  "learning-scientist-personalization": "personalization",
  "localization-lead": "international",
  localizer: "locale-desks",
  "cultural-reviewer": "culture-review",
  "pattern-librarian": "chief-of-staff",
  "head-of-product": "product",
  "principal-pm-verticals": "strategy",
  "domain-scout": "strategy",
  "learning-designer": "studio",
  researcher: "research-lab",
  illustrator: "design-studio",
  "courses-lead": "courses",
  "cm-course-ncm": "courses",
  // A hyphenated domain id would be cut to "cm-big" by roomFor's default, so the new categories are listed.
  "cm-books": "cm-books",
  "cm-books-business": "cm-books",
  "cm-books-psychology": "cm-books",
  "cm-books-science-history": "cm-books",
  "cm-big-ideas": "cm-big-ideas",
  "cm-big-ideas-science": "cm-big-ideas",
  "cm-big-ideas-society": "cm-big-ideas",
  "cm-big-ideas-mind": "cm-big-ideas",
  // History through data and maps (2026-10-14): listed for the same reason; its office is on floor 4 with Books, Big Ideas and Life Hacks (F-40 reseat).
  "cm-history": "cm-history",
  "cm-history-population-economy": "cm-history",
  "cm-history-maps-borders": "cm-history",
  "cm-history-events-data": "cm-history",
  "design-lead": "design-studio",
  "interaction-designer": "design-studio",
  "visual-designer": "design-studio",
  "design-engineer": "design-studio",
  "mockup-artist": "design-studio",
  "chief-of-staff": "chief-of-staff",
  "chief-of-staff-ceo-office": "ceo-office",
  "portfolio-manager": "ceo-office",
  // W-914 (company/decisions/2026-10-15-head-of-strategic-initiatives.md): runs First Light from the CEO office.
  "head-of-strategic-initiatives": "ceo-office",
  // Evaluation org (2026-10-18, W-1843; company/decisions/2026-10-14-evaluation-org.md): the CPO in the CEO office; no evaluation room is drawn, so the head, engineer and the judge pool sit in Learner review beside the pedagogy critics.
  "chief-product-officer": "ceo-office",
  "head-of-evaluation": "learner-review",
  "evaluation-engineer": "learner-review",
  "pairwise-judge": "learner-review",
};
export const roomFor = (role) => ROOM_BY_ROLE[role] ?? (role?.startsWith("cm-") ? role.split("-").slice(0, 2).join("-") : "chief-of-staff");

// ------------------------------------------------------------------ git history

function classifyCommit(msg, files) {
  const m = msg.toLowerCase();
  const touches = (re) => files.some((f) => re.test(f));
  if (m.startsWith("merge pull request")) return ["founder", "lobby", "founder"];
  if (m.startsWith("merge")) return ["merge", "build-floor", "chief-of-staff"];
  if (/unpublish|back to review|held back/.test(m)) return ["unpublish", "launch-room", "release-manager"];
  if (/publish|launch review|launch batch/.test(m)) return ["publish", "launch-room", "release-manager"];
  if (/\bcoe\b|incident/.test(m)) return ["incident", "incident", "chief-of-staff"];
  if (/^wbr|business review/.test(m)) return ["ritual", "meeting-wbr", "chief-of-staff"];
  if (/retro/.test(m)) return ["ritual", "meeting-retro", "chief-of-staff"];
  if (/crit|pattern/.test(m)) return ["ritual", "meeting-crit", "pattern-librarian"];
  if (/planning|\bop\b/.test(m)) return ["ritual", "meeting-planning", "chief-of-staff"];
  if (/amd-|amendment|constitution/.test(m)) return ["decision", "constitution", "evaluation-steward"];
  if (/fact-check|disputed|claim/.test(m)) return ["verify", "fact-check", "fact-checker"];
  if (/learner review|reviews/.test(m)) return ["review", "learner-review", "learner-evaluator"];
  if (/\bqa\b/.test(m)) return ["review", "qa-lab", "qa-tester"];
  if (/eng review|edd|adr|deploy|vercel|kit|next 16/.test(m)) return ["decision", "engineering", "principal-engineer"];
  if (/team|role|org/.test(m)) return ["decision", "chief-of-staff", "chief-of-staff"];
  if (touches(/^src\/app\/hq|^tools\/events/)) return ["commit", "tools", "tools-lead"];
  return ["commit", "chief-of-staff", "chief-of-staff"];
}

function gitEvents() {
  const out = execFileSync("git", ["log", "--reverse", "--format=%x1e%H%x1f%aI%x1f%s", "--name-only"], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 });
  const events = [];
  for (const chunk of out.split("\x1e").filter(Boolean)) {
    const [head, ...rest] = chunk.split("\n");
    const [sha, ts, subject] = head.split("\x1f");
    const files = rest.filter(Boolean);
    const [type, room, actor] = classifyCommit(subject, files);
    const slugs = [...new Set(files.map((f) => f.match(/^src\/demos\/[^/]+\/([^/]+)\//)?.[1]).filter(Boolean))];
    events.push({
      id: `git-${sha.slice(0, 10)}`,
      ts: new Date(ts).toISOString(),
      type,
      room,
      actor,
      summary: subject,
      subjects: slugs.slice(0, 40),
      refs: [sha.slice(0, 10), ...files.filter((f) => f.startsWith("company/rituals/records/")).slice(0, 5)],
    });
  }
  return events;
}

// ------------------------------------------------------------------ session transcripts

const text = (c) => (typeof c === "string" ? c : Array.isArray(c) ? c.map((x) => (typeof x === "string" ? x : x?.text ?? "")).join("\n") : "");
function dedent(s) {
  const lines = s.split("\n");
  let ind = Infinity; // F5: a loop, not Math.min(...spread), so a very long message cannot overflow the stack
  for (const l of lines) if (l.trim()) ind = Math.min(ind, l.match(/^ */)[0].length);
  return lines.map((l) => l.slice(Number.isFinite(ind) ? ind : 0)).join("\n").trim();
}
const firstLine = (s, n = 140) => {
  const l = s.split("\n").find((x) => x.trim()) ?? "";
  return l.length > n ? l.slice(0, n - 1) + "…" : l;
};

// hooked: tool_use_id -> agent label for dispatches the Agent-tool hook already wrote (.claude/hooks/agent-events.mjs).
// The backfill then reuses the hook's label (so reports join the hook's dispatch) and does not write a second dispatch.
export function transcriptEvents(dir, { hooked = new Map() } = {}) {
  const files = [];
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (f.endsWith(".jsonl") && !p.includes(`${path.sep}subagents${path.sep}`)) files.push(p);
    }
  };
  walk(dir);
  const events = [];
  for (const file of files) {
    const dispatch = {}; // tool_use_id -> {ts, desc, role, model, prompt}
    const agents = {}; // raw agent id -> {label, role}
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line) continue;
      let o;
      try {
        o = JSON.parse(line);
      } catch {
        continue;
      }
      const ts = o.timestamp;
      if (o.type === "assistant") {
        for (const c of o.message?.content ?? []) {
          if (c?.type === "tool_use" && c.name === "Agent") {
            dispatch[c.id] = { ts, desc: c.input?.description ?? "agent", role: c.input?.subagent_type ?? "general-purpose", model: c.input?.model, prompt: c.input?.prompt ?? "" };
          } else if (c?.type === "tool_use" && c.name === "SendMessage" && agents[c.input?.to]) {
            const a = agents[c.input.to];
            events.push({ id: `tx-${hash(file + c.id)}`, ts, type: "dispatch", room: roomFor(a.role), actor: "chief-of-staff", agent: a.label, summary: `Message to ${a.label}: ${firstLine(c.input?.message ?? "", 100)}`, body: c.input?.message ?? "", state: "working" });
          } else if (c?.type === "text" && c.text?.length >= 400) {
            events.push({ id: `tx-${hash(file + o.uuid + c.text.slice(0, 50))}`, ts, type: "note", room: "lobby", actor: "chief-of-staff", summary: firstLine(c.text), body: c.text });
          }
        }
      } else if (o.type === "user") {
        const content = o.message?.content;
        if (Array.isArray(content) && !o.isMeta && content.some((c) => c?.type === "image")) {
          const s = text(content.filter((c) => c?.type === "text")).trim();
          events.push({ id: `tx-${hash(file + o.uuid)}`, ts, type: "founder", room: "lobby", actor: "founder", summary: firstLine(s || "(image)") + " [image]", body: s });
        }
        if (Array.isArray(content)) {
          for (const c of content) {
            if (c?.type !== "tool_result" || !dispatch[c.tool_use_id]) continue;
            const raw = text(c.content).match(/agentId: (a[0-9a-f]{8,})/)?.[1];
            if (!raw) continue;
            const d = dispatch[c.tool_use_id];
            if (hooked.has(c.tool_use_id)) {
              agents[raw] = { label: hooked.get(c.tool_use_id), role: d.role, key: c.tool_use_id };
              continue;
            }
            // r5 B2: the run key (the Agent call's tool_use id) on every tx- event of the run, so a report or a hand
            // `events.mjs stopped --key=…` closes this dispatch even when its label differs (tools/lib/inflight.mjs).
            agents[raw] = { label: `${d.desc} ·${hash(raw, 4)}`, role: d.role, key: c.tool_use_id };
            events.push({ id: `tx-${hash(raw + "dispatch")}`, ts: d.ts, type: "dispatch", room: roomFor(d.role), actor: "chief-of-staff", agent: agents[raw].label, key: c.tool_use_id, subjects: [d.role], summary: `Dispatch ${d.role}${d.model ? ` (${d.model})` : ""}: ${d.desc}`, body: d.prompt, state: "working" });
          }
        } else if (typeof content === "string" && !o.isMeta) {
          const s = content.trim();
          if (s && !s.startsWith("<") && !s.startsWith("Another Claude session") && !s.startsWith("Stop hook") && !s.startsWith("This session is being continued") && !s.startsWith("[SYSTEM") && !s.startsWith("Caveat:")) {
            events.push({ id: `tx-${hash(file + o.uuid)}`, ts, type: "founder", room: "lobby", actor: "founder", summary: firstLine(s), body: s });
          }
        }
      }
      // Reports and stop notices arrive through the queue (and are echoed in user turns; ids dedupe).
      const q = o.type === "queue-operation" ? o.content ?? "" : o.type === "user" && typeof o.message?.content === "string" ? o.message.content : "";
      if (!q) continue;
      for (const m of q.matchAll(/<agent-message from="(a[0-9a-f]{8,})">([\s\S]*?)<\/agent-message>/g)) {
        const a = agents[m[1]];
        if (!a) continue;
        const body = dedent((m[2].split("The report follows:")[1] ?? m[2]).replace(/^\n/, ""));
        events.push({ id: `tx-${hash(m[1] + "report" + body.slice(0, 80))}`, ts, type: "report", room: roomFor(a.role), actor: a.role, agent: a.label, ...(a.key ? { key: a.key } : {}), summary: `${a.label.split(" ·")[0]}: ${firstLine(body, 110)}`, body, state: "done" });
      }
      for (const m of q.matchAll(/<task-notification>[\s\S]*?<task-id>(a[0-9a-f]{8,})<\/task-id>[\s\S]*?<status>(\w+)<\/status>[\s\S]*?<summary>([\s\S]*?)<\/summary>/g)) {
        const a = agents[m[1]];
        if (!a) continue;
        if (m[2] === "completed") {
          // Usage per finished run: the source for agent metrics (tools/metrics.mjs, WBR).
          const tok = Number(q.slice(m.index).match(/<subagent_tokens>(\d+)<\/subagent_tokens>/)?.[1] ?? 0);
          const ms = Number(q.slice(m.index).match(/<duration_ms>(\d+)<\/duration_ms>/)?.[1] ?? 0);
          if (tok) events.push({ id: `tx-${hash(m[1] + "usage" + tok)}`, ts, type: "usage", room: roomFor(a.role), actor: a.role, agent: a.label, ...(a.key ? { key: a.key } : {}), summary: `${a.label.split(" ·")[0]}: ${Math.round(tok / 1000)}k tokens, ${Math.round(ms / 60000)} min`, tokens: tok, durationMs: ms });
          continue;
        }
        const reason = /session limit|rate_limit|429/.test(m[3]) ? "usage limit" : "ended early";
        events.push({ id: `tx-${hash(m[1] + "stop" + ts.slice(0, 16))}`, ts, type: "stopped", room: roomFor(a.role), actor: a.role, agent: a.label, ...(a.key ? { key: a.key } : {}), summary: `${a.label.split(" ·")[0]} stopped: ${reason}`, body: m[3].trim(), state: "stopped" });
      }
    }
  }
  return events;
}

/**
 * Backfill selection (W-941 A5): events of the given types at or after `since`, not already in the log.
 * Only what the sources hold is returned; nothing is synthesised.
 */
export function selectBackfill(all, { types = null, since = null, have = new Set() } = {}) {
  // A transcript echoes each report and notification (queue enqueue + remove): one per id, so --dry counts right.
  const seen = new Set(have);
  return all.filter((e) => (!types || types.includes(e.type)) && (!since || e.ts >= since) && !seen.has(e.id) && (seen.add(e.id), true));
}

// ------------------------------------------------------------------ CLI

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
const [cmd, ...args] = isMain ? process.argv.slice(2) : [];
const opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));

/**
 * r5 B2: which open dispatch a report/stopped event `e` would close, against `events` (log + spool). Returns
 * { run, rule } or null, plus the open runs, for the "matches no open dispatch" warning.
 */
export function wouldClose(e, events) {
  const r = replay(events);
  return { hit: r.match({ ...e, ts: e.ts ?? new Date().toISOString() }), open: r.open };
}
function warnUnmatched(e) {
  let events;
  try {
    events = mergeById(readLog(), readSpool().events);
  } catch (err) {
    process.stderr.write(`events: could not check which dispatch this closes (${err.message})\n`);
    return;
  }
  const { hit, open } = wouldClose(e, events);
  if (hit) {
    process.stderr.write(`events: closes ${hit.run.label} (dispatch ${hit.run.dispatch.id}, by ${hit.rule})\n`);
    return;
  }
  const near = nearest(open, e.agent ?? "");
  const now = Date.now();
  process.stderr.write(
    `events: WARNING: ${e.type} ${e.agent ? `--agent=${shq(e.agent)}` : ""}${e.key ? ` --key=${shq(e.key)}` : ""} matches no open dispatch, so it closes nothing and the in-flight count is unchanged.\n` +
      (near.length
        ? `  nearest open dispatches (re-run with the exact --agent or --key to close one):\n` + near.map((r) => `    ${shq(r.label)}  ${ageText(now - Date.parse(r.dispatch.ts))} old${keyArg(r) ? `  --key=${shq(keyArg(r))}` : ""}`).join("\n") + "\n"
        : "  no dispatch is open.\n"),
  );
}

if (cmd === "add" || cmd === "report" || cmd === "stopped") {
  if (cmd !== "add") {
    opt.type = cmd;
    opt.state ??= cmd === "report" ? "done" : "stopped";
    if (!opt.agent && !opt.key) throw new Error(`${cmd}: --agent or --key is required (which run is this?)`);
    if (opt.actor && !opt.room) opt.room = roomFor(String(opt.actor));
  }
  for (const k of ["type", "room", "actor", "summary"]) if (!opt[k]) throw new Error(`--${k} is required`);
  const ts = opt.ts ?? new Date().toISOString();
  const e = { id: opt.id ? String(opt.id) : `ev-${hash(ts + opt.summary)}`, ts, type: opt.type, room: opt.room, actor: opt.actor, summary: opt.summary };
  if (opt.agent) e.agent = opt.agent;
  if (opt.key && opt.key !== true) e.key = String(opt.key);
  if (opt.subjects) e.subjects = String(opt.subjects).split(",");
  if (opt.refs) e.refs = String(opt.refs).split(",");
  if (opt.state) e.state = opt.state;
  if (opt.corrects) e.corrects = opt.corrects;
  // Founder leverage (company/ops/metrics.md §C; tools/lib/founder-leverage.mjs): class on a founder event,
  // minutes on a founder event, accepted on the event that records an accepted library improvement or operational fix.
  if (opt.class) {
    if (opt.type !== "founder" || !["decision", "correction", "routing"].includes(String(opt.class))) throw new Error("--class needs --type=founder and one of decision, correction, routing");
    e.class = String(opt.class);
  }
  if (opt.minutes) {
    const m = Number(opt.minutes);
    if (opt.type !== "founder" || !Number.isFinite(m) || m < 0) throw new Error("--minutes needs --type=founder and a number ≥ 0");
    e.minutes = m;
  }
  if (opt.accepted) {
    if (!["library", "opfix"].includes(String(opt.accepted))) throw new Error("--accepted must be library or opfix");
    e.accepted = String(opt.accepted);
  }
  if (opt.source) e.source = String(opt.source);
  if (opt.chooser) e.chooser = String(opt.chooser);
  if (opt["tool-use-id"]) e.toolUseId = String(opt["tool-use-id"]);
  if (opt["body-file"] === "-") e.body = fs.readFileSync(0, "utf8");
  else if (opt["body-file"]) e.body = fs.readFileSync(opt["body-file"], "utf8");
  else if (opt.body) e.body = opt.body;
  if (opt.spool) {
    // The hook's path (ruling H2): the spool only, deduped against the spool (hk- ids are fixed per tool_use_id).
    // It never reads or writes events.jsonl, so a conflicted log cannot stop it and it costs nothing as the log grows.
    const have = spoolFiles().flatMap((f) => readFile(f));
    const n = spoolAppend(e, spoolFileFor(new Date()), have);
    console.log(n ? `spooled ${e.id}` : `already spooled ${e.id}`);
  } else {
    if (e.type === "report" || e.type === "stopped") warnUnmatched(e);
    const n = append([e]);
    console.log(n ? `added ${e.id}` : `already in the log ${e.id}`);
  }
} else if (cmd === "backfill") {
  const dir = opt.transcripts ?? path.join(os.homedir(), ".claude/projects");
  const types = opt.types ? String(opt.types).split(",") : null;
  const since = opt.since ? new Date(String(opt.since)).toISOString() : null;
  const fromGit = !types || types.some((t) => !["dispatch", "report", "stopped", "usage", "note", "founder"].includes(t));
  const log = readLog();
  const hooked = new Map(log.filter((e) => e.type === "dispatch" && e.toolUseId && e.agent).map((e) => [e.toolUseId, e.agent]));
  const hookReported = new Set(log.filter((e) => e.type === "report" && e.id.startsWith("hk-") && e.agent).map((e) => e.agent));
  const all = [...(fromGit ? gitEvents() : []), ...transcriptEvents(dir, { hooked })].sort((a, b) => a.ts.localeCompare(b.ts));
  // r5 B2: a --since later than the newest transcript event already in the log skips everything in between (the
  // 2026-10-16 12:24-13:00 window lost ~44 reports this way, and 9 runs stayed "in flight" until closed by hand).
  if (since) {
    const lastTx = log.filter((e) => typeof e.id === "string" && e.id.startsWith("tx-") && typeof e.ts === "string").reduce((m, e) => (e.ts > m ? e.ts : m), "");
    const skipped = lastTx && lastTx < since ? new Set(selectBackfill(all.filter((e) => e.ts > lastTx && e.ts < since), { types, have: new Set(log.map((e) => e.id)) }).map((e) => e.id)).size : 0;
    if (skipped) process.stderr.write(`backfill: WARNING: --since=${since} is after the newest transcript event in the log (${lastTx}); ${skipped} event(s) in between are not added. Run with --since=${lastTx} or no --since.\n`);
  }
  // A run whose report the hook already wrote gets no second report from the transcript.
  const picked = selectBackfill(all, { types, since, have: new Set(log.map((e) => e.id)) }).filter((e) => !(e.type === "report" && hookReported.has(e.agent)));
  const scope = `${types ? types.join(",") : "all types"}${since ? ` since ${since}` : ""}`;
  if (opt.dry) {
    console.log(`backfill --dry: ${picked.length} new event(s) would be added (${scope}; ${all.length} seen in git + ${dir})`);
    for (const e of picked.slice(0, 50)) console.log(`  ${e.ts.slice(0, 16)} ${e.type.padEnd(8)} ${e.summary}`);
  } else console.log(`backfill: ${append(picked)} new event(s) (${scope}; ${all.length} seen)`);
} else if (cmd === "fold") {
  let r;
  try {
    r = fold({ dry: !!opt.dry });
  } catch (err) {
    if (err.code !== "EFOLDLOCKED") throw err;
    console.error(err.message);
    process.exit(2);
  }
  console.log(`fold${opt.dry ? " --dry" : ""}: ${r.folded} event(s) ${opt.dry ? "would be " : ""}folded into ${rel(LOG)} from ${r.files} spool file(s) in ${spoolDir()}; ${r.duplicates} already in the log${r.late ? `; ${r.late} arrived during the fold and were folded (F2)` : ""}${r.skipped ? `; ${r.skipped} file(s) of a live fold left alone` : ""}${r.unparsed ? `; ${r.unparsed} unparseable spool line(s)${opt.dry ? "" : " kept in unparsed-*.txt"}` : ""}`);
} else if (cmd === "tail") {
  const n = Number(args[0] ?? 20);
  for (const e of readLog().sort((a, b) => a.ts.localeCompare(b.ts)).slice(-n)) console.log(`${e.ts.slice(0, 16).replace("T", " ")}  ${e.type.padEnd(9)} ${e.room.padEnd(15)} ${e.summary}`);
} else if (isMain) {
  console.log("usage: node tools/events.mjs add|report|stopped|backfill|fold|tail  (see company/ops/events.md)");
}
