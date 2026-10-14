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

## Revision v5 (W-267, compact stage for the phone fit, 2026-10-14)

- Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`: at 390×844 the stage top was cropped by 200 px at the reveal, with the grid already at the kit's 40% floor (252 → 101 px).
- What must stay, from the cm-cs brief (#18 in `company/domains/briefs/cs.algorithms.md`): the grid, settle next / auto-step, the guess on/off toggle and the wall. All kept, plus the table and the line under the table, which the reveal names.
- Changes (estimated saving each, not measured):
  - The five controls in one three-column grid of two rows: Settle next · Settle to goal · Wall / "Rank by" · No guess · With guess (DOM order unchanged). The second flex row used to wrap to two rows, so this goes from three rows to two: about 50 px.
  - Table cells "46 settled · route 10" → "46 cells · route 10" with a content-width first column, so the cells stay on one line (two of the four used to wrap): about 25 to 30 px.
  - The tie-break moved from a muted reveal line onto the stage rule line ("Score = steps so far + guess of steps left. Ties: more steps taken first."). The rule line keeps its two-line height; "Guess at S: 6." is no longer repeated there, because the line under the table says it from the first frame.
  - Stage gaps 8 → 5 px: about 20 px.
  - Reveal 113 → 89 words: the muted tie line is gone (now on stage), run sentences shortened ("Wall: no guess settled 46 cells, the guess 16; both routes 10 steps."), "in your table" cut. About 80 px.
- Total estimate: about 165 to 200 px against 200 px. It may leave a small crop. If so, the next lever is reveal content, and that is cm-cs's call. Font sizes and tap targets are unchanged (buttons keep min-height 44 px; side padding 12 → 8 px).
- Claims reopened: c1 (tie-break now addressed on the rule line; open-grid sentence reworded), c2 and c3 (reveal sentences reworded), c6 (rule line no longer shows "Guess at S"; reveal says "the wall route took 10"). Claim text unchanged. c4 and c5 sentences are verbatim. Status published → review.

## Pre-flight v5

1. Title and hook: unchanged ("A guess that aims the search" / "Add a guess of the steps left. Does the search still flood?").
2. Options: unchanged, "7" / "25" / "49".
3. Locked stage: empty 7×7 grid with S and G, rule "Score = steps so far + guess of steps left. Ties: more steps taken first.", table of "?", line "Guess at S: 6. Real route with the wall: ?". Nothing equals 7 or highlights row 3.
4. Reveal values: unchanged sources. Open grid 7 / route 6, wall 46 vs 16 / route 10: table cells filled when each run finishes (b: guided-at-goal, wall-both). Guess 6: constant on the stage from the first frame. "the wall route took 10": filled("guess", true), set on the wall-both path (b).
5. QA path: Settle next → Settle to goal (open guided, 7) → Wall (guided wall, 16) → No guess (no-guess wall, 46: wall-both) → With guess. DOM order unchanged by the grid. Table and the line under it stay on stage at the reveal.
6. Reset: no reset; switching modes does not clear the table. Reveal on the QA path: "Open grid: the guess settled 7 cells (route 6). Wall: no guess settled 46 cells, the guess 16; both routes 10 steps. / The guess ranks cells nearer the goal first, so the search runs at it instead of flooding every direction. Look at the line under the table: at S the guess said 6 steps left; the wall route took 10. The guess can be too low, never too high, so it never makes a shorter route look worse. That is why the guided route matched the flood's length."
7. Phone fit: reveal 89 words. Named by the reveal: the table, the line under the table. Stage-top crop: not measured (no build allowed this session). Estimated 200 px → about 0 to 35 px left. Needs a 390×844 screenshot of the open reveal, then the design lead's review (W-267).

## Revision v6 (W-282, fact-check pass 30 c1, 2026-10-14)

- Dispute: milestone guided-at-goal fired on any guided finish, so Wall → Settle to goal (guided wall) → No guess (no-guess wall: wall-both, plain-at-goal) unlocked the reveal without the open grid ever running.
- Fix: `finish()` reaches guided-at-goal only when mode is guess and the wall is off. plain-at-goal and wall-both unchanged. The start state is the open guided run, so it is always reachable: from a guided wall run at the goal, "Wall: on" replays the open guided run and reaches it.
- Reveal word count: with all four table cells filled it was 94 words. Removed the last sentence "That is why the guided route matched the flood's length." (the cm-cs approved fallback, W-277). Needed: no other cut of 4+ words was available without rewording a teaching sentence. Now at most 84 words (all four cells); every other path is shorter. The reveal still quotes what was seen: "both routes N steps" for each layout with both runs (the wall always, via wall-both), "the wall route took 10" and the line under the table.
- c3 support source → derivation (pass 30 note: the verdict rested on derivation; Hart et al. not opened).
- Claims reopened: c1 (milestone path), c3 (its reveal sentence removed). c2, c4-c6 untouched.
- Run: tsc, `npm run check`. Not run: build, QA, walkthrough (not asked this session).

## Pre-flight v6

1. Title and hook: unchanged ("A guess that aims the search" / "Add a guess of the steps left. Does the search still flood?").
2. Options: unchanged, "7" / "25" / "49".
3. Locked stage: unchanged (empty grid with S and G, rule line with the tie-break, table of "?", "Guess at S: 6. Real route with the wall: ?").
4. Reveal values: open grid guess 7 / route 6: table cell filled by the open guided run, now the only run that reaches guided-at-goal (b). Wall 46 vs 16 / route 10: wall-both (b). Guess 6: constant on stage. "the wall route took 10": filled("guess", true), guaranteed by wall-both (b).
5. QA path: Settle next → Settle to goal (open guided, 7: guided-at-goal) → Wall (guided wall, 16) → No guess (no-guess wall, 46: plain-at-goal, wall-both) → With guess. Unchanged; still reaches all three. Dispute path Wall → Settle to goal → No guess now leaves guided-at-goal unreached until the open guided run is done.
6. Reset: no reset. Reveal on the QA path (79 words): "Open grid: the guess settled 7 cells (route 6). Wall: no guess settled 46 cells, the guess 16; both routes 10 steps. / The guess ranks cells nearer the goal first, so the search runs at it instead of flooding every direction. Look at the line under the table: at S the guess said 6 steps left; the wall route took 10. The guess can be too low, never too high, so it never makes a shorter route look worse."
7. Phone fit: reveal at most 84 words (all four cells), 79 on the QA path. No layout change.

## Revision v7 (phone fit, build 6 measurement, 2026-10-14)

- Build 6 (W-287 10 px label floor) measured crop 165 px at 390×844 with the reveal open, "46" (table) off screen. Re-measured on the dev server before editing: 165 px; parts picture 252, controls 96, table 58, text 61; reveal 226 px of a 618 px window.
- Changes:
  - The four controls stand in one column beside the grid instead of two rows under it (DOM order: Settle next, Settle to goal, Wall, Guess). Saves the 96 px control block.
  - "No guess" / "With guess" chips (plus the "Rank by" label) are one toggle, "Guess: on" / "Guess: off" (aria-pressed), like the Wall toggle. The brief (#18) already names it "the guess on/off toggle". Column height 4 × 44 + gaps = 188 px, so the row is no taller than the fitted grid.
  - Grid labels 12 → 16 viewBox units, so the card's picture fit can draw the grid at 193 px (labels at 10 px, the W-287 floor) instead of stopping at 252. Settle numbers are larger than before (r7 minor: "hard to read").
  - The tie-break moved from the rule line to the legend ("Numbers: settle order. Dashed: waiting. Ties: more steps taken first."); the rule line is one line. Stage gaps 5 → 3 px.
  - Reveal text unchanged (82 words on the QA path, at most 84).
- Claims reopened: c1 (tie-break stage address), c6 (legend wording). Claim text unchanged. c2-c5 untouched.
- Measuring note: `tools/reveal-fit.mjs` waits 120 ms between control presses; a replay still running disables Wall / Guess, so on the dev server about half the runs end "reveal never unlocked". Same before this change (first baseline run). The QA contract waits 450 ms. Not a learner problem; not fixed here.

## Pre-flight v7

1. Title and hook: unchanged.
2. Options: unchanged, "7" / "25" / "49".
3. Locked stage: rule "Score = steps so far + guess of steps left.", empty grid with S and G beside a column of four controls, legend with the tie-break, table of "?", "Guess at S: 6. Real route with the wall: ?". Nothing equals 7 or highlights row 3.
4. Reveal values: unchanged sources (table cells, GUESS_AT_S, filled("guess", true)).
5. QA path: Settle next → Settle to goal (open guided, 7: guided-at-goal) → Wall (guided wall, 16) → Guess: on→off (no-guess wall, 46: plain-at-goal, wall-both). All three milestones reached.
6. Reset: no reset. Reveal unchanged (79 words on the QA path; tool counts 82 with the verdict line).
7. Phone fit (measured, `node tools/reveal-fit.mjs --url http://localhost:3530 a-star-heads-for-goal`, dev server): crop 0 px (was 165), hiddenBelow 0, phoneFit true. Named and visible: 46, 16, 10, open, wall, no guess, "7 cells route 6". Grid fitted 193/240 px (labels 10 px). Stage 367 px, reveal 226 px, 82 words.
