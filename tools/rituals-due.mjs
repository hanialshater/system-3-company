#!/usr/bin/env node
// Which rituals are due now, from company/rituals/triggers.json and the event log.
// A ritual is "held" when an event lands in its room with type ritual/publish/note (see each trigger's room).
//   node tools/rituals-due.mjs [--json]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDue } from "./lib/rituals.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const triggers = JSON.parse(fs.readFileSync(path.join(ROOT, "company/rituals/triggers.json"), "utf8")).triggers;
const events = fs.existsSync(path.join(ROOT, "company/ops/events.jsonl"))
  ? fs.readFileSync(path.join(ROOT, "company/ops/events.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).sort((a, b) => a.ts.localeCompare(b.ts))
  : [];
export const due = (now = Date.now()) => computeDue(triggers, events, now);

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const d = due();
  if (process.argv.includes("--json")) console.log(JSON.stringify(d, null, 2));
  else for (const r of d) console.log(`${r.due ? "DUE " : "ok  "} ${r.ritual.padEnd(15)} last ${r.last ? r.last.slice(0, 16).replace("T", " ") : "never".padEnd(16)}  ${r.reasons.join("; ")}`);
}
