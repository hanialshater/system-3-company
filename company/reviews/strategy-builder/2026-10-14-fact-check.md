# Fact-check: strategy-builder (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | 30f + 9(1 - f) = 14f + 10(1 - f) gives 17f = 1, f = 0.0588. Pairing scores: TFT-TFT 10 x 3 = 30; TFT vs cheat 0 + 9 x 1 = 9; cheat vs TFT 5 + 9 = 14; cheat-cheat 10. Stage table, 'Points in 10 rounds' line and score-by-start chart match. |
| c3 | verified | Own replicator iteration (clamped, /15): rounded count first stays 0 at gen 37 (3%) and 48 (4%); first stays 100 at gen 28 (8%), 8 (25%), 37 (7%); 6% gives 18 at gen 60. 5.8% vs 5.9% go to 4 and 7 at gen 60 (opposite directions), though the slider is whole percent so those are not reachable. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
