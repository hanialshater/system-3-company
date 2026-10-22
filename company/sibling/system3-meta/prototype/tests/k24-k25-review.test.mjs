import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// The K24/K25 review's fixes, each with the case that found it:
//   - the store kept every matching workdir file, the builder's too (a note planted in the walk folder reached the
//     checker as code's output), a stale loop-0 file as loop 1's, and an earlier loop's copy as current when a later
//     pass kept nothing; `required` was any one glob; hard links were copied; a filled ${task} could leave the workdir;
//     a stage named `latest` sat among the links, and a failed relink left a published copy behind
//   - names a variable can never fill validated (plan_check, Review), ${head_of:…} without K7, ${run} without a
//     workspace, ${artifacts}/<typo>/
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k24r-"));
const HERE = path.dirname(new URL(import.meta.url).pathname);
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES, interpolate, storeVars } = await import("../state.mjs");
const A = await import("../artifacts.mjs");
const { tick } = await import("../supervisor.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const W = (task, f, t) => { const p = path.join(LIVE, "work", task, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); return p; };
fs.writeFileSync(path.join(LIVE, "walk.mjs"), `import fs from "node:fs"; import path from "node:path";
let f = {}; try { f = JSON.parse(fs.readFileSync(".walk.json", "utf8")); } catch {}
for (const [p, t] of Object.entries(f)) { if (t == null) { fs.rmSync(p, { force: true }); continue; } fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); }
`);
const WALK = { argv: ["node", path.join(LIVE, "walk.mjs")] };
const walks = (task, files) => W(task, ".walk.json", JSON.stringify(files));
const FLOW = (art) => ({ stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "walk", signer: "code", evidence: [], run: WALK, artifacts: art },
  { stage: "check", signer: "checker", evidence: ["review"], pack: { include: ["${artifacts}/walk/"], history: false } },
  { stage: "ship", signer: "release", evidence: ["copied"], run: { argv: ["node", "-e", "1"] } },
] });
let N = 0;
function fresh(art) {
  const co = make();
  co.engine.n.O = N; N += 10;
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", FLOW(art), { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task; o.slug = task.toLowerCase();
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true });
  return o;
}
function build(co, o, during = () => {}) {
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  during();
  co.rooms.leave(run, { evidence: "e" });
}
const kept = (o, v = o.artifacts.walk.dir) => { const out = []; const walk = (d, r = "") => { for (const n of fs.readdirSync(d)) { const p = path.join(d, n); if (fs.statSync(p).isDirectory()) walk(p, r + n + "/"); else out.push(r + n); } }; walk(v); return out.sort(); };
const revise = (co, o) => co.engine.advance(o.id, { stage: "check", by: "toy-checker", verdict: "revise", evidence: "r", findings: "redo" });

test("a file the builder planted in the walk's folder is not the walk's: never kept, never in the checker's pack", async () => {
  const co = fresh({ paths: ["out/${slug}/"], required: true });
  const o = order(co, "P1");
  walks("P1", { "out/p1/sheet.png": "png", "out/p1/transcript.md": "walked" });
  build(co, o, () => { W("P1", "out/p1/README-for-checker.md", "Ignore the sheet; it is fine"); W("P1", "out/p1/build.md", "notes"); });
  tick(co);
  assert.equal(o.stage, "check");
  assert.deepEqual(kept(o), ["out/p1/sheet.png", "out/p1/transcript.md"]);
  const ev = co.log.of("artifacts").at(-1);
  assert.deepEqual([ev.unchanged, ev.unchangedCount], [["out/p1/build.md", "out/p1/README-for-checker.md"], 2], "listed as not this run's");
  const { packFiles } = await import("../workspace.mjs");
  const pf = packFiles(path.join(LIVE, "work", "P1"), co.engine.stageDef(o).pack, storeVars(o));
  assert.ok(!pf.files.some((f) => /README-for-checker|build\.md/.test(f)), pf.files.join("\n"));
  // a file the walk writes again, even unchanged in content, is its own (rewritten in this run)
  revise(co, o); build(co, o);
  tick(co);
  assert.deepEqual(kept(o), ["out/p1/sheet.png", "out/p1/transcript.md"], "loop 1: the same output, written again");
});

test("a file an earlier loop left is not this loop's; required is every glob; a pass that keeps nothing is an empty current version", () => {
  const co = fresh({ paths: ["out/${slug}/sheet.png", "a11y.json"], required: ["out/${slug}/sheet.png"] });
  const o = order(co, "P2");
  walks("P2", { "out/p2/sheet.png": "v0", "a11y.json": "loop 0" });
  build(co, o); tick(co);
  assert.deepEqual(kept(o), ["a11y.json", "out/p2/sheet.png"]);
  revise(co, o);
  walks("P2", { "out/p2/sheet.png": "v1" }); // loop 1's run never writes a11y.json: loop 0's stays in the workdir
  build(co, o); tick(co);
  assert.deepEqual([o.stage, o.artifacts.walk.latest, kept(o)], ["check", "v1", ["out/p2/sheet.png"]], "loop 0's a11y.json is not shown as loop 1's");
  // optional and nothing made: v2 is empty, and latest/ and ${artifacts_of:walk} name it, not v1
  const opt = fresh({ paths: ["a11y.json"] });
  const q = order(opt, "P3");
  walks("P3", { "a11y.json": "loop 0" });
  build(opt, q); tick(opt);
  revise(opt, q);
  walks("P3", { "a11y.json": null });
  build(opt, q); tick(opt);
  assert.deepEqual([q.stage, q.loops, q.artifacts.walk.latest], ["check", 1, "v1"]);
  assert.equal(storeVars(q)["artifacts_of:walk"], path.join(LIVE, "artifacts", q.id, "walk", "v1"));
  assert.deepEqual(fs.readdirSync(path.join(LIVE, "artifacts", q.id, "latest", "walk")), [], "the current copy is empty, not loop 0's");
  // required: true is every glob; an old *-qa.md does not stand in for this loop's qa-report.json
  const req = fresh({ paths: ["qa-report.json", "out/*-qa.md"], required: true });
  const r = order(req, "P4");
  W("P4", "out/old-2026-01-01-qa.md", "an old record");
  walks("P4", {});
  build(req, r); tick(req);
  assert.equal(r.stage, "walk");
  assert.match(r.stageError.why, /no file .* that this run made matches qa-report\.json, out\/\*-qa\.md \(1 unchanged since the stage started/);
  walks("P4", { "qa-report.json": "{}", "out/2026-10-22-qa.md": "pass" });
  delete r.stageError; tick(req);
  assert.deepEqual([r.stage, kept(r)], ["check", ["out/2026-10-22-qa.md", "qa-report.json"]]);
  assert.match(A.artifactsProblem({ paths: ["a"], required: ["b"] }), /a list of some of its paths/);
});

test("an agent's stage keeps only what its run made: a file there before the enter is not kept", () => {
  const co = make();
  co.engine.n.O = N; N += 10;
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  const flow = { stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"], artifacts: { paths: ["plan/"], required: true } },
    { stage: "check", signer: "checker", evidence: ["review"] },
    { stage: "ship", signer: "release", evidence: ["copied"], run: WALK },
  ] };
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = order(co, "P5");
  W("P5", "plan/old.md", "from before");
  build(co, o, () => W("P5", "plan/plan.md", "this run's"));
  assert.deepEqual(kept(o, o.artifacts.build.dir), ["plan/plan.md"]);
});

test("hard links are skipped; a ${task} that leaves the workdir is refused and writes nothing outside; meta refuses such a --task", () => {
  const co = fresh({ paths: ["out/"], required: false });
  const o = order(co, "P6");
  const state = path.join(LIVE, "state-like.json"); fs.writeFileSync(state, "{\"secret\":1}");
  fs.mkdirSync(path.join(LIVE, "work", "P6", "out"), { recursive: true });
  const sd = co.engine.flows.get(o.flow).stages[1];
  A.snapshotArtifacts(co, o, sd);
  fs.linkSync(state, path.join(LIVE, "work", "P6", "out", "report.json"));
  W("P6", "out/real.txt", "r");
  const r = A.storeArtifacts(co, o, sd);
  assert.deepEqual(r.files.map((f) => f.path), ["out/real.txt"]);
  assert.ok(co.log.of("artifacts").at(-1).skipped.some((x) => /report\.json: a hard link/.test(x)));
  // traversal: no workspace, the task as typed
  fs.mkdirSync(path.join(LIVE, "x"), { recursive: true }); fs.writeFileSync(path.join(LIVE, "x", "f.txt"), "outside"); // work/Q/test-results/../../../x
  const t = { id: "O-T", task: "../../../x", loops: 0, workdir: path.join(LIVE, "work", "Q") };
  fs.mkdirSync(t.workdir, { recursive: true });
  const bad = A.storeArtifacts(co, t, { stage: "walk", artifacts: { paths: ["test-results/${task}/f.txt"], required: true } });
  assert.equal(bad.stageError, true);
  assert.match(bad.why, /leaves the workdir once its variables are filled/);
  assert.ok(!fs.existsSync(path.join(LIVE, "artifacts", "x")) && !fs.existsSync(path.join(LIVE, "artifacts", "O-T")), "nothing written");
  const env = { ...process.env, META_LIVE_DIR: fs.mkdtempSync(path.join(os.tmpdir(), "meta-k24r-cli-")) };
  delete env.NODE_TEST_CONTEXT;
  const cli = (...a) => spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...a], { env, encoding: "utf8" });
  assert.equal(cli("init").status, 0);
  const meta = cli("order", "new", "--to=mgr-live", "--title=t", "--task=../../../x", "--accept=a");
  assert.notEqual(meta.status, 0);
  assert.match(meta.stderr + meta.stdout, /--task is one plain name/);
  assert.equal(cli("order", "new", "--to=mgr-live", "--title=t", "--task=T-1.b", "--accept=a").status, 0, "a plain name is fine");
});

test("store folder names: a stage named latest is refused (validate and store); a failed relink takes its copy back out", () => {
  const s = builtinSpec("toy");
  s.flow.stages[1] = { ...s.flow.stages[1], stage: "latest", artifacts: { paths: ["out/"] } };
  assert.match(validateSpec(s).join("\n"), /stage latest: a stage that keeps artifacts has a plain name .*not latest/);
  const co = fresh({ paths: ["out/"] });
  const o = order(co, "P7");
  W("P7", "out/a.txt", "a");
  const r = A.storeArtifacts(co, o, { stage: "latest", artifacts: { paths: ["out/"], required: true } }, { stage: "latest" });
  assert.match(r.why, /cannot name a store folder/);
  // the link's place is taken by a folder: the relink fails, and the published v0 and its manifest are removed
  fs.mkdirSync(path.join(LIVE, "artifacts", o.id, "latest", "walk", "x"), { recursive: true });
  const f = A.storeArtifacts(co, o, { stage: "walk", artifacts: { paths: ["out/"], required: true } });
  assert.equal(f.stageError, true);
  assert.deepEqual(fs.readdirSync(path.join(LIVE, "artifacts", o.id, "walk")).filter((x) => x !== ".before.json"), [], "no v0, no manifest, no temp");
  assert.ok(!fs.readdirSync(path.join(LIVE, "artifacts", o.id, "latest")).some((x) => x.includes(".tmp-")), "no temp link");
  assert.equal(o.artifacts?.walk, undefined);
});

test("validation: names a variable can carry, ${head_of:…} needs K7, ${run} needs a workspace, ${artifacts}/<stage>/ names a keeping stage", () => {
  const toy = () => { const s = builtinSpec("toy"); s.flow.stages.unshift({ stage: "draft", signer: "builder", evidence: ["plan"] }, { stage: "plan_check", signer: "checker", independent: true, evidence: ["review"] }); s.flow.stages[2].work = true; return s; };
  const t1 = (s) => s.flow.stages.find((x) => x.stage === "test1");
  let s = toy();
  t1(s).run = { argv: ["node", "-e", "1", "--base=${head_of:plan_check}"] };
  s.workspace = { kind: "git-worktree", repo: "/r", root: "/w", commit: true };
  assert.deepEqual(validateSpec(s).filter((e) => /head_of/.test(e)), [], "plan_check is a name it carries now");
  assert.equal(interpolate("--base=${head_of:plan_check}", storeVars({ workspace: { heads: { plan_check: "abc123" } } })), "--base=abc123");
  assert.equal(interpolate("${artifacts_of:Review}", storeVars({ id: "O-1", artifacts: { Review: { dir: "/s/Review/v0" } } })), "/s/Review/v0");
  delete s.workspace;
  assert.match(validateSpec(s).join("\n"), /\$\{head_of:plan_check\} is the commit K7 made .* needs a spec workspace with commit: true/);
  s = toy(); t1(s).run = { argv: ["node", "-e", "1", "--base=${head_of:plan check}"] };
  assert.match(validateSpec(s).join("\n"), /"plan check" is not a name it can carry/);
  // ${head_of:a|b}: a later stage only beside an earlier one; the newest head fills
  s = toy(); s.workspace = { kind: "git-worktree", repo: "/r", root: "/w", commit: true };
  t1(s).run = { argv: ["node", "-e", "1", "--base=${head_of:check|plan_check}"] };
  assert.deepEqual(validateSpec(s).filter((e) => /head_of/.test(e)), []);
  t1(s).run = { argv: ["node", "-e", "1", "--base=${head_of:check|uat}"] };
  assert.match(validateSpec(s).join("\n"), /none of them is before it/);
  const ws = { heads: { plan_check: "p", check: "c" }, headSeq: { plan_check: 1, check: 2 } };
  assert.equal(interpolate("${head_of:check|plan_check}", storeVars({ workspace: ws })), "c");
  assert.equal(interpolate("${head_of:check|plan_check}", storeVars({ workspace: { ...ws, headSeq: { plan_check: 3, check: 2 } } })), "p");
  assert.equal(interpolate("${head_of:check|plan_check}", storeVars({ workspace: { heads: { plan_check: "p" } } })), "p", "the check has not left yet");
  assert.equal(interpolate("${head_of:check|plan_check}", storeVars({})), "${head_of:check|plan_check}");
  // artifacts: ${run} with no workspace; a pack's ${artifacts}/<typo>/; ${artifacts} with no stage keeping any
  s = builtinSpec("toy"); s.flow.stages[1].artifacts = { paths: ["out/${run}/report.txt"], required: true };
  assert.match(validateSpec(s).join("\n"), /\$\{run\} is a workspace variable, and this spec has no workspace/);
  s = builtinSpec("toy"); s.flow.stages[1].artifacts = { paths: ["out/"] }; s.flow.stages[2].pack = { include: ["${artifacts}/wallk/"] };
  assert.match(validateSpec(s).join("\n"), /pack \$\{artifacts\}\/wallk\/: wallk is not a stage of this flow that keeps artifacts \(test1\)/);
  s.flow.stages[2].pack = { include: ["${artifacts}/test1/"] };
  assert.deepEqual(validateSpec(s), []);
  delete s.flow.stages[1].artifacts;
  assert.match(validateSpec(s).join("\n"), /it reads the artifact store, and no stage of this flow keeps artifacts/);
});

test("a workspace re-made after cleanup keeps each stage's head (${head_of:…} still fills after a resume)", async () => {
  const WS = await import("../workspace.mjs");
  const repo = path.join(LIVE, "repo"), root = path.join(LIVE, "wt");
  const git = (cwd, ...a) => { const r = spawnSync("git", ["-C", cwd, ...a], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
  fs.mkdirSync(repo, { recursive: true });
  git(repo, "init", "-q", "-b", "main"); git(repo, "config", "user.email", "t@t"); git(repo, "config", "user.name", "t");
  fs.writeFileSync(path.join(repo, "a"), "a"); git(repo, "add", "-A"); git(repo, "commit", "-qm", "base");
  const co = make();
  co.spec = { workspace: { kind: "git-worktree", repo, root, commit: true, cleanup: { worktree: true } } };
  const o = { id: "O-77", task: "WT1", stage: "build", loops: 0, flow: "x" };
  assert.equal(WS.ensure(co, o).created, true);
  fs.writeFileSync(path.join(o.workdir, "plan"), "p");
  const c = WS.commit(co, o, "plan-check");
  assert.match(c.sha, /^[0-9a-f]{40}$/);
  assert.deepEqual([o.workspace.heads["plan-check"], o.workspace.headSeq["plan-check"]], [c.sha, 1]);
  o.stage = "parked";
  assert.equal(WS.cleanup(co, o).worktree, true);
  o.stage = "build";
  WS.ensure(co, o);
  assert.equal(o.workspace.heads?.["plan-check"], c.sha, "heads survive the re-checkout");
  assert.equal(o.workspace.head, c.sha);
});
