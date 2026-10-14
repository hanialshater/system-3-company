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
