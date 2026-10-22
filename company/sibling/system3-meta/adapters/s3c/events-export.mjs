#!/usr/bin/env node
// events-export.mjs: System 3 Meta's work as company events (plan 2026-10-21-m4-m7-plan.md §M7 K21: "Meta advance/
// shipped/ritual/merge events are appended as company events.jsonl lines … so the company's trigger counters see Meta
// work. Only the chief-of-staff role writes"). The company's cadence (tools/rituals-due.mjs) counts merge, review,
// verify and publish events in company/ops/events.jsonl: without this, retro (5 merges), demo-crit (4 reviews),
// design-review (2 reviews) and launch-review never fire on Meta's own work.
//
//   node events-export.mjs --live=<dir> --repo=<integration worktree> [--commit] [--max=200]
//        --live: the Meta live dir (default META_LIVE_DIR; the state is META_STATE or state.json there)
//        --repo: the run's integration worktree: a linked worktree on a meta/* branch (lib/commit-file.mjs sandboxOf),
//                never the main checkout. Events are written by the company's own writer, `node <repo>/tools/events.mjs
//                add` (its id dedupe, its unreadable-line rule), into that worktree's company/ops/events.jsonl
//        --commit: commit company/ops/events.jsonl alone when it changed ("meta: events export (chief-of-staff code
//                step)"), so the integration worktree stays clean for integrate.mjs
//        --max: events written per run (default 200; the cursor carries the rest to the next run)
//
// Idempotent twice over: a cursor (<live>/exports/events-export.json: the last Meta event seq exported, for this state)
// and stable ids (`mt-<10 hex>` of the state path, its first event's time and the Meta seq), which events.mjs add
// will not write twice. The spec's `exports` runs it after each tick that changed the state (specs/s3c-m7.json).
//
// Mapping, read from the company, not guessed (company/ops/events.md: {id, ts, type, room, actor, summary, subjects,
// refs}; the rooms of company/rituals/triggers.json). Meta `advance` events of a lesson order: check → verify (room
// fact-check, the fact-checker), learner → review (learner-review), launch → decision (launch-room), ship passed →
// publish (launch-room, the release manager), the integration merge passed → merge (chief-of-staff). A ritual order
// (a chair flow) that is `shipped` (its record committed on the integration branch) → ritual, in its trigger's room,
// by its chair, with refs [the record] (the evidence its run stage was signed with). Other Meta events are not
// company events (the build stages, leases, sessions; dispatch is not exported: Meta's planner counts its own
// sessions and gives dispatch-check --running/--builders, and a dispatch with no report would count for 6 h).
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, exported, cursor, findings[]}. Exit 0 pass, 2 usage
// (a --repo that is not a sandbox worktree), 3 stage-error (the state or the company's writer failed).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F } from "./lib/proc.mjs";
import { sandboxOf, commitPaths } from "./lib/commit-file.mjs";

export const LOG = "company/ops/events.jsonl";
export const COMMIT_MSG = "meta: events export (chief-of-staff code step)";
const USAGE = "usage: events-export.mjs [--live=<dir>] --repo=<integration worktree> [--commit] [--max=200]";
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v); // state.mjs rev
const iso = (min) => new Date(Math.round(min * 60000)).toISOString();
const BRIEF = /(?:^|[\s·])brief (company\/domains\/briefs\/[A-Za-z0-9._-]+\.md):\d+-\d+/m; // state.mjs briefVars

/** The company event (without id and ts) one Meta event maps to, or null. `rooms`: ritual → its trigger's room. */
export function mapEvent(e, st, { rooms = {} } = {}) {
  const orders = st.engine?.orders instanceof Map ? st.engine.orders : new Map();
  const o = orders.get(e.order);
  if (!o) return null;
  const flows = st.engine?.flows instanceof Map ? st.engine.flows : new Map();
  const def = flows.get(o.flow);
  const chair = def?.stages?.[0]?.signer === "chair" || !!o.chair;
  const slug = o.slug ?? o.task ?? o.id;
  const refs = [o.workspace?.branch, o.workspace?.head].filter(Boolean);
  const base = { subjects: [slug], refs };
  const tag = `System 3 Meta ${o.id}`;
  if (!chair && e.type === "advance") {
    const v = e.verdict === "pass" ? "pass" : e.verdict;
    if (e.stage === "check") return { ...base, type: "verify", room: "fact-check", actor: e.by, summary: `${tag}: fact-check of ${slug}: ${v}` };
    if (e.stage === "learner") return { ...base, type: "review", room: "learner-review", actor: e.by, summary: `${tag}: learner review of ${slug}: ${v}` };
    if (e.stage === "launch") return { ...base, type: "decision", room: "launch-room", actor: e.by, summary: `${tag}: launch review of ${slug}: ${v === "pass" ? "go" : v}` };
    if (e.stage === "ship" && e.verdict === "pass") return { ...base, type: "publish", room: "launch-room", actor: e.by === "code" ? "release-manager" : e.by, summary: `${tag}: ${slug} published on ${o.workspace?.branch ?? "its branch"} (company publish, run by code)` };
    if (e.stage === "merge" && e.verdict === "pass") return { ...base, type: "merge", room: "chief-of-staff", actor: "chief-of-staff", summary: `${tag}: ${o.workspace?.branch ?? slug} merged into the run's integration branch (integrate.mjs, code)` };
    return null;
  }
  if (chair && e.type === "shipped") {
    const first = def?.stages?.[0]?.stage ?? "run";
    const record = (o.history ?? []).filter((h) => h.stage === first && h.evidence).at(-1)?.evidence ?? null;
    return { type: "ritual", room: rooms[slug] ?? "chief-of-staff", actor: o.chair ?? "chief-of-staff", summary: `${slug} held through ${tag} (chair ${o.chair}, attendee ${o.attendee})`, subjects: [slug], refs: [record, ...refs].filter(Boolean) };
  }
  return null;
}
/** The lesson's company domain (a board item's `domain`): the brief file's first name part (math.geometry.md → math). */
export const domainOf = (o) => { const m = BRIEF.exec(String(o?.accept ?? "")); return m ? path.basename(m[1]).split(".")[0] : null; };

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "events-export", findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["live", "repo", "commit", "max", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  if (o.commit != null && o.commit !== true) return usage("--commit takes no value");
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
  const curFile = path.join(path.resolve(live), "exports", "events-export.json");
  let cur = { state: runKey, seq: 0 };
  try { const c = JSON.parse(fs.readFileSync(curFile, "utf8")); if (c.state === runKey && Number.isInteger(c.seq)) cur = c; } catch {}
  let rooms = {};
  try { rooms = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(sb.root, "company/rituals/triggers.json"), "utf8")).triggers.map((t) => [t.ritual, t.room])); } catch {}
  const tool = path.join(sb.root, "tools/events.mjs");
  if (!fs.existsSync(tool)) return { exit: 3, out: { ok: false, stage: "events-export", findings: [F.env("tool", `no tools/events.mjs in ${sb.root}`)] } };
  const env = { ...process.env }; for (const k of ["NODE_TEST_CONTEXT", "S3_EVENTS", "S3_SPOOL"]) delete env[k]; // the worktree's own log
  const exported = [], findings = [];
  let seq = cur.seq;
  const saveCursor = () => { fs.mkdirSync(path.dirname(curFile), { recursive: true }); const tmp = `${curFile}.${process.pid}.tmp`; fs.writeFileSync(tmp, JSON.stringify({ state: runKey, seq, t: new Date().toISOString() }) + "\n"); fs.renameSync(tmp, curFile); };
  for (const e of events) {
    if (!(e.seq > cur.seq)) continue;
    if (exported.length >= max) break;
    const c = mapEvent(e, st, { rooms });
    if (c) {
      const id = `mt-${crypto.createHash("sha1").update(`${runKey}:${e.seq}`).digest("hex").slice(0, 10)}`;
      const args = [tool, "add", `--id=${id}`, `--ts=${iso(e.t)}`, `--type=${c.type}`, `--room=${c.room}`, `--actor=${c.actor}`, `--summary=${c.summary}`];
      if (c.subjects.length) args.push(`--subjects=${c.subjects.join(",")}`);
      if (c.refs.length) args.push(`--refs=${c.refs.join(",")}`);
      const r = spawnSync(process.execPath, args, { cwd: sb.root, env, encoding: "utf8", timeout: 30_000 });
      if (r.status !== 0) { findings.push(F.env("events-add", `events.mjs add ${id} (Meta seq ${e.seq}): exit ${r.status}: ${String(r.stderr || r.stdout).trim().slice(0, 300)}`)); break; }
      exported.push({ id, seq: e.seq, type: c.type, summary: c.summary, added: /^added /m.test(r.stdout) });
    }
    seq = e.seq;
  }
  try { saveCursor(); } catch (e) { findings.push(F.env("cursor", `cannot write ${curFile}: ${e.message}`)); }
  const out = { ok: !findings.length, stage: "events-export", repo: sb.root, branch: sb.branch, state: statePath, exported: exported.length, events: exported, cursor: seq, findings };
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
