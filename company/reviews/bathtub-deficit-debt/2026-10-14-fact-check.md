# Fact-check: bathtub-deficit-debt (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Demo.tsx levelAfter(): level + gap each month; Save applies two -$200 months; tap readout shows '-$200 / month'. Non-blocking: the toy floors debt at $0 (Math.max), so a $200 saving month lowers debt by less when debt is under $200; the chip does not say so. Not reachable from the key path (debt is $2,200 there). |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
