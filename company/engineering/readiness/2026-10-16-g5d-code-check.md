# G5-d code check: tools r5 B3 (W-1349 / W-1310), 2026-10-16

reader: principal-engineer (CEO office), lane 7
subject: branch tools-r5-b3 (40f1b1e, be8d5f2), integrated as int-tools-r5-b3 (c002153, not pushed)
diff read: `git diff origin/ccr-4c6c7654-ew9ko1 int-tools-r5-b3 -- tests/` (4 files, +79 / -4)
tier: tests only, outside protected paths (`tests/qa/**` not touched). This is a code check, not an engineering review.

## Verdict

**Merge.** The stub does not hide a rule difference for anything the stubbed tests assert. Confidence: high.

## Why

1. **Where git runs.** In the spawned `tools/dispatch-check.mjs` path, git is called in two places only: R1, through
   `tools/rituals-due.mjs` (`git log -1` per record, at import), and C3 (`git worktree list`, only for `build`/`wave`
   with `--worktree`). C1, C2, C4, I1, the S1-S4 ledger (`tools/lib/slots.mjs`), in-flight (`inflight.mjs`,
   `events-spool.mjs`) and R2 (`coe-coverage.mjs`) do no child-process work. I checked this with grep on every module
   the check imports.
2. **slots.test.mjs.** Every spawn is `--kind=other`, so C3 never runs and R1 can only add warnings ("ritual overdue",
   "also due"), never fails. Every warns assertion filters for `^S[1-4]`; no test asserts the warns are empty or
   counts them. The stub's side effect (rituals-due skips every record, so rituals look due) is not visible to any
   assertion.
3. **r2-coe.test.mjs.** `wave`/`build` spawns with the stub can pick up extra R1 fails, but every assertion filters to
   lines starting with `R2`, and R2 reads COE files plus the event log, not git.
4. **Slow cross-checks.** I ran them myself in a scratch detached worktree of c002153: `S3_SLOW_TESTS=1 node --test
   tests/dispatch/slots.test.mjs tests/dispatch/r2-coe.test.mjs` gave 43 pass, 0 fail, 37.6 s. Both G5-d cross-checks
   passed: in the C1/S cases, real git and the stub gave the same exit codes and the same fails; in wave/build, the
   R2 lines were the same.
5. **The `later = now` fixture fix** ("release on report" test) is a correct fixture repair, not a weaker assertion.
   `assignReleases` releases only slots with `ts <= report ts`. Before, the fixture dated reports now + 1 s, which
   only worked while a spawn took more than 1 s. Now both claim slots are written before `later` is taken, and the
   re-dispatch slot is at least one node startup (~0.1 s) later.
6. **guards.test.mjs.** `GIT_CONFIG_COUNT/KEY_0/VALUE_0 commit.gpgsign=false` applies only to the test's own tmp-repo
   spawns, through its own ENV. No guard rule reads signing.

## Residual gap (pre-existing, not created by this change)

R1 (rituals before new work) and C3 (builder worktree) have **no** test coverage in `tests/dispatch/`, before or
after this change: grep finds no assertion on `R1 ` or `C3 ` lines. With the stub in place, a future R1/C3 test must
**not** use `stubGitPath()`; git-stub.mjs line 5 says so. If tools-lead wants that coverage, it is a small tools-lead
board item, and it does not block this merge.

## Timings

- Full `node --test tests/dispatch/*.test.mjs` in the scratch worktree: 109 pass, 0 fail, 3 skipped, 38.3 s
  wall at 1-min load 4.4-5.5 (CoS measured 40 s at load ~5; the ~27 s claim is the idle-host number).
- The 1-minute load stayed under 10 for my whole run (max seen 5.46), so the three timed runs at load >= 10 were
  not triggered and are still open, as be8d5f2 says (PE-ops / CoS).
