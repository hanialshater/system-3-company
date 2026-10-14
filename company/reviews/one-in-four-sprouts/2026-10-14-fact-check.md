# Fact-check: one-in-four-sprouts (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | (3/4)^4 = 81/256 = 0.316; 1 - 0.316 = 0.684. Stage message at 100 families: '3/4 x 3/4 x 3/4 x 3/4 = 32%' beside the count with none white. |
| c4 | verified | Own replay of batch(1) (mulberry32(104736), two r() < 0.5 draws per seed): 67 with a white flower, 49 exactly one, 33 none. Expected 68.4 and 42.2. Non-blocking: the claim's source and a Demo.tsx comment mention a 'New field' control that no longer exists (seed is fixed at 1); builder should update the source string. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
