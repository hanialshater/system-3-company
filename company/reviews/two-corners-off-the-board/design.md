# Design note: two-corners-off-the-board (math:colouring-invariant)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md`, Wave J, brief 4 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (D4)

## The payoff
A count can prove that something is impossible without trying every case. The learner sees the opposite-corner board fail again and again with the same leftover, always two light squares, then sees the one-row board tile, and the readout ("dark 6 · light 8" against "dark 7 · light 7") is the reason.

## Knowledge boundary (meta.json `learner`)
- knows: a domino covers two neighbouring squares; a chequered board.
- doesNotKnow: that counting colours can prove a tiling impossible without trying every arrangement.

## Misconception
Remove two squares from a board with an even number of squares and the rest can always be covered by dominoes, if you try hard enough.

## Objective
The learner can say that the 4×4 board without opposite corners cannot be covered by 7 dominoes, because every domino covers one dark and one light square and the board has 6 dark and 8 light.

## Prediction
Brief's kit text with the domino rule stated (copy-style: concrete second-person scene, every condition stated): "You have a 4 by 4 chequered board and dominoes that each cover two neighbouring squares. Take off two opposite corners: 14 squares are left. Can 7 dominoes cover them exactly?" Options: Yes / No (answer B).

## Interaction
- One 4×4 board (56 px squares, 224 px). Dark squares are a darker fill **and** a dot; removed corners are a dashed empty outline. Dominoes are rounded translucent bars over two squares, so the dot and the colour under each half stay visible: every bar visibly has one dot. Uncovered squares get a thick dashed red outline (outline, not colour alone).
- Locked frame: the opposite-corner board, no dominoes, readout "dark ? · light ?".
- Controls in brief DOM order: "Opposite corners off" (best try: 6 dominoes, 2 light squares outlined), "Corners in one row off" (a full 7-domino tiling), "Another try" (next fixed placement for the current board, 3 per board, cycling), Reset (back to the locked frame's picture). The current board's chip is active and disabled once its try is drawn.
- Readout under the board: counted from the board, "dark 6 · light 8" or "dark 7 · light 7".
- Milestones: `opp` (opposite-corner best try drawn), `row` (one-row board tiled). minInteractions 2. QA path: chip 1, chip 2, Another try, Reset.
- At the reveal both boards are shown side by side (140 px each) with the last try seen on each and both readouts, so the reveal's "6 dark and 8 light … 2 light squares" and "7 and 7, and the board tiled" are on the stage even after Reset.

## Reveal (brief draft, 79 words, unchanged)
"Every domino covers one dark and one light square, whichever way it lies. With opposite corners off you had 6 dark and 8 light, so at most 6 dominoes could fit and 2 light squares were always left. With two corners in one row off, 7 and 7, and the board tiled. Counting colours proves no arrangement can work, without trying them all. The same count rules out a full chessboard with opposite corners off: 30 dark, 32 light."

## Told vs shown
The cause (one dark + one light per domino; 6 ≠ 8) is shown: every bar sits on one dotted square, the readout gives the counts, and every "Another try" leaves two outlined light squares. The 8×8 sentence is told context (claim c3).

## Recall
6 by 6 board missing two squares of one colour: 17 dominoes? → No, never (claim c3).
