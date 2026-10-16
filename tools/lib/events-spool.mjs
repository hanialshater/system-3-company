// The hook event spool (ruling company/decisions/2026-10-16-cos-ruling-h2-hook-spool.md, PE-ops H2).
// .claude/hooks/agent-events.mjs appends here and never to company/ops/events.jsonl; the chief of staff folds
// the spool into events.jsonl with `node tools/events.mjs fold`, and stays the single writer of the log.
// Readers that must be right between folds (dispatch-check, metrics via dispatch-age) read the log plus the spool.
//
// Where the spool is (first match wins):
//   S3_SPOOL=<dir>                 tests, fixtures
//   S3_EVENTS=<file> is set        <dir of that file>/events-spool/  (so a fixture log never mixes with the real spool)
//   default                        <main checkout>/company/ops/events-spool/, the main checkout found through the
//                                  git common dir, so the main checkout, the integration worktree and every other
//                                  worktree share ONE spool (the ruling's open objection, resolved this way).
// Files: <YYYY-MM-DD>.jsonl (UTC date of the write). A fold in progress renames a file to *.folding-<pid>;
// readers read those too, so nothing disappears from the in-flight count mid-fold. The folder is gitignored.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** The main checkout of the repository that holds `root`, via .git (dir = main; file = worktree -> commondir). */
export function mainCheckout(root = ROOT) {
  try {
    const dotgit = path.join(root, ".git");
    const st = fs.statSync(dotgit);
    if (st.isDirectory()) return root;
    const gitdir = path.resolve(root, fs.readFileSync(dotgit, "utf8").match(/^gitdir:\s*(.+)$/m)[1].trim());
    const common = path.resolve(gitdir, fs.readFileSync(path.join(gitdir, "commondir"), "utf8").trim());
    if (path.basename(common) === ".git" && fs.existsSync(path.dirname(common))) return path.dirname(common);
  } catch {}
  return root;
}

export function spoolDir(root = ROOT) {
  if (process.env.S3_SPOOL) return path.resolve(process.env.S3_SPOOL);
  if (process.env.S3_EVENTS) return path.join(path.dirname(path.resolve(process.env.S3_EVENTS)), "events-spool");
  return path.join(mainCheckout(root), "company/ops/events-spool");
}

export const spoolFileFor = (date = new Date(), dir = spoolDir()) => path.join(dir, `${date.toISOString().slice(0, 10)}.jsonl`);

/** Spool files (active and mid-fold), oldest name first. */
export function spoolFiles(dir = spoolDir()) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.jsonl(\.folding-\d+)?$/.test(f)).sort().map((f) => path.join(dir, f));
}

/** Parse JSONL text; unparseable lines are counted, never thrown (E1: the readers' rule, now also the writer's). */
export function parseJsonl(text) {
  const events = [];
  const bad = [];
  for (const l of text.split("\n")) {
    if (!l.trim()) continue;
    try {
      events.push(JSON.parse(l));
    } catch {
      bad.push(l);
    }
  }
  return { events, bad };
}

export function readJsonlFile(file) {
  if (!fs.existsSync(file)) return { events: [], bad: [] };
  return parseJsonl(fs.readFileSync(file, "utf8"));
}

/** Every spooled event: { events, skipped, lines, files, oldest }. */
export function readSpool(dir = spoolDir()) {
  const files = spoolFiles(dir);
  const events = [];
  let skipped = 0;
  for (const f of files) {
    const r = readJsonlFile(f);
    for (const e of r.events) events.push(e); // F5: no push(...spread), it overflows the stack above ~120k events
    skipped += r.bad.length;
  }
  const oldest = events.reduce((m, e) => (typeof e?.ts === "string" && (!m || e.ts < m) ? e.ts : m), null);
  return { events, skipped, lines: events.length, files, oldest };
}

/** Log events plus spool events, deduped by id (the log's copy wins: it is the record). */
export function mergeById(logEvents, spoolEvents) {
  const have = new Set(logEvents.map((e) => e?.id).filter(Boolean));
  return [...logEvents, ...spoolEvents.filter((e) => !e?.id || !have.has(e.id) && (have.add(e.id), true))];
}
