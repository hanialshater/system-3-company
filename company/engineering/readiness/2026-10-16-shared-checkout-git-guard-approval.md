# Readiness approval: shared-checkout git guard (tools r5 B1, W-1337)

```
record: company/engineering/readiness/2026-10-16-shared-checkout-git-guard.md (on branch tools-r5-b1 at 3ce2528; status "awaiting principal-engineer-ops")
reviewer: principal-engineer-ops (lane 8), batch company/ops/dispatch-requests/2026-10-16-r5-ops.md#B2
tier: 2 (.claude/hooks/**, tools/git-hooks/**)
date: 2026-10-16
code check: principal-engineer (lane 7), asked separately. This approval does not replace it
```

**Verdict: APPROVE WITH CONDITIONS.** Merge is allowed once principal-engineer's code check is written. C1 must be
in the record before merge, or in the merge commit. C2 to C6 are follow-ups with owners, below. **What this guard
does not do:** it does not close the mechanism that actually caused the 10:50 and 13:06 wipes (point 0). Until H1
(W-1280) is resolved, the only control on that path is the commit-only brief line.

## What I checked, and how

All in a detached scratch worktree of 3ce2528 and in scratch repos under my session scratchpad. I ran no git that
changes state in /home/user/system-3-company. The only exception is `git worktree add/remove` for my own scratch tree.
- `node --test tests/dispatch/guards.test.mjs tests/dispatch/agent-events.test.mjs` on 3ce2528: **49 tests, 49 pass,
  0 fail** (14 s). That includes the 10 W-1337 cases (guards 43-49, agent-events 16-18).
- My own repro, git 2.43.0, `core.hooksPath` pointing at a copy of the hook, diverged upstream. Before the rebase:
  staged `a`, unstaged `b`, `c` both staged and unstaged (`MM`), new staged `n`, untracked `u`. Then `git rebase --autostash origin/main`.
  Result: refused (exit 128). `git diff --cached` and `git diff` were **byte-identical** before and after, `u` was
  untouched, there was one `stash@{0}: pre-rebase guard: autostash kept …`, and no `rebase-merge/`. `pull --rebase --autostash`
  with `rebase.backend=apply` behaved the same. `pull --ff-only` with `pull.rebase=true rebase.autoStash=true`
  on a diverged branch said "Not possible to fast-forward", and the tree was untouched.
- `verdict()` from the branch's no-pkill.mjs, run on 36 commands (the table is in the session log; the results are below).

## 0. New ruling (asked by principal-engineer via the CoS): the dirty-tree path never reaches pre-rebase

COE-B (a3c1445, action 2) reports this, and **I reproduced it independently** (scratch `repro2`). A background
loop wrote a tracked file during `git rebase --autostash origin/main` with the hook installed. The result:
`Created autostash: b6fd42a` / `error: cannot rebase: You have unstaged changes.`, and **the hook never ran**
(none of its output). The staged and unstaged edits were gone from the tree, and `.git/rebase-merge/` held only `autostash`.
A second run hit a third variant, `fatal: could not reset --hard`. That one also came after the autostash, also without the
hook, also with the work stranded in `rebase-merge/autostash`. **So the restore path covers one of at least three
exit paths. The other two match what happened at 10:50 and 13:06.**

Ruling:
- The restore path is still worth installing. It is correct on its own path (above), and with it a refused rebase
  can no longer strand work by itself. It does not protect the shared checkout from the mechanism that hit it.
- **Prevention** on the dirty-tree path is only the Bash layer. `verdict()` refuses the exact 13:06 brief command
  `git fetch && git rebase -q --autostash origin/main && git push` in main, and `git rebase` with any flags.
  **Detection** is only agent-events. I ran its SubagentStop handler with `S3_MAIN_CHECKOUT` pointing at repro2's
  stranded state, and it wrote one `incident` (`hk-gs-…`, "rebase-merge/ (?, autostash b6fd42ad6)") to a tmp spool,
  exit 0. The detector reads the state, not the path, so it catches all three. **Both are Claude Code hooks and not
  live while H1 (W-1280) is open.** Today nothing live prevents, restores or detects the path that caused both incidents.
- `git rebase --no-verify --autostash` in main skips pre-rebase altogether (reproduced: it rebased and applied the
  autostash, with previously staged edits now unstaged). Only the Bash layer catches it.
- **C1 (before merge).** The readiness record must say this in §0/§1: pre-rebase covers the hook path only; the
  dirty-tree and failed-reset paths, and `--no-verify`, depend on the Bash layer and the detector; and both of those are
  inert until H1 is resolved. Owner tools-lead. A one-paragraph edit on the branch.
- **C2 (P1, follow-up, owner tools-lead).** This is COE-B action 2's test. In a tmp repo with the hook installed, a background
  writer plus `--autostash` must reach the "unstaged changes" exit. The test asserts that (i) the agent-events SubagentStop
  fixture writes one `incident` naming the autostash, and (ii) `verdict()` refuses that command with the main
  checkout as cwd. My repro needed a 400-write loop and hit on the first try. If the race is flaky, a test may
  write the end state (`rebase-merge/autostash` with the tree reset) directly, as long as it says so. Also
  investigate whether any git hook fires on that path that could restore the work, for example `post-index-change` (it
  fired in my repro). Report it; do not build it without a new record.

## Rulings on the five points

1. **A refusing pre-rebase that does not restore the autostash must not be installed.** **Met.** The hook
   stores (listed), applies with `--index`, and removes the state dir before it refuses. Guards test 43 asserts staged +
   unstaged + staged-new edits and one listed stash, and my repro adds an `MM` file and an untracked file, all
   byte-identical. Limits are in point 0. A harmless side effect: each refusal leaves `.git/AUTO_MERGE` from the stash apply
   (not a git "in progress" state; the detector ignores it).
2. **reset --hard, stash, checkout -- . / restore . have no git hook.** The catching layer is no-pkill.mjs
   (Bash PreToolUse). Verified refused in main: `reset --hard|--keep`, `stash` (every action but list/show,
   including `stash store`), `checkout -- .`, `checkout .`, `restore .`, `restore --staged .`, `restore -s HEAD -W .`,
   `clean -fd`, via `-C`, after `cd`, from a subdir, via `--git-dir`, and inside `sh -c`. The record's §2 does name H1.
   **Residual risk, accepted:** this layer is not live while W-1280 (H1) is open. Its control is the commit-only brief
   line (R3 of the ops batch). The CoS keeps it in every brief until both B1 is merged and H1 shows hk- events.
   Gap found: `git switch -f` / `--discard-changes` passes. That is C4.
3. **Git version pin or check: must fail closed on an unknown version.** **Not met; condition C3.** The hook has no
   version check, and no test asserts the version. The record only asks people to re-run the tests after an upgrade, which nobody
   is obliged to do. The host is 2.43.0, the only version probed, so the hazard does not exist today. That is why
   this is a follow-up and not a merge block. **C3 (P2, owner tools-lead, must land before any git upgrade on the host):** (a)
   the hook reads `git --version`. On anything other than the tested set (2.43.x), it still refuses and still `stash store`s
   the autostash (always safe), but it applies only if the tracked tree equals HEAD (`git diff --quiet HEAD`).
   Otherwise it prints "not re-applied, kept as <ref>". This precondition also guards the double-apply case on a future git.
   (b) guards.test.mjs asserts the host's version is in the tested set, so `npm run test:dispatch` turns red on an upgrade.
4. **Linked worktrees are never blocked.** **Met.** pre-rebase exits 0 when `--absolute-git-dir` ≠ `--git-common-dir`
   (test 44: rebase and autostash apply). In `verdict()`, every form passes in a linked worktree, including a worktree
   **nested inside the main checkout's directory** (`<main>/nested-wt`: `rebase`, `reset --hard` pass), `cd <linked> && git rebase`,
   and `git -C <linked> stash store`.
5. **The SubagentStop note writes only to the spool and exits 0 on any error.** **Met.** Events go only through
   `events.mjs add --spool`. `checkMainGit` is wrapped in try/catch, and the entry point catches everything and exits 0, with an
   `uncaughtException` handler as well. Test 18 covers an unreadable `.git` (exit 0, report still written), and my run exited 0. The hook also writes
   its own state (`.serve/agent-events/pre-*.json`, `stash-last.json`) and its error log. Those are hook bookkeeping, not
   events, and I accept them.

## The builder's own calls

- **Plain `git pull` refused in main: upheld.** `git pull --ff-only` is the named alternative, and it never rebases. My repro
  shows it refuses a diverged pull even with `pull.rebase=true` and `rebase.autoStash=true` set. A side effect: `git -c pull.rebase=true pull --ff-only` is
  refused. That is over-strict but harmless.
- **`rebase --abort` / `--continue` refused in main: upheld, with C5.** Reason: no agent should run recovery in the shared tree on
  its own judgment. But that leaves no sanctioned recovery route at all, which the guards approval's revoke clause names
  ("a legitimate command class refused with no sanctioned alternative"). And the agent-events incident body tells the CoS
  to run `git stash store … (from the main checkout)`, which no-pkill refuses. Storing works from a linked worktree, because the stash
  is shared: `git -C /home/user/s3c-int stash store -m … <sha>` passes. Re-applying into main does not.
  **C5 (P1, owner tools-lead):** (a) change that body line to the worktree form. (b) Write a reviewed recovery procedure for a
  stranded autostash in main (`git stash store` from a worktree, then a named and reviewed restore step for the main tree; a
  script under tools/ is fine), and link it from the refusal message and the incident body. Until then, recovery of the main
  tree is a chief-of-staff step done by hand, and the CoS records each one as an event.
- **Event types (`incident` / `note`): upheld.**

## Conditions as board-item requests (the CoS is the single writer)

| # | Item | Owner | Priority | Link |
|---|---|---|---|---|
| C1 | B1 record: state that pre-rebase covers the hook path only; the dirty-tree, failed-reset and `--no-verify` paths depend on the Bash layer and the detector, both inert until H1. **Before merge** | tools-lead | P1 | W-1337 |
| C2 | Test: background writer + `--autostash` (or the written end state) → detector `incident` + `verdict()` refusal; investigate a git hook on that path (report only) | tools-lead | P1 | W-1337, COE-B action 2 |
| C3 | pre-rebase: git version check, apply only onto a clean tracked tree when the version is unknown; a test asserts the host version is in the tested set. Before any git upgrade | tools-lead | P2 | W-1337 |
| C4 | no-pkill: refuse `git switch -f` / `--discard-changes` in main | tools-lead | P3 | W-1337 |
| C5 | Sanctioned recovery for a stranded autostash in main; fix the incident body's `stash store` line to the worktree form | tools-lead | P1 | W-1337, W-1338 |
| C6 | Keep the R3 commit-only line in every brief until B1 is merged and H1 shows hk- events; then adopt the record's permanent sentence in the brief template | chief-of-staff (with Leonie) | P1 | W-1280 |

## Status line, and the revoke clause

I may not edit the record: it lives on tools-r5-b1 in /home/user/s3c-t5b1, which is not mine to touch. **For the CoS:**
when you integrate, change the record's `Status:` and its "Approval" section to "approved with conditions by
principal-engineer-ops, see 2026-10-16-shared-checkout-git-guard-approval.md", after the C1 edit is made. This record is
the "come back here" that the 11:31 guards approval's revoke clause requires for no-pkill.mjs. That clause still applies to any later edit.

**What would make me revoke this:** a refused rebase in main that leaves edits off both the tree and `git stash list`;
a legitimate main-checkout command refused with no route named, after C5 is due; or any hook edit after 3ce2528 that does not come back here.

## Risk

R-017: **no re-score**, as the author proposes. Point 0 makes the shared-checkout part depend on H1 as well as on one clean
round. I re-score it at the first ops review after B1 is merged **and** hk- events show the hooks are live.
