# Fact-check: two-eggs-hundred-floors (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own DP T(2,n) = min_x 1 + max(x-1, T(2,n-x)): T(2,100) = 14, T(2,91) = 13, T(2,92) = 14. Konhauser et al. problem number not opened; verdict rests on the DP. |
| c2 | verified | 14x15/2 = 105, 13x14/2 = 91. |
| c3 | verified | Own sim of plan A (50, 75, ...) over every break floor: break on drop 1 worst = 1 + 49 = 50. |
| c4 | verified | Own sim, floors 50,75,88,94,97,99,100; worst per break-drop 1-4 = 50, 26, 15, 9; no break = 7; overall worst 50. Matches Demo run(). |
| c5 | verified | Own sim, floors 14,27,39,50,60,69,77,84,90,95,99,100; worst 14,14,14,14; no break 12; overall worst over floors 1..100 and no break 14. |
| c6 | verified | Derivation: with budget 14, after d drops a break leaves 14-d-1 climbs, so gap <= 14-d. |
| c7 | verified | A break of the last egg ends the search; only bottom-up linear testing is safe. |
| c8 | verified | Demo worst() = max over tries of run().drops, and run() charges the full gap f-1-lo (break on last floor egg 2 tests). |

**Result:** all 8 claims verified. Lesson fully verified.
