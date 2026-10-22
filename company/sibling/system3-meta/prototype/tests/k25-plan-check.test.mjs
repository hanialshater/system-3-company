import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// K25 (M6-RUN "What this says" 2: all 7 of M6's revises were the fact-checker's, each after a whole build): a pre-build
// plan check. A flow's first stage need not be build: draft (builder) → plan-check (independent) → build (builder) → …
// The builder's stages are its work stages; a plain revise goes back to the last one before the reviser (plan-check's
// to draft, check's to build: the approved draft stays approved unless the reviser routes it there), and K9's cap
// counts loops per family (the work stage a loop lands in), so cheap plan loops do not use up the build's cap.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k25-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES } = await import("../state.mjs");
const { workStagesOf, reviseStageOf, loopFamilyOf, flowProblems } = await import("../lib.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const { judgment } = await import("../supervisor.mjs");
const { applyActs } = await import("../acts.mjs");

const DRAFT = { stages: [
  { stage: "draft", signer: "builder", evidence: ["plan"] },
  { stage: "plan-check", signer: "checker", independent: true, evidence: ["plan review"] },
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "test1", signer: "code", evidence: [] },
  { stage: "check", signer: "checker", evidence: ["review"] },
  { stage: "uat", signer: "orderer", evidence: ["acceptance"] },
  { stage: "ship", signer: "release", evidence: ["copied"] },
] };
const ONE = { stages: DRAFT.stages.slice(2) }; // the flow every spec before K25 had: build first

function fresh(flow = DRAFT, maxLoops = null) {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  co.engine.defaultMaxLoops = maxLoops;
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}
const who = { draft: ["toy-builder-1", "toy-builder-1"], "plan-check": ["pool:checker", "toy-checker"], build: ["toy-builder-1", "toy-builder-1"], check: ["pool:checker", "toy-checker"] };
function sign(co, o, opts = {}) {
  const [to, role] = who[o.stage];
  const m = co.mailbox.queue(to, "work").find((x) => x.ref === o.id && x.body.stage === o.stage);
  assert.ok(m, `a ${o.stage} item for ${o.id} in ${to}`);
  const { run } = co.rooms.enter({ msg: m.id, role });
  return co.rooms.leave(run, { evidence: "e", verdict: "pass", ...opts });
}

test("work stages, the plain revise target and the loop family, per flow", () => {
  assert.deepEqual(workStagesOf(DRAFT), ["draft", "build"]);
  assert.deepEqual(workStagesOf(ONE), ["build"]);
  assert.deepEqual(["plan-check", "build", "test1", "check", "ship"].map((s) => reviseStageOf(DRAFT, s)), ["draft", "draft", "build", "build", "build"]);
  assert.deepEqual(["test1", "check", "ship"].map((s) => reviseStageOf(ONE, s)), ["build", "build", "build"], "a one-work-stage flow: its first stage, as before K25");
  assert.deepEqual(["draft", "plan-check", "build", "check"].map((s) => loopFamilyOf(DRAFT, s)), ["draft", "draft", "build", "build"]);
  // a ritual flow (K19): its chair's stage is its only work stage
  const RIT = { stages: [{ stage: "run", signer: "chair", evidence: ["r"] }, { stage: "check", signer: "attendee", evidence: ["c"] }, { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "1"] } }] };
  assert.deepEqual([workStagesOf(RIT), reviseStageOf(RIT, "check")], [["run"], "run"]);
  assert.deepEqual(flowProblems(DRAFT), []);
});

test("generator: the first stage is signed by the builder, whatever it is called; build stays valid", () => {
  const s = builtinSpec("toy");
  assert.deepEqual(validateSpec(s), [], "toy (build first) is unchanged");
  const d = builtinSpec("toy");
  d.flow.stages = [{ stage: "draft", signer: "builder", evidence: ["plan"] }, { stage: "plan-check", signer: "checker", independent: true, evidence: ["review"] }, ...d.flow.stages];
  assert.deepEqual(validateSpec(d), [], "draft → plan-check → build validates");
  d.flow.stages[0].signer = "checker";
  assert.match(validateSpec(d).join("\n"), /the first stage is signed by the builder/);
});

test("a plan-check revise goes to draft; a check revise goes to build, not draft; --to=draft re-plans", () => {
  const co = fresh();
  const o = order(co, "P1");
  assert.equal(o.stage, "draft", "an order starts at the flow's first stage");
  sign(co, o);
  assert.equal(o.stage, "plan-check");
  // K4: the builder may not sign the plan check (independent)
  const m = co.mailbox.queue("pool:checker", "work").find((x) => x.ref === o.id);
  assert.throws(() => co.rooms.enter({ msg: m.id, role: "toy-builder-1" }), /independence|lane/);
  sign(co, o, { verdict: "revise", findings: "claim 2 has no source" });
  assert.deepEqual([o.stage, o.loops, o.loopsBy], ["draft", 1, { draft: 1 }]);
  assert.equal(o.history.at(-1).to, undefined, "the plain target: no `to` recorded");
  sign(co, o); sign(co, o); // draft, plan-check pass
  assert.equal(o.stage, "build");
  sign(co, o);
  o.stage = "check"; // test1 is code's (no tests here); the check's own revise is what matters
  co.engine.notifyStage(o);
  sign(co, o, { verdict: "revise", findings: "the reveal says 9.8 m/s², the claim 9.81" });
  assert.deepEqual([o.stage, o.loops, o.loopsBy], ["build", 2, { draft: 1, build: 1 }], "check's revise is a build loop: the plan stays approved");
  const ev = co.log.of("reopen").at(-1);
  assert.deepEqual([ev.family, ev.familyLoops], ["build", 1]);
  sign(co, o); o.stage = "check"; co.engine.notifyStage(o);
  // the reviser says the plan changed: a routed revise to draft (K11), and the plan is checked again before the build
  sign(co, o, { verdict: "revise", to: "draft", findings: "the lesson now claims a second law: plan it" });
  assert.deepEqual([o.stage, o.history.at(-1).to, o.loopsBy], ["draft", "draft", { draft: 2, build: 1 }]);
  sign(co, o);
  assert.equal(o.stage, "plan-check");
});

test("K9 counts loops per family: two plan loops and a build loop do not park at maxLoops 2; a third plan loop does", () => {
  const co = fresh(DRAFT, 2);
  const o = order(co, "P2");
  sign(co, o); sign(co, o, { verdict: "revise", findings: "f1" });
  sign(co, o); sign(co, o, { verdict: "revise", findings: "f2" });
  assert.deepEqual([o.stage, o.loops], ["draft", 2]);
  sign(co, o); sign(co, o); sign(co, o); // draft, plan-check, build
  o.stage = "check"; co.engine.notifyStage(o);
  sign(co, o, { verdict: "revise", findings: "f3" });
  assert.deepEqual([o.stage, o.loops, o.loopsBy], ["build", 3, { draft: 2, build: 1 }], "3 loops in all, but at most 2 in each family: no park");
  sign(co, o); o.stage = "check"; co.engine.notifyStage(o);
  sign(co, o, { verdict: "revise", to: "draft", findings: "re-plan" });
  assert.equal(o.stage, "parked", "a third loop back to draft is over the cap of 2");
  const cap = co.log.of("loop-cap").at(-1);
  assert.deepEqual([cap.family, cap.familyLoops, cap.maxLoops], ["draft", 3, 2]);
  assert.match(o.parked.reason, /3 revise loops back to draft, over maxLoops 2/);
  // one work stage (every flow before K25): every loop counts, as before
  const c1 = fresh(ONE, 1);
  const a = order(c1, "P3");
  assert.equal(a.stage, "build");
  sign(c1, a); a.stage = "check"; c1.engine.notifyStage(a);
  sign(c1, a, { verdict: "revise", findings: "x" });
  sign(c1, a); a.stage = "check"; c1.engine.notifyStage(a);
  sign(c1, a, { verdict: "revise", findings: "y" });
  assert.equal(a.stage, "parked");
  assert.equal(c1.log.of("loop-cap").at(-1).family, undefined, "a one-family flow's events read as before");
  // an order from before K25 (no loopsBy): its loops are its first family's
  const c2 = fresh(DRAFT, 2);
  const b = c2.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  b.task = "P4"; b.loops = 2; delete b.loopsBy;
  c2.engine.delegate(b.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  assert.equal(c2.engine.familyLoops(b, "draft"), 2);
  sign(c2, b); sign(c2, b, { verdict: "revise", findings: "z" });
  assert.equal(b.stage, "parked", "2 old loops + 1 > 2");
});

test("delegation waits at the first stage, whatever its name; a Demo Crit's send-back goes to the work stage before it", () => {
  const co = fresh();
  co.data.tracker = undefined;
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = "P5";
  assert.ok(judgment(co).some((j) => j.role === "mgr-live" && j.tasks.some((t) => t.kind === "delegate" && t.ref === o.id)), "an order at draft with no builder is its manager's to delegate");
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  assert.throws(() => co.engine.sendBack(o.id, { by: "cos", findings: "x" }), /at draft: its work has not been shown/);
  sign(co, o); sign(co, o);
  assert.throws(() => co.engine.sendBack(o.id, { by: "cos", findings: "x" }), /at build: its work has not been shown/, "build after a plan check is a work stage too");
  sign(co, o); o.stage = "check"; co.engine.notifyStage(o);
  co.engine.sendBack(o.id, { by: "cos", findings: "Demo Crit: revise the reveal" });
  assert.deepEqual([o.stage, o.loopsBy], ["build", { build: 1 }], "back to build, not to draft");
  // K23's acts refuse a judgment about an order still at a work stage
  const t = fresh();
  const chair = order(t, "CHAIR"), target = order(t, "T");
  const steps = applyActs(t, chair, { acts: { by: "cos", allow: ["reopen", "cancel"] } }, [{ order: target.id, act: "reopen", findings: "x", judged: true }, { order: target.id, act: "cancel", reason: "kill", judged: true }], { stage: "ship" });
  assert.equal(steps.length, 2);
  assert.match(JSON.stringify(steps), /at draft: its work has not been shown/);
});

test("a shipped order reopened starts at its first stage again (a changed requirement may change the plan)", () => {
  const co = fresh();
  const o = order(co, "P6");
  o.stage = "done";
  co.engine.reopen(o.id, { by: "mgr-live", findings: "the brief changed" });
  assert.deepEqual([o.stage, o.loopsBy], ["draft", { draft: 1 }]);
});
