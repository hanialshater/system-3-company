// Committed ritual records as "held" events for computeDue (tools/lib/rituals.mjs). Used by tools/rituals-due.mjs and
// HQ (src/lib/hq.ts), so both read the same rule (external assessment 2026-10-17 §3).
//
// A record is company/rituals/records/<date>-<ritual>*.md (or company/engineering/operations/<date>-ops-review*.md)
// that is on disk AND in git. Time held = its last commit time. An uncommitted draft does not count, and neither
// does a record deleted from disk. The ritual is the longest trigger id that the name equals or starts with plus
// "-" (so `launch-review-wave-j-3.md` is launch-review, `retro-2.md` is retro).
//
// One `git log` for both folders, not one per file (the old reader ran 77 of them on every dispatch-check). The time
// is the last non-merge commit that changed the file. The old per-file `git log -1` agreed on 75 of 77 records on
// 2026-10-17; the other 2 it timed at the merge that brought them in (1.5 h and 33 min later).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const RECORD_DIRS = ["company/rituals/records", "company/engineering/operations"];

/** Last commit time per repo-relative path under RECORD_DIRS: Map<path, iso>. Empty if git is unavailable. */
export function commitTimes(root, dirs = RECORD_DIRS) {
  const out = new Map();
  let text = "";
  try { text = execFileSync("git", ["log", "--format=%x00%cI", "--name-only", "--", ...dirs], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 15_000, stdio: ["ignore", "pipe", "ignore"] }); } catch { return out; }
  let ts = null;
  for (const l of text.split("\n")) {
    if (l.startsWith("\0")) { ts = new Date(l.slice(1).trim()).toISOString(); continue; }
    const f = l.trim();
    if (f && ts && !out.has(f)) out.set(f, ts); // git log is newest first: the first time seen is the last commit
  }
  return out;
}

/** The trigger a record file name belongs to, or null. */
export function ritualOf(file, triggers) {
  const m = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/.exec(path.basename(file));
  if (!m) return null;
  const hits = triggers.filter((t) => m[2] === t.ritual || m[2].startsWith(t.ritual + "-"));
  return hits.sort((a, b) => b.ritual.length - a.ritual.length)[0] ?? null;
}

/** Record events: { ts, type: "ritual", ritual, record, room, actor: "record", summary }. `times` may be injected (tests). */
export function recordEvents(triggers, { root, times = commitTimes(root) } = {}) {
  const out = [];
  for (const d of RECORD_DIRS) {
    const dir = path.join(root, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const tr = ritualOf(f, triggers);
      if (!tr) continue;
      const rel = `${d}/${f}`;
      const ts = times.get(rel);
      if (!ts) continue; // not committed
      out.push({ ts, type: "ritual", ritual: tr.ritual, record: rel, room: tr.room, actor: "record", summary: rel });
    }
  }
  return out;
}
