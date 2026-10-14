# Build note: a-star-heads-for-goal

builder: algo-pair-12 · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/a-star-heads-for-goal.md` (+ svg) and brief #18.

## Answer check (node, same algorithm and tie-break as Demo.tsx)
Open: guess 7 settled / route 6; no guess 31 / route 6. Wall (col 3, rows 2-4): guess 16 / route 10; no guess 46 / route 10. Matches spec. Tie-break: lowest score, then more steps taken, then first added; the goal counts when settled. Disclosed in claims c1 and c2 and in one muted line of the reveal.

## Built as specced
One 7x7 grid, 5 controls in DOM order (Settle next, Settle to goal, No guess, With guess, Wall toggle), all present at first paint and disabled while locked. Replay plays every settle in order (<= 13 ms a cell, <= 400 ms; instant under reduced motion). Ghost dots for the previous run. 2x2 table of results. Milestones plain-at-goal and guided-at-goal, minInteractions 2. No jump to the answer: the 7 is only reached by settles being played.

## Choices and deviations
- Controls are disabled while a replay runs (busy), so a press cannot cut a replay in half.
- Chip for the active mode is `active` and disabled (as specced), so the learner must press the other one.
- The reveal quotes only filled table cells; "both routes were N steps" appears only when both rows of that wall setting are filled.
- `.tap` is not defined in the shared CSS yet; the lesson sets min-height 44px on `.tap` in its own module.
- Stage words at the busiest moment: rule 13 + table 6 + cell 4 + "Rank by" 2 = 25.
- references left empty: no work in content/works.json covers A* (CLRS 4e is the only entry).

## Problems found in the brief or spec
None blocking. The brief's drag-a-wall is replaced by the toggle (spec already says so).

## Checks skipped
next build, QA, walkthrough and full tsc were not run (machine out of memory, coordinator order). Narrow tsc on both Demo.tsx passed; npm run check passed.

## Revision v3 (wave D r5, 2026-10-14)

Hook no longer states the result. Third milestone: both runs with the wall on, so the guided route matching the flood's length is seen there too; the rule line shows the guess at S (6) and the route found (10 with the wall). Legend for numbers and dashed cells; ghost dots dropped. Wall control moved before No guess / With guess for the QA order. Reopened c3; added c6.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.

## Revision v4 (wave E r6, 2026-10-14)

r6 main finding: the guess-vs-route line sat above the grid and scrolled out of view with the wall on and at the reveal, while the reveal pointed at it. Fix: the line moved under the table, next to the controls ("Guess at S: 6. Real route with the wall: 10.", "?" until the guided wall run finishes); the rule line above the grid keeps only "Guess at S: 6."; the reveal now says "Look at the line under the table". Grid drawn at 252 px instead of 308 px so less of the stage scrolls. c6 reopened (stage address changed). Not run: build, QA, walkthrough, tsc.

## Pre-flight v4

1. Title and hook: "A guess that aims the search" / "Add a guess of the steps left. Does the search still flood?" Names the tension, not a count; 7 vs 25 vs 49 cannot be read off it.
2. Options: "7", "25", "49". All bare numbers, same precision.
3. Locked stage: empty 7x7 grid with S and G, rule "Score = steps so far + guess of steps left. Guess at S: 6.", table of "?", line "Guess at S: 6. Real route with the wall: ?". Nothing drawn equals 7 or highlights row 3.
4. Reveal values: open-grid 7 settled / route 6, wall 16 vs 46 / route 10: (b) table cells filled when each run finishes (milestones guided-at-goal, wall-both); guess 6: constant drawn on stage from the first frame; "route took 10": (b) filled("guess", true), set by the wall-both path.
5. QA path: Settle next, Settle to goal (open guided, 7), Wall (replays guided wall, 16), No guess (replays no-guess wall, 46 -> wall-both), With guess. All three milestones reached, including the question's own case (open grid with guess). Table cells and the line under the table stay on the stage at the reveal.
6. Reset: no Reset control; switching modes does not clear the table. Reveal on the QA path: "On the open grid, your guided search settled 7 cells (route 6). With the wall, no guess settled 46 cells and the guess 16. Both routes were 10 steps. / The guess ranks cells nearer the goal first, so the search runs at it instead of flooding every direction. Look at the line under the table: at S the guess said 6 steps left, and with the wall the route took 10. The guess can be too low, never too high, so it never makes a shorter route look worse. That is why the guided route matched the flood's length in your table."
