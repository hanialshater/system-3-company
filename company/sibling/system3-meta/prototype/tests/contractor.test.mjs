import { test } from "node:test";
import assert from "node:assert/strict";
import { engage, engageTemplate, briefFor, deliver, decideContract, expireContracts, onboardingProblems, deliverableProblems } from "../contractor.mjs";
import { build } from "../toy.mjs";
import { plan } from "../supervisor.mjs";

const open = (co, extra = {}) => engage(co, { by: "mgr-w", kind: "research", goal: "Which ISO week rules trip libraries?", deliverable: "findings with sources", budget: 50_000, timeboxMin: 60, onboarding: { docs: ["company/product/demo-standard.md"], laneMemory: true, brief: "Be brief" }, ...extra });
const finding = { claim: "Week 1 holds the first Thursday", source: "ISO 8601-1:2019 §5.2.2", confidence: "high" };

test("onboarding and deliverable validation", () => {
  assert.deepEqual(onboardingProblems({ docs: ["company/roles/b-w1.md", "docs/x.md"] }), []);
  for (const d of ["scratchpad/acceptance3/T1.test.mjs", "live/state-run3.json", "../x", "/etc/passwd", "tools/company.mjs", "live/work/OTHER/"]) assert.ok(onboardingProblems({ docs: [d] }).length, d);
  assert.match(deliverableProblems("research", { summary: "s", path: "live/contracts/C-1/r.md", findings: [{ claim: "x" }] }).join(), /no source.*confidence/);
  assert.match(deliverableProblems("prototype", { summary: "s", path: "live/work/T1/x.mjs" }).join(), /own folder/);
  assert.deepEqual(deliverableProblems("prototype", { summary: "s", path: "live/contracts/C-1/proto.mjs" }), []);
});

test("only a lane manager opens an engagement, for out-of-process kinds, within limit and timebox", () => {
  const co = build();
  assert.throws(() => open(co, { by: "b-w1" }), /not a lane manager/);
  assert.throws(() => open(co, { kind: "build" }), /in-process work is an order/);
  assert.throws(() => open(co, { budget: 999_999 }), /manager limit/);
  assert.throws(() => open(co, { timeboxMin: 0 }), /timebox/);
  const c = open(co);
  assert.equal(c.id, "C-1");
  assert.equal(co.org.role(c.contractor).level, "contractor");
  assert.equal(co.mailbox.queue(c.contractor, "contract").length, 1);
});

test("a contractor enters no flow work and signs nothing", () => {
  const co = build();
  const c = open(co);
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
  const m = co.mailbox.queue("b-w1", "work")[0];
  assert.throws(() => co.rooms.enter({ msg: m.id, role: c.contractor }), /lane|outside the delivery flow/);
  assert.throws(() => co.engine.advance(o.id, { stage: "build", by: c.contractor, evidence: "e" }), /signer/);
});

test("brief = the manager's onboarding; research needs sourced findings; the manager decides; the result enters only as a cited order", () => {
  const co = build();
  co.rooms.memory.set("b-w1", [{ did: "x", learned: "dates near new year are tricky" }]);
  const c = open(co);
  const b = briefFor(co, c.id);
  assert.equal(b.write_only_to, "live/contracts/C-1/");
  assert.deepEqual(b.laneMemory, [{ from: "b-w1", learned: "dates near new year are tricky" }]);
  assert.throws(() => deliver(co, { cid: c.id, by: c.contractor, summary: "s", path: "live/contracts/C-1/r.md", findings: [{ claim: "x" }] }), /deliverable/);
  assert.throws(() => deliver(co, { cid: c.id, by: "b-w1", summary: "s", path: "live/contracts/C-1/r.md", findings: [finding] }), /not the contractor/);
  assert.throws(() => co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", fromContract: c.id }), /not an accepted engagement/);
  deliver(co, { cid: c.id, by: c.contractor, summary: "Three rules", path: "live/contracts/C-1/r.md", findings: [finding] });
  assert.throws(() => decideContract(co, { cid: c.id, by: "mgr-g", decision: "accept", reason: "r" }), /did not open/);
  decideContract(co, { cid: c.id, by: "mgr-w", decision: "accept", reason: "sourced and useful" });
  assert.equal(co.org.role(c.contractor).active, false);
  assert.equal(co.mailbox.queue("mgr-w", "handoff").length, 1);
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "build it per C-1", fromContract: c.id });
  assert.equal(o.fromContract, "C-1");
  assert.equal(o.stage, "build", "the cited work starts at build like any order");
});

test("timebox: no delivery by the due time expires the engagement; the plan starts each open contractor once", () => {
  const co = build();
  const c = open(co, { timeboxMin: 10 });
  assert.ok(plan(co).some((p) => p.role === c.contractor));
  co.log.add({ type: "launch", role: c.contractor });
  assert.ok(!plan(co).some((p) => p.role === c.contractor), "launched: not planned again");
  co.clock.t += 11;
  assert.deepEqual(expireContracts(co), ["C-1"]);
  assert.equal(co.engine.contracts.get("C-1").state, "expired");
  assert.throws(() => deliver(co, { cid: c.id, by: c.contractor, summary: "s", path: "live/contracts/C-1/r.md", findings: [finding] }), /expired|timed out/);
});

test("manager-onboarding template: the brief carries the lane's data from code; findings cite it", () => {
  const co = build();
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", title: "Week numbers" });
  co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
  const c = engageTemplate(co, { template: "manager-onboarding", by: "mgr-w" });
  assert.equal(c.kind, "research");
  const b = briefFor(co, c.id);
  assert.equal(b.template, "manager-onboarding");
  assert.deepEqual(b.data.openOrders.map((x) => x.order), [o.id]);
  assert.ok("report" in b.data && "policies" in b.data);
  deliver(co, { cid: c.id, by: c.contractor, summary: "lane brief", path: `live/contracts/${c.id}/brief.md`, findings: [{ claim: "one order open, at build", source: `order ${o.id}`, confidence: "high" }] });
  decideContract(co, { cid: c.id, by: "mgr-w", decision: "accept", reason: "accurate" });
  assert.throws(() => engageTemplate(co, { template: "nope", by: "mgr-w" }), /no template/);
});
