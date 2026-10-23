#!/usr/bin/env node
// Benchmark 8: the restart test (PROTOCOL.md "Restarts"; no Agent SDK session). Both arms on a scratch runs dir, V with
// its fake agent (--dry-run --fake=dryrun/stub) and S with the fake SDK (setup.mjs run --fake: the real launcher,
// serve, broker, accept and hidden runner), under keepalive.mjs. Then:
//   1. a machine restart: when V is mid-turn and S has a session in flight, every process of the run is killed with
//      SIGKILL (keepalive too), the "machine" stays down --down seconds, and keepalive is started again by hand;
//   2. an arm crash: when S's hidden accept run is in flight, both arms' process groups are killed (keepalive lives and restarts them);
//   3. idempotence: a second keepalive exits at once, and a second V or S on the same runs refuses while one runs;
// and every arm must run to its end with the restarts, downtime and abandoned launches counted.
//   node bench8/restart-test.mjs [--runs=<dir>] [--down=20] [--keep]     prints one JSON summary; exit 1 on a failed check
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readJsonl, tally, audit, vStatus } from "./setup.mjs";
import { killLeftovers, readPid } from "./restart.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url)), PROTO = path.dirname(HERE);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const R = path.resolve(opt.runs ?? fs.mkdtempSync("/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8r-"));
const DOWN = Number(opt.down ?? 20);
const OP = path.join(R, "_operator"), VL = path.join(OP, "V", "vanilla.jsonl"), SW = path.join(OP, "S", "waves.jsonl"), SL = path.join(R, "S", "live", "launches.jsonl");
const V_ARGS = `--dry-run --fake=${path.join(HERE, "dryrun", "stub")} --fake-sec=45 --waves=W1,W2 --max-rounds=1`;
const S_ARGS = "--fake --fake-sec=4 --poll=1 --waves=W1,W2 --max-rounds=1";
const KEEP = [path.join(HERE, "keepalive.mjs"), "--arms=V,S", `--runs=${R}`, "--interval=5", `--v=${V_ARGS}`, `--s=${S_ARGS}`];
const log = [];
const step = (what, x = {}) => { log.push({ step: what, ...x }); process.stderr.write(`- ${what}${Object.keys(x).length ? ` ${JSON.stringify(x).slice(0, 240)}` : ""}\n`); };
const keepalive = () => { const fd = fs.openSync(path.join(R, "keepalive.out"), "a"); const ch = spawn(process.execPath, KEEP, { cwd: PROTO, detached: true, stdio: ["ignore", fd, fd] }); fs.closeSync(fd); ch.unref(); return ch; };
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
async function until(what, fn, sec = 600) { const t0 = Date.now(); for (;;) { const x = fn(); if (x) return x; if (Date.now() - t0 > sec * 1000) throw new Error(`timed out waiting for: ${what}`); await sleep(0.5); } }
const vMidTurn = () => { const v = readJsonl(VL); const last = v.filter((x) => x.event === "turn-start" || x.event === "turn").at(-1); return last?.event === "turn-start" && v.length > 2; };
const sInFlight = () => { const L = readJsonl(SL); return L.filter((x) => x.event === "start").some((s) => !L.some((f) => f.event === "finish" && f.launch === s.launch)) && L.some((x) => x.event === "finish"); };
// S's accept in flight: the broker's hidden run for it (setup.mjs accept, as the orderer) is a live process
const sAcceptRunning = () => fs.readdirSync("/proc").filter((d) => /^\d+$/.test(d)).some((pid) => { try { const a = fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0"); return a.some((x) => x.endsWith("setup.mjs")) && a.includes("accept") && a.includes(`--runs=${R}`) && !a.some((x) => x.startsWith("--broker=")); } catch { return false; } });
const machineRestart = () => killLeftovers({ dirs: [R], names: [R] }); // every process of this run, keepalive too
const armGroup = (arm) => { const c = readPid(path.join(OP, arm, "keepalive-child.json")); try { process.kill(-c.pid, "SIGKILL"); return c.pid; } catch { return null; } };

try {
  fs.mkdirSync(R, { recursive: true });
  keepalive();
  step("keepalive started both arms", { runs: R });
  // 3. idempotence while they run
  await until("both arms running", () => fs.existsSync(path.join(OP, "V", "arm.pid")) && fs.existsSync(path.join(OP, "S", "arm.pid")), 120);
  const k2 = spawnSync(process.execPath, KEEP, { cwd: PROTO, encoding: "utf8", timeout: 30_000 });
  assert.match(k2.stdout, /already running/); step("a second keepalive exits at once", { out: k2.stdout.trim().slice(0, 120) });
  const v2 = spawnSync(process.execPath, [path.join(HERE, "vanilla-compiler.mjs"), "--resume", `--runs=${R}`, ...V_ARGS.split(" ")], { cwd: PROTO, encoding: "utf8", timeout: 60_000 });
  assert.equal(v2.status, 3, v2.stderr); assert.match(v2.stderr, /V is already running/);
  const s2 = spawnSync(process.execPath, [path.join(HERE, "setup.mjs"), "run", "--resume", `--runs=${R}`, ...S_ARGS.split(" ")], { cwd: PROTO, encoding: "utf8", timeout: 60_000 });
  assert.equal(s2.status, 3, s2.stderr); assert.match(s2.stderr, /S is already running/);
  step("a second V and a second S refuse while one runs", { v: v2.stderr.trim().slice(0, 100), s: s2.stderr.trim().slice(0, 100) });

  // 1. the machine restarts: V mid-turn, S with a session in flight
  await until("V mid-turn and an S session in flight", () => vMidTurn() && sInFlight(), 600);
  const inflight = readJsonl(SL).filter((x) => x.event === "start").filter((s) => !readJsonl(SL).some((f) => f.event === "finish" && f.launch === s.launch)).map((s) => s.launch);
  const vAt = readJsonl(VL).filter((x) => x.event === "turn-start").at(-1);
  const killed = machineRestart();
  step("machine restart: every process of the run killed (SIGKILL)", { processes: killed.length, vTurn: `${vAt.wave} round ${vAt.round} turn ${vAt.n}`, sInFlight: inflight });
  await sleep(DOWN);
  assert.equal(killLeftovers({ dirs: [R], names: [R], also: () => false }).length, 0, "nothing of the run survived");
  keepalive();
  step(`after ${DOWN} s down: keepalive started again by hand`);
  await until("V resumed", () => readJsonl(VL).some((x) => x.event === "resume"), 120);
  await until("S resumed", () => readJsonl(SW).some((x) => x.event === "resume"), 120);
  const vr = readJsonl(VL).find((x) => x.event === "resume"), sr = readJsonl(SW).find((x) => x.event === "resume");
  step("both resumed", { V: { downMin: vr.downMin, wave: vr.wave, round: vr.round, point: vr.point, session: vr.session }, S: { downMin: sr.downMin, wave: sr.wave, abandoned: sr.abandoned.map((a) => `${a.launch}: ${a.reReported ? "re-reported" : a.next}`) } });
  assert.equal(vr.point, "interrupted", "V was mid-turn: the restart turn");
  assert.ok(vr.downMin * 60 >= DOWN - 1, `V's downtime ${vr.downMin} min covers the ${DOWN} s down`);
  assert.ok(sr.downMin * 60 >= DOWN - 1, `S's downtime ${sr.downMin} min covers the ${DOWN} s down`);
  assert.ok(sr.abandoned.some((a) => inflight.includes(a.launch)), "S's in-flight launches abandoned");
  const restartTurn = await until("V's restart turn", () => readJsonl(VL).find((x) => x.event === "turn" && /restart/.test(x.label)), 120);
  assert.equal(restartTurn.session, vAt.session ?? restartTurn.session, "the same session"); assert.match(restartTurn.said, /after the restart/);

  // 2. an arm crash with keepalive alive: S's hidden accept run is in flight (the broker dies with it: the accept stage
  //    gets a runner error, a stage-error the observer retries after the restart)
  await until("an S accept in flight while V still works", () => { if (vStatus(readJsonl(VL)).finished) throw new Error("V finished before S's accept: make V's fake turns slower"); return sAcceptRunning(); }, 600);
  const g = { V: armGroup("V"), S: armGroup("S") };
  step("arm crash: both arms' process groups killed, keepalive lives", g);
  await until("keepalive restarted both", () => ["V", "S"].every((a) => readJsonl(path.join(OP, a, "restarts.jsonl")).filter((x) => x.event === "operator: restart").length >= 2), 120);

  // the end
  await until("keepalive ended (both arms finished)", () => !readPid(path.join(OP, "keepalive.pid")) && /keepalive-end/.test(fs.readFileSync(path.join(R, "keepalive.out"), "utf8")), 1500);
  const V = readJsonl(VL), S = readJsonl(SW), T = tally({ ...(await import("./setup.mjs")).paths({ runs: R }) });
  const kV = readJsonl(path.join(OP, "V", "restarts.jsonl")), kS = readJsonl(path.join(OP, "S", "restarts.jsonl"));
  assert.deepEqual(V.filter((x) => x.event === "wave-summary").map((x) => x.wave), ["W1", "W2"], "V ran both waves, each once");
  assert.equal(V.at(-1).event, "end");
  assert.deepEqual(S.filter((x) => x.event === "wave-end").map((x) => x.wave), ["W1", "W2"], "S ran both waves, each once");
  assert.equal(S.at(-1).event, "run-end");
  assert.equal(new Set(V.filter((x) => x.event === "session").map((x) => x.session)).size, 1, "V kept one session through both restarts");
  for (const [arm, k, r] of [["V", kV, T.V.restarts], ["S", kS, T.S.restarts]]) {
    assert.equal(k.filter((x) => x.event === "operator: start").length, 1, `${arm}: one start`);
    assert.equal(k.filter((x) => x.event === "operator: restart").length, 2, `${arm}: two restarts`);
    assert.equal(r.resumes, 2, `${arm}: two resumes`); assert.equal(r.operatorRestarts, 2);
    assert.ok(r.downMin * 60 >= DOWN - 1, `${arm}: downtime counted`);
  }
  // the caps' clock excludes the downtime: the active minutes are less than the wall time by about the downtime
  for (const [arm, rows, endEv] of [["V", V, "end"], ["S", S, "run-end"]]) {
    const wall = (Date.parse(rows.at(-1).t) - Date.parse(rows.find((x) => x.event === "start" || x.event === "run-start").t)) / 60000;
    const active = rows.at(-1).activeMin, down = T[arm].restarts.downMin;
    assert.ok(Math.abs(wall - active - down) < 0.6, `${arm}: wall ${wall.toFixed(2)} = active ${active} + down ${down} (+- the beats)`);
    step(`${arm}: wall ${wall.toFixed(2)} min = active ${active} + down ${down}`, { endEv });
  }
  const A = audit({ ...(await import("./setup.mjs")).paths({ runs: R }) });
  const out = { ok: true, runs: R, steps: log, restarts: { V: T.V.restarts, S: T.S.restarts }, keepalive: { V: kV.filter((x) => x.event !== "exit").map((x) => `${x.event} n${x.n}${x.downMin != null ? ` down ${x.downMin} min` : ""}`), S: kS.filter((x) => x.event !== "exit").map((x) => `${x.event} n${x.n}${x.downMin != null ? ` down ${x.downMin} min` : ""}`) }, waves: { V: T.V.waves.map((g) => ({ wave: g.wave, rounds: g.rounds, minutes: g.minutes, final: g.final?.pct })), S: T.S.waves.map((g) => ({ wave: g.wave, rounds: g.rounds, minutes: g.minutes, final: g.final?.pct, stage: g.stage, launches: g.launches })) }, stageRetries: readJsonl(path.join(OP, "S", "operator.jsonl")).filter((x) => x.act === "retry").map((x) => `${x.wave} ${x.stage}: ${x.why.slice(0, 80)}`), auditRestarts: A.restarts };
  console.log(JSON.stringify(out, null, 1));
  if (!opt.keep) fs.rmSync(R, { recursive: true, force: true });
  process.exit(0);
} catch (e) {
  killLeftovers({ dirs: [R], names: [R] });
  console.log(JSON.stringify({ ok: false, runs: R, steps: log, error: String(e.stack ?? e).slice(0, 3000) }, null, 1));
  process.exit(1);
}
