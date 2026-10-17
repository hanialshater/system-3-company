#!/usr/bin/env node
// Which rituals are due now, from company/rituals/triggers.json, the committed ritual records and the event log.
// A ritual is "held" only when its committed record exists: company/rituals/records/<date>-<ritual>*.md (or
// company/engineering/operations/<date>-ops-review*.md), timed by its last commit (tools/lib/ritual-records.mjs).
// Events count as held only where a trigger names them in `heldByEvents` (launch-review: publish). Every other event
// only feeds the counters (merges, reviews, incidents, proposals ...). External assessment 2026-10-17 §3.
//   node tools/rituals-due.mjs [--json]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDue } from "./lib/rituals.mjs";
import { recordEvents } from "./lib/ritual-records.mjs";
import { readJsonlFile } from "./lib/events-spool.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const triggers = JSON.parse(fs.readFileSync(path.join(ROOT, "company/rituals/triggers.json"), "utf8")).triggers;
// E1 / S2 (W-1272): an unreadable line is skipped and counted on stderr, never thrown (readJsonlFile: [] if no log).
const { events: logEvents, bad: badLines } = readJsonlFile(path.join(ROOT, "company/ops/events.jsonl"));
if (badLines.length) process.stderr.write(`rituals-due: ${badLines.length} unreadable line(s) skipped in company/ops/events.jsonl\n`);
const events = logEvents.filter((e) => e && typeof e.ts === "string").sort((a, b) => a.ts.localeCompare(b.ts));
const all = [...events, ...recordEvents(triggers, { root: ROOT })].sort((a, b) => a.ts.localeCompare(b.ts));
export const due = (now = Date.now()) => computeDue(triggers, all, now);

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const d = due();
  if (process.argv.includes("--json")) console.log(JSON.stringify(d, null, 2));
  else for (const r of d) console.log(`${r.due ? "DUE " : "ok  "} ${r.ritual.padEnd(15)} last ${r.last ? r.last.slice(0, 16).replace("T", " ") : "never".padEnd(16)}  ${r.reasons.join("; ")}${r.heldBy ? `  [held: ${r.heldBy}]` : ""}`);
}
