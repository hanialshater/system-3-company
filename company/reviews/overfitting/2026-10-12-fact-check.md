# Fact-check: overfitting (2026-10-12)

Checker: fact-checker. Script: `artifacts/scratch/fc-overfitting.mjs`. The data generator (seed 5, truth, noise) is taken as a data spec from Demo.tsx; the fit was re-done differently (Householder QR on the design matrix, not normal equations).

## Per-claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 simulated data, noise sd 1.8, seed, 8 fit + 5 held out | verified | Spec matches Demo.tsx: 20 × 0.09 = 1.8, Box-Muller gives sd 1, 8 train and 5 test, truth 8 + 20(0.15 + 2.8t(1−t)). Realised sd over the 13 draws is 1.94 (normal sampling variation). Test noise is drawn independently of train noise. |
| c2 degree = bends + 1, at most d − 1 bends | verified | Matches FITS construction. Derivative degree argument is sound. |
| c3 6 bends (degree 7) passes through all 8 dots | verified | QR fit train miss 0.0000; train t values are distinct (min gap 0.079). |
| c4 held-out misses: line 4.1, 1–3 bends 1.5–1.6, 6 bends 5.1 | verified | 4.145, 1.518, 1.551, 1.560, 5.088. Intermediate: 4 bends 2.98, 5 bends 2.74. Stage readouts (4.2 / 4.1, 1.6 / 1.6, 0.0 / 5.1) and reveal (5.1, 4.1, 1.5) all match. |
| c5 overfitting definition; detected by held-out error | verified | Standard definition (Bishop §1.1; ESL §7.2). Pinpoints not re-read: books unreachable from this sandbox. |

Disputed: none. Withdrawn: none.

## Things the numbers do and do not support

- The headline ordering is partly a property of seed 5. Over seeds 1–500 with the same generator: 6 bends is worse than the best of 1–3 bends in 455/500 (91%), but worse than the straight line in only 190/500 (38%). The reveal's "worse than the straight line (4.1 °C)" is true of this data and false of most seeds; a learner may read it as a general rule. The claim as written (c4) is about these dots, so it stays verified; the generalisation is the risk.
- "Bends allowed" is a ceiling. The fitted degree-7 curve has 4 turning points inside the 6am-6pm window, not 6; degrees 3 and 4 have 1, not 2 or 3. Options such as "6 bends (hits all 8)" and the reveal's "At 6 bends" therefore mean "allowed", not "has".

## Learner-visible statements not previously recorded (added as unverified)

- c6 "Each reading is the day's smooth warming plus random jitter." The true curve rises 11 to 25 °C by noon and falls back to 11 °C by 6pm: a hump, so "warming" is half right.
- c7 "More bends push the training miss toward zero." Squared error never rises with degree (201.9, 28.3, 28.2, 28.2, 4.3, 2.0, 0.0), but the displayed mean absolute miss rises slightly from 1 to 2 bends (1.56 to 1.57); the claim holds as a trend.
- c8 "The jitter of new readings is different." True by construction (independent draws).
- c9 The stage never tells the learner the readings are simulated; only the trust sheet does (c1).

## Fixes routed to demo-builder (phrased as problems)

1. The reveal calls the data "the day's smooth warming", but the underlying curve warms and then cools; learners looking at the hump see a mismatch.
2. Nothing on the stage says the temperatures are invented; they read as real measurements. The honesty is only in "Why trust this?".
3. Copy says "6 bends" for a curve that visibly has fewer turning points; the learner may count and distrust the label ("allowed" vs "has").
4. The reveal states 6 bends beat the line only in the sense of being worse for this seed. The seed was chosen to show it (38% of seeds do). The trust sheet should say the seed was chosen, or the reveal should avoid reading as a general rule.

## Result
5 verified, 0 disputed, 4 added unverified.
