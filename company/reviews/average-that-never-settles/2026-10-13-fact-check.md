# Fact-check: average-that-never-settles (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner-visible text taken from Demo.tsx. Script: artifacts/scratch/fc-problife/a3.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Mean 3.5, SD 1.708; SD of a 10,000-roll average 0.017. In 400 seeded batches x 5 runs at 11,000 draws the worst die average was 0.052 from 3.5 (about 3.2 SD), so "pinned at 3.5" in the reveal is accurate. |
| c2 | verified | Standard Cauchy characteristic function exp(-abs t); the mean of n has exp(-abs(t)/n)^n = exp(-abs t), so identical to one draw. Standard result (stable law); I re-derived it rather than rely on the unread Feller chapter. |
| c3 | verified | P(abs X > 1) = 1 - (2/pi) atan 1 = 0.5 exactly (cauchyTail(1) = 0.5). Simulation across 400 fresh seeds: abs(mean at 10,000) > 1 in 47.0% (SE 2.5%). |
| c4 | verified | Re-run of batchRuns(0) and batchRuns(1) at 11,000 draws: die 3.455-3.534, Cauchy -0.094 to 2.566; die 3.487-3.503, Cauchy -1.944 to 1.677. Matches the claim. These are specific to seed 1853 (stated as untuned); the lesson's general statement rests on c2-c3. Over 200 other batches all five Cauchy averages were within 1 of 0 in 6 (3.0%), theory 3.1%. |
| c5 | verified (convention) | E abs X is infinite for the Cauchy, so the law of large numbers does not apply. |

No unrecorded learner-visible factual claims found.
