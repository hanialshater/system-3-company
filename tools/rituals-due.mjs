#!/usr/bin/env node
// Which rituals are due now, from company/rituals/triggers.json and the event log.
// A ritual is "held" when an event lands in its room with type ritual/publish/note (see each trigger's room).
//   node tools/rituals-due.mjs [--json]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDue } from "./lib/rituals.mjs";
import { readJsonlFile } from "./lib/events-spool.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const triggers = JSON.parse(fs.readFileSync(path.join(ROOT, "company/rituals/triggers.json"), "utf8")).triggers;
// E1 / S2 (W-1272): an unreadable line is skipped and counted on stderr, never thrown (readJsonlFile: [] if no log).
const { events: logEvents, bad: badLines } = readJsonlFile(path.join(ROOT, "company/ops/events.jsonl"));
if (badLines.length) process.stderr.write(`rituals-due: ${badLines.length} unreadable line(s) skipped in company/ops/events.jsonl\n`);
const events = logEvents.filter((e) => e && typeof e.ts === "string").sort((a, b) => a.ts.localeCompare(b.ts));
// A ritual record on disk also counts as "held" (2026-10-14 operating audit): the event log stopped
// recording dispatches and rituals after 16:00 that day, so rituals that were held looked overdue.
// Records: company/rituals/records/<date>-<ritual>*.md and company/engineering/operations/<date>-ops-review*.md.
// Time held = the file's last commit time. Uncommitted drafts do not count: a ritual is held when its record is on disk in git.
import { execFileSync } from "node:child_process";
const RECORD_DIRS = ["company/rituals/records", "company/engineering/operations"];
function recordEvents() {
  const out = [];
  for (const d of RECORD_DIRS) {
    const dir = path.join(ROOT, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
      if (!m) continue;
      const tr = triggers.find((t) => m[2] === t.ritual || m[2].startsWith(t.ritual + "-"));
      if (!tr) continue;
      let ts = "";
      try { ts = execFileSync("git", ["log", "-1", "--format=%cI", "--", path.join(d, f)], { cwd: ROOT, encoding: "utf8" }).trim(); } catch {}
      if (!ts) continue;
      ts = new Date(ts).toISOString();
      out.push({ ts, type: "ritual", room: tr.room, actor: "record", summary: `${d}/${f}` });
    }
  }
  return out;
}
const all = [...events, ...recordEvents()].sort((a, b) => a.ts.localeCompare(b.ts));
export const due = (now = Date.now()) => computeDue(triggers, all, now);

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const d = due();
  if (process.argv.includes("--json")) console.log(JSON.stringify(d, null, 2));
  else for (const r of d) console.log(`${r.due ? "DUE " : "ok  "} ${r.ritual.padEnd(15)} last ${r.last ? r.last.slice(0, 16).replace("T", " ") : "never".padEnd(16)}  ${r.reasons.join("; ")}`);
}
