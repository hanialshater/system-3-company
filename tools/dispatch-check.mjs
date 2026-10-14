#!/usr/bin/env node
// Dispatch preflight: the chief of staff runs this before EVERY Agent call. Exit 1 means do not dispatch.
// Source: company/reviews/org/2026-10-14-operating-audit.md (proposed 2026-10-14, founder to ratify).
// It turns the operating loop's rules into a check that fails loudly instead of a rule someone remembers.
//
//   node tools/dispatch-check.mjs --kind=<kind> [--running=N] [--builders=N] [--worktree=PATH] [--json]
//
// kind:  build    new lesson builds or revisions (anything that edits src/ and runs a dev server or QA)
//        wave     a batch of new work: builds, new briefs, new categories
//        check    fact-check, learner review, QA, design review of existing work
//        ritual   running a ritual (WBR, retro, crit, launch review, digest ...)
//        incident fixing a SEV1/SEV2 or a learner-harming bug
//        other    anything else (engineering, strategy, org)
// --running / --builders: the chief of staff's own count of agents still running (from the Agent tool).
//        The event log is also read; the larger number wins, so an unlogged agent cannot hide.
//
// Rules (each FAIL names the rule):
//   C1  at most 8 agents in flight: a dispatch that would make 9 fails (every kind).
//   C2  at most 3 builders in flight: a build/wave dispatch that would make 4 fails.
//   C3  builders work in a worktree: build/wave needs --worktree=<path> that is a git worktree, not the main checkout.
//   C4  host guard: build/wave fails when the 1-minute load is above 2 x CPUs or / has under 10 GB free;
//       check fails under 5 GB free.
//   R1  rituals before new work: wave/build fails while the WBR, retro or founder digest is due (tools/rituals-due.mjs).
//   R2  incidents before new work: wave/build fails while a SEV1/SEV2 incident event has no REVIEWED COE in
//       company/rituals/records/: header (lines before the first `## `) has `status: final`, `incident: <id>`
//       and `reviewers:`; every named reviewer has a `## Review (<role>, <date>)` section with `verdict: accept`;
//       no reviewer is the owner (tools/lib/coe-coverage.mjs; W-715, W-782). S3_COE_DIR overrides the folder (tests).
//   I1  founder intake: wave fails while a founder decision record dated 2026-10-15 or later has no
//       `class:` line, no `route:` line or no "## Objections" section (company/decisions/_template-founder-intake.md).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { coeCoverage } from "./lib/coe-coverage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const KINDS = ["build", "wave", "check", "ritual", "incident", "other"];
const kind = opt.kind;
if (!KINDS.includes(kind)) {
  console.error(`usage: node tools/dispatch-check.mjs --kind=<${KINDS.join("|")}> [--running=N] [--builders=N] [--worktree=PATH]`);
  process.exit(2);
}
const MAX_AGENTS = 8, MAX_BUILDERS = 3, STALE_H = 6, INTAKE_FROM = "2026-10-15";
const builds = kind === "build" || kind === "wave";
const fails = [], warns = [], info = [];

// ---- in flight: event log (dispatch without report/stopped in the last STALE_H hours) vs the caller's count
const evPath = process.env.S3_EVENTS ? path.resolve(process.env.S3_EVENTS) : path.join(ROOT, "company/ops/events.jsonl");
const events = fs.existsSync(evPath)
  ? fs.readFileSync(evPath, "utf8").split("\n").filter(Boolean).flatMap((l) => { try { return [JSON.parse(l)]; } catch { return []; } }).sort((a, b) => a.ts.localeCompare(b.ts))
  : [];
const open = new Map();
for (const e of events) {
  if (!e.agent) continue;
  if (e.type === "dispatch") open.set(e.agent, e);
  else if (e.type === "report" || e.type === "stopped") open.delete(e.agent);
}
const fresh = [...open.values()].filter((e) => Date.now() - Date.parse(e.ts) < STALE_H * 3.6e6);
const isBuilder = (e) => (e.subjects ?? []).includes("demo-builder") || /builder/i.test(e.agent ?? "");
const logAgents = fresh.length, logBuilders = fresh.filter(isBuilder).length;
const lastDispatch = events.filter((e) => e.type === "dispatch").at(-1)?.ts;
if (opt.running === undefined) warns.push("no --running count given: only the event log was read, and it misses unlogged agents");
const running = Math.max(logAgents, Number(opt.running ?? 0));
const builders = Math.max(logBuilders, Number(opt.builders ?? 0));
info.push(`in flight: ${running} agents, ${builders} builders (event log ${logAgents}/${logBuilders}, caller ${opt.running ?? "-"}/${opt.builders ?? "-"}; last logged dispatch ${lastDispatch ?? "never"})`);
if (lastDispatch && Date.now() - Date.parse(lastDispatch) > 3 * 3.6e6 && opt.running === undefined) warns.push("no dispatch logged for 3 h or more: the event log may have stopped recording (pass --running)");

if (running + 1 > MAX_AGENTS) fails.push(`C1 concurrency: ${running} agents in flight; this dispatch would make ${running + 1} (limit ${MAX_AGENTS})`);
if (builds && builders + 1 > MAX_BUILDERS) fails.push(`C2 builders: ${builders} builders in flight; this dispatch would make ${builders + 1} (limit ${MAX_BUILDERS})`);

// ---- C3 worktree
if (builds) {
  const wt = opt.worktree;
  if (!wt || wt === true) fails.push("C3 worktree: a build needs --worktree=<path> (isolation: worktree); builders never work in the main checkout");
  else {
    const abs = path.resolve(String(wt));
    let list = "";
    try { list = execFileSync("git", ["worktree", "list", "--porcelain"], { cwd: ROOT, encoding: "utf8" }); } catch {}
    const trees = list.split("\n").filter((l) => l.startsWith("worktree ")).map((l) => l.slice(9));
    if (abs === ROOT || abs === trees[0]) fails.push(`C3 worktree: ${abs} is the main checkout; the main tree's dev server is for evaluators only`);
    else if (!trees.includes(abs)) fails.push(`C3 worktree: ${abs} is not a git worktree of this repository (git worktree list)`);
  }
}

// ---- C4 host guard
const load1 = os.loadavg()[0], cpus = os.cpus().length;
let freeGB = Infinity;
try { const st = fs.statfsSync("/"); freeGB = (st.bavail * st.bsize) / 1e9; } catch {}
info.push(`host: load ${load1.toFixed(1)} on ${cpus} CPUs, ${freeGB.toFixed(1)} GB free on /`);
if (builds && load1 > 2 * cpus) fails.push(`C4 host load: ${load1.toFixed(1)} > ${2 * cpus} (2 x CPUs); wait for running builds to finish`);
if (builds && freeGB < 10) fails.push(`C4 disk: ${freeGB.toFixed(1)} GB free (< 10 GB); prune build dirs first (W-525)`);
else if (kind === "check" && freeGB < 5) fails.push(`C4 disk: ${freeGB.toFixed(1)} GB free (< 5 GB)`);
else if (freeGB < 15) warns.push(`disk: ${freeGB.toFixed(1)} GB free`);

// ---- R1 rituals
try {
  const { due } = await import("./rituals-due.mjs");
  const d = due();
  const blocking = d.filter((r) => r.due && ["wbr", "retro", "founder-digest"].includes(r.ritual));
  const other = d.filter((r) => r.due && !blocking.includes(r));
  if (builds) for (const r of blocking) fails.push(`R1 ritual overdue: ${r.ritual} (${r.reasons.join("; ")}); run it before new work`);
  else for (const r of blocking) warns.push(`ritual overdue: ${r.ritual}`);
  if (other.length) warns.push(`also due: ${other.map((r) => r.ritual).join(", ")}`);
} catch (e) { warns.push(`rituals-due failed: ${e.message}`); }

// ---- R2 incidents without a reviewed final COE that names them (W-715: by incident id; W-782: reviewers accept)
const recDir = process.env.S3_COE_DIR ? path.resolve(process.env.S3_COE_DIR) : path.join(ROOT, "company/rituals/records");
const { uncovered } = coeCoverage(events, recDir);
if (uncovered.length) {
  const first = uncovered[0];
  const msg = `R2 incidents: ${uncovered.length} SEV1/SEV2 incident(s) without a reviewed final COE naming their id (${uncovered.map((e) => e.id ?? "no id").join(", ")}), e.g. "${(first.summary ?? "").slice(0, 80)}"; ${uncovered.map((e) => `${e.id ?? "?"}: ${e.why}`).join("; ")}`;
  if (builds) fails.push(msg + "; the COE needs status: final, incident: <id> and reviewers: in its header, and verdict: accept from every reviewer (none the owner)"); else warns.push(msg);
}

// ---- I1 founder intake
const decDir = path.join(ROOT, "company/decisions");
const badIntake = [];
for (const f of fs.existsSync(decDir) ? fs.readdirSync(decDir) : []) {
  if (!/^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f) || f.slice(0, 10) < INTAKE_FROM) continue;
  const t = fs.readFileSync(path.join(decDir, f), "utf8");
  if (!/founder/i.test(t.split("\n").slice(0, 8).join("\n"))) continue;
  const miss = [!/^class:/m.test(t) && "class:", !/^route:/m.test(t) && "route:", !/^## Objections/m.test(t) && "## Objections"].filter(Boolean);
  if (miss.length) badIntake.push(`${f} (missing ${miss.join(", ")})`);
}
if (badIntake.length) {
  const msg = `I1 founder intake: ${badIntake.join("; ")}; see company/decisions/_template-founder-intake.md`;
  if (kind === "wave") fails.push(msg); else warns.push(msg);
}

// ---- report
const result = { kind, ok: fails.length === 0, fails, warns, info };
if (opt.json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`${result.ok ? "OK  " : "FAIL"} dispatch-check --kind=${kind}`);
  for (const l of info) console.log(`  ${l}`);
  for (const l of fails) console.log(`  FAIL ${l}`);
  for (const l of warns) console.log(`  warn ${l}`);
}
process.exitCode = result.ok ? 0 : 1;
