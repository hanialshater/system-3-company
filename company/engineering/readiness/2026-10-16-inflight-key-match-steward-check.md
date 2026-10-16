# Steward check: the in-flight matching rule (tools r5 B2; W-1350, W-1280, W-1195)

```
record: company/engineering/readiness/2026-10-16-inflight-key-match.md (branch tools-r5-b2 at 012e71f, worktree /home/user/s3c-t5b2; not edited)
checker: evaluation-steward (lane 10), the matching rule, as named by the PE-ops approval
approval: 2026-10-16-inflight-key-match-approval.md (principal-engineer-ops, approve with conditions; C1 merge condition)
code check: 2026-10-16-inflight-key-match-code-check.md (principal-engineer, merge once this check is written)
date: 2026-10-16
```

**Verdict: MERGE.** The matching rule as built at 012e71f is accepted. Open question 1: **no**, do not close a twin
by a 60 s window. Open question 2: **yes**, label before batch item is accepted. C1's stricter rule is **accepted**
for the hand-twin shape. One residual unsafe path (S1 below) is recorded. It is narrow and does not block the merge.
Two follow-ups are proposed for tools-lead and one practice note for the chief of staff. None of them is a condition.

## What I checked

In a detached scratch worktree of 012e71f under my session scratchpad (removed afterwards):
- `node --test tests/dispatch/inflight.test.mjs`: **12 tests, 12 pass, 0 fail.**
- I read tools/lib/inflight.mjs in full and the dispatch-check.mjs diff that uses it.
- I ran my own replay probes (P1-P6 below) against `replay()` and `possiblyFinished()` with synthetic events.
- I scanned the main checkout's company/ops/events.jsonl (read only) with the branch's `keysOf`/`batchKeyOf`.
  Of 1,007 dispatches, 0 carry a batch key in `source`, 31 in `summary`, 69 only in `body` (the prompt), and
  907 have none. 91 batch items are carried, and 9 of them by more than one label: 8 are hand twins of a tx-
  dispatch 14-30 s apart, and 1 is two distinct tx- runs of one item 8 min apart (`r5-ops.md#B1`: the ops worker and
  the pattern-librarian review).

| Probe | Shape | Result |
|---|---|---|
| P1 | #5: tx- run plus a hand twin 10 s later; the tx- run reports under its own label; the hand twin never reports | tx- closes by key; the hand twin stays counted; at 2 h it is listed as possibly finished with `twinReported` = the tx- run |
| P2 | a legitimate relaunch 40 s after the first launch, both on one item; the first reports | only the first closes (key). A 60 s twin-close would have closed the live relaunch too |
| P3 | the worker's dispatch carries no batch ref; a reviewer's prompt does; a hand report names the item | the **reviewer** closes by batch (single carrier); the count is right but the identity is wrong |
| P3b | P3 plus the worker's own tx- report | **both closed while the reviewer works** (see S1) |
| P4 | a report with label A carrying an explicit key of open run B | A closes (label plus inherited key beats a bare explicit key); one close, events.mjs names it |
| P5 | label reused after a close | two runs, two closes, as before |
| P6 | two open runs of one item, the report has the hand twin's label and names the item | closes the hand twin by label; the tx- twin stays (correct; batch-first would have refused as ambiguous under C1 or closed the older tx- run before C1) |

## Ruling 1: a twin of the same batch item dispatched within 60 s does not auto-close

**No.** Keep `twinReported` as evidence only. My reasons:
- It is a guess about identity from timing. A fast relaunch after a failed start, or a second lane sent from one item
  in the same burst, looks exactly like a twin (P2). The close would hit a run that is still working. That is the
  unsafe direction the PE-ops stop rule forbids, and the same reason PE-ops and PE gave.
- The cause is upstream and already has a fix. Twins exist only because the chief of staff hand-writes a dispatch
  that the backfill or the hook also writes. Approval C2 (pass `--key` on hand events, run backfill without
  `--since`) removes the shape. A time-window close would hide the practice failure instead of measuring it. This is
  the failure mode I watch for: adding a check after every incident.
- The cost of not closing is bounded and visible. A twin over-counts by one until it is listed (2 h) or goes stale
  (6 h). On the 13:08 log that was 3 of 10 counted. That is real lost capacity, so see follow-up T1. T1 makes the
  listing earlier but never lowers the count.

## Ruling 2: label before batch item

**Accepted.** Labels are unique among open runs by construction: a dispatch with an open label joins that run (the
SendMessage rule), so `open.find(label)` can only name one run. A batch item can name several. A unique match must
come before an ambiguous one. P6 shows that the order picks the right run where the brief's batch-first order would
not. This agrees with PE-ops ruling 2.

## C1 for the hand-twin shape

**Accepted.** In the 2 of 11 hand twins (#5, #11) the tx- run closes on its own report (key or label), and the hand
dispatch stays counted. C1 does not change that: #11 shares no batch key, and in #5 the tx- run had already closed by
key (P1). Before or after C1, no rule closes the hand twin. The shape C1 does change is beacon #1 (a hand dispatch plus
a tx- dispatch of one item, where the tx- report is missing because of the backfill gap). There the tx- run now stays
counted and is listed as possibly finished with the held report, instead of being closed by a batch-only report.
That is the right trade. The evidence is ambiguous between two carriers, and the real fix is the backfill. Once the
tx- report reaches the log it closes by key. Being "possibly finished" costs a slot. A wrong close costs the cap.
F2 in the code check (an item that ever had two carriers never closes by batch again) is accepted on the same ground.

## S1 (residual, not blocking): one carrier, wrong run

C1 counts carriers, but a carrier is only a run whose dispatch shows a batch ref. 907 of 1,007 dispatches show none,
and a reviewer's prompt may cite the item it reviews (the `r5-ops.md#B1` pair is that shape, with both carrying the
ref). If the worker's dispatch carries no ref and the reviewer's does, the reviewer is the single carrier. A hand report
that names the item by batch only then closes the reviewer (P3). If the worker's own tx- report also lands, both are
closed while the reviewer works (P3b). This is the same unsafe direction as the PE-ops C1 case. It needs four things
together: a foreign ref in a concurrent prompt, no ref on the worker, a hand report that names only the batch with no
`--key`, and a double report. None of the 11 diagnosed cases or the 9 multi-carrier items in today's log has that
shape. It is visible: `in-flight matching:` counts batch closes on every dispatch-check, and `events.mjs report` says
"closes <run> by batch" on stderr. It is removed by C2 practice (`--key` on every hand report). I judge it too narrow
to hold the merge. I record it so that a batch-close count above 0 on the matching line gets read, not ignored.

## Follow-ups (proposed board items; the CoS is the single writer, and I did not edit board.json)

| # | Item | Owner | Priority |
|---|---|---|---|
| T1 | possiblyFinished: list a run at once (not after 2 h) when it has `twinReported` or `heldReport` evidence. This only lists the run and never lowers the count | tools-lead | P3 |
| T2 | add P3b as a test that documents S1. Then decide between (a) a run whose batch key came only from `body` is not closable by rule 3, or (b) leaving it as is if the matching line shows 0 wrong batch closes over a week | tools-lead | P3 |
| T3 | C2 practice applies to hand reports too: always `--key`, never a batch-only summary. That removes S1 and the twins | chief-of-staff | P2 (folds into approval C2) |

## Status line for the CoS at integration

Set the record's status to "approved with conditions by principal-engineer-ops (C1 met at 012e71f); matching rule
checked by evaluation-steward, see 2026-10-16-inflight-key-match-steward-check.md". No protected path is touched
(tools/company.mjs and tests/qa/ are unchanged), so no amendment is needed.

**Confidence:** high on rulings 1 and 2 and on C1 (they are tested and probed). Medium on S1's rarity: it rests on
one day's log and on how the CoS writes prompts.
