// How old is the newest `dispatch` event? If the log stops recording (W-716: dark from 2026-10-14 15:59
// and again from 2026-10-15 08:55), every agent metric reads as "idle", so the age is printed beside them.
// Used by tools/metrics.mjs; B5 (tools/lib/ops-signals.mjs, `company status` amendment) reuses it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeById, readJsonlFile, readSpool } from "./events-spool.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const STALE_DISPATCH_H = 6;

/** The event log path: S3_EVENTS if set (tests, fixtures), else company/ops/events.jsonl. */
export const eventsPath = () => (process.env.S3_EVENTS ? path.resolve(process.env.S3_EVENTS) : path.join(ROOT, "company/ops/events.jsonl"));

/**
 * Parsed events from a JSONL file; unreadable lines are skipped. With the default file (the log), the hook
 * spool is read too (ruling H2), deduped by id, so counts are right between folds. The array carries
 * `skipped` (unreadable log lines, PE-ops H4) and `spool` ({ lines, skipped, oldest }) for metrics to print.
 */
export function readEvents(file = eventsPath(), { spool = file === eventsPath() } = {}) {
  const log = readJsonlFile(file);
  const sp = spool ? readSpool() : { events: [], skipped: 0, lines: 0, oldest: null };
  const out = mergeById(log.events, sp.events);
  out.skipped = log.bad.length;
  out.spool = { lines: sp.lines, skipped: sp.skipped, oldest: sp.oldest };
  return out;
}

/**
 * { ts, hours, stale } for the newest dispatch event. ts and hours are null when there is none,
 * and that counts as stale (a log with no dispatch cannot say who ran).
 */
export function lastDispatchAge(events, now = Date.now(), staleH = STALE_DISPATCH_H) {
  let ts = null;
  for (const e of events) if (e?.type === "dispatch" && typeof e.ts === "string" && (!ts || e.ts > ts)) ts = e.ts;
  if (!ts) return { ts: null, hours: null, stale: true };
  const hours = Math.max(0, (now - Date.parse(ts)) / 3.6e6);
  return { ts, hours, stale: hours > staleH };
}

/** "last dispatch event: 3.2 h ago (2026-10-16T10:09Z)" or "last dispatch event: never". */
export function lastDispatchLine(age) {
  if (!age.ts) return "last dispatch event: never";
  const h = age.hours < 10 ? age.hours.toFixed(1) : String(Math.round(age.hours));
  return `last dispatch event: ${h} h ago (${age.ts.slice(0, 16)}Z)${age.stale ? ` STALE: over ${STALE_DISPATCH_H} h, the log may have stopped recording` : ""}`;
}
