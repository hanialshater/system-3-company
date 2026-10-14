# Fact-check: pesticide-paradox (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own RK4 (fc18, dt 0.01 and 0.002, 600 months from (1.5, 1)): averages 1.000/1.000 at e = 0, 1.199/0.800 at 0.2, 1.399/0.600 at 0.4; printed via kk() as 1,000 / 1,200 / 800 / 1,400 / 600. Reveal quotes min and max strengths set. |
| c3 | verified | dy/dt = xy - (1 + e)y = 0 at x = 1 + e (predator break-even), independent of y; Lotka-Volterra time averages equal the equilibrium. Stage message and reveal say the same. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
