# Build note: lopsided-tree (demo-builder, 2026-10-13)

- Design intent: seven key tokens; tapping a token inserts that key into the tree at once (smaller left, larger right). The tree is drawn with x = key and y = level, with 7 dotted level lines so depth reads off the picture. The path to 7 is highlighted; readouts give levels and steps to find 7. A preset inserts 4 2 6 1 3 5 7 in one tap.
- Key state: a full 7-key chain (7 levels) and a full tree of any other shape. Milestones ["chain", "other-shape"], minInteractions 2. QA path: tokens 1..7 in DOM order build the sorted chain; Clear; preset builds the 3-level tree.
- Numbers: the question's 7 and the reveal's 7 and 3 come from build()/levels() in Demo.tsx, the same code that draws the stage. Brief answer (C, 7 levels) re-computed in Node and held.
- Locked: tree is empty, readouts show a dash.
- After screenshots: level label 3 sat under node 1; moved the columns right (x = 36 + 44(k-1)).
- Open risk: the reveal can quote up to the last three trees built; a learner who taps a zigzag order (also 7 levels) gets the chain milestone without the sorted order.
