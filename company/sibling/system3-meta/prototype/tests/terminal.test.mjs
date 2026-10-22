import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K8 + K9 (plan 2026-10-21 §3): terminal states and the loop cap. An order can be parked (stage parked, resumable at
// the stage it stopped) or cancelled (final); a dependency chain stays blocked; the tracker shows them as backlog +
// label parked, and cancelled. With a loop cap (spec maxLoops, or the lane policy's) the revise past it parks the
// order and asks the orderer (kind decision) with every finding, instead of looping (a HELD claim on a blocked host).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k8-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES } = await import("../state.mjs");
const { tick, settled } = await import("../supervisor.mjs");
const { builtinSpec, validateSpec } = await import("../generator.mjs");
const { proposePolicy, activatePolicy, policyProblems } = await import("../policy.mjs");
const T = await import("../tracker.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);

const FLOW = { stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "check", signer: "checker", evidence: ["review notes"] },
  { stage: "uat", signer: "orderer", evidence: ["acceptance"] },
  { stage: "release", signer: "founder", evidence: ["founder approval"] },
  { stage: "ship", signer: "release", evidence: ["publish"] },
] };
function fresh({ maxLoops = undefined } = {}) {
  const spec = { ...builtinSpec("toy"), ...(maxLoops !== undefined ? { maxLoops } : {}) };
  const co = make("k8", spec);
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", FLOW, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, { after = [], title = "" } = {}) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x", after, title });
  o.task = o.id;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}
function sign(co, o, to, role, opts = {}) {
  const m = co.mailbox.queue(to, "work").find((x) => x.ref === o.id);
  assert.ok(m, `a ${o.stage} item for ${o.id} in ${to}`);
  const { run } = co.rooms.enter({ msg: m.id, role });
  return co.rooms.leave(run, { evidence: "e", verdict: "pass", ...opts });
}
const loop = (co, o, n) => { sign(co, o, "toy-builder-1", "toy-builder-1"); sign(co, o, "pool:checker", "toy-checker", { verdict: "revise", findings: `F${n}: claim HELD (host blocked)` }); };
const asks = (co) => [...(co.data.tracker?.items?.values() ?? [])].filter((i) => i.kind === "ask");

test("K8 engine: park withdraws the order's work, a run from before is stale, resume re-queues the same stage afresh", () => {
  const co = fresh();
  const o = order(co);
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.engine.park(o.id, { by: "mgr-live", reason: "publish hold" });
  assert.equal(o.stage, "parked");
  assert.equal(o.parked.stage, "build");
  assert.equal(co.mailbox.msgs.get(m.id).state, "withdrawn");
  assert.equal(co.mailbox.queue("toy-builder-1", "work").length, 0);
  assert.throws(() => co.engine.advance(o.id, { stage: "build", by: "toy-builder-1", evidence: "e" }), /parked, not build/);
  assert.throws(() => co.engine.park(o.id, { by: "mgr-live", reason: "again" }), /only an open order is parked/);
  assert.throws(() => co.engine.resume(o.id, { by: "mgr-live" }), /says why/);
  co.engine.resume(o.id, { by: "mgr-live", reason: "hold lifted" });
  assert.equal(o.stage, "build");
  const m2 = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  assert.ok(m2 && m2.id !== m.id, "a fresh message, not the withdrawn one deduped");
  // the run entered before the park signs nothing, though the order is back at its stage and loop
  assert.equal(co.rooms.leave(run, { evidence: "e" }), null);
  assert.ok(co.log.of("stale-leave").some((e) => e.run === run));
  assert.equal(o.stage, "build");
  sign(co, o, "toy-builder-1", "toy-builder-1");
  assert.equal(o.stage, "check");
  assert.deepEqual(co.log.of("resumed").map((e) => e.to), ["build"]);
});

test("K8 engine: cancel is final, withdraws a founder approval, and the orders after it stay blocked", () => {
  const co = fresh();
  const a = order(co, { title: "first" });
  const b = order(co, { after: [a.id], title: "second" });
  assert.equal(b.blocked, true);
  sign(co, a, "toy-builder-1", "toy-builder-1"); sign(co, a, "pool:checker", "toy-checker");
  co.engine.advance(a.id, { stage: "uat", by: "mgr-live", evidence: "ok" });
  assert.equal(a.stage, "release");
  const ap = co.engine.queue("founder")[0];
  assert.ok(ap);
  co.engine.cancel(a.id, { by: "cos", reason: "Demo Crit: kill" });
  assert.equal(a.stage, "cancelled");
  assert.equal(co.engine.approvals.get(ap.id).state, "withdrawn");
  assert.equal(co.engine.queue("founder").length, 0);
  // a decision on the withdrawn approval is a repeat: it ships nothing
  co.engine.decide(ap.id, { by: "founder", decision: "approve", words: "approve deploy", channel: "chat" });
  assert.equal(a.stage, "cancelled");
  assert.equal(b.blocked, true, "the chain stays blocked");
  assert.deepEqual(co.log.of("blocked-by-cancelled")[0].after, [b.id]);
  assert.throws(() => co.engine.cancel(a.id, { by: "cos", reason: "x" }), /not cancelled/);
  assert.throws(() => co.engine.resume(a.id, { by: "cos", reason: "x" }), /not parked/);
  // a parked order can be cancelled too; the stage it stopped at is kept
  co.engine.park(b.id, { by: "cos", reason: "wait" });
  co.engine.cancel(b.id, { by: "cos", reason: "dependency killed" });
  assert.equal(b.cancelled.stage, "build");
});

test("K8 tracker + supervisor: parked is backlog + label parked, cancelled is cancelled; tick leaves them alone; cancelled is settled", () => {
  const co = fresh();
  const a = order(co), b = order(co);
  co.engine.park(a.id, { by: "mgr-live", reason: "fatal verdict" });
  co.engine.cancel(b.id, { by: "mgr-live", reason: "kill" });
  T.syncOrders(co);
  const items = [...co.data.tracker.items.values()].filter((i) => i.kind === "order");
  const ia = items.find((i) => i.order === a.id), ib = items.find((i) => i.order === b.id);
  assert.equal(ia.state, "backlog"); assert.ok(ia.labels.includes("parked"));
  assert.equal(ib.state, "cancelled");
  assert.deepEqual(tick(co).filter((s) => s.order === a.id || s.order === b.id), []);
  assert.equal(settled(co), false, "a parked order waits for its decision");
  co.engine.resume(a.id, { by: "mgr-live", reason: "go" });
  T.syncOrders(co);
  assert.equal(ia.state, "in-progress"); assert.equal(ia.labels.includes("parked"), false);
  co.engine.cancel(a.id, { by: "mgr-live", reason: "kill" });
  assert.equal(settled(co), true);
});

test("K9: uncapped by default (every spec before K9 keeps looping); spec maxLoops:true caps at 3", () => {
  const co = fresh();
  const o = order(co);
  for (let i = 1; i <= 5; i++) loop(co, o, i);
  assert.equal(o.stage, "build"); assert.equal(o.loops, 5);
  assert.equal(co.log.of("loop-cap").length, 0);
  const c3 = fresh({ maxLoops: true });
  const p = order(c3);
  for (let i = 1; i <= 3; i++) loop(c3, p, i);
  assert.equal(p.stage, "build", "three revises go back to build");
  loop(c3, p, 4);
  assert.equal(p.stage, "parked");
  assert.equal(p.parked.stage, "build");
});

test("K9: the revise past maxLoops parks the order and asks its orderer (decision) with every finding; resume grants one more loop", () => {
  const co = fresh({ maxLoops: 2 });
  const o = order(co, { title: "WGS 84 lesson" });
  loop(co, o, 1); loop(co, o, 2);
  assert.equal(o.stage, "build");
  loop(co, o, 3);
  assert.equal(o.stage, "parked");
  assert.equal(o.loops, 3);
  assert.equal(co.mailbox.queue("toy-builder-1", "work").filter((m) => m.ref === o.id).length, 0, "nothing queued for the parked stage");
  const ev = co.log.of("loop-cap")[0];
  assert.deepEqual([ev.loops, ev.maxLoops, ev.from], [3, 2, "check"]);
  const [ask] = asks(co);
  assert.ok(ask, "an ask was raised");
  assert.equal(ask.assignee, "cos", "to the orderer");
  assert.equal(ask.ask.kind, "decision");
  assert.equal(ask.ask.from, "mgr-live");
  assert.equal(ask.ask.order, o.id);
  for (const f of ["F1", "F2", "F3"]) assert.match(ask.body, new RegExp(f));
  assert.match(ask.body, /order resume O-1/);
  assert.equal(o.parked.ask, ask.id);
  // resume: one more loop by default, so the next revise parks again
  co.engine.resume(o.id, { by: "cos", reason: "the proxy now allows the host" });
  assert.equal(co.engine.maxLoopsOf(o), 3);
  assert.equal(o.stage, "build");
  loop(co, o, 4);
  assert.equal(o.stage, "parked");
  assert.equal(asks(co).length, 2);
  co.engine.resume(o.id, { by: "cos", reason: "two more", extraLoops: 2 });
  assert.equal(co.engine.maxLoopsOf(o), 5);
  loop(co, o, 5);
  assert.equal(o.stage, "build");
  sign(co, o, "toy-builder-1", "toy-builder-1"); sign(co, o, "pool:checker", "toy-checker");
  assert.equal(o.stage, "uat");
});

test("K9: the lane policy's maxLoops wins over the spec, is validated, and a shipped order's reopen past it parks", () => {
  assert.deepEqual(policyProblems({ maxLoops: 2 }), []);
  assert.ok(policyProblems({ maxLoops: 0 }).length);
  assert.ok(policyProblems({ maxLoops: 2.5 }).length);
  const co = fresh({ maxLoops: 5 });
  proposePolicy(co.engine, { lane: "s", by: "mgr-live", knobs: { maxLoops: 1 }, reason: "HELD claims", prediction: "no order loops twice" });
  activatePolicy(co.engine, { lane: "s", version: 1, by: "mgr-live" });
  const o = order(co);
  assert.equal(co.engine.maxLoopsOf(o), 1);
  loop(co, o, 1);
  assert.equal(o.stage, "build");
  sign(co, o, "toy-builder-1", "toy-builder-1"); sign(co, o, "pool:checker", "toy-checker");
  co.engine.advance(o.id, { stage: "uat", by: "mgr-live", evidence: "ok" });
  co.engine.decide(co.engine.queue("founder")[0].id, { by: "founder", decision: "approve", words: "approve deploy", channel: "chat" });
  sign(co, o, "pool:release", "toy-release");
  assert.equal(o.stage, "done");
  co.engine.reopen(o.id, { by: "code", reason: "regression", findings: "regression: acceptance fails" });
  assert.equal(o.stage, "parked");
  assert.match(asks(co)[0].body, /regression: acceptance fails/);
});

test("K9: an orderer higher than the manager's own report gets the ask escalated to it; validateSpec checks maxLoops", () => {
  const co = fresh({ maxLoops: 1 });
  const o = co.engine.orderNew({ flow: "task", by: "founder", to: "mgr-live", budget: 100, accept: "x" });
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  loop(co, o, 1); loop(co, o, 2);
  assert.equal(o.stage, "parked");
  const [ask] = asks(co);
  assert.equal(ask.assignee, "founder");
  assert.ok(ask.labels.includes("escalated"));
  const s = builtinSpec("toy");
  assert.deepEqual(validateSpec({ ...s, maxLoops: 3 }), []);
  assert.deepEqual(validateSpec({ ...s, maxLoops: true }), []);
  assert.ok(validateSpec({ ...s, maxLoops: 0 }).some((v) => /maxLoops/.test(v)));
  assert.ok(validateSpec({ ...s, maxLoops: "3" }).some((v) => /maxLoops/.test(v)));
});

const cli = (dir, ...args) => {
  const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
};

test("K8+K9 CLI: a loop-cap park, its ask, order resume by the orderer answers it; order park/cancel by an owner only", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k8-cli-"));
  const spec = { ...builtinSpec("toy"), maxLoops: 1, flow: { name: "task", stages: FLOW.stages } };
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec));
  assert.equal(cli(dir, "init", `--spec-file=${f}`).code, 0);
  assert.equal(cli(dir, "order", "new", "--to=mgr-live", "--title=lesson", "--task=L1", "--accept=x").code, 0);
  assert.equal(cli(dir, "order", "delegate", "O-1", "--by=mgr-live", "--to=toy-builder-1").code, 0);
  const work = (role, pool, extra = []) => {
    const q = cli(dir, "queue", pool).out;
    const e = cli(dir, "room", "enter", `--msg=${q[0].msg}`, `--role=${role}`);
    assert.equal(e.code, 0, e.err);
    const l = cli(dir, "room", "leave", `--run=${e.out.run}`, "--evidence=e", ...extra);
    assert.equal(l.code, 0, l.err);
    return l.out;
  };
  for (let i = 1; i <= 2; i++) { work("toy-builder-1", "toy-builder-1"); work("toy-checker", "pool:checker", ["--verdict=revise", `--findings=F${i} HELD`]); }
  const show = cli(dir, "flow", "show", "O-1").out;
  assert.equal(show.stage, "parked");
  const sum = cli(dir, "ask", "summary").out;
  assert.equal(sum.open.length, 1);
  assert.equal(sum.open[0].to, "cos");
  const item = cli(dir, "item", "show", `--id=${sum.open[0].id}`).out;
  assert.match(item.body, /F1 HELD/); assert.match(item.body, /F2 HELD/);
  // only its orderer, its manager or the founder may decide it
  const no = cli(dir, "order", "resume", "O-1", "--by=toy-builder-1", "--reason=me");
  assert.equal(no.code, 1); assert.match(no.err, /may not resume/);
  const r = cli(dir, "order", "resume", "O-1", "--by=cos", "--reason=host allowed now", "--extra-loops=2");
  assert.equal(r.code, 0, r.err);
  assert.equal(r.out.stage, "build"); assert.equal(r.out.maxLoops, 3); assert.equal(r.out.ask_closed, sum.open[0].id);
  assert.equal(cli(dir, "ask", "summary").out.open.length, 0);
  assert.equal(cli(dir, "queue", "toy-builder-1").out.length, 1);
  // a manual park abandons the run on it and withdraws its message; cancel is final
  const q = cli(dir, "queue", "toy-builder-1").out;
  const e = cli(dir, "room", "enter", `--msg=${q[0].msg}`, "--role=toy-builder-1");
  const p = cli(dir, "order", "park", "O-1", "--by=mgr-live", "--reason=publish hold");
  assert.equal(p.code, 0, p.err); assert.equal(p.out.stage, "parked"); assert.equal(p.out.parked_from, "build");
  assert.notEqual(cli(dir, "room", "leave", `--run=${e.out.run}`, "--evidence=e").code, 0, "the abandoned run cannot leave");
  assert.equal(cli(dir, "queue", "toy-builder-1").out.length, 0);
  const c = cli(dir, "order", "cancel", "O-1", "--by=founder", "--reason=kill");
  assert.equal(c.code, 0, c.err); assert.equal(c.out.stage, "cancelled");
  assert.equal(cli(dir, "order", "resume", "O-1", "--by=cos", "--reason=x").code, 1);
  const board = cli(dir, "board").out;
  assert.equal(board.cancelled.filter((i) => i.kind === "order").length, 1);
  const ev = cli(dir, "events").out.map((x) => x.type);
  for (const t of ["loop-cap", "parked", "park-ask", "resumed", "abandon", "withdraw", "cancelled"]) assert.ok(ev.includes(t), t);
});
