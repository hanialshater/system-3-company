# Fact-check: bad-start-kmeans (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; model re-implemented in artifacts/scratch/fc-aiecongeo/km.mjs. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Standard Lloyd iteration (Bishop 2006 s9.1). Toy conventions (ties to centre 1, empty centre stays) match Demo.tsx. |
| c2 | verified | Recomputed from (0,4): groups {0}|{4,6,10}, centres 0 and 6.667, 4 is 2.67 from it vs 4 from 0, cost 18.667 (shown 18.7), fixed point. |
| c3 | verified | Cost of {0,4}|{6,10} = 16, the global minimum over all 14 two-group splits; start (2,8) stays at (2,8). 40 of 121 integer starts in 0..10 reach 16 (the rest stop at 18.67 or similar). |
| c4 | verified | Cost never increased in any of 121 starts (monotone), so k-means settles at a local optimum; the worked example shows it is not the best. Restart practice is standard (k-means++, Arthur & Vassilvitskii 2007, SODA; scikit-learn n_init). I did not re-read Bishop for the restart wording; the claim does not depend on it. |

Stage check: reveal numbers (6.67, 2.67, 4, 18.7, 16) all match. "A start like 2 and 8 finds it" confirmed. Unrecorded claims: none.
