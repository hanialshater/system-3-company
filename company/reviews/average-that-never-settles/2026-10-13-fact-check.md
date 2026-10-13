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

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c4 | verified | The stage draws 30 seeded runs of each kind. After 1 draw, 17 of 30 Cauchy dots are beyond... | Re-ran dots() from model.ts in node (seed 1853): 17/30 beyond +/-1 and die span 5.00 at 1 draw; 18/30 and span 0.07 at 10,000; farthest Cauchy dot 24.7 with one draw 250,115 (/10,000 = 25.0). Over 200 other seeds the mean count beyond +/-1 is 15.1 (1 draw) and 14.6 (10,000), expected 15, so the seed is not unusual; die span at 10,000 ranges 0.04-0.12 over those seeds. |

## Result (pass 4)
1 verified, 0 disputed, 0 left unverified, 0 added unverified.
