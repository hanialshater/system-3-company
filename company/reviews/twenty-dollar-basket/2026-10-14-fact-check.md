# Fact-check: twenty-dollar-basket (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 20 - 12 = 8, 8 / 2 = 4 apples; 20 - 16 = 4, 4 / 2 = 2 apples; 2 pushed out. Demo.tsx maxApples() and the stage message 'left room for 2 apples: 2 pushed out'. |
| c2 | verified | 4 / 2 = 2; maxApples(l) = floor((20 - 4l)/2) = 10 - 2l. Stage draws a loaf as two apple slots. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
