#!/usr/bin/env node
// Benchmark 12: turn record.tcl's recordings of SQLite's own test files into scripts for the driver (one SQL block per
// line; a fresh database per segment), then keep only what real SQLite runs deterministically, and record its outputs.
//   node convert.mjs --rec=<dir of *.test.rec> --ref=<sqlrun with ~~~> --out=<dir>
// Rules: test files of subsystems an in-memory build without extensions cannot run are skipped (SKIP); a block with a
// newline inside a string literal or a Tcl variable ($name outside strings) is dropped; comments are stripped and
// whitespace collapsed outside strings; at most MAX_LINES lines per test file; a line whose reference output names a
// Tcl-only function or module, or a missing file, is dropped (and the script re-run); a script whose two reference
// runs differ is dropped.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
export const MAX_LINES = Number(opt["max-lines"] ?? 300), MAX_SEGMENTS = 40;
export const SKIP = /^(crash|ioerr|malloc|fault|mallocfault|memsubsys|thread|wal|walfault|fts|rtree|session|backup|vtab|journal|lock|pager|corrupt|tkt2686|mmap|shared|incrblob|bigfile|multiplex|quota|zipfile|sqllimits|tclsqlite|e_walauto|unixexcl|symlink|win32|vfs|async|speed|soak|fuzz|stmtvtab|sessionfuzz|recover|dbfuzz|oserror|bestindex|swarmvtab|csv|tester|capi|sync|savepoint6|exclusive|attach|hook|progress|interrupt|busy|delete_db|filectrl|cachespill|memdb|serialize|rbu|lsm|zipvfs|cksumvfs|changeset|unionvtab|json1ext|e_wal|mjournal|manydb|snapshot|shell|notify|e_vacuum|vacuum|nolock|e_uri|uri|io|e_blobopen|mutex|pcache|e_fts|walmode)/;

/** strip -- and C comments, collapse whitespace outside string literals; null if unusable */
export function oneLine(sql) {
  let out = "", i = 0, q = null, sp = false;
  while (i < sql.length) {
    const c = sql[i], n = sql[i + 1];
    if (q) { out += c; if (c === "\n") return null; if (c === q) { if (n === q) { out += n; i += 2; continue; } q = null; } i++; continue; }
    if (c === "'" || c === '"' || c === "`") { q = c; out += c; sp = false; i++; continue; }
    if (c === "[") { const j = sql.indexOf("]", i); if (j < 0) return null; out += sql.slice(i, j + 1); i = j + 1; sp = false; continue; }
    if (c === "-" && n === "-") { while (i < sql.length && sql[i] !== "\n") i++; continue; }
    if (c === "/" && n === "*") { const j = sql.indexOf("*/", i + 2); i = j < 0 ? sql.length : j + 2; continue; }
    if (c === "$") return null; // a Tcl variable the shim did not substitute
    if (/\s/.test(c)) { if (!sp && out) { out += " "; sp = true; } i++; continue; }
    out += c; sp = false; i++;
  }
  out = out.trim();
  return out && !/^;*$/.test(out) ? out : null;
}
/** a .rec file into segments of SQL lines */
export function segments(rec) {
  const segs = [[]];
  for (const l of rec.split("\n")) {
    if (l === "RESET") { if (segs.at(-1).length) segs.push([]); continue; }
    if (!l.startsWith("SQL ")) continue;
    // record.tcl escapes backslash, newline and CR so that each SQL block is one line
    const s = l.slice(4).replace(/\\(\\|n|r)/g, (_, c) => (c === "n" ? "\n" : c === "r" ? "\r" : "\\"));
    const one = oneLine(s); if (one) segs.at(-1).push(one);
  }
  return segs.filter((s) => s.length);
}
const run = (ref, file) => spawnSync(ref, [file], { maxBuffer: 256 << 20, timeout: 20_000 });
const blocks = (buf) => { const out = []; let cur = []; for (const l of buf.toString("utf8").split("\n")) { if (l === "~~~") { out.push(cur.join("\n")); cur = []; } else cur.push(l); } return out; };
const BAD = /no such function: (test_|tcl|db_|real2str|instr_|eval|counter|randstr|hex_to_utf|sqlite_|wholenumber|tointeger|toreal|nondeter|abs_)|no such module|unable to open database|disk I\/O error|out of memory|database is locked|no such vfs|not authorized|interrupted/i;

if (import.meta.url === `file://${process.argv[1]}`) {
  const recDir = path.resolve(opt.rec), ref = path.resolve(opt.ref), out = path.resolve(opt.out);
  fs.mkdirSync(out, { recursive: true });
  const stats = { files: 0, skipped: 0, scripts: 0, lines: 0, dropped: { unstable: 0, bad: 0, slow: 0, empty: 0 } };
  for (const f of fs.readdirSync(recDir).filter((x) => x.endsWith(".test.rec")).sort()) {
    const base = f.replace(/\.test\.rec$/, "");
    if (SKIP.test(base)) { stats.skipped++; continue; }
    stats.files++;
    let budget = MAX_LINES, k = 0;
    for (let seg of segments(fs.readFileSync(path.join(recDir, f), "utf8")).slice(0, MAX_SEGMENTS)) {
      if (budget <= 0) break;
      seg = seg.slice(0, budget);
      const name = `${base}-${String(k).padStart(3, "0")}`, sql = path.join(out, `${name}.sql`);
      for (let pass = 0; pass < 3; pass++) {
        fs.writeFileSync(sql, seg.join("\n") + "\n");
        const a = run(ref, sql);
        if (a.status !== 0 || a.error) { seg = null; stats.dropped.slow++; break; }
        const bl = blocks(a.stdout), keep = seg.filter((_, i) => !BAD.test(bl[i] ?? ""));
        if (keep.length === seg.length) break;
        stats.dropped.bad += seg.length - keep.length; seg = keep; if (!seg.length) break;
      }
      if (!seg || !seg.length) { fs.rmSync(sql, { force: true }); if (seg) stats.dropped.empty++; continue; }
      fs.writeFileSync(sql, seg.join("\n") + "\n");
      const a = run(ref, sql), b = run(ref, sql);
      if (a.status !== 0 || !a.stdout.equals(b.stdout)) { fs.rmSync(sql, { force: true }); stats.dropped.unstable++; continue; }
      fs.writeFileSync(path.join(out, `${name}.ref`), a.stdout);
      stats.scripts++; stats.lines += seg.length; budget -= seg.length; k++;
    }
  }
  fs.writeFileSync(path.join(out, "STATS.json"), JSON.stringify(stats, null, 1));
  console.log(JSON.stringify(stats));
}
