# Fact-check: merge-sort-payoff, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c7 | verified | Different checker session from the 2026-10-12 author. Own top-down merge sort (ms.mjs) over all 40,320 orders of 8: comparisons counted only in the merge loop; split by slicing makes none. Stage round label "Split into 8 single cards: 0 comparisons" agrees. |
| c11 | verified | Brute force over all 40,320 orders: worst case 17 = 4x1 + 2x3 + 7; C(8,2) = 28. Matches the round-3 label. |

Disputes: none.

Result: 2 verified, 0 disputed, 0 withdrawn.
