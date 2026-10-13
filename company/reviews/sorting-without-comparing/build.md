# Build note: sorting-without-comparing (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: ten score tiles, six numbered bucket buttons, a ten-slot output row. Tapping a tile drops it into the bucket with its number (dots). Once all are dropped, the buckets enable one at a time in order; each press writes that bucket's scores into the output.
- Milestones: "dropped" (all ten dropped) and "read" (all six buckets read out). Reveal is gated on both, and the QA path (10 tiles then 6 buckets = 16 controls) reaches both.
- Comparisons readout is a constant 0 because no code path compares scores; the other readout counts output slots.
- Options 9 and 33 are distractors only; the reveal does not explain them.
