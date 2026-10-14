# Fact-check: dilute-until-none-left (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own Poisson sampler with own mulberry32 (fc18/dilute.mjs), seeds 3000 + k + 1301d, d = 1..20: step 21 gives 0 empty, step 22 gives 12 of 20 (expected 20 x e^-0.602 = 10.95). Multiplier 977 gives 15, as the source says. The 'fourteen tried' count is builder testimony and was not re-run; it is a disclosure, not a number the learner relies on. Demo.tsx emptyOf() feeds both the stage line '20 tubes drawn: N empty' (from step 19) and the reveal. Non-blocking: at step 23 the same draws show 15 of 20 empty where 18.8 is expected (a tail draw a learner can reach on the slider); the claim does not cover step 23. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
