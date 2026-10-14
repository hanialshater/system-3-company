# Build note: heap-bubble-up (demo-builder, 2026-10-13)

- Design intent: the min-heap drawn as a tree with each node's array index under it (i=0 ... i=5) and the array read off below in one line. A note line states the rule ("Every parent is smaller than its children", then "1 < parent 3: swap" / "1 is at the top: stop"); the edge to the parent glows when a swap is due. Buttons: Start over (first in DOM, disabled at the start), Add 1 at the end, Swap with parent (step), Swap until it stops (instant jump). Readouts: swaps, tree height.
- Key state: one swap, then 1 at the root. Milestones ["one-swap", "at-root"], minInteractions 2. QA path: Add (index 5), Swap (to index 2), Swap until it stops (to index 0): [1, 5, 2, 9, 6, 3].
- Numbers: option A and the reveal's array are FINAL, computed with the same bubble() the stage uses; height floor(log2 6) = 2 and floor(log2 1e6) = 19 computed in code. Brief answer (A) re-computed in Node and held.
- One representation: tree plus a single text line for the array (the question is posed in array form, so the array is read off, not drawn twice).
- After screenshots: reads on phone; hook trimmed to fit the 90-character budget.


## Revision v2

Review: programmer vocabulary in the question; rule vanished while exploring; log2 and tree height told. Changes: question in plain words (list read top to bottom, left to right); rule stays in the stage note; readout renamed Levels below top; reveal speaks of one swap per level. c3, c4 unverified. Version 2.
