import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

// K24 (M7-STATUS "Found live" 1: the design review saw no walkthroughs, which lived only in removed worktrees): a stage's
// `artifacts` are copied, when it passes, into the run's store <live>/artifacts/<order>/<stage>/v<loops>/, every loop
// kept, never through a symlink, under a size cap, atomically; an `artifacts` event names each file and its sha256.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k24-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES, prepareCmd, storeVars } = await import("../state.mjs");
const A = await import("../artifacts.mjs");
const WS = await import("../workspace.mjs");
const { tick } = await import("../supervisor.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const sha = (t) => crypto.createHash("sha256").update(t).digest("hex");
const W = (task, f, t) => { const p = path.join(LIVE, "work", task, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); return p; };

// K24 review: only what the stage's own run makes is kept, so the walk here writes its files: what `walks(task, files)`
// last set ({path: text}, read from the workdir's .walk.json; null removes the path)
fs.writeFileSync(path.join(LIVE, "walk.mjs"), `import fs from "node:fs"; import path from "node:path";
let f = {}; try { f = JSON.parse(fs.readFileSync(".walk.json", "utf8")); } catch {}
for (const [p, t] of Object.entries(f)) { if (t == null) { fs.rmSync(p, { force: true }); continue; } fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); }
`);
const WALK = { argv: ["node", path.join(LIVE, "walk.mjs")] };
const walks = (task, files) => W(task, ".walk.json", JSON.stringify(files));
const FLOW = (art) => ({ stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "walk", signer: "code", evidence: [], run: WALK, artifacts: art },
  { stage: "check", signer: "checker", evidence: ["review"], pack: { include: ["${artifacts}/walk/", "page.md"], history: false } },
  { stage: "ship", signer: "release", evidence: ["copied"], run: WALK },
] });
let N = 0; // one live dir for every company here: each starts its order ids where the last left off
function fresh(art = { paths: ["out/${slug}/", "notes/*.md"], required: true }) {
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
function build(co, o) {
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  co.rooms.leave(run, { evidence: "e" });
}

test("validation: paths are workdir-relative globs with known variables; required and maxMB typed; not on a founder stage", () => {
  assert.equal(A.artifactsProblem({ paths: ["artifacts/walkthroughs/${slug}/", "test-results/${task}/*.json"], required: true, maxMB: 5 }), null);
  assert.match(A.artifactsProblem({ paths: ["/etc/passwd"] }), /workdir-relative/);
  assert.match(A.artifactsProblem({ paths: ["../x"] }), /no \.\./);
  assert.match(A.artifactsProblem({ paths: ["a/${workdir}/b"] }), /unknown variable \$\{workdir\}/);
  assert.match(A.artifactsProblem({ paths: ["a"], maxMB: 0 }), /maxMB/);
  assert.match(A.artifactsProblem({ paths: ["a"], keep: 1 }), /unknown key keep/);
  assert.match(A.artifactsProblem({ paths: ["a"] }, { signer: "founder" }), /founder/);
  const s = builtinSpec("toy");
  s.flow.stages[1].artifacts = { paths: ["out/"], required: "yes" };
  assert.match(validateSpec(s).join("\n"), /stage test1: artifacts.required is true \(every path\), false, or a list of some of its paths/);
  s.flow.stages[1].artifacts = { paths: ["out/"] };
  s.flow.stages[2].pack = { include: ["${artifacts_of:test1}/"] };
  assert.deepEqual(validateSpec(s), [], "${artifacts_of:<an earlier stage with artifacts>} is valid in a pack");
  s.flow.stages[2].pack = { include: ["${artifacts_of:uat}/"] };
  assert.match(validateSpec(s).join("\n"), /\$\{artifacts_of:uat\} names a stage that is not before it/);
  s.flow.stages[2].pack = { include: ["${artifacts_of:build}/"] };
  assert.match(validateSpec(s).join("\n"), /stage build keeps no artifacts/);
});

test("a passing code stage stores its files: v<loops>, sha256s, latest and by-slug links, an event; symlinks never followed", () => {
  const co = fresh();
  const o = order(co, "S1");
  walks("S1", { "out/s1/sheet.png": "png-1", "out/s1/transcript.md": "walked v1\n", "notes/a.md": "note", "notes/skip.txt": "not matched" });
  for (const d of ["out/s1", "notes"]) fs.mkdirSync(path.join(LIVE, "work", "S1", d), { recursive: true });
  const outside = path.join(LIVE, "secret.txt"); fs.writeFileSync(outside, "outside the workdir");
  fs.symlinkSync(outside, path.join(LIVE, "work", "S1", "out", "s1", "leak.md"));
  fs.symlinkSync(path.dirname(outside), path.join(LIVE, "work", "S1", "notes", "dirlink"));
  build(co, o);
  const steps = tick(co);
  assert.ok(steps.some((s) => s.step === "walk" && s.result === "pass"), JSON.stringify(steps));
  const dir = path.join(LIVE, "artifacts", o.id, "walk", "v0");
  assert.deepEqual(fs.readdirSync(path.join(dir, "out", "s1")).sort(), ["sheet.png", "transcript.md"], "the symlink was not copied");
  assert.equal(fs.readFileSync(path.join(dir, "notes", "a.md"), "utf8"), "note");
  assert.ok(!fs.existsSync(path.join(dir, "notes", "skip.txt")));
  const ev = co.log.of("artifacts").at(-1);
  assert.deepEqual(ev.files.map((f) => f.path), ["notes/a.md", "out/s1/sheet.png", "out/s1/transcript.md"]);
  assert.equal(ev.files.find((f) => f.path === "out/s1/sheet.png").sha256, sha("png-1"));
  assert.ok(ev.skipped.some((x) => /leak\.md: a symlink/.test(x)) && ev.skipped.some((x) => /dirlink: a symlink/.test(x)), JSON.stringify(ev.skipped));
  const man = JSON.parse(fs.readFileSync(path.join(LIVE, "artifacts", o.id, "walk", "v0.json"), "utf8"));
  assert.equal(man.files.length, 3);
  assert.equal(fs.realpathSync(path.join(LIVE, "artifacts", o.id, "latest", "walk")), fs.realpathSync(dir));
  assert.equal(fs.realpathSync(path.join(LIVE, "artifacts", "by-slug", "s1")), fs.realpathSync(path.join(LIVE, "artifacts", o.id)));
  assert.deepEqual([o.stage, o.artifacts.walk.latest], ["check", "v0"]);
  // read back: ${artifacts}, ${artifacts_of:walk} in a cmd; the check's pack lists the store's files by absolute path
  const v = storeVars(o);
  assert.equal(v.artifacts, path.join(LIVE, "artifacts", o.id, "latest"));
  assert.equal(v["artifacts_of:walk"], dir);
  const p = prepareCmd(o, { argv: ["node", "x", "${artifacts_of:walk}", "${artifacts}", "${artifacts_of:qa}"] });
  assert.deepEqual(p.argv.slice(2), [dir, v.artifacts, "${artifacts_of:qa}"], "a stage with no copy yet stays as written");
  W("S1", "page.md", "page");
  const pf = WS.packFiles(o.workdir ?? path.join(LIVE, "work", "S1"), co.engine.stageDef(o).pack, v);
  assert.deepEqual(pf.files, ["page.md", ...["notes/a.md", "out/s1/sheet.png", "out/s1/transcript.md"].map((f) => path.join(v.artifacts, "walk", f))]);
});

test("every loop's copy is kept; the newest is latest", () => {
  const co = fresh();
  const o = order(co, "S2");
  walks("S2", { "out/s2/sheet.png": "png-v1", "notes/a.md": "n" });
  build(co, o); tick(co);
  co.engine.advance(o.id, { stage: "check", by: "toy-checker", verdict: "revise", evidence: "r", findings: "redo" });
  walks("S2", { "out/s2/sheet.png": "png-v2", "notes/a.md": "n" });
  build(co, o); tick(co);
  const root = path.join(LIVE, "artifacts", o.id, "walk");
  assert.equal(fs.readFileSync(path.join(root, "v0", "out/s2/sheet.png"), "utf8"), "png-v1", "loop 0's copy is still there");
  assert.equal(fs.readFileSync(path.join(root, "v1", "out/s2/sheet.png"), "utf8"), "png-v2");
  assert.equal(fs.readFileSync(path.join(LIVE, "artifacts", o.id, "latest", "walk", "out/s2/sheet.png"), "utf8"), "png-v2");
  assert.deepEqual(o.artifacts.walk.versions.map((x) => x.v), ["v0", "v1"]);
  assert.ok(!fs.readdirSync(root).some((f) => f.includes(".tmp")), "no temp folder left behind");
});

test("required with no match, or over maxMB, is a stage-error (nothing signed); not required, the stage passes", () => {
  const co = fresh();
  const o = order(co, "S3");
  build(co, o);
  let steps = tick(co);
  assert.equal(steps.find((s) => s.order === o.id && s.step === "walk").result, "stage-error");
  assert.deepEqual([o.stage, o.loops], ["walk", 0], "held at walk: not a pass, not a revise");
  assert.match(o.stageError.why, /required, but no file .* that this run made matches out\/s3\/, notes\/\*\.md/);
  assert.equal(co.log.of("artifacts").at(-1).error.startsWith("required"), true);
  walks("S3", { "out/s3/sheet.png": "x".repeat(2 * 2 ** 20), "notes/n.md": "n" });
  delete o.stageError; // supervisor.mjs retry
  const big = fresh({ paths: ["out/${slug}/"], required: true, maxMB: 1 });
  const b = order(big, "S3B"); walks("S3B", { "out/s3b/sheet.png": "x".repeat(2 * 2 ** 20) });
  build(big, b);
  steps = tick(big);
  assert.match(b.stageError.why, /2\.0 MB in 1 files is over maxMB 1/);
  assert.deepEqual(fs.readdirSync(path.join(LIVE, "artifacts", b.id, "walk")), [".before.json"], "nothing copied (only the note of what was there before the run)");
  steps = tick(co);
  assert.equal(o.stage, "check", "after the retry the file is there: stored and signed");
  const opt = fresh({ paths: ["out/${slug}/"] });
  const c = order(opt, "S3C");
  build(opt, c); tick(opt);
  assert.equal(c.stage, "check", "an optional artifact that is missing does not hold the stage");
  assert.match(opt.log.of("artifacts").at(-1).note, /this run made nothing that matches/);
  assert.deepEqual(fs.readdirSync(c.artifacts.walk.dir), [], "an empty version: the pass kept nothing, and says so");
});

test("an agent's stage keeps artifacts at a passing leave; a required one missing refuses the leave and keeps the run open", () => {
  const co = make();
  co.engine.n.O = N; N += 10;
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  const flow = { stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"], artifacts: { paths: ["plan/"], required: true } },
    { stage: "check", signer: "checker", evidence: ["review"] },
    { stage: "ship", signer: "release", evidence: ["copied"], run: WALK },
  ] };
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = order(co, "S4");
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role: "toy-builder-1" });
  assert.throws(() => co.rooms.leave(run, { evidence: "e" }), /artifacts: build on O-\d+: artifacts: required, but no file/);
  assert.equal(co.rooms.runs.get(run).state, "running", "the run stays open to fix");
  W("S4", "plan/plan.md", "the plan");
  co.rooms.leave(run, { evidence: "e" });
  assert.equal(o.stage, "check");
  assert.equal(fs.readFileSync(path.join(LIVE, "artifacts", o.id, "build", "v0", "plan/plan.md"), "utf8"), "the plan");
  // a revise leave keeps nothing (only what passed is kept)
  const n = co.log.of("artifacts").length;
  const c = co.mailbox.queue("pool:checker", "work").find((x) => x.ref === o.id);
  const r2 = co.rooms.enter({ msg: c.id, role: "toy-checker" });
  co.rooms.leave(r2.run, { evidence: "e", verdict: "revise", findings: "x" });
  assert.equal(co.log.of("artifacts").length, n);
});

test("workspace cleanup never deletes the store, whatever its env names", () => {
  const co = make();
  const dir = LIVE; // a worktree that (wrongly) holds the live dir: env STORE=artifacts names the store itself
  fs.mkdirSync(path.join(LIVE, "artifacts", "O-9"), { recursive: true });
  fs.writeFileSync(path.join(LIVE, "artifacts", "O-9", "keep"), "k");
  co.spec = { workspace: { kind: "git-worktree", repo: "/nonexistent", root: "/nonexistent", cleanup: { env: ["STORE", "HOLDER"], worktree: true } } };
  const o = { id: "O-9", stage: "done", loops: 0, flow: "task@v1", workdir: dir, workspace: { dir, repo: "/nonexistent", env: { STORE: "artifacts", HOLDER: "." }, branch: "b" } };
  const r = WS.cleanup(co, o);
  assert.ok(fs.existsSync(path.join(LIVE, "artifacts", "O-9", "keep")), "the store is untouched");
  assert.match(r.error, /STORE=artifacts: holds the run's artifact store/);
  assert.match(r.error, /holds the run's artifact store \(K24: cleanup never deletes it\): the worktree is left/);
  assert.equal(r.worktree, false);
  assert.equal(A.touchesStore(path.join(LIVE, "work")), false);
});
