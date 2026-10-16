# Code check: in-flight key match + hook liveness (tools r5 B2; W-1350, W-1280, W-1195)

```
branch: tools-r5-b2 at 012e71f (86c5291 + the C1 commit), worktree /home/user/s3c-t5b2 (not edited)
checker: principal-engineer (lane 7)
approval: 2026-10-16-inflight-key-match-approval.md (principal-engineer-ops, approve with conditions)
date: 2026-10-16
```

**Verdict: MERGE** once evaluation-steward's check of the matching rule is written. The PE-ops approval names that check
as separate, and I did not find it on main. If the steward has already passed it, merge now. The merge condition C1
is met in code and test.

## What I checked (detached scratch worktrees under my session scratchpad, now removed)

- `node --test tests/dispatch/inflight.test.mjs` at 012e71f: **12 tests, 12 pass.** The new test is PE-ops' fixture:
  X and Y on one batch item, with Y reported twice. It runs in both orders and asserts X stays open, only Y closes (by key),
  and the hand report is unmatched and held.
- B1 and B2 merged together onto main 6838dba: all of `tests/dispatch/*.test.mjs` gave 110 tests, 109 pass, 0 fail,
  1 slow test skipped. The only conflict is `company/ops/changelog.md`, and both sides should be kept.
  The real events.jsonl was 7,118,014 bytes before and after, and the real spool was empty.
- Read tools/lib/inflight.mjs in full, plus the dispatch-check.mjs and events.mjs diffs. C1 as built: rule 3 closes only
  when `runs` (every run seen in the replay, open or closed) has exactly one carrier of the item and that carrier is open.
  More than one carrier means `held`, which is evidence for "possibly finished" and never a close.
- The hook-liveness line stays a warning (`warns`), never a fail. `toolUseId` is consistent: the hook passes
  `--tool-use-id`, events.mjs writes `toolUseId`, and inflight reads it.
- My own replay probe (6 cases): a hand twin plus a tx- run with both reporting closes both (label, then key). A hand
  twin with only the hand report leaves the tx- run counted, which is the safe direction. A single run with a different-label
  report closes by batch. A hand `--key=af1d` closes by suffix. A SendMessage continuation is one run.
  None lowers the count without a match.

## Findings (none blocks the merge)

- **F1 (accepted, practice note for the CoS).** `sameBatch` matches a short form like `batch=…r5-tools.md#B2` to
  *every* dated file ending `-r5-tools.md`. When an earlier day's `r5-tools.md#B2` exists in the log, a hand report in that short form
  is now ambiguous (held, closes nothing). This is safe: it over-counts until "possibly finished" or the 6 h stale rule
  catches it. Hand events should name the full batch file or pass `--key`, which approval C2 already asks for.
- **F2 (accepted).** Because `runs` includes closed runs for the whole log, any batch item that ever had two runs can
  never close by batch again. That is the intended rule, and batch files are dated, so it costs little.

## Not checked

I did not run dispatch-check against the live log. The 60-second twin-close question is the steward's call. My view
is the same as PE-ops: no time-window closes.
