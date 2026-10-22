import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K13 (plan 2026-10-21 §M5): charged spend. `launch finished` charges a launch's cumulative tokens to the orders it
// touched (its sessions' runs, its launch event's msgs and tasks), split evenly, and persists o.spent; the supervisor's
// tick raises one `kind:budget` ask (a top-up, routed as any budget ask) for an order at or over its budget, the planner
// starts no session on it and `room enter` refuses it; an approved ask raises the budget and the order runs again.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k13-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES } = await import("../state.mjs");
const { plan } = await import("../supervisor.mjs");
const { builtinSpec } = await import("../generator.mjs");
const A = await import("../asks.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);

const run = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE;
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: e, encoding: "utf8" });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr };
};
const cli = (dir, ...args) => run(dir, "meta.mjs", args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const msgFor = (dir, role, id) => ok(cli(dir, "queue", role)).find((m) => m.order === id)?.msg;

function fresh() {
  const co = make("k13", builtinSpec("toy"));
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", co.spec.flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, budget, builder = "toy-builder-1") {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget, accept: "x" });
  o.task = o.id;
  co.engine.delegate(o.id, { by: "mgr-live", to: builder, budget: 100 });
  return o;
}

test("K13 engine: an even split with the remainder to the first orders (the sum is exact), a warning once per budget at 0.8, a top-up", () => {
  const co = fresh();
  const a = order(co, 1000), b = order(co, 100_000);
  assert.deepEqual(co.engine.charge([a.id, b.id, a.id], 2001, { launch: "L1" }).map((x) => x.tokens), [1001, 1000], "a repeated ref is one order");
  assert.equal(a.spent + b.spent, 2001);
  assert.equal(co.engine.overBudget(a), true);
  assert.equal(co.engine.overBudget(b), false);
  assert.deepEqual(co.engine.charge([], 500), [], "a launch that touched no order charges nothing");
  assert.deepEqual(co.engine.charge(["O-99"], 500), [], "nor one that names no real order");
  const c = order(co, 1000);
  co.engine.charge([c.id], 700);
  assert.equal(co.log.of("budget-warn").filter((e) => e.order === c.id).length, 0, "70%: no warning");
  co.engine.charge([c.id], 100);
  co.engine.charge([c.id], 50);
  assert.deepEqual(co.log.of("budget-warn").filter((e) => e.order === c.id).map((e) => e.pct), [80], "warned once at 80%");
  co.engine.topUp(c.id, { amount: 1000, by: "mgr-live" });
  assert.equal(c.budget, 2000);
  co.engine.charge([c.id], 800);
  assert.deepEqual(co.log.of("budget-warn").filter((e) => e.order === c.id).map((e) => e.pct), [80, 83], "a new budget warns again");
  assert.throws(() => co.engine.topUp(c.id, { amount: -1, by: "mgr-live" }), /positive/);
  // the planner starts nothing on an order over budget, and a session's next item skips it
  assert.equal(plan(co).some((p) => p.msgs.some((m) => co.mailbox.msgs.get(m).ref === a.id)), false);
  assert.equal(plan(co).some((p) => p.msgs.some((m) => co.mailbox.msgs.get(m).ref === b.id)), true);
  assert.equal(co.rooms.eligible("toy-builder-1").some((m) => m.ref === a.id), false);
});

test("K13 asks: one budget ask per budget, routed by amount (lane manager, chief of staff, founder), never repeated after a no", () => {
  const co = fresh();
  const small = order(co, 1000), mid = order(co, 600_000), big = order(co, 1_200_000);
  co.engine.charge([small.id], 1200); co.engine.charge([mid.id], 600_000); co.engine.charge([big.id], 1_200_000);
  const s = A.raiseBudgetAsk(co, small), m = A.raiseBudgetAsk(co, mid), b = A.raiseBudgetAsk(co, big);
  assert.deepEqual([s.assignee, m.assignee, b.assignee], ["mgr-live", "cos", "founder"]);
  assert.deepEqual([s.ask.amount, m.ask.amount, b.ask.amount], [700, 300_000, 600_000], "overspend + half the budget");
  assert.equal(s.ask.from, "toy-builder-1", "raised by the builder whose work stops");
  assert.equal(A.raiseBudgetAsk(co, small), null, "no duplicate while it is open");
  A.answer(co, { by: "mgr-live", id: s.id, decision: "no", text: "finish it in the next cycle" });
  assert.equal(A.raiseBudgetAsk(co, small), null, "a no keeps it stopped, with no new ask");
  assert.equal(small.budget, 1000);
  A.answer(co, { by: "cos", id: m.id, decision: "yes", text: "approved" });
  assert.equal(mid.budget, 900_000);
  assert.equal(co.engine.overBudget(mid), false);
  assert.equal(co.log.of("budget-stop").length, 3);
});

test("K13 CLI: launch finished charges the touched orders; tick stops the one over budget with an ask; enter refuses it; yes unblocks", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k13-cli-"));
  ok(cli(dir, "init", "--spec=toy"));
  const a = ok(cli(dir, "order", "new", "--to=mgr-live", "--title=A", "--task=A", "--accept=x", "--budget=1000")).order;
  const b = ok(cli(dir, "order", "new", "--to=mgr-live", "--title=B", "--task=B", "--accept=x", "--budget=100000")).order;
  const c = ok(cli(dir, "order", "new", "--to=mgr-live", "--title=C", "--task=C", "--accept=x", "--budget=100000")).order;
  for (const id of [a, b]) ok(cli(dir, "order", "delegate", id, "--by=mgr-live", "--to=toy-builder-1"));
  // one agent process (META_LAUNCH) works A and B in two sessions
  const L = { META_LAUNCH: "0001-toy-builder-1" };
  for (const id of [a, b]) {
    const p = ok(run(dir, "meta.mjs", ["room", "enter", `--msg=${msgFor(dir, "toy-builder-1", id)}`, "--role=toy-builder-1"], L));
    ok(cli(dir, "room", "leave", `--run=${p.run}`, "--evidence=live/work/x/"));
  }
  const f = ok(cli(dir, "launch", "finished", "--launch=0001-toy-builder-1", "--role=toy-builder-1", "--tokens=40", "--cumulative=2001", "--ok=true"));
  assert.deepEqual(f.charged.map((x) => [x.order, x.tokens]), [[a, 1001], [b, 1000]]);
  assert.deepEqual([orderOf(dir, a).spent, orderOf(dir, b).spent], [1001, 1000], "persisted");
  // a launch the supervisor reserved for judgment work: its launch event's tasks name the order (a manager delegating C)
  const le = ok(run(dir, "supervisor.mjs", ["launched", "--role=mgr-live", `--tasks=delegate:${c}`]));
  const id = `${String(le.seq).padStart(4, "0")}-mgr-live`;
  assert.deepEqual(ok(cli(dir, "launch", "finished", `--launch=${id}`, "--role=mgr-live", "--tokens=30")).charged.map((x) => [x.order, x.tokens]), [[c, 30]], "no --cumulative: --tokens (backward compatible)");
  assert.deepEqual(ok(cli(dir, "launch", "finished", `--launch=${id}`, "--role=mgr-live", "--tokens=30")).charged, [], "charged once per launch");
  assert.equal(orderOf(dir, c).spent, 30);
  // tick: test1 sends both back to build; A is over budget: one ask, and the plan starts no session on it
  const t = ok(run(dir, "supervisor.mjs", ["tick"]));
  assert.ok(t.steps.some((s) => s.step === "budget" && s.order === a && s.result === "stopped"), JSON.stringify(t.steps));
  const planned = (p) => p.flatMap((x) => x.msgs);
  const ma = msgFor(dir, "toy-builder-1", a), mb = msgFor(dir, "toy-builder-1", b);
  assert.ok(ma && mb);
  assert.equal(planned(t.plan).includes(ma), false, "no session for A");
  assert.equal(planned(t.plan).includes(mb), true, "B still runs");
  const stop = events(dir, "budget-stop");
  assert.equal(stop.length, 1);
  assert.deepEqual([stop[0].order, stop[0].to, stop[0].amount], [a, "mgr-live", 501]);
  assert.equal(ok(run(dir, "supervisor.mjs", ["tick"])).steps.filter((s) => s.step === "budget").length, 0, "no duplicate ask");
  // room enter refuses A: exit 1, a refuse event
  const r = run(dir, "meta.mjs", ["room", "enter", `--msg=${ma}`, "--role=toy-builder-1"]);
  assert.equal(r.code, 1, r.err);
  assert.match(r.err, /budget: O-1 has spent 1001 of its 1000-token budget/);
  assert.ok(events(dir, "refuse").some((e) => e.rule === "budget" && e.order === a));
  // the builder cannot take its own ask and approve it
  ok(cli(dir, "item", "update", `--id=${stop[0].item}`, "--by=toy-builder-1", "--assignee=toy-builder-1"));
  assert.equal(cli(dir, "ask", "answer", `--id=${stop[0].item}`, "--by=toy-builder-1", "--decision=yes", "--text=mine").code, 1);
  ok(cli(dir, "item", "update", `--id=${stop[0].item}`, "--by=mgr-live", "--assignee=mgr-live"));
  ok(cli(dir, "ask", "answer", `--id=${stop[0].item}`, "--by=mgr-live", "--decision=yes", "--text=worth it"));
  assert.equal(orderOf(dir, a).budget, 1501);
  assert.ok(planned(ok(run(dir, "supervisor.mjs", ["tick"])).plan).includes(ma), "A is planned again");
  ok(cli(dir, "room", "enter", `--msg=${ma}`, "--role=toy-builder-1"));
});
