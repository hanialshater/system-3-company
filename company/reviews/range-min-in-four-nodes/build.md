# Build note: range-min-in-four-nodes

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- Segment tree over 16 hand-picked values drawn as 5 rows of blocks (whole, halves, quarters, eighths, singles), each showing its minimum. The nodes a range uses are lit; a bar under the index row shows the range.
- Controls in DOM order: "Positions 3 to 12" preset, "Combine the lit nodes", From slider, To slider, "Change the value at 9" (cycles 2, 8, 4 and outlines the 5 nodes on its path).
- The brief asked for drag handles; two kit Sliders replace them (phone and QA friendly).
- Milestones (minInteractions 2): `range` (3..12 selected), `combined` (combined at 3..12).

## Checks run
- Node: cover(3,12) = [3], [4-7], [8-11], [12]; cover(1,14) = 6 nodes; max over all 136 ranges = 6; update path = 5 nodes.

## Choices to challenge
- The preset button hands the learner the key range; the sliders are there for their own ranges.
- c3 (at most about 2 log2 n) has no textbook source; derivation only.
