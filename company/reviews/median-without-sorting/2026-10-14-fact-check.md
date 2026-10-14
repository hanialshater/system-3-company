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

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own node: Knuth formula for k = 500, n = 1000 gives 3,336.3; quicksort 2(n+1)H_n - 4n = 10,985.9. Own simulation (xorshift32, 20,000 shuffles, n - 1 comparisons per split as in Demo.tsx split()): quickselect 3,341.8, quicksort 10,987.3. 'About 3,300' and 'about 11,000' are right. Stage 9-card values 17 and 18 re-confirmed. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own Fisher-Yates with own mulberry32(38) and own quickselect (fc18/med.mjs, group size - 1 comparisons per split): 8 splits, 297 comparisons, median 51. Seeds 1-40 mean 291.5 (select) and 639.6 (sort), matching the disclosed choice. |
| c2 | verified | Demo.tsx keep() sets lo/hi to the kept side only; split() slices st.lo..st.hi; dropped bars are drawn at opacity 0.25 and never re-entered. 'Do the rest' uses the same functions. |
| c4 | verified | Own first-card quicksort on the same shuffle: 619 comparisons; 619 / 297 = 2.08, so 'about twice' holds. Demo.tsx SORT_CMP = sortCost(START) is what the stage and reveal print. Non-blocking (already-verified c3): its text says 'position 5'; the stage and reveal say position 51. Builder should fix the claim text. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
