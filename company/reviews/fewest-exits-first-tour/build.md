# Build note: fewest-exits-first-tour

builder: algo2-sd · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/fewest-exits-first-tour.md` (+ svg) and brief #52 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (node, own script, then the Demo.tsx logic itself transpiled and run)
Squares (column, row), (0,0) top-left; moves (1,2) (2,1) (2,-1) (1,-2) (-1,-2) (-2,-1) (-2,1) (-1,2) as (right, down). Onward count = legal moves to unvisited squares (the current square counts as visited). Rule B ties go to the first in the order. 5×5: A 21, stuck at (1,3), unvisited (0,2) (0,3) (0,4) (1,4); B 25, ends at (0,2). 8×8: A 36 (28 unvisited), B 64. Both rules take (1,2) first; at move 2 A takes (2,4), B takes (0,4). Matches brief and spec.

## Built as specced
Two 5×5 boards side by side, each with its rule line; A has the move-order glyph (knight with targets 1-8). Visited squares tinted with visit numbers; knight glyph on the current square; legal next squares dashed with an onward-moves badge (hidden on 8×8); the rule's next pick has a solid 2 px outline. A stuck board rings the knight in `--bad`, hatches the unvisited squares and says "stuck at N". Results table 5×5 / 8×8 × A / B, "?" until a run ends. Three controls in DOM order: Move (both boards in step), Move until stuck (≤ 16 ms a move, ≤ 400 ms), Board toggle (`aria-pressed`; replays the new size to the end if the current runs had ended, 64 moves in about 380 ms). Instant under reduced motion. Milestone `both-ended-5x5`; minInteractions 1. The reveal quotes the table and adds the 8×8 sentence only when both 8×8 cells are filled.

## Choices and deviations
- The current square shows the knight and no visit number; "Visited: N" under the board gives the count.
- All controls are disabled while a replay runs.
- Board `aria-label` is "Rule A: stuck after 21 squares, 4 unvisited" (spec form); a full board reads "visited all 25 squares".
- Squares alternate a faint chessboard shade so the 8×8 grid reads; unvisited squares are hatched only when that board is stuck.
- Knight is U+265E with U+FE0E (text presentation), so phones do not swap in an emoji.

## Problems found in the brief or spec
None. Claim c5 (Squirrel and Cull 1996) is written from the brief and still needs the paper opened.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
