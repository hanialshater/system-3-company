# Fact-check: tree-count-explodes (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own brute-force enumeration of rooted binary trees on labelled leaves: 1, 3, 15, 105, 945, 10,395 for 2-7 species, matching (2k - 3)!!; 1 x 3 x 5 x ... x 17 = 34,459,425. Stage message prints the running product; 'Move newest species' cycles its place. |
| c3 | verified | Locked stage message 'Toy: rooted trees with two branches at each fork' and reveal 'Only trees with two branches at each fork are counted'; START_PICKS from mulberry32(5) affects only the drawing; trees(k) does not read picks. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
