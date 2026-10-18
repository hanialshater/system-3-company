# Simple path, step 5: analytics-steward answer (W-1676)

on: `company/decisions/2026-10-18-founder-simple-scalable-lesson-path.md`, AMD-013 (e) + Prediction and test
**Answer: agree with changes.** Each of O1-O4 needs an **Answer:** in the decision record.

## (1) Predictions per batch: agree with changes

**O1.** A free-text `predictions:` line is unfalsifiable; pooled rows hide lessons at chance. A batch prediction must:
- link an `EXP-*.md` that was committed before the publish commit, so that `check` enforces its format;
- list the slugs at their versions, with the version and lateness rules (EXP-007);
- give each metric a definition, a period from day 0, a minimum sample, "no read" below that sample, and a `would_be_wrong_if`;
- include a per-slug template tripwire: reveal < 40%, or recall at or below chance, at n >= 20, sends the slug back;
- mark rows "not measured" where events cannot yet support them (W-1600).

## (2) Planted claim, 1 per batch: agree with changes

**O2.** One plant per batch is one yes/no result. At an 80% catch rate, three batches all catch it 51% of the time. It can signal a collapse but cannot estimate a rate, and it is not EXP-001 (4 conditions x 10 runs). Changes:
- call it a "canary" and keep EXP-001 "not run";
- the plant is chosen by the founder or another non-reviewer;
- the reviewers are not told which lesson carries it;
- `publish` refuses a slug that still carries the plant marker;
- one miss means the batch's claims are re-checked at 100%;
- keep cumulative catches/plants.

## (3) 1-in-10 samples and stop rule: object as written

**O3.** A batch of about 20 gives 2 samples. "More than 1 of 10" cannot be evaluated on 2. Even at 10 samples the rule is weak:

| True fatal rate | P(at least 1 found, n=2) | P(at least 2 of 10, stop rule) |
|---|---|---|
| 5% | 10% | 9% |
| 10% | 19% | 26% |
| 20% | 36% | 62% |

**Better rule:**
- each batch samples max(3, 10%) lessons by a seeded random draw recorded before review;
- **any** fatal flaw puts that category's next batch at 100% review until it is clean;
- clean samples accumulate per category, and a rate is claimed only as "0 in 30 means below 10% at 95%";
- "fatal flaw" is defined in writing before the first sample.

## (4) AMD-013's prediction: object, untestable as written

**O4.** "0 published that full manual review would have held" is counterfactual: after side_by_side, no full review runs to show it false. ">1 fatal in 10, two batches running" also cannot be reached at about 2 samples per batch. Fix:
- give a random 10% of each of the 3 batches a full manual review;
- set a minimum batch size (a batch of one does not count);
- state the denominator for the a11y 20%;
- define "fatal flaw".

Verdict: agree with changes; O1/O2 are conditions, O3/O4 must be fixed before ratification.
