# Build note: four-queens-pruning (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 4 x 4 board of buttons; only safe squares in the next row can be tapped; tapping a queen backs up; attacked squares are marked. 'Step' and 'Run the search' continue depth-first search from the board as it stands, so hand play and the search share one board.
- Search controls sit ABOVE the board because QA presses only the first 16 controls and the board alone has 16.
- Reveal gate: both solutions found (by hand or by the search). Found solutions stay as mini boards after 'Start over'.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2
Learner review (2026-10-14) findings:
- Title and hook stated the answer ("sixteen moves", "a handful"). Retitled "Four queens: how many tries?"; hook asks.
- "Run the search" gave only a number. It still commits the final result at once (one-press path for QA), but the board now replays the search state by state (170 ms each), so dead ends ("Row 3 has no safe square") and back-ups are visible while the placement counter climbs to 16.
- Counter read 4 with one queen on the board: relabelled "Placements put down" with "(blind: 256 boards)" beside it, so retries are understood as placements.
- Question shortened. The 8-queens figures stay told in the reveal as a closing extension (c4, c5; not shown on stage).
- Not changed: the 75 s duration flag (category manager).
