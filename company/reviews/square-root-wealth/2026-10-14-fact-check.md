# Fact-check: square-root-wealth (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 0.5 x sqrt(0) + 0.5 x sqrt(100) = 5. Demo.tsx COIN; stage message 'Coin: half of √0 plus half of √100 = 0 + 5 = 5'. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node: sqrt(25) - 0 = 5.00; sqrt(100) - sqrt(50) = 10 - 7.071 = 2.929 -> '2.93'. sqrt is strictly concave, so each extra dollar adds less. Gains drawn once met. |

**Result:** all open claims verified; no disputes.
