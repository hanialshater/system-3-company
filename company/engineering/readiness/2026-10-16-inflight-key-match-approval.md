# Readiness approval: in-flight key match + hook liveness (tools r5 B2; W-1350, W-1280, W-1195)

```
record: company/engineering/readiness/2026-10-16-inflight-key-match.md (on branch tools-r5-b2 at 86c5291; status "awaiting principal-engineer-ops")
reviewer: principal-engineer-ops (lane 8), batch company/ops/dispatch-requests/2026-10-16-r5-ops.md#B3 (sent in one run with B2 by the CoS)
tier: 2 (dispatch-check is dispatch control; events.mjs is the event writer)
date: 2026-10-16
also checked by: evaluation-steward (lane 10), the matching rule. This approval does not replace that check
```

**Verdict: APPROVE WITH CONDITIONS. C1 is a merge condition:** the batch-item rule as built can lower the count for a
run that is still working (ruling 1). The diagnosis (9 of 11 hand closes were a backfill gap, 2 were hand twins), the key rule, the
label rule, the hook-liveness line and the "possibly finished" listing are all accepted as built. Stop-if checked:
no protected path is changed (tools/company.mjs is untouched; the paths are tools/lib/inflight.mjs, tools/dispatch-check.mjs,
tools/events.mjs, tests, events.md, changelog).

## What I checked

In a detached scratch worktree of 86c5291 under my session scratchpad:
- `node --test tests/dispatch/inflight.test.mjs`: **11 tests, 11 pass, 0 fail.** The real
  company/ops/events.jsonl was 6,302,783 bytes before and after the run, and the real spool dir was empty afterwards.
- Read tools/lib/inflight.mjs in full, and the dispatch-check lines that use it.
- My own fixture against `replay()` (below).

## Rulings

1. **No path lowers the in-flight count without evidence.** **Met for "possibly finished", not met for rule 3.**
   `possiblyFinished()` only lists runs (test 116 asserts the run is still counted), and `--running` still wins when it is larger.
   But rule 3 (batch item) closes the **oldest** open run of that item. When two runs of one item are live (a rerun, or a
   hand twin plus a tx- dispatch) and the finished run is reported twice (a hand report under a hand label, plus its own tx-
   report), the two reports close **both** runs. Fixture: X `·1111` and Y `·2222`, both `batch=…r5-tools.md#B2`, keys
   toolu_X and toolu_Y. Y finishes. The hand report "tools-lead: r5 B2" (summary names the batch) closes **X (batch)**, and then Y's tx-
   report closes Y (key). Result: `open: []`, while X is still working. In the reverse order (tx report first) the result is the same.
   This is the unsafe direction (C1 would let one agent too many start), and the old label rule did not have this path.
   **C1 (merge condition, owner tools-lead):** rule 3 closes a run only when **exactly one run, open or already
   closed, in the replay carries that batch item**. Otherwise the report is unmatched, and is written and warned about as
   today. The other runs of that item get it as "possibly finished" evidence. Add my fixture in both orders as a test that asserts
   X stays open.
2. **Key precedence cannot close the wrong dispatch when two items share a batch reference: a fixture is needed.**
   **No such fixture exists** (none of the 11 tests has two live runs of one batch item). Under C1 it becomes the C1 test.
   The record's own "what can fail (i)" says "the count is right, the identity is wrong". My fixture shows the count is
   wrong too, once the same run reports twice, which the diagnosis says is common.
   The builder's change to the order (key, then **label**, then batch, instead of the brief's id, then suffix, then batch) is **accepted.** An exact label
   was already the closing rule and is as specific as a key. Within the strong keys, a report's own 4-hex suffix is never used
   as a key, and that avoids the suffix collision. Agreed.
3. **The hook-liveness line is a warning, not a fail, until H1 is resolved.** **Met.** `hooks:` is an info line, and
   the F-31 / no-hk- line is pushed to `warns` (dispatch-check.mjs line 107). It never reaches `fails`, so it never changes the exit code.
4. **The real events.jsonl and spool were not written in tests.** **Met.** All tests set `S3_EVENTS`, `S3_SPOOL` and `S3_SLOTS_DIR`
   to tmp dirs, one test asserts that the real log's size is unchanged, and my byte count before and after agrees.

## Open questions the record leaves for evaluation-steward

The 60-second twin close and the label-before-batch order: the steward decides. On the twin close, my view for the
steward to weigh: **do not** close twins by time window. That is a guess, and ruling 1 forbids lowering the count on a guess.

## Conditions as board-item requests (the CoS is the single writer)

| # | Item | Owner | Priority | Link |
|---|---|---|---|---|
| C1 | inflight rule 3: close by batch item only when exactly one run (open or closed) carries it; add a fixture with two live runs of one item and a double report (both orders), asserting the still-working run stays counted. **Before merge** | tools-lead | P1 | W-1350 |
| C2 | CoS practice from the record: run `events.mjs backfill` with no `--since` each loop, and pass `--key` on any hand dispatch or report | chief-of-staff | P2 | W-1350, W-1195 |

## Status line

I may not edit the record: it is on tools-r5-b2 in /home/user/s3c-t5b2. **For the CoS:** at integration, after C1 is on
the branch, set the record's status to "approved with conditions by principal-engineer-ops, see
2026-10-16-inflight-key-match-approval.md".

## Risk

The event-log-gap risk: no re-score, as the author proposes. Re-score it once a hooked session shows a recent hk- event on the `hooks:` line.
