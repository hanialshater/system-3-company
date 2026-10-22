import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";

// M5 exit criterion 1 (plan 2026-10-21 §M5), as one checklist: each of the eight classes is refused or escalated, with
// an event and an exit code. Every case drives the real CLIs (meta.mjs, supervisor.mjs) or the real guard and adapters
// on temp state and temp repos; some classes also have deeper tests elsewhere (named per case), and this file is the
// one place that shows all eight.
//   1 charged spend over budget          K13: tick asks kind:budget, the planner plans nothing, room enter exit 1
//   2 a session over the per-lane cap    lane policy maxSessions: the planner plans nothing, room enter exit 1
//   3 a deploy, push or [deploy]         launcher guard: denied, the session goes on (no interrupt), a guard event
//   4 a protected-path write             launcher guard: denied, a guard event
//        (3 and 4: the denial is a tool-level deny, not a process exit; the guard event is the one the denial itself
//        records, through the launcher's own wiring, guard.mjs deniedArgs; an agent cannot write one: exit 1)
//   5 a builder signing an independent stage   flow advance exit 1, refuse independence
//   6 a fact-checker changing claim text      adapters/s3c/claims-guard.mjs exit 1, nothing written; as the check
//        stage's post-check the fact-checker's leave exits 1 with a refuse event
//   7 a revise loop over maxLoops        park + a decision ask to the orderer; the next advance exit 1
//   8 a publish hold                     adapters/s3c/holds.mjs exit 1; as a stage pre-check: park + ask, no session
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m5-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));
const { builtinSpec, validateSpec } = await import("../generator.mjs");
const ADAPTERS = path.join(HERE, "..", "..", "adapters", "s3c");
const MAIN = "/home/user/system-3-company"; // read only: the company's readiness lib for the claims-guard fixture

const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; if (!env.META_ROLE) delete e.META_ROLE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const refused = (r) => { assert.equal(r.code, 1, `exit 1 expected: ${r.stdout}${r.err}`); assert.match(r.err, new RegExp(`"refused":true`)); return r; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const msgFor = (dir, to, id) => ok(meta(dir, "queue", to)).find((m) => m.order === id)?.msg;
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m5-${p}-`));
function init(spec) {
  const dir = fresh("co");
  if (typeof spec === "string") ok(meta(dir, "init", `--spec=${spec}`));
  else { const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(meta(dir, "init", `--spec-file=${f}`)); }
  return dir;
}
const order = (dir, task, { to = "mgr-live", builder = "toy-builder-1", budget = null, by = "toy" } = {}) => {
  const id = ok(meta(dir, "order", "new", `--to=${to}`, `--title=${task}`, `--task=${task}`, "--accept=x", ...(budget ? [`--budget=${budget}`] : []))).order;
  ok(meta(dir, "order", "delegate", id, `--by=${to}`, `--to=${builder}`));
  return id;
};

test("M5 refusal 1: charged spend over budget: the tick asks kind:budget, the planner plans nothing, room enter exits 1 (deeper: budget.test.mjs)", () => {
  const dir = init("toy");
  const a = order(dir, "A", { budget: 100 });
  const p = ok(exec(dir, path.join(HERE, "..", "meta.mjs"), ["room", "enter", `--msg=${msgFor(dir, "toy-builder-1", a)}`, "--role=toy-builder-1"], { META_LAUNCH: "0001-toy-builder-1" }));
  ok(meta(dir, "room", "leave", `--run=${p.run}`, "--evidence=e"));
  assert.deepEqual(ok(meta(dir, "launch", "finished", "--launch=0001-toy-builder-1", "--role=toy-builder-1", "--tokens=20", "--cumulative=150")).charged.map((x) => [x.order, x.spent]), [[a, 150]]);
  const t = ok(sup(dir, "tick"));
  const m = msgFor(dir, "toy-builder-1", a);
  assert.ok(m, "test1 sent it back to build");
  assert.equal(t.plan.some((x) => x.msgs.includes(m)), false, "the planner refuses a new session");
  const [stop] = events(dir, "budget-stop");
  assert.deepEqual([stop.order, stop.to], [a, "mgr-live"], "escalated: a kind:budget ask to the lane manager (asks.route)");
  refused(meta(dir, "room", "enter", `--msg=${m}`, "--role=toy-builder-1"));
  assert.ok(events(dir, "refuse").some((e) => e.rule === "budget" && e.order === a));
});

test("M5 refusal 2: a session over the per-lane cap (lane policy maxSessions): the planner plans none, room enter exits 1", () => {
  const dir = init("toy");
  ok(meta(dir, "policy", "propose", "--lane=s", "--by=mgr-live", '--knobs={"maxSessions":1}', "--reason=one builder at a time on the shared checkout", "--prediction=no lead-time loss"));
  ok(meta(dir, "policy", "activate", "--lane=s", "--version=1", "--by=mgr-live"));
  const a = order(dir, "A"), b = order(dir, "B", { builder: "toy-builder-2" });
  const planned = (t, role) => t.plan.some((x) => x.role === role);
  let t = ok(sup(dir, "tick"));
  assert.deepEqual([planned(t, "toy-builder-1"), planned(t, "toy-builder-2")], [true, false], "one session planned in lane s, not two");
  const p = ok(meta(dir, "room", "enter", `--msg=${msgFor(dir, "toy-builder-1", a)}`, "--role=toy-builder-1"));
  refused(meta(dir, "room", "enter", `--msg=${msgFor(dir, "toy-builder-2", b)}`, "--role=toy-builder-2"));
  const [r] = events(dir, "refuse").filter((e) => e.rule === "lane-cap");
  assert.deepEqual([r.by, r.lane, r.cap, r.load], ["toy-builder-2", "s", 1, 1]);
  assert.equal(planned(ok(sup(dir, "tick")), "toy-builder-2"), false);
  // the session leaves: the lane has room again, for one session (A, back from test1, or B)
  ok(meta(dir, "room", "leave", `--run=${p.run}`, "--evidence=e"));
  t = ok(sup(dir, "tick"));
  assert.equal(t.plan.filter((x) => x.role.startsWith("toy-builder")).length, 1);
  ok(meta(dir, "room", "enter", `--msg=${msgFor(dir, "toy-builder-2", b)}`, "--role=toy-builder-2"));
  assert.match(meta(dir, "policy", "propose", "--lane=s", "--by=mgr-live", '--knobs={"maxSessions":0}', "--reason=r", "--prediction=p").err, /maxSessions must be an integer 1-10/);
});

// the launcher guard in isolation, as tests/guard.test.mjs (deeper: every spelling there)
const WT = fresh("wt");
const GUARD = { tools: G.DEFAULT_TOOLS, cwd: WT, roots: [{ dir: WT, globs: ["company/constitution/protected-paths.txt", "tests/qa/**", "src/kit/Lesson.tsx", "tools/company.mjs"], file: "company/constitution/protected-paths.txt" }] };
/** One guarded call; with `dir`, each denial is recorded in that Meta state exactly as the launcher records it
 *  (launch.mjs: `meta(...deniedArgs(id, role, d))`), so the event is the denial's own, not one the test writes. */
async function denied(tool, input, dir = null) {
  const seen = [];
  const g = G.makeGuard({ ...GUARD, role: "toy-builder-1", record: (d) => { seen.push(d); if (dir) ok(meta(dir, ...G.deniedArgs("0001-toy-builder-1", "toy-builder-1", d))); } });
  const r = await g.canUseTool(tool, input, { signal: new AbortController().signal, toolUseID: "t", requestId: "r" });
  return { r, seen };
}

test("M5 refusal 3: a deploy, push or [deploy] attempt: denied with no interrupt (the session goes on), recorded as a guard event", async () => {
  for (const command of ["npm run deploy", "git push origin meta/m5", "git commit -m 'ship it [deploy]'", "npx vercel --prod", "gh workflow run deploy.yml"]) {
    const { r, seen } = await denied("Bash", { command });
    assert.equal(r.behavior, "deny", command);
    assert.ok(!r.interrupt, `${command}: the session continues`);
    assert.deepEqual(seen.map((d) => d.rule), ["bash"], command);
  }
  assert.equal((await denied("Bash", { command: "git status" })).r.behavior, "allow");
  const dir = init("toy");
  const { r, seen } = await denied("Bash", { command: "git push origin meta/m5" }, dir);
  assert.equal(r.behavior, "deny");
  assert.equal((await denied("Bash", { command: "git status" }, dir)).seen.length, 0, "an allowed call records nothing");
  const ev = events(dir, "guard");
  assert.deepEqual(ev.map((e) => [e.launch, e.role, e.tool, e.rule, e.why, e.via]), [["0001-toy-builder-1", "toy-builder-1", "Bash", "bash", seen[0].why, seen[0].via]], "the denial's own record");
  // the record is the launcher's: an agent session (META_ROLE) cannot write one
  const forged = exec(dir, path.join(HERE, "..", "meta.mjs"), ["guard", "denied", "--role=toy-builder-1", "--tool=Bash", "--rule=bash", "--why=anything"], { META_ROLE: "toy-builder-1" });
  assert.equal(forged.code, 1, forged.err);
  assert.equal(events(dir, "guard").length, 1);
});

test("M5 refusal 4: a protected-path write: denied, recorded as a guard event", async () => {
  for (const file_path of [path.join(WT, "tools/company.mjs"), "tests/qa/contract.spec.ts", "src/kit/Lesson.tsx"]) {
    const { r, seen } = await denied("Write", { file_path, content: "x" });
    assert.equal(r.behavior, "deny", file_path);
    assert.match(r.message, /protected path/);
    assert.deepEqual(seen.map((d) => d.rule), ["protected-path"]);
  }
  assert.equal((await denied("Write", { file_path: "src/demos/math/x/Demo.tsx", content: "x" })).r.behavior, "allow");
  const dir = init("toy");
  const { r, seen } = await denied("Write", { file_path: path.join(WT, "tools/company.mjs"), content: "x" }, dir);
  assert.equal(r.behavior, "deny");
  assert.deepEqual(events(dir, "guard").map((e) => [e.tool, e.rule, e.why]), [["Write", "protected-path", seen[0].why]], "the denial's own record");
});

/** A small lesson company: lead (manager, lane s), its builders, a fact-checker, release; uat signed by the orderer
 *  and independent, so a manager that delegated to itself is the order's builder (signers.test.mjs K4). */
const SPEC = (extra = {}) => ({
  name: "m5", title: "M5",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "s" }, { id: "review", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
  skills: ["manage", "build", "verify", "release"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "cos", lane: "s", room: "studio", floor: 2, skills: ["manage"] },
    { id: "demo-builder", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"] },
    { id: "fact-checker", level: "checker", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["verify"] },
    { id: "release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
  ],
  flow: { name: "lesson", stages: [
    { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"] },
    { stage: "check", signer: "checker", evidence: ["fact-check record"] },
    { stage: "uat", signer: "orderer", independent: true, evidence: ["acceptance"] },
    { stage: "ship", signer: "release", evidence: ["publish"] },
  ] },
  ...extra,
});

test("M5 refusal 5: a builder signing an independent stage: flow advance exits 1 with a refuse event (deeper: signers.test.mjs K4)", () => {
  const spec = SPEC();
  assert.deepEqual(validateSpec(spec), []);
  const dir = init(spec);
  const o = order(dir, "own", { to: "lead", builder: "lead" }); // delegate checks the lane only: lead builds its own order
  ok(meta(dir, "flow", "advance", o, "--stage=build", "--by=lead", "--evidence=src/demos/x/own/"));
  ok(meta(dir, "flow", "advance", o, "--stage=check", "--by=fact-checker", "--evidence=record"));
  const r = refused(meta(dir, "flow", "advance", o, "--stage=uat", "--by=lead", "--evidence=self-approved"));
  assert.match(r.err, /independence: lead built O-1 and cannot sign uat/);
  assert.ok(events(dir, "refuse").some((e) => e.rule === "independence" && e.order === o && e.by === "lead"));
  assert.equal(orderOf(dir, o).stage, "uat", "nothing signed");
  // and a builder on a checker's stage: not its signer, nor its room
  const b = order(dir, "other", { to: "lead", builder: "demo-builder" });
  ok(meta(dir, "flow", "advance", b, "--stage=build", "--by=demo-builder", "--evidence=e"));
  refused(meta(dir, "flow", "advance", b, "--stage=check", "--by=demo-builder", "--evidence=mine"));
  refused(meta(dir, "room", "enter", `--msg=${msgFor(dir, "pool:checker", b)}`, "--role=demo-builder"));
  assert.deepEqual(events(dir, "refuse").filter((e) => e.order === b).map((e) => e.rule), ["signer", "lane"]);
});

test("M5 refusal 6: a fact-checker changing claim text: claims-guard.mjs exits 1 and writes nothing (deeper: adapters/s3c/tests/claims-guard.test.mjs)", () => {
  const dir = fresh("claims"), slug = "fake-lesson", rel = `src/demos/math/${slug}/meta.json`;
  const w = (f, text) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), text); };
  const claim = (n) => ({ id: `math.${slug}.c${n}`, text: `Claim ${n} is true.`, support: "derivation", source: "own arithmetic", status: "unverified" });
  // the fixture of claims-guard.test.mjs: the two claim-enum lines of company.mjs cmdCheck, the company's readiness lib
  w("tools/company.mjs", '// fake\nif (!["derivation", "simulation", "source", "convention"].includes(c.support)) err();\nif (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err();\n');
  w("company/constitution/protected-paths.txt", "tools/company.mjs\ntests/qa/**\n");
  w(rel, JSON.stringify({ slug, title: "Fake", hook: "?", domain: "math", status: "review", owner: { categoryManager: "cm-math", builder: "demo-builder" }, claims: [claim(1), claim(2)], evidence: { qa: [], simulatedLearner: [], pairwise: [], humanLearners: [] }, version: 1 }, null, 2) + "\n");
  w(`src/demos/math/${slug}/Demo.tsx`, "export default function Demo() { return null; }\n");
  w(`company/reviews/${slug}/build.md`, "## Pre-flight v1\n");
  w("company/ops/board.json", '{"items":[]}\n');
  w("tools/lib/readiness.mjs", fs.readFileSync(path.join(MAIN, "tools/lib/readiness.mjs"), "utf8"));
  const git = (...a) => execFileSync("git", ["-c", "user.email=t@t", "-c", "user.name=t", ...a], { cwd: dir, encoding: "utf8" }).trim();
  git("init", "-q", "-b", "main"); git("add", "-A"); git("commit", "-qm", "base");
  const base = git("rev-parse", "HEAD");
  const m = JSON.parse(fs.readFileSync(path.join(dir, rel), "utf8"));
  for (const c of m.claims) c.status = "verified";
  m.claims[0].text = "Claim 1 is truer than it was."; // the checker rewrites the sentence it then verifies
  w(rel, JSON.stringify(m, null, 2) + "\n");
  w(`company/reviews/${slug}/2026-10-22-fact-check.md`, `| id | status | basis |\n|---|---|---|\n| c1 | verified | own |\n| c2 | verified | own |\n`);
  const before = fs.readFileSync(path.join(dir, rel), "utf8");
  const r = exec(dir, path.join(ADAPTERS, "claims-guard.mjs"), [slug, `--base=${base}`, "--today=2026-10-22", `--repo=${dir}`]);
  assert.equal(r.code, 1, r.stdout);
  const j = JSON.parse(r.stdout.trim().split("\n").at(-1));
  assert.deepEqual([j.ok, j.refused, j.route], [false, true, "check"]);
  assert.match(j.findings.map((f) => f.message).join("\n"), /c1 "text" changed/);
  assert.equal(fs.readFileSync(path.join(dir, rel), "utf8"), before, "nothing stamped or written");
  // M5 review: in the kernel, as the check stage's post-check (the s3c spec's wiring): the fact-checker's leave exits 1
  // with a refuse event, its run stays open and nothing is signed
  const spec = SPEC();
  spec.flow.stages[1].post = { argv: ["node", path.join(ADAPTERS, "claims-guard.mjs"), "${slug}", `--base=${base}`, "--verdict=${verdict}", "--today=2026-10-22", `--repo=${dir}`], cwd: dir, errorExit: [2, 3], findings: { fromStdout: "^(?:block|environment) [\\w-]+: (.*)$" } };
  assert.deepEqual(validateSpec(spec), []);
  const live = init(spec);
  const o = order(live, slug, { to: "lead", builder: "demo-builder" });
  ok(meta(live, "flow", "advance", o, "--stage=build", "--by=demo-builder", "--evidence=src/demos/math/fake-lesson/"));
  const p = ok(meta(live, "room", "enter", `--msg=${msgFor(live, "pool:checker", o)}`, "--role=fact-checker"));
  const leave = refused(meta(live, "room", "leave", `--run=${p.run}`, "--evidence=company/reviews/fake-lesson/2026-10-22-fact-check.md", "--verdict=pass", "--findings=all verified"));
  assert.match(leave.err, /post-check: check on O-1 refused the leave/);
  const ref = events(live, "refuse").find((e) => e.rule === "post-check");
  assert.deepEqual([ref?.order, ref?.role, ref?.stage], [o, "fact-checker", "check"]);
  assert.match(ref.findings ?? "", /c1 "text" changed/);
  assert.equal(orderOf(live, o).stage, "check", "nothing signed");
  assert.equal(fs.readFileSync(path.join(dir, rel), "utf8"), before, "still nothing written");
});

test("M5 refusal 7: a revise loop over maxLoops: the order parks with a decision ask to its orderer; the next advance exits 1 (deeper: terminal.test.mjs K9)", () => {
  const dir = init({ ...builtinSpec("toy"), name: "m5-loops", maxLoops: 1 });
  const o = order(dir, "LOOP");
  for (let i = 1; i <= 2; i++) {
    ok(meta(dir, "flow", "advance", o, "--stage=build", "--by=toy-builder-1", "--evidence=live/work/LOOP/"));
    const t = ok(meta(dir, "flow", "advance", o, "--stage=test1", "--by=code")); // no tests in the workdir: a revise
    assert.equal(t.test1, "revise");
  }
  const x = orderOf(dir, o);
  assert.deepEqual([x.stage, x.loops, x.parked.stage, x.parked.loopCap], ["parked", 2, "build", true]);
  assert.deepEqual(events(dir, "loop-cap").map((e) => [e.order, e.loops, e.maxLoops]), [[o, 2, 1]]);
  const [ask] = events(dir, "park-ask");
  assert.equal(ask.order, o);
  assert.equal(ask.to, "cos", "the orderer decides whether its order goes on (escalated past the manager)");
  const r = refused(meta(dir, "flow", "advance", o, "--stage=build", "--by=toy-builder-1", "--evidence=again"));
  assert.match(r.err, /is at parked, not build/);
});

test("M5 refusal 8: a publish hold: holds.mjs exits 1 (park), and as the build stage's pre-check the order parks with an ask before any session", () => {
  const repo = fresh("holds");
  fs.mkdirSync(path.join(repo, "tools"), { recursive: true }); fs.writeFileSync(path.join(repo, "tools/company.mjs"), "// placeholder\n");
  fs.mkdirSync(path.join(repo, "company/ops"), { recursive: true });
  fs.writeFileSync(path.join(repo, "company/ops/publish-holds.json"), JSON.stringify({ note: "x", holds: { "held-lesson": "head-of-product ruling W-1: rebuild the reveal first" } }));
  const HOLDS = path.join(ADAPTERS, "holds.mjs");
  const h = exec(repo, HOLDS, ["held-lesson", `--repo=${repo}`]);
  assert.equal(h.code, 1);
  assert.equal(JSON.parse(h.stdout.trim().split("\n").at(-1)).park, true);
  assert.equal(exec(repo, HOLDS, ["free-lesson", `--repo=${repo}`]).code, 0);
  // the kernel: holds.mjs as the build stage's `pre` (M5), routed to park as the s3c spec routes the ship stage
  const spec = SPEC();
  spec.flow.stages[0].pre = { argv: ["node", HOLDS, "${slug}", `--repo=${repo}`], cwd: repo, errorExit: [2, 3], findings: { fromStdout: "^(?:block|environment) [\\w-]+: (.*)$" }, route: { '"route":"park"': "park" } };
  assert.deepEqual(validateSpec(spec), []);
  const dir = init(spec);
  const held = order(dir, "held-lesson", { to: "lead", builder: "demo-builder" });
  const free = order(dir, "free-lesson", { to: "lead", builder: "demo-builder" });
  // before the supervisor ran the pre-check, nobody enters: room enter exits 1
  refused(meta(dir, "room", "enter", `--msg=${msgFor(dir, "demo-builder", held)}`, "--role=demo-builder"));
  assert.ok(events(dir, "refuse").some((e) => e.rule === "pre-check" && e.order === held));
  const t = ok(sup(dir, "tick"));
  assert.deepEqual(t.steps.filter((s) => s.kind === "pre").map((s) => [s.order, s.result]), [[held, "park"], [free, "pass"]]);
  const o = orderOf(dir, held);
  assert.deepEqual([o.stage, o.parked.stage, o.loops], ["parked", "build", 0], "a park, not a revise loop");
  assert.match(o.parked.reason, /active publish hold: head-of-product ruling W-1/);
  assert.equal(events(dir, "park-ask")[0].order, held, "escalated: an ask to its orderer");
  assert.equal(t.plan.some((p) => p.msgs.some((m) => ok(meta(dir, "queue", "demo-builder")).find((q) => q.msg === m)?.order === held)), false);
  assert.ok(t.plan.some((p) => p.role === "demo-builder"), "the free lesson is planned");
  const st = state(dir).log.events;
  assert.equal(st.some((e) => ["launch", "enter", "session-open"].includes(e.type) && (e.order === held || (e.msgs ?? []).some((m) => m === msgFor(dir, "demo-builder", held)))), false, "no session spent on the held order");
  // a pre-check that fails with no route is a stage-error hold (retry runs it again), not a pass and not a revise
  const se = SPEC(); se.flow.stages[0].pre = { argv: ["node", "-e", "process.exit(1)"], cwd: repo };
  const d2 = init(se);
  const y = order(d2, "y", { to: "lead", builder: "demo-builder" });
  const t2 = ok(sup(d2, "tick"));
  assert.deepEqual(t2.steps.filter((s) => s.kind === "pre").map((s) => s.result), ["stage-error"]);
  assert.deepEqual([orderOf(d2, y).stage, orderOf(d2, y).loops, orderOf(d2, y).stageError.stage], ["build", 0, "build"]);
  assert.equal(t2.plan.length, 0);
  assert.equal(ok(sup(d2, "tick")).steps.filter((s) => s.kind === "pre").length, 0, "held: not run again until a retry");
  // validateSpec keeps a pre-check's routes to park, and agent text out of it
  const bad = SPEC(); bad.flow.stages[1].pre = { argv: ["node", "-e", "1"], route: { x: "build" } };
  assert.match(validateSpec(bad).join("\n"), /check: pre: route "x" goes to build/);
  const bad2 = SPEC(); bad2.flow.stages[0].pre = { argv: ["node", "x.mjs", "${evidence}"] };
  assert.match(validateSpec(bad2).join("\n"), /a pre-check runs before anyone works the stage/);
});
