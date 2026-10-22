import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// B6 dry run (the B6 lesson flow, run by hand on the company repo with no agent session: one order from placement to
// walk), the defects it found in the kernel, each a regression test on a vanilla repo with temp state:
//   1  the order's worktree was <root>/<task> while its branch named the run (meta/${run}-${task}), so a later run's
//      order of the same task (the M7 run, stopped, kept its worktree LESSON-eight-cores-not-eight-times on its own
//      branch) found the earlier run's checkout there and held as a workspace stage-error a retry cannot lift. Spec
//      workspace `dir` (default "${task}", as before) names the folder under root: "${run}-${task}" keeps each run's
//      checkouts apart under one root (the root has to stay inside the node_modules base, for Turbopack).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-b6dry-"));
process.env.META_LIVE_DIR = LIVE;
const { make } = await import("../state.mjs");
const WS = await import("../workspace.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };

const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt");
fs.mkdirSync(REPO, { recursive: true });
sh(REPO, "init", "-q", "-b", "main"); sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
fs.writeFileSync(path.join(REPO, "README.md"), "a vanilla shop\n");
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");

const WORKSPACE = { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, branch: "meta/${run}-${task}" };
function fresh(workspace) {
  const s = builtinSpec("toy"); s.workspace = workspace;
  const co = make("b6dry", s);
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  return o;
}

test("B6 dry run 1: workspace dir is validated: a template naming ${task}, one folder name, the branch variables only", () => {
  assert.equal(WS.validateWorkspace({ ...WORKSPACE, dir: "${run}-${task}" }), null);
  assert.equal(WS.validateWorkspace({ ...WORKSPACE, dir: "${task}" }), null);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, dir: "${run}" }), /dir is a template naming \$\{task\}/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, dir: "${run}/${task}" }), /dir is one folder name under root/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, dir: "../${task}" }), /dir is one folder name under root/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, dir: "${workdir}-${task}" }), /dir: unknown variable \$\{workdir\}/);
  assert.match(WS.validateWorkspace({ ...WORKSPACE, dir: 7 }), /dir is a template/);
  const s = builtinSpec("toy"); s.workspace = { ...WORKSPACE, dir: "${run}/${task}" };
  assert.ok(validateSpec(s).some((x) => /^workspace: dir is one folder name/.test(x)), "validateSpec reports it");
});

test("B6 dry run 1: two runs' orders of one task under one root: by default the second holds on the first's checkout; with dir ${run}-${task} each gets its own", () => {
  // run m7 (stopped: its worktree stays, on its own branch), then run b6 places an order of the same task
  const m7 = fresh({ ...WORKSPACE, run: "m7" });
  const a = WS.ensure(m7, order(m7, "LESSON-x"));
  assert.deepEqual([a.workdir, a.branch, a.created], [path.join(ROOT, "LESSON-x"), "meta/m7-LESSON-x", true]);
  const b6 = fresh({ ...WORKSPACE, run: "b6" });
  const held = WS.ensure(b6, order(b6, "LESSON-x"));
  assert.match(held.error, /LESSON-x is on branch meta\/m7-LESSON-x, not meta\/b6-LESSON-x: another order's or run's checkout/, "the default: the earlier run's checkout is refused, never reused");
  assert.equal(sh(a.workdir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/m7-LESSON-x", "and left as it was");
  // with dir: each run's own folder under the same root; the earlier run's checkout untouched
  const b6d = fresh({ ...WORKSPACE, run: "b6", dir: "${run}-${task}" });
  const o = order(b6d, "LESSON-x");
  const b = WS.ensure(b6d, o);
  assert.deepEqual([b.workdir, b.branch, b.created], [path.join(ROOT, "b6-LESSON-x"), "meta/b6-LESSON-x", true]);
  assert.equal(sh(b.workdir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/b6-LESSON-x");
  assert.equal(sh(a.workdir, "rev-parse", "--abbrev-ref", "HEAD"), "meta/m7-LESSON-x");
  assert.equal(WS.dirFor(b6d.spec.workspace, o), b.workdir, "dirFor names the same folder (the pack's workdir before ensure)");
  assert.deepEqual(WS.ensure(b6d, o), { workdir: b.workdir, branch: "meta/b6-LESSON-x", sha: BASE, created: false }, "made once, reused after");
  // a dir that fills to no single folder name (a slug with a separator) is an error, not a path outside root
  const s = fresh({ ...WORKSPACE, run: "b6", dir: "${slug}-${task}" });
  const bad = order(s, "LESSON-y"); bad.slug = "a/b";
  assert.equal(WS.dirFor(s.spec.workspace, bad), null);
  assert.match(WS.ensure(s, bad).error, /workspace dir "\$\{slug\}-\$\{task\}" does not fill to one folder name/);
  assert.equal(fs.existsSync(path.join(ROOT, "a")), false);
});
