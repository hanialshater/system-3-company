#!/usr/bin/env node
// Operational health scorecard for the ops review (company/engineering/operations/README.md).
// Reads only local files: the event log, the board, the tier registry, COE and review records.
// GitHub issues/PRs and CI are fetched by the agent with the GitHub tools and pasted alongside.
//
//   node tools/ops-health.mjs [--md] [--hours=24]

import fs from "node:fs";
import { dedupeUsage } from "./lib/usage.mjs";
import { readJsonlFile } from "./lib/events-spool.mjs";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const H = Number(opt.hours ?? 24);
// E1 / S2 (W-1272): an unreadable line (conflict marker, torn write) is skipped and counted, never thrown.
const { events, bad: badLines } = readJsonlFile("company/ops/events.jsonl");
if (badLines.length) process.stderr.write(`ops-health: ${badLines.length} unreadable line(s) skipped in company/ops/events.jsonl\n`);
const now = Date.now();
const within = (e, h) => now - Date.parse(e.ts) <= h * 3600_000;
const tiers = JSON.parse(fs.readFileSync("company/engineering/operations/tiers.json", "utf8"));
const board = JSON.parse(fs.readFileSync("company/ops/board.json", "utf8")).items;
const open = board.filter((i) => !["done", "dropped"].includes(i.state));

// Agents: runs, stops, tokens and burn rate.
// One record per run: a resumed run re-logs cumulative usage (W-941, tools/lib/usage.mjs).
const usage = dedupeUsage(events.filter((e) => e.type === "usage"));
const recent = usage.filter((e) => within(e, H));
const sum = (xs, f) => xs.reduce((s, x) => s + (f(x) || 0), 0);
const dispatches = events.filter((e) => e.type === "dispatch");
const stops = events.filter((e) => e.type === "stopped");
const tok = sum(usage, (e) => e.tokens);
const tokRecent = sum(recent, (e) => e.tokens);
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };

// Incidents and COEs.
const incidents = events.filter((e) => e.type === "incident");
const coes = fs.readdirSync("company/rituals/records").filter((f) => /coe/.test(f));
// Ops reviews live in company/engineering/operations/ (principal-engineer-ops) or company/rituals/records/;
// read both, so a held review is never reported as "never held" (W-542).
const OPS_DIRS = ["company/rituals/records", "company/engineering/operations"];
const lastOps = OPS_DIRS.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d) : []).filter((f) => /^\d{4}-\d{2}-\d{2}.*ops-review/.test(f))).sort().pop();

// Tier registry: anything not ok, worst tier first.
const reg = ["services", "data", "security", "ux_deficits"].flatMap((k) => (tiers[k] ?? []).map((x) => ({ ...x, kind: k })));
const notOk = reg.filter((x) => x.status !== "ok").sort((a, b) => a.tier.slice(1) - b.tier.slice(1));
const red = notOk.filter((x) => x.tier.endsWith("1"));

// Work: triage.
const untriaged = open.filter((i) => !i.priority).length;
const byP = [1, 2, 3, 4].map((p) => open.filter((i) => i.priority === p).length);

const rows = [
  ["Agent runs (all time)", `${usage.length} finished, ${dispatches.length} dispatched, ${stops.length} stopped (${usage.length ? Math.round((100 * stops.length) / (usage.length + stops.length)) : 0}% stop rate)`],
  ["Tokens (all time)", `${Math.round(tok / 1000)}k; median ${Math.round(median(usage.map((e) => e.tokens || 0)) / 1000)}k per run; median ${Math.round(median(usage.map((e) => e.durationMs || 0)) / 60000)} min per run`],
  [`Burn rate (last ${H} h)`, `${Math.round(tokRecent / 1000)}k tokens in ${recent.length} runs = ${Math.round(tokRecent / H / 1000)}k tokens/hour`],
  ["Incidents", `${incidents.length} total, ${incidents.filter((e) => within(e, 168)).length} in the last 7 days; ${coes.length} COE record(s)`],
  ["Tier registry", `${reg.length} entries, ${notOk.length} not ok, ${red.length} tier-1 red line(s)`],
  ["Open work", `${open.length} open: P1 ${byP[0]}, P2 ${byP[1]}, P3 ${byP[2]}, P4 ${byP[3]}, untriaged ${untriaged}`],
  ["Last ops review", lastOps ?? "never held"],
];

if (opt.md) {
  console.log(`| Metric | Value |\n|---|---|\n${rows.map(([k, v]) => `| ${k} | ${v} |`).join("\n")}\n`);
  console.log(`**Not ok in the tier registry** (worst first)\n\n| Tier | Kind | Item | Owner | Status | Note |\n|---|---|---|---|---|---|`);
  for (const x of notOk) console.log(`| ${x.tier} | ${x.kind} | ${x.id} | ${x.owner} | ${x.status} | ${x.note} |`);
  console.log(`\n_GitHub open issues and PRs, and CI on the last push: fetch with the GitHub tools and add here._`);
} else {
  for (const [k, v] of rows) console.log(`${k.padEnd(24)} ${v}`);
  console.log("\nNot ok:");
  for (const x of notOk) console.log(`  ${x.tier.padEnd(3)} ${x.id.padEnd(32)} ${x.status.padEnd(9)} ${x.owner}`);
}
