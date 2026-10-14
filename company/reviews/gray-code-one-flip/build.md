# Build note: gray-code-one-flip (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #66 and spec company/design/specs/gray-code-one-flip.md (+ .svg).

## What was built
- One ladder: n · Binary (three lamps + digits) · flips · Gray (three lamps + digits) · flips. Rows appear as the learner counts; lamps changed from the row above are ringed; the newest row is outlined. Totals row under the ladder.
- Controls in DOM order (2, as spec): Next number · Count to 7 (50 ms per row).
- Milestones (minInteractions 2): three-to-four (row 4), at-seven.

## Checks run
- Node and the Demo's own functions: Gray 000 001 011 010 110 111 101 100; binary flips 1 2 1 3 1 2 1 = 11; Gray 7; 3 to 4 flips 3 vs 1.

## Open
- The rotary-encoder sentence (claim c5) and the patent number are unverified; the patent is not quoted on the stage.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.
