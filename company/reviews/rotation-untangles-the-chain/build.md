# Build note: rotation-untangles-the-chain

builder: algo2-sd · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/rotation-untangles-the-chain.md` (+ svg) and brief #61 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (node, own script, then the Demo.tsx logic itself transpiled and run)
AVL insertion of 1..7, height in levels. Heights after each key 1, 2, 2, 3, 3, 3, 3; root 4; 4 rotations, all single left: at 1 (key 3, 2 moves up), at 3 (key 5, 4 up), at 2 (key 6, 4 up), at 5 (key 7, 6 up). Plain tree: chain, height 7. Matches brief and spec.

## Built as specced
Before / after toggle, starting on Rotating. Rule line per mode; tree laid out by in-order column (7 columns, 46 px apart, levels 40 px apart), so keys only move up and down; key row under the tree (inserted solid, waiting dashed). On a rotation the nodes tween from the pre-rotation shape to the rotated one (300 ms, 40 ms during "Insert the rest", none under reduced motion), and the pre-rotation subtree stays as a dashed `--muted` ghost with the note "Rotated at X: Y moves up" until the next press. Readouts Height (levels) and Rotations; results Plain ? / Rotating ?. Four controls in DOM order: Insert next key, Insert the rest (50 ms a key), chips Plain and Rotating; switching after all seven replays the new mode to seven. Milestones `first-rotation` (rotating, key 3 in) and `seven-rotating`; minInteractions 2.

## Choices and deviations
- The note is a text line under the tree, not placed beside the ghost inside the SVG, so it never collides with nodes. Same words.
- During the tween the edges switch from the pre-rotation edges to the new ones at 40% of the slide.
- All controls are disabled while a replay runs.
- Title "A tree that fixes itself" (wireframe working title); the hook is my wording.

## Problems found in the brief or spec
None. Claim c4 (the 1.44 log2(n+2) bound, Adelson-Velsky and Landis 1962) is written from the brief and still needs a source opened.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-lopsided-tree-r6.md)
- Top finding (the first rotation was passed in a bulk replay, yet the reveal quoted it): the stage opens with keys 1 and 2 placed, so the first "Insert next key" inserts 3 and the learner watches 2 lift above 1 and 3 (300 ms tween, then a domain-coloured arrow up 2's column). first-rotation fires only from that step, and "Insert the rest" is disabled until it has. The reveal quotes the recorded rotation ("at key 3, you saw 2 rise above 1 and 3").
- Ghosts: only the keys that moved are drawn dashed (domain tint), plus the arrow for the lifted key.
- Note text now names the cause: "Key 3 made 1's side too deep: 2 lifted up". New claim c6.
- Leak: title "A tree that fixes itself" and hook "Does the search tree have to become a chain?" pointed away from 7. New title "Sorted keys meet a rotating tree", hook "Keys 1 to 7 arrive in sorted order. How tall does the search tree get?".
- Results are recorded as {height, rotations}; the Rotating readout shows "3 levels, 4 rot." so the reveal's "4 rotations" is on stage. "1 levels" grammar fixed.
- Not done: the reported cropping at the top looks like the walkthrough's scroll position, not the SVG (viewBox 342 × 324 holds the 7-level chain); not reproduced here.

## Pre-flight v2
1. Title and hook: "Sorted keys meet a rotating tree" / "Keys 1 to 7 arrive in sorted order. How tall does the search tree get?" No height is named, and nothing says the tree stays short.
2. Options: "7 levels" · "5 levels" · "3 levels". All numbered the same way.
3. Locked stage: keys 1 and 2 as a two-node chain (1 above 2), the 1–7 column row with 1 and 2 filled, Height "2 levels", Rotations 0, Plain ? / Rotating ?. Nothing shows 3 or a balanced shape.
4. Reveal values: "3 levels tall" and "4 rotations" (milestone seven-rotating, recorded in results; shown as Rotating "3 levels, 4 rot."); "the plain tree was a chain of 7" (recorded when the plain tree reaches 7 keys; shown as Plain "7 levels"; the clause is left out if the learner never ran Plain); "at key 3, you saw 2 rise above 1 and 3" (milestone first-rotation, recorded at the step; key row and tree show 2 above 1 and 3 whenever the rotating tree is full).
5. QA path: Insert next key (key 3, first-rotation), Insert the rest (replay to 7, about 200 ms; seven-rotating), Plain (replays the chain to 7, about 350 ms), Rotating (replays back). Both milestones in two presses; the question's case (all 7 keys in the rotating tree) is seven-rotating and its readout stays.
6. Reset: no Reset control. Switching trees restarts the drawing but not the recorded results or the first rotation. Reveal after that path: "Your tree took 1 to 7 in order and stayed 3 levels tall; the plain tree was a chain of 7. Each time one side got two levels deeper, a rotation lifted the middle key: at key 3, you saw 2 rise above 1 and 3. / No key ever left its column, so the left-to-right order, and every search, stayed valid. 4 rotations in all. Doing this at every insert keeps the height close to log₂ of the number of keys."
