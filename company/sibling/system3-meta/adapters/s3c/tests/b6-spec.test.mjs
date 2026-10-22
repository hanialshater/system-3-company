// B6: specs/s3c-lessons-b6.json, the M6 lesson flow with the claims checked before the build (kernel K25: draft by the
// demo-builder, judged by claims-draft.mjs; plan-check by the fact-checker, judged by claims-guard.mjs) and the
// walkthrough and QA record kept in the run's store (kernel K24), which the check, learner and launch packs read.
// Read-only: no worktree, branch or integration checkout is made (meta/b6 and /home/user/s3c-wt/b6-int come later).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROTO = path.join(HERE, "..", "..", "..", "prototype");
const ADAPTERS = path.join(HERE, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(PROTO, "specs", f), "utf8"));
const B6 = read("s3c-lessons-b6.json"), M6 = read("s3c-lessons-m6.json");
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-b6-"));
process.env.META_LIVE_DIR = LIVE;
const st = (s, n) => s.flow.stages.find((x) => x.stage === n);

test("B6 validates: M6's flow with draft and plan-check before build; its roles, policy and exports are M6's", async () => {
  const { validateSpec } = await import(path.join(PROTO, "generator.mjs"));
  assert.deepEqual(validateSpec(B6), []);
  assert.deepEqual(B6.flow.stages.map((x) => x.stage), ["draft", "plan-check", ...M6.flow.stages.map((x) => x.stage)]);
  assert.deepEqual(B6.roles, M6.roles);
  assert.deepEqual(B6.policy.levelCaps, M6.policy.levelCaps);
  assert.equal(B6.flow.stages.some((x) => x.stage === "release"), false, "deploy is not in the flow");
  assert.equal(st(B6, "draft").signer, "builder");
  assert.deepEqual([st(B6, "plan-check").signer, st(B6, "plan-check").independent, st(B6, "plan-check").pack.history], [{ role: "fact-checker" }, true, false]);
});

test("B6 wiring: claims-draft judges the draft, claims-guard the plan check, test1's base is the plan check's commit; meta/b6 and b6-int throughout", () => {
  const d = st(B6, "draft"), pc = st(B6, "plan-check"), t1 = st(B6, "test1");
  assert.deepEqual(d.post.argv.slice(1), [path.join(ADAPTERS, "claims-draft.mjs"), "${slug}", "--brief=${brief_file}", "--base=HEAD", "--repo=${workdir}"]);
  assert.ok(fs.existsSync(d.post.argv[1]));
  assert.deepEqual(d.pre, st(M6, "build").pre, "a publish hold parks the order before the draft session too");
  assert.deepEqual(pc.post, st(M6, "check").post, "the plan check's post is the check's (claims-guard: status and note only, code stamps)");
  assert.deepEqual(pc.pack.include, ["src/demos/*/${slug}/meta.json", "${brief_file}", "company/roles/fact-checker.md"]);
  assert.ok(t1.run.argv.includes("--base=${head_of:plan-check}") && !t1.run.argv.includes("--base=${base_sha}"));
  const all = JSON.stringify(B6);
  assert.ok(!/m6-int|meta\/m6/.test(all), "no M6 branch or checkout");
  assert.deepEqual([B6.workspace.base, B6.workspace.run], ["meta/b6", "b6"]);
  assert.ok(st(B6, "merge").run.argv.includes("--into=meta/b6") && st(B6, "merge").run.argv.includes("--repo=/home/user/s3c-wt/b6-int"));
  assert.ok(B6.exports[0].run.argv.includes("--write=/home/user/s3c-wt/b6-int/company/ops/founder-inbox.json"));
  assert.ok(t1.run.argv.includes("--baseline-repo=/home/user/s3c-wt/b6-int"));
  assert.match(B6.context, /At draft, before any Demo\.tsx exists, write only src\/demos\/<domain>\/<slug>\/meta\.json with status `draft`/);
  assert.match(B6.context, /--verdict=revise --to=draft/);
});

test("B6 keeps qa's record and the walkthrough (required), and the check, learner and launch packs read the kept copies", () => {
  assert.deepEqual(st(B6, "walk").artifacts, { paths: ["artifacts/walkthroughs/${slug}/", "artifacts/meta-stamps/walkthrough-${slug}.json"], required: true, maxMB: 50 });
  assert.equal(st(B6, "qa").artifacts.required, true);
  assert.ok(st(B6, "qa").artifacts.paths.includes("company/reviews/${slug}/*-qa.md"));
  for (const n of ["check", "learner", "launch"]) assert.ok(st(B6, n).pack.include.includes("${artifacts}/walk/"), n);
  assert.ok(st(B6, "launch").pack.include.includes("${artifacts}/qa/"));
  assert.ok(!JSON.stringify(B6.flow.stages.map((x) => x.pack)).includes("artifacts/walkthroughs/"), "no pack reads the worktree's copy");
});

test("B6 on the kernel: a plan-check revise goes to draft, the learner's route build to build, a check revise to build; test1's base and the packs fill", async () => {
  const { reviseStageOf, workStagesOf } = await import(path.join(PROTO, "lib.mjs"));
  const { prepareCmd, storeVars } = await import(path.join(PROTO, "state.mjs"));
  const { packFiles } = await import(path.join(PROTO, "workspace.mjs"));
  const flow = B6.flow;
  assert.deepEqual(workStagesOf(flow), ["draft", "build"]);
  assert.deepEqual(["plan-check", "test1", "check", "learner", "gates", "ship"].map((s) => reviseStageOf(flow, s)), ["draft", "build", "build", "build", "build", "build"]);
  assert.deepEqual(workStagesOf(M6.flow), ["build"], "M6's flow: one work stage, every revise to build as before");
  // an order after its plan check and walk: test1's --base is the plan check's head; the check pack lists the kept walk
  const wd = path.join(LIVE, "wt", "LESSON-x");
  fs.mkdirSync(path.join(wd, "src/demos/math/x"), { recursive: true }); fs.writeFileSync(path.join(wd, "src/demos/math/x/meta.json"), "{}");
  const walk = path.join(LIVE, "artifacts", "O-1", "walk", "v0");
  fs.mkdirSync(path.join(walk, "artifacts/walkthroughs/x"), { recursive: true }); fs.writeFileSync(path.join(walk, "artifacts/walkthroughs/x/transcript.md"), "t");
  fs.mkdirSync(path.join(LIVE, "artifacts", "O-1", "latest"), { recursive: true }); fs.symlinkSync("../walk/v0", path.join(LIVE, "artifacts", "O-1", "latest", "walk"));
  const o = { id: "O-1", task: "LESSON-x", slug: "x", workdir: wd, accept: "LESSON x · brief company/domains/briefs/math.geometry.md:1-9 (#1)", artifacts: { walk: { latest: "v0", dir: walk } }, workspace: { dir: "/nonexistent", baseSha: "b".repeat(40), heads: { "plan-check": "a".repeat(40) }, vars: { run: "b6" }, env: {} } };
  const p = prepareCmd(o, st(B6, "test1"));
  assert.ok(p.argv.includes(`--base=${"a".repeat(40)}`), p.argv.join(" "));
  assert.ok(!p.argv.some((a) => a.includes("${")), "no variable is left as text");
  const vars = { ...storeVars(o), slug: "x", task: o.task, brief_file: "company/domains/briefs/math.geometry.md" };
  const pf = packFiles(wd, st(B6, "check").pack, vars);
  assert.deepEqual(pf.files, ["src/demos/math/x/meta.json", path.join(LIVE, "artifacts", "O-1", "latest", "walk", "artifacts/walkthroughs/x/transcript.md")]);
});
