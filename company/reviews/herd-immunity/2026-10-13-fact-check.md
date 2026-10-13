# Fact-check: herd-immunity, claims c5, c9, c10, c11, c12 (2026-10-13)

Checker: fact-checker (independent of the 2026-10-12 checker who added c11 and c12 and ran the earlier tests). Script: artifacts/scratch/fc-problife/l5.ts (a copy of the lesson's own simulate(), run for the stage's 200 seeds and for 20,000 fresh seeds), l5b.mjs (exact binomial). Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c5 | verified | Final share of the unprotected infected, in outbreaks that took off (more than 20% of the unprotected), lesson model with 20,000 runs per setting: 79.6% at 50% immune, 63.6% at 60%, 51.2% at 65%, 39.0% at 70%, 31.4% at the 75% threshold (finite-town floor from the "took off" cut), 27% at 80%. It grows with distance below the threshold and is about 80% at 50% immune, as claimed. The final-size equation 1 - z = exp(-R_eff z) gives 79.7% at R_eff = 2 and 31% at R_eff = 1.2. The claim also says an outbreak "can still die out early by chance": take-off share is 90.8% at 50% immune and 12% at 75%. |
| c9 | verified | Stage's 200 seeds: mean 4.2 of 80 caught at 80% immune (5.2%), 145.9 of 200 at 50% (73.0%). A 20,000-run check gives 3.9 (4.8%) and 144.7 (72.3%), so "about 4 of 80 (about 5%)" and "about 73%" are stable. 3.2% of runs take off at 80%, matching "mostly". The count includes the first case (c4). |
| c10 | DISPUTED | As written ("each step of the outbreak usually is smaller than the one before") this is false per step. At 80% immune (20,000 simulated outbreaks, lesson model) a step is strictly smaller than the previous step in 17.5% of steps, equal in 57%, larger in 26% (counting only non-empty steps; including each chain's final step to zero, about 47% are smaller). From a single case: P(0 new) = 41%, P(exactly 1) = 41%, P(2 or more) = 18% (binomial, p = 79/399 per contact). What is true, and what the reveal says: each case causes 0.79 new cases on average, 96.9% of outbreaks fizzle at 16 people or fewer, and the mean outbreak is about 4 people. The reveal's own sentence ("The chain usually shrinks and dies") is accurate; the ledger claim is stronger than the reveal and wrong. A learner who steps an outbreak one generation at a time will often see a step the same size or larger. |
| c11 | verified | R0 = 5: R_eff = 5 x (unprotected share) < 1 iff unprotected < 1/5, i.e. immune above 1 - 1/5 = 80%. The recall card answer (80%) is correct; "20%" and "50%" are wrong, "100%" is not needed. |
| c12 | verified | 4 contacts per case chosen uniformly from the other 399; expected new cases per case at 80% immune = 4 x 79/399 = 0.792 (stage label 4 x 20% = 0.8, rounded) and 2.0 at 50% (4 x 199/399 = 1.995). |

## Fix routed to demo-builder (the claim text is the builder's to change)

Reword c10 to what the model supports, for example: "At 80% immune each case causes 4 x 0.2 = 0.8 new cases on average, so outbreaks usually fizzle: in the stage model about 97 in 100 outbreaks reach 16 people or fewer." Then re-check. The reveal text itself needs no change.

## Other checks

Reveal numbers "You saw 2 of 80 ... 168 of 200" are the learner's own runs (not a claim). "Unprotected people who cluster together can keep outbreaks going even above the threshold" is c6, already verified (not reopened). No unrecorded claims found.
