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

## Pre-flight v2

Revision for r6 learner review (knows-edit-distance, revise): "Fill the rest" could skip every match/mismatch step, so the cell rule arrived told.
Changes: "Fill the rest" is disabled until the learner has stepped onto one mismatch and one match (two new milestones, `mismatch` and `match`, so minInteractions 4). Each step message now names the cell's meaning ("Best for ABC vs BD."). Start over is disabled once traced, so the traced grid is still on stage at the reveal. c3, c4 set unverified.

1. **Title and hook.** "Shared letters, gaps allowed" / "ABCBDAB and BDCABA share only 2 letters side by side. Allow gaps: how many now?" No: 2 is the premise, not an option; nothing points to 4 over 3 or 5.
2. **Options.** "3 letters", "4 letters", "5 letters": all numbered, same precision.
3. **Locked stage.** Header letters, zero row and column, empty cells, "?" in the corner, "Cell 0 of 42". Nothing reads 4 or highlights BCBA.
4. **Reveal values.** Corner 4: milestone `filled` (stage shows it in the corner cell and stays filled). BCBA: milestone `traced` (path and letters stay highlighted; Start over now disabled once traced). Block 2 (AB or BD): the hook's own premise, told, claim c1. "Your first steps showed it": milestones `mismatch` and `match` on the required path.
5. **QA path.** Next cell (A vs B, mismatch) -> Next row (lands on A vs A, match; Fill unlocks) -> Fill the rest (`filled`) -> Trace back (`traced`) -> Start over is disabled. All four milestones in order; the traced grid is visible at the reveal.
6. **Reset.** Start over is disabled after the trace, so the reveal opens over the traced grid: "Your corner read 4, and the trace picked BCBA: B, C, B, A appear in this order in both strings, with gaps. The longest block side by side in both is only 2 letters (AB or BD). No 5-letter sequence is shared. / Your first steps showed it: each cell asked one small question: do these two letters match? If so, extend the answer from the diagonal; if not, take the better of dropping a letter from either string. Diff tools that show what changed between two files are built on this idea."
