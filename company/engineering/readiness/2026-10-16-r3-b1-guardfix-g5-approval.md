# Readiness approval: r3 B1 M1/M2 guard delta and G5 (test:dispatch in verify)

```
approver: principal-engineer-ops (lane 8 POC, tools r3 ask; board W-1288)
date: 2026-10-16
branch: tools-guardfix (/home/user/s3c-tg1), base dc2aca4
records: company/engineering/readiness/2026-10-16-commit-and-process-guards.md (addendum r3 B1, commit f0651da)
         company/engineering/readiness/2026-10-16-g5-test-dispatch-in-verify.md (commit e692f83)
prior approvals: 90fc0de (guards, revoke clause "either file edited after 8d3fbff comes back here"), e1c9162 (e1n1 / fold lock)
board: W-1266 (M1, M2, G5), W-529 (port kills), W-1278 (F5, parallel), W-1288 (this ask)
```

Both records sit on the branch, not on main, so I write the decision here. The chief of staff copies the decision
lines into each record's Approval section at merge, as for 90fc0de. I did not write in /home/user/s3c-tg1. All
tests below ran in temporary detached worktrees under my scratchpad, and those worktrees have been removed.

## 1. M1/M2 addendum (f0651da): approved to merge at f0651da

**Decision: approved.** There are no gating conditions. My 90fc0de approval (installed pre-commit, wired no-pkill)
still holds for the files at f0651da. This round answers its third revoke trigger ("edited after 8d3fbff").

What I checked:
- **The diff matches the addendum.** `git show f0651da` changes six files: `tools/git-hooks/pre-commit`
  (`refuse(why, paths, merging)`, merge-only wording), `tools/commit-own.sh` (one echo line in the merge branch),
  `.claude/hooks/no-pkill.mjs` (`PORT_HINT`, `fuser -k`, `kill $(lsof|fuser …)`, and `lsof|fuser|ss|netstat … | xargs kill`),
  the tests, the changelog and the record. Exit codes do not change. The non-merge hint is byte-identical.
- **M1 wording.** The merge hint says to wait for the owner of the listed paths, then run
  `tools/commit-own.sh "<message>" <paths>`. It no longer offers `git commit -m … --`. The trailing line "Do not
  unstage paths you did not stage" fits with this, because the owner is the one who unstages. Tests M1 (merge and
  non-merge) pass.
- **M2: the extra probes beyond the author's.** I ran each command through `verdict()` at e692f83.
  - **Refused (15 of 15 I expected):** `kill -s KILL $(lsof …)`, `kill -- $(lsof …)`, `kill "$(lsof …)"`,
    `kill $( lsof … )`, `kill $(/usr/bin/lsof …)`, `fuser -k -n tcp 3591`, `fuser -vk`, `fuser -k -TERM`,
    `lsof … | xargs -I{} kill {}`, `lsof … | sort -u | xargs kill`, `bash -c "kill $(lsof …)"`, `timeout 5 fuser -k`,
    `env FOO=1 fuser -k`, `kill -9 $(lsof … -sTCP:LISTEN)`, `ss -ltnp | xargs kill`. Every one of these hints names
    `tools/serve.sh stop`.
  - **Passed (7 of 7 I expected):** `kill $(cat …pid)`, `fuser -v`, `lsof -nP -i:… -sTCP:LISTEN`, `fuser -m /mnt`,
    a commit message that contains "fuser -k", and `echo kill $(lsof …)`.
  - **One miss beyond the author's list:** `kill $(ss -ltnp | grep 3591 | awk …)` passes. It is the same class as
    the accepted data-flow misses (`p=$(lsof …); kill $p`). I accept it and do not hold the merge for it.
- **Old behaviour confirmed.** At dc2aca4, `kill $(lsof -t -i:3591)` and `fuser -k 3591/tcp` both pass. So M2 closes a real gap.
- **Cost per call.** Mean hook process time is 50 ms at dc2aca4 and 55 ms at e692f83 (20 calls each, load ~16, same
  command). The difference is within noise. My revoke line is 1 s.
- **No sanctioned workflow does a port kill.** `grep` of tools/, company/ops/*.md, company/rituals,
  .claude/commands and CLAUDE.md for `fuser -k`, `kill $(lsof` and `lsof … | xargs` finds nothing. `core.hooksPath` in the
  main checkout is `tools/git-hooks`, so M1 is live as soon as it merges. Nothing needs reinstalling.
- **Answer for W-529: refuse.** The refusal points to `tools/serve.sh stop <port>` and `kill <pid>`.

What would make me revoke it: the 90fc0de triggers, plus either of these:
- a legitimate stop that no remedy in `PORT_HINT` covers, for example a server with a lost pid file where
  `lsof -i` followed by `kill <pid>` also fails;
- either file edited again after f0651da without coming back here.

## 2. G5 (e692f83): approved with conditions

**Decision: approved with conditions to merge at e692f83.** Conditions G5-a and G5-b gate F5's merge, not this
commit.

Re-timed `npm run test:dispatch` (4 cores; every run in a fresh detached worktree):

| Tree | Run | Wall | Load (1 min) | Result |
|---|---|---|---|---|
| e692f83 (G5 as filed) | 1 | 54.1 s | 16.5 to 18.1 | 65/65 |
| e692f83 | 2 | 41.7 s | 18.1 to 15.3 | 65/65 |
| e692f83, `fold-lock.test.mjs` alone | 3 runs | n/a | ~16 | 6/6 each |
| e692f83 + F5 snapshot (tg2 working tree at 12:31, uncommitted: events.mjs, events-spool.mjs, fold-large.test.mjs) | 200k test alone | 20.0 s | 15.6 | 1/1 |
| same | 1 | 76.4 s | 15.6 to 18.3 | **65/66: F1+F2 failed** |
| same | 2 | 79.3 s | 16.0 to 17.9 | 66/66 |
| same | 3 | 60.6 s | 17.9 to 15.9 | **65/66: F1+F2 failed** |

The author measured 39.3 s and 35.7 s at load 10.6 to 12.8. At today's higher load, G5 alone stays under the
batch's 60 s stop line, but 54 s leaves little room. **With F5's 200k-line test, the suite goes over 60 s in all
three runs and fails in two of them.** The failure is the same each time: `codes` is `[0, 3, 0, 0, 0, 0]`, so the
second fold loop exited 3 and never won the fold lock in its 3.5 s window. `node --test` runs files concurrently,
and the 200k fold competes with that test for CPU. This is the "flaky test under load" risk named in the G5
record (check 1c). F5 is what triggers it, and with G5 merged it would go red in every engineer's verify.

Conditions:
- **G5-a (gating on F5's merge, tools-lead, W-1278).** F5's 200,000-line case must not run in the default
  `test:dispatch`. Put it behind `S3_SLOW_TESTS=1`, as the G5 record already proposes. It stays in the suite and
  runs in the tools lane and before any events.mjs change. Measured: with the case enabled, the suite takes 60.6 to 79.3 s, over the line.
- **G5-b (gating on F5's merge, tools-lead).** `fold-lock.test.mjs` "F1 + F2: two fold loops in parallel …" uses
  `if (!ok) process.exit(3)` in each loop. That assumes both loops win the lock at least once in 3.5 s, which depends
  on load. The property under test is no duplicates and nothing lost. Assert at least one successful fold across
  both loops, or assert that each loop at least attempted a fold, not that each one won the lock. Once this is fixed
  and the 200k case is flagged, re-time the merged suite three times at load and write the numbers in the G5 record.
- **G5-c (not gating, tools-lead, before the next ops review).** `tests/dispatch/r2-coe.test.mjs` reads the
  real company/ops/events.jsonl with `JSON.parse` per line and pins the count of SEV1/SEV2 incidents at exactly
  three. With G5 in verify, two things would fail every engineer's verify for work that has nothing to do with them:
  a torn line, or any new SEV1/SEV2. Fix: read through `readJsonlFile`, which skips torn lines, and replace the exact
  count with a check that every SEV1/SEV2 id has a COE (`coeCoverage`), or make the count advisory. Today it passes
  against main's current log (20/20, with main's events.jsonl copied into the scratch tree).
- **Merge order.** Either branch may merge first. Whichever merges second re-times the suite.

What would make me revoke it:
- a dispatch-suite flake that turns verify red for non-tools work twice in one round;
- `npm run test:dispatch` over 60 s when re-timed at the ops review;
- the G5 line moved after `build` (it has to fail fast).

Rollback: `git revert e692f83`, which takes seconds, needs no data change and involves no founder.

Risks: R-017 is not re-scored here. The 90fc0de rule stands: re-score after one full round with the guard installed and the hook wired.

## 3. A6-1 (privacy condition, company/reviews/_privacy/2026-10-16-accounts-a6-log-fix.md): not run

There is no rebased accounts tip. Branch `accounts` (/home/user/s3c-acct) is at 00bf9b7, merge-base 49aea2e, 192
commits behind main and 21 ahead. A6-1 runs the two A-6 tests against a real Postgres **on the rebased tip**, so
running it on 00bf9b7 would prove nothing about what merges. A-1 and A-6 stay open. I run A6-1 when principal-engineer
names the rebased tip (A-13).

## Objections raised, and what happened to each

- *Author: the batch asked for tier 1 for M1/M2; the author filed tier 2.* **Upheld**, for the same reason as at
  90fc0de: `.claude/hooks/**` is tier 2, and my revoke clause brings any later edit back to me.
- *Author, G5 check 4: B2's 200k test may push the suite past 60 s.* **Upheld, and measured**: 60.6 to 79.3 s,
  with a load flake in two of three runs. This became G5-a and G5-b.
- *Author, G5 check 1a: the r2-coe real-log test.* **Upheld** as G5-c, with an owner. It does not gate G5.
- *Mine: `kill $(ss … | awk …)` passes.* Accepted as a data-flow miss. It goes on the addendum's list of accepted misses; no work item.
- No other objections are on record for these changes.
