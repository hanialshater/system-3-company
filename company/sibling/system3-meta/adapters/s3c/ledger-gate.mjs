#!/usr/bin/env node
// ledger-gate.mjs: the company's project budget gate as a System 3 Meta planner pre-check (plan
// 2026-10-21-m4-m7-plan.md §M5 "Adapters": "ledger-gate.mjs, which wraps `node tools/ledger.mjs gate <project>` as a
// planner pre-check so the company's project budget (B1) and Meta's order budget agree"). Read-only.
//
//   node ledger-gate.mjs <project> [--tokens=<planned>] [--repo=<path>]
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 = the company would
// dispatch (level ok or warn; a warn's reasons are advisory findings), 1 = it would not (level fail: park:true, route
// park, and the kind:budget ask the supervisor raises), 2 usage, 3 stage-error (the ledger tool did not run or said
// something this adapter cannot read).
//
// What the gate is, read from the company code, not guessed (tools/ledger.mjs and tools/lib/ledger.mjs gate()):
//   - the CLI is `node tools/ledger.mjs gate --project=<id> [--tokens=<planned>]` (the plan's `gate <project>` is
//     spelled --project); without --project it passes everything as small work, so this adapter always names one;
//   - it prints `<level>: <id>[ (<spent> of <budget>)]` then one indented line per reason, and exits 0 when the gate
//     passes (level ok or warn) and 1 when it does not (level fail: an unknown project or line, a major project at
//     100%, an approved project with no budget, a major project the forum has not approved);
//   - the register and the ledger are the repo's company/ops/projects.json and ledger.jsonl, found from the tool's own
//     path (tools/lib/ledger.mjs ROOT), unless S3_LEDGER / S3_PROJECTS point elsewhere: those test overrides are
//     dropped here, so the gate always reads the checkout it is given;
//   - an uncaught error in the tool also exits 1, so exit 1 counts as the gate's "fail" only when its first line says
//     `fail:`; anything else is a stage-error, not a park.
// A fail is a budget question, not a defect the builder can fix: the order parks with an ask (kind budget) before any
// session is spent. The supervisor decides how to raise it; this adapter only names it.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, parseArgs } from "./lib/proc.mjs";

const PROJECT = /^[a-z0-9]+(-[a-z0-9]+)*$/; // projects.json ids (tools/lib/ledger.mjs TAG: [a-z0-9-]+)
const USAGE = "usage: ledger-gate.mjs <project> [--tokens=<planned>] [--repo=<path>]";
const LINE = /^(ok|warn|fail): (\S+)(?: \((.+) of (.+)\))?$/;
const env = (kind, message) => ({ severity: "environment", kind, message });

/** The gate's printed answer: {level, project, spent, budget, reasons} (spent/budget as the tool formats them), or null. */
export function parseGate(stdout) {
  const lines = String(stdout ?? "").split("\n").filter((l) => l.trim());
  const m = LINE.exec(lines[0] ?? "");
  if (!m) return null;
  return { level: m[1], project: m[2], spent: m[3] ?? null, budget: m[4] ?? null, reasons: lines.slice(1).filter((l) => /^\s+\S/.test(l)).map((l) => l.trim()) };
}

export function check(repo, project, { tokens = null } = {}) {
  const tool = path.join(repo, "tools/ledger.mjs");
  if (!fs.existsSync(tool)) return { exit: 3, out: { ok: false, stage: "ledger-gate", project, findings: [env("repo", `${repo} has no tools/ledger.mjs (not a System 3 Company checkout)`)] } };
  const e = { ...process.env }; for (const k of ["S3_LEDGER", "S3_PROJECTS", "NODE_TEST_CONTEXT"]) delete e[k];
  const r = spawnSync(process.execPath, [tool, "gate", `--project=${project}`, ...(tokens != null ? [`--tokens=${tokens}`] : [])], { cwd: repo, env: e, encoding: "utf8", timeout: 60_000 });
  const g = parseGate(r.stdout);
  const said = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim().split("\n").slice(0, 3).join(" | ");
  if (r.error || !g || g.project !== project || ![0, 1].includes(r.status) || (r.status === 0) !== (g.level !== "fail"))
    return { exit: 3, out: { ok: false, stage: "ledger-gate", project, findings: [env("ledger", `tools/ledger.mjs gate --project=${project} did not answer as a gate (exit ${r.status ?? r.signal ?? r.error?.code}): ${said || "no output"}`)] } };
  const base = { stage: "ledger-gate", project, level: g.level, spent: g.spent, budget: g.budget, reasons: g.reasons, planned: tokens };
  if (g.level !== "fail") return { exit: 0, out: { ok: true, ...base, park: false, findings: g.reasons.map((m) => ({ severity: "advisory", kind: "budget", message: m })) } };
  const why = g.reasons.join("; ") || `${project} fails the company's budget gate`;
  return {
    exit: 1,
    out: {
      ok: false, ...base, park: true,
      ask: { kind: "budget", text: `The company's budget gate refuses new work on ${project}${g.budget ? ` (${g.spent} of ${g.budget})` : ""}: ${why}. Top it up through the project review (company/ops/token-budget.md), or keep the order parked.` },
      findings: [{ severity: "block", kind: "budget", route: "park", message: `ledger gate ${project}: ${why}` }],
    },
  };
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "ledger-gate", findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "tokens", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  const [project, ...extra] = o.positional;
  if (!project || extra.length || !PROJECT.test(project)) return usage("one projects.json id <project> is required");
  if (o.tokens != null && !/^\d+$/.test(String(o.tokens))) return usage("--tokens is a whole number of planned tokens");
  if (o.repo === true) return usage("--repo needs a path");
  return check(path.resolve(String(o.repo ?? DEFAULT_REPO)), project, { tokens: o.tokens != null ? Number(o.tokens) : null });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "ledger-gate", findings: [env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
