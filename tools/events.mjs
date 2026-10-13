#!/usr/bin/env node
// The company's event log (company/ops/events.jsonl): append-only, the source for HQ (/hq).
// Schema and rooms: company/ops/events.md.
//
//   node tools/events.mjs add --type=T --room=R --actor=A --summary="…" [--agent=L] [--subjects=a,b]
//                             [--refs=p1,p2] [--state=S] [--body="…" | --body-file=path]
//   node tools/events.mjs backfill [--transcripts=<dir>]   git history + session transcripts (idempotent)
//   node tools/events.mjs tail [n]

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOG = path.join(ROOT, "company/ops/events.jsonl");
const hash = (s, n = 10) => crypto.createHash("sha1").update(s).digest("hex").slice(0, n);

function readLog() {
  if (!fs.existsSync(LOG)) return [];
  return fs
    .readFileSync(LOG, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

function append(events) {
  const have = new Set(readLog().map((e) => e.id));
  const fresh = events.filter((e) => !have.has(e.id) && (have.add(e.id), true));
  if (!fresh.length) return 0;
  fs.appendFileSync(LOG, fresh.map((e) => JSON.stringify(e)).join("\n") + "\n");
  return fresh.length;
}

const ROOM_BY_ROLE = {
  "demo-builder": "build-floor",
  "fact-checker": "fact-check",
  "learner-evaluator": "learner-review",
  "pedagogy-critic": "learner-review",
  "qa-tester": "qa-lab",
  "accessibility-reviewer": "qa-lab",
  "release-manager": "launch-room",
  "principal-engineer": "engineering",
  "platform-engineer": "engineering",
  "evaluation-steward": "constitution",
  "backend-engineer": "backend",
  "privacy-reviewer": "backend",
  "growth-designer": "growth",
  "analytics-steward": "growth",
  "tools-lead": "tools",
  "hq-engineer": "tools",
  "lifehacks-safety-reviewer": "lifehacks-safety",
  "personalization-lead": "personalization",
  "learner-model-engineer": "model-lab",
  "localization-lead": "international",
  localizer: "locale-desks",
  "cultural-reviewer": "culture-review",
  "pattern-librarian": "meeting-crit",
  "head-of-product": "product",
  "principal-pm-verticals": "strategy",
  "design-lead": "design-studio",
  "interaction-designer": "design-studio",
  "visual-designer": "design-studio",
  "mockup-artist": "design-studio",
  "chief-of-staff": "chief-of-staff",
};
const roomFor = (role) => ROOM_BY_ROLE[role] ?? (role?.startsWith("cm-") ? role.split("-").slice(0, 2).join("-") : "chief-of-staff");

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
  const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(Number.isFinite(ind) ? ind : 0)).join("\n").trim();
}
const firstLine = (s, n = 140) => {
  const l = s.split("\n").find((x) => x.trim()) ?? "";
  return l.length > n ? l.slice(0, n - 1) + "…" : l;
};

function transcriptEvents(dir) {
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
            agents[raw] = { label: `${d.desc} ·${hash(raw, 4)}`, role: d.role };
            events.push({ id: `tx-${hash(raw + "dispatch")}`, ts: d.ts, type: "dispatch", room: roomFor(d.role), actor: "chief-of-staff", agent: agents[raw].label, subjects: [d.role], summary: `Dispatch ${d.role}${d.model ? ` (${d.model})` : ""}: ${d.desc}`, body: d.prompt, state: "working" });
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
        events.push({ id: `tx-${hash(m[1] + "report" + body.slice(0, 80))}`, ts, type: "report", room: roomFor(a.role), actor: a.role, agent: a.label, summary: `${a.label.split(" ·")[0]}: ${firstLine(body, 110)}`, body, state: "done" });
      }
      for (const m of q.matchAll(/<task-notification>[\s\S]*?<task-id>(a[0-9a-f]{8,})<\/task-id>[\s\S]*?<status>(\w+)<\/status>[\s\S]*?<summary>([\s\S]*?)<\/summary>/g)) {
        const a = agents[m[1]];
        if (!a || m[2] === "completed") continue;
        const reason = /session limit|rate_limit|429/.test(m[3]) ? "usage limit" : "ended early";
        events.push({ id: `tx-${hash(m[1] + "stop" + ts.slice(0, 16))}`, ts, type: "stopped", room: roomFor(a.role), actor: a.role, agent: a.label, summary: `${a.label.split(" ·")[0]} stopped: ${reason}`, body: m[3].trim(), state: "stopped" });
      }
    }
  }
  return events;
}

// ------------------------------------------------------------------ CLI

const [cmd, ...args] = process.argv.slice(2);
const opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));

if (cmd === "add") {
  for (const k of ["type", "room", "actor", "summary"]) if (!opt[k]) throw new Error(`--${k} is required`);
  const ts = opt.ts ?? new Date().toISOString();
  const e = { id: `ev-${hash(ts + opt.summary)}`, ts, type: opt.type, room: opt.room, actor: opt.actor, summary: opt.summary };
  if (opt.agent) e.agent = opt.agent;
  if (opt.subjects) e.subjects = String(opt.subjects).split(",");
  if (opt.refs) e.refs = String(opt.refs).split(",");
  if (opt.state) e.state = opt.state;
  if (opt.corrects) e.corrects = opt.corrects;
  if (opt["body-file"]) e.body = fs.readFileSync(opt["body-file"], "utf8");
  else if (opt.body) e.body = opt.body;
  append([e]);
  console.log(`added ${e.id}`);
} else if (cmd === "backfill") {
  const dir = opt.transcripts ?? path.join(os.homedir(), ".claude/projects");
  const all = [...gitEvents(), ...transcriptEvents(dir)].sort((a, b) => a.ts.localeCompare(b.ts));
  console.log(`backfill: ${append(all)} new event(s) (${all.length} seen)`);
} else if (cmd === "tail") {
  const n = Number(args[0] ?? 20);
  for (const e of readLog().sort((a, b) => a.ts.localeCompare(b.ts)).slice(-n)) console.log(`${e.ts.slice(0, 16).replace("T", " ")}  ${e.type.padEnd(9)} ${e.room.padEnd(15)} ${e.summary}`);
} else {
  console.log("usage: node tools/events.mjs add|backfill|tail  (see company/ops/events.md)");
}
