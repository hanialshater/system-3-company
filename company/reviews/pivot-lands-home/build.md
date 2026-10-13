# Build note: pivot-lands-home (demo-builder, 2026-10-13)

- Design intent: the seven cards across the top (pivot 5 marked), an empty row of seven numbered slots below. Tapping a card shows the comparison ("2 < 5: left pile") and drops it into the next free slot from the left (smaller) or from the right (larger). When the last card is placed the pivot falls into the remaining gap, position 3, and turns green ("home"). "Partition each pile" then partitions every unsorted pile around its first card, one level per press, until every slot is green.
- Deviation from brief: the learner does not choose pivots for the piles (always the first card of each pile); choosing would add a control per pile and a second idea. Placed cards stay as disabled dashed placeholders so QA's DOM order does not shift.
- Key state: the pivot dropping home, then one recursive pass. Milestones ["pivot-home", "recursed"], minInteractions 2. QA path: the six cards in order, Partition each pile, Start over.
- Numbers: the question's list, options (2, 3, 4) and the reveal's 3 come from CARDS/SMALLER in Demo.tsx. Brief answer (B, 3) re-computed in Node and held. With tap order 2 8 1 9 3 7 the row sorts in 3 passes.
- After screenshots: seven 40 px cards fit a phone row; no changes.
