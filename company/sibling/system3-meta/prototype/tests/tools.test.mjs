import { test } from "node:test";
import assert from "node:assert/strict";
import { flowProblems, Mailbox, DEFAULT_CONFIG } from "../lib.mjs";
import { build, ITEM_FLOW } from "../toy.mjs";

const OFF = { enforce: false, autoBookkeeping: false, supervisor: false, asyncApprovals: false, leases: false, dedupe: false };

function orderToBuilder(co, builder = "b-w1") {
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 200_000, accept: "works" });
  co.engine.delegate(o.id, { by: "mgr-w", to: builder, budget: 200_000 });
  return o;
}
const workMsg = (co, to) => co.mailbox.queue(to, "work")[0];

test("S0: a flow definition that breaks an invariant is refused", () => {
  assert.deepEqual(flowProblems(ITEM_FLOW), []);
  const bad = { stages: ITEM_FLOW.stages.map((s) => (s.stage === "check" ? { ...s, signer: "builder" } : s.stage === "test1" ? { ...s, signer: "checker" } : s)) };
  const p = flowProblems(bad);
  assert.ok(p.includes("check must be signed independently of build"));
  assert.ok(p.includes("test1 must be signed by code"));
  const co = build();
  assert.throws(() => co.engine.define("bad", bad, { by: "cos" }), /HARD: flow bad/);
  assert.throws(() => co.engine.approveDef("item@v1", { by: "cos", words: "ok" }), /not proposed|founder/);
});

test("S1-S3: an order goes down the chain and up through every stage to shipped", () => {
  const co = build();
  const o = orderToBuilder(co);
  const { run } = co.rooms.enter({ msg: workMsg(co, "b-w1").id, role: "b-w1" });
  co.rooms.leave(run, { evidence: "artifact", tokens: 100 });
  assert.equal(o.stage, "test1");
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  const r2 = co.rooms.enter({ msg: workMsg(co, "pool:checker").id, role: "chk-1" }).run;
  co.rooms.leave(r2, { evidence: "review", tokens: 50 });
  const r3 = co.rooms.enter({ msg: workMsg(co, "mgr-w").id, role: "mgr-w" }).run;
  co.rooms.leave(r3, { evidence: "accepted", tokens: 10 });
  assert.equal(o.stage, "release");
  const [a] = co.engine.queue("founder");
  co.engine.decide(a.id, { by: "founder", decision: "approve", words: "Approve deploy", channel: "chat" });
  assert.equal(o.stage, "ship");
  const r4 = co.rooms.enter({ msg: workMsg(co, "pool:release").id, role: "rel-1" }).run;
  co.rooms.leave(r4, { evidence: "receipt", tokens: 5 });
  assert.equal(o.stage, "done");
  assert.equal(co.log.of("shipped").length, 1);
  assert.equal(co.log.of("usage").reduce((s, e) => s + e.tokens, 0), 165, "every run's usage recorded once");
  assert.equal(co.rooms.memory.get("b-w1")[0].did, `build on ${o.id}: pass (loop 0)`, "did-line generated");
});

test("S4: refusals: self-check, wrong lane, over limit, release by non-founder, no role", () => {
  const co = build();
  const o = orderToBuilder(co);
  const { run } = co.rooms.enter({ msg: workMsg(co, "b-w1").id, role: "b-w1" });
  co.rooms.leave(run, { evidence: "artifact" });
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  assert.throws(() => co.engine.advance(o.id, { stage: "check", by: "b-w1", evidence: "x" }), /signer|independence/);
  const o2 = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  assert.throws(() => co.engine.delegate(o2.id, { by: "mgr-w", to: "b-g1", budget: 100 }), /lane/);
  assert.throws(() => co.engine.delegate(o2.id, { by: "mgr-w", to: "b-w2", budget: 300_000 }), /limit/);
  assert.throws(() => co.engine.delegate(o2.id, { by: "mgr-w", to: "b-x9", budget: 100 }), /no-role/);
  assert.throws(() => co.engine.advance(o.id, { stage: "release", by: "cos", evidence: "x" }), /is at check/);
  assert.ok(co.log.of("refuse").length >= 4);
});

test("S4 with enforce off: the same illegal self-check goes through and is counted as a violation", () => {
  const co = build({ ...OFF });
  const o = orderToBuilder(co);
  const m = workMsg(co, "b-w1");
  const { run } = co.rooms.enter({ msg: m.id, role: "b-w1" });
  co.rooms.leave(run, { evidence: "artifact" });
  co.engine.advance(o.id, { stage: "test1", by: "code" });
  co.engine.advance(o.id, { stage: "check", by: "b-w1", evidence: "x" });
  assert.equal(o.stage, "uat");
  assert.ok(co.log.of("violation").some((e) => e.rule === "independence"));
});

test("S5: a crashed run is recovered at lease expiry; a duplicate enter is refused while the lease is held", () => {
  const co = build();
  orderToBuilder(co);
  const m = workMsg(co, "b-w1");
  const { run } = co.rooms.enter({ msg: m.id, role: "b-w1", leaseMin: 30 });
  assert.throws(() => co.rooms.enter({ msg: m.id, role: "b-w1" }), /held by run/);
  co.clock.t += 31;
  const lost = co.rooms.recover();
  assert.equal(lost[0].run, run);
  assert.equal(co.log.of("left-without-leave").length, 1);
  const again = co.rooms.enter({ msg: m.id, role: "b-w1" });
  assert.notEqual(again.run, run);
});

test("S9: duplicate notification is deduped by key; without dedupe it makes a second work message", () => {
  const co = build();
  const o = orderToBuilder(co);
  co.engine.notifyStage(o, { duplicate: true });
  assert.equal(co.mailbox.queue("b-w1", "work").length, 1);
  const off = build({ ...DEFAULT_CONFIG, dedupe: false });
  const o2 = orderToBuilder(off);
  off.engine.notifyStage(o2, { duplicate: true });
  assert.equal(off.mailbox.queue("b-w1", "work").length, 2);
});

test("S9: founder words must cover the action; a timeout never approves; decide twice fires once", () => {
  const co = build();
  const o = orderToBuilder(co);
  for (const [stage, by] of [["build", "b-w1"], ["test1", "code"], ["check", "chk-1"], ["uat", "mgr-w"]]) co.engine.advance(o.id, { stage, by, evidence: "e" });
  const [a] = co.engine.queue("founder");
  co.clock.t += 25 * 60;
  co.engine.tick();
  assert.equal(a.state, "open");
  assert.equal(co.log.of("timeout").length, 1);
  assert.throws(() => co.engine.decide(a.id, { by: "founder", decision: "approve", words: "looks nice", channel: "chat" }), /do not cover/);
  assert.throws(() => co.engine.decide(a.id, { by: "cos", decision: "approve", words: "Approve deploy", channel: "chat" }), /not the approver/);
  co.engine.decide(a.id, { by: "founder", decision: "approve", words: "Approve deploy", channel: "chat" });
  co.engine.decide(a.id, { by: "founder", decision: "approve", words: "Approve deploy", channel: "chat" });
  assert.equal(co.log.of("callback").length, 1);
  assert.equal(o.stage, "ship");
});

test("S13: org propose validates; approval through the founder queue onboards; gaps see a refused missing role", () => {
  const co = build();
  assert.throws(() => co.org.propose({ op: "add", role: { id: "chk-2", level: "checker", reportsTo: "cos", room: "attic" }, by: "cos" }), /room attic/);
  assert.throws(() => co.org.propose({ op: "add", role: { id: "chk-2", level: "checker", reportsTo: "cos", room: "quality", skills: ["juggling"] }, by: "cos" }), /unknown skill/);
  const id = co.org.propose({ op: "add", role: { id: "chk-2", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["check"] }, by: "cos", reason: "checker queue" });
  const a = co.engine.request({ approver: "founder", kind: "org-change", ref: id, dueMin: 60, key: `${id}:approve` });
  assert.equal(co.org.role("chk-2"), undefined);
  co.engine.decide(a.id, { by: "founder", decision: "approve", words: "Add the second checker", channel: "chat" });
  assert.equal(co.org.role("chk-2").level, "checker");
  assert.equal(co.log.of("onboard").length, 1);
  const o2 = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  assert.throws(() => co.engine.delegate(o2.id, { by: "mgr-w", to: "designer", budget: 100 }), /no-role/);
  assert.equal(co.org.gaps(co.log.events).missing, 1);
});

test("S14: a consult run can read the role's context but cannot sign", () => {
  const co = build();
  orderToBuilder(co);
  const m = workMsg(co, "b-w1");
  const { run, ctx } = co.rooms.enter({ msg: m.id, role: "cos", as: "b-w1", mode: "consult" });
  assert.equal(ctx.roleDoc, "company/roles/b-w1.md");
  assert.throws(() => co.rooms.leave(run, { evidence: "artifact" }), /consult/);
});

test("S10: a ritual closes with absentees named; an action needs owner and due", () => {
  const co = build();
  co.rituals.register({ id: "wbr", everyMin: 60, chair: "cos", invite: (r) => r.rituals.some((x) => x.startsWith("wbr")) });
  co.clock.t = 60;
  assert.deepEqual(co.rituals.due(), ["wbr"]);
  const rid = co.rituals.open("wbr", { agenda: ["metrics"] });
  co.rituals.position(rid, { by: "mgr-w", position: "fine" });
  assert.throws(() => co.rituals.position(rid, { by: "chk-1", position: "x", action: { owner: "cos" } }), /owner and a due/);
  const r = co.rituals.close(rid, { by: "cos" });
  assert.ok(r.absent.includes("chk-1") && r.absent.includes("mgr-g"));
  assert.deepEqual(co.rituals.due(), []);
});

test("S12: the mailbox survives a restart (toJSON → fromJSON) with keys and leases", () => {
  const co = build();
  orderToBuilder(co);
  const m = workMsg(co, "b-w1");
  co.rooms.enter({ msg: m.id, role: "b-w1" });
  const mb2 = Mailbox.fromJSON(JSON.parse(JSON.stringify(co.mailbox.toJSON())), co);
  assert.throws(() => mb2.claim(m.id, { run: "R-x" }), /held by run/);
  assert.equal(mb2.send({ from: "a", to: "b", kind: "work", key: m.key }).id, m.id);
});

test("a late duplicate of a finished stage is a stale run: its leave signs nothing (found by the simulator)", () => {
  const co = build({ ...DEFAULT_CONFIG, dedupe: false });
  const o = orderToBuilder(co);
  co.engine.notifyStage(o, { duplicate: true });
  const [m1, m2] = co.mailbox.queue("b-w1", "work");
  const r1 = co.rooms.enter({ msg: m1.id, role: "b-w1" }).run;
  co.rooms.leave(r1, { evidence: "artifact" });
  assert.equal(o.stage, "test1");
  const r2 = co.rooms.enter({ msg: m2.id, role: "b-w1" }).run;
  assert.equal(co.rooms.leave(r2, { evidence: "artifact" }), null);
  assert.equal(o.stage, "test1");
  assert.equal(co.log.of("stale-leave").length, 1);
});

test("--as without consult mode is refused (found in live run 1); abandon releases a bad run without signing", () => {
  const co = build();
  const o = orderToBuilder(co);
  for (const [stage, by] of [["build", "b-w1"], ["test1", "code"]]) co.engine.advance(o.id, { stage, by, evidence: "e" });
  const m = workMsg(co, "pool:checker");
  assert.throws(() => co.rooms.enter({ msg: m.id, role: "b-w2", as: "chk-1" }), /needs --mode=consult/);
  const { run } = co.rooms.enter({ msg: m.id, role: "chk-1" });
  co.rooms.abandon(run, { by: "cos", reason: "test" });
  assert.equal(o.stage, "check");
  assert.ok(co.rooms.enter({ msg: m.id, role: "chk-1" }).run);
});
