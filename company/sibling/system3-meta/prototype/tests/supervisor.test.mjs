import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-sup-"));
process.env.META_LIVE_DIR = LIVE;
const { make, save, load, LIVE_ROLES, TASK_FLOW } = await import("../state.mjs");
const { tick, plan, nextTimer, recordFinished, briefFor } = await import("../supervisor.mjs");
const ACC = path.join(LIVE, "acceptance");

function fresh() {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", TASK_FLOW, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task, { priority = "next", builder = "toy-builder-1", dueMin = null } = {}) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x", priority, dueMin });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: builder, budget: 100 });
  return o;
}
function writeTask(task, { pass = true } = {}) {
  const d = path.join(LIVE, "work", task);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "m.mjs"), "export const f = () => 1;\n");
  fs.writeFileSync(path.join(d, "m.test.mjs"), `import { test } from "node:test"; import assert from "node:assert"; import { f } from "./m.mjs"; test("f", () => assert.equal(f(), ${pass ? 1 : 2}));\n`);
}
function build(co, o) {
  const m = co.mailbox.queue(o.builder, "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: o.builder });
  co.rooms.leave(run, { evidence: "w" });
}
function check(co, o, verdict = "pass") {
  const m = co.mailbox.queue("pool:checker", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-checker" });
  co.rooms.leave(run, { evidence: "c", verdict, findings: verdict === "revise" ? "bug" : null });
}

test("tick runs test1 by code, sends a failing build back with the test output", () => {
  const co = fresh();
  const a = order(co, "SA"), b = order(co, "SB");
  writeTask("SA"); writeTask("SB", { pass: false });
  build(co, a); build(co, b);
  const steps = tick(co);
  assert.equal(a.stage, "check");
  assert.equal(b.stage, "build");
  assert.match(b.findings, /fail 1|not ok/);
  assert.deepEqual(steps.map((s) => s.step + ":" + s.result), ["test1:pass", "test1:revise"]);
});

test("tick: UAT from hidden tests, then ship copies the module but not the builder's tests; no acceptance file waits for a person", () => {
  const co = fresh();
  const a = order(co, "UA"), b = order(co, "UB");
  writeTask("UA"); writeTask("UB");
  for (const o of [a, b]) { build(co, o); }
  tick(co);
  for (const o of [a, b]) check(co, o);
  fs.mkdirSync(ACC, { recursive: true });
  fs.writeFileSync(path.join(ACC, "UA.test.mjs"), `import { test } from "node:test"; import assert from "node:assert"; import { f } from "${path.join(LIVE, "work", "UA", "m.mjs")}"; test("hidden", () => assert.equal(f(), 1));\n`);
  const steps = tick(co, { acceptance: ACC });
  assert.equal(a.stage, "done");
  assert.deepEqual(fs.readdirSync(path.join(LIVE, "shipped", "UA")), ["m.mjs"]);
  assert.equal(b.stage, "uat", "never passed by default");
  assert.ok(steps.some((s) => s.step === "uat-needs-a-person" && s.order === b.id));
  assert.equal(tick(co, { acceptance: ACC }).length, 0, "idempotent: a second tick does nothing and does not repeat the person note");
});

test("plan: now gets a fresh session even while one runs; next waits for no running session; later waits for a batch or due", () => {
  const co = fresh();
  const n1 = order(co, "P1"), l1 = order(co, "P2", { priority: "later", dueMin: 60 }), l2 = order(co, "P3", { priority: "later", dueMin: 60 });
  let p = plan(co, { batchLater: 3 });
  assert.deepEqual(p.map((x) => [x.role, x.msgs.length]), [["toy-builder-1", 3]], "next present: one session, which also takes the later items");
  const m = co.mailbox.queue("toy-builder-1", "work")[0];
  co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  assert.deepEqual(plan(co), [], "a running session drains the rest");
  const urgent = order(co, "P4", { priority: "now" });
  p = plan(co);
  assert.equal(p.length, 1);
  assert.equal(p[0].cap, 1);
  assert.match(p[0].why, /^now/);
  const co2 = fresh();
  order(co2, "Q1", { priority: "later", dueMin: 60 }); order(co2, "Q2", { priority: "later", dueMin: 60 });
  assert.deepEqual(plan(co2, { batchLater: 3 }), [], "2 later items: wait for a batch");
  co2.engine.clock = { now: () => Date.now() / 60000 + 61 };
  co2.mailbox.clock = co2.engine.clock;
  assert.equal(plan(co2, { batchLater: 3 }).length, 1, "past due: plan a session");
  assert.ok(nextTimer(co) > 0);
});

test("the checker pool is planned once, and never offers a checker its own build", () => {
  const co = fresh();
  const a = order(co, "C1");
  writeTask("C1"); build(co, a); tick(co);
  const p = plan(co);
  assert.deepEqual(p.map((x) => x.role), ["toy-checker"]);
});

test("state round trip through save/load keeps the supervisor's view", () => {
  const co = fresh();
  order(co, "R1");
  save(co);
  const back = load();
  assert.equal(plan(back).length, 1);
});

test("a launched session that has not entered yet is not planned again; after the grace period it is", () => {
  const co = fresh();
  order(co, "L1");
  assert.equal(plan(co).length, 1);
  co.log.add({ type: "launch", role: "toy-builder-1", msgs: [] });
  assert.equal(plan(co).length, 0, "starting: no duplicate");
  const t0 = co.engine.clock.now();
  co.engine.clock = { now: () => t0 + 6 };
  assert.equal(plan(co).length, 1, "no enter within 5 min: the launch failed, plan it again");
});

test("plan: a small remainder joins the drain (5 queued, cap 4 → one session of 5); a big one does not (8 → 4)", () => {
  const co = fresh();
  for (let i = 0; i < 5; i++) order(co, `T${i}`);
  assert.deepEqual(plan(co, { cap: 4 }).map((p) => [p.role, p.msgs.length, p.cap]), [["toy-builder-1", 5, 5]]);
  for (let i = 5; i < 8; i++) order(co, `T${i}`);
  assert.deepEqual(plan(co, { cap: 4 }).map((p) => [p.role, p.msgs.length, p.cap]), [["toy-builder-1", 4, 4]]);
});

test("cycle parts: usage goes to the role's latest session without usage (closing it); no session → a plain usage event; briefs are written by code", () => {
  const co = fresh();
  const a = order(co, "U1"), b = order(co, "U2");
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === a.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "w" });
  const u = recordFinished(co, [["toy-builder-1", 1000], ["toy-checker", 500]]);
  assert.equal(u[0].session, co.rooms.runs.get(run).session);
  assert.equal(co.rooms.sessions.get(u[0].session).open, false);
  assert.equal(u[1].session, null);
  assert.throws(() => recordFinished(co, [["nobody", 1]]), /no role/);
  const p = plan(co)[0];
  const brief = briefFor(co, p, { context: "The book: a fox." });
  assert.match(brief, /You are `toy-builder-1` \(builder\)/);
  assert.match(brief, new RegExp(`room enter --msg=${p.msgs[0]} --role=toy-builder-1`));
  assert.match(brief, /The book: a fox\./);
  assert.match(brief, /meta\.mjs check --order/);
  assert.ok(b);
});
