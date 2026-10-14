# Build note: blocked-cell-routes (demo-builder, 2026-10-13)

- Design intent: a 4 x 4 grid of cell buttons ("start", "end", ✕ on the blocked row 2, column 2). Tapping a cell fills it with left + above, but only once both are filled. Otherwise the stage says which neighbour to fill first. The message shows the sum ("4 from the left + 4 from above = 8"). The blocked cell fills with 0. "Remove the block" (after the grid) updates every filled cell at once (corner 20); "Put the block back" restores it.
- Key state: the blocked cell filled with 0, and the corner filled while the block is in place. Milestones ["blocked", "corner"], minInteractions 2. QA path: the 16 cells in row-major order (each one's left and upper neighbours are already filled), so QA fills the whole grid, corner 8. The toggle is the 17th control, so QA does not press it. The reveal adds the 20/12 sentence only if the learner removed the block.
- Numbers: 8, 12 and 20 come from counts() in Demo.tsx. Node: blocked grid [[1,1,1,1],[1,0,1,2],[1,1,2,4],[1,2,4,8]], open grid corner 20.
- Retitled: "One blocked square: how many routes?".
- After screenshots: reads on phone. Once filled, the blocked cell shows a red 0 and loses its hatching; still distinguishable.

## Revision v2 (wave C, learner review)

- 16 taps of chores: tapping the first cell on an edge fills that whole edge (1 route each; the stage says why). c3 extended.
- Contrast 20 vs 8 never seen: when the corner reaches 8 the stage prompts 'Remove the block to see how many it cut.' The reveal quotes 20 vs 8 only if the learner removed it. Not gated (the toggle is the 17th control, past QA's reach).
- Reveal said 'You filled N cells': now 'Your grid has N cells filled'.

All changed claims are unverified, awaiting a fact-checker.
