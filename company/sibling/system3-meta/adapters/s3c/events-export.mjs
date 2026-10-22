#!/usr/bin/env node
// events-export.mjs: System 3 Meta's work as company events (plan 2026-10-21-m4-m7-plan.md §M7 K21: "Meta advance/
// shipped/ritual/merge events are appended as company events.jsonl lines … so the company's trigger counters see Meta
// work. Only the chief-of-staff role writes"). The company's cadence (tools/rituals-due.mjs) counts merge, review,
// verify and publish events in company/ops/events.jsonl: without this, retro (5 merges), demo-crit (4 reviews),
// design-review (2 reviews) and launch-review never fire on Meta's own work.
//
//   node events-export.mjs --live=<dir> --repo=<integration worktree> [--commit] [--max=200] [--flush] [--spool]
//        --live: the Meta live dir (default META_LIVE_DIR; the state is META_STATE or state.json there)
//        --repo: the run's integration worktree: a linked worktree on a meta/* branch (lib/commit-file.mjs sandboxOf),
//                never the main checkout. Events are written by the company's own writer, `node <repo>/tools/events.mjs
//                add` (its id dedupe, its unreadable-line rule), into that worktree's company/ops/events.jsonl
//        --commit: commit company/ops/events.jsonl alone when it changed ("meta: events export (chief-of-staff code
//                step)"), so the integration worktree stays clean for integrate.mjs
//        --max: company events written per run (default 200; the cursor carries the rest to the next run)
//        --flush: write the review batches still open (their sessions have not ended) now: the run's end
//        --spool: also write the dispatch and report events to the company's hook spool (tools/lib/events-spool.mjs:
//                the main checkout's company/ops/events-spool/, shared by every worktree), so dispatch-check run in
//                any checkout counts Meta's agents for C1/C2. Off by default: the spool is the main checkout's and is
//                folded into its events.jsonl, which a sandbox run does not write without the founder's go
//
// What the company's counters count, read from its code (tools/lib/rituals.mjs computeDue): every event of type <k>
// in company/ops/events.jsonl since the ritual was last held is one count toward `every: {<k>: n}` (one line, one
// count; subjects are not counted); company/rituals/triggers.json states the thresholds in the company's own units:
// retro "Five merged batches", demo-crit "four review batches (~80 lessons reviewed)", design-review "every two review
// batches", wbr every 10 merges, launch-review after any review or fact-check batch. The company's writers log one
// review or verify event per agent run (the SO-10-3 learner run that reviewed 7 lessons is one review event with 7
// subjects; "FC pass 63" is one verify event), and one merge event per branch merged. So:
//   review, verify, decision  one company event per Meta agent SESSION (one launched evaluator, fact-checker or head
//            of product working its batch: the company's agent run), written when the session ends (session-close, or
//            its launch-finished), with every lesson it judged as subjects. A session still open waits (the cursor
//            keeps it), unless --flush. An advance with no session (signed by hand) joins its tick's batch. Its ts is
//            its LAST signature's time, not the close's (M7 finish review: a session closes minutes after its last
//            advance, so a lesson's review and launch decision were dated after its publish, and the company's
//            counters, which order events by ts, saw a review "since" the last publish: a false launch-review DUE)
//   publish  one per supervisor tick (Meta's ship stages of one tick are one publish loop: the company's
//            publish-ready --publish publishes a batch in one run)
//   merge    one per lesson merged (Meta merges each order's branch on its own: integrate.mjs, one --no-ff merge
//            commit per branch, which is what the company's merge event counts), refs the merge commit on the
//            integration branch
//   ritual   one per ritual order shipped, refs its record and the commit that added it on the integration branch (the
//            order's own branch may be removed after the run); the cycle's handoff is a note, not a ritual
//   dispatch one per Meta launch (every agent role: C1 counts agents, C2 builders by subjects [demo-builder]), with
//            the label, key, source and chooser dispatch-check's own gate used (`§4:manager run: system3-meta <role>
//            <launch>`, chief-of-staff), and its report when the launcher reports it finished (state done, or
//            stopped when it failed), or a stopped event when a reservation lapsed unentered (LAUNCH_GRACE_MIN), so
//            no Meta launch stays open in the company's count for its 6 h stale window
// Refs are commit shas (the K7 commit of the stage judged, the merge commit, the record's commit), never branch names.
//
// Idempotent twice over: a cursor (<live>/exports/events-export.json: the last Meta event seq exported, the batches
// still open and the launches not yet reported, for this state) and stable ids (`mt-<10 hex>` of the state path, its
// first event's time and the batch, launch or Meta seq), which events.mjs add will not write twice. The spec's
// `exports` runs it after each tick that changed the state (specs/s3c-m7.json).
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, exported, cursor, pending, open, findings[]}. Exit 0
// pass, 2 usage (a --repo that is not a sandbox worktree), 3 stage-error (the state or the company's writer failed).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F } from "./lib/proc.mjs";
import { sandboxOf, commitPaths, git } from "./lib/commit-file.mjs";

export const LOG = "company/ops/events.jsonl";
export const COMMIT_MSG = "meta: events export (chief-of-staff code step)";
export const LAUNCH_GRACE_MIN = 5; // prototype supervisor.mjs LAUNCH_GRACE_MIN: an unentered reservation lapses
const USAGE = "usage: events-export.mjs [--live=<dir>] --repo=<integration worktree> [--commit] [--max=200] [--flush] [--spool]";
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v); // state.mjs rev
const iso = (min) => new Date(Math.round(min * 60000)).toISOString();
const BRIEF = /(?:^|[\s·])brief (company\/domains\/briefs\/[A-Za-z0-9._-]+\.md):\d+-\d+/m; // state.mjs briefVars
const lid = (l) => `${String(l.seq).padStart(4, "0")}-${l.role}`; // a launch's id (supervisor.mjs reserve)
export const HANDOFF = "handoff";

/** What one Meta event is for the company: {kind: "batch", type, room, actor, close} (it joins a batch that `close`
 *  ends: "S:<session>" or "T", the tick), {kind: "one", event} (written as it is), or null. */
export function classify(e, st, ctx = {}) {
  const orders = st.engine?.orders instanceof Map ? st.engine.orders : new Map();
  const o = orders.get(e.order);
  if (!o) return null;
  const flows = st.engine?.flows instanceof Map ? st.engine.flows : new Map();
  const chair = flows.get(o.flow)?.stages?.[0]?.signer === "chair" || !!o.chair;
  const slug = o.slug ?? o.task ?? o.id;
  if (!chair && e.type === "advance") {
    const by = { check: ["verify", "fact-check"], learner: ["review", "learner-review"], launch: ["decision", "launch-room"] }[e.stage];
    if (by) return { kind: "batch", type: by[0], room: by[1], actor: e.by, stage: e.stage, slug, verdict: e.verdict, order: o.id, close: ctx.sessionOf?.(e) ? `S:${ctx.sessionOf(e)}` : "T" };
    if (e.stage === "ship" && e.verdict === "pass") return { kind: "batch", type: "publish", room: "launch-room", actor: e.by === "code" ? "release-manager" : e.by, stage: e.stage, slug, verdict: "pass", order: o.id, close: "T" };
    if (e.stage === "merge" && e.verdict === "pass") return { kind: "one", event: { type: "merge", room: "chief-of-staff", actor: "chief-of-staff", summary: `System 3 Meta ${o.id}: ${o.workspace?.branch ?? slug} merged into the run's integration branch (integrate.mjs, code)`, subjects: [slug], refs: ctx.mergeRefs?.(o) ?? [] } };
    return null;
  }
  if (chair && e.type === "shipped") {
    const first = flows.get(o.flow)?.stages?.[0]?.stage ?? "run";
    const record = (o.history ?? []).filter((h) => h.stage === first && h.evidence).at(-1)?.evidence ?? null;
    const refs = [record, ...(ctx.recordRefs?.(o, record) ?? [])].filter(Boolean);
    if (slug === HANDOFF) return { kind: "one", event: { type: "note", room: "chief-of-staff", actor: "chief-of-staff", summary: `System 3 Meta ${o.id}: the cycle's handoff at the top of company/ops/progress.md (chair ${o.chair}, attendee ${o.attendee})`, subjects: [], refs } };
    return { kind: "one", event: { type: "ritual", room: ctx.rooms?.[slug] ?? "chief-of-staff", actor: o.chair ?? "chief-of-staff", summary: `${slug} held through System 3 Meta ${o.id} (chair ${o.chair}, attendee ${o.attendee})`, subjects: [slug], refs } };
  }
  return null;
}
/** Back-compat for callers of the per-event mapping (one company event per Meta event, as before the M7 review). */
export function mapEvent(e, st, opts = {}) {
  const c = classify(e, st, opts);
  if (!c) return null;
  if (c.kind === "one") return c.event;
  return { type: c.type, room: c.room, actor: c.actor, summary: `System 3 Meta ${c.order}: ${c.stage} of ${c.slug}: ${c.verdict}`, subjects: [c.slug], refs: [] };
}
/** The company event a closed batch is: one line, every lesson it judged as a subject. */
export function batchEvent(b) {
  const what = { verify: "fact-check", review: "learner review", decision: "launch review", publish: "published" }[b.type];
  const items = b.items.map((x) => `${x.slug}${b.type === "publish" ? "" : `: ${x.verdict === "pass" && b.type === "decision" ? "go" : x.verdict}`}`);
  const orders = [...new Set(b.items.map((x) => x.order))];
  const summary = b.type === "publish"
    ? `System 3 Meta ${orders.join(", ")}: ${items.length} lesson(s) published on their branches (company publish, run by code; one tick's publish loop): ${items.join(", ")}`
    : `System 3 Meta ${orders.join(", ")}: ${what} batch of ${items.length} lesson(s) by ${b.actor}${b.session ? ` (session ${b.session})` : ""}: ${items.join(", ")}`;
  return { type: b.type, room: b.room, actor: b.actor, summary: summary.slice(0, 900), subjects: [...new Set(b.items.map((x) => x.slug))], refs: [...new Set(b.items.flatMap((x) => x.refs ?? []))].slice(0, 40) };
}
/** The lesson's company domain (a board item's `domain`): the brief file's first name part (math.geometry.md → math). */
export const domainOf = (o) => { const m = BRIEF.exec(String(o?.accept ?? "")); return m ? path.basename(m[1]).split(".")[0] : null; };
export const agentLabel = (l) => `system3-meta ${l.role} ${lid(l)}`;

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "events-export", findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["live", "repo", "commit", "max", "flush", "spool", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  for (const k of ["commit", "flush", "spool"]) if (o[k] != null && o[k] !== true) return usage(`--${k} takes no value`);
  for (const k of ["live", "repo", "max"]) if (o[k] === true || o[k] === "") return usage(`--${k} needs a value`);
  if (typeof o.repo !== "string") return usage("--repo is required (the run's integration worktree)");
  const max = o.max != null ? Number(o.max) : 200;
  if (!Number.isInteger(max) || max < 1) return usage("--max is a whole number from 1");
  const live = o.live ?? process.env.META_LIVE_DIR;
  if (!live) return usage("no Meta state: --live=<dir> or META_LIVE_DIR");
  const sb = sandboxOf(path.resolve(o.repo));
  if (sb.error) return usage(`--repo: ${sb.error}`);
  const statePath = path.resolve(live, process.env.META_STATE || "state.json");
  let st;
  try { st = JSON.parse(fs.readFileSync(statePath, "utf8"), rev); }
  catch (e) { return { exit: 3, out: { ok: false, stage: "events-export", findings: [F.env("state", `cannot read the Meta state ${statePath}: ${e.message}`)] } }; }
  const events = st.log?.events ?? [];
  const runKey = `${statePath}#${events[0]?.t ?? ""}`;
  const idOf = (k) => `mt-${crypto.createHash("sha1").update(`${runKey}:${k}`).digest("hex").slice(0, 10)}`;
  const curFile = path.join(path.resolve(live), "exports", "events-export.json");
  let cur = { state: runKey, seq: 0, pending: [], open: [] };
  try { const c = JSON.parse(fs.readFileSync(curFile, "utf8")); if (c.state === runKey && Number.isInteger(c.seq)) cur = { pending: [], open: [], ...c }; } catch {}
  let rooms = {};
  try { rooms = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(sb.root, "company/rituals/triggers.json"), "utf8")).triggers.map((t) => [t.ritual, t.room])); } catch {}
  const tool = path.join(sb.root, "tools/events.mjs");
  if (!fs.existsSync(tool)) return { exit: 3, out: { ok: false, stage: "events-export", findings: [F.env("tool", `no tools/events.mjs in ${sb.root}`)] } };
  const env = { ...process.env }; for (const k of ["NODE_TEST_CONTEXT", "S3_EVENTS", "S3_SPOOL"]) delete env[k]; // the worktree's own log
  const spoolEnv = { ...env, ...(process.env.S3_SPOOL ? { S3_SPOOL: process.env.S3_SPOOL } : {}) }; // --spool: the company's, or the one a test names

  // ---- the Meta history this needs, by seq
  const enterOf = new Map(), leaves = [], commits = [], advances = [];
  for (const e of events) {
    if (e.type === "enter") enterOf.set(e.run, e);
    else if (e.type === "leave") leaves.push(e);
    else if (e.type === "commit") commits.push(e);
    else if (e.type === "advance") advances.push(e);
  }
  // the session an agent's advance was signed in: Rooms.leave logs the advance, then the leave of its run (with the
  // run's session on its enter); a leave after the order's next advance is another signature's
  const sessionOf = (a) => {
    const next = advances.find((x) => x.seq > a.seq && x.order === a.order)?.seq ?? Infinity;
    const l = leaves.find((x) => x.seq > a.seq && x.seq < next && x.order === a.order && x.stage === a.stage);
    return l ? enterOf.get(l.run)?.session ?? null : null;
  };
  const stageSha = (a) => commits.find((c) => c.seq > a.seq && c.order === a.order && c.stage === a.stage)?.sha ?? null;
  const gitOut = (...a) => { const r = git(sb.root, ...a); return r.status === 0 ? r.stdout : ""; };
  let merges = null;
  const mergeRefs = (ord) => {
    merges ??= gitOut("rev-list", "--merges", "--parents", "-n", "2000", "HEAD").split("\n").map((l) => l.trim().split(" ")).filter((x) => x.length > 2);
    const mine = new Set([ord.workspace?.head, ...commits.filter((c) => c.order === ord.id).map((c) => c.sha)].filter(Boolean));
    const m = merges.find((x) => x.slice(1).some((p) => mine.has(p)));
    return m ? [m[0]] : ord.workspace?.head ? [ord.workspace.head] : [];
  };
  const recordRefs = (ord, record) => {
    if (ord.slug === HANDOFF) { const l = gitOut("log", "--format=%H %s", "-n", "200", "HEAD", "--", "company/ops/progress.md").split("\n").find((x) => x.includes(`meta: handoff (${ord.id})`)); return l ? [l.split(" ")[0]] : []; }
    if (!record) return [];
    const sha = gitOut("log", "-1", "--diff-filter=A", "--format=%H", "HEAD", "--", record).trim();
    return sha ? [sha] : [];
  };
  const ctx = { rooms, sessionOf, mergeRefs, recordRefs };
  const sessions = st.rooms?.sessions instanceof Map ? st.rooms.sessions : new Map();

  // ---- write
  const exported = [], findings = [];
  let budget = max;
  const add = (id, ts, c, extra = [], { spool = false } = {}) => {
    // a report or stopped event goes through the company's own `events.mjs report|stopped`, which takes its room from
    // the actor (roomFor: learner-evaluator → learner-review, fact-checker → fact-check), as every company hand-back's
    const args = c.cmd ? [tool, c.cmd, `--id=${id}`, `--ts=${ts}`, `--actor=${c.actor}`, `--summary=${c.summary}`, ...extra] : [tool, "add", `--id=${id}`, `--ts=${ts}`, `--type=${c.type}`, `--room=${c.room}`, `--actor=${c.actor}`, `--summary=${c.summary}`, ...extra];
    if (c.subjects?.length) args.push(`--subjects=${c.subjects.join(",")}`);
    if (c.refs?.length) args.push(`--refs=${c.refs.join(",")}`);
    const r = spawnSync(process.execPath, args, { cwd: sb.root, env, encoding: "utf8", timeout: 30_000 });
    if (r.status !== 0) { findings.push(F.env("events-add", `events.mjs add ${id} (${c.type}): exit ${r.status}: ${String(r.stderr || r.stdout).trim().slice(0, 300)}`)); return false; }
    if (spool && o.spool) {
      const s = spawnSync(process.execPath, [...args, "--spool"], { cwd: sb.root, env: spoolEnv, encoding: "utf8", timeout: 30_000 });
      if (s.status !== 0) findings.push(F.env("events-spool", `events.mjs add ${id} --spool: exit ${s.status}: ${String(s.stderr || s.stdout).trim().slice(0, 300)}`));
    }
    exported.push({ id, type: c.type, summary: c.summary, added: /^added /m.test(r.stdout) });
    budget--;
    return true;
  };
  let pending = cur.pending.map((b) => ({ ...b })), open = cur.open.map((x) => ({ ...x }));
  const closeBatches = (pred, t) => {
    const done = pending.filter(pred);
    for (const b of done) {
      if (budget <= 0 || findings.length) return false;
      if (!add(idOf(`batch:${b.id}`), iso(b.t ?? t), batchEvent(b))) return false; // dated by its last signature
      pending = pending.filter((x) => x !== b);
    }
    return true;
  };
  const report = (x, t, state, why) => {
    if (budget <= 0 || findings.length) return false;
    const type = state === "done" ? "report" : "stopped";
    const c = { type, cmd: type, actor: x.role, summary: `${x.label}: ${why}`, subjects: [x.role], refs: [] }; // its room: roomFor(actor), the company's
    if (!add(idOf(`${c.type}:${x.launch}`), iso(t), c, [`--agent=${x.label}`, `--key=${x.key}`, `--state=${state}`], { spool: true })) return false;
    open = open.filter((y) => y !== x);
    return true;
  };
  let seq = cur.seq;
  for (const e of events) {
    if (!(e.seq > cur.seq)) continue;
    if (budget <= 0 || findings.length) break;
    let ok = true;
    if (e.type === "launch") {
      const label = agentLabel(e), key = `system3-meta:${idOf(`launch:${lid(e)}`)}`;
      const c = { type: "dispatch", room: "chief-of-staff", actor: "chief-of-staff", summary: `Dispatch ${e.role} (System 3 Meta launch ${lid(e)}): ${String(e.why ?? "").slice(0, 160)}`, subjects: [e.role], refs: [] };
      ok = add(idOf(`dispatch:${lid(e)}`), iso(e.t), c, [`--agent=${label}`, `--key=${key}`, "--state=working", `--source=§4:manager run: system3-meta ${e.role} ${lid(e)}`, "--chooser=chief-of-staff"], { spool: true });
      if (ok) open.push({ launch: lid(e), label, key, role: e.role, t: e.t });
    } else if (e.type === "launch-finished") {
      const x = open.find((y) => y.launch === e.launch);
      ok = closeBatches((b) => (e.sessions ?? []).some((s) => b.key === `S:${s}:${b.type}`), e.t) && (!x || report(x, e.t, e.ok === false ? "stopped" : "done", e.ok === false ? `failed (${e.reason ?? "agent process failed"})` : `finished (${e.tokens ?? "?"} tokens)`));
    } else if (e.type === "session-close") {
      ok = closeBatches((b) => b.key === `S:${e.session}:${b.type}`, e.t);
    } else if (e.type === "supervisor-tick") {
      ok = closeBatches((b) => b.key.startsWith("T:"), e.t);
    } else {
      const c = classify(e, st, ctx);
      if (c?.kind === "one") ok = add(idOf(e.seq), iso(e.t), c.event);
      else if (c?.kind === "batch") {
        const key = c.close === "T" ? `T:${c.type}` : `${c.close}:${c.type}`;
        let b = pending.find((x) => x.key === key);
        // a batch's id carries its first event's seq: a tick batch's key repeats tick after tick
        if (!b) { b = { key, id: `${key}#${e.seq}`, type: c.type, room: c.room, actor: c.actor, session: c.close.startsWith("S:") ? c.close.slice(2) : null, items: [] }; pending.push(b); }
        const sha = stageSha(e);
        b.items.push({ slug: c.slug, verdict: c.verdict, order: c.order, refs: sha ? [sha] : [] });
        b.t = Math.max(b.t ?? e.t, e.t);
      }
    }
    if (!ok) break;
    seq = e.seq;
  }
  const nowMin = Math.max(events.at(-1)?.t ?? 0, Date.now() / 60000);
  // a session that ended without a session-close in the log (the state says it is closed): its batch is complete
  closeBatches((b) => b.session && sessions.get(b.session) && sessions.get(b.session).open === false, nowMin);
  if (o.flush) closeBatches(() => true, nowMin);
  // a reservation that lapsed unentered: stopped, so it does not count as in flight for 6 h
  for (const x of [...open]) {
    // entered as supervisor.mjs inFlight reads it: a session of the launch, or an enter by its role since
    const entered = [...sessions.values()].some((s) => s.launch === x.launch) || events.some((e) => e.type === "enter" && e.role === x.role && e.t >= x.t);
    if (!entered && nowMin - x.t > LAUNCH_GRACE_MIN && !events.some((e) => e.type === "launch-finished" && e.launch === x.launch)) { if (!report(x, x.t + LAUNCH_GRACE_MIN, "stopped", `its reservation lapsed: no session entered within ${LAUNCH_GRACE_MIN} min`)) break; }
  }
  const saveCursor = () => { fs.mkdirSync(path.dirname(curFile), { recursive: true }); const tmp = `${curFile}.${process.pid}.tmp`; fs.writeFileSync(tmp, JSON.stringify({ state: runKey, seq, pending, open, t: new Date().toISOString() }) + "\n"); fs.renameSync(tmp, curFile); };
  try { saveCursor(); } catch (e) { findings.push(F.env("cursor", `cannot write ${curFile}: ${e.message}`)); }
  const out = { ok: !findings.length, stage: "events-export", repo: sb.root, branch: sb.branch, state: statePath, exported: exported.length, events: exported, cursor: seq, pending: pending.map((b) => `${b.type} ${b.key} (${b.items.length})`), open: open.map((x) => x.launch), findings };
  if (o.commit && exported.some((x) => x.added)) {
    const c = commitPaths(sb.root, [LOG], COMMIT_MSG);
    if (c.error) { out.ok = false; out.findings.push(F.env("commit", c.error)); }
    else out.committed = c.sha ?? null;
  }
  return { exit: out.ok ? 0 : 3, out };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "events-export", findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const x of r.out.events ?? []) console.log(`${x.id} ${x.type} ${x.added ? "added" : "already in the log"}: ${x.summary}`);
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  const { events, ...last } = r.out;
  console.log(JSON.stringify(last));
  process.exitCode = r.exit;
}
