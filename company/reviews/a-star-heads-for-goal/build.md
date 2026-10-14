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
