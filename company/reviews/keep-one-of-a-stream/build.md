# Build note: keep-one-of-a-stream (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #77 and spec company/design/specs/keep-one-of-a-stream.md (+ .svg).

## What was built
- Four item cards (arrived solid, waiting dashed, kept has a thick outline and a "kept" tag). Exact bars under each (computed 1/i, fraction printed). Item 1's chain "1 × 1/2 × 2/3 × 3/4" builds under the bars. A draw line explains the latest seeded draw; "seed 1" shown. "Run 1,000 streams" adds a tally tick on each bar and the count under it.
- Controls in DOM order (3, as spec): Next item · Rest of the stream (120 ms per item) · Run 1,000 streams.
- Milestones (minInteractions 2): stream-end, thousand. The reveal quotes the TALLY constant the stage shows.

## Checks run
- Node and the Demo's own constants: exact chances [1/2,1/2], [1/3 x3], [1/4 x4]; seed 1 draws 0.627 (stay 1), 0.003 (3 replaces), 0.527 (stay 3); tallies 236, 250, 257, 257.

## Seed choice (disclosed in claim c5)
- Seed 1 is the first seed tried. The spec's placeholder seed 7 gives 257, 247, 249, 247 (chi-square 0.27), flatter than typical, so I did not use it. Seed 1's chi-square is 1.18; the median over seeds 1-200 is 2.41, so seed 1 is a little flatter than median but not hand-picked.

## Choices to challenge
- Tally counts are drawn under the bars, not above, because the exact-fraction label sits at the same height as the tick.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.
