import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// K27 (founder 2026-10-22: a FAST and MORE ACCURATE harness, with ONE external evaluation at the end): an independent
// review stage may take its waiting orders in one session (`batch: {max, waitMin}`: one cold start for the batch) and
// may run for a sampled share of orders (`sample: {rate, min, max, always}`: deterministic by the order's id, always
// when a condition holds, otherwise signed by code as sampled-out, an event). The rate is a knob inside founder bounds.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k27-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES, save, load } = await import("../state.mjs");
const { flowProblems, batchProblems, sampleProblems, unitHash, SAMPLE_ALWAYS } = await import("../lib.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const { plan, nextTimer, batchOf } = await import("../supervisor.mjs");

const flow = ({ sample = null, batch = null } = {}) => ({ stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "test1", signer: "code", evidence: [] },
  { stage: "check", signer: "checker", evidence: ["review"], ...(sample ? { sample } : {}), ...(batch ? { batch } : {}) },
  { stage: "uat", signer: "orderer", evidence: ["acceptance"] },
  { stage: "ship", signer: "release", evidence: ["copied"] },
] });
function fresh(f) {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", f, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function toCheck(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "e" });
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  return o;
}
const types = (co, t) => co.log.events.filter((e) => e.type === t);

test("batch and sample: validation; the independent review need not be called check", () => {
  assert.deepEqual(batchProblems({ stage: "check", signer: "checker", batch: { max: 3, waitMin: 5 } }), []);
  assert.match(batchProblems({ stage: "check", signer: "checker", batch: { max: 0 } }).join(), /batch.max is a whole number 1-10/);
  assert.match(batchProblems({ stage: "build", signer: "builder", batch: { max: 2 } }).join(), /an independent stage an agent reviews/);
  assert.match(batchProblems({ stage: "check", signer: "checker", batch: { max: 2, size: 1 } }).join(), /batch is \{max, waitMin\}/);
  assert.deepEqual(sampleProblems({ stage: "check", signer: "checker", sample: { rate: 0.5, min: 0.25, max: 1, always: ["looped"] } }), []);
  assert.match(sampleProblems({ stage: "check", signer: "checker", sample: { rate: 0.2, min: 0.5 } }).join(), /min ≤ rate ≤ max/);
  assert.match(sampleProblems({ stage: "check", signer: "checker", sample: { rate: 1.5 } }).join(), /sample.rate is a number 0-1/);
  assert.match(sampleProblems({ stage: "check", signer: "checker", sample: { rate: 1, always: ["tuesday"] } }).join(), new RegExp(SAMPLE_ALWAYS.join(", ")));
  assert.match(sampleProblems({ stage: "test1", signer: "code", sample: { rate: 1 } }).join(), /an independent stage an agent reviews/);
  // a flow whose independent review is `eval` (signed by a role) holds the invariant; with none it does not
  const ev = flow().stages.map((s) => (s.stage === "check" ? { stage: "eval", signer: { role: "toy-checker" }, independent: true, evidence: ["e"] } : s));
  assert.deepEqual(flowProblems({ stages: ev }), []);
  assert.deepEqual(flowProblems({ stages: ev.filter((s) => s.stage !== "eval") }), ["no independent check stage"]);
  assert.deepEqual(flowProblems({ stages: ev.map((s) => (s.stage === "eval" ? { ...s, independent: false } : s)) }), ["no independent check stage"]);
  const spec = builtinSpec("toy");
  spec.flow.stages[2].batch = { max: 11 };
  assert.match(validateSpec(spec).join("\n"), /stage check: batch.max is a whole number 1-10/);
});

test("sample: deterministic by order id; a skipped stage is signed sampled-out by code, as an event, with nothing sent", () => {
  assert.equal(unitHash("O-1:check"), unitHash("O-1:check"));
  assert.notEqual(unitHash("O-1:check"), unitHash("O-2:check"));
  for (const x of ["a", "O-1:check", "O-99:eval"]) assert.ok(unitHash(x) >= 0 && unitHash(x) < 1);
  const co = fresh(flow({ sample: { rate: 0, min: 0, max: 1 } }));
  const o = toCheck(co, "T1");
  assert.equal(o.stage, "uat", "check skipped: the order moved on");
  assert.equal(co.mailbox.queue("pool:checker", "work").length, 0, "nothing was sent to the checkers");
  const skip = types(co, "sample-skip");
  assert.equal(skip.length, 1);
  assert.deepEqual([skip[0].order, skip[0].stage, skip[0].rate, skip[0].always], [o.id, "check", 0, []]);
  assert.equal(o.history.find((h) => h.stage === "check").verdict, "sampled-out");
  assert.equal(o.history.find((h) => h.stage === "check").by, "code");
  // nobody may sign a stage the sample runs as sampled-out
  const c1 = fresh(flow({ sample: { rate: 1 } })), o1 = toCheck(c1, "T2");
  assert.equal(o1.stage, "check");
  assert.equal(types(c1, "sample-run").length, 1);
  assert.throws(() => c1.engine.advance(o1.id, { stage: "check", by: "code", sampled: true }), /only a sampled stage the sample skips/);
  // the rate decides by the order's own draw
  const c2 = fresh(flow({ sample: { rate: 0.5, min: 0, max: 1 } }));
  const os2 = ["A", "B", "C", "D", "E", "F"].map((t) => toCheck(c2, t));
  for (const x of os2) assert.equal(x.stage === "check", unitHash(`${x.id}:check`) < 0.5, `${x.id}: runs exactly when its draw is under the rate`);
});

test("sample: always runs when a condition holds (looped, a failed self-check, now)", () => {
  const S = { rate: 0, min: 0, max: 1, always: ["looped", "self-check-failed", "now"] };
  // looped: the second visit to check, after a uat revise
  const co = fresh(flow({ sample: { ...S, always: ["looped"] } }));
  const o = toCheck(co, "L");
  assert.equal(o.stage, "uat");
  co.engine.advance(o.id, { stage: "uat", by: "mgr-live", verdict: "revise", evidence: "x", findings: "f" });
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "e" });
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  assert.equal(o.stage, "check", "a looped order is always reviewed");
  assert.deepEqual(types(co, "sample-run").at(-1).always, ["looped"]);
  // a failed self-check (meta.mjs check records it) before the review
  const c2 = fresh(flow({ sample: S }));
  const o2 = c2.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o2.task = "SC"; c2.engine.delegate(o2.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  c2.log.add({ type: "self-check", order: o2.id, pass: true, output: "ok" });
  c2.log.add({ type: "self-check", order: o2.id, pass: false, output: "1 failing" }); // the last one before hand-in failed
  const m2 = c2.mailbox.queue("toy-builder-1", "work")[0];
  c2.rooms.leave(c2.rooms.enter({ msg: m2.id, role: "toy-builder-1" }).run, { evidence: "e" });
  c2.engine.advance(o2.id, { stage: "test1", by: "code" });
  assert.equal(o2.stage, "check");
  assert.deepEqual(types(c2, "sample-run").at(-1).always, ["self-check-failed"]);
  // a failing self-check the worker then fixed does not force the review
  const c3 = fresh(flow({ sample: S }));
  const o3 = c3.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o3.task = "SF"; c3.engine.delegate(o3.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  c3.log.add({ type: "self-check", order: o3.id, pass: false, output: "red" });
  c3.log.add({ type: "self-check", order: o3.id, pass: true, output: "green" });
  c3.rooms.leave(c3.rooms.enter({ msg: c3.mailbox.queue("toy-builder-1", "work")[0].id, role: "toy-builder-1" }).run, { evidence: "e" });
  c3.engine.advance(o3.id, { stage: "test1", by: "code" });
  assert.equal(o3.stage, "uat", "red then green: sampled out as any order");
  // B7 review: a hand-in with no self-check at all is reviewed (it escaped the condition), and only the worker's own
  // check at a work stage, this loop, counts: another role's green check, or one from before a revise, does not
  const c4 = fresh(flow({ sample: S }));
  const o4 = toCheck(c4, "NONE");
  assert.equal(o4.stage, "check", "no self-check: always reviewed");
  assert.deepEqual(types(c4, "sample-run").at(-1).always, ["self-check-failed"]);
  const c5 = fresh(flow({ sample: S }));
  const o5 = c5.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o5.task = "OTHER"; c5.engine.delegate(o5.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  c5.log.add({ type: "self-check", order: o5.id, by: "toy-builder-1", stage: "build", pass: false, output: "red" });
  c5.log.add({ type: "self-check", order: o5.id, by: "mgr-live", stage: "build", pass: true, output: "green, not the worker's" });
  c5.log.add({ type: "self-check", order: o5.id, by: "toy-builder-1", stage: "uat", pass: true, output: "green, not at a work stage" });
  c5.rooms.leave(c5.rooms.enter({ msg: c5.mailbox.queue("toy-builder-1", "work")[0].id, role: "toy-builder-1" }).run, { evidence: "e" });
  c5.engine.advance(o5.id, { stage: "test1", by: "code" });
  assert.equal(o5.stage, "check", "the worker's own last check at build failed");
  // a green check from before a revise is not this loop's
  const S2 = { rate: 0, min: 0, max: 1, always: ["self-check-failed"] };
  const c6 = fresh(flow({ sample: S2 }));
  const o6 = c6.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o6.task = "LOOP"; c6.engine.delegate(o6.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  c6.log.add({ type: "self-check", order: o6.id, by: "toy-builder-1", stage: "build", pass: true, output: "green" });
  c6.rooms.leave(c6.rooms.enter({ msg: c6.mailbox.queue("toy-builder-1", "work")[0].id, role: "toy-builder-1" }).run, { evidence: "e" });
  c6.engine.advance(o6.id, { stage: "test1", by: "code" });
  assert.equal(o6.stage, "uat", "green this loop: sampled out");
  c6.engine.advance(o6.id, { stage: "uat", by: "mgr-live", verdict: "revise", evidence: "x", findings: "f" });
  c6.rooms.leave(c6.rooms.enter({ msg: c6.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o6.id).id, role: "toy-builder-1" }).run, { evidence: "e" });
  c6.engine.advance(o6.id, { stage: "test1", by: "code" });
  assert.equal(o6.stage, "check", "the revise's hand-in had no check of its own");
});

test("sample (B7 review): the draw is salted per company, and a stage's decision is kept, never recomputed", () => {
  // unsalted, every company's O-1 drew the same number at a stage; salted, two companies' O-1 differ
  const a = fresh(flow({ sample: { rate: 0.5, min: 0, max: 1 } })), b = fresh(flow({ sample: { rate: 0.5, min: 0, max: 1 } }));
  a.engine.sampleSalt = "salt-a"; b.engine.sampleSalt = "salt-b";
  const oa = { id: "O-1" };
  assert.notEqual(a.engine.sampleDraw(oa, "check"), b.engine.sampleDraw(oa, "check"));
  assert.equal(a.engine.sampleDraw(oa, "check"), unitHash("salt-a:O-1:check"));
  assert.equal(fresh(flow()).engine.sampleDraw(oa, "check"), unitHash("O-1:check"), "no salt (a bare engine): the old draw");
  // meta.mjs init sets a salt for every company, and it persists
  save(a); assert.equal(load().engine.sampleSalt, "salt-a"); fs.rmSync(path.join(LIVE, "state.json"));
  // the decision made when the stage was reached is the one that holds: a later rate change or self-check does not flip it
  const c = fresh(flow({ sample: { rate: 1, min: 0, max: 1, always: ["self-check-failed"] } }));
  c.engine.sampleSalt = "s";
  const o = c.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = "KEEP"; c.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  c.rooms.leave(c.rooms.enter({ msg: c.mailbox.queue("toy-builder-1", "work")[0].id, role: "toy-builder-1" }).run, { evidence: "e" });
  c.engine.advance(o.id, { stage: "test1", by: "code" });
  assert.equal(o.stage, "check");
  const before = c.engine.sampleDecision(o, c.engine.stageDef(o));
  c.engine.setSampleRate("task", "check", 0, { by: "learn" });
  c.log.add({ type: "self-check", order: o.id, by: "toy-builder-1", stage: "build", pass: true, output: "late green" });
  const after = c.engine.sampleDecision(o, c.engine.stageDef(o));
  assert.equal(after.run, true, "kept: the stage still runs");
  assert.deepEqual([after.rate, after.draw, after.kept], [before.rate, before.draw, true]);
  c.engine.notifyStage(o);
  assert.equal(o.stage, "check", "a re-notify (a resume at the stage) does not sample it out");
  assert.equal(types(c, "sample-run").length + types(c, "sample-skip").length, 1, "one sample event per stage and loop");
});

test("the rate is a knob inside the founder's bounds, and it persists in the state", () => {
  const co = fresh(flow({ sample: { rate: 1, min: 0.5, max: 1 } }));
  assert.throws(() => co.engine.setSampleRate("task", "check", 0.2, { by: "learn" }), /outside the founder's bounds \[0.5, 1\]/);
  assert.throws(() => co.engine.setSampleRate("task", "test1", 0.5, { by: "learn" }), /not a sampled stage/);
  co.engine.setSampleRate("task", "check", 0.5, { by: "learn", why: ["E-1"] });
  assert.deepEqual(types(co, "sample-rate").map((e) => [e.from, e.to, e.by]), [[1, 0.5, "learn"]]);
  save(co);
  const back = load();
  assert.equal(back.engine.sampleRates["task:check"], 0.5);
  const o = toCheck(back, "K");
  assert.equal(o.stage === "check", unitHash(`${o.id}:check`) < 0.5);
  fs.rmSync(path.join(LIVE, "state.json"));
});

test("batch: the first review waits for others (up to max) or for waitMin; one session takes the batch", () => {
  const co = fresh(flow({ batch: { max: 2, waitMin: 10 } }));
  const a = toCheck(co, "A");
  const forChecker = () => plan(co).filter((p) => p.role === "toy-checker");
  assert.deepEqual(forChecker(), [], "one waiting review is held for a partner");
  const wake = nextTimer(co);
  assert.ok(wake > 9 * 60000 && wake <= 10 * 60000 + 100, `wakes when the hold ends (${wake} ms)`);
  const b = toCheck(co, "B");
  const p = forChecker();
  assert.equal(p.length, 1);
  assert.equal(p[0].msgs.length, 2, "both orders in one session");
  assert.equal(p[0].cap, 2);
  assert.deepEqual(batchOf(co, co.mailbox.queue("pool:checker", "work")), { max: 2, waitMin: 10 });
  // a third order waits for the next batch: the session takes max, never more
  toCheck(co, "C");
  assert.equal(forChecker()[0].msgs.length, 2);
  // released by time: a lone review whose oldest item has waited waitMin
  const c2 = fresh(flow({ batch: { max: 3, waitMin: 10 } }));
  toCheck(c2, "D");
  for (const m of c2.mailbox.msgs.values()) m.ts -= 11;
  assert.equal(plan(c2).filter((x) => x.role === "toy-checker")[0].msgs.length, 1);
  assert.ok(a && b);
});
