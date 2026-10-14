#!/usr/bin/env node
// The token ledger: actual spend per agent run, against a project or budget line.
// System and rules: company/ops/token-budget.md. Register: company/ops/projects.json. Ledger: company/ops/ledger.jsonl (append-only).
//
//   node tools/ledger.mjs import                      # new usage/stopped events -> ledger lines (idempotent)
//   node tools/ledger.mjs add --project=<id> --role=<role> --agent="<label>" --tokens=<n> --duration-ms=<n> --outcome=done|stopped|failed [--model=sonnet] [--note=".."]
//   node tools/ledger.mjs report [--project=<id>] [--json]
//   node tools/ledger.mjs gate --project=<id> [--tokens=<planned>]   # dispatch preflight: exit 1 = do not dispatch
//   node tools/ledger.mjs check                       # register + ledger rules; exit 1 on an error
//   node tools/ledger.mjs propose --project=<id>      # log a proposal event: fires the project-review ritual
import { execFileSync } from "node:child_process";
import { appendLedger, fmt, gate, importFromEvents, problems, readLedger, readRegister, summary, ROOT } from "./lib/ledger.mjs";

const [cmd, ...args] = process.argv.slice(2);
const opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const reg = readRegister();

if (cmd === "import") {
  const lines = importFromEvents(reg);
  appendLedger(lines);
  const t = lines.reduce((n, l) => n + (l.tokens ?? 0), 0);
  console.log(`ledger import: ${lines.length} new line(s), ${fmt(t)} measured tokens, ${lines.filter((l) => l.tokens == null).length} stopped run(s) with no token record`);
} else if (cmd === "add") {
  for (const k of ["project", "role", "outcome"]) if (!opt[k]) die(`--${k} is required`);
  if (!reg.projects.some((p) => p.id === opt.project)) die(`unknown project ${opt.project} (company/ops/projects.json)`);
  if (!["done", "stopped", "failed"].includes(opt.outcome)) die("--outcome is done, stopped or failed");
  const tokens = opt.tokens == null ? null : Number(opt.tokens);
  if (tokens != null && !Number.isFinite(tokens)) die("--tokens must be the harness number (subagent_tokens), not an estimate");
  const ts = opt.ts ?? new Date().toISOString();
  const line = {
    id: `L-m${Date.parse(ts).toString(36)}`, ts, project: opt.project, role: opt.role, agent: opt.agent ?? null, model: opt.model ?? null,
    tokens, durationMs: opt["duration-ms"] == null ? null : Number(opt["duration-ms"]), outcome: opt.outcome,
    measured: tokens == null ? "not measured" : "tokens+duration copied from the harness usage report",
    attribution: "tagged", source: `manual:${opt.by ?? "chief-of-staff"}`,
  };
  if (opt.note) line.note = String(opt.note);
  const g = gate(reg, opt.project, { now: ts });
  appendLedger([line]);
  console.log(`added ${line.id}: ${opt.project} ${fmt(tokens)} (${opt.outcome})`);
  // Spend is a fact and is always recorded; work the gate refuses is recorded AND fails loudly.
  if (!g.pass) { console.error(`GATE: ${g.reasons.join("; ")}`); process.exit(1); }
  for (const r of g.reasons) console.log(`warn: ${r}`);
} else if (cmd === "gate") {
  if (!opt.project) {
    console.log("ok: untagged work is treated as small work (token-budget.md section 6). Tag major work with [project:<id>].");
    process.exit(0);
  }
  const g = gate(reg, opt.project, { planned: Number(opt.tokens ?? 0) });
  console.log(`${g.level}: ${opt.project}${g.budget != null ? ` (${fmt(g.spent)} of ${fmt(g.budget)})` : ""}${g.reasons.length ? "\n  " + g.reasons.join("\n  ") : ""}`);
  process.exit(g.pass ? 0 : 1);
} else if (cmd === "check") {
  const { errors, warnings } = problems(reg, readLedger());
  for (const w of warnings) console.log(`warn: ${w}`);
  for (const e of errors) console.error(`ERROR: ${e}`);
  console.log(`ledger check: ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(errors.length ? 1 : 0);
} else if (cmd === "propose") {
  if (!opt.project) die("--project is required");
  const p = reg.projects.find((x) => x.id === opt.project);
  if (!p) die(`register ${opt.project} in company/ops/projects.json first (status proposed)`);
  execFileSync("node", ["tools/events.mjs", "add", "--type=proposal", "--room=boardroom", `--actor=${p.owner}`, `--summary=Project proposal: ${p.title}`, `--subjects=${p.id}`, `--refs=${p.proposal ?? "company/ops/projects.json"}`], { cwd: ROOT, stdio: "inherit" });
} else if (cmd === "report") {
  const s = summary(reg);
  let rows = s.rows;
  if (opt.project) rows = rows.filter((r) => r.id === opt.project);
  if (opt.json) { console.log(JSON.stringify({ ...s, rows }, null, 2)); process.exit(0); }
  console.log(`Token ledger (${new Date().toISOString().slice(0, 10)}): ${s.runs} runs, ${fmt(s.total)} measured tokens, ${s.unmeasured} stopped runs unmeasured, ${s.noRecord} dispatched agents with no usage or stop record`);
  console.log(`Attribution of measured tokens: ${Object.entries(s.byAttr).map(([k, v]) => `${k} ${fmt(v)}`).join(" · ")}`);
  console.log(`Headline: ${fmt(s.perPublishedAll)} tokens per published lesson, all spend / ${s.published} published (subagents only; coordinator not included)`);
  console.log(`Event log usage records end at ${s.lastUsage ?? "—"}; runs after that are not in the ledger until \`node tools/events.mjs backfill\` then \`ledger.mjs import\`.\n`);
  console.log(`${"line".padEnd(22)} ${"status".padEnd(10)} M ${"budget".padStart(7)} ${"vs bud".padStart(7)} ${"%".padStart(4)} ${"spent".padStart(7)} ${"runs".padStart(4)} ${"unm".padStart(3)} ${"pub".padStart(4)} ${"claimsV".padStart(7)} ${"fixed".padStart(5)} ${"k/pub".padStart(6)}`);
  for (const r of rows) {
    const flag = r.pct == null ? "" : r.pct >= 100 ? " STOP" : r.pct >= 80 ? " 80%" : "";
    const ret = r.returns ?? {};
    console.log(`${r.id.padEnd(22)} ${String(r.status).padEnd(10)} ${r.major ? "Y" : " "} ${fmt(r.budget).padStart(7)} ${fmt(r.against).padStart(7)} ${String(r.pct ?? "—").padStart(4)} ${fmt(r.spent).padStart(7)} ${String(r.runs).padStart(4)} ${String(r.unmeasuredRuns).padStart(3)} ${String(ret.published ?? "—").padStart(4)} ${String(ret.claimsVerified ?? "—").padStart(7)} ${String(ret.findingsFixed ?? "—").padStart(5)} ${String(r.perPublished ? Math.round(r.perPublished / 1000) : "—").padStart(6)}${flag}`);
  }
  const notes = rows.filter((r) => r.returns?.why && r.returns.why !== "unattributed");
  if (notes.length) console.log(`\nNot measured:\n${notes.map((r) => `  ${r.id}: ${r.returns.why}`).join("\n")}`);
  console.log(`\nColumns: M = major; vs bud = spend since the budget was set; unm = stopped runs with no token record; pub = published lessons in scope (all time); k/pub = all spend on the line / published.`);
} else {
  console.log("usage: node tools/ledger.mjs import | add | report [--project=] | gate --project= | check | propose --project=   (company/ops/token-budget.md)");
}

function die(m) { console.error(m); process.exit(1); }
