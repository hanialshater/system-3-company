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
