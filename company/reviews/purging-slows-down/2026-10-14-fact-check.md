# Fact-check: purging-slows-down (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derived: births p^2, 2pq, q^2 with ww dying gives q' = pq/(p^2 + 2pq) = q/(1 + q), so 1/q rises by 1 per generation: 10 to 100 is 90 generations; q(10) = 1/20 = 5.0%; 5% to 1% takes 80. Demo.tsx Q[] iterates this; chart marks '5.0% after 10' and '1.0% after 90'. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
