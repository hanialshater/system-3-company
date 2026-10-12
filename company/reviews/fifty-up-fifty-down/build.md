# Build note: fifty-up-fifty-down (demo-builder, 2026-10-12)

- Intent: the start price is a dashed unit square; the rise widens it by p, the fall cuts a band of height p across the *risen* width. The leftover rectangle is the final price, (1+p)(1-p); the red corner p×p is the net loss.
- Slider steps 0/25/50/75% so the learner (and QA) pass through 50%; the reveal unlocks only once 50% has been on stage. Locked stage shows p = 0 (100), nothing that hints at 75.
- After screenshots: the first version labelled only the corner ("−25"), which a beginner cannot read. Added "+50" on the added strip, "−75" on the cut band and "net −25" on the corner; moved the big final number off the dashed line.
