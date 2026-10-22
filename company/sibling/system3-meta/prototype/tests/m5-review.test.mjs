import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M5 review fixes (2026-10-22), one regression per reproduced finding: K13's charged spend and budget asks (an order
// stuck with no ask, a decider's tokens charged to the order it decides, a no that a resume left silent, charges for
// work a launch never did, a cancelled order's ask, an agent's own `launch finished`, a builder closing its own ask),
// a pre-check's kind:budget ask, the pre cmd's order vocabulary.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m5r-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const { make, LIVE_ROLES, prepareCmd } = await import("../state.mjs");
const { builtinSpec, validateSpec } = await import("../generator.mjs");
const A = await import("../asks.mjs");
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));

const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; if (!env.META_ROLE) delete e.META_ROLE;
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, "meta.mjs", args);
const sup = (dir, ...args) => exec(dir, "supervisor.mjs", args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const no = (r, re) => { assert.equal(r.code, 1, `exit 1 expected: ${r.stdout}${r.err}`); if (re) assert.match(r.err, re); return r; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const itemOf = (dir, id) => state(dir).data.tracker.items.__map.find(([k]) => k === id)[1];
const msgFor = (dir, role, id) => ok(meta(dir, "queue", role)).find((m) => m.order === id)?.msg;
const budgetSteps = (t) => t.steps.filter((s) => s.step === "budget");
const lid = (e) => `${String(e.seq).padStart(4, "0")}-${e.role}`;
function init(spec = "toy") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m5r-co-"));
  if (typeof spec === "string") ok(meta(dir, "init", `--spec=${spec}`));
  else { const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(meta(dir, "init", `--spec-file=${f}`)); }
  return dir;
}
const newOrder = (dir, task, budget, extra = []) => ok(meta(dir, "order", "new", "--to=mgr-live", `--title=${task}`, `--task=${task}`, "--accept=x", `--budget=${budget}`, ...extra)).order;
/** A builder launch that enters and leaves order `id`'s message, then the launcher's report of `cumulative` tokens. */
function builderLaunch(dir, id, cumulative, { launch = "0001-toy-builder-1", role = "toy-builder-1" } = {}) {
  const p = ok(exec(dir, "meta.mjs", ["room", "enter", `--msg=${msgFor(dir, role, id)}`, `--role=${role}`], { META_LAUNCH: launch }));
  ok(meta(dir, "room", "leave", `--run=${p.run}`, "--evidence=e"));
  return ok(meta(dir, "launch", "finished", `--launch=${launch}`, `--role=${role}`, "--tokens=10", `--cumulative=${cumulative}`));
}

test("M5 review: an order its manager holds (no builder yet, or building it itself) gets a budget ask its manager can answer", () => {
  const dir = init();
  const o = newOrder(dir, "C", 1000);
  const le = ok(sup(dir, "launched", "--role=mgr-live", `--tasks=delegate:${o}`));
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${lid(le)}`, "--role=mgr-live", "--tokens=30", "--cumulative=1200")).charged.map((x) => [x.order, x.tokens]), [[o, 1200]], "the delegate launch is the order's management cost");
  const t = ok(sup(dir, "tick"));
  assert.equal(budgetSteps(t).length, 1, JSON.stringify(t.steps));
  assert.equal(events(dir, "budget-ask-failed").length, 0, "before: 'within your own limit: decide it yourself', and never asked again");
  const [stop] = events(dir, "budget-stop");
  assert.equal(stop.to, "mgr-live");
  assert.equal(itemOf(dir, stop.item).ask.from, "mgr-live", "raised by its manager (it has no builder)");
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  assert.equal(ok(sup(dir, "tick")).plan.some((p) => p.role === "toy-builder-1"), false, "still stopped: no builder session until a decision");
  ok(meta(dir, "ask", "answer", "--by=mgr-live", `--id=${stop.item}`, "--decision=yes", "--text=worth it"));
  assert.equal(orderOf(dir, o).budget, 1700);
  assert.ok(ok(sup(dir, "tick")).plan.some((p) => p.role === "toy-builder-1"), "planned again");
  // a manager building its own order (m5-refusals class 5 does this): the same
  const own = newOrder(dir, "OWN", 1000);
  ok(meta(dir, "order", "delegate", own, "--by=mgr-live", "--to=mgr-live"));
  ok(meta(dir, "launch", "finished", "--launch=x1", "--role=mgr-live", "--tokens=0", "--cumulative=1200", `--tasks=t:${own}`));
  const t2 = ok(sup(dir, "tick"));
  assert.deepEqual(budgetSteps(t2).map((s) => s.order), [own]);
  assert.equal(events(dir, "budget-stop").at(-1).to, "mgr-live");
});

test("M5 review: a raise that fails is logged once per budget and retried when the order's builder or manager changes", () => {
  const co = make("m5r", builtinSpec("toy"));
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", co.spec.flow, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 1000, accept: "x" });
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  co.engine.charge([o.id], 1200);
  for (const id of ["toy-builder-1", "mgr-live"]) co.org.role(id).active = false;
  assert.equal(A.raiseBudgetAsk(co, o), null);
  assert.equal(A.raiseBudgetAsk(co, o), null);
  assert.equal(co.log.of("budget-ask-failed").length, 1, "once, not every tick");
  o.builder = "toy-builder-2";
  const it = A.raiseBudgetAsk(co, o);
  assert.ok(it, "a new builder: asked again");
  assert.equal(it.ask.from, "toy-builder-2");
});

test("M5 review: the tokens a decider spends answering an order's budget ask are not charged to that order", () => {
  const dir = init();
  const o = newOrder(dir, "A", 1000);
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  builderLaunch(dir, o, 1200);
  ok(sup(dir, "tick"));
  const [stop] = events(dir, "budget-stop");
  const le = ok(sup(dir, "launched", "--role=mgr-live", `--tasks=ask:${stop.item}`));
  ok(meta(dir, "ask", "answer", "--by=mgr-live", `--id=${stop.item}`, "--decision=yes", "--text=ok"));
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${lid(le)}`, "--role=mgr-live", "--tokens=30", "--cumulative=900")).charged, [], "before: O-1 charged 900, over its new budget at once");
  assert.deepEqual([orderOf(dir, o).spent, orderOf(dir, o).budget], [1200, 1700]);
  assert.equal(budgetSteps(ok(sup(dir, "tick"))).length, 0, "no new budget ask: no stop/approve loop");
});

test("M5 review: a no is recorded on the order, and a resume after it asks again instead of stalling in silence", () => {
  const dir = init();
  const o = newOrder(dir, "A", 1000);
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  builderLaunch(dir, o, 1200);
  ok(sup(dir, "tick"));
  const [stop] = events(dir, "budget-stop");
  ok(meta(dir, "ask", "answer", "--by=mgr-live", `--id=${stop.item}`, "--decision=no", "--text=not now"));
  assert.deepEqual([orderOf(dir, o).budgetHold.no.decision, orderOf(dir, o).budgetHold.no.by], ["no", "mgr-live"], "the no is on the order");
  assert.equal(budgetSteps(ok(sup(dir, "tick"))).length, 0, "a no keeps it stopped, with no new ask");
  ok(meta(dir, "order", "park", o, "--by=mgr-live", "--reason=x"));
  assert.equal(budgetSteps(ok(sup(dir, "tick"))).length, 0, "parked: no ask");
  ok(meta(dir, "order", "resume", o, "--by=cos", "--reason=go on"));
  const t = ok(sup(dir, "tick"));
  assert.deepEqual(budgetSteps(t).map((s) => s.order), [o], "resumed over budget: its decider is asked again");
  assert.equal(events(dir, "budget-stop").length, 2);
  assert.equal(t.plan.some((p) => p.role === "toy-builder-1"), false, "and still no builder session until a yes");
});

test("M5 review: a launch is charged for the orders it worked, not every msg it was planned with", () => {
  const dir = init();
  const a = newOrder(dir, "A", 100_000), b = newOrder(dir, "B", 100_000);
  for (const id of [a, b]) ok(meta(dir, "order", "delegate", id, "--by=mgr-live", "--to=toy-builder-1"));
  const ma = msgFor(dir, "toy-builder-1", a), mb = msgFor(dir, "toy-builder-1", b);
  const l1 = lid(ok(sup(dir, "launched", "--role=toy-builder-1", `--msgs=${ma},${mb}`))), l2 = lid(ok(sup(dir, "launched", "--role=toy-builder-1", `--msgs=${mb}`)));
  for (const [l, m] of [[l1, ma], [l2, mb]]) {
    const p = ok(exec(dir, "meta.mjs", ["room", "enter", `--msg=${m}`, "--role=toy-builder-1"], { META_LAUNCH: l }));
    ok(meta(dir, "room", "leave", `--run=${p.run}`, "--evidence=e"));
  }
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${l1}`, "--role=toy-builder-1", "--tokens=1", "--cumulative=10000")).charged.map((x) => [x.order, x.tokens]), [[a, 10000]], "before: [O-1 5000, O-2 5000]");
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${l2}`, "--role=toy-builder-1", "--tokens=1", "--cumulative=10000")).charged.map((x) => [x.order, x.tokens]), [[b, 10000]]);
  assert.deepEqual([orderOf(dir, a).spent, orderOf(dir, b).spent], [10000, 10000]);
  // a launch that entered no room at all (it crashed first) is still charged to the msgs it was planned with
  const c = newOrder(dir, "C", 100_000);
  ok(meta(dir, "order", "delegate", c, "--by=mgr-live", "--to=toy-builder-1"));
  const l3 = lid(ok(sup(dir, "launched", "--role=toy-builder-1", `--msgs=${msgFor(dir, "toy-builder-1", c)}`)));
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${l3}`, "--role=toy-builder-1", "--tokens=1", "--cumulative=500", "--ok=false", "--reason=crash")).charged.map((x) => [x.order, x.tokens]), [[c, 500]]);
});

test("M5 review: cancelling an order closes its budget ask, and a yes cannot top up a cancelled order", () => {
  const dir = init();
  const o = newOrder(dir, "A", 1000);
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  builderLaunch(dir, o, 1200);
  ok(sup(dir, "tick"));
  const [stop] = events(dir, "budget-stop");
  ok(meta(dir, "order", "cancel", o, "--by=cos", "--reason=stop"));
  assert.equal(itemOf(dir, stop.item).state, "cancelled");
  assert.deepEqual(events(dir, "budget-ask-closed").map((e) => [e.order, e.item]), [[o, stop.item]]);
  no(meta(dir, "ask", "answer", "--by=mgr-live", `--id=${stop.item}`, "--decision=yes", "--text=ok"));
  assert.equal(events(dir, "budget-topup").length, 0);
  assert.equal(orderOf(dir, o).budget, 1000);
});

test("M5 review: an agent cannot report a launch (its own or another's) nor record a guard denial; a launch id names its role", () => {
  const dir = init();
  const a = newOrder(dir, "A", 1000), b = newOrder(dir, "B", 1000);
  ok(meta(dir, "order", "delegate", a, "--by=mgr-live", "--to=toy-builder-1"));
  ok(meta(dir, "order", "delegate", b, "--by=mgr-live", "--to=toy-builder-2"));
  const L = "0001-toy-builder-1", agent = { META_ROLE: "toy-builder-1", META_LAUNCH: L };
  const p = ok(exec(dir, "meta.mjs", ["room", "enter", `--msg=${msgFor(dir, "toy-builder-1", a)}`, "--role=toy-builder-1"], agent));
  ok(exec(dir, "meta.mjs", ["room", "leave", `--run=${p.run}`, "--evidence=e"], agent));
  no(exec(dir, "meta.mjs", ["launch", "finished", `--launch=${L}`, "--role=toy-builder-1", "--tokens=0", "--cumulative=1"], agent), /the launcher's report/);
  no(exec(dir, "meta.mjs", ["launch", "finished", "--launch=bogus-1", "--role=toy-builder-1", "--tokens=0", "--cumulative=99999", `--tasks=x:${b}`], agent), /the launcher's report/);
  no(exec(dir, "meta.mjs", ["guard", "denied", "--role=toy-builder-1", "--tool=Bash", "--rule=bash", "--why=anything"], agent), /the launcher's record/);
  assert.equal(orderOf(dir, b).spent, 0, "a rival's order is not charged");
  assert.equal(events(dir, "guard").length, 0);
  // the launcher's report (outside any agent session) is then charged in full
  assert.deepEqual(ok(meta(dir, "launch", "finished", `--launch=${L}`, "--role=toy-builder-1", "--tokens=40", "--cumulative=5000", "--ok=true")).charged.map((x) => [x.order, x.tokens]), [[a, 5000]]);
  no(meta(dir, "launch", "finished", "--launch=0002-toy-builder-2", "--role=toy-builder-1", "--tokens=1"), /0002-toy-builder-2 is toy-builder-2's/);
  // the guard denies the plain spellings too, with the session's role known
  for (const c of [`node meta.mjs launch finished --launch=${L} --role=toy-builder-1 --tokens=0 --cumulative=1`, `node meta.mjs launch finished --launch=bogus-1 --role=toy-builder-1 --tokens=0 --cumulative=99999 --tasks=x:${b}`, "node meta.mjs guard denied --role=toy-builder-1 --tool=Bash --rule=bash --why=x"])
    assert.match(G.bashDenial(c, 0, { role: "toy-builder-1" }) ?? "", /the launcher's report/, c);
  assert.equal(G.bashDenial(`node meta.mjs launch config --role=toy-builder-1`, 0, { role: "toy-builder-1" }), null);
});

test("M5 review: the builder whose order is stopped cannot cancel its budget ask; its decider still answers it", () => {
  const dir = init();
  const o = newOrder(dir, "A", 1000);
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  builderLaunch(dir, o, 1200);
  ok(sup(dir, "tick"));
  const [stop] = events(dir, "budget-stop");
  no(meta(dir, "item", "update", `--id=${stop.item}`, "--by=toy-builder-1", "--state=cancelled"), /closes only by its answer/);
  no(meta(dir, "item", "update", `--id=${stop.item}`, "--by=mgr-live", "--state=done"), /closes only by its answer/);
  assert.equal(itemOf(dir, stop.item).state, "todo");
  ok(meta(dir, "ask", "answer", "--by=mgr-live", `--id=${stop.item}`, "--decision=yes", "--text=ok"));
  assert.equal(itemOf(dir, stop.item).state, "done");
});

test("M5 review: a pre-check that names a kind:budget ask parks with a budget ask routed by amount, carrying its text", () => {
  const spec = builtinSpec("toy");
  const gate = 'console.log(JSON.stringify({ok:false,park:true,ask:{kind:"budget",text:"The company gate refuses gamma. Top it up through the project review."},findings:[{severity:"block",kind:"budget",route:"park",message:"ledger gate gamma: at 100%"}]}));process.exit(1)';
  spec.flow.stages[0].pre = { argv: ["node", "-e", gate], cwd: "/", errorExit: [2, 3], route: { '"route":"park"': "park" } };
  assert.deepEqual(validateSpec(spec), []);
  const dir = init(spec);
  const small = newOrder(dir, "S", 200_000), big = newOrder(dir, "B", 300_000);
  for (const id of [small, big]) ok(meta(dir, "order", "delegate", id, "--by=mgr-live", "--to=toy-builder-1"));
  const t = ok(sup(dir, "tick"));
  assert.deepEqual(t.steps.filter((s) => s.kind === "pre").map((s) => [s.order, s.result]), [[small, "park"], [big, "park"]]);
  const asks = events(dir, "park-ask");
  assert.deepEqual(asks.map((e) => [e.order, e.kind, e.to]), [[small, "budget", "mgr-live"], [big, "budget", "cos"]], "before: kind decision to the orderer");
  const it = itemOf(dir, asks[1].item);
  assert.deepEqual([it.ask.kind, it.ask.amount, it.labels.includes("budget"), it.labels.includes("parked")], ["budget", 300_000, true, true]);
  assert.match(it.body, /Top it up through the project review/);
  // a park ask: its decider resumes (or cancels) the order; a plain answer is refused, and nothing tops up Meta's budget
  no(meta(dir, "ask", "answer", "--by=cos", `--id=${it.id}`, "--decision=yes", "--text=ok"), /order resume/);
  ok(meta(dir, "order", "resume", big, "--by=cos", "--reason=topped up in the project review"));
  assert.equal(itemOf(dir, it.id).state, "done");
  assert.equal(orderOf(dir, big).budget, 300_000);
  assert.equal(events(dir, "budget-topup").length, 0);
});

test("M5 review: a pre cmd reads the order's ${order}, ${budget}, ${remaining} and ${ledger_project}", () => {
  const o = { id: "O-3", task: "t", slug: "s", budget: 5000, spent: 1200, ledgerProject: "gamma", workdir: "/tmp" };
  assert.deepEqual(prepareCmd(o, { argv: ["node", "ledger-gate.mjs", "${ledger_project}", "--tokens=${remaining}", "${order}", "${budget}"] }).argv.slice(1), ["ledger-gate.mjs", "gamma", "--tokens=3800", "O-3", "5000"]);
  assert.deepEqual(prepareCmd({ ...o, ledgerProject: undefined }, { argv: ["node", "x", "${ledger_project}"] }).argv.slice(1), ["x", "${ledger_project}"], "unset: as written");
  const dir = init();
  const id = newOrder(dir, "L", 1000, ["--ledger-project=gamma"]);
  assert.equal(orderOf(dir, id).ledgerProject, "gamma");
  no(meta(dir, "order", "new", "--to=mgr-live", "--title=x", "--task=x", "--accept=x", "--ledger-project=PRJ 1"), /projects.json id/);
});
