# Fact-check: median-without-sorting (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: pivots 7, 2, 4, 5; comparisons 8 + 5 + 3 + 1 = 17; median 5. |
| c2 | verified | First split: 7 lands in position 7, 8 and 9 to its right, discarded. |
| c3 | verified | Partition puts every smaller element left and larger right, so the pivot's index = its rank (CLRS 3rd ed. 7.1, 9.2). |
| c4 | verified | Own first-pivot quicksort, size - 1 comparisons per split: 18. |
| c5 | disputed | Own node reproduces 3,465 and 11,003 on seeds 1-50, but that 50-seed mean is high: the exact expectation for first-card pivots on a random permutation is 3,336 for the 500th of 1,000 (Knuth's C(n,k) = 2[(n+1)H_n - (n+3-k)H_(n+1-k) - (k+2)H_k + n + 3]) and 2(n+1)H_n - 4n = 10,986 for quicksort; my 500 other seeds (101-600) give 3,363 and 11,005. Stating 'about 3,465' to four figures is about 4% high. Fix (builder): 'about 3,300 comparisons against about 11,000' (claim and reveal), citing the expectation. Re-check after the fix. |

**Result:** disputed: c5. Publishing blocked until the builder fixes and a fact-checker re-checks.
