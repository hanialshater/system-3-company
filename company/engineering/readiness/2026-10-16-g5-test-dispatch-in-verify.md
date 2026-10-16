# Operational readiness: G5, `test:dispatch` in `npm run verify` (W-1266 G5, W-1254)

```
change: package.json "verify" runs `npm run test:dispatch` after test:platform and before check
change-tier: 2
paths: package.json
author: tools-lead
board: W-1266, W-1254
risks: none added or closed; supports R-017 (a guard regression now goes red in verify)
links: batch company/ops/dispatch-requests/2026-10-16-r3-tools.md#B1; condition G5 in company/engineering/readiness/2026-10-16-commit-and-process-guards-approval.md; branch tools-guardfix (its own commit, separate from M1/M2)
```

**Status: awaiting principal-engineer-ops.** `package.json` is tier 2 by paths.json ("scripts and dependencies").
The author does not approve it. It is a separate commit on tools-guardfix so the chief of staff can merge M1/M2
and hold or drop this one on its own.

## The change

One script line. `verify` was
`test:deploy && test:publish && test:lifehacks && test:kit && test:hq && test:platform && check && typecheck && build && qa`
and becomes the same with `&& npm run test:dispatch` after `test:platform`. Placed with the other unit suites, before
the slow steps, so a guard regression fails fast. No dependency, no new script. **CI is unchanged**: ci.yml runs
check, typecheck, build and qa as separate steps and never calls `npm run verify` (read from the file), so this adds
no CI minutes and needs no amendment. Adding test:dispatch to CI would need ci.yml (protected) and is not proposed.

## The check

1. **What can fail.** (a) verify goes red for work that did not touch tools: `tests/dispatch/r2-coe.test.mjs`
   reads the **real** company/ops/events.jsonl and asserts it holds exactly three SEV1/SEV2 incidents. The day a
   new SEV1/SEV2 incident event is logged, every engineer's verify fails until that test's id list is updated
   (owner tools-lead). The same test does `JSON.parse` per line with no skip, so one torn line in the real log
   (the E1 class) also fails it. I flag this rather than change it here: it is outside G5's one line, and the
   fix (skip unreadable lines; or make the count test advisory) is a test change for the next tools round. Ask:
   board item, owner tools-lead. (b) verify gets slower (numbers in 4). (c) A flaky guard test (temp git repos
   under load) fails someone's verify. None seen in 3 runs today. Who sees it: agents only; no learner surface.
2. **How we would know.** verify prints the failing test by name. That is the point of G5: until now a guard
   regression showed only when someone ran test:dispatch by hand (the guard record, check item 2).
3. **How to roll back.** `git revert <this commit>`, seconds, no data, no founder. Or drop the commit before merge.
4. **Capacity.** Measured in /home/user/s3c-tg1, 4 cores, load average 10.6 to 12.8 (other agents building):
   `npm run test:dispatch` **39.3 s and 35.7 s wall**, 65 tests (user 17.7 s, sys 13.2 s). So verify grows by about
   **35 to 40 s at today's load**, under the batch's 60 s stop line. Not measured idle; expect less. **Where this meets
   B2 (W-1278, /home/user/s3c-tg2, in parallel):** B2 adds a 200k-line fold test with a 30 s budget for the whole
   suite. If that test is slow, test:dispatch with both merged could pass 60 s at this load. Whoever merges second
   re-times `npm run test:dispatch` and writes the number here; over 60 s, the 200k case goes behind an env flag
   (e.g. `S3_SLOW_TESTS=1`) for verify, not out of the suite. Disk: about 19 temp git repos (~4 MB) under
   os.tmpdir(), removed at file end (0 `guards-*` dirs left in /tmp after these runs). No deploys, no CI.
5. **Security.** None: a local script line. The tests use temp dirs and `S3_EVENTS`/`S3_SPOOL` overrides; the only
   real-repo read is the r2-coe test above (read only).
6. **Data.** Writes nothing outside os.tmpdir(). No learner data.
7. **Risks.** None added or closed. It is the regression meter that R-017's guard mechanisms lacked.

## Checked on disk

| Claim | Command | Result |
|---|---|---|
| The diff is one script line | `git show --stat HEAD -- package.json` | 1 line changed |
| package.json still parses | `node -e 'JSON.parse(…package.json…)'` | ok |
| Suite passes | `npm run test:dispatch` | 65/65 |
| Time | `date` around `npm run test:dispatch`, twice | 39.3 s, 35.7 s at load 10.6 to 12.8 |
| CI does not call verify | read .github/workflows/ci.yml | steps: check, typecheck, build, qa |
| No test writes the real event log | grep of tests/dispatch for S3_EVENTS / events.jsonl | all writes go to temp logs; r2-coe reads the real log |

Not run: the full `npm run verify` (it does a production `next build`; the batch says no build for B1).

## Approval (tier 2; written by principal-engineer-ops)

- Decision: **approved with conditions** by principal-engineer-ops (copied by chief-of-staff at merge 2026-10-16): G5-a and G5-b gate the F5 merge (200k test behind S3_SLOW_TESTS=1; fold-lock exit(3) assumption fixed, suite re-timed 3×), G5-c before the next ops review. Authority: `company/engineering/readiness/2026-10-16-r3-b1-guardfix-g5-approval.md` (9ca8d06).
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
