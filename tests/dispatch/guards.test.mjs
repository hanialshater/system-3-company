// B3 (company/ops/dispatch-requests/2026-10-16-r2-tools.md#B3; board W-1200, W-529 first half):
// tools/commit-own.sh, tools/git-hooks/pre-commit and .claude/hooks/no-pkill.mjs.
// Every git test runs in a throwaway repo under os.tmpdir(); nothing is installed in this checkout.
// Run: npm run test:dispatch
import { test, after } from "node:test";
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

// Every temp dir this file makes, removed when the file's tests end (a run makes about 19, ~4 MB).
const TEMP = [];
const mkTemp = (prefix) => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  TEMP.push(d);
  return d;
};
after(() => {
  for (const d of TEMP) fs.rmSync(d, { recursive: true, force: true });
});

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
  const d = mkTemp("guards-");
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
  const wt = path.join(mkTemp("guards-wt-"), "wt");
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

// S3_GUARD_MAIN: the main-checkout git rules (W-1337) judge against a path that is no checkout, so these cases
// mean the same wherever the suite runs (also from the main checkout itself). The W-1337 tests set their own.
const hook = (payload, env = { S3_GUARD_MAIN: path.join(os.tmpdir(), "s3-no-main-checkout") }) => {
  const r = spawnSync("node", [NO_PKILL], { input: typeof payload === "string" ? payload : JSON.stringify(payload), encoding: "utf8", env: { ...process.env, ...env } });
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

// N1 (company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md): heredoc bodies are data.
// The first two are the review's reproduced false refusals, run through the hook process as the harness would.
test("N1 must-pass: a heredoc body line starting with `pkill` (hook exit 0)", () => {
  const cmd = "cat > notes.md <<'EOF'\n# Guards\npkill -f is refused by the hook; stop by exact pid.\nEOF\nls notes.md";
  assert.equal(verdict(cmd), null);
  assert.equal(bash(cmd).code, 0);
});

test("N1 must-pass: a $(cat <<'EOF' …) commit message with a line `git stash pop` (hook exit 0)", () => {
  const cmd = "git commit -m \"$(cat <<'EOF'\nN1: heredoc bodies are data\n\ngit stash pop\ndon't (really) refuse this\nEOF\n)\" -- .claude/hooks/no-pkill.mjs";
  assert.equal(verdict(cmd), null);
  assert.equal(bash(cmd).code, 0);
});

test("N1 must-refuse: a shell that reads a heredoc as commands (`cat <<EOF | sh`, `bash <<'X'`)", () => {
  const piped = "cat <<EOF | sh\npkill -f next\nEOF";
  assert.ok(verdict(piped));
  assert.equal(bash(piped).code, 2);
  for (const c of ["bash <<'X'\npkill x\nX", "cat <<'EOF' | bash -s\ngit stash pop\nEOF", "sh <<-EOF\n\tkillall node\n\tEOF"])
    assert.ok(verdict(c), `should refuse: ${JSON.stringify(c)}`);
});

test("N1: the shell still runs what follows a heredoc, and substitutions in an unquoted body", () => {
  for (const c of [
    "cat > f <<'EOF'\nhello\nEOF\npkill -f next", // after the terminator: a command again
    "cat <<-EOF > f\n\tnotes\n\tEOF\ngit stash pop", // <<- strips leading tabs from the terminator
    "cat <<EOF\nnow: $(pkill x)\nEOF", // unquoted delimiter: the shell expands $( )
    "echo $((1<<2))\npkill x", // arithmetic shift is not a heredoc
  ]) assert.ok(verdict(c), `should refuse: ${JSON.stringify(c)}`);
  for (const c of [
    "cat <<'EOF'\nnow: $(pkill x)\nEOF", // quoted delimiter: no expansion
    "cat > r.md <<'EOF'\nnever run kill $(pgrep -f next)\nEOF", // a mention of kill $(pgrep), as data
    "cat <<EOF | grep stash\ngit stash pop\nEOF", // piped to a non-shell
    "cat <<< 'pkill x'", // a here-string is a word, not a command
  ]) assert.equal(verdict(c), null, `should pass: ${JSON.stringify(c)}`);
});

// ---------- r3 B1 (company/ops/dispatch-requests/2026-10-16-r3-tools.md#B1): PE-ops follow-ups M1 and M2 ----------
// M1: during a merge git refuses a partial commit, so the pre-commit hint must not offer `git commit -m … -- <path>`.
test("M1: the merge-time refusal names only commit-own.sh and waiting for the owner of the listed paths", () => {
  const d = conflictedMerge();
  write(d, "theirs.txt", "staged by another agent\n");
  git(d, "add", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "--no-edit"]);
  assert.equal(r.code, 1);
  assert.match(r.err, /theirs\.txt/);
  assert.match(r.err, /tools\/commit-own\.sh/);
  assert.match(r.err, /wait for the owner of the listed paths/);
  assert.doesNotMatch(r.err, /git commit -m "<message>" -- /, "git refuses a partial commit during a merge");
  const own = run(d, COMMIT_OWN, ["Merge side", "mine.txt"]);
  assert.equal(own.code, 1);
  assert.match(own.err, /Wait for the owner of the listed paths/);
  assert.doesNotMatch(own.err, /git commit -m/);
});

test("M1: outside a merge the refusal still offers both commit-own.sh and an explicit-path commit", () => {
  const d = repo({ hooks: true });
  write(d, "mine.txt", "2\n");
  write(d, "theirs.txt", "2\n");
  git(d, "add", "mine.txt", "theirs.txt");
  const r = run(d, "git", ["commit", "-q", "-m", "bare"]);
  assert.equal(r.code, 1);
  assert.match(r.err, /tools\/commit-own\.sh/);
  assert.match(r.err, /git commit -m "<message>" -- <path>/);
});

// M2 (answer on W-529): port kills are refused and pointed at serve.sh stop; lookups and pid kills pass.
test("M2: port kills are refused and name tools/serve.sh stop <port>", () => {
  for (const c of [
    "kill $(lsof -t -i:3591)", "kill -9 $(lsof -t -i:3591)", "kill -9 `lsof -ti tcp:3591`", "kill $(fuser 3591/tcp 2>/dev/null)",
    "fuser -k 3591/tcp", "fuser -km 3591/tcp", "sudo fuser --kill 3591/tcp", "lsof -t -i | xargs kill",
    "lsof -t -i:3591 | xargs kill", "lsof -ti:3591 | xargs -r kill -9", "cd /x && kill -9 $(lsof -t -i:3000)",
  ]) {
    const v = verdict(c);
    assert.ok(v, `should refuse: ${c}`);
    assert.match(v, /tools\/serve\.sh stop <port>/, `names serve.sh stop: ${c}`);
  }
  const r = bash("kill $(lsof -t -i:3591)");
  assert.equal(r.code, 2);
  assert.match(r.err, /tools\/serve\.sh stop <port>/);
});

test("M2: plain kill <pid>, port lookups and serve.sh stop pass", () => {
  for (const c of [
    "kill 1234", "kill -9 1234", "lsof -i:3591", "lsof -t -i:3591", "fuser 3591/tcp", "tools/serve.sh stop 3591",
    "kill $(cat .serve/3591.pid)", "grep -n \"fuser -k\" tools/serve.sh", "echo 'kill $(lsof -t -i:3591)'",
  ]) assert.equal(verdict(c), null, `should pass: ${c}`);
  for (const c of ["kill 1234", "lsof -i:3591", "tools/serve.sh stop 3591"]) assert.equal(bash(c).code, 0, c);
});

// ---------- W-1337 (batch company/ops/dispatch-requests/2026-10-16-r5-tools.md#B1): shared-checkout git guard ----------
// A tmp "main" checkout with branch `side` one commit off `main`, plus a linked worktree; core.hooksPath = tools/git-hooks
// is set after the commits (so pre-commit's main-checkout rules do not get in the way of the setup).
function rebaseRepo() {
  const d = repo();
  git(d, "checkout", "-q", "-b", "side");
  write(d, "side.txt", "s\n");
  git(d, "add", "side.txt");
  git(d, "commit", "-q", "-m", "side");
  git(d, "checkout", "-q", "main");
  write(d, "upstream.txt", "u\n");
  git(d, "add", "upstream.txt");
  git(d, "commit", "-q", "-m", "upstream");
  git(d, "checkout", "-q", "side");
  git(d, "config", "core.hooksPath", HOOKS);
  return d;
}
// Another agent's work in flight: one staged edit, one unstaged edit, one staged new file.
function workInFlight(d) {
  write(d, "mine.txt", "staged edit\n");
  write(d, "added.txt", "staged new file\n");
  git(d, "add", "mine.txt", "added.txt");
  write(d, "theirs.txt", "unstaged edit\n");
}
function assertWorkInPlace(d) {
  assert.equal(fs.readFileSync(path.join(d, "mine.txt"), "utf8"), "staged edit\n");
  assert.equal(fs.readFileSync(path.join(d, "theirs.txt"), "utf8"), "unstaged edit\n");
  assert.equal(fs.readFileSync(path.join(d, "added.txt"), "utf8"), "staged new file\n");
  assert.deepEqual(staged(d), ["added.txt", "mine.txt"], "staged edits are staged again");
  assert.deepEqual(git(d, "diff", "--name-only").split("\n").filter(Boolean), ["theirs.txt"], "the unstaged edit is unstaged");
}
const stashList = (d) => git(d, "stash", "list", "--format=%gs").split("\n").filter(Boolean);
const noRebaseState = (d) => {
  for (const s of ["rebase-merge", "rebase-apply"]) assert.ok(!fs.existsSync(path.join(d, ".git", s)), `.git/${s} removed`);
};

test("W-1337 pre-rebase: `rebase --autostash` in the main checkout is refused; staged + unstaged edits stay, one listed stash kept", () => {
  const d = rebaseRepo();
  const head = git(d, "rev-parse", "HEAD");
  workInFlight(d);
  const r = run(d, "git", ["rebase", "--autostash", "main"]);
  assert.notEqual(r.code, 0, "refused");
  assert.match(r.err, /pre-rebase \(tools\/git-hooks\/pre-rebase\): refused/);
  assert.match(r.err, /restored it with the index/);
  assert.match(r.err, /integrate in your own worktree \(e\.g\. \/home\/user\/s3c-int\)/i);
  assert.equal(git(d, "rev-parse", "HEAD"), head, "not rebased");
  assertWorkInPlace(d);
  const list = stashList(d);
  assert.equal(list.length, 1, list.join("\n"));
  assert.match(list[0], /^pre-rebase guard: autostash kept \d{4}-\d\d-\d\dT/);
  assert.match(r.err, /stash@\{0\}/);
  noRebaseState(d);
  assert.match(git(d, "status"), /On branch side/, "not mid-rebase");
});

test("W-1337 pre-rebase: the same rebase in a linked worktree proceeds", () => {
  const d = rebaseRepo();
  const wt = path.join(mkTemp("guards-wt-"), "wt");
  git(d, "worktree", "add", "-q", "-b", "wtb", wt, "side");
  workInFlight(wt);
  const r = run(wt, "git", ["rebase", "--autostash", "main"]);
  assert.equal(r.code, 0, r.err);
  assert.equal(git(wt, "rev-parse", "HEAD~1"), git(d, "rev-parse", "main"), "rebased onto main");
  assert.equal(fs.readFileSync(path.join(wt, "theirs.txt"), "utf8"), "unstaged edit\n");
  assert.equal(fs.readFileSync(path.join(wt, "mine.txt"), "utf8"), "staged edit\n");
  assert.equal(stashList(d).length, 0, "the autostash was applied and dropped by git, as usual");
});

test("W-1337 pre-rebase: `pull --rebase` with rebase.autoStash=true in the main checkout behaves the same", () => {
  const d = rebaseRepo();
  git(d, "remote", "add", "o", d); // pull from itself: o/main is local main
  git(d, "config", "rebase.autoStash", "true");
  const head = git(d, "rev-parse", "HEAD");
  workInFlight(d);
  const r = run(d, "git", ["pull", "--rebase", "o", "main"]);
  assert.notEqual(r.code, 0, "refused");
  assert.match(r.err, /pre-rebase \(tools\/git-hooks\/pre-rebase\): refused/);
  assert.equal(git(d, "rev-parse", "HEAD"), head);
  assertWorkInPlace(d);
  assert.equal(stashList(d).length, 1);
  noRebaseState(d);
});

test("W-1337 pre-rebase: a clean-tree rebase in the main checkout is refused and adds no stash", () => {
  const d = rebaseRepo();
  const head = git(d, "rev-parse", "HEAD");
  const r = run(d, "git", ["rebase", "main"]);
  assert.notEqual(r.code, 0);
  assert.match(r.err, /refused/);
  assert.equal(git(d, "rev-parse", "HEAD"), head);
  assert.equal(stashList(d).length, 0);
  noRebaseState(d);
});

// (b): the Bash PreToolUse rules, judged against a real tmp main checkout and a real linked worktree.
function mainAndWorktree() {
  const main = repo();
  fs.mkdirSync(path.join(main, "sub"));
  const wt = path.join(mkTemp("guards-wt-"), "wt");
  git(main, "worktree", "add", "-q", "-b", "wtb", wt);
  return { main, wt };
}
const REFUSED_IN_MAIN = [
  "git rebase main", "git rebase --autostash -i HEAD~1", "git rebase --abort", "git pull --rebase", "git pull -r origin main",
  "git pull --rebase=merges", "git pull --autostash --ff-only", "git -c pull.rebase=true pull --ff-only", "git pull",
  "git stash push -m tag", "git stash apply 3f2a9c1", "git stash drop stash@{1}", "git stash -m tag", "git reset --hard",
  "git reset --hard HEAD~1", "git checkout -- .", "git checkout HEAD -- .", "git checkout .", "git checkout -f main",
  "git restore .", "git restore --staged :/", "git clean -f", "git clean -fdx", "git clean --force -d",
];
const PASS_IN_MAIN = [
  "git pull --ff-only", "git pull --ff-only origin main", "git status", "git log --oneline -3", "git stash list",
  "git stash list --format='%H %gs'", "git stash show -p 3f2a9c1", "git reset --soft HEAD~1", "git checkout -- src/a.ts",
  "git restore src/a.ts", "git clean -n", "git commit -m x -- a.txt",
];

test("W-1337 no-pkill: each listed git form is refused in the main checkout, naming the worktree alternative", () => {
  const { main } = mainAndWorktree();
  for (const c of REFUSED_IN_MAIN) {
    const v = verdict(c, 0, { cwd: main, main });
    assert.ok(v, `should refuse in main: ${c}`);
    assert.match(v, /s3c-int/, `names the worktree: ${c}`);
  }
  // judged from a subdirectory, from cd, from -C and from --git-dir
  for (const [c, cwd] of [["git rebase main", path.join(main, "sub")], [`cd ${main} && git stash push -m t`, "/"],
    [`git -C ${main} reset --hard`, "/"], ["git -C sub clean -f", main], [`git --git-dir=${main}/.git rebase main`, "/"]])
    assert.ok(verdict(c, 0, { cwd, main }), `should refuse: ${c} (cwd ${cwd})`);
});

test("W-1337 no-pkill: the pass forms pass in the main checkout, and everything passes in a linked worktree", () => {
  const { main, wt } = mainAndWorktree();
  for (const c of PASS_IN_MAIN) assert.equal(verdict(c, 0, { cwd: main, main }), null, `should pass in main: ${c}`);
  // Everything that is not refused everywhere (bare stash, pop: the older rules) passes in the worktree.
  for (const c of REFUSED_IN_MAIN) assert.equal(verdict(c, 0, { cwd: wt, main }), null, `should pass in worktree: ${c}`);
  for (const c of [`git -C ${wt} rebase main`, `cd ${wt} && git reset --hard`]) assert.equal(verdict(c, 0, { cwd: main, main }), null, c);
  // Another repo's main checkout (a scratch repro) is not the shared one.
  const other = repo();
  assert.equal(verdict("git rebase main", 0, { cwd: other, main }), null);
});

test("W-1337 no-pkill hook process: payload cwd in the main checkout is refused (exit 2), in the worktree it passes", () => {
  const { main, wt } = mainAndWorktree();
  const env = { S3_GUARD_MAIN: main };
  const r = hook({ tool_name: "Bash", cwd: main, tool_input: { command: "git rebase --autostash main" } }, env);
  assert.equal(r.code, 2);
  assert.match(r.err, /git rebase/);
  assert.match(r.err, /s3c-int/);
  assert.equal(hook({ tool_name: "Bash", cwd: wt, tool_input: { command: "git rebase --autostash main" } }, env).code, 0);
  assert.equal(hook({ tool_name: "Bash", cwd: main, tool_input: { command: "git pull --ff-only" } }, env).code, 0);
});
