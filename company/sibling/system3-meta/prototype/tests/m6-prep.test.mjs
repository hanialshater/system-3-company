import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M6 prep (plan 2026-10-21 §M6, M4-RUN.md "Open defects"): what the kernel needs before the M6 live run (10 lessons, up
// to 3 builders in parallel, lanes math and cs). Each case drives the real CLIs (meta.mjs, supervisor.mjs) on temp
// state, or the real guard:
//   1 order new --slug          M4's one operator fix: ${slug} fell back to the task (LESSON-<slug>)
//   2 supervisor launched/usage the orchestrator's reports, refused in an agent session (as launch finished, M5 review)
//   4 lanes                     a builder in lanes math and cs: delegate from either manager, lane load by order
//   4+5 sessions, levelCaps     one role, 3 sessions at once (one item each), K17's per-level cap, launch reservations
//   5 host guard                K17: no session while load or disk is past the spec's policy.host; host-hold events
//   6 merge after ship          a code stage may follow ship (integrate.mjs), ${branch}; the order is done after it
//   8 review cost               ${brief_file} (one brief in the pack, not 51), the role's drainCap and waitSec
//   9 exports                   the founder-inbox export as the chief of staff's code step, on change or every tick
// (3, the guard's heredocs, is in guard.test.mjs; 7, the regression scope, and the adapters are in adapters/s3c/tests.)
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m6-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));
const { prepareCmd } = await import("../state.mjs");

const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; if (!env.META_ROLE) delete e.META_ROLE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m6-${p}-`));
function init(spec) {
  const dir = fresh("co");
  if (typeof spec === "string") ok(meta(dir, "init", `--spec=${spec}`));
  else { const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(meta(dir, "init", `--spec-file=${f}`)); }
  return dir;
}

test("M6 prep 1 (M4 defect): order new --slug sets the order's slug, validated; a task LESSON-<slug> interpolates ${slug} to <slug>", () => {
  const dir = init("toy");
  const r = ok(meta(dir, "order", "new", "--to=mgr-live", "--title=rope", "--task=LESSON-one-metre-more-rope", "--slug=one-metre-more-rope", "--accept=x"));
  assert.equal(r.slug, "one-metre-more-rope");
  const o = orderOf(dir, r.order);
  assert.deepEqual([o.task, o.slug], ["LESSON-one-metre-more-rope", "one-metre-more-rope"]);
  const p = prepareCmd(o, { argv: ["node", "gates.mjs", "${slug}", "--task=${task}"] });
  assert.deepEqual(p.argv.slice(2), ["one-metre-more-rope", "--task=LESSON-one-metre-more-rope"], "the M4 failure: gates.mjs got LESSON-one-metre-more-rope");
  // no --slug: the task, as every run before
  const plain = orderOf(dir, ok(meta(dir, "order", "new", "--to=mgr-live", "--title=t", "--task=T1", "--accept=x")).order);
  assert.equal(plain.slug, undefined);
  assert.deepEqual(prepareCmd(plain, { argv: ["node", "x", "${slug}"] }).argv.slice(2), ["T1"]);
  for (const bad of ["--slug=Bad_Slug", "--slug=a--b", "--slug=-a", "--slug", "--slug=a b"]) {
    const x = meta(dir, "order", "new", "--to=mgr-live", "--title=t", "--task=T2", "--accept=x", bad);
    assert.equal(x.code, 1, bad); assert.match(x.err, /--slug is a lesson slug/, bad);
  }
  assert.equal(state(dir).engine.orders.__map.length, 2, "a refused slug places no order");
});

test("M6 prep 2 (the hole the M5 review left): supervisor.mjs launched and usage are refused in an agent session, exit 1 with a refuse event; the guard denies them too", () => {
  const dir = init("toy");
  const agent = { META_ROLE: "toy-builder-1", META_LAUNCH: "0001-toy-builder-1" };
  for (const args of [["launched", "--role=toy-builder-1", "--msgs=M-1"], ["usage", "--finished=toy-builder-1:10"]]) {
    const r = exec(dir, path.join(HERE, "..", "supervisor.mjs"), args, agent);
    assert.equal(r.code, 1, args.join(" ")); assert.match(r.err, /orchestrator's report: refused in an agent session \(toy-builder-1\)/);
  }
  assert.equal(events(dir, "launch").length, 0, "no launch event written");
  assert.equal(events(dir, "usage").length, 0);
  assert.deepEqual(events(dir, "refuse").map((e) => e.by), ["toy-builder-1", "toy-builder-1"]);
  // outside any agent session (the orchestrator, a person) as before
  assert.equal(ok(sup(dir, "launched", "--role=toy-builder-1", "--msgs=M-1")).type, "launch");
  // the guard, with the session's role known
  for (const c of ["node supervisor.mjs launched --role=toy-builder-1", "node /k/supervisor.mjs usage --finished=a:1", "cd /k && node supervisor.mjs --x launched", "node supervisor.mjs $(echo launched)"])
    assert.match(G.bashDenial(c, 0, { role: "toy-builder-1" }) ?? "", /supervisor\.mjs .*\(the orchestrator's report\)/, c);
  for (const c of ["node supervisor.mjs tick", "node supervisor.mjs jobs", "node supervisor.mjs retry --order=O-1"]) assert.equal(G.bashDenial(c, 0, { role: "toy-builder-1" }), null, c);
});

// a toy company with a second lane: mgr-c manages lane c, and toy-builder-1 works in lanes s and c, three sessions at once
const { builtinSpec, validateSpec } = await import("../generator.mjs");
function twoLanes({ policy = null, b1 = {} } = {}) {
  const s = builtinSpec("toy");
  s.rooms.push({ id: "cs-studio", floor: 2, kind: "lane", lane: "c" });
  s.roles.push({ id: "mgr-c", level: "manager", reportsTo: "cos", lane: "c", room: "cs-studio", floor: 2, skills: ["manage"] });
  Object.assign(s.roles.find((r) => r.id === "toy-builder-1"), { lanes: ["s", "c"], sessions: 3, drainCap: 2, ...b1 });
  if (policy) s.policy = policy;
  return s;
}
const placed = (dir, task, { to = "mgr-live", builder = "toy-builder-1" } = {}) => {
  const id = ok(meta(dir, "order", "new", `--to=${to}`, `--title=${task}`, `--task=${task}`, "--accept=x")).order;
  ok(meta(dir, "order", "delegate", id, `--by=${to}`, `--to=${builder}`));
  return id;
};
const builderPlan = (t, role = "toy-builder-1") => t.plan.filter((x) => x.role === role);

test("M6 prep 4: a role in several lanes (spec `lanes`, keeping `lane`): delegate takes it from either lane's manager; validateSpec checks lanes, sessions, drainCap and policy", () => {
  assert.deepEqual(validateSpec(twoLanes()), []);
  const bad = (f) => { const s = twoLanes(); f(s); return validateSpec(s).join("; "); };
  assert.match(bad((s) => { s.roles.find((r) => r.id === "toy-builder-1").lanes = ["s", "x"]; }), /lane x has a lane room/);
  assert.match(bad((s) => { s.roles.find((r) => r.id === "mgr-c").lanes = ["c", "s"]; }), /only a builder works in several lanes/);
  assert.match(bad((s) => { s.roles.find((r) => r.id === "toy-builder-1").lanes = []; }), /lanes is a list of distinct lane names/);
  assert.match(bad((s) => { s.roles.find((r) => r.id === "toy-builder-1").sessions = 0; }), /sessions is a whole number 1-10/);
  assert.match(bad((s) => { s.roles.find((r) => r.id === "toy-checker").drainCap = 11; }), /drainCap is a whole number 1-10/);
  assert.match(bad((s) => { s.policy = { levelCaps: { boss: 1 } }; }), /policy.levelCaps: boss is a level/);
  assert.match(bad((s) => { s.policy = { lanes: { z: { knobs: {}, reason: "r", prediction: "p" } } }; }), /policy.lanes.z: the lane has a manager/);
  assert.match(bad((s) => { s.policy = { lanes: { s: { knobs: { maxSessions: 0 }, reason: "r", prediction: "p" } } }; }), /policy.lanes.s: maxSessions must be an integer 1-10/);
  assert.match(bad((s) => { s.policy = { host: { minFreeGB: -1 } }; }), /minFreeGB is a number from 0/);
  assert.match(bad((s) => { s.policy = { cap: 1 }; }), /policy has unknown key cap/);

  const dir = init(twoLanes({ policy: { lanes: { s: { knobs: { maxSessions: 3 }, reason: "three builders at once", prediction: "lead time holds" }, c: { knobs: { maxSessions: 2 }, reason: "r", prediction: "p" } } } }));
  // the spec's lane policies are each lane's first version, active, by its manager
  const pol = ok(meta(dir, "policy", "show", "--lane=s"));
  assert.deepEqual([pol.active, pol.versions[0].by, pol.versions[0].knobs], [1, "mgr-live", { maxSessions: 3 }]);
  assert.equal(ok(meta(dir, "policy", "show", "--lane=c")).versions[0].by, "mgr-c");
  const c1 = placed(dir, "C1", { to: "mgr-c" });
  assert.equal(orderOf(dir, c1).builder, "toy-builder-1", "the cs manager delegates to the builder of lanes s and c");
  placed(dir, "S1");
  const refused = meta(dir, "order", "delegate", ok(meta(dir, "order", "new", "--to=mgr-c", "--title=C2", "--task=C2", "--accept=x")).order, "--by=mgr-c", "--to=toy-builder-2");
  assert.equal(refused.code, 1); assert.match(refused.err, /toy-builder-2 is not in lane c/);
  // the lane channel and the delegate brief know the builder in both lanes
  const t = ok(sup(dir, "tick"));
  const d = t.plan.find((x) => x.role === "mgr-c");
  assert.ok(d?.tasks?.some((x) => x.kind === "delegate"), "C2 waits for mgr-c to delegate");
});

test("M6 prep 4+5: a role with sessions:3 gets a session per item while it has free sessions, a lane counts a two-lane session in its order's lane, and K17's levelCaps caps the builder level", () => {
  const dir = init(twoLanes({ policy: { levelCaps: { builder: 2 }, lanes: { c: { knobs: { maxSessions: 1 }, reason: "one cs session", prediction: "p" } } } }));
  const s1 = placed(dir, "S1"), s2 = placed(dir, "S2"), c1 = placed(dir, "C1", { to: "mgr-c" });
  placed(dir, "S3", { builder: "toy-builder-2" });
  let t = ok(sup(dir, "tick"));
  const b1 = builderPlan(t);
  assert.equal(b1.length, 2, "levelCaps builder 2: two sessions, not three");
  assert.ok(b1.every((p) => p.msgs.length === 1 && p.cap === 2), "one item each, drainCap 2 (room for its revise)");
  assert.equal(builderPlan(t, "toy-builder-2").length, 0, "the level is full: toy-builder-2 waits");
  // the planner's reservations: a launch holds its items (launched), its sessions count, the next plan adds none
  for (const p of b1) ok(sup(dir, "launched", "--role=toy-builder-1", `--msgs=${p.msgs.join(",")}`));
  t = ok(sup(dir, "tick"));
  assert.equal(t.plan.filter((x) => x.role.startsWith("toy-builder")).length, 0, "two builder launches live: the level is full");

  // without the level cap: three sessions, one item each; the third order is in lane c (cap 1), counted there
  const dir2 = init(twoLanes({ policy: { lanes: { c: { knobs: { maxSessions: 1 }, reason: "one cs session", prediction: "p" } } } }));
  const a = placed(dir2, "S1"), b = placed(dir2, "S2"), c = placed(dir2, "C1", { to: "mgr-c" });
  t = ok(sup(dir2, "tick"));
  const p2 = builderPlan(t);
  assert.equal(p2.length, 3);
  const ordersOf = (p) => p.msgs.map((m) => ok(meta(dir2, "queue", "toy-builder-1")).find((q) => q.msg === m)?.order);
  assert.deepEqual(p2.map(ordersOf), [[a], [b], [c]], "three lessons, three sessions");
  // a session entered under its launch id; another launch's items are not taken by its room next
  const L = (p) => { const e = ok(sup(dir2, "launched", "--role=toy-builder-1", `--msgs=${p.msgs.join(",")}`)); return `${String(e.seq).padStart(4, "0")}-toy-builder-1`; };
  const [l0, l1, l2] = p2.map(L);
  assert.equal(builderPlan(ok(sup(dir2, "tick"))).length, 0, "three launches live: the role's sessions are full");
  const agent = (lid) => ({ META_LAUNCH: lid });
  const M = path.join(HERE, "..", "meta.mjs");
  const run0 = ok(exec(dir2, M, ["room", "enter", `--msg=${p2[0].msgs[0]}`, "--role=toy-builder-1"], agent(l0))).run;
  const nx = ok(exec(dir2, M, ["room", "next", `--run=${run0}`, "--cap=2", "--evidence=e"], agent(l0)));
  assert.ok(nx.session_closed, `the other launches' items are left to them: ${JSON.stringify(nx)}`);
  assert.equal(ok(exec(dir2, M, ["room", "enter", `--msg=${p2[1].msgs[0]}`, "--role=toy-builder-1"], agent(l1))).order, b, "its own launch enters it");
  // the two-lane session at work on C1 is counted in lane c (maxSessions 1), not in lane s
  assert.equal(ok(exec(dir2, M, ["room", "enter", `--msg=${p2[2].msgs[0]}`, "--role=toy-builder-1"], agent(l2))).order, c);
  const c2 = placed(dir2, "C2", { to: "mgr-c" });
  const refusedC = exec(dir2, M, ["room", "enter", `--msg=${ok(meta(dir2, "queue", "toy-builder-1")).find((q) => q.order === c2).msg}`, "--role=toy-builder-1"]);
  assert.equal(refusedC.code, 1); assert.match(refusedC.err, /lane c has 1 session at work/);
  // single-session roles plan as before: toy-builder-2's one session takes both its items
  const dir3 = init("toy");
  placed(dir3, "T1", { builder: "toy-builder-2" }); placed(dir3, "T2", { builder: "toy-builder-2" });
  const p3 = builderPlan(ok(sup(dir3, "tick")), "toy-builder-2");
  assert.deepEqual(p3.map((p) => p.msgs.length), [2]);
});

test("M6 prep 5 (K17): the host guard: no session while the load passes maxLoadPerCpu x cpus or free disk is under minFreeGB; one host-hold event per change; injectable", async () => {
  const dir = init(twoLanes({ policy: { host: { maxLoadPerCpu: 2, minFreeGB: 10 } } }));
  placed(dir, "S1");
  const tickWith = (probe) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), ["tick"], { META_HOST_PROBE: JSON.stringify(probe) });
  let t = ok(tickWith({ load: 9, cpus: 4, freeGB: 50 }));
  assert.deepEqual(t.plan, [], "load 9 > 2 x 4: no session at all");
  assert.equal(t.steps.find((x) => x.step === "host")?.result, "hold");
  t = ok(tickWith({ load: 9.5, cpus: 4, freeGB: 50 }));
  assert.equal(t.steps.some((x) => x.step === "host"), false, "no new event while it stays held");
  t = ok(tickWith({ load: 1, cpus: 4, freeGB: 5 }));
  assert.deepEqual(t.plan, [], "5 GB free < 10: still held (a new reason is no new state)");
  t = ok(tickWith({ load: 1, cpus: 4, freeGB: 50 }));
  assert.equal(t.steps.find((x) => x.step === "host")?.result, "clear");
  assert.ok(builderPlan(t).length >= 1, "cleared: the builder is planned");
  const ev = events(dir, "host-hold");
  assert.deepEqual(ev.map((e) => e.held), [true, false]);
  assert.match(ev[0].why, /load 9\.00 > 2 × 4 cpus/);
  t = ok(tickWith({ load: 0.5, cpus: 4, freeGB: 2 }));
  assert.match(events(dir, "host-hold").at(-1).why, /2\.0 GB free on .* < 10 GB/);
  // in-process, with a probe function; a probe that throws holds (fail closed); no policy.host, never held
  const { make } = await import("../state.mjs");
  const { hostCheck, hostProbe } = await import("../supervisor.mjs");
  const co = make("m6", twoLanes({ policy: { host: {} } }));
  assert.equal(hostCheck(co, () => ({ load: 0, cpus: 1, freeGB: 100 })), null, "starts clear: no change, no event");
  assert.equal(hostCheck(co, () => { throw new Error("no statfs"); }).result, "hold");
  assert.match(co.data.host.why, /host probe failed: no statfs/);
  assert.equal(hostCheck(make("toy"), () => ({ load: 99, cpus: 1, freeGB: 0 })), null);
  const real = hostProbe(co);
  assert.ok(Number.isFinite(real.load) && real.cpus >= 1 && real.freeGB > 0, JSON.stringify(real));
});

test("M6 prep 6: a code stage with a run may follow ship (the integration merge), nothing else may; ${branch} is the order's worktree branch", async () => {
  const { flowProblems } = await import("../lib.mjs");
  const s = builtinSpec("toy"), st = s.flow.stages;
  const merge = { stage: "merge", signer: "code", evidence: [], run: { argv: ["node", "integrate.mjs", "--from=${branch}"] } };
  assert.deepEqual(flowProblems({ stages: [...st, merge] }), []);
  assert.deepEqual(validateSpec({ ...s, flow: { ...s.flow, stages: [...st, merge] } }), []);
  assert.deepEqual(flowProblems({ stages: [...st, { ...merge, run: undefined }] }), ["merge: only code stages with a run (an integration merge) may follow ship"]);
  assert.deepEqual(flowProblems({ stages: [...st, { stage: "after", signer: "checker", evidence: ["x"] }] }), ["after: only code stages with a run (an integration merge) may follow ship"]);
  assert.deepEqual(flowProblems({ stages: st.filter((x) => x.stage !== "ship") }), ["last stage must be ship"]);
  const o = { id: "O-1", task: "LESSON-x", slug: "x", workdir: "/tmp", workspace: { branch: "meta/m6-LESSON-x" } };
  assert.deepEqual(prepareCmd(o, merge).argv.slice(2), ["--from=meta/m6-LESSON-x"]);
  assert.deepEqual(prepareCmd({ id: "O-2", task: "T" }, merge).argv.slice(2), ["--from=${branch}"], "no worktree: as written");
});

test("M6 prep 6: the supervisor runs a code stage after ship (merge) in the same tick, and the order is done (shipped) only after it", () => {
  const s = builtinSpec("toy");
  s.flow.stages.push({ stage: "merge", signer: "code", evidence: [], run: { argv: ["node", "-e", "require('fs').writeFileSync(process.argv[1], 'merged ' + process.argv[2])", "${live}/merged.txt", "${task}"] } });
  const dir = init(s);
  const o = placed(dir, "T");
  const work = path.join(dir, "work", "T"), acc = fresh("acc");
  fs.mkdirSync(work, { recursive: true });
  fs.writeFileSync(path.join(work, "page.mjs"), "export const x = 1;\n");
  fs.writeFileSync(path.join(work, "page.test.mjs"), "import { test } from 'node:test'; test('ok', () => {});\n");
  fs.writeFileSync(path.join(acc, "T.test.mjs"), "import { test } from 'node:test'; test('accepted', () => {});\n");
  const msg = (to) => ok(meta(dir, "queue", to)).find((m) => m.order === o)?.msg;
  const b = ok(meta(dir, "room", "enter", `--msg=${msg("toy-builder-1")}`, "--role=toy-builder-1"));
  ok(meta(dir, "room", "leave", `--run=${b.run}`, "--evidence=live/work/T/"));
  ok(sup(dir, "tick", `--acceptance=${acc}`));
  const c = ok(meta(dir, "room", "enter", `--msg=${msg("pool:checker")}`, "--role=toy-checker"));
  ok(meta(dir, "room", "leave", `--run=${c.run}`, "--evidence=read it", "--verdict=pass"));
  const t = ok(sup(dir, "tick", `--acceptance=${acc}`));
  assert.deepEqual(t.steps.filter((x) => ["uat", "ship", "merge"].includes(x.step)).map((x) => x.step), ["uat", "ship", "merge"]);
  assert.equal(orderOf(dir, o).stage, "done");
  assert.equal(fs.readFileSync(path.join(dir, "merged.txt"), "utf8"), "merged T");
  const ev = state(dir).log.events, shippedAt = ev.findIndex((e) => e.type === "shipped" && e.order === o), mergedAt = ev.findIndex((e) => e.type === "advance" && e.order === o && e.stage === "merge");
  assert.ok(mergedAt >= 0 && shippedAt > mergedAt - 1, "shipped is logged when merge signs the last stage");
});

test("M6 prep 8 (review cost): ${brief_file} is the order's own brief (from its accept text), so a pack lists one brief, not 51; a reviewer's session waits waitSec for its next item", async () => {
  const { briefVars } = await import("../state.mjs");
  const accept = "LESSON alpha-one · domain math (strand geometry) · brief company/domains/briefs/math-geometry.md:12-40 (#3)\nConcept: …";
  assert.deepEqual(briefVars({ accept }), { brief_file: "company/domains/briefs/math-geometry.md" });
  assert.deepEqual(briefVars({ accept: "no brief line" }), {});
  const s = builtinSpec("toy");
  Object.assign(s.flow.stages.find((x) => x.stage === "check"), { pack: { include: ["${brief_file}", "page.mjs"], history: false } });
  Object.assign(s.roles.find((r) => r.id === "toy-checker"), { waitSec: 300, drainCap: 4 });
  assert.deepEqual(validateSpec(s), []);
  assert.match(validateSpec({ ...s, roles: s.roles.map((r) => (r.id === "toy-checker" ? { ...r, waitSec: 900 } : r)) }).join(), /waitSec is a whole number of seconds 0-540/);
  const dir = init(s);
  const o = ok(meta(dir, "order", "new", "--to=mgr-live", "--title=T", "--task=T", `--accept=${accept}`)).order;
  ok(meta(dir, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"));
  const work = path.join(dir, "work", "T");
  for (const f of ["math-geometry.md", "math-algebra.md", "cs-security.md"]) { fs.mkdirSync(path.join(work, "company/domains/briefs"), { recursive: true }); fs.writeFileSync(path.join(work, "company/domains/briefs", f), "# briefs\n"); }
  fs.writeFileSync(path.join(work, "page.mjs"), "export const x = 1;\n");
  fs.writeFileSync(path.join(work, "page.test.mjs"), "import { test } from 'node:test'; test('ok', () => {});\n");
  const msg = (to) => ok(meta(dir, "queue", to)).find((m) => m.order === o)?.msg;
  const b = ok(meta(dir, "room", "enter", `--msg=${msg("toy-builder-1")}`, "--role=toy-builder-1"));
  assert.match(b.next_with, /--wait=90 /, "a role without waitSec: as before");
  assert.equal(b.wait_means, undefined);
  ok(meta(dir, "room", "leave", `--run=${b.run}`, "--evidence=live/work/T/"));
  const t = ok(sup(dir, "tick"));
  const p = t.plan.find((x) => x.role === "toy-checker");
  assert.equal(p.cap, 4, "the role's drainCap");
  // the brief as serve writes it, from this state (state.mjs load reads the module's own live dir: rebuilt here as it does)
  const { make, rev, FIELDS } = await import("../state.mjs");
  const { briefFor } = await import("../supervisor.mjs");
  const data = JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"), rev), co = make(data.data.spec, data.data.specDef);
  for (const [k, fs_] of Object.entries(FIELDS)) for (const f of fs_) if (data[k]?.[f] !== undefined) co[k][f] = data[k][f];
  const brief = briefFor(co, p);
  assert.match(brief, /Read only these in the workdir: company\/domains\/briefs\/math-geometry\.md, page\.mjs\./);
  assert.match(brief, /it waits up to 300 s for one \(give that Bash call a timeout of at least 360000 ms\)/);
  const c = ok(meta(dir, "room", "enter", `--msg=${msg("pool:checker")}`, "--role=toy-checker"));
  assert.deepEqual(c.files, ["company/domains/briefs/math-geometry.md", "page.mjs"], "one brief file, the order's own");
  assert.match(c.next_with, /--wait=300 /);
  assert.match(c.wait_means, /Bash timeout of at least 360000 ms/);
});

test("M6 prep 9: spec exports run by code after each tick, as their role's step: `change` only when the state changed since, `tick` every tick; a failure is recorded, never holds work", () => {
  const s = builtinSpec("toy");
  const W = (id) => ["node", "-e", "require('fs').appendFileSync(process.argv[1], process.argv[2] + '\\n')", "${live}/" + id + ".log", "${stage}"];
  s.exports = [{ id: "on-change", role: "cos", every: "change", run: { argv: W("on-change") } }, { id: "every-tick", role: "cos", every: "tick", run: { argv: W("every-tick") } }, { id: "broken", role: "cos", every: "change", run: { argv: ["node", "-e", "process.exit(1)"] } }];
  assert.deepEqual(validateSpec(s), []);
  const bad = (x) => validateSpec({ ...s, exports: [x] }).join("; ");
  assert.match(bad({ id: "x", role: "founder", every: "change", run: { argv: ["node"] } }), /role founder is an agent role/);
  assert.match(bad({ id: "x", role: "cos", every: "hourly", run: { argv: ["node"] } }), /every is "change" or "tick"/);
  assert.match(bad({ id: "x", role: "cos", every: "tick", run: { argv: ["node", "inbox-export.mjs", "--write=/home/user/system-3-company/company/ops/founder-inbox.json", "--allow-main"] } }), /never writes the main checkout/);
  assert.match(bad({ id: "x", role: "cos", every: "tick", run: { argv: ["node", "x", "${slug}"] } }), /reads only \$\{live\} and \$\{stage\}/);
  assert.match(bad({ id: "x", role: "cos", every: "tick", run: { argv: ["node"], route: { a: "build" } } }), /no route|goes to build/);
  const dir = init(s);
  const lines = (id) => (fs.existsSync(path.join(dir, `${id}.log`)) ? fs.readFileSync(path.join(dir, `${id}.log`), "utf8").trim().split("\n") : []);
  let t = ok(sup(dir, "tick"));
  assert.deepEqual(t.steps.filter((x) => x.step === "export").map((x) => [x.id, x.result]), [["on-change", "pass"], ["every-tick", "pass"], ["broken", "findings"]], "first tick: each runs once");
  ok(sup(dir, "tick"));
  assert.deepEqual([lines("on-change").length, lines("every-tick").length], [1, 2], "nothing changed: only the every-tick export ran again");
  ok(meta(dir, "order", "new", "--to=mgr-live", "--title=A", "--task=A", "--accept=x"));
  ok(sup(dir, "tick"));
  assert.deepEqual([lines("on-change"), lines("every-tick").length], [["on-change", "on-change"], 3], "an order was placed: the change export ran");
  const ev = events(dir, "export");
  assert.deepEqual([...new Set(ev.map((e) => e.by))], ["cos"]);
  assert.equal(ev.filter((e) => e.id === "broken").length, 2, "a failing export is recorded and tried again on the next change");
  assert.equal(state(dir).data.exports["broken"].pass, false);
});
