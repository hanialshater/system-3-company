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

## Decision 2026-10-16 (afternoon): G5-a and G5-b cleared on tools-f5 at eb50a4f; new finding G5-d, the 60 s line is broken on main by the slot ledger

reviewed-by: principal-engineer-ops · input: `git diff origin/ccr-4c6c7654-ew9ko1...tools-f5` (a25971d G5-a/b/c, plus the F5 loops in tools/events.mjs and tools/lib/events-spool.mjs that were already on the branch), and tools-lead's note in company/engineering/readiness/2026-10-16-e1n1-approval.md on branch tools-f5 (eb50a4f). The author is tools-lead. Not my area. I read the diff and ran the tests before I read the author's timings.

### Decision

**G5-a: met. G5-b: met. F5 may merge** as far as these two conditions go. G5-c (not gating): met as written. I also read the F5 change itself (four `push(...spread)` / `Math.min(...spread)` turned into loops, with no change to lock or F2 behaviour) and have no objection. That closes the F5 condition in the e1n1 approval without a further round. Its 200k test passed in the slow suite (below).

- G5-a: the 200,000-line case has `{ skip: !SLOW && … }`, and `npm run test:dispatch:slow` sets `S3_SLOW_TESTS=1`. The default suite reports it as skipped.
- G5-b: each fold loop is a do-while that reports `{ok, locked}` and exits 0. The test now asserts that each loop tried at least once and that the two loops folded at least once between them. The no-duplicate and nothing-lost checks are unchanged. The second assertion cannot fail because of load. A refused try means the other loop held the lock, and a fold that holds the lock either finishes (ok++) or throws (non-zero exit, and the test fails on that, which it should).

### What I checked (my own runs: detached worktree of eb50a4f with current main 9cc75ec merged in (clean merge, includes the slot ledger 99de2a4), under my scratchpad; a second detached worktree at 9cc75ec for comparison; no next build; both worktrees removed; no real spool created; worktree logs untouched)

| Tree | Command | Wall | Load (1 min) | Result |
|---|---|---|---|---|
| eb50a4f + main | `npm run test:dispatch`, run 1 | 223.9 s | 9.8 to 14.8 | 86 pass, 1 skipped (F5), 0 fail |
| eb50a4f + main | run 2 | 208.0 s | 14.8 to 14.0 | 86 pass, 1 skipped, 0 fail |
| eb50a4f + main | run 3 | 216.4 s | 14.0 to 12.3 | 86 pass, 1 skipped, 0 fail |
| eb50a4f + main | `npm run test:dispatch:slow` | 187.7 s | 7.3 to 10.4 | 87/87 (the 200k test included) |
| main 9cc75ec alone | `npm run test:dispatch` | 183.9 s | 11.2 to 11.8 | 86/86 |
| eb50a4f + main, **without slots.test.mjs** | `node --test` on the other four files | 25.9 s | 11.8 to 10.7 | 65 pass, 1 skipped |
| eb50a4f + main | `node --test tests/dispatch/slots.test.mjs` alone | 131.7 s | 10.7 to 7.4 | 21/21 |
| **G5-b, old test** (9cc75ec) | "F1 + F2" alone with 12 busy-loop node processes, 5 runs | n/a | up to 19 | **2 of 5 red**, `codes` = `[3, 0, 0, 0, 0, 0]` (the morning's failure) |
| **G5-b, new test** (eb50a4f + main) | same, with the same 12 hogs, 5 runs; then 5 more with 6 hogs | n/a | 11.5 to 19 | **10/10 green** |

In the three full runs, "F1 + F2" took about 4.0 s each time and passed. The slot tests were running alongside it in those runs, and they are the heaviest CPU load the suite has had so far.

What the numbers say: tools-f5 adds nothing to the default suite's time. The four files it touches run in 26 s. The suite is 184 to 224 s because of `tests/dispatch/slots.test.mjs` from 99de2a4: 21 tests and 132 s alone, with single tests at 11 to 25 s (S1 malformed source 22.3 s, W-782 R2 24.6 s, the hook fixture 18.8 s). Most of them spawn `tools/dispatch-check.mjs` several times. The author's 31 to 50 s were timed before main had the ledger, so they no longer describe what merges.

### G5-d (new; tools-lead, the slot ledger's author; does not gate F5)

`npm run test:dispatch` on main takes 184 s, three times the 60 s line in this approval, and verify runs it for every engineer. This was not caused by F5, and holding F5 would fix nothing. In fact F5 should merge soon, because main still carries the old "F1 + F2" test, which I just made fail 2 times in 5 under load. Condition: bring the default `test:dispatch` back under 60 s at load around 12. The two ways I see are to make each dispatch-check spawn in slots.test.mjs cheaper (find out what it spends 1 to 2 s on), or to move the slowest slot cases behind `S3_SLOW_TESTS=1` the way G5-a did. Then re-time it three times and write the numbers here. The revoke clause above ("over 60 s when re-timed at the ops review") is met in substance today. I am not revoking now, because the suite is green and verify being slow is a cost, not a fault. **If it is still over 60 s at the next ops review, I revoke the G5 line in verify** until it is fixed. Merge order: the merge rule above stands. This entry is the re-time for F5 as the second branch, and G5-d is what it found.

### Believed, not checked

- The time inside slots.test.mjs is mostly dispatch-check start-up and its reads of the repository. I inferred that from what the tests spawn. I did not profile it.
- Host load moved between 7 and 19 during my runs (other sessions). The 26 s and 132 s split was measured back to back, so the comparison holds, but the absolute times depend on load.
- I ran the slow suite once, not three times.

### Objections

- *Author (eb50a4f): the G5-b fix was not reproduced against my exact failing case (the 200k test in a parallel file).* **Answered.** That overlap cannot happen any more, because F5 is in the same file, runs in order, and is skipped by default. I reproduced the same failure shape with CPU hogs instead: old test 2 of 5 red, new test 10 of 10 green.
- *Mine, new: the 60 s line is broken by the slot ledger's tests.* G5-d, owned by tools-lead, with the revoke date above.
- No other objections are on record.

Risk: no re-score. R-017 waits for the hook to be wired, as before.

## Addendum 2026-10-16 (tools-lead, Sora): G5-d re-time (batch 2026-10-16-r5-tools.md#B3, board W-1310; branch tools-r5-b3)

Append-only; nothing above is changed. Base: main at 3adad93 (tools-f5 eb50a4f is already in main, so `test:dispatch:slow` and the fixed fold-lock test are in the base). For principal-engineer-ops to read before the next ops review; principal-engineer (lane 7) reads the test diff. Tier 1 (tests only: no tool, hook or gate file changed).

### Measured first (base 3adad93, before any change; host has 4 CPUs)

| what | time | load1 |
|---|---|---|
| `npm run test:dispatch`, whole default suite | 175.0 s | 6.1 at start (15-min 10.0) |
| `slots.test.mjs` alone | 146.2 s, 21/21 | 5.5 at start |
| `guards.test.mjs` alone | 74.9 s, 24/24 | 8.7 |
| `r2-coe.test.mjs` / `agent-events.test.mjs` / `fold-lock.test.mjs` alone | 15.7 s / 13.3 s / 6.5 s | 8 to 9 |
| one `dispatch-check --kind=other --json` spawn | 2.83 s | ~5 |

slots.test.mjs per test (s): done-when 2.9, --no-claim 2.8, S1 warn/enforce 10.0, S1 source none 2.8, S1 malformed (7 spawns) 18.2, S1 SO 0.0, S2 11.4, S3 cap 8.3, S3 builders 0.0, S3 stale 2.7, S3 double-claim 0.2, S3 same item 10.7, release on report 8.7, S4 17.7, checker roles 0.0, F1/F4/F7/F8 hook fixture 17.8, F1 negatives 0.0, F2/L1 5.8, F3/L2 2.9, F5 11.8, F6/Q1 11.3. Each test costs ~2.8 s times its number of dispatch-check spawns (38 `run(` calls).

Where one spawn's 2.83 s goes (in-process timing of the same phases, two runs): node start ~30 ms; imports of slots, events-spool and coe-coverage 77 to 89 ms; reading the log and spool 0 to 1 ms; `slots.evaluate` (batch file, agents, poc-map) 29 to 33 ms; `slots.inFlight` 0 ms; **`import("./rituals-due.mjs")` 2,707 to 2,789 ms**; `due()` 14 to 20 ms; `coeCoverage` 3 to 4 ms. rituals-due.mjs runs one `git log -1 --format=%cI -- <file>` per ritual record (company/rituals/records and company/engineering/operations, 53 dated files) when it is imported, ~50 ms each. Your "dispatch-check start-up and its reads of the repository" was right. The reads are git calls made by R1.

guards.test.mjs was the second cause, and not one anyone had named: the host's global git config has `commit.gpgsign=true` with an external `gpg.ssh.program`, so every throwaway commit in a tmp repo was signed. That costs 1.05 s per commit, against 0.017 s unsigned (same tmp repo). The file makes ~40 commits.

### What changed (tests only)

1. `tests/dispatch/git-stub.mjs` (new helper, not a `*.test.mjs`): a PATH whose first `git` is `#!/bin/sh exit 128`. The tmp dir is removed in `after`.
2. `tests/dispatch/slots.test.mjs`: `run()` spawns dispatch-check with that PATH, so R1's per-record git calls fail at once and rituals-due's own `catch` skips them. No test in the file reads R1 or C3 (the only git callers in dispatch-check), and every run is `--kind=other`. It spawns `process.execPath` instead of `node` from PATH. **Fixture fix (release on report):** the reports were dated `now + 1 s`, which held only while a spawn took over 1 s. With a 0.3 s spawn the re-dispatch's new slot fell inside that second and was released too, so prune said 2, not 1. Now the reports are dated when the first two claims have returned. The assertions are unchanged, and the test now holds on a fast host as well as a slow one. **New slow-only test:** "G5-d cross-check": four S1/S2/S3/C1 cases run with the stub and with the real git must give the same exit code, the same S/C rule ids, and identical `fails`.
3. `tests/dispatch/r2-coe.test.mjs`: `runCheck` uses the stub PATH. Every assertion there filters to `R2` lines, and R2 reads COE files, not git. **New slow-only test:** wave and build give the same R2 lines with the real git as with the stub.
4. `tests/dispatch/guards.test.mjs`: one ENV line, `GIT_CONFIG_COUNT=1 commit.gpgsign=false`, for every git and commit-own.sh call it makes in its tmp repos. As a side effect, test commits no longer go to the host's signing program.

**Moved behind `S3_SLOW_TESTS=1`: no case.** None needed moving once spawns were cheap. **Deleted: none. Assertions removed: none.** Two slow-only cross-checks were added. Every rule family keeps its CLI spawns in the default suite: S1, S2, S3, S4, C1, R2. (C2, the builder cap, had no CLI test before this change and has none after. It is recorded here as a gap; not fixed here.)

### Re-time after the change (branch tools-r5-b3)

| run | wall | load1 before to after (1/5/15 before) | result |
|---|---|---|---|
| intermediate (slots + guards fixed, r2-coe not yet), default 1 | 73.6 s | 15.0 to 13.0 | 86 pass, 2 skipped, 0 fail |
| intermediate, default 2 | 44.8 s | 13.0 to 11.2 | same |
| intermediate, default 3 | 32.4 s | 11.2 to 9.2 | same |
| intermediate, slow | 44.1 s | 9.2 to 7.0 | 88/88 |
| **final, default 1** | 25.9 s | 2.6 to 3.7 (2.62 6.95 8.59) | 86 pass, 3 skipped, 0 fail |
| **final, default 2** | 27.9 s | 3.7 to 4.1 | same |
| **final, default 3** | 27.7 s | 4.1 to 3.1 | same |
| **final, slow** | 41.8 s | 3.1 to 3.0 | 89/89, 0 fail |

The intermediate row 1 is why r2-coe was changed too. At load 15 its four R2 tests (21.1, 13.8 and 11.6 s) were the long pole once slots and guards were fast. After the stub, r2-coe alone is 2.1 s (slow 7.4 s), slots alone 18.3 s (slow 29.1 s), and guards alone ~14 s summed at load 14.

**The done-when bar is not met yet: no final run was at load 10 or more.** After the final change the host went idle (load1 1.2 to 4). A watcher (scratchpad, read-only apart from running the suite) waited 13:45Z to 14:15Z to run the default suite whenever load1 was 10 or more. Load never got there, so it made 0 runs. I tried to make load with busy-loop processes, as the G5-b re-time above did, and the session's permission system refused it ("interfere with workloads"). So there are no synthetic-load numbers, and none are faked. What the data does support: at load 15 to 11, before the r2-coe change, the suite took 73.6, 44.8 and 32.4 s. The r2-coe change took ~45 s of R2 spawns out of that run-1 long pole. The remaining files run under 20 s each at low load. I expect the final suite to stay under 60 s at load 12, but that is a belief, not a measurement. **Ask (principal-engineer-ops or the CoS): re-time `npm run test:dispatch` three times on tools-r5-b3 (or main once merged) when load1 is 10 to 18, and append the rows here.**

### The lasting fix (a note, not shipped: tools-lead, next round, tier 1)

The stub fixes the tests, not the tool: every real `dispatch-check` and `company status` still pays ~2.7 to 4.6 s for R1's per-file git log. Patch for tools/rituals-due.mjs `recordEvents()` (not dispatch-check.mjs, which B2 owns this round): one pass, `git log --format=@%cI --name-only --no-renames -- company/rituals/records company/engineering/operations`, taking the first time seen per path (newest first) and keeping only files that still exist. Checked read-only on this worktree: for all 52 committed dated records it gives the same time as the per-file call, in 0.15 s against 4.6 s. The single pass also lists one path that no longer exists, so the existence filter is needed. It changes R1's input path for every caller, so it needs its own tier-1 note and a test that compares it with the per-file result.

### Believed, not checked

- The stub cannot hide an S/C/R2 difference: the slow cross-checks compare a sample (four S/C cases, two R2 kinds), not every case.
- That the final suite is under 60 s at load 10 to 18: inferred from the intermediate loaded runs and the per-file times, not measured (see above).
