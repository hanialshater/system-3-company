import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K5 (plan 2026-10-21 §3): the order workspace. A spec `workspace` gives each order one git worktree (made once, shared by
// its stages); cmd stages run there with its env; the pack and the brief name it. A temp git repo stands in for the
// company repo.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k5-"));
process.env.META_LIVE_DIR = LIVE;
const { make, runCmdCheck, runTest1 } = await import("../state.mjs");
const { tick, briefFor } = await import("../supervisor.mjs");
const WS = await import("../workspace.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };

const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt"), NM = path.join(LIVE, "base-node_modules");
fs.mkdirSync(REPO, { recursive: true }); fs.mkdirSync(path.join(NM, "left-pad"), { recursive: true });
sh(REPO, "init", "-q", "-b", "main");
sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
fs.writeFileSync(path.join(REPO, ".gitignore"), "node_modules/\n"); // as the company's: it does not match a symlink
fs.writeFileSync(path.join(REPO, "README.md"), "company\n");
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");
fs.writeFileSync(path.join(REPO, "README.md"), "company, later\n"); sh(REPO, "commit", "-q", "-am", "later on main");

const WORKSPACE = { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, branch: "meta/${run}/${task}", run: "m4", env: { NEXT_DIST_DIR: ".next-${task}", QA_PORT: "${port}", QA_OUT: "test-results/${task}" }, nodeModules: `symlink:${NM}` };
// a code stage that reports where it ran and with which env
const PROBE = { argv: ["node", "-e", "console.log('AT ' + process.cwd() + ' ' + process.env.NEXT_DIST_DIR + ' ' + process.env.QA_PORT + ' ' + process.env.OWN); process.exit(require('fs').existsSync('ok') ? 0 : 1)", "${workdir}"], env: { OWN: "${slug}" }, findings: { fromStdout: "^AT (.*)$" } };
function spec(workspace = WORKSPACE) {
  const s = builtinSpec("toy");
  s.flow.stages[1] = { stage: "test1", signer: "code", evidence: [], run: PROBE };
  if (workspace) s.workspace = workspace;
  return s;
}
function fresh(s = spec()) {
  const co = make("ws", s);
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task, { delegate = true } = {}) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it in ${workdir}" });
  o.task = task;
  if (delegate) co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}
function build(co, o) {
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "e" });
}

test("validateWorkspace and validateSpec: the workspace fields, and every existing spec stays valid", () => {
  assert.equal(WS.validateWorkspace(WORKSPACE), null);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, kind: "copy" }), /kind is one of git-worktree/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, repo: "rel/path" }), /repo is an absolute path/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, branch: "meta/one-for-all" }), /naming \$\{task\}/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, nodeModules: "copy" }), /symlink:/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, env: { A: 1 } }), /env/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, bogus: 1 }), /unknown workspace field bogus/);
  assert.deepEqual(validateSpec(spec()), []);
  assert.ok(validateSpec(spec({ ...WORKSPACE, root: "wt" })).some((x) => /^workspace: root is an absolute path/.test(x)));
  for (const n of ["toy", "storybook", "research", "sheetco"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
});

test("ensure: one worktree per order, on its own branch from base, node_modules linked, the tree clean; made once", () => {
  const co = fresh();
  const o = order(co, "WA");
  const w = WS.ensure(co, o);
  const dir = path.join(ROOT, "WA");
  assert.deepEqual([w.workdir, w.branch, w.sha, w.created], [dir, "meta/m4/WA", BASE, true]);
  assert.equal(sh(dir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/m4/WA");
  assert.equal(fs.readFileSync(path.join(dir, "README.md"), "utf8"), "company\n", "the base commit, not main's tip");
  assert.equal(fs.realpathSync(path.join(dir, "node_modules")), fs.realpathSync(NM));
  assert.ok(fs.existsSync(path.join(dir, "node_modules", "left-pad")));
  assert.equal(sh(dir, "status", "--porcelain"), "", "the node_modules link is ignored: the checkout stays clean (reveal-fit, the QA stamp)");
  const n = Number(o.id.replace(/\D/g, ""));
  assert.deepEqual(o.workspace.env, { NEXT_DIST_DIR: ".next-WA", QA_PORT: String(3100 + n), QA_OUT: "test-results/WA" });
  assert.equal(o.workdir, dir);
  const again = WS.ensure(co, o);
  assert.equal(again.created, false);
  assert.equal(co.log.events.filter((e) => e.type === "workspace" && e.order === o.id).length, 1, "once per order");
  // a second order: its own worktree, branch and port
  const p = order(co, "WB");
  WS.ensure(co, p);
  assert.deepEqual([p.workdir, p.workspace.branch], [path.join(ROOT, "WB"), "meta/m4/WB"]);
  assert.notEqual(p.workspace.env.QA_PORT, o.workspace.env.QA_PORT);
  // a re-initialised state (a new order for the same task) reuses the worktree and branch, keeping their commits
  fs.writeFileSync(path.join(dir, "lesson.md"), "x"); sh(dir, "add", "lesson.md"); sh(dir, "commit", "-q", "-m", "work");
  const co2 = fresh(); const o2 = order(co2, "WA");
  const r = WS.ensure(co2, o2);
  assert.deepEqual([r.created, r.workdir, r.sha], [false, dir, sh(dir, "rev-parse", "HEAD")]);
  // removed by hand: made again from its branch, the work still there
  sh(REPO, "worktree", "remove", "--force", dir);
  const co3 = fresh(), o3 = order(co3, "WA");
  assert.equal(WS.ensure(co3, o3).created, true);
  assert.ok(fs.existsSync(path.join(dir, "lesson.md")), "the branch's commits survive");
  // no spec workspace: nothing changes
  const plain = fresh(spec(null));
  assert.equal(WS.ensure(plain, order(plain, "WZ")), null);
});

test("ensure refuses what it must not touch: a foreign folder, a bad task name, a bad base", () => {
  const co = fresh();
  fs.mkdirSync(path.join(ROOT, "WF"), { recursive: true }); fs.writeFileSync(path.join(ROOT, "WF", "mine.txt"), "x");
  assert.match(WS.ensure(co, order(co, "WF")).error, /exists and is not a worktree/);
  assert.match(WS.ensure(co, order(co, "../escape")).error, /cannot name a worktree/);
  const bad = fresh(spec({ ...WORKSPACE, base: "no-such-ref" }));
  assert.match(WS.ensure(bad, order(bad, "WG")).error, /git worktree add/);
});

test("tick: the worktree is made when the order has a builder; the code stage runs in it with its env; the brief names it", () => {
  const co = fresh();
  const o = order(co, "WT", { delegate: false }); o.slug = "lesson-wt";
  assert.equal(tick(co).some((s) => s.step === "workspace"), false, "no builder yet: no worktree");
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  let steps = tick(co);
  const dir = path.join(ROOT, "WT");
  assert.deepEqual(steps.filter((s) => s.step === "workspace").map((s) => [s.order, s.result]), [[o.id, "created"]]);
  assert.equal(o.workdir, dir);
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const brief = briefFor(co, { role: "toy-builder-1", msgs: [m.id], cap: 2 }, { context: "Lessons live in ${workdir}/src/demos/${slug}/." });
  assert.ok(brief.includes(`Your workdir for WT is ${dir}: a git worktree of ${REPO} on branch meta/m4/WT`), brief);
  assert.ok(brief.includes(`QA_PORT=${o.workspace.env.QA_PORT}`));
  assert.ok(brief.includes(`Lessons live in ${dir}/src/demos/lesson-wt/.`), "the context's ${workdir} and ${slug} are filled");
  build(co, o);
  steps = tick(co);
  const t = steps.find((s) => s.step === "test1");
  assert.equal(t.result, "revise");
  assert.equal(t.findings, `${fs.realpathSync(dir)} .next-WT ${o.workspace.env.QA_PORT} lesson-wt`, "cwd = the worktree, its env, the stage's own env on top");
  assert.equal(steps.filter((s) => s.step === "workspace").length, 0, "not made again");
  fs.writeFileSync(path.join(dir, "ok"), "");
  build(co, o);
  assert.equal(tick(co).find((s) => s.step === "test1").result, "pass");
  // test1 without a run cmd (the builder's tests) runs in the worktree too
  fs.writeFileSync(path.join(dir, "a.test.mjs"), `import { test } from "node:test"; test("t", () => {});\n`);
  assert.equal(runTest1(o).pass, true);
  assert.equal(runCmdCheck(o, { run: { argv: ["node", "-e", "process.exit(process.cwd() === require('fs').realpathSync(process.argv[1]) ? 0 : 1)", "${workdir}"] } }).pass, true);
});

test("tick: a git failure holds the order as a stage-error, and nothing is signed", () => {
  const co = fresh(spec({ ...WORKSPACE, base: "no-such-ref" }));
  const o = order(co, "WE");
  const steps = tick(co);
  const e = steps.find((s) => s.kind === "workspace");
  assert.deepEqual([e.order, e.result], [o.id, "stage-error"]);
  assert.match(o.stageError.why, /^workspace: git worktree add/);
  assert.equal(o.stage, "build");
  assert.equal(o.workdir, undefined);
  assert.equal(tick(co).filter((s) => s.order === o.id).length, 0, "held until a retry");
});

test("the CLI: a spec with a workspace inits, the tick makes the worktree, and `room enter` packs it", () => {
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k5-cli-"));
  const env = { ...process.env, META_LIVE_DIR: live };
  delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const f = path.join(live, "ws.json");
  fs.writeFileSync(f, JSON.stringify({ ...spec({ ...WORKSPACE, root: path.join(live, "wt"), run: undefined }), name: "ws" }));
  const bad = path.join(live, "bad.json");
  fs.writeFileSync(bad, JSON.stringify({ ...spec({ ...WORKSPACE, kind: "copy" }), name: "bad" }));
  assert.match(run("meta.mjs", "init", `--spec-file=${bad}`).err, /workspace: kind is one of git-worktree/);
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0, "init");
  const o = run("meta.mjs", "order", "new", "--to=mgr-live", "--title=t", "--task=WC", "--accept=edit ${workdir}/README.md").out.order;
  assert.equal(run("meta.mjs", "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1").code, 0);
  const t = run("supervisor.mjs", "tick");
  assert.equal(t.code, 0, t.err);
  const dir = path.join(live, "wt", "WC");
  assert.ok(JSON.stringify(t.out).includes(`${dir} (meta/${path.basename(live)}/WC at ${BASE.slice(0, 7)})`), "the run name defaults to the live dir's");
  const q = run("meta.mjs", "queue", "toy-builder-1").out;
  const p = run("meta.mjs", "room", "enter", `--msg=${q[0].msg}`, "--role=toy-builder-1");
  assert.equal(p.code, 0, p.err);
  assert.deepEqual([p.out.workdir, p.out.workdir_exists, p.out.branch, p.out.base_sha, p.out.accept], [dir + "/", true, `meta/${path.basename(live)}/WC`, BASE, `edit ${dir}/README.md`]);
  assert.equal(p.out.env.NEXT_DIST_DIR, ".next-WC");
  assert.equal(p.out.run_meta_from, path.join(HERE, ".."));
  assert.equal(fs.existsSync(path.join(live, "work", "WC")), false, "no live/work folder for a workspace order");
  assert.equal(run("meta.mjs", "events", "--type=workspace").out.length, 1, "room enter reused the tick's worktree");
});
