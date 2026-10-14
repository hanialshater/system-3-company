# Build note: random-dots-cluster (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Title "40 random dots. Any crowded squares?" Terms defined on stage: crowded (ringed) = 3 or more dots in a square.
- Controls: Drop 40 dots (1 batch), Drop 10 more batches, Drop 100 more. QA presses each once, so the path is 1, 11, 111 batches. Gate: milestones one-batch and many-batches (11 or more batches).
- Batch i = mulberry32(9000 + i), untuned. Tally on the click path: 1/1, 6/11, 60/111. Over 300 other seed sets of 111: mean 61.4 (55.3%), SD 5.0, range 47-74. Disclosed in claim 4. The reveal quotes the learner's own k of m and the exact 55.5%.
- Exact P: brief's 0.555 recomputed by polynomial coefficient extraction in doubles (not BigInt); also 25 dots 0.182 and 30 dots 0.293 match the brief.
- Not claimed: any real-world cluster (cancer clusters etc.).

## Revision v2

Review 2026-10-14: crowded squares looked like one blob and dots sat on grid lines. Dots are drawn inside their own square, off the lines (display nudge) and smaller; ringed squares show their count. Last reveal sentence softened to 'weak evidence'. c1, c5 reworded, unverified.
