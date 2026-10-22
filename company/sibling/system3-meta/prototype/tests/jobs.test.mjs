import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// K2 (plan 2026-10-21 §3): async jobs outside the lock. A stage with `async: true` and a `run` cmd starts detached; a
// later tick collects it; the tick never waits; a timeout is a stage-error (held at the stage), not a revise.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k2-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES } = await import("../state.mjs");
const { tick, nextTimer } = await import("../supervisor.mjs");
const { JOBS, jobsOf } = await import("../jobs.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const BIN = path.join(LIVE, "bin");
fs.mkdirSync(BIN, { recursive: true });
// a QA stand-in: waits for `go` in the workdir (or for ever), then reports; exit 1 when `bad` is there too
fs.writeFileSync(path.join(BIN, "qa.mjs"), `import fs from "node:fs";
const t = setInterval(() => { if (!fs.existsSync("go")) return; clearInterval(t);
  const bad = fs.existsSync("bad"); console.log(JSON.stringify({ result: bad ? "fail" : "pass", slug: process.argv[2] })); console.log("A11Y: contrast 4.4 on card 3");
  process.exit(bad ? 1 : 0); }, 20);
`);
const QA = (extra = {}) => ({ argv: ["node", path.join(BIN, "qa.mjs"), "${slug}"], pass: { json: "result", equals: "pass" }, findings: { fromStdout: "^A11Y: (.*)$" }, ...extra });
const FLOW = (run, more = {}) => ({ stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "qa", signer: "code", evidence: [], run, async: true, ...more },
  { stage: "check", signer: "checker", evidence: ["review notes"] },
  { stage: "ship", signer: "release", evidence: ["n"] },
] });
function fresh(flow) {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task; o.slug = `lesson-${task.toLowerCase()}`;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true });
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "e" });
  return o;
}
const work = (task, f) => fs.writeFileSync(path.join(LIVE, "work", task, f), "x");
const exitFile = (id) => path.join(JOBS, `${id}.exit.json`);
async function until(pred, ms = 10000) { const end = Date.now() + ms; while (!pred()) { if (Date.now() > end) throw new Error("timed out waiting"); await new Promise((r) => setTimeout(r, 25)); } }
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

test("a long job starts detached, the tick returns at once, and a later tick collects it and signs the stage", async () => {
  const co = fresh(FLOW(QA()));
  const o = order(co, "JA");
  let t0 = Date.now(), steps = tick(co);
  assert.ok(Date.now() - t0 < 2000, "the tick did not wait for the job");
  assert.deepEqual(steps.map((s) => `${s.step}:${s.kind}:${s.result}`), ["qa:job:started"]);
  const j = jobsOf(co)[steps[0].job];
  assert.deepEqual([j.order, j.stage, j.loops, j.state, j.timeoutMs], [o.id, "qa", 0, "running", 20 * 60_000], "default timeout 20 min");
  assert.ok(alive(j.pid));
  assert.deepEqual(tick(co), [], "a running job is neither waited on nor started twice");
  assert.equal(o.stage, "qa");
  assert.ok(nextTimer(co) > 19 * 60_000, "the job's backstop is a timer");
  work("JA", "go");
  await until(() => fs.existsSync(exitFile(j.id)));
  steps = tick(co);
  assert.deepEqual(steps.map((s) => `${s.step}:${s.kind}:${s.result}`), ["qa:job:pass"]);
  assert.equal(steps[0].findings, "contrast 4.4 on card 3", "the stage's pass rule and findings, read from the job's output");
  assert.equal(o.stage, "check");
  assert.equal(j.state, "done");
  assert.equal(o.history.find((h) => h.stage === "qa").by, "code");
  assert.ok(co.log.events.some((e) => e.type === "job-start") && co.log.events.some((e) => e.type === "job-end" && e.result === "pass"));
});

test("a failing job is a revise with its findings; a job whose order moved on is killed as stale", async () => {
  const co = fresh(FLOW(QA()));
  const o = order(co, "JB");
  work("JB", "go"); work("JB", "bad");
  const id = tick(co)[0].job;
  await until(() => fs.existsSync(exitFile(id)));
  const steps = tick(co);
  assert.equal(steps[0].result, "revise");
  assert.equal(o.stage, "build");
  assert.equal(o.loops, 1);
  assert.match(o.findings, /result = "fail", wanted "pass"/);
  // stale: the order is revised by other means while its job runs
  const co2 = fresh(FLOW(QA()));
  const q = order(co2, "JD");
  const st = tick(co2)[0];
  const j = jobsOf(co2)[st.job];
  co2.engine.advance(q.id, { stage: "qa", by: "code", verdict: "revise", findings: "by hand" });
  assert.deepEqual(tick(co2).map((s) => s.step), ["job-stale"]);
  assert.equal(j.state, "stale");
  await until(() => !alive(j.pid));
});

test("a timeout is a stage-error, not a revise: the order holds at its stage until a retry, and nothing restarts it", async () => {
  const co = fresh(FLOW(QA({ timeoutMs: 300 })));
  const o = order(co, "JE");
  const id = tick(co)[0].job;
  const pid = jobsOf(co)[id].pid;
  await until(() => fs.existsSync(exitFile(id)));
  const steps = tick(co);
  assert.deepEqual(steps.map((s) => `${s.step}:${s.result}`), ["qa:stage-error"]);
  assert.match(steps[0].output, /timed out after 300 ms/);
  assert.deepEqual([o.stage, o.loops, o.history.filter((h) => h.stage === "qa").length], ["qa", 0, 0], "not revised, not signed");
  assert.equal(o.stageError.stage, "qa");
  assert.equal(jobsOf(co)[id].state, "error");
  await until(() => !alive(pid)); // the wrapper killed its whole group
  assert.deepEqual(tick(co), [], "held: no new job");
  assert.ok(co.log.events.some((e) => e.type === "stage-error" && e.order === o.id));
  delete o.stageError; // what `supervisor.mjs retry` does
  work("JE", "go");
  const again = tick(co);
  assert.deepEqual(again.map((s) => `${s.step}:${s.result}`), ["qa:started"]);
  assert.notEqual(again[0].job, id);
});

test("a job that died without an exit record is a stage-error; a sync cmd's timeout is a stage-error too", async () => {
  const co = fresh(FLOW(QA()));
  const o = order(co, "JF");
  const j = jobsOf(co)[tick(co)[0].job];
  process.kill(-j.pid, "SIGKILL");
  await until(() => !alive(j.pid));
  const steps = tick(co);
  assert.equal(steps[0].result, "stage-error");
  assert.match(steps[0].output, /died without an exit record/);
  assert.equal(o.stage, "qa");
  const sync = fresh(FLOW({ argv: ["node", "-e", "setTimeout(() => {}, 5000)"], timeoutMs: 200 }, { async: false }));
  const s = order(sync, "JG");
  assert.deepEqual(tick(sync).map((x) => `${x.step}:${x.kind}:${x.result}`), ["qa:cmd:stage-error"]);
  assert.deepEqual([s.stage, s.loops], ["qa", 0]);
});

test("validateSpec: async is a boolean and needs a run; the built-in specs stay valid", () => {
  const spec = builtinSpec("toy");
  spec.flow.stages = JSON.parse(JSON.stringify(FLOW(QA()).stages));
  assert.deepEqual(validateSpec(spec), []);
  spec.flow.stages[1].async = "yes";
  assert.ok(validateSpec(spec).some((x) => /stage qa: async is true or false/.test(x)));
  spec.flow.stages[1].async = true; delete spec.flow.stages[1].run;
  assert.ok(validateSpec(spec).some((x) => /async needs a run/.test(x)));
  for (const n of ["toy", "storybook", "research", "sheetco"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
});

test("serve wakes when a job ends (not on the 60 s fallback), agents' CLI calls work while it runs, and retry clears a stage-error", async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k2-serve-"));
  const env = { ...process.env, META_LIVE_DIR: d }; delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const spec = builtinSpec("toy"); spec.name = "k2"; spec.flow.stages = JSON.parse(JSON.stringify(FLOW(QA()).stages));
  const f = path.join(d, "k2.json"); fs.writeFileSync(f, JSON.stringify(spec));
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0);
  const o = run("meta.mjs", "order", "new", "--by=cos", "--to=mgr-live", "--title=x", "--task=KS", "--accept=a lesson").out.order;
  run("meta.mjs", "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1", "--budget=100");
  const msg = new Map(JSON.parse(fs.readFileSync(path.join(d, "state.json"), "utf8")).mailbox.msgs.__map).values().next().value.id;
  const e = run("meta.mjs", "room", "enter", `--msg=${msg}`, "--role=toy-builder-1");
  fs.mkdirSync(path.join(d, "work", "KS"), { recursive: true });
  assert.equal(run("meta.mjs", "room", "leave", `--run=${e.out.run}`, "--evidence=w").code, 0);
  const sv = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--idle-min=1", "--max-min=0.5"], { env });
  const events = []; let buf = "";
  sv.stdout.on("data", (x) => { buf += x; let i; while ((i = buf.indexOf("\n")) >= 0) { events.push({ ...JSON.parse(buf.slice(0, i)), at: Date.now() }); buf = buf.slice(i + 1); } });
  const has = (s) => events.find((x) => x.event === "steps" && x.steps.includes(s));
  try {
    await until(() => has(`qa:${o}:started`));
    const t0 = Date.now();
    assert.equal(run("meta.mjs", "room", "wake-plan").code, 0, "the lock is free while the job runs");
    assert.ok(Date.now() - t0 < 5000);
    fs.writeFileSync(path.join(d, "work", "KS", "go"), "");
    const goAt = Date.now();
    await until(() => has(`qa:${o}:pass`), 20000);
    assert.ok(has(`qa:${o}:pass`).at - goAt < 10000, "woken by the job's exit record");
  } finally { sv.kill(); }
  const jobs = run("supervisor.mjs", "jobs").out;
  assert.deepEqual(jobs.map((j) => [j.stage, j.state, j.verdict]), [["qa", "done", "pass"]]);
  assert.equal(run("supervisor.mjs", "retry", `--order=${o}`).code, 1, "no stage-error to retry");
});

test("K8+K9 review: a job started before a park and resume (same stage and loops) is stale; staleFor kills it at once", async () => {
  const co = fresh(FLOW(QA()));
  const o = order(co, "JP");
  const id = tick(co)[0].job;
  const j = jobsOf(co)[id];
  assert.equal(j.parks, 0);
  co.engine.park(o.id, { by: "mgr-live", reason: "publish hold" });
  co.engine.resume(o.id, { by: "mgr-live", reason: "lifted" }); // two CLI calls, no tick between them
  assert.equal(o.stage, "qa"); assert.equal(o.loops, 0);
  const steps = tick(co);
  assert.equal(j.state, "stale", "the pre-park job signs nothing");
  assert.ok(steps.some((s) => s.step === "job-stale" && s.job === id));
  const fresh2 = steps.find((s) => s.result === "started");
  assert.ok(fresh2 && fresh2.job !== id, "a fresh job starts for the resumed stage");
  const k = jobsOf(co)[fresh2.job];
  assert.equal(k.parks, 1);
  co.engine.park(o.id, { by: "mgr-live", reason: "again" });
  const { staleFor } = await import("../jobs.mjs");
  assert.deepEqual(staleFor(co, o, "order parked"), [k.id]);
  assert.equal(k.state, "stale");
  await until(() => !alive(k.pid));
});

test("K8+K9 review 2: `order park` and `order cancel` kill the order's running K2 job at once (CLI, no tick between)", async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k2-park-"));
  const env = { ...process.env, META_LIVE_DIR: d }; delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const spec = builtinSpec("toy"); spec.name = "k2p"; spec.flow.stages = JSON.parse(JSON.stringify(FLOW(QA()).stages));
  const f = path.join(d, "k2p.json"); fs.writeFileSync(f, JSON.stringify(spec));
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0);
  const toQa = (task) => {
    const o = run("meta.mjs", "order", "new", "--by=cos", "--to=mgr-live", "--title=x", `--task=${task}`, "--accept=a lesson").out.order;
    run("meta.mjs", "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1", "--budget=100");
    const msg = run("meta.mjs", "queue", "toy-builder-1").out.find((m) => m.order === o).msg;
    const e = run("meta.mjs", "room", "enter", `--msg=${msg}`, "--role=toy-builder-1");
    fs.mkdirSync(path.join(d, "work", task), { recursive: true });
    assert.equal(run("meta.mjs", "room", "leave", `--run=${e.out.run}`, "--evidence=w").code, 0);
    return o;
  };
  const p = toQa("KP"), c = toQa("KC");
  run("supervisor.mjs", "tick");
  const job = (o) => run("supervisor.mjs", "jobs").out.find((j) => j.order === o);
  const jp = job(p), jc = job(c);
  assert.ok(jp && jc && alive(jp.pid) && alive(jc.pid), "both jobs running");
  assert.equal(run("meta.mjs", "order", "park", p, "--by=mgr-live", "--reason=publish hold").code, 0);
  assert.equal(job(p).state, "stale", "killed by the park, not at the next collect");
  assert.equal(job(c).state, "running", "another order's job is untouched");
  const k = run("meta.mjs", "order", "cancel", c, "--by=cos", "--reason=kill");
  assert.equal(k.code, 0, k.err);
  assert.equal(job(c).state, "stale", "killed by the cancel");
  await until(() => !alive(jp.pid) && !alive(jc.pid));
  const ev = JSON.parse(fs.readFileSync(path.join(d, "state.json"), "utf8"));
  assert.ok(JSON.stringify(ev).includes("jobs-stopped"));
});
