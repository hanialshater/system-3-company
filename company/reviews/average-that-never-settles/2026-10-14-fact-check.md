# Fact-check: average-that-never-settles (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own replay with own mulberry32 (seed 1853 + 92821r, die then Cauchy per draw): at 1 draw 17 of 30 Cauchy beyond +/-1, die span 5.00; at 10,000 draws 18 of 30 and 0.07; farthest dot 24.72 holds a draw of 250,115, and 250,115 / 10,000 = 25.0. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
