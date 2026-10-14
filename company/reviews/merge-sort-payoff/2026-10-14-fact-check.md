# Fact-check: merge-sort-payoff, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c7 | verified | Different checker session from the 2026-10-12 author. Own top-down merge sort (ms.mjs) over all 40,320 orders of 8: comparisons counted only in the merge loop; split by slicing makes none. Stage round label "Split into 8 single cards: 0 comparisons" agrees. |
| c11 | verified | Brute force over all 40,320 orders: worst case 17 = 4x1 + 2x3 + 7; C(8,2) = 28. Matches the round-3 label. |

Disputes: none.

Result: 2 verified, 0 disputed, 0 withdrawn.

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c9 | verified | Own node (fc22-5/ms.mjs): top-down recursion depth for 1,000 is 10 = ceil(log2 1000); worst case 8,977 < 10,000; 1000 x 999 / 2 = 499,500. Per-level cards placed: 1,000 at each of the first 9 levels and 976 at the 10th, so 'places every card once' is exact for 9 of 10 rounds and 'at most once' for the last; the bound (fewer comparisons than cards per round) holds either way. Non-blocking wording nit for the builder: 'places each card at most once'. |
| c12 | verified | Own node port of deal(): pairCost 4 and fourCost 6 for all 200 seeds 7, 20, 33, ... (seed + 13 steps, as 'New piles' does); seed 7 piles A 10 20 21 23, B 4 5 18 36, final merge 7, so 0 + 4 + 6 + 7 = 17 against 28. RoundsStack draws three rows with those labels; roundLabel shows 'Whole sort: 0 + 4 + 6 + 7 = 17, against 28 for every pair.' |

**Result:** every claim in this pass verified.
