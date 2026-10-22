import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K11 (plan 2026-10-21 §3): routed revise. advance(..., verdict:"revise", to:"<earlier stage>") sends the work back to
// that stage, not to build; the K1 cmd `route` map feeds it (stage 9: "claims not verified" goes back to check).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k11-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES } = await import("../state.mjs");
const { tick } = await import("../supervisor.mjs");
const { builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const BIN = path.join(LIVE, "bin");
fs.mkdirSync(BIN, { recursive: true });
// the ship gate prints the company publish reason lines the plan routes by (§2)
fs.writeFileSync(path.join(BIN, "gates.mjs"), `import fs from "node:fs";
const r = fs.existsSync("reason") ? fs.readFileSync("reason", "utf8") : "";
if (r) { console.log("refused:\\n  - " + r); process.exit(1); }
console.log("ready");
`);
const GATES = { argv: ["node", path.join(BIN, "gates.mjs")], route: { "claims not verified": "check", "learner review": "learner" } };
const FLOW = { stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "check", signer: "checker", evidence: ["fact-check record"] },
  { stage: "learner", signer: "checker", independent: true, evidence: ["learner review"] },
  { stage: "gates", signer: "code", evidence: [], run: GATES },
  { stage: "uat", signer: "orderer", evidence: ["acceptance"] },
  { stage: "ship", signer: "release", evidence: ["publish"] },
] };

function fresh(flow = FLOW) {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true });
  return o;
}
const reason = (task, text) => { const f = path.join(LIVE, "work", task, "reason"); if (text) fs.writeFileSync(f, text); else fs.rmSync(f, { force: true }); };
function sign(co, o, to, role, opts = {}) {
  const m = co.mailbox.queue(to, "work").find((x) => x.ref === o.id);
  assert.ok(m, `a ${o.stage} item for ${o.id} in ${to}`);
  const { run } = co.rooms.enter({ msg: m.id, role });
  return co.rooms.leave(run, { evidence: "e", verdict: "pass", ...opts });
}
const toLearner = (co, o) => { sign(co, o, "toy-builder-1", "toy-builder-1"); sign(co, o, "pool:checker", "toy-checker"); };

test("engine: a routed revise goes to the named earlier stage, keeps findings, counts a loop and queues that stage's signer", () => {
  const co = fresh();
  const a = order(co, "R1");
  toLearner(co, a);
  assert.equal(a.stage, "learner");
  sign(co, a, "pool:checker", "toy-checker", { verdict: "revise", findings: "card 3 cites no source", to: "check" });
  assert.deepEqual([a.stage, a.loops, a.findings], ["check", 1, "card 3 cites no source"]);
  const h = a.history.at(-1);
  assert.deepEqual([h.stage, h.verdict, h.to, h.findings], ["learner", "revise", "check", "card 3 cites no source"]);
  assert.equal(co.log.of("reopen").at(-1).to, "check", "the reopen event names where it went");
  assert.ok(co.mailbox.queue("pool:checker", "work").some((m) => m.ref === a.id && m.body.stage === "check" && m.body.loops === 1), "check is queued again, on the new loop");
  assert.equal(co.mailbox.queue("toy-builder-1", "work").some((m) => m.ref === a.id && m.state === "open"), false, "the builder is not sent a rebuild");
  // a revise to build is the default revise: no `to` recorded
  sign(co, a, "pool:checker", "toy-checker", { verdict: "revise", findings: "wrong", to: "build" });
  assert.deepEqual([a.stage, a.loops, a.history.at(-1).to], ["build", 2, undefined]);
});

test("engine: a route only goes back: the stage itself, a later stage, an unknown stage or a pass is refused and nothing moves", () => {
  const co = fresh();
  const a = order(co, "R2");
  toLearner(co, a);
  const n = a.history.length;
  for (const to of ["learner", "gates", "ship", "nope"]) {
    assert.throws(() => co.engine.advance(a.id, { stage: "learner", by: "toy-checker", verdict: "revise", evidence: "e", findings: "f", to }), /route: learner on O-\d+ cannot send work to/, to);
  }
  assert.throws(() => co.engine.advance(a.id, { stage: "learner", by: "toy-checker", verdict: "pass", evidence: "e", to: "check" }), /HARD: .*only a revise is routed/);
  assert.deepEqual([a.stage, a.loops, a.history.length], ["learner", 0, n], "a refused route signs nothing");
  assert.equal(co.log.of("refuse").filter((e) => e.rule === "route").length, 4);
  // with enforce off a bad route is recorded as a violation and the revise goes to build, as before K11
  co.engine.config.enforce = false;
  co.engine.advance(a.id, { stage: "learner", by: "toy-checker", verdict: "revise", evidence: "e", findings: "f", to: "uat" });
  assert.equal(a.stage, "build");
  assert.ok(co.log.of("violation").some((e) => e.rule === "route"));
});

test("tick: a code stage's route map sends a ship-gate failure back by reason (check, learner); no match goes to build", () => {
  const co = fresh();
  const a = order(co, "R3");
  toLearner(co, a);
  reason("R3", "claims not verified: 2 claims are draft");
  sign(co, a, "pool:checker", "toy-checker");
  let steps = tick(co);
  assert.deepEqual([steps[0].step, steps[0].result, steps[0].route], ["gates", "revise", "check"]);
  assert.equal(a.stage, "check", "claims not verified: back to the fact-check, not a rebuild");
  assert.match(a.findings, /\[route: check\]/, "the stage it lands on reads why");
  reason("R3", "learner review is for v1, not v2");
  sign(co, a, "pool:checker", "toy-checker"); sign(co, a, "pool:checker", "toy-checker");
  steps = tick(co);
  assert.equal(a.stage, "learner");
  reason("R3", "QA: no record");
  sign(co, a, "pool:checker", "toy-checker");
  tick(co);
  assert.deepEqual([a.stage, a.loops], ["build", 3], "no route matched: build, as before");
  reason("R3", null);
  toLearner(co, a); sign(co, a, "pool:checker", "toy-checker");
  tick(co);
  assert.equal(a.stage, "uat");
  assert.deepEqual(a.history.filter((h) => h.to).map((h) => `${h.stage}>${h.to}`), ["gates>check", "gates>learner"]);
});

test("cli: flow advance and room leave take --to; a bad route exits 1 and saves only the refusal", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k11-cli-"));
  const spec = builtinSpec("toy");
  spec.flow.stages = FLOW.stages.filter((x) => x.stage !== "gates");
  const sf = path.join(dir, "spec.json"); fs.writeFileSync(sf, JSON.stringify(spec));
  const cli = (...args) => {
    const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT;
    const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" });
    return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr };
  };
  const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
  ok(cli("init", `--spec-file=${sf}`));
  ok(cli("order", "new", "--by=cos", "--to=mgr-live", "--title=L", "--task=RC", "--accept=x"));
  ok(cli("order", "delegate", "O-1", "--by=mgr-live", "--to=toy-builder-1"));
  ok(cli("flow", "advance", "O-1", "--stage=build", "--by=toy-builder-1", "--evidence=w"));
  ok(cli("flow", "advance", "O-1", "--stage=check", "--by=toy-checker", "--evidence=n"));
  ok(cli("flow", "advance", "O-1", "--stage=learner", "--by=toy-checker", "--evidence=n"));
  const bad = cli("flow", "advance", "O-1", "--stage=uat", "--by=mgr-live", "--evidence=n", "--verdict=revise", "--findings=f", "--to=uat");
  assert.equal(bad.code, 1, bad.err);
  assert.match(bad.err, /route: uat on O-1 cannot send work to uat: a revise goes back to an earlier stage \(build, check, learner\)/);
  let r = ok(cli("flow", "advance", "O-1", "--stage=uat", "--by=mgr-live", "--evidence=n", "--verdict=revise", "--findings=the learner review is stale", "--to=learner"));
  assert.deepEqual([r.next_stage, r.loops], ["learner", 1]);
  const item = ok(cli("queue", "pool:checker")).find((m) => m.order === "O-1" && m.stage === "learner" && m.loop === 1);
  assert.ok(item, "the learner item is queued again");
  const { run } = ok(cli("room", "enter", `--msg=${item.msg}`, "--role=toy-checker"));
  r = ok(cli("room", "leave", `--run=${run}`, "--evidence=n", "--verdict=revise", "--findings=claim 2 unsupported", "--to=check"));
  assert.deepEqual([r.next_stage, r.loops], ["check", 2]);
  const state = JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
  assert.ok(state.log.events.some((e) => e.type === "refuse" && e.rule === "route"), "the refusal is recorded");
});
