# Fact-check: dish-runs-out (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | 2^21 = 2,097,152 (fmt '2.1 million', 0.195% of 2^30, shown '0.2%'); 2^29 = 536,870,912 ('537 million') = half of 2^30. Demo.tsx 'To 7 h' and 'To 9 h 40' buttons. |
| c6 | verified | Demo.tsx: radius = R sqrt(n / 2^30) so area is proportional to cells; 100% message at 2^30; pctText() prints 'under 0.1%'; K = 1e8 and the switch reads 'One batch (feeds 100 million)'; reveal says the batch is made up. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
