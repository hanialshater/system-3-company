// Tests for adapters/s3c/qa-changed.mjs (plan 2026-10-21-m4-m7-plan.md §M6 "Adapters" and exit criterion 6). The REAL
// tools/qa-changed.mjs (copied from the sandbox base, S3C_REPO, never written) runs on a fixture repo in a temp dir:
// three lessons, one importing a shared kit file, so the scope is the company's own rule, not a model of it.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "qa-changed.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const TOOL = path.join(REPO, "tools/qa-changed.mjs");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-qachanged-"));
after(() => fs.rmSync(TMP, { recursive: true, force: true }));
const env0 = () => { const e = { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" }; delete e.NODE_TEST_CONTEXT; return e; };
const git = (cwd, ...a) => execFileSync("git", ["-C", cwd, ...a], { encoding: "utf8", env: env0() }).trim();
const w = (root, rel, s) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), s); };
const run = (args) => { const r = spawnSync(process.execPath, [ADAPTER, ...args], { encoding: "utf8", env: env0() }); return { code: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)), stdout: r.stdout }; };

const FX = path.join(TMP, "repo");
const lesson = (slug, imports = "") => { w(FX, `src/demos/math/${slug}/meta.json`, JSON.stringify({ slug, domain: "math", status: "published" }) + "\n"); w(FX, `src/demos/math/${slug}/Demo.tsx`, `${imports}export default function Demo() { return null; }\n`); };
fs.mkdirSync(FX);
git(FX, "init", "-q", "-b", "main");
w(FX, "tools/qa-changed.mjs", fs.readFileSync(TOOL, "utf8"));
w(FX, "src/kit/geo.ts", "export const g = 1;\n");
lesson("uses-kit", `import { g } from "@/kit/geo";\n`); lesson("plain-one"); lesson("plain-two");
git(FX, "add", "-A"); git(FX, "commit", "-qm", "base");
const BASE = git(FX, "rev-parse", "HEAD");

test("the real tool's scope on the adapter contract: nothing changed is exit 0; a shared kit file selects its importer only; a lesson's own file selects it; --exclude and --live drop the run's own lessons", () => {
  const none = run([`--since=${BASE}`, `--repo=${FX}`]);
  assert.equal(none.code, 0, none.stdout);
  assert.deepEqual([none.json.ok, none.json.lessons, none.json.total], [true, [], 3]);
  // an order of the run adds its lesson, and touches a shared kit file
  lesson("new-one"); w(FX, "src/kit/geo.ts", "export const g = 2;\n");
  git(FX, "add", "-A"); git(FX, "commit", "-qm", "an order's merge");
  const r = run([`--since=${BASE}`, `--repo=${FX}`]);
  assert.equal(r.code, 1);
  assert.deepEqual(r.json.lessons.sort(), ["new-one", "uses-kit"]);
  assert.match(r.json.why["uses-kit"], /shared file src\/kit\/geo\.ts changed/);
  assert.match(r.stdout, /^block regression-scope: uses-kit: shared file src\/kit\/geo\.ts changed since .*: its QA runs again on the integration build$/m);
  const ex = run([`--since=${BASE}`, `--repo=${FX}`, "--exclude=new-one"]);
  assert.deepEqual([ex.json.lessons, ex.json.excluded], [["uses-kit"], ["new-one"]]);
  // --live: every order's slug in a Meta state (o.slug, else its task); M6 prep review: a lesson is left out when every
  // change to its folder since the base is on its own order's branch (new-one's commit is on meta/m6-new-one)
  git(FX, "branch", "meta/m6-new-one");
  const live = path.join(TMP, "live"); fs.mkdirSync(live);
  fs.writeFileSync(path.join(live, "state.json"), JSON.stringify({ engine: { orders: { __map: [["O-1", { id: "O-1", task: "LESSON-new-one", slug: "new-one", workspace: { branch: "meta/m6-new-one" } }], ["O-2", { id: "O-2", task: "uses-kit" }]] } } }));
  const lv = run([`--since=${BASE}`, `--repo=${FX}`, `--live=${live}`]);
  assert.equal(lv.code, 0, lv.stdout); assert.deepEqual(lv.json.excluded.sort(), ["new-one", "uses-kit"]);
  assert.equal(lv.json.sinceSha, BASE);
  // uncommitted changes are out of scope unless --worktree
  w(FX, "src/demos/math/plain-one/Demo.tsx", "export default function Demo() { return 1; }\n");
  assert.deepEqual(run([`--since=${BASE}`, `--repo=${FX}`, "--exclude=new-one,uses-kit"]).json.lessons, []);
  assert.deepEqual(run([`--since=${BASE}`, `--repo=${FX}`, "--exclude=new-one,uses-kit", "--worktree"]).json.lessons, ["plain-one"]);
  git(FX, "checkout", "--", ".");
});

test("usage and stage-errors: no --since, a bad slug, an unknown ref, a repo without the tool, an unreadable live dir", () => {
  assert.equal(run([`--repo=${FX}`]).code, 2);
  assert.equal(run([`--since=${BASE}`, `--repo=${FX}`, "--exclude=Bad_Slug"]).code, 2);
  assert.equal(run([`--since=${BASE}`, `--repo=${FX}`, "--feed=yes"]).code, 2);
  assert.equal(run(["--since=no-such-ref", `--repo=${FX}`]).code, 3);
  assert.equal(run([`--since=${BASE}`, `--repo=${TMP}`]).code, 3);
  assert.equal(run([`--since=${BASE}`, `--repo=${FX}`, `--live=${path.join(TMP, "nope")}`]).code, 3);
  // --feed reports the feed spec (the tool's feed block passes through)
  const f = run([`--since=${BASE}`, `--repo=${FX}`, "--feed"]);
  assert.equal(typeof f.json.feed?.run, "boolean");
});

test("M6 prep review: --live lists a run lesson another order changed (criterion 5); --feed reports the feed must run when lessons were added; --since that is the repo's moving HEAD is refused", () => {
  const live = path.join(TMP, "live2"); fs.mkdirSync(live);
  const before = git(FX, "rev-parse", "HEAD");
  lesson("run-a"); git(FX, "add", "-A"); git(FX, "commit", "-qm", "meta: O-1 build run-a"); git(FX, "branch", "meta/m6-run-a");
  lesson("run-b"); git(FX, "add", "-A"); git(FX, "commit", "-qm", "meta: O-2 build run-b"); git(FX, "branch", "meta/m6-run-b");
  fs.writeFileSync(path.join(live, "state.json"), JSON.stringify({ engine: { orders: { __map: [["O-1", { id: "O-1", slug: "run-a", workspace: { branch: "meta/m6-run-a" } }], ["O-2", { id: "O-2", slug: "run-b", workspace: { branch: "meta/m6-run-b" } }]] } } }));
  const clean = run([`--since=${before}`, `--repo=${FX}`, `--live=${live}`, "--feed"]);
  assert.equal(clean.code, 0, clean.stdout); assert.deepEqual(clean.json.excluded.sort(), ["run-a", "run-b"]);
  // the real tool leaves the registry out of the import graph: a wave of added lessons alone read feed.run false
  assert.equal(clean.json.feed.run, true, JSON.stringify(clean.json.feed));
  assert.match(clean.json.feed.why, /2 lessons added since .* \(run-a, run-b\)/);
  assert.match(clean.stdout, /^advisory feed: the feed spec must run \(without QA_ONLY\)/m);
  // a later commit on O-2's line edits O-1's accepted lesson: listed, with that commit, not hidden by --live
  w(FX, "src/demos/math/run-a/Demo.tsx", "// edited by another order\nexport default function Demo() { return null; }\n");
  git(FX, "add", "-A"); git(FX, "commit", "-qm", "meta: O-2 build run-b (again)");
  const bad = run([`--since=${before}`, `--repo=${FX}`, `--live=${live}`]);
  assert.equal(bad.code, 1, bad.stdout); assert.deepEqual(bad.json.lessons, ["run-a"]); assert.deepEqual(bad.json.excluded, ["run-b"]);
  assert.match(bad.json.why["run-a"], /changed since .* by [0-9a-f]{9}, not on its own order's branch meta\/m6-run-a/);
  // the moving integration branch as --since: refused (exit 2), with the sha it resolved to; a sha equal to HEAD is fine
  const head = run(["--since=main", `--repo=${FX}`]);
  assert.equal(head.code, 2, head.stdout); assert.match(head.json.findings[0].message, /--since=main is .*'s HEAD/);
  assert.equal(head.json.sinceSha, git(FX, "rev-parse", "HEAD"));
  assert.equal(run([`--since=${git(FX, "rev-parse", "HEAD")}`, `--repo=${FX}`]).code, 0);
});
