# Build note: count-the-out-of-order-pairs

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- Lanes: left [2 4], right [1 3 5], out row. Take next moves the smaller front card out; when a right card is taken, red arcs go to the left cards still waiting and the counter adds that many.
- Controls: Take next, Finish the merge, Start over. Readouts: out-of-order pairs, cards taken; a line lists the pairs found.
- Milestones (minInteractions 2): `jump` (a right card jumps someone; the first press), `merged`.

## Checks run
- Node: brute force 3 ((2,1), (4,1), (4,3)); 5 4 3 2 1 gives 10; sorted gives 0; merge log 1(+2), 2, 3(+1), 4, 5(+0); merge-sort count equals brute force on all 720 orders of 1..6.

## Choices to challenge
- Only the top-level merge is shown; the halves are given already sorted, so the recursion that makes it O(n log n) is told in the reveal, not shown.
- Arcs run from the taken card in the out row up to the waiting left cards; they may read as clutter on a phone.
