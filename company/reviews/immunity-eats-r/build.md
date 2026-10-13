# Build note: immunity-eats-r (demo-builder, 2026-10-13)

- Design: a 20 x 20 toy town. 10 cases (outlined red) each have 4 contact lines (R0 = 4). A contact who is immune gets a dashed grey line; a susceptible contact turns red. Message: "60% immune: 24 of 40 contacts immune, 16 infected. R = 16/10 = 1.6."
- Honest-average choice: immunity follows a fixed shuffle (seed 24, layout only) in which the 40 contacts hold evenly spaced places, so the immune share of contacts equals the town's at every 5% step. The picture is the average case (R = R0 x S exactly), not one random draw; disclosed in c3 and in the reveal's model line.
- Brief answer checked: 4 x 0.4 = 1.6; threshold 75%. Options and reveal are computed from rEff().
- Reveal gate: milestones "question-state" (exactly 60%) and "threshold" (exactly 75%); the "60% immune" and "75% immune" chips are the first two controls. A slider (0-90%, step 5) lets the learner sweep.
- After screenshots: the greedy contact assignment drew long lines across the town; changed so each case's 4 contacts are the cells two steps away (immune order still a seeded shuffle with the contacts at evenly spaced places), and added "susceptible" to the legend.
- All claims unverified.
