// F1 and F2 of PE-ops' approval company/engineering/readiness/2026-10-16-e1n1-approval.md (e1c9162), board W-1275.
// F1: `events.mjs fold` runs one at a time (<spool>/fold.lock) and adopts a *.folding-<pid> file only when that pid
// is dead; two folds at once leave no duplicate id. F2: a hook append that opened a spool file just before the
// fold renamed it is not lost. Every test uses a temp log and spool; none touches company/ops/events.jsonl.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { pidAlive, FOLD_LOCK } from "../../tools/events.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EVENTS_CLI = path.join(ROOT, "tools/events.mjs");
const EVENTS_URL = new URL("../../tools/events.mjs", import.meta.url).href;
const REAL_LOG = path.join(ROOT, "company/ops/events.jsonl");
const realSize = () => (fs.existsSync(REAL_LOG) ? fs.statSync(REAL_LOG).size : -1);

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "fold-lock-"));
  const sb = { dir: d, events: path.join(d, "events.jsonl"), spool: path.join(d, "spool") };
  fs.mkdirSync(sb.spool, { recursive: true });
  return sb;
}
const env = (sb) => ({ ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool });
const cli = (sb, args) => {
  const r = spawnSync("node", [EVENTS_CLI, ...args], { env: env(sb), encoding: "utf8" });
  return { code: r.status, out: r.stdout, err: r.stderr };
};
const ev = (id, ts = "2026-10-16T10:00:00Z") => ({ id, ts, type: "note", room: "tools", actor: "tools-lead", summary: id });
const jsonl = (evs) => evs.map((e) => JSON.stringify(e)).join("\n") + "\n";
const ids = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).id) : []);
const dupes = (list) => list.length - new Set(list).size;
// A pid that is certainly not running: a child that has exited.
const deadPid = () => {
  const pid = spawnSync("node", ["-e", ""]).pid;
  assert.ok(!pidAlive(pid), "the exited child's pid is not running");
  return pid;
};
// A pid that is certainly running until stop() (stopped by its exact pid, through the handle).
const livePid = () => {
  const c = spawn("node", ["-e", "setTimeout(() => {}, 60000)"], { stdio: "ignore" });
  const gone = new Promise((res) => c.on("close", res)); // reaped, so the pid is really gone (not a zombie)
  return { pid: c.pid, stop: () => c.kill(), gone };
};
const exited = (c) => new Promise((res) => c.on("close", (code) => res(code)));
const spoolLeft = (sb) => fs.readdirSync(sb.spool).filter((f) => /\.jsonl/.test(f));

test("F1: a fold refuses while a live pid holds fold.lock, and writes nothing", () => {
  const before = realSize();
  const sb = sandbox();
  fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), jsonl([ev("hk-1")]));
  const holder = livePid();
  try {
    fs.writeFileSync(path.join(sb.spool, FOLD_LOCK), String(holder.pid));
    const r = cli(sb, ["fold"]);
    assert.equal(r.code, 2, r.err);
    assert.match(r.err, new RegExp(`fold: a fold is already running \\(pid ${holder.pid}`));
    assert.ok(!fs.existsSync(sb.events), "no log written");
    assert.deepEqual(spoolLeft(sb), ["2026-10-16.jsonl"], "spool not renamed");
    assert.equal(fs.readFileSync(path.join(sb.spool, FOLD_LOCK), "utf8"), String(holder.pid), "the live lock is kept");
  } finally {
    holder.stop();
  }
  assert.equal(realSize(), before, "the real log is untouched");
});

test("F1: a lock left by a dead pid (or holding no pid) is taken over, and released after the fold", () => {
  for (const content of [String(deadPid()), "garbage"]) {
    const sb = sandbox();
    fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), jsonl([ev("hk-1")]));
    fs.writeFileSync(path.join(sb.spool, FOLD_LOCK), content);
    const r = cli(sb, ["fold"]);
    assert.equal(r.code, 0, r.err);
    assert.match(r.out, /fold: 1 event\(s\) folded/);
    assert.deepEqual(ids(sb.events), ["hk-1"]);
    assert.ok(!fs.existsSync(path.join(sb.spool, FOLD_LOCK)), "lock released");
    assert.ok(!fs.existsSync(path.join(sb.spool, `${FOLD_LOCK}.takeover`)), "takeover file removed");
  }
});

test("F1: a *.folding-<pid> file is adopted only when that pid is dead; a live fold's file is left alone", async () => {
  const sb = sandbox();
  const dead = deadPid();
  const live = livePid();
  try {
    fs.writeFileSync(path.join(sb.spool, `2026-10-15.jsonl.folding-${dead}`), jsonl([ev("dead-1", "2026-10-15T10:00:00Z")]));
    fs.writeFileSync(path.join(sb.spool, `2026-10-15.jsonl.folding-${live.pid}`), jsonl([ev("live-1", "2026-10-15T11:00:00Z")]));
    fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), jsonl([ev("new-1")]));
    const r = cli(sb, ["fold"]);
    assert.equal(r.code, 0, r.err);
    assert.match(r.out, /fold: 2 event\(s\) folded .* from 2 spool file\(s\).*; 1 file\(s\) of a live fold left alone/);
    assert.deepEqual(ids(sb.events), ["dead-1", "new-1"]);
    assert.deepEqual(spoolLeft(sb), [`2026-10-15.jsonl.folding-${live.pid}`]);
  } finally {
    live.stop();
  }
  // Once its pid is gone, the next fold adopts it.
  await live.gone;
  assert.ok(!pidAlive(live.pid));
  const r2 = cli(sb, ["fold"]);
  assert.equal(r2.code, 0, r2.err);
  assert.deepEqual(ids(sb.events), ["dead-1", "new-1", "live-1"]);
  assert.deepEqual(spoolLeft(sb), []);
});

test("F1: two folds started together on the same spool leave every id in the log exactly once", async () => {
  const before = realSize();
  const sb = sandbox();
  const N = 20000;
  fs.writeFileSync(sb.events, jsonl([ev("x-0"), ev("x-1")]));
  fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), jsonl(Array.from({ length: N }, (_, i) => ev(`x-${i}`, `2026-10-16T10:00:${String(i % 60).padStart(2, "0")}Z`))));
  const a = spawn("node", [EVENTS_CLI, "fold"], { env: env(sb), stdio: "pipe" });
  const b = spawn("node", [EVENTS_CLI, "fold"], { env: env(sb), stdio: "pipe" });
  const codes = await Promise.all([exited(a), exited(b)]);
  assert.ok(codes.every((c) => c === 0 || c === 2), `exit codes ${codes}`);
  assert.ok(codes.includes(0));
  const got = ids(sb.events);
  assert.equal(dupes(got), 0, "no duplicate id in the log");
  assert.equal(new Set(got).size, N);
  assert.deepEqual(spoolLeft(sb), []);
  assert.equal(realSize(), before, "the real log is untouched");
});

// PE-ops' reproduction (e1c9162): two writers appending back to back while two fold loops run in parallel.
// Before F1 this left 8,158 duplicate lines (19,133 in the author's rerun at 2 x 20,000). Raw appendFileSync
// writers (the race without the writer-side check) and spoolAppend writers (the real `add --spool` path) both run.
test("F1 + F2: two fold loops in parallel with two writers each way: no duplicate id, nothing lost", async () => {
  const before = realSize();
  const sb = sandbox();
  fs.writeFileSync(sb.events, "");
  const N = 4000;
  const until = Date.now() + 3500;
  const writer = (tag, mode) =>
    spawn("node", ["--input-type=module", "-e", `
      import fs from "node:fs";
      const { spoolAppend } = await import(${JSON.stringify(EVENTS_URL)});
      const f = ${JSON.stringify(path.join(sb.spool, "2026-10-16.jsonl"))};
      for (let i = 0; i < ${N}; i++) {
        const e = { id: "${tag}-" + i, ts: new Date().toISOString(), type: "note", room: "tools", actor: "t", summary: "w" };
        if ("${mode}" === "raw") fs.appendFileSync(f, JSON.stringify(e) + "\\n"); else spoolAppend(e, f);
      }`], { stdio: "inherit" });
  const folder = () =>
    spawn("node", ["--input-type=module", "-e", `
      const { fold } = await import(${JSON.stringify(EVENTS_URL)});
      let ok = 0;
      while (Date.now() < ${until}) {
        try { fold({ dir: ${JSON.stringify(sb.spool)}, log: ${JSON.stringify(sb.events)} }); ok++; }
        catch (e) { if (e.code !== "EFOLDLOCKED") throw e; }
      }
      if (!ok) process.exit(3);`], { stdio: "inherit" });
  const procs = [folder(), folder(), writer("raw-a", "raw"), writer("raw-b", "raw"), writer("api-a", "api"), writer("api-b", "api")];
  const codes = await Promise.all(procs.map(exited));
  assert.deepEqual(codes, [0, 0, 0, 0, 0, 0]);
  assert.equal(cli(sb, ["fold"]).code, 0);
  const got = ids(sb.events);
  assert.equal(dupes(got), 0, "no duplicate id in the log");
  assert.equal(new Set(got).size, 4 * N, "every written id is in the log");
  assert.deepEqual(spoolLeft(sb), []);
  assert.equal(realSize(), before, "the real log is untouched");
});

test("F2: an append through a file handle opened before the fold renamed the file still reaches the log", async () => {
  const sb = sandbox();
  const f = path.join(sb.spool, "2026-10-16.jsonl");
  fs.writeFileSync(f, jsonl([ev("early")]));
  const fd = fs.openSync(f, "a"); // a hook write that opened the file just before the rename
  try {
    const child = spawn("node", ["--input-type=module", "-e", `
      const { fold } = await import(${JSON.stringify(EVENTS_URL)});
      const r = fold({ dir: ${JSON.stringify(sb.spool)}, log: ${JSON.stringify(sb.events)}, settleMs: 400 });
      console.log(JSON.stringify(r));`], { stdio: ["ignore", "pipe", "inherit"] });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    const done = exited(child);
    // Wait for the rename, then finish the write into the renamed file (after the fold's first read).
    const deadline = Date.now() + 5000;
    while (!fs.readdirSync(sb.spool).some((x) => /\.folding-\d+$/.test(x)) && Date.now() < deadline) await new Promise((r) => setTimeout(r, 2));
    fs.writeSync(fd, JSON.stringify(ev("late")) + "\n");
    assert.equal(await done, 0);
    assert.deepEqual(ids(sb.events).sort(), ["early", "late"]);
    assert.deepEqual(spoolLeft(sb), []);
    assert.equal(JSON.parse(out).folded, 2);
  } finally {
    fs.closeSync(fd);
  }
});

// F5 (same approval, board W-1278): `fold` and `readSpool` collected events with push(...spread), which throws
// RangeError (call stack) once one spread passes ~125k elements (Node 22), so one large spool file stuck every later
// fold. Here a 200,000-line spool file and 130,000 unparseable lines go through `fold --dry` (readSpool) and `fold`.
// It is the last test in this file on purpose: tests in one file run in order, so its CPU load never overlaps the
// timing-bound two-fold-loops test above (as a separate test file it ran in parallel and made that test flake).
const REAL_SPOOL = path.join(ROOT, "company/ops/events-spool");
const realSpool = () => (fs.existsSync(REAL_SPOOL) ? fs.readdirSync(REAL_SPOOL).sort().join(",") : null);
const BIG = 200_000;
const bigLine = (i) => JSON.stringify({ id: `hk-big-${i}`, ts: `2026-10-16T10:00:00.${String(((i % 1000) + 1000) % 1000).padStart(3, "0")}Z`, type: "note", room: "tools", actor: "tools-lead", summary: `e${i}` });
const countLines = (f) => fs.readFileSync(f, "utf8").split("\n").filter(Boolean).length;

test("F5: a 200,000-line spool file (plus 130,000 unparseable lines) reads, dry-folds and folds without RangeError", () => {
  const before = realSize();
  const spoolBefore = realSpool();
  const sb = sandbox();
  const B = 130_000;
  fs.writeFileSync(sb.events, bigLine(-1) + "\n"); // one event already in the log, and also in the spool: a duplicate
  {
    const parts = [];
    for (let i = 0; i < BIG; i++) parts.push(bigLine(i));
    fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), parts.join("\n") + "\n");
  }
  fs.appendFileSync(path.join(sb.spool, "2026-10-16.jsonl"), bigLine(-1) + "\n");

  // fold --dry goes through readSpool (tools/lib/events-spool.mjs), the reader metrics and dispatch-check also use
  const dry = cli(sb, ["fold", "--dry"]);
  assert.equal(dry.code, 0, dry.err);
  assert.doesNotMatch(dry.err, /RangeError|Maximum call stack/);
  assert.match(dry.out, new RegExp(`fold --dry: ${BIG} event\\(s\\) would be folded .* 1 already in the log$`, "m"));
  assert.equal(countLines(sb.events), 1, "--dry writes nothing");

  // Unparseable lines are added after the dry run (it only counts them), so the slow parse runs once less.
  const bad = [];
  for (let i = 0; i < B; i++) bad.push(`{not json ${i}`);
  fs.writeFileSync(path.join(sb.spool, "2026-10-17.jsonl"), bad.join("\n") + "\n");

  const r = cli(sb, ["fold"]);
  assert.equal(r.code, 0, r.err);
  assert.doesNotMatch(r.err, /RangeError|Maximum call stack/);
  assert.match(r.out, new RegExp(`fold: ${BIG} event\\(s\\) folded .* 1 already in the log; ${B} unparseable spool line\\(s\\) kept in unparsed-\\*\\.txt`));
  const got = fs.readFileSync(sb.events, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).id);
  assert.equal(got.length, BIG + 1);
  assert.equal(new Set(got).size, BIG + 1, "no duplicate id");
  assert.deepEqual(fs.readdirSync(sb.spool).filter((f) => /\.jsonl/.test(f)), [], "spool emptied (no *.folding-* left to adopt)");
  const kept = fs.readdirSync(sb.spool).filter((f) => f.startsWith("unparsed-"));
  assert.equal(kept.length, 1);
  assert.equal(countLines(path.join(sb.spool, kept[0])), B);

  const again = cli(sb, ["fold"]); // not stuck: before F5 every later fold adopted the same file and threw again
  assert.equal(again.code, 0, again.err);
  assert.match(again.out, /fold: 0 event\(s\) folded/);

  assert.equal(realSize(), before, "the real log is untouched");
  assert.equal(realSpool(), spoolBefore, "the real spool is untouched");
  fs.rmSync(sb.dir, { recursive: true, force: true });
});
