# Build note: boyer-moore-skips-ahead (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #55 and spec company/design/specs/boyer-moore-skips-ahead.md (+ .svg).

## What was built
- Two stacked lanes over "HERE IS A SIMPLE EXAMPLE" (24 cells of 14 px, spaces as faint dots): plain left to right on top, Horspool from the end below. One comparison per press in each lane; a miss slides at once (200 ms CSS transition, none under reduced motion). Read letters keep a dot. Horspool shows a dashed ghost of the previous placement for the press that slid it, and the rule line is replaced by the reason ("S is not in EXAMPLE: slide 7"). Slide table cells under the lanes; the cell of the latest slide is outlined.
- Controls in DOM order (2, as spec): Compare · Compare to the match (14 ms per comparison).
- Milestones (minInteractions 2): first-skip (first 7-letter jump, press 1), both-matched.

## Checks run
- Node and the Demo's own traces: Horspool 15 comparisons, placements 0, 7, 9, 15, 17 (5), reads 13 letters, 11 never read; plain 27 comparisons, 18 placements, reads all 24. Table E6 X5 A4 M3 P2 L1, other 7.

## Correction carried
- The brief said 4 alignments; the spec says 5 and this build reproduces 5 (claim c1). Brief owner cm-cs-algorithms should change the brief's check line.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.
