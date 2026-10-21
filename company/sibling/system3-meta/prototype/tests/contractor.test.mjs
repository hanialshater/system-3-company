import { test } from "node:test";
import assert from "node:assert/strict";
import { hireContractor, endContracts, onboardingProblems } from "../contractor.mjs";
import { build } from "../toy.mjs";

function setup() {
  const co = build();
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  o.task = "TX";
  co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
  return { co, o };
}
const hire = (co, o, extra = {}) => hireContractor(co, { by: "mgr-w", order: o.id, budget: 50_000, onboarding: { docs: ["live/work/TX/"], laneMemory: true, brief: "Fix it fast" }, ...extra });

test("onboarding validation: no acceptance tests, state, parent paths, other lanes' work, unknown fields", () => {
  assert.deepEqual(onboardingProblems({ docs: ["live/work/TX/", "company/roles/b-w1.md"] }, { ownTasks: ["TX"] }), []);
  for (const d of ["scratchpad/acceptance3/T1.test.mjs", "live/state-run3.json", "../secrets", "/etc/passwd", "live/work/OTHER/x.mjs", "tools/company.mjs"]) assert.ok(onboardingProblems({ docs: [d] }, { ownTasks: ["TX"] }).length, d);
  assert.match(onboardingProblems({ access: "all" }).join(), /unknown onboarding field/);
});

test("any lane manager may hire for its own fresh, isolated order within its limit; others are refused", () => {
  const { co, o } = setup();
  assert.throws(() => hireContractor(co, { by: "mgr-g", order: o.id, budget: 10 }), /not in mgr-g's lane/);
  assert.throws(() => hireContractor(co, { by: "b-w1", order: o.id, budget: 10 }), /not a lane manager/);
  assert.throws(() => hire(co, o, { budget: 999_999 }), /over the manager limit/);
  const dep = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", after: [o.id] });
  assert.throws(() => hire(co, o), /not isolated/);
  dep.stage = "done";
  const c = hire(co, o);
  assert.equal(c.level, "contractor");
  assert.equal(o.builder, c.id);
  assert.equal(co.mailbox.queue("b-w1", "work").length, 0, "the previous builder's message is withdrawn");
  assert.equal(co.mailbox.queue(c.id, "work").length, 1);
});

test("a contractor works only on its order's build, gets its manager's onboarding, and cannot check", () => {
  const { co, o } = setup();
  co.rooms.memory.set("b-w1", [{ did: "x", learned: "use code points" }]);
  const c = hire(co, o);
  const m = co.mailbox.queue(c.id, "work")[0];
  const { run, ctx } = co.rooms.enter({ msg: m.id, role: c.id });
  assert.equal(ctx.roleDoc, null);
  assert.deepEqual(ctx.onboarding.docs, ["live/work/TX/"]);
  assert.deepEqual(ctx.laneMemory, [{ from: "b-w1", learned: "use code points" }]);
  co.rooms.leave(run, { evidence: "w", learned: "the spec hides a unicode case" });
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  const chk = co.mailbox.queue("pool:checker", "work")[0];
  assert.throws(() => co.rooms.enter({ msg: chk.id, role: c.id }), /lane|contractor/);
  assert.throws(() => co.engine.advance(o.id, { stage: "check", by: c.id, evidence: "e" }), /signer|independence/);
});

test("the contract ends when the order ships: offboarded, a handoff to the manager, no memory kept", () => {
  const { co, o } = setup();
  const c = hire(co, o);
  const { run } = co.rooms.enter({ msg: co.mailbox.queue(c.id, "work")[0].id, role: c.id });
  co.rooms.leave(run, { evidence: "w", learned: "boundary at 2^53" });
  for (const [stage, by] of [["test1", "code"], ["check", "chk-1"], ["uat", "mgr-w"]]) co.engine.advance(o.id, { stage, by, evidence: "e" });
  co.engine.decide(co.engine.queue("founder")[0].id, { by: "founder", decision: "approve", words: "Approve deploy", channel: "chat" });
  co.engine.advance(o.id, { stage: "ship", by: "rel-1", evidence: "e" });
  assert.deepEqual(endContracts(co), [c.id]);
  assert.equal(co.org.role(c.id).active, false);
  assert.equal(co.rooms.memory.has(c.id), false);
  const h = co.mailbox.queue("mgr-w", "handoff")[0];
  assert.deepEqual(h.body.learned, ["boundary at 2^53"]);
  assert.deepEqual(endContracts(co), [], "once");
});
