# Code check: shared-checkout git guard (tools r5 B1, W-1337)

```
branch: tools-r5-b1 at 0dd0abc (3ce2528 + the C1/C2 commit), worktree /home/user/s3c-t5b1 (not edited)
checker: principal-engineer (lane 7), the code check asked for by the readiness approval
approval: 2026-10-16-shared-checkout-git-guard-approval.md (principal-engineer-ops, approve with conditions)
date: 2026-10-16
```

**Verdict: MERGE.** The merge condition C1 is met: the record's §0 now states the hook-path-only limit, and §1 has
the new "exits before pre-rebase" line. C2 was also done on the branch. C3 to C6 stay follow-ups, as the approval says.
There are two small gaps, F1 and F2 below. Neither blocks the merge.

## What I checked (detached scratch worktrees under my session scratchpad, now removed)

- `node --test tests/dispatch/guards.test.mjs tests/dispatch/agent-events.test.mjs` at 0dd0abc: **50 tests, 50 pass**
  (12 s). This includes the new C2 test, which uses a deterministic `post-index-change` writer and needs no race.
- B1 and B2 merged together onto main 6838dba in a scratch tree: `node --test tests/dispatch/*.test.mjs` gave **110 tests,
  109 pass, 0 fail, 1 skipped** (the slow F5 test). The only conflict is `company/ops/changelog.md`, and both sides
  should be kept.
- Side effects of the runs: the real `company/ops/events.jsonl` was 7,118,014 bytes before and after, the real spool
  was empty, and the shared `git stash list` held 2 entries before and after.
- `tools/git-hooks/pre-rebase` is mode 100755. The main checkout has `core.hooksPath=tools/git-hooks` and no
  `pull.rebase` or `rebase.autoStash` config. git is 2.43.0. So merging installs the hook, as the record says.
- Protected paths: none touched (`tools/git-hooks/pre-commit` is unchanged).
- Read pre-rebase, the no-pkill.mjs diff and the agent-events.mjs diff in full. The code is sound. In pre-rebase the
  order store, then apply `--index`, then plain apply, then remove the state dir is right. An internal error still refuses
  and prints the sha. A linked worktree exits 0. agent-events reads `.git` from the filesystem with no git process,
  and every error path is caught.
- My own `verdict()` probe on 28 commands. Main-checkout reads all pass: status, log, `commit -m "…git rebase…" -- paths`,
  `pull --ff-only`, `merge <branch>`, `checkout <branch>`, `checkout -- <one file>`, `stash list`, `worktree add`,
  `cherry-pick`, `am`. Refused: plain `pull`, `checkout HEAD -- .`, `stash -u`, `rebase --abort`, `env GIT_DIR=<main>/.git git rebase`,
  and `--git-dir=<main>/.git stash`, plus `git -C <main> reset --hard` and `cd <main>/src && git restore .` from a worktree.
  From a worktree, `rebase --autostash` passes, and so does `cd <worktree> && git rebase` run from main.
  The CoS integration route stays open: commit by path in main, merge or `pull --ff-only`.

## Findings (none blocks the merge)

- **F1 (P3, owner tools-lead; add it to C4).** In main, `git merge --autostash` and `git -c merge.autoStash=true merge`
  pass. On a conflicting merge, git has already reset the shared tree, and the edits wait in `.git/MERGE_AUTOSTASH` until the
  merge is concluded. They are recoverable, but other agents' work leaves the tree for that time, and the detector reports only
  MERGE_HEAD (a `note`). Refuse `--autostash` / `merge.autoStash` on merge in main, together with C4's `switch -f`.
- **F2 (accepted, no item).** Plumbing in main (`read-tree`, `checkout-index -a -f`, `update-ref`) passes. No brief or
  runbook uses these. Guarding them would be ceremony.
- The incident body still says to run `git stash store` "from the main checkout", which no-pkill refuses. That is
  already C5 (P1), so I add nothing.

## Not checked

I did not re-run PE-ops' racing-writer repro (the C2 test covers that end state deterministically) or test on any git other
than 2.43.0 (that is C3). Both hooks stay inert until H1 (W-1280), so this merge does not make the shared checkout safe by
itself. It only makes the refused-rebase path safe.
