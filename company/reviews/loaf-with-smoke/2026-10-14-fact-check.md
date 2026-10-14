# Fact-check: loaf-with-smoke (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | buyers(q) = (100 - q)/10, bakers(q) = (q + 20)/10: q = 35 buyers 6.5 = true cost 6.5; q = 36: 6.4 < 6.6; q = 40: 6.0 < 7.0. Demo.tsx polygon shades trueQ..MARKET between the buyers' and true-cost lines. |
| c4 | verified | (100 - q)/10 = (q + 20)/10 + 1 gives q = 35; Demo.tsx crossing(1) = 35; label 'bakers + $1 cost' when the toggle is on; reveal says it is not a policy claim. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
