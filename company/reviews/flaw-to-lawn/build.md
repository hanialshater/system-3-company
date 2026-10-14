# Build note: flaw-to-lawn

Builder: algo-pair-04 (demo-builder). Status: draft. Kept from evaluators until they report.

## What was built
- 5 x 5 edit-distance grid, FLAW (rows) against LAWN (columns). Row 0 and column 0 are given; the learner fills the 16 inner cells.
- Controls (all present at first render, 6 in DOM order): Next cell, Row F, Row L, Row A, Row W, Trace back from the corner. QA presses at most 16; the brief's per-cell path needed 17, so the row buttons fill to the end of a row. Next cell moves one cell; Trace is disabled until the corner is filled.
- Milestones (minInteractions 2): `filled` (all 16 cells) and `traced` (corner trace). One-press QA path: Next cell, Row F, Row L, Row A, Row W, Trace.
- Each newest cell shows a line and dot to the neighbour it copied from, and one sentence ("A vs N: the cheapest neighbour is left (1 + 1 = 2)"). The corner shows "?" until filled. The answer 2 is not on screen before the prediction (only the given row and column, 0 to 4).
- Reveal quotes only reached states: the corner read 2 and the traced edits (delete F, keep L A W, insert N), computed from the same grid.
- No jump-to-answer control: the corner cannot be filled before every cell before it.

## Checks run
- Node: Levenshtein DP = 2; BFS over single-letter insert/delete/replace = 2; KITTEN to SITTING = 3 (control); positional mismatches = 4. Grid in Demo.tsx is computed with the recurrence, and equals rows 0 1 2 3 4 / 1 1 2 3 4 / 2 1 2 3 4 / 3 2 1 2 3 / 4 3 2 1 2.
- Reference only: TheAlgorithms/Python strings/levenshtein_distance.py. No code copied.
- All 7 claims in meta.json start `unverified`.

## Choices to challenge
- Trace-back tie-break order is diagonal, above, left. The traced path is unique here, so the choice is invisible in this lesson.
- Claim 7 ("Spell checkers and DNA alignment fill this grid") is loose; they fill grids of the same kind. The fact-checker may want the wording tightened.
- Curriculum reference chapter (CLRS 4th ed. ch. 14) is from memory and unverified.
- Format id `storyboard-scrub` is used although the stage is a stepper, not a time scrubber.
