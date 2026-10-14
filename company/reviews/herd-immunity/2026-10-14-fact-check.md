# Fact-check: herd-immunity (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c12 | verified | Demo.tsx: R0 = 4 contacts per case, uniform over the other 399; readout 'Each case infects 4 x U% = R' with shares 50/60/70/75/80/90: 2.0, 1.6, 1.2, 1.0, 0.8, 0.4; reffNote shrinks / just replaces itself / can grow. Model line on stage. Contacts that hit an already-sick person are wasted, so the readout is the starting value; the claim's wording is the standard R0 definition. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
