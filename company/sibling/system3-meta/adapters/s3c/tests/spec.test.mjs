// M4 integrate: the real spec (prototype/specs/s3c-lessons.json) against the adapters it drives. Two dry-run defects:
// (1) its workspace (root /home/user/s3c-wt, node_modules symlinked to the base checkout's) gave worktrees qa.mjs
// refused at once (exit 3: the symlink is outside Turbopack's root, next.config.mjs), on every order; (2) test1 ran
// gates.mjs --stage=build with neither --baseline-file nor --base, so the "no new company check errors" guard was off
// (an advisory nobody saw) and a published lesson's inherited verified claims had to be reset to unverified.
// REPO (env S3C_REPO, default /home/user/s3c-wt/base) must be a company checkout; it is never written.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { turbopackProblem } from "../lib/proc.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROTO = path.join(HERE, "..", "..", "..", "prototype");
const SPEC = JSON.parse(fs.readFileSync(path.join(PROTO, "specs", "s3c-lessons.json"), "utf8"));
const GATES = path.join(HERE, "..", "gates.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const REAL = fs.existsSync(path.join(REPO, "tools/company.mjs"));
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-spec-"));
process.env.META_LIVE_DIR = LIVE;

test("the spec validates, and its worktrees are where qa.mjs can build with the shared node_modules", async () => {
  const { validateSpec } = await import(path.join(PROTO, "generator.mjs"));
  assert.deepEqual(validateSpec(SPEC), []);
  const w = SPEC.workspace, target = w.nodeModules.slice("symlink:".length);
  // the same layout under a temp prefix: <prefix>/base/node_modules real, the order's worktree <root>/<task>, linked
  const PFX = "/home/user/s3c-wt", T = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-layout-"));
  assert.ok(w.root.startsWith(PFX) && target.startsWith(PFX), "the layout is the sandbox's");
  const at = (p) => path.join(T, p.slice(PFX.length));
  fs.mkdirSync(at(target), { recursive: true });
  const wt = (root) => { const d = path.join(root, "lesson-x"); fs.mkdirSync(d, { recursive: true }); fs.symlinkSync(at(target), path.join(d, "node_modules"), "dir"); return d; };
  assert.equal(turbopackProblem(wt(at(w.root))), null, "qa's own preflight accepts the spec's worktree");
  assert.match(turbopackProblem(wt(path.join(T, "old-root"))), /outside Turbopack's root/, "the old root (beside base) was refused");
  // the next.config.mjs rule it rests on: the Turbopack root is the part before /.claude/worktrees/
  assert.match(fs.readFileSync(path.join(REPO, "next.config.mjs"), "utf8"), /\.claude\$\{path\.sep\}worktrees/);
});

test("test1 passes the run's baseline file and the order's base: both reach the cmd as values", async () => {
  const { prepareCmd } = await import(path.join(PROTO, "state.mjs"));
  const st = SPEC.flow.stages.find((s) => s.stage === "test1");
  for (const a of ["--base=${base_sha}", "--baseline-file=${live}/baseline.json", "--baseline-repo=/home/user/s3c-wt/base"]) assert.ok(st.run.argv.includes(a), a);
  const o = { id: "O-1", task: "lesson-x", slug: "lesson-x", workdir: "/w/lesson-x", workspace: { dir: "/nonexistent/lesson-x", baseSha: "abc123", sha: "def", vars: { run: "m4" }, env: {} } };
  const p = prepareCmd(o, st);
  assert.ok(p.argv.includes("--base=abc123"), p.argv.join(" "));
  assert.ok(p.argv.includes(`--baseline-file=${LIVE}/baseline.json`), p.argv.join(" "));
  assert.ok(!p.argv.some((a) => a.includes("${")), "no variable is left as text");
});

let WT = null;
after(() => { if (WT) execFileSync("git", ["-C", REPO, "worktree", "remove", "--force", WT]); });

test("real: gates --baseline-repo writes the run's baseline once, and test1's guard is on (no advisory), inherited claims kept", { skip: !REAL }, () => {
  WT = fs.mkdtempSync(path.join(os.tmpdir(), "spec-wt-")); fs.rmdirSync(WT);
  execFileSync("git", ["-C", REPO, "worktree", "add", "--detach", "-q", WT, "HEAD"]);
  const file = path.join(LIVE, "run", "baseline.json");
  // same-week-a-year-apart: verified claims at HEAD (gates.test.mjs "build with --base=HEAD inherits")
  const args = ["same-week-a-year-apart", "--stage=build", "--base=HEAD", `--baseline-file=${file}`, `--baseline-repo=${REPO}`, `--repo=${WT}`];
  const r = spawnSync(process.execPath, [GATES, ...args], { encoding: "utf8", timeout: 240_000 });
  const j = JSON.parse(r.stdout.trim().split("\n").at(-1));
  assert.ok(fs.existsSync(file), r.stdout);
  const bl = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.equal(typeof bl.errors, "number"); assert.ok(Array.isArray(bl.errorLines)); assert.equal(bl.from, REPO);
  assert.equal(j.baseline, bl.errors);
  assert.ok(!j.findings.some((f) => f.kind === "baseline"), "no advisory, and no error the base did not have");
  assert.ok(!j.findings.some((f) => f.kind === "claims" && f.severity === "block"), JSON.stringify(j.findings));
  const t = fs.statSync(file).mtimeMs;
  spawnSync(process.execPath, [GATES, ...args], { encoding: "utf8", timeout: 240_000 });
  assert.equal(fs.statSync(file).mtimeMs, t, "written once per run");
  const u = spawnSync(process.execPath, [GATES, "x-y", "--stage=build", `--baseline-repo=${REPO}`, `--repo=${WT}`], { encoding: "utf8" });
  assert.equal(u.status, 2, "--baseline-repo needs --baseline-file");
});

// M6 prep: specs/s3c-lessons-m6.json, the M4 spec extended for the M6 run (plan §M6; M4-RUN.md open defects)
const M6 = JSON.parse(fs.readFileSync(path.join(PROTO, "specs", "s3c-lessons-m6.json"), "utf8"));
const INT = "/home/user/s3c-wt/m6-int";
test("M6 spec: valid; workspace meta/m6 (run m6) under base/.claude/worktrees; lanes math and cs; the demo-builder in both, 3 sessions; reviewers batch", async () => {
  const { validateSpec } = await import(path.join(PROTO, "generator.mjs"));
  assert.deepEqual(validateSpec(M6), []);
  assert.deepEqual([M6.workspace.base, M6.workspace.run, M6.workspace.root, M6.workspace.nodeModules], ["meta/m6", "m6", SPEC.workspace.root, SPEC.workspace.nodeModules], "the same Turbopack layout as M4");
  const role = (id) => M6.roles.find((r) => r.id === id);
  assert.deepEqual([role("cm-cs").level, role("cm-cs").lane, role("cm-cs").reportsTo], ["manager", "cs", role("cm-math").reportsTo]);
  assert.deepEqual([role("demo-builder").lane, role("demo-builder").lanes, role("demo-builder").sessions], ["math", ["math", "cs"], 3]);
  for (const r of ["fact-checker", "learner-evaluator", "head-of-product"]) assert.deepEqual([role(r).drainCap, role(r).waitSec], [4, 300], r);
  assert.deepEqual(M6.policy.levelCaps, { builder: 3 });
  assert.deepEqual(M6.policy.host, { maxLoadPerCpu: 2, minFreeGB: 10 });
  assert.deepEqual(Object.fromEntries(Object.entries(M6.policy.lanes).map(([l, v]) => [l, v.knobs])), { math: { maxSessions: 4 }, cs: { maxSessions: 4 } });
  assert.deepEqual(M6.approvals.standing, [{ action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy|child-safety", record: "AMD-015" }]);
  // every adapter the spec runs exists at its absolute path
  const cmds = [...M6.flow.stages.flatMap((s) => [s.run, s.post, s.pre].filter(Boolean)), ...M6.exports.map((x) => x.run)];
  for (const c of cmds) assert.ok(fs.existsSync(c.argv[1]), c.argv[1]);
  // the flow: M4's nine stages, then merge (code, last); M4's stages unchanged but for the M6 wiring
  assert.deepEqual(M6.flow.stages.map((s) => s.stage), [...SPEC.flow.stages.map((s) => s.stage), "merge"]);
});

test("M6 spec wiring: holds.mjs as build's pre; test1's baseline from the integration worktree; the check pack names the order's own brief; merge runs integrate.mjs with ${branch}; the inbox export writes the integration worktree", async () => {
  const st = (n) => M6.flow.stages.find((s) => s.stage === n);
  assert.match(st("build").pre.argv.join(" "), /holds\.mjs \$\{slug\} --repo=\$\{workdir\}$/);
  assert.deepEqual(st("build").pre.route, { '"route":"park"': "park" });
  assert.ok(st("test1").run.argv.includes(`--baseline-repo=${INT}`));
  assert.ok(st("check").pack.include.includes("${brief_file}") && !st("check").pack.include.some((g) => g.includes("briefs/*")), "one brief, not 51");
  // no stage is ledger-gated: no projects.json line exists for the M6 lessons (plans/m6-orders.json says why)
  assert.ok(!JSON.stringify(M6.flow).includes("ledger-gate"));
  const { prepareCmd, briefVars } = await import(path.join(PROTO, "state.mjs"));
  const o = { id: "O-4", task: "LESSON-a-b", slug: "a-b", workdir: "/home/user/s3c-wt/base/.claude/worktrees/LESSON-a-b", workspace: { branch: "meta/m6-LESSON-a-b" }, accept: "LESSON a-b · domain math (strand geometry) · brief company/domains/briefs/math-geometry.md:30-60 (#2)" };
  assert.deepEqual(prepareCmd(o, st("merge").run).argv.slice(1), [st("merge").run.argv[1], "--into=meta/m6", "--from=meta/m6-LESSON-a-b", `--repo=${INT}`]);
  assert.equal(briefVars(o).brief_file, "company/domains/briefs/math-geometry.md");
  const [ex] = M6.exports;
  assert.deepEqual([ex.id, ex.role, ex.every], ["founder-inbox", "chief-of-staff", "change"]);
  assert.ok(ex.run.argv.includes(`--write=${INT}/company/ops/founder-inbox.json`) && ex.run.argv.includes("--commit") && !ex.run.argv.includes("--allow-main"));
  // init: the spec's lane policies are active, and cm-cs delegates a cs order to the demo-builder
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-m6-"));
  const { workspace, exports, ...noWs } = M6; // no worktree, no export: init and delegate touch neither
  fs.writeFileSync(path.join(live, "spec.json"), JSON.stringify(noWs));
  const env = { ...process.env, META_LIVE_DIR: live }; delete env.META_ROLE; delete env.NODE_TEST_CONTEXT;
  const meta = (...a) => { const r = spawnSync(process.execPath, [path.join(PROTO, "meta.mjs"), ...a], { env, encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return JSON.parse(r.stdout); };
  meta("init", `--spec-file=${path.join(live, "spec.json")}`);
  assert.equal(meta("policy", "show", "--lane=cs").versions[0].by, "cm-cs");
  const id = meta("order", "new", "--by=chief-of-staff", "--to=cm-cs", "--title=one-share-tells-nothing", "--task=LESSON-one-share-tells-nothing", "--slug=one-share-tells-nothing", "--accept=x", "--budget=3000000").order;
  assert.equal(meta("order", "delegate", id, "--by=cm-cs", "--to=demo-builder", "--budget=150000").builder, "demo-builder");
  fs.rmSync(live, { recursive: true, force: true });
});

const MERGED = process.env.S3C_MERGED ?? "/home/user/s3c-wt/merged";
test("M6 orders (plans/m6-orders.json): 10, each eligible on meta/m4-merged with 'Needs interaction-designer spec: no', its lane its domain's manager's", { skip: !fs.existsSync(path.join(MERGED, "tools/company.mjs")) }, async () => {
  const { readBrief } = await import(path.join(HERE, "..", "brief.mjs"));
  const plan = JSON.parse(fs.readFileSync(path.join(PROTO, "..", "plans", "m6-orders.json"), "utf8"));
  assert.equal(plan.orders.length, 10);
  assert.equal(new Set(plan.orders.map((o) => o.slug)).size, 10);
  const lanes = new Map(M6.roles.filter((r) => r.level === "manager").map((r) => [r.id, r.lane]));
  for (const o of plan.orders) {
    const r = readBrief(MERGED, o.file, o.slug, { lockRoots: [MERGED] });
    assert.deepEqual(r.findings.filter((f) => f.severity === "error"), [], o.slug);
    assert.equal(r.brief.needsSpec.value, "no", o.slug);
    assert.equal(lanes.get(r.managers.manager), o.lane, `${o.slug}: ordered to ${r.managers.manager}`);
    assert.ok(r.orderArgv.includes(`--slug=${o.slug}`) && r.orderArgv.includes("--by=chief-of-staff"));
  }
  for (const s of plan.skipped) assert.ok(s.reason && !plan.orders.some((o) => o.slug === s.slug), s.slug);
});
