# Fact-check: fee-on-two-week-loan (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Demo.tsx: YEAR = 364, fee only, $100 re-borrowed, simple annualising; chip 'Model: borrow again each time, fee only' and muted reveal line. Non-blocking: the 364-day year is in the model but not stated to the learner (the reveal says 26 times a year); on a 365-day year it would be 391%. Builder may add '364-day year (26 two-week loans)' to the model line. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
