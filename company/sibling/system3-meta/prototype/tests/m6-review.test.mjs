import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, spawn } from "node:child_process";

// M6 prep review (the review of the M6-prep commits): one case per kernel finding, driving the real CLIs on temp state.
//   1 merge park       a merge conflict parks at merge, the stage after ship: `order resume --to=build` rebuilds it
//   2 lock             withLock never breaks a live holder's lock (a tick's ship + merge + exports pass 30 s)
//   3 detached         supervisor.mjs launched/usage from a process re-parented to init (setsid -f, META_ROLE dropped)
//   4 multi-lane asks  a two-lane builder's budget, lane and decision asks go to the manager of its order's lane
//   5 now items        a role of several sessions spends one per `now` item: never more than `sessions` at once
// (the guard's comment and spelling cases are in guard.test.mjs; the adapters' in adapters/s3c/tests.)
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m6r-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SUP = path.join(HERE, "..", "supervisor.mjs"), META = path.join(HERE, "..", "meta.mjs");
const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; if (!env.META_ROLE) delete e.META_ROLE; if (!env.META_LAUNCH) delete e.META_LAUNCH;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, META, args);
const sup = (dir, ...args) => exec(dir, SUP, args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m6r-${p}-`));
const { builtinSpec } = await import("../generator.mjs");
function init(spec) {
  const dir = fresh("co");
  if (typeof spec === "string") ok(meta(dir, "init", `--spec=${spec}`));
  else { const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(meta(dir, "init", `--spec-file=${f}`)); }
  return dir;
}
function twoLanes({ policy = null } = {}) {
  const s = builtinSpec("toy");
  s.rooms.push({ id: "cs-studio", floor: 2, kind: "lane", lane: "c" });
  s.roles.push({ id: "mgr-c", level: "manager", reportsTo: "cos", lane: "c", room: "cs-studio", floor: 2, skills: ["manage"] });
  Object.assign(s.roles.find((r) => r.id === "toy-builder-1"), { lanes: ["s", "c"], sessions: 3, drainCap: 2 });
  if (policy) s.policy = policy;
  return s;
}
const placed = (dir, task, { to = "mgr-live", builder = "toy-builder-1", by = null, priority = null } = {}) => {
  const id = ok(meta(dir, "order", "new", `--to=${to}`, `--title=${task}`, `--task=${task}`, "--accept=x", ...(by ? [`--by=${by}`] : []), ...(priority ? [`--priority=${priority}`] : []))).order;
  ok(meta(dir, "order", "delegate", id, `--by=${to}`, `--to=${builder}`));
  return id;
};

test("M6 prep review 1: a merge conflict parks the order at merge (after ship); `order resume --to=build` sends it back to be rebuilt (a loop, never deduped), a plain resume reruns the merge, a later stage is refused", () => {
  const s = builtinSpec("toy");
  s.flow.stages.push({ stage: "merge", signer: "code", evidence: [], run: { argv: ["node", "-e", "console.log(JSON.stringify({ ok: false, route: 'park' })); process.exit(1)"], route: { '"route":"park"': "park" } } });
  const dir = init(s);
  const o = placed(dir, "T");
  const work = path.join(dir, "work", "T"), acc = fresh("acc");
  fs.mkdirSync(work, { recursive: true });
  fs.writeFileSync(path.join(work, "page.mjs"), "export const x = 1;\n");
  fs.writeFileSync(path.join(work, "page.test.mjs"), "import { test } from 'node:test'; test('ok', () => {});\n");
  fs.writeFileSync(path.join(acc, "T.test.mjs"), "import { test } from 'node:test'; test('accepted', () => {});\n");
  const msg = (to) => ok(meta(dir, "queue", to)).find((m) => m.order === o)?.msg;
  const build = () => { const b = ok(meta(dir, "room", "enter", `--msg=${msg("toy-builder-1")}`, "--role=toy-builder-1")); ok(meta(dir, "room", "leave", `--run=${b.run}`, "--evidence=live/work/T/")); };
  build(); ok(sup(dir, "tick", `--acceptance=${acc}`));
  const c = ok(meta(dir, "room", "enter", `--msg=${msg("pool:checker")}`, "--role=toy-checker"));
  ok(meta(dir, "room", "leave", `--run=${c.run}`, "--evidence=read it", "--verdict=pass"));
  const t = ok(sup(dir, "tick", `--acceptance=${acc}`));
  assert.ok(t.steps.some((x) => x.step === "merge"), JSON.stringify(t.steps));
  let x = orderOf(dir, o);
  assert.deepEqual([x.stage, x.parked.stage], ["parked", "merge"]);
  // a plain resume goes back to merge (and parks again): the old, only, way out was cancel
  assert.equal(ok(meta(dir, "order", "resume", o, "--by=mgr-live", "--reason=try again")).stage, "merge");
  ok(sup(dir, "tick", `--acceptance=${acc}`));
  assert.equal(orderOf(dir, o).parked.stage, "merge");
  // a later stage or an unknown one is refused
  for (const bad of ["--to=nope", "--to=later"]) { const r = meta(dir, "order", "resume", o, "--by=mgr-live", "--reason=r", bad); assert.equal(r.code, 1, bad); assert.match(r.err, /--to is that stage or an earlier one \(build, test1, check, uat, ship, merge\)/, bad); }
  const loops = orderOf(dir, o).loops;
  const r = ok(meta(dir, "order", "resume", o, "--by=mgr-live", "--reason=rebuild on the new base", "--to=build"));
  assert.equal(r.stage, "build");
  x = orderOf(dir, o);
  assert.equal(x.loops, loops + 1, "a loop: the build is sent afresh");
  assert.match(x.findings, /^parked at merge: merge: .*Resumed to build by mgr-live: rebuild on the new base/);
  assert.ok(msg("toy-builder-1"), "a new build message for the builder (not deduped to the first build's)");
  assert.equal(events(dir, "resumed").at(-1).from, "merge");
  // and it goes through the flow again to the merge
  build(); ok(sup(dir, "tick", `--acceptance=${acc}`));
  assert.equal(orderOf(dir, o).stage, "check");
});

test("M6 prep review 2: withLock breaks a dead holder's lock past 30 s, never a live holder's (its writer waits 10 s and fails: no lost update)", async () => {
  const { withLock, lockHolderAlive, LOCK } = await import("../state.mjs");
  assert.equal(path.dirname(LOCK), LIVE);
  assert.equal(lockHolderAlive(String(process.pid)), true);
  assert.equal(lockHolderAlive(""), false);
  const dead = spawnSync("node", ["-e", "console.log(process.pid)"], { encoding: "utf8" }).stdout.trim();
  assert.equal(lockHolderAlive(dead), false);
  const old = (Date.now() - 60_000) / 1000;
  fs.writeFileSync(LOCK, dead); fs.utimesSync(LOCK, old, old);
  assert.equal(withLock(() => "ran"), "ran", "a dead writer's old lock is broken");
  // a live holder (a sleeping child) whose lock is 60 s old: the writer waits, then throws; the lock stays its
  const holder = spawn("node", ["-e", "setTimeout(() => {}, 30000)"], { stdio: "ignore" });
  try {
    fs.writeFileSync(LOCK, String(holder.pid)); fs.utimesSync(LOCK, old, old);
    const t0 = Date.now();
    assert.throws(() => withLock(() => "ran"), /state is locked by another process/);
    assert.ok(Date.now() - t0 >= 9_000, "it waited its 10 s");
    assert.equal(fs.readFileSync(LOCK, "utf8"), String(holder.pid), "the live holder keeps its lock");
  } finally { holder.kill(); fs.rmSync(LOCK, { force: true }); }
});

test("M6 prep review 3: supervisor.mjs launched/usage from a process re-parented to init (setsid -f, META_ROLE unset) are refused with a refuse event", async () => {
  const has = spawnSync("sh", ["-c", "command -v setsid"]).status === 0;
  if (!has) return; // no util-linux setsid on this host
  const dir = init("toy");
  const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_LAUNCH;
  // the review's spelling: an agent session (META_ROLE set) unsets it and detaches the call
  spawnSync("bash", ["-c", `x=supervisor; unset \${!META_R*}; setsid -f node ${path.dirname(SUP)}/$x.mjs launched --role=toy-builder-1 --msgs=M-7`], { env: { ...e, META_ROLE: "toy-builder-1" } });
  const until = Date.now() + 15_000;
  while (Date.now() < until && !events(dir, "refuse").length) await new Promise((r) => setTimeout(r, 100));
  assert.equal(events(dir, "launch").length, 0, "no launch reservation written");
  const ref = events(dir, "refuse");
  assert.equal(ref.length, 1, JSON.stringify(state(dir).log.events.slice(-3)));
  assert.match(ref[0].msg, /orchestrator's report: refused in an agent session/);
  const { detachedProcess } = await import("../state.mjs");
  assert.deepEqual([detachedProcess({ ppid: 1 }), detachedProcess({ ppid: 4242 })], [true, false]);
  // the orchestrator's own call, from its shell, as before
  assert.equal(ok(sup(dir, "launched", "--role=toy-builder-1", "--msgs=M-1")).type, "launch");
});

test("M6 prep review 4: a builder of lanes s and c asks about a c order in lane c: budget, lane and decision asks go to mgr-c (by --order, or by the order its session works on); its own lane's asks as before", () => {
  const dir = init(twoLanes());
  const c1 = placed(dir, "C1", { to: "mgr-c" }), s1 = placed(dir, "S1");
  const route = (kind, ...extra) => meta(dir, "ask", "route", "--by=toy-builder-1", `--kind=${kind}`, "--amount=1000", ...extra);
  for (const k of ["budget", "lane", "decision"]) {
    assert.equal(ok(route(k, `--order=${c1}`)).decider, "mgr-c", k);
    assert.equal(ok(route(k, `--order=${s1}`)).decider, k === "decision" ? "mgr-live" : "mgr-live", k);
    assert.equal(ok(route(k)).decider, "mgr-live", `${k}: no order, no running work: the home lane`);
  }
  const notMine = meta(dir, "ask", "route", "--by=toy-builder-1", "--kind=budget", "--order=O-99");
  assert.equal(notMine.code, 1); assert.match(notMine.err, /no order O-99/);
  // the session at work on C1 (its launch id): its asks are about C1 without --order
  const lid = `${String(ok(sup(dir, "launched", "--role=toy-builder-1", `--msgs=${ok(meta(dir, "queue", "toy-builder-1")).find((q) => q.order === c1).msg}`)).seq).padStart(4, "0")}-toy-builder-1`;
  const env = { META_LAUNCH: lid };
  ok(exec(dir, META, ["room", "enter", `--msg=${ok(meta(dir, "queue", "toy-builder-1")).find((q) => q.order === c1).msg}`, "--role=toy-builder-1"], env));
  assert.equal(ok(exec(dir, META, ["ask", "route", "--by=toy-builder-1", "--kind=decision"], env)).decider, "mgr-c");
  const raised = ok(exec(dir, META, ["ask", "raise", "--by=toy-builder-1", "--kind=budget", "--amount=1000", "--title=more", "--why=w", "--due=2026-12-01"], env));
  assert.equal(raised.assignee, "mgr-c");
});

test("M6 prep review 5: `now` items of a role with sessions:3 take at most its 3 sessions, counted with its next items", () => {
  const dir = init(twoLanes());
  for (const t of ["N1", "N2", "N3"]) placed(dir, t, { by: "founder", priority: "now" });
  for (const t of ["X1", "X2", "X3"]) placed(dir, t);
  const prio = state(dir).engine.orders.__map.map(([, o]) => o.priority);
  assert.equal(prio.filter((p) => p === "now").length, 3, JSON.stringify(prio));
  const plan = ok(sup(dir, "tick")).plan.filter((x) => x.role === "toy-builder-1");
  assert.equal(plan.length, 3, JSON.stringify(plan));
  assert.deepEqual(plan.map((p) => p.why), ["now: a fresh session at once (session 1 of 3)", "now: a fresh session at once (session 2 of 3)", "now: a fresh session at once (session 3 of 3)"]);
});
