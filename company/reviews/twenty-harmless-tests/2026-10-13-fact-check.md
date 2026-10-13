# Fact-check: twenty-harmless-tests (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a19.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 1 - 0.95^20 = 0.6415. |
| c2 | verified | 0.95^20 = 0.3585. |
| c3 | verified | 20 x 0.05 = 1. |
| c4 | verified | batch(0, seed 4) has 2 alarms; many(1000, 1000): 638 batches with an alarm, 996 alarms; many(2000, 1000): 636. Seeds 1-8 give 61.8%-66.8% (reproduced). Across 300 other seeds the 1,000-batch share is 61.0%-66.8% (median 64.2%), so 63.8% is typical and the seed choice (disclosed, first batch with 2 alarms; seeds 1 and 8 also qualify) does not bias the headline. |
| c5 | verified (convention) | Independence and no real effects are stated in the lesson ("This assumes the tests are independent"; stage "No test has a real effect"). The ledger note that positive dependence usually lowers the chance is consistent with the Sidak inequality for normal test statistics; it is not learner-visible. |

Non-blocking: "Run enough tests and a 'finding' is almost guaranteed" is the limit 1 - 0.95^n -> 1 under the same assumptions; covered by c1. No unrecorded claims found.
