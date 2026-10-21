// K2 (plan 2026-10-21 §3): async jobs outside the state lock. A stage with `async: true` and a `run` cmd starts that cmd
// detached and returns at once; a later tick, under the lock, collects its exit and output and signs the stage. Why: a
// lesson's QA is `next build` (2 to 4 min) plus playwright, but withLock waits 10 s and breaks a lock older than 30 s
// (state.mjs withLock), and a sync cmd stops at 60 s: every QA was a false revise, and agents' CLI calls failed while
// the tick held the lock. A timeout (or a job that could not start or died) is a stage-error, not a revise: the order
// stays at its stage, loops unchanged, until `node supervisor.mjs retry --order=<O>`.
//   node jobs.mjs exec <job.json>   the wrapper (started by start(), never by hand): runs the cmd with its output in
//        files, enforces the timeout on its whole process group, and writes <id>.exit.json last (atomic rename), so a
//        supervisor that died meanwhile still finds the result; `serve` watches the jobs directory for that file
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { LIVE, STATE, prepareCmd, judgeCmd, noCwd } from "./state.mjs";

const SELF = fileURLToPath(import.meta.url);
export const JOB_TIMEOUT_MS = 20 * 60_000; // plan K2: QA is minutes, not seconds
export const JOB_GRACE_MIN = 0.1; // the wrapper times its own job out; past this the collector kills it itself
/** One directory per state file (two states in one live dir would otherwise share J-1). */
export const JOBS = path.join(LIVE, "jobs", path.basename(STATE).replace(/\.json$/, ""));
const file = (id, ext) => path.join(JOBS, `${id}.${ext}`);
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === "EPERM"; } };
const killGroup = (pid) => { for (const p of [-pid, pid]) try { process.kill(p, "SIGKILL"); } catch {} }; // the wrapper leads its group
const readText = (f) => { try { return fs.readFileSync(f, "utf8"); } catch { return ""; } };
const readExit = (j) => { try { return JSON.parse(fs.readFileSync(file(j.id, "exit.json"), "utf8")); } catch { return null; } };

export const jobsOf = (co) => (co.data.jobs ??= {});
/** The order's running job for its current stage and loop, if any. */
export const jobFor = (co, o) => Object.values(jobsOf(co)).find((j) => j.state === "running" && j.order === o.id && j.stage === o.stage && j.loops === o.loops) ?? null;

/** Start stage `s`'s cmd for order `o`, detached. Returns { job } or, when it cannot even be started (no workdir: the
 *  work's fault, a revise as in K1), { result } to sign at once. Never waits. */
export function start(co, o, s) {
  const p = prepareCmd(o, s);
  if (!fs.existsSync(p.cwd)) return { result: noCwd(p) };
  const jobs = jobsOf(co);
  const id = `J-${Object.keys(jobs).length + 1}`;
  const timeoutMs = p.c.timeoutMs ?? JOB_TIMEOUT_MS;
  fs.mkdirSync(JOBS, { recursive: true });
  for (const ext of ["out", "err", "exit.json"]) fs.rmSync(file(id, ext), { force: true }); // a re-initialised state reuses ids
  // the job file holds no environment (secrets stay out of the live dir): the wrapper inherits it from this spawn
  fs.writeFileSync(file(id, "json"), JSON.stringify({ bin: p.bin, args: p.argv.slice(1), cwd: p.cwd, timeoutMs, out: file(id, "out"), err: file(id, "err"), exit: file(id, "exit.json") }));
  const ch = spawn(process.execPath, [SELF, "exec", file(id, "json")], { cwd: p.cwd, env: p.env, detached: true, stdio: "ignore" });
  ch.unref();
  const j = jobs[id] = { id, order: o.id, stage: o.stage, loops: o.loops, pid: ch.pid, label: p.label, out: file(id, "out"), startedAt: co.engine.clock.now(), timeoutMs, state: "running" };
  co.log.add({ type: "job-start", job: id, order: o.id, stage: o.stage, loops: o.loops, pid: ch.pid });
  return { job: j };
}

/** Under the lock: every running job that has ended (or overran, or died) is judged by its stage's pass rule and handed
 *  to `apply(co, o, s, result)` (the supervisor signs it as a sync cmd stage is signed). A job whose order moved on is
 *  killed and marked stale. Returns the steps. */
export function collect(co, { apply }) {
  const steps = [];
  for (const j of Object.values(jobsOf(co))) {
    if (j.state !== "running") continue;
    const o = co.engine.orders.get(j.order);
    if (!o || o.stage !== j.stage || o.loops !== j.loops) {
      killGroup(j.pid); j.state = "stale";
      co.log.add({ type: "job-stale", job: j.id, order: j.order, stage: j.stage });
      steps.push({ step: "job-stale", order: j.order, job: j.id, stage: j.stage });
      continue;
    }
    let ex = j.exit ?? readExit(j);
    if (!ex) {
      if (co.engine.clock.now() - j.startedAt > j.timeoutMs / 60000 + JOB_GRACE_MIN) { killGroup(j.pid); ex = { status: null, timedOut: true }; }
      else if (!alive(j.pid)) ex = readExit(j) ?? { status: null, error: "the job died without an exit record (killed, or the machine restarted)" }; // re-read: it may have exited since
      else continue; // still running: tick never waits
    }
    j.exit = ex; // kept, so a stage that cannot be signed yet (no release message) is signed on a later tick
    const s = co.engine.stageDef(o);
    const t = judgeCmd(s.run, j.label, { stdout: readText(j.out), stderr: readText(file(j.id, "err")), status: ex.status, error: ex.error ?? null, timedOut: !!ex.timedOut }, j.timeoutMs);
    const st = apply(co, o, s, t);
    if (!st) continue;
    j.state = t.stageError ? "error" : "done"; j.verdict = st.result; j.ended = co.engine.clock.now();
    co.log.add({ type: "job-end", job: j.id, order: o.id, stage: j.stage, result: st.result });
    steps.push({ ...st, kind: "job", job: j.id });
  }
  return steps;
}

/** When a running job next needs a look without an exit file (its backstop deadline), in clock minutes. */
export const deadlines = (co) => Object.values(jobsOf(co)).filter((j) => j.state === "running").map((j) => j.startedAt + j.timeoutMs / 60000 + JOB_GRACE_MIN);

/** The wrapper: run the cmd, output to files, the exit record written last. A timeout kills the whole process group
 *  (next build's workers too), after the record is written. */
function exec(spec) {
  const j = JSON.parse(fs.readFileSync(spec, "utf8"));
  let done = false;
  const write = (x) => { if (done) return; done = true; fs.writeFileSync(`${j.exit}.tmp`, JSON.stringify({ ...x, endedAt: Date.now() })); fs.renameSync(`${j.exit}.tmp`, j.exit); };
  const out = fs.openSync(j.out, "w"), err = fs.openSync(j.err, "w");
  let ch;
  try { ch = spawn(j.bin, j.args, { cwd: j.cwd, stdio: ["ignore", out, err] }); } catch (e) { write({ status: null, error: `could not start: ${e.message}` }); return; }
  const t = setTimeout(() => { write({ status: null, timedOut: true }); killGroup(process.pid); }, j.timeoutMs);
  ch.on("error", (e) => { clearTimeout(t); write({ status: null, error: `could not start: ${e.message}` }); });
  ch.on("close", (status, signal) => { clearTimeout(t); write(status === null ? { status: null, error: `the job was killed (${signal})` } : { status }); }); // killed from outside: not the work's verdict
}

if (process.argv[1] === SELF && process.argv[2] === "exec") exec(process.argv[3]);
