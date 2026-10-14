# Fact-check: extra-hundred-a-month (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own amortisation (fc18/loan.mjs): payment 1,199.10; +$100 pays off at month 295 = 24 y 7 m; no extra 360. |
| c7 | verified | Own run: balance after month 1 is 199,800.90 (no extra) and 199,700.90 (+100); month-2 interest 999.00 vs 998.50; repaid 200.10 vs 300.60. Demo.tsx stage line 'Month 2 payment ...' and reveal use path[1]. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
