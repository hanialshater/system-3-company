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

## Pre-flight v4

Revision for r6 learner review (adult-beginner, revise): the ~9 s run disabled every other control, so the QA path never reached the reveal; 16 options matched the board's 16 squares; "placements" vs "Tries".
Changes: a "Finish the run" button (enabled only while the run animates) completes the same search at once. The finished run is kept in a line under the board ("Your run from empty: 16 tries, 2 solutions, the first at try 8.") that Start over does not clear. Options are now ranges. The question says "tries", like the stage. The "Run from empty" active tint and the row-1 outline are gone from the locked frame. The coincidence sentence and claim c6 are dropped (16 is no longer an option). c2 is set unverified.

1. **Title and hook.** "Four queens: how many tries?" / "256 ways to put one queen in each row. How many must you try?" No: 256 is the blind count, and nothing hints at "under 30".
2. **Options.** "Under 30", "30 to 150", "Over 150": all ranges with numbers, same precision.
3. **Locked stage.** An empty 4x4 board with no outline or tint, "Make a prediction to start.", "Tries 0 (blind: 256 boards)", "Solutions 0 of 2". Nothing matches "under 30".
4. **Reveal values.** 16 tries, 2 solutions, first at try 8: (b) recorded when the run from empty finishes (the only milestone, required) and still shown in the persistent result line. 256: the blind count, on the stage readout throughout. 16,777,216 and 2,056 for 8 queens: context that is told and claimed (c4, c5), not said to be seen.
5. **QA path.** Run from empty (animates) -> after ~450 ms "Finish the run" is enabled; pressing it finishes the search (milestone, result recorded) -> Step disabled (done) -> Start over clears the board -> squares. The result line stays visible.
6. **Reset.** After Start over the board is empty, but the line reads "Your run from empty: 16 tries, 2 solutions, the first at try 8." Reveal: "Your search from an empty board made 16 tries and found 2 solutions; the first came at try 8. A blind check would look at all 256 one-per-row boards. / Placing only on safe squares notices a clash the moment it happens (the × marks), so every board that starts that way is skipped at once. The saving grows fast: 8 queens have 16,777,216 one-per-row boards, but backtracking makes 2,056 placements to find all 92 solutions. / Pruning early is what makes search possible."
