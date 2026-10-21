import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// K5 review fixes (commit 659e453f9): a branch template that nests under an existing ref (the base checkout's meta/m4),
// a reused worktree on the wrong branch or base, the shared base checkout as a workdir, a hold that lifted when the stage
// moved while `room enter` went ahead, an interrupted add, the --wait pack lost, two template vocabularies.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k5r-"));
process.env.META_LIVE_DIR = LIVE;
const { make, runCmdCheck } = await import("../state.mjs");
const { tick, plan, briefFor } = await import("../supervisor.mjs");
const WS = await import("../workspace.mjs");
const { builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
function repo(dir, ignore = "node_modules/\n") {
  fs.mkdirSync(dir, { recursive: true });
  sh(dir, "init", "-q", "-b", "main"); sh(dir, "config", "user.email", "t@example.com"); sh(dir, "config", "user.name", "t");
  fs.writeFileSync(path.join(dir, ".gitignore"), ignore); fs.writeFileSync(path.join(dir, "README.md"), "company\n");
  sh(dir, "add", "-A"); sh(dir, "commit", "-q", "-m", "base");
  return sh(dir, "rev-parse", "HEAD");
}
const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt");
const BASE = repo(REPO);
sh(REPO, "branch", "meta/m4"); // as the real repo: the base checkout's branch
fs.mkdirSync(path.join(ROOT, "base", "node_modules"), { recursive: true }); // the plan's layout: root holds the shared base
const WORKSPACE = { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "m4", nodeModules: `symlink:${ROOT}/base/node_modules`, env: { QA_OUT: "${workdir}/out", QA_PORT: "${port}" } };
function spec(workspace = WORKSPACE, run = null) {
  const s = builtinSpec("toy");
  s.flow.stages[1] = { stage: "test1", signer: "code", evidence: [], ...(run ? { run } : {}) };
  if (workspace) s.workspace = workspace;
  return s;
}
function fresh(s = spec()) {
  const co = make("ws", s);
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "a" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}

test("branch: the default template does not nest under an existing ref; a template that does says which ref is in the way", () => {
  const co = fresh();
  const o = order(co, "BN");
  const w = WS.ensure(co, o);
  assert.equal(w.error, undefined, w.error);
  assert.equal(w.branch, "meta/m4-BN");
  assert.equal(sh(o.workdir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/m4-BN");
  const nest = fresh(spec({ ...WORKSPACE, branch: "meta/${run}/${task}" }));
  assert.match(WS.ensure(nest, order(nest, "BM")).error, /branch meta\/m4\/BM cannot be made: ref meta\/m4 exists/);
  assert.equal(fs.existsSync(path.join(ROOT, "BM")), false, "nothing made");
  // the other direction: a branch that would be a prefix of an existing one
  sh(REPO, "branch", "meta/m4-BP/old");
  assert.match(WS.ensure(co, order(co, "BP")).error, /ref meta\/m4-BP\/old exists/);
});

test("reuse: a worktree on another branch, the shared base checkout and the repo's own checkout are refused", () => {
  const co = fresh(), o = order(co, "RU");
  assert.equal(WS.ensure(co, o).created, true);
  // a re-initialised state under another run: root/RU is on meta/m4-RU, not meta/m5-RU
  const m5 = fresh(spec({ ...WORKSPACE, run: "m5" }));
  assert.match(WS.ensure(m5, order(m5, "RU")).error, /RU is on branch meta\/m4-RU, not meta\/m5-RU/);
  // the order's own worktree switched to another branch: refused, not reported as its branch
  sh(o.workdir, "checkout", "-q", "--detach");
  assert.match(WS.ensure(co, o).error, /is on a detached HEAD, not meta\/m4-RU/);
  sh(o.workdir, "checkout", "-q", "meta/m4-RU");
  assert.equal(WS.ensure(co, o).created, false);
  // a task named `base`: the shared checkout node_modules comes from (here a plain folder; a worktree in the plan)
  assert.match(WS.ensure(co, order(co, "base")).error, /is a shared checkout/);
  const top = fresh(spec({ ...WORKSPACE, root: LIVE }));
  assert.match(WS.ensure(top, order(top, "repo")).error, /is a shared checkout/);
});

test("reuse: a kept branch must start from the spec's base", () => {
  const orphan = sh(REPO, "commit-tree", `${BASE}^{tree}`, "-m", "unrelated");
  sh(REPO, "branch", "meta/m4-RB", orphan);
  const co = fresh();
  assert.match(WS.ensure(co, order(co, "RB")).error, /branch meta\/m4-RB \(at \w{7}\) does not start from base/);
});

test("an interrupted add is not taken for a worktree; a failed add leaves nothing behind", () => {
  const co = fresh(), o = order(co, "IA");
  WS.ensure(co, o);
  const gitdir = sh(o.workdir, "rev-parse", "--absolute-git-dir");
  fs.writeFileSync(path.join(gitdir, "locked"), "initializing"); // what git leaves when an add is killed mid-checkout
  const again = fresh();
  assert.match(WS.ensure(again, order(again, "IA")).error, /was interrupted/);
  fs.rmSync(path.join(gitdir, "locked"));
  const bad = fresh(spec({ ...WORKSPACE, base: "no-such-ref" }));
  assert.match(WS.ensure(bad, order(bad, "IB")).error, /git worktree add/);
  assert.equal(fs.existsSync(path.join(ROOT, "IB")), false);
  assert.equal(sh(REPO, "worktree", "list", "--porcelain").includes(path.join(ROOT, "IB")), false);
});

test("the hold: lifted only by a retry, whatever the stage; no launch is planned for it", () => {
  fs.mkdirSync(path.join(ROOT, "HO"), { recursive: true }); fs.writeFileSync(path.join(ROOT, "HO", "mine.txt"), "x");
  const co = fresh(), o = order(co, "HO");
  assert.equal(tick(co).find((s) => s.order === o.id).result, "stage-error");
  assert.equal(o.stageError.kind, "workspace");
  assert.match(WS.blocker(co, o), /^workspace: .*exists and is not a worktree/);
  assert.equal(plan(co).some((p) => p.role === "toy-builder-1"), false, "no builder launched for a held order");
  o.stage = "test1"; // the stage moved on (the builder left build) without a worktree
  assert.equal(tick(co).filter((s) => s.order === o.id).length, 0, "still held");
  o.stage = "build";
  fs.rmSync(path.join(ROOT, "HO"), { recursive: true });
  delete o.stageError; // what `supervisor.mjs retry` does
  assert.deepEqual(tick(co).filter((s) => s.order === o.id && s.step === "workspace").map((s) => s.result), ["created"]);
});

test("tick: one worktree made per tick (each add runs under the state lock)", () => {
  const co = fresh(), a = order(co, "T1"), b = order(co, "T2");
  const made = () => tick(co).filter((s) => s.step === "workspace" && s.result === "created").map((s) => s.order);
  assert.deepEqual(made(), [a.id]);
  assert.deepEqual(made(), [b.id]);
});

test("one vocabulary: ${workdir} in env, ${port} and ${run} in cmds; unknown variables refused; no workspace, no brief change", () => {
  assert.match(WS.validateWorkspace({ ...WORKSPACE, env: { X: "${nope}/x" } }), /env X: unknown variable \$\{nope\}/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, branch: "m/${workdir}/${task}" }), /branch: unknown variable \$\{workdir\}/);
  const co = fresh(spec(WORKSPACE, { argv: ["node", "-e", "console.log('P ' + process.argv[1])", "${run}:${port}:${task}"], findings: { fromStdout: "^P (.*)$" } }));
  const o = order(co, "VO");
  WS.ensure(co, o);
  assert.equal(o.workspace.env.QA_OUT, `${path.join(ROOT, "VO")}/out`);
  const t = runCmdCheck(o, co.engine.stageDef({ ...o, stage: "test1" }));
  assert.equal(t.findings, `m4:${o.workspace.env.QA_PORT}:VO`);
  const plain = fresh(spec(null)), p = order(plain, "VP");
  const m = plain.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === p.id);
  assert.ok(briefFor(plain, { role: "toy-builder-1", msgs: [m.id], cap: 1 }, { context: "Keep ${workdir} as written." }).includes("Keep ${workdir} as written."));
});

test("info/exclude is written only when git would list the node_modules link", () => {
  const r2 = path.join(LIVE, "repo2"), b2 = repo(r2, "node_modules\n"); // matches a symlink too
  const co = fresh(spec({ ...WORKSPACE, repo: r2, base: b2, root: path.join(LIVE, "wt2") })), o = order(co, "EX");
  WS.ensure(co, o);
  assert.equal(sh(o.workdir, "status", "--porcelain"), "");
  const ex = path.join(r2, ".git", "info", "exclude");
  assert.equal(fs.existsSync(ex) && fs.readFileSync(ex, "utf8").split("\n").includes("/node_modules"), false);
});

test("the CLI: `room enter` refuses a held order and keeps the hold; `room next` skips it; `room next --wait` saves the worktree it makes", async () => {
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k5r-cli-"));
  const env = { ...process.env, META_LIVE_DIR: live };
  delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const root = path.join(live, "wt");
  const f = path.join(live, "ws.json");
  fs.writeFileSync(f, JSON.stringify({ ...spec({ ...WORKSPACE, root, nodeModules: undefined }), name: "ws" }));
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0);
  const add = (task) => { const o = run("meta.mjs", "order", "new", "--to=mgr-live", "--title=t", `--task=${task}`, "--accept=a").out.order; run("meta.mjs", "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1"); return o; };
  const good = add("CG");
  fs.mkdirSync(path.join(root, "CH"), { recursive: true }); fs.writeFileSync(path.join(root, "CH", "mine.txt"), "x");
  const held = add("CH");
  const q = run("meta.mjs", "queue", "toy-builder-1").out;
  // before any tick: room enter on the held order's item finds the failure itself, refuses, and the hold is saved
  const e = run("meta.mjs", "room", "enter", `--msg=${q.find((x) => x.order === held).msg}`, "--role=toy-builder-1");
  assert.equal(e.code, 1);
  assert.match(e.out.refused, new RegExp(`order ${held} is held: workspace: .*exists and is not a worktree`));
  assert.equal(run("meta.mjs", "events", "--type=stage-error").out.filter((x) => x.order === held && x.kind === "workspace").length, 1);
  assert.equal(run("meta.mjs", "room", "enter", `--msg=${q.find((x) => x.order === held).msg}`, "--role=toy-builder-1").code, 1, "still held");
  // the good one enters (its worktree made by the gate); room next does not take the held item
  const p = run("meta.mjs", "room", "enter", `--msg=${q.find((x) => x.order === good).msg}`, "--role=toy-builder-1");
  assert.equal(p.code, 0, p.err);
  assert.deepEqual([p.out.workdir, p.out.workdir_exists, p.out.branch], [path.join(root, "CG") + "/", true, "meta/m4-CG"]);
  // room next --wait: an order delegated while the session waits is entered, and its worktree is saved with its event
  const waiting = spawn("node", [path.join(HERE, "..", "meta.mjs"), "room", "next", `--run=${p.out.run}`, "--cap=5", "--wait=20", "--evidence=e"], { env });
  let stdout = ""; waiting.stdout.on("data", (d) => { stdout += d; });
  const ended = new Promise((r) => waiting.on("close", r));
  await new Promise((r) => setTimeout(r, 1500));
  const late = add("CL");
  assert.equal(await ended, 0);
  const n = JSON.parse(stdout);
  assert.equal(n.waited, true, stdout);
  assert.deepEqual([n.order, n.workdir, n.workdir_exists], [late, path.join(root, "CL") + "/", true], "not the held order");
  const made = run("meta.mjs", "events", "--type=workspace").out.filter((x) => x.order === late);
  assert.deepEqual(made.map((x) => x.created), [true], "the --wait path saved the worktree it made");
});
