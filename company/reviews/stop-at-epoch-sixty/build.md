# Build note: stop-at-epoch-sixty

- Intent: one plot of the degree-7 curve with 8 black training dots and 200 grey held-out dots; the curve moves as the learner scrubs training steps. Controls in order: presets 0 (start), 100, 1,000, 20,000, then a slider over 74 checkpoints (log spaced, presets included). Readouts: training error, held-out error (RMS). Curve and readouts hidden while locked.
- Own toy (the brief's numbers came from a different generator): truth sin(2x), x uniform on [−1, 1], noise 0.3, powers of x, GD step 0.1 from zero weights. Seed 12 was CHOSEN for a clear dip and is labelled "(chosen)" on the stage; the reveal says the dip moves and gives the spread (483/500 seeds have their minimum before the end; only 123/500 before step 100). The question says "In this run".
- Key states (milestones): "near-dip" (held-out ≤ 1.1 × the run's minimum: step 100 qualifies at 0.320 vs 0.299) and "climbing" (a later step with held-out ≥ 1.5 × minimum: step 1,000 at 0.486). QA path: 100 → 1,000 → 20,000 → slider.
- Reveal quotes the lowest held-out the learner saw and the furthest step they saw (with its training error), not the hidden 67-step minimum.
- Node check: model block extracted from Demo.tsx and run with --experimental-strip-types: 0:0.793/0.751, 67:0.238/0.299, 100:0.204/0.320, 1000:0.177/0.486, 20000:0.170/0.693. Training runs once in the browser (cached, about 30 ms).

## Revision v2

Learner review 2026-10-14. Option 2 now reads "Early, within the first 100 steps" (the dip is at step 67; the slider reaches steps below 100). Added a small error-against-steps chart (both errors, marker follows the slider) so the dip is seen, not only quoted. Glossed "degree-7 curve" as a flexible, wiggly line. c1 back to unverified (chart added). Not done: exaggerating the late wiggle, which would change the seeded run and its claims.
