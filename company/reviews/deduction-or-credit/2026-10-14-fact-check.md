# Fact-check: deduction-or-credit (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 20% x 10,000 = 2,000; 20% x 9,000 = 1,800; cut 200 = 20% x 1,000. Demo.tsx baseTax()/dedBill() and the bar labels print these. |
| c3 | verified | Own node: deduction cuts 100, 200, 300, 400 at 10-40%; credit cuts 1,000 at every rate (bill is 1,000 or more at 10%+, so the credBill() floor at 0 never binds). Slider is 10-40% with both bars shown. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
