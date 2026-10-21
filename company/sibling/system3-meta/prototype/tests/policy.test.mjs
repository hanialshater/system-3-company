import { test } from "node:test";
import assert from "node:assert/strict";
import { policyProblems, proposePolicy, activatePolicy, managerReport, recordCycle } from "../policy.mjs";
import { build } from "../toy.mjs";

const V2 = { revisionPriority: "later", revisionDueMin: 30, batchLater: 2 };
const pred = "quiet lane: tokens/item -15%, lead p50 +<=30% (ITERATIONS I5)";

test("I5-5: validation refuses widening now, later without a due time, unknown knobs, bad ranges", () => {
  assert.deepEqual(policyProblems(V2), []);
  assert.match(policyProblems({ nowBy: ["founder", "manager"] }).join(), /only narrow/);
  assert.match(policyProblems({ revisionPriority: "later" }).join(), /needs revisionDueMin/);
  assert.match(policyProblems({ independence: false }).join(), /unknown knob independence/);
  assert.match(policyProblems({ leaseMin: 5 }).join(), /unknown knob leaseMin/);
  assert.match(policyProblems({ drainCap: 0 }).join(), /integer 1-10/);
  assert.match(policyProblems({ revisionDueMin: 99999 }).join(), /revisionDueMin must be/);
  assert.deepEqual(policyProblems({ nowBy: ["founder"] }), [], "narrowing is fine");
});

test("only the lane's manager proposes and activates; a change needs a prediction; refusals are logged", () => {
  const co = build();
  assert.throws(() => proposePolicy(co.engine, { lane: "w", by: "mgr-g", knobs: V2, reason: "x", prediction: pred }), /not the manager/);
  assert.throws(() => proposePolicy(co.engine, { lane: "w", by: "mgr-w", knobs: V2, reason: "x" }), /prediction/);
  assert.throws(() => proposePolicy(co.engine, { lane: "w", by: "mgr-w", knobs: { leaseMin: 1 }, reason: "x", prediction: pred }), /policy/);
  assert.equal(co.log.of("refuse").filter((e) => e.rule === "policy").length, 1);
  const v = proposePolicy(co.engine, { lane: "w", by: "mgr-w", knobs: V2, reason: "run 3: cost sits in single-item revisions", prediction: pred });
  assert.throws(() => activatePolicy(co.engine, { lane: "w", version: v.version, by: "cos" }), /not the manager/);
  activatePolicy(co.engine, { lane: "w", version: v.version, by: "mgr-w" });
  assert.equal(co.log.of("policy-active").length, 1);
});

test("an order pins the policy active at its creation; its revision is queued as later with a due time; now stays now", () => {
  const co = build();
  const before = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  activatePolicy(co.engine, { lane: "w", version: proposePolicy(co.engine, { lane: "w", by: "mgr-w", knobs: V2, reason: "r", prediction: pred }).version, by: "mgr-w" });
  const after = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  const urgent = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", priority: "now" });
  assert.equal(before.policyVersion, null);
  assert.equal(after.policyVersion, 1);
  for (const o of [before, after, urgent]) {
    co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
    co.engine.advance(o.id, { stage: "build", by: "b-w1", evidence: "e" });
    co.engine.advance(o.id, { stage: "test1", by: "code", verdict: "revise", findings: "f" });
  }
  assert.equal(before.priority, "next", "pinned to no policy: unchanged");
  assert.equal(after.priority, "later");
  assert.equal(after.due, co.clock.now() + 30);
  assert.equal(urgent.priority, "now");
  assert.equal(co.mailbox.queue("b-w1", "work").find((m) => m.ref === after.id && m.body.loops === 1).priority, "later");
});

test("manager cycle: the report comes from events; a change must name its proposed version", () => {
  const co = build();
  const r = managerReport(co.engine, "w");
  assert.equal(r.shipped, 0);
  assert.throws(() => recordCycle(co.engine, { lane: "w", by: "mgr-w", report: r, belief: "b", decision: "change" }), /names the proposed version/);
  assert.throws(() => recordCycle(co.engine, { lane: "w", by: "mgr-g", report: r, belief: "b", decision: "keep" }), /not the manager/);
  recordCycle(co.engine, { lane: "w", by: "mgr-w", report: r, belief: "too early to tell", decision: "keep" });
  assert.equal(co.log.of("manager-cycle").length, 1);
});
