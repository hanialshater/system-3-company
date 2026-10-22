# Build note: two-corners-off-the-board

builder: demo-builder (Meta M6, order O-8) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md, Wave J, brief 4 (check D4) · design: company/reviews/two-corners-off-the-board/design.md

- Intent: one SVG board (56-unit squares, 224 px). `isDark` = (r + c) even; dark squares carry a dot. The fixed placements are in `BOARDS` in Demo.tsx (3 best tries for the opposite-corner board, 3 of the 12 tilings for the one-row board) and are checked at module load (neighbours, disjoint, on the board). The readout is counted from the board, not typed.
- Placements were found by brute force over every set of disjoint dominoes (maximum 6 on the opposite-corner board, 154 maximum placements; 12 tilings of the one-row board, matching D4).
- Deviations from the brief, for cm-math:
  1. Predict question states the domino rule: "You have a 4 by 4 chequered board and dominoes that each cover two neighbouring squares. Take off two opposite corners: 14 squares are left. Can 7 dominoes cover them exactly?" (copy-style: every condition stated).
  2. Locked frame: readout "dark ? · light ?" instead of "dark 6 · light 8", so the counts that decide the question are not handed over before the commit (the dots still let a learner count). The counts appear once a board's try is drawn.
  3. At the reveal the stage shows both boards side by side in one SVG (the last try seen on each) with both readouts. The reveal quotes both boards; a single board would leave one of them off screen after Reset. Two separate 140 px boards were reported as thumbnails by reveal-fit; one picture across the stage width is not.
  4. Board colours are fixed (#4b5563 dark, #e5e7eb light) in both themes: with theme variables the "dark" squares rendered lighter than the "light" ones in the dark theme, contradicting the words.
  5. Reset returns to the locked frame's picture (opposite-corner board, no dominoes, "dark ? · light ?").
- Stage words at the busiest frame (the reveal frame): readouts "dark · light" ×2 = 4, "Opposite corners off" 3, "Corners in one row off" 5, "Another try" 2, "Reset" 1 = 15 (explore frame 13, as the brief counts).
- Title and hook are mine: "Two corners off the board" / "Take two corners off a 4 by 4 board. Can dominoes still cover the rest?"

## Pre-flight v1

1. Title and hook: "Two corners off the board" / "Take two corners off a 4 by 4 board. Can dominoes still cover the rest?" Neither says yes or no.
2. Options: "Yes" / "No": same precision, neither numbered.
3. Locked stage: the opposite-corner board (two dashed empty corners, dark squares with dots), no dominoes, readout "dark ? · light ?", all four controls disabled. No count, no outline, no domino.
4. Reveal values: "6 dark and 8 light", "at most 6 dominoes", "2 light squares were always left" = milestone `opp` (readout "dark 6 · light 8" counted from the board; 6 dominoes and 2 red-outlined light squares drawn, re-shown at the reveal from the recorded try); "7 and 7, and the board tiled" = milestone `row` (readout "dark 7 · light 7", 7 dominoes, re-shown at the reveal). "30 dark, 32 light" is told context (claim c3), not stage state.
5. QA path: "Opposite corners off" (opp), "Corners in one row off" (row), "Another try" (next tiling of the one-row board), Reset: both milestones by press 2. Checked in a 390×844 browser run, light and dark: each of the four presses changed the stage, the reveal button was enabled after them; the only console error is the environment-wide `/api/account/me` 404.
6. Reset: after the four presses (Reset last), the reveal read: "Every domino covers one dark and one light square, whichever way it lies. With opposite corners off you had 6 dark and 8 light, so at most 6 dominoes could fit and 2 light squares were always left. With two corners in one row off, 7 and 7, and the board tiled. | Counting colours proves no arrangement can work, without trying them all. The same count rules out a full chessboard with opposite corners off: 30 dark, 32 light." The stage beside it shows both boards: 6 dominoes with 2 outlined light squares and "dark 6 · light 8"; 7 dominoes and "dark 7 · light 7".
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3108 two-corners-off-the-board --shots` on a production build of this worktree: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, thumb false, phoneFit true; reveal 84 words (tool count, verdict line included); stage 340 px (picture 133, controls 140, text 19). Screenshot artifacts/reveal-fit/two-corners-off-the-board.png (git-ignored): both boards, both readouts and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Sizes: readout 0.95rem = 15.2 px; board squares 56 px in explore, about 33 px each at the reveal (one 504-unit picture across the stage); no SVG text. Controls ≥ 44 px tall.
- `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). Registry regenerated with `npm run registry` (test1 requires it).
- Official QA is code's qa stage; not run by me.
