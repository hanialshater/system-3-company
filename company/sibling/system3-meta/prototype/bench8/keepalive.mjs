#!/usr/bin/env node
// Benchmark 8: keep the arms running through machine restarts (PROTOCOL.md "Restarts", 2026-10-23: the container was
// reclaimed twice in an hour without warning; every process died, the files survived).
//
//   node bench8/keepalive.mjs --arms=V,S [--runs=<dir>] [--b8=<dir>] [--interval=30] [--v='<V args>'] [--s='<S args>']
//        [--max-restarts=50] [--once]
//
// Every --interval seconds (30) it checks each arm: alive (its arm.pid, written by the arm itself, names a live process
// of this boot whose cmdline is the arm's script, checked in /proc) or finished (its ledger: vStatus / sStatus). An arm
// that is neither is (re)started with --resume (on a runs dir where it never started, --resume is a fresh start):
//   V: node bench8/vanilla-compiler.mjs --resume --runs=<runs> <V args>
//   S: node bench8/setup.mjs run --resume --runs=<runs> <S args>
// each in its own process group (detached), its output appended to _operator/<arm>/arm.out. Before a restart the dead
// arm's process group is killed if it is of this boot (the arm's own --resume also kills its leftovers by cwd). Every
// start and restart is a line in _operator/<arm>/restarts.jsonl: {event: "operator: start" | "operator: restart",
// t, n, downMin (from the arm's last clock beat), lastBeat, argv}; an arm that dies within 60 s of its start 5 times in
// a row, or more than --max-restarts times, is given up (`operator: gave up`). It exits when every arm has finished
// (or was given up). It is itself safe to start again at any time (after a restart, by hand or from a boot hook):
// _operator/keepalive.pid makes a second copy exit at once, and an arm already running is never started twice.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { paths, readJsonl, append, vStatus, sStatus, WAVES } from "./setup.mjs";
import { procAlive, readPid, writePid, clockOf, bootId } from "./restart.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const P = paths(opt);
const ARMS = String(opt.arms ?? "V,S").split(",").map((x) => x.trim().toUpperCase()).filter(Boolean);
if (!ARMS.length || !ARMS.every((a) => a === "V" || a === "S")) { console.error("--arms=V,S (one or both)"); process.exit(2); }
const INTERVAL = Number(opt.interval ?? 30) * 1000, MAX_RESTARTS = Number(opt["max-restarts"] ?? 50);
const split = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean) : []);
const passThrough = ["--b8", "--proto"].filter((k) => opt[k.slice(2)]).map((k) => `${k}=${opt[k.slice(2)]}`);
const ARGV = {
  V: [path.join(HERE, "vanilla-compiler.mjs"), "--resume", `--runs=${P.runs}`, ...passThrough, ...split(opt.v)],
  S: [path.join(HERE, "setup.mjs"), "run", "--resume", `--runs=${P.runs}`, ...passThrough, ...split(opt.s)],
};
const MATCH = { V: ["vanilla-compiler.mjs"], S: ["setup.mjs", "run"] };
const wavesOf = (arm) => { const w = split(opt[arm.toLowerCase()]).find((a) => a.startsWith("--waves=")); return w ? w.slice(8).split(/[,.]+/).filter(Boolean).map((x) => x.toUpperCase()) : WAVES; };
const statusOf = (arm) => (arm === "V" ? vStatus(readJsonl(P.vledger), wavesOf("V")) : sStatus(readJsonl(P.waves), wavesOf("S")));
const log = (arm) => path.join(P.op, arm, "restarts.jsonl");
const say = (x) => console.log(JSON.stringify({ t: new Date().toISOString(), ...x }));

// one keepalive per runs dir
fs.mkdirSync(P.op, { recursive: true });
const KPID = path.join(P.op, "keepalive.pid");
{ const k = readPid(KPID); if (k && k.pid !== process.pid && procAlive(k.pid, { match: ["keepalive.mjs"], boot: k.boot })) { say({ event: "already running", pid: k.pid }); process.exit(0); } }
writePid(KPID, { arms: ARMS });
process.on("exit", () => { try { if (readPid(KPID)?.pid === process.pid) fs.rmSync(KPID, { force: true }); } catch {} });
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => process.exit(0)); // the arms run on (their own groups)

const child = {}; // arm -> {pid, started}: the process this keepalive started (until the arm writes its arm.pid)
const fast = Object.fromEntries(ARMS.map((a) => [a, 0])), gaveUp = new Set();
function alive(arm) {
  const rec = readPid(path.join(P.op, arm, "arm.pid"));
  if (rec && procAlive(rec.pid, { match: MATCH[arm], boot: rec.boot })) return rec.pid;
  const c = child[arm] ?? readPid(path.join(P.op, arm, "keepalive-child.json"));
  if (c && procAlive(c.pid, { match: MATCH[arm], boot: c.boot })) return c.pid;
  return null;
}
function killGroup(arm) {
  // the last process group keepalive started for this arm, if it is of this boot (after a restart nothing survives)
  const c = readPid(path.join(P.op, arm, "keepalive-child.json"));
  if (!c || (c.boot && c.boot !== bootId())) return false;
  try { process.kill(-c.pid, "SIGKILL"); return true; } catch { return false; }
}
function start(arm, kind) {
  const prior = readJsonl(log(arm)).filter((x) => x.event === "operator: start" || x.event === "operator: restart");
  const clock = clockOf(path.join(P.op, arm, "clock.json"));
  const n = prior.length + 1, now = Date.now();
  const downMin = kind === "operator: restart" && clock?.t ? Math.round((now - Date.parse(clock.t)) / 600) / 100 : null;
  const killedGroup = kind === "operator: restart" ? killGroup(arm) : false;
  fs.mkdirSync(path.join(P.op, arm), { recursive: true });
  const fd = fs.openSync(path.join(P.op, arm, "arm.out"), "a");
  const ch = spawn(process.execPath, ARGV[arm], { cwd: path.dirname(HERE), detached: true, stdio: ["ignore", fd, fd], env: process.env });
  fs.closeSync(fd);
  ch.unref();
  child[arm] = { pid: ch.pid, boot: bootId(), started: now };
  fs.writeFileSync(path.join(P.op, arm, "keepalive-child.json"), JSON.stringify({ pid: ch.pid, boot: bootId(), started: new Date(now).toISOString(), argv: ARGV[arm] }));
  ch.on("exit", (code, signal) => { append(log(arm), { event: "exit", arm, pid: ch.pid, code, signal, afterSec: Math.round((Date.now() - now) / 1000) }); if (Date.now() - now < 60_000) fast[arm]++; else fast[arm] = 0; });
  const rec = { event: kind, arm, n, pid: ch.pid, downMin, lastBeat: clock?.t ?? null, activeMin: clock ? Math.round(clock.activeMs / 600) / 100 : null, killedGroup, argv: ARGV[arm].map((a) => a.replace(HERE, "bench8")) };
  append(log(arm), rec); say(rec);
}
function check() {
  const done = [];
  for (const arm of ARMS) {
    if (gaveUp.has(arm)) { done.push(arm); continue; }
    const pid = alive(arm);
    if (pid) continue;
    const st = statusOf(arm);
    if (st.finished) { done.push(arm); continue; }
    const prior = readJsonl(log(arm));
    const restarts = prior.filter((x) => x.event === "operator: restart").length;
    if (fast[arm] >= 5 || restarts >= MAX_RESTARTS) { gaveUp.add(arm); const r = { event: "operator: gave up", arm, why: fast[arm] >= 5 ? "died within 60 s of its start 5 times in a row" : `${restarts} restarts (--max-restarts=${MAX_RESTARTS})` }; append(log(arm), r); say(r); done.push(arm); continue; }
    // started before (by keepalive or by hand) and not finished: a restart; never started: the first start
    start(arm, st.started || prior.some((x) => x.event === "operator: start") ? "operator: restart" : "operator: start");
  }
  return done.length === ARMS.length;
}
say({ event: "keepalive", runs: P.runs, arms: ARMS, intervalSec: INTERVAL / 1000, argv: ARGV });
if (check() || opt.once) { say({ event: "keepalive-end", why: opt.once ? "--once" : "every arm has finished", status: Object.fromEntries(ARMS.map((a) => [a, statusOf(a)])) }); process.exit(0); }
const timer = setInterval(() => { if (check()) { clearInterval(timer); say({ event: "keepalive-end", why: "every arm has finished", status: Object.fromEntries(ARMS.map((a) => [a, statusOf(a)])) }); process.exit(0); } }, INTERVAL);
