import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K7 (plan 2026-10-21 §3): the per-stage commit. With spec workspace.commit, every stage that leaves is committed in the
// order's worktree by code; a [deploy] message or a staged protected path is refused (the order held until a retry);
// nothing is ever pushed. A temp git repo (with a bare remote) stands in for the company repo.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k7-"));
process.env.META_LIVE_DIR = LIVE;
const { make } = await import("../state.mjs");
const { tick, settled: await_settled } = await import("../supervisor.mjs");
const WS = await import("../workspace.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };

const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt"), REMOTE = path.join(LIVE, "remote.git");
fs.mkdirSync(path.join(REPO, "company", "constitution"), { recursive: true });
sh(REPO, "init", "-q", "-b", "main");
sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
fs.writeFileSync(path.join(REPO, "company", "constitution", "protected-paths.txt"), "# protected\ncompany/constitution/protected-paths.txt\ntests/qa/**\ntools/company.mjs\n");
fs.mkdirSync(path.join(REPO, "tests", "qa"), { recursive: true }); fs.writeFileSync(path.join(REPO, "tests", "qa", "contract.md"), "qa\n");
fs.writeFileSync(path.join(REPO, "README.md"), "company\n");
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");
spawnSync("git", ["init", "-q", "--bare", REMOTE]); sh(REPO, "remote", "add", "origin", REMOTE); sh(REPO, "push", "-q", "origin", "main");
const remoteRefs = () => sh(REMOTE, "for-each-ref", "--format=%(refname) %(objectname)");
const REMOTE_BEFORE = remoteRefs();

const WORKSPACE = { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "m4", commit: true };
function spec(workspace = WORKSPACE) {
  const s = builtinSpec("toy");
  s.flow.stages[1] = { stage: "test1", signer: "code", evidence: [], run: { argv: ["node", "-e", "process.exit(require('fs').existsSync('ok') ? 0 : 1)"] } };
  if (workspace) s.workspace = workspace;
  return s;
}
function fresh(s = spec()) {
  const co = make("ws", s);
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task, slug = `lesson-${task.toLowerCase()}`) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "a" });
  o.task = task; o.slug = slug;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}
function build(co, o) {
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  return co.rooms.leave(run, { evidence: "e" });
}
const log = (dir) => sh(dir, "log", "--format=%s", `${BASE}..HEAD`).split("\n").filter(Boolean);

test("validateWorkspace: commit is true, false or { protectedPaths }; every existing spec stays valid", () => {
  assert.equal(WS.validateWorkspace(WORKSPACE), null);
  assert.equal(WS.validateWorkspace({ ...WORKSPACE, commit: { protectedPaths: "etc/protected.txt" } }), null);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, commit: "yes" }), /commit is true, false or/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, commit: { push: true } }), /commit is true, false or/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, commit: { protectedPaths: "../x" } }), /inside the repo/);
  assert.deepEqual(validateSpec(spec()), []);
  for (const n of ["toy", "storybook", "research", "sheetco"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
  assert.ok(WS.globRe("tests/qa/**").test("tests/qa/a/b.mjs"));
  assert.equal(WS.globRe("tools/company.mjs").test("tools/companyxmjs"), false, "a dot is a dot");
});

test("every stage that leaves is committed on the order's branch, pass or revise; nothing to commit, no commit; never pushed", () => {
  const co = fresh();
  const o = order(co, "CA");
  tick(co);
  const dir = o.workdir;
  fs.writeFileSync(path.join(dir, "lesson.md"), "v1\n");
  build(co, o);
  assert.deepEqual(log(dir), [`meta: ${o.id} build lesson-ca`]);
  assert.equal(o.workspace.head, sh(dir, "rev-parse", "HEAD"));
  assert.equal(sh(dir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/m4-CA");
  assert.equal(sh(dir, "status", "--porcelain"), "", "a clean tree (reveal-fit, the QA stamp)");
  // test1 (a code stage) fails: the revise leaves test1, but it changed nothing, so no empty commit
  assert.equal(tick(co).find((s) => s.step === "test1").result, "revise");
  assert.equal(log(dir).length, 1);
  fs.writeFileSync(path.join(dir, "ok"), ""); fs.writeFileSync(path.join(dir, "lesson.md"), "v2\n");
  build(co, o);
  tick(co);
  assert.equal(o.stage, "check");
  assert.deepEqual(log(dir), [`meta: ${o.id} build lesson-ca`, `meta: ${o.id} build lesson-ca`]);
  // a checker's notes are committed under its stage
  const m = co.mailbox.queue("pool:checker", "work").find((x) => x.ref === o.id);
  const checker = co.org.byLevel("checker")[0].id;
  const { run } = co.rooms.enter({ msg: m.id, role: checker });
  fs.writeFileSync(path.join(dir, "review.md"), "fine\n");
  co.rooms.leave(run, { evidence: "review.md" });
  assert.equal(log(dir)[0], `meta: ${o.id} check lesson-ca`);
  assert.equal(co.log.events.filter((e) => e.type === "commit" && e.order === o.id).length, 3);
  assert.equal(remoteRefs(), REMOTE_BEFORE, "nothing reaches the remote");
  assert.equal(sh(REPO, "rev-parse", "main"), BASE, "the repo's own branch is untouched");
});

test("refused: a staged protected path (as of the base commit) holds the order, unstaged, until undone and retried", () => {
  const co = fresh();
  const o = order(co, "CP");
  tick(co);
  const dir = o.workdir;
  fs.writeFileSync(path.join(dir, "lesson.md"), "x\n");
  fs.appendFileSync(path.join(dir, "tests", "qa", "contract.md"), "weakened\n");
  // the worktree's own copy is the agent's to edit: emptying it does not lift the rule
  fs.writeFileSync(path.join(dir, "company", "constitution", "protected-paths.txt"), "");
  build(co, o);
  assert.equal(o.stage, "test1", "the stage was signed");
  assert.equal(log(dir).length, 0, "nothing committed");
  assert.equal(o.stageError.kind, "workspace");
  assert.match(o.stageError.why, /^workspace: commit after build: the order's branch would change protected paths company\/constitution\/protected-paths.txt, tests\/qa\/contract.md since its base/);
  assert.equal(sh(dir, "diff", "--cached", "--name-only"), "", "what was staged is unstaged");
  assert.ok(fs.readFileSync(path.join(dir, "lesson.md"), "utf8"), "the work tree is left as it was");
  assert.equal(co.log.events.filter((e) => e.type === "commit-refused").length, 1);
  assert.equal(tick(co).filter((s) => s.order === o.id).length, 0, "held: test1 does not run");
  // a retry without undoing it: held again
  delete o.stageError;
  assert.equal(tick(co).find((s) => s.order === o.id).result, "stage-error");
  // undone, then retried: the tick commits the build stage, then test1 runs
  sh(dir, "checkout", "--", "tests/qa/contract.md", "company/constitution/protected-paths.txt");
  delete o.stageError;
  fs.writeFileSync(path.join(dir, "ok"), "");
  const steps = tick(co);
  assert.deepEqual(steps.find((s) => s.step === "commit").result, "committed");
  assert.equal(o.workspace.pendingCommit, undefined);
  assert.deepEqual(log(dir).slice(-1), [`meta: ${o.id} build lesson-cp`]);
  assert.equal(steps.find((s) => s.step === "test1").result, "pass");
  // a protected path moved away (a rename) is caught too
  const p = order(co, "CR"); tick(co);
  sh(p.workdir, "mv", "tests/qa/contract.md", "contract.md");
  build(co, p);
  assert.match(p.stageError.why, /protected paths tests\/qa\/contract.md/);
});

test("refused: a [deploy] message (the slug is an agent's text); no commit setting: no commits, as before K7", () => {
  const co = fresh();
  const o = order(co, "CD", "x-[Deploy]");
  tick(co);
  fs.writeFileSync(path.join(o.workdir, "lesson.md"), "x\n");
  build(co, o);
  assert.match(o.stageError.why, /commit message "meta: O-\d+ build x-\[Deploy\]" names \[deploy\]/);
  assert.equal(log(o.workdir).length, 0);
  assert.equal(sh(o.workdir, "diff", "--cached", "--name-only"), "", "nothing was staged");
  const plain = fresh(spec({ ...WORKSPACE, commit: undefined }));
  const p = order(plain, "CN"); tick(plain);
  fs.writeFileSync(path.join(p.workdir, "lesson.md"), "x\n");
  build(plain, p);
  assert.equal(log(p.workdir).length, 0);
  assert.equal(p.stageError, undefined);
  assert.equal(remoteRefs(), REMOTE_BEFORE);
});

test("a builder who switched branch: the commit is not made on the wrong branch, the order is held", () => {
  const co = fresh();
  const o = order(co, "CB"); tick(co);
  sh(o.workdir, "checkout", "-q", "-b", "elsewhere");
  fs.writeFileSync(path.join(o.workdir, "lesson.md"), "x\n");
  build(co, o);
  assert.match(o.stageError.why, /is on branch elsewhere, not meta\/m4-CB/);
  assert.equal(sh(o.workdir, "rev-parse", "elsewhere"), BASE);
});

test("the CLI: `room leave` reports the stage's commit, or the hold", () => {
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k7-cli-"));
  const env = { ...process.env, META_LIVE_DIR: live };
  delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const f = path.join(live, "ws.json");
  fs.writeFileSync(f, JSON.stringify({ ...spec({ ...WORKSPACE, root: path.join(live, "wt") }), name: "ws" }));
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0, "init");
  const o = run("meta.mjs", "order", "new", "--to=mgr-live", "--title=t", "--task=CC", "--accept=a").out.order;
  assert.equal(run("meta.mjs", "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1").code, 0);
  assert.equal(run("supervisor.mjs", "tick").code, 0);
  const q = run("meta.mjs", "queue", "toy-builder-1").out;
  const p = run("meta.mjs", "room", "enter", `--msg=${q[0].msg}`, "--role=toy-builder-1").out;
  const dir = path.join(live, "wt", "CC");
  fs.writeFileSync(path.join(dir, "lesson.md"), "x\n");
  const l = run("meta.mjs", "room", "leave", `--run=${p.run}`, "--evidence=lesson.md");
  assert.equal(l.code, 0, l.err);
  assert.equal(l.out.commit, sh(dir, "rev-parse", "HEAD"));
  assert.equal(sh(dir, "log", "-1", "--format=%s"), `meta: ${o} build CC`);
  assert.equal(run("meta.mjs", "events", "--type=commit").out.length, 1, "the commit event was saved");
  // K7 review: a later stage that changed nothing reports no commit (null), not the earlier stage's sha as its own
  assert.equal(run("supervisor.mjs", "tick").code, 0); // test1 finds no `ok`: back to build
  const q2 = run("meta.mjs", "queue", "toy-builder-1").out;
  const p2 = run("meta.mjs", "room", "enter", `--msg=${q2[0].msg}`, "--role=toy-builder-1").out;
  const l2 = run("meta.mjs", "room", "leave", `--run=${p2.run}`, "--evidence=nothing");
  assert.equal(l2.code, 0, l2.err);
  assert.equal(l2.out.commit, null);
  assert.equal(sh(dir, "rev-parse", "HEAD"), l.out.commit);
  assert.equal(remoteRefs(), REMOTE_BEFORE);
});

test("K7 review: an agent's own commits on the branch are checked too: a [deploy] message, a protected path, since the base", () => {
  const co = fresh();
  const o = order(co, "CG"); tick(co);
  const dir = o.workdir;
  // the reviewer's probe: a protected file edited with sed (the K10 guard denies only Write/Edit), then committed by hand
  fs.appendFileSync(path.join(dir, "tests", "qa", "contract.md"), "weakened\n");
  sh(dir, "commit", "-qam", "[deploy] mine");
  fs.writeFileSync(path.join(dir, "lesson.md"), "x\n");
  build(co, o);
  assert.match(o.stageError.why, /^workspace: commit after build: commit [0-9a-f]+ on meta\/m4-CG names \[deploy\]/);
  assert.deepEqual(log(dir), ["[deploy] mine"], "the kernel committed nothing on top");
  assert.equal(sh(dir, "diff", "--cached", "--name-only"), "", "unstaged");
  // the message rewritten, the protected change kept: still refused, on the path, though nothing staged touches it
  sh(dir, "commit", "-q", "--amend", "-m", "mine");
  delete o.stageError;
  tick(co);
  assert.match(o.stageError.why, /the order's branch would change protected paths tests\/qa\/contract.md since its base/);
  assert.deepEqual(log(dir), ["mine"]);
  // and with nothing left to stage (the agent committed everything itself), the checks still run
  sh(dir, "add", "-A"); sh(dir, "commit", "-qm", "rest");
  delete o.stageError;
  tick(co);
  assert.match(o.stageError?.why ?? "", /protected paths tests\/qa\/contract.md/, "a skipped commit is no way around the check");
  // the protected change undone in a later commit: the branch no longer changes it, so the build is accepted
  sh(dir, "checkout", BASE, "--", "tests/qa/contract.md"); sh(dir, "commit", "-qm", "undo");
  delete o.stageError;
  fs.writeFileSync(path.join(dir, "ok"), "");
  const steps = tick(co);
  assert.equal(o.workspace.pendingCommit, undefined);
  assert.equal(steps.find((s) => s.step === "commit").result, "committed");
  assert.equal(log(dir)[0], `meta: ${o.id} build lesson-cg`);
  assert.equal(remoteRefs(), REMOTE_BEFORE);
});

test("K7 review: a commit refused after the last stage (the order done) is held, and committed on the tick after a retry", () => {
  const s = spec();
  // the last stage (ship) is a release cmd that writes a protected file next to its report
  const st = s.flow.stages;
  s.flow.stages = [st[0], { ...st[1], run: { argv: ["node", "-e", "0"] } }, st[2], { stage: "ship", signer: "release", evidence: ["report.md"], run: { argv: ["node", "-e", "const f=require('fs');f.writeFileSync('report.md','r\\n');f.appendFileSync('tests/qa/contract.md','x\\n')"] } }];
  const co = fresh(s);
  const o = order(co, "CF"); tick(co);
  const dir = o.workdir;
  fs.writeFileSync(path.join(dir, "lesson.md"), "x\n");
  build(co, o);
  tick(co);
  assert.equal(o.stage, "check");
  const m = co.mailbox.queue("pool:checker", "work").find((x) => x.ref === o.id);
  co.rooms.leave(co.rooms.enter({ msg: m.id, role: co.org.byLevel("checker")[0].id }).run, { evidence: "e" });
  tick(co);
  assert.equal(o.stage, "done");
  assert.deepEqual(o.workspace.pendingCommit, { stage: "ship" });
  assert.match(o.stageError.why, /commit after ship: the order's branch would change protected paths tests\/qa\/contract.md/);
  assert.equal(await_settled(co), false, "a held last commit is work left");
  assert.equal(tick(co).filter((x) => x.order === o.id).length, 0, "held");
  sh(dir, "checkout", "--", "tests/qa/contract.md");
  delete o.stageError; // supervisor.mjs retry
  const steps = tick(co);
  assert.equal(steps.find((x) => x.step === "commit" && x.order === o.id).result, "committed");
  assert.equal(o.workspace.pendingCommit, undefined);
  assert.equal(log(dir)[0], `meta: ${o.id} ship lesson-cf`);
  assert.equal(sh(dir, "status", "--porcelain"), "");
  assert.equal(await_settled(co), true);
  assert.equal(tick(co).filter((x) => x.order === o.id).length, 0, "done, nothing left");
});
