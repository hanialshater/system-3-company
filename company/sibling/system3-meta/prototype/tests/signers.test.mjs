import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K3+K4 (plan 2026-10-21 §3): role-specific signers ({role:"<id>"}, routed to role:<id>, mayAssign exact) and
// independence on every reviewing stage (`independent`, default true for checker/evaluator/role signers).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k3-"));
process.env.META_LIVE_DIR = LIVE;
const { make } = await import("../state.mjs");
const { flowProblems, isIndependent } = await import("../lib.mjs");
const { plan, briefFor } = await import("../supervisor.mjs");
const { validateSpec, orgDoc } = await import("../generator.mjs");
const { build } = await import("../toy.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);

// the lesson flow's shape: check by fact-checker, learner by learner-evaluator, launch by head-of-product (a manager)
const SPEC = () => ({
  name: "lessons-k3", title: "K3",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "s" }, { id: "review", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
  skills: ["manage", "build", "verify", "learn", "release"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "cos", lane: "s", room: "studio", floor: 2, skills: ["manage"] },
    { id: "hop", level: "manager", reportsTo: "cos", room: "ceo-office", floor: 1, skills: ["manage"] },
    { id: "demo-builder", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"] },
    { id: "fact-checker", level: "checker", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["verify"] },
    { id: "copy-checker", level: "checker", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["verify"] },
    { id: "learner-evaluator", level: "evaluator", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["learn"] },
    { id: "other-evaluator", level: "evaluator", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["learn"] },
    { id: "release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
  ],
  flow: { name: "lesson", stages: [
    { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"] },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "check", signer: { role: "fact-checker" }, evidence: ["fact-check record"] },
    { stage: "learner", signer: { role: "learner-evaluator" }, evidence: ["learner review"] },
    { stage: "launch", signer: { role: "hop" }, evidence: ["launch review record"] },
    { stage: "ship", signer: "release", evidence: ["publish"] },
  ] },
});

function company(spec = SPEC()) {
  const co = make(spec.name, spec);
  co.org.genesis(spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define(spec.flow.name, spec.flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, builder = "demo-builder") {
  const o = co.engine.orderNew({ flow: "lesson", by: "cos", to: "lead", budget: 100, accept: "x" });
  co.engine.delegate(o.id, { by: "lead", to: builder, budget: 100 });
  return o;
}
const msgFor = (co, o, to) => co.mailbox.queue(to, "work").find((m) => m.ref === o.id);
function sign(co, o, to, role) {
  const { run } = co.rooms.enter({ msg: msgFor(co, o, to).id, role });
  co.rooms.leave(run, { evidence: "e" });
}
function toCheck(co, o) { sign(co, o, o.builder, o.builder); co.engine.advance(o.id, { stage: "test1", by: "code" }); }

test("K3: the spec validates; a role signer names an existing, active agent role, never a builder on an independent stage", () => {
  assert.deepEqual(validateSpec(SPEC()), []);
  const bad = SPEC();
  bad.roles.find((r) => r.id === "copy-checker").active = false;
  bad.flow.stages[2].signer = { role: "ghost" };
  bad.flow.stages[3].signer = { role: "copy-checker" };
  bad.flow.stages[4].signer = { role: "founder" };
  bad.flow.stages.splice(5, 0, { stage: "peer", signer: { role: "demo-builder" }, evidence: ["peer notes"] }, { stage: "self", signer: "builder", independent: true, evidence: ["x"] }, { stage: "odd", signer: { role: "hop", lane: "s" }, independent: "yes", evidence: ["x"] });
  const v = validateSpec(bad).join("\n");
  assert.match(v, /check: signer role ghost exists and is active/);
  assert.match(v, /learner: signer role copy-checker exists and is active/);
  assert.match(v, /launch: signer role founder is an agent/);
  assert.match(v, /peer: signer role demo-builder is a builder and cannot sign an independent stage/);
  assert.match(v, /self: an independent stage cannot be signed by the builder/);
  assert.match(v, /odd: a role signer is \{role:"<id>"\}/);
  assert.match(v, /odd: independent is true or false/);
  // a builder role may sign a stage that says it is not independent
  const peer = SPEC(); peer.flow.stages.splice(5, 0, { stage: "peer", signer: { role: "demo-builder" }, independent: false, evidence: ["peer notes"] });
  assert.deepEqual(validateSpec(peer), []);
  // the same checks in the engine's flow invariants (whoever writes the flow)
  assert.deepEqual(flowProblems(SPEC().flow), []);
  const p = flowProblems({ stages: [...SPEC().flow.stages.slice(0, 5), { stage: "self", signer: "builder", independent: true, evidence: ["x"] }, { stage: "odd", signer: { role: 3 }, independent: 1, evidence: ["x"] }, SPEC().flow.stages[5]] });
  assert.ok(p.includes("self: an independent stage cannot be signed by the builder"));
  assert.ok(p.includes('odd: a role signer is {role:"<id>"}') && p.includes("odd: independent is true or false"));
  // an evaluator signer needs an evaluator; ORG.md names the role and the independence
  const ev = SPEC(); ev.flow.stages[3].signer = "evaluator"; ev.roles = ev.roles.filter((r) => r.level !== "evaluator");
  assert.match(validateSpec(ev).join(), /an evaluator exists to sign its stage/);
  assert.match(orgDoc(SPEC(), "lessons-k3"), /\*\*learner\*\*, signed by the role learner-evaluator \(independent: never the builder\)/);
});

test("K3: every company spec file still validates", () => {
  for (const f of ["toy.json", "storybook.json", "research.json", "sheetco.json", "sheetco-r.json"]) { // meta.json is the meta-org, not a delivery company
    const s = JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", f), "utf8"));
    if (s.flow) assert.deepEqual(validateSpec(s), [], f);
  }
});

test("K4: independence defaults: check always, checker/evaluator/role signers unless they say false; builder, code, orderer not", () => {
  assert.equal(isIndependent({ stage: "check", signer: "release", independent: false }), true, "check is always independent (S8)");
  assert.equal(isIndependent({ stage: "x", signer: "checker" }), true);
  assert.equal(isIndependent({ stage: "x", signer: "evaluator" }), true);
  assert.equal(isIndependent({ stage: "x", signer: { role: "hop" } }), true);
  assert.equal(isIndependent({ stage: "x", signer: { role: "hop" }, independent: false }), false);
  assert.equal(isIndependent({ stage: "x", signer: "orderer" }), false);
  assert.equal(isIndependent({ stage: "x", signer: "orderer", independent: true }), true);
  assert.equal(isIndependent({ stage: "x", signer: "code" }), false);
});

test("K3: a role signer's stage goes to role:<id>; only that role enters and signs it, never another of its level", () => {
  const co = company();
  const o = order(co);
  toCheck(co, o);
  assert.equal(o.stage, "check");
  assert.ok(msgFor(co, o, "role:fact-checker"), "routed to role:fact-checker");
  assert.equal(co.mailbox.queue("pool:checker", "work").length, 0, "not to the checker pool");
  const m = msgFor(co, o, "role:fact-checker");
  assert.throws(() => co.rooms.enter({ msg: m.id, role: "copy-checker" }), /copy-checker may not take/);
  assert.throws(() => co.engine.advance(o.id, { stage: "check", by: "copy-checker", evidence: "x" }), /may not sign check/);
  assert.deepEqual(co.rooms.eligible("copy-checker").map((x) => x.id), []);
  assert.deepEqual(co.rooms.eligible("fact-checker").map((x) => x.id), [m.id]);
  assert.equal(co.engine.mayAssign(o, "check", "fact-checker"), true);
  assert.equal(co.engine.mayAssign(o, "check", "copy-checker"), false);
  sign(co, o, "role:fact-checker", "fact-checker");
  assert.equal(o.stage, "learner");
  assert.throws(() => co.rooms.enter({ msg: msgFor(co, o, "role:learner-evaluator").id, role: "other-evaluator" }), /may not take/);
  sign(co, o, "role:learner-evaluator", "learner-evaluator");
  assert.equal(o.stage, "launch");
  // a manager-level role signs its own stage (stage 7: head-of-product)
  assert.throws(() => co.engine.advance(o.id, { stage: "launch", by: "lead", evidence: "x" }), /may not sign launch/);
  sign(co, o, "role:hop", "hop");
  assert.equal(o.stage, "ship");
  sign(co, o, "pool:release", "release");
  assert.equal(o.stage, "done");
  assert.deepEqual(o.signers, { check: "fact-checker", learner: "learner-evaluator", launch: "hop" }, "who signed each independent stage");
  assert.equal(o.checker, "fact-checker", "o.checker kept for check");
  // a retired role signs nothing
  co.org.roles.get("hop").active = false;
  const o2 = order(co);
  assert.equal(co.engine.mayAssign(o2, "launch", "hop"), false);
});

test("K4: the builder never enters or signs an independent stage, whatever it is named", () => {
  // a role signer that happens to be the order's builder (flowProblems allows it; validateSpec refuses it in a spec)
  const spec = SPEC();
  spec.roles.push({ id: "demo-builder-2", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"] });
  spec.flow.stages.splice(3, 0, { stage: "peer", signer: { role: "demo-builder-2" }, evidence: ["peer notes"] });
  const co = company(spec);
  const own = order(co, "demo-builder-2");
  toCheck(co, own);
  sign(co, own, "role:fact-checker", "fact-checker");
  assert.equal(own.stage, "peer");
  const m = msgFor(co, own, "role:demo-builder-2");
  assert.throws(() => co.rooms.enter({ msg: m.id, role: "demo-builder-2" }), /independence: demo-builder-2 built/);
  assert.throws(() => co.engine.advance(own.id, { stage: "peer", by: "demo-builder-2", evidence: "x" }), /built O-1 and cannot sign peer/);
  assert.deepEqual(co.rooms.eligible("demo-builder-2").map((x) => x.id), [], "its own build's review is not eligible");
  assert.ok(co.log.events.some((e) => e.type === "refuse" && e.rule === "independence"));
  // another builder's order: the same role signs the peer stage
  const other = order(co, "demo-builder");
  toCheck(co, other);
  sign(co, other, "role:fact-checker", "fact-checker");
  sign(co, other, "role:demo-builder-2", "demo-builder-2");
  assert.equal(other.stage, "learner");
  assert.equal(other.signers.peer, "demo-builder-2");
  // an orderer-signed stage marked independent: a manager that delegated to itself cannot sign it
  const s2 = SPEC();
  s2.flow.stages.splice(5, 0, { stage: "uat", signer: "orderer", independent: true, evidence: ["acceptance"] });
  const c2 = company(s2);
  const o3 = c2.engine.orderNew({ flow: "lesson", by: "cos", to: "lead", budget: 100, accept: "x" });
  c2.engine.delegate(o3.id, { by: "lead", to: "lead", budget: 100 }); // delegate checks the lane only
  o3.stage = "uat"; c2.engine.notifyStage(o3);
  assert.throws(() => c2.engine.advance(o3.id, { stage: "uat", by: "lead", evidence: "x" }), /lead built O-1 and cannot sign uat/);
});

test("K4 with enforce off: a builder signing an independent non-check stage is counted as a violation", () => {
  const co = build({ enforce: false, autoBookkeeping: false, supervisor: false, asyncApprovals: false, leases: false, dedupe: false });
  const flow = { stages: [
    { stage: "build", signer: "builder", evidence: ["artifact"] },
    { stage: "check", signer: "checker", evidence: ["review"] },
    { stage: "learner", signer: { role: "b-w1" }, evidence: ["learner review"] },
    { stage: "ship", signer: "release", evidence: ["receipt"] },
  ] };
  co.engine.approveDef(co.engine.define("rev", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = co.engine.orderNew({ flow: "rev", by: "cos", to: "mgr-w", budget: 100, accept: "x" });
  co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
  co.engine.advance(o.id, { stage: "build", by: "b-w1", evidence: "a" });
  co.engine.advance(o.id, { stage: "check", by: "chk-1", evidence: "r" });
  co.engine.advance(o.id, { stage: "learner", by: "b-w1", evidence: "x" });
  assert.equal(o.stage, "ship");
  assert.ok(co.log.of("violation").some((e) => e.rule === "independence" && e.order === o.id));
});

test("K3/K4: the supervisor plans role:<id> items for that role (any level), and a review for no one who built it", () => {
  const co = company();
  const o = order(co);
  toCheck(co, o);
  let p = plan(co);
  assert.deepEqual(p.filter((x) => x.msgs.length).map((x) => [x.role, x.msgs]), [["fact-checker", [msgFor(co, o, "role:fact-checker").id]]]);
  sign(co, o, "role:fact-checker", "fact-checker");
  p = plan(co);
  const le = p.find((x) => x.role === "learner-evaluator");
  assert.ok(le && !p.some((x) => x.role === "other-evaluator"));
  assert.match(briefFor(co, le), /Check the work against its accept criteria/, "an independent stage's role gets the reviewer's brief");
  sign(co, o, "role:learner-evaluator", "learner-evaluator");
  p = plan(co);
  assert.ok(p.some((x) => x.role === "hop" && x.msgs.includes(msgFor(co, o, "role:hop").id)), "a manager-level role signer is planned");
  // the checker pool is still planned once, for the first checker, with its own role:<id> items
  const t = make("toy");
  t.org.genesis(t.spec.roles.map((r) => ({ ...r })));
  assert.ok(Array.isArray(plan(t)));
});

test("K3/K4 through the CLI: init from a spec file, role:<id> queue, a wrong role refused, signers saved in the state", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k3-cli-"));
  const file = path.join(dir, "spec.json");
  const spec = SPEC();
  spec.flow.stages.splice(1, 1); // no test1: the CLI walk needs no supervisor
  fs.writeFileSync(file, JSON.stringify(spec));
  const cli = (...args) => { const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT; const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); let out = null; try { out = JSON.parse(r.stdout); } catch {} return { code: r.status, out, err: r.stderr + r.stdout }; };
  assert.equal(cli("init", `--spec-file=${file}`).code, 0);
  const o = cli("order", "new", "--by=cos", "--to=lead", "--title=x", "--task=L1", "--accept=a lesson");
  assert.equal(o.code, 0, o.err);
  const O = o.out.order;
  assert.equal(cli("order", "delegate", O, "--by=lead", "--to=demo-builder", "--budget=100").code, 0);
  const enter = (msg, role) => cli("room", "enter", `--msg=${msg}`, `--role=${role}`);
  const walk = (queue, role) => {
    const q = cli("queue", queue);
    assert.equal(q.code, 0, q.err);
    const m = q.out.find((x) => x.order === O);
    assert.ok(m, `${queue} holds ${O}`);
    const e = enter(m.msg, role);
    assert.equal(e.code, 0, e.err);
    assert.equal(cli("room", "leave", `--run=${e.out.run}`, "--evidence=e").code, 0);
    return m.msg;
  };
  walk("demo-builder", "demo-builder");
  const q = cli("queue", "role:fact-checker");
  assert.equal(q.out.length, 1);
  const wrong = enter(q.out[0].msg, "copy-checker");
  assert.notEqual(wrong.code, 0);
  assert.match(wrong.err, /copy-checker may not take/);
  walk("role:fact-checker", "fact-checker");
  walk("role:learner-evaluator", "learner-evaluator");
  walk("role:hop", "hop");
  const st = JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
  const saved = st.engine.orders.__map.find(([id]) => id === O)[1];
  assert.equal(saved.stage, "ship");
  assert.deepEqual(saved.signers, { check: "fact-checker", learner: "learner-evaluator", launch: "hop" });
  assert.match(fs.readFileSync(path.join(dir, "ORG.md"), "utf8"), /signed by the role fact-checker/);
});
