# Build note: one-in-a-million-match (demo-builder, 2026-10-12)
- Intent: 5,000 squares, each standing for 1,000 people. A slider grows the database from 1,000 to 5,000,000, and seeded chance matches appear as rings. At 1,000 the one ring is the culprit; at 5 million the culprit is one ring of six ("1 in 6").
- Gate: the reveal unlocks only when the learner reaches the full 5,000,000 (by slider or "Search all"). The locked stage starts at 1,000 people and hides the counts.
- I picked seed 28 so the full search shows exactly the expected 5. This is disclosed in model.ts and in claim c5.
- After screenshots: rings at the grid edge were clipped. I padded the viewBox, made the rings stronger and moved the readouts to their own row.
