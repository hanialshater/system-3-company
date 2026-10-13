# Fact-check: merge-sort-payoff (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c9 | Verified. Recursion on 1,000 cards has 10 levels (1000 -> 500 -> 250 -> 125 -> 63 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1 after ceil-halving); per-level merge cost (sum of k-1 over that level's merges) is below 1,000 at every level, and the worst-case total is 8,977 < 10,000. 300 random 1,000-card decks all stayed under that bound. |
| c10 | Verified: 8 x 7 / 2 = 28. |

c1-c8 were verified by an earlier checker and c4-c8 were added by a fact-checker on 2026-10-12; I re-read the visible reveal (at most 7 comparisons for 8 cards, the rest slides over for free, split compares nothing, 499,500 for 1,000) against them and found no discrepancy, but did not change their status or checkedBy. Stage round labels ('Merge into pairs: N comparisons') are computed from a fixed deck by the lesson's own merge function, so they are exact for that deck. No unrecorded claims.

## Independent re-check of c4-c8 (added and verified on 2026-10-12 by the previous fact-checker, i.e. self-verified)

Re-done by a different checker: c4 brute force over all 70 splits of 8 values gives max 7 comparisons; c6 brute force over splits 1+9..5+5 of 10 values gives max 9 (script ms2.mjs); c5 follows from the merge loop (remaining pile appended without comparison); c7 the recurrence W(n) = W(ceil(n/2)) + W(floor(n/2)) + merge has no split term, and the code in ms.mjs counts only merge comparisons; c8 is definitional. All hold. I set checkedOn to 2026-10-13 on c4-c8 to record the independent check.
