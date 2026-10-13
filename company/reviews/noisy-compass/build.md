# Build note: noisy-compass (builder: demo-builder, sonnet build, EXP-003)

- Retitled from the slug's metaphor to "How steady is an average of 16 examples?".
- 30 steps, true slope 1, per-example noise N(0,1) via mulberry32 + Box-Muller, seed 11 (first seed tried, not tuned). A step at batch b is the mean of the first b of that step's 64 draws, so the dots contract as b grows.
- Measured sds on the stage: 1.18 / 0.58 / 0.23 / 0.13 for batch 1/4/16/64 (theory 1, 0.5, 0.25, 0.125). The reveal quotes both and the 2000-seed spread (batch 16: 0.20 to 0.30, p5 to p95). The question's 0.25 is the theory value; the stage shows 0.23 and the reveal says which is which.
- Milestones: batch-16 and batch-64 (QA path presses 4, 16, 64). Spread readout hidden while locked.
