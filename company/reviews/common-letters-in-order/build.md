# Build note: common-letters-in-order

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally (shared machine; integrated build runs after merge).

## What was built
- 8 x 7 LCS grid, ABCBDAB (rows) against BDCABA (columns); zero row and column given; 42 inner cells.
- Controls in DOM order: Next cell, Next row, Fill the rest, Trace back from the corner, Start over. The brief's "tap a cell" would need 42 taps (QA presses at most 16), so filling goes cell / row / rest.
- Milestones (minInteractions 2): `filled`, `traced`. The one-press QA path reaches both.
- The newest cell shows a line to the cell its value came from and one sentence (match: diagonal + 1; mismatch: larger of up and left).
- Trace back (diagonal on a match, else the larger neighbour, up on ties) lights the path, the 4 matched cells and the header letters: BCBA.

## Checks run
- Node: grid corner 4; brute force over all subsequences gives max 4, exactly BCAB, BCBA, BDAB; longest common block 2 (AB, BD); traceback with up-on-tie spells BCBA.

## Choices to challenge
- Only one of the three length-4 answers is shown; the reveal does not mention the other two.
- c6 (diff tools) cites Hunt and McIlroy 1976 from memory.
