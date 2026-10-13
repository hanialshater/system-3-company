# Fact-check: dish-runs-out (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l3.mjs. Stage text from the walkthrough transcript; model read from Demo.tsx.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 10 h / 20 min = 30; 2^30 = 1,073,741,824. |
| c2 | verified | 7 h = step 21: 2^21 = 2,097,152 = 0.195% of 2^30 (under 1%); 9 h: 1/8 of the final count, so 7/8 (87.5%) arrives in the last hour; 9 h 40 min: exactly half, so half arrives in the last 20 minutes. "Dish" fill is by area proportional to cells, as stated in Demo.tsx. |
| c3 | verified | Logistic N(k) = K/(1 + (K-1)e^(-k ln 2)), K = 1e8: 512 at 3 h (same as unlimited), 57.3 million at 9 h, 91.5 million at 10 h, never above 1e8. Matches the transcript (57.3 and 91.5 million). It stays within 10% of unlimited doubling until step 24 (8 h), so "looks the same at first" holds. At 10 h it is still creeping up (+7 million over the last step); "stopped" in the reveal and "Growth stalls" on the stage describe a flattening curve (8.5% of food left), not a complete stop. Non-blocking wording note for demo-builder: "levelled off near 100 million". |
| c4 | verified | Monod (1949), Annu. Rev. Microbiol. 3: 371-394, "The growth of bacterial cultures", describes batch growth with a nutrient-limited stationary phase; the claim is textbook-standard microbiology and the citation matches. |
| c5 | verified | E. coli doubling about 20 min in rich medium at 37 C is standard (Brock; Sezonov, Joseleau-Petit & D'Ari 2007, J. Bacteriol. 189(23): 8746-8749, on E. coli in LB). The claim is hedged ("can", "many bacteria are far slower"). |
| c6 | verified (convention) | Modelling choice stated on the stage and in the reveal ("The food batch here is made up"). |

No unrecorded claims found.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c1, c2, c3, c6.

Node: 2^30 = 1,073,741,824; 2^21 = 2,097,152 (0.2%); 2^29 = half. Logistic K=1e8: 512 at 3 h, 57.3M at 9 h, 91.5M at 10 h.
