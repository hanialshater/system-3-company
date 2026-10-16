// B3 (company/ops/dispatch-requests/2026-10-16-r2-tools.md#B3; board W-1200, W-529 first half):
// tools/commit-own.sh, tools/git-hooks/pre-commit and .claude/hooks/no-pkill.mjs.
// Every git test runs in a throwaway repo under os.tmpdir(); nothing is installed in this checkout.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { verdict } from "../../.claude/hooks/no-pkill.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const COMMIT_OWN = path.join(ROOT, "tools/commit-own.sh");
const HOOKS = path.join(ROOT, "tools/git-hooks");
const NO_PKILL = path.join(ROOT, ".claude/hooks/no-pkill.mjs");

// A clean env: no inherited S3_COMMIT_PATHS, git identity fixed, no global hooks path.
const ENV = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith("S3_") && !k.startsWith("GIT_")));
Object.assign(ENV, { GIT_AUTHOR_NAME: "test", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "test", GIT_COMMITTER_EMAIL: "t@t" });

const run = (cwd, cmd, args, extraEnv = {}) => {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", env: { ...ENV, ...extraEnv } });
  return { code: r.status, out: r.stdout, err: r.stderr };
};
const git = (cwd, ...args) => {
  const r = run(cwd, "git", args);
  if (r.code !== 0) throw new Error(`git ${args.join(" ")} failed: ${r.err}`);
  return r.out;
};
const write = (dir, f, body) => {
  fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
  fs.writeFileSync(path.join(dir, f), body);
};
const committed = (dir, rev = "HEAD") => git(dir, "show", "--name-only", "--format=", rev).split("\n").filter(Boolean).sort();
const staged = (dir) => git(dir, "diff", "--cached", "--name-only").split("\n").filter(Boolean).sort();

// A temp repo with mine.txt and theirs.txt committed. hooks: install tools/git-hooks via core.hooksPath (temp repo only).
function repo({ hooks = false } = {}) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "guards-"));
  git(d, "init", "-q", "-b", "main");
  git(d, "config", "user.name", "test");
  git(d, "config", "user.email", "t@t");
  write(d, "mine.txt", "1\n");
  write(d, "theirs.txt", "1\n");
  git(d, "add", ".");
  git(d, "commit", "-q", "-m", "init");
  if (hooks) git(d, "config", "core.hooksPath", HOOKS);
  return d;
}

// ---------- commit-own.sh ----------

test("commit-own.sh refuses when a foreign path is staged, and commits nothing", () => {
  const d = repo();
  const before = git(d, "rev-parse", "HEAD");
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  git(d, "add", "theirs.txt"); // another agent's staged work
  const r = run(d, COMMIT_OWN, ["mine", "mine.txt"]);
  assert.equal(r.code, 1, r.err);
  assert.match(r.err, /theirs\.txt/);
  assert.equal(git(d, "rev-parse", "HEAD"), before);
  assert.deepEqual(staged(d), ["theirs.txt"], "the foreign staged path is left as it was");
});

test("commit-own.sh succeeds with only listed paths, and does not sweep unstaged edits", () => {
  const d = repo();
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n"); // modified, not staged
  write(d, "dir/new.md", "x\n");
  const r = run(d, COMMIT_OWN, ["mine", "mine.txt", "dir"]);
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(committed(d), ["dir/new.md", "mine.txt"]);
  assert.match(git(d, "status", "--porcelain"), / M theirs\.txt/);
});

test("commit-own.sh rejects options in place of a message or a path", () => {
  const d = repo();
  assert.equal(run(d, COMMIT_OWN, ["-a", "mine.txt"]).code, 2);
  assert.equal(run(d, COMMIT_OWN, ["msg", "--all"]).code, 2);
  assert.equal(run(d, COMMIT_OWN, ["msg"]).code, 2);
});

// ---------- pre-commit guard (installed in the temp repo only) ----------

test("pre-commit refuses a bare commit with a foreign staged path in the main checkout", () => {
  const d = repo({ hooks: true });
  const before = git(d, "rev-parse", "HEAD");
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  git(d, "add", "mine.txt", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "-m", "bare"]);
  assert.equal(r.code, 1);
  assert.match(r.err, /refused/);
  assert.match(r.err, /theirs\.txt/);
  assert.equal(git(d, "rev-parse", "HEAD"), before);
});

test("pre-commit refuses `git commit -a` in the main checkout", () => {
  const d = repo({ hooks: true });
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  assert.equal(run(d, "git", ["commit", "-q", "-a", "-m", "all"]).code, 1);
});

test("pre-commit passes an explicit-path commit and commit-own.sh, leaving the foreign path staged", () => {
  const d = repo({ hooks: true });
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  git(d, "add", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "-m", "partial", "--", "mine.txt"]);
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(committed(d), ["mine.txt"]);
  assert.deepEqual(staged(d), ["theirs.txt"]);
  git(d, "restore", "--staged", "theirs.txt"); // the test plays the other agent here
  write(d, "mine.txt", "3\n");
  const o = run(d, COMMIT_OWN, ["own", "mine.txt"]);
  assert.equal(o.code, 0, o.err);
  assert.deepEqual(committed(d), ["mine.txt"]);
});

test("pre-commit refuses S3_COMMIT_PATHS that does not cover what is staged", () => {
  const d = repo({ hooks: true });
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  git(d, "add", "mine.txt", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "-m", "x"], { S3_COMMIT_PATHS: "mine.txt\n" });
  assert.equal(r.code, 1);
  assert.match(r.err, /outside S3_COMMIT_PATHS[\s\S]*theirs\.txt/);
});

// A conflicted merge of branch `side` into main; returns the repo with MERGE_HEAD set.
function conflictedMerge() {
  const d = repo({ hooks: true });
  git(d, "checkout", "-q", "-b", "side");
  write(d, "mine.txt", "side\n");
  write(d, "lesson.md", "new on side\n");
  git(d, "commit", "-q", "-m", "side", "--", "mine.txt"); // partial: passes the hook
  git(d, "add", "lesson.md");
  git(d, "commit", "-q", "-m", "side lesson", "--", "lesson.md");
  git(d, "checkout", "-q", "main");
  write(d, "mine.txt", "main\n");
  git(d, "commit", "-q", "-m", "main", "--", "mine.txt");
  const m = run(d, "git", ["merge", "--no-ff", "side"]);
  assert.notEqual(m.code, 0, "expected a conflict");
  write(d, "mine.txt", "resolved\n");
  git(d, "add", "mine.txt");
  return d;
}

test("pre-commit refuses `git commit --no-edit` on a merge with a foreign index, and passes it once clean", () => {
  const d = conflictedMerge();
  write(d, "theirs.txt", "staged by another agent\n");
  git(d, "add", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "--no-edit"]);
  assert.equal(r.code, 1);
  assert.match(r.err, /foreign index[\s\S]*theirs\.txt/);
  git(d, "restore", "--staged", "theirs.txt");
  const ok = run(d, "git", ["commit", "-q", "--no-edit"]);
  assert.equal(ok.code, 0, ok.err);
  assert.equal(git(d, "rev-list", "--parents", "-n1", "HEAD").trim().split(" ").length, 3, "a merge commit");
});

test("commit-own.sh commits a merge with an extra regenerated path, and refuses one with a foreign path", () => {
  const d = conflictedMerge();
  write(d, "theirs.txt", "staged by another agent\n");
  git(d, "add", "theirs.txt");
  write(d, "registry.generated.ts", "// regenerated\n");
  const bad = run(d, COMMIT_OWN, ["Merge side", "registry.generated.ts"]);
  assert.equal(bad.code, 1);
  assert.match(bad.err, /theirs\.txt/);
  git(d, "restore", "--staged", "theirs.txt");
  const ok = run(d, COMMIT_OWN, ["Merge side", "registry.generated.ts"]);
  assert.equal(ok.code, 0, ok.err);
  assert.equal(git(d, "rev-list", "--parents", "-n1", "HEAD").trim().split(" ").length, 3, "a merge commit");
  assert.match(git(d, "ls-tree", "--name-only", "HEAD"), /^registry\.generated\.ts$/m);
  assert.match(git(d, "status", "--porcelain"), /^ M theirs\.txt$/m, "the foreign edit stays in the work tree, not committed");
});

test("pre-commit passes a bare commit in a linked worktree and an empty commit in the main checkout", () => {
  const d = repo({ hooks: true });
  const wt = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "guards-wt-")), "wt");
  git(d, "worktree", "add", "-q", "-b", "wt", wt);
  write(wt, "mine.txt", "wt\n");
  write(wt, "theirs.txt", "wt\n");
  git(wt, "add", ".");
  const r = run(wt, "git", ["commit", "-q", "-m", "bare in worktree"]);
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(committed(wt), ["mine.txt", "theirs.txt"]);
  const e = run(d, "git", ["commit", "-q", "--allow-empty", "-m", "empty"]);
  assert.equal(e.code, 0, e.err);
});

// ---------- no-pkill.mjs ----------

const hook = (payload) => {
  const r = spawnSync("node", [NO_PKILL], { input: typeof payload === "string" ? payload : JSON.stringify(payload), encoding: "utf8" });
  return { code: r.status, err: r.stderr };
};
const bash = (command) => hook({ tool_name: "Bash", tool_input: { command } });

test("no-pkill.mjs refuses `pkill -f next` and names serve.sh stop and kill <pid>", () => {
  const r = bash("pkill -f next");
  assert.equal(r.code, 2);
  assert.match(r.err, /tools\/serve\.sh stop <port>/);
  assert.match(r.err, /kill <pid>/);
});

test("no-pkill.mjs allows `kill 1234` and `tools/serve.sh stop 3399`", () => {
  assert.equal(bash("kill 1234").code, 0);
  assert.equal(bash("tools/serve.sh stop 3399").code, 0);
});

test("no-pkill.mjs fails open on garbage and ignores other tools", () => {
  assert.equal(hook("not json").code, 0);
  assert.equal(hook({ tool_name: "Edit", tool_input: { file_path: "x", new_string: "pkill -f next" } }).code, 0);
});

test("verdict: pattern kills are refused wherever they sit in the command", () => {
  for (const c of [
    "pgrep -f next", "pgrep -af next", "FOO=1 timeout 5 pgrep --full next", "cd /x && pkill -f next", "sudo pkill node",
    "/usr/bin/pkill -f x", "kill $(pgrep -f next)", "kill $(pidof node)", "bash -c \"pkill -f next\"", "sh -lc 'killall node'",
    "echo \"$(pkill -f x)\"", "ps aux | grep next | awk '{print $2}' | xargs kill", "kill -9 -1", "killall node",
  ]) assert.ok(verdict(c), `should refuse: ${c}`);
});

test("verdict: quoted mentions, read-only lookups and pid kills pass", () => {
  for (const c of [
    "git commit -m \"add pkill -f hook\" -- .claude/hooks/no-pkill.mjs", "grep -n \"pkill -f\" tools/serve.sh", "echo 'pkill -f x'",
    "pgrep next", "kill -TERM 1234", "kill $(cat .serve/3399.pid)", "kill -- -4567", "killall -l", "# pkill -f next",
  ]) assert.equal(verdict(c), null, `should pass: ${c}`);
});

test("verdict: bare stash and pop are refused; tagged push, apply/drop by ref and list pass", () => {
  for (const c of ["git stash", "git stash -u", "git stash push", "git stash pop", "git stash pop stash@{0}", "git stash apply",
    "git stash drop", "git stash clear", "git stash save wip", "git -C /x stash pop", "git stash branch fix"])
    assert.ok(verdict(c), `should refuse: ${c}`);
  for (const c of ["git stash push -u -m \"b3-tag\"", "git stash -m tag", "git stash apply 3f2a9c1", "git stash drop stash@{2}",
    "git stash list --format='%H %gs'", "git stash show -p 3f2a9c1", "git status"])
    assert.equal(verdict(c), null, `should pass: ${c}`);
});
