# Build note: every-second-seat-out (demo-builder, algo2-sa, 2026-10-14)

- Design intent (spec `company/design/specs/every-second-seat-out.md`): n dots on a 250 px ring with seat numbers outside. Standing = filled; removed = small hollow ring with a slash; the person the count starts on = thick `--domain` ring plus an arrow pointing at them; the survivor = large dot with a star. Centre: "Left: n" and "next skip: s" ("survivor: s" at the end).
- Controls in DOM order: Remove next, Run to the end (replays every remaining removal, ≤ 9 ms each, ≤ 360 ms), Removals scrubber (a styled native range with data-qa="control", min 0, max = removals made so far, thumb 28 px, input 44 px tall; disabled until one removal), chips 7 / 10 / 41 people (41 active and disabled at start; switching after a finished circle replays the new one to the end).
- Key frames: tick marks under the scrubber at the first removal count that leaves a power of two ("32 left" at 9 for n = 41; "8 left" at 2 for 10; "4 left · lap 1 done" at 3 for 7) and at lap 1 done (floor(n/2) removals). Because the scrubber's max is the removals made so far, a tick and its label appear only once the run has passed it; during predict no ticks are shown at all (spec wanted unlabelled ticks; with a growing max they have no position yet).
- Key state: milestone `survivor-41`, minInteractions 1. QA path: Remove next (40 left), Run to the end (19), scrubber two ArrowLeft (38: 3, 19, 35 left), 7 people (7), 10 people (5), 41 people (19).
- Numbers: play() on the stage computes every frame; re-ran in node: 41 -> 19, 32 left after 9 removals with the count on 19, 20 removals leave the 21 odd seats with the count on 41; 10 -> 5; 7 -> 7; recurrence J(2m) = 2J(m) - 1, J(2m+1) = 2J(m) + 1 agrees; 16 -> 1 (recall). Binary 101001 -> 010011 = 19 is computed in the reveal. Brief answer B held.
- Deviations from spec: no 200 ms removal animation; the kit Slider is not used because it cannot draw key-frame ticks (no kit change requested yet; a kit `<Timeline>` is already proposed in formats.md).
- Not run (by instruction): build, typecheck, QA, walkthrough. Screenshots not yet looked at; check that 41 seat numbers at 11 px do not collide on a 390 px phone.

## Revision v2 (wave E, r6 learner review)

- r6 #1 (power-of-two step optional, binary told): new step button "Run to a power of two left" between "Remove next" and "Run to the end". Milestones are now pow-41 and survivor-41 (minInteractions 2). Once the power-of-two frame is reached, a stage line reads "41 = 32 + 9 → start 2 × 9 + 1 = 19". After the run a second line reads "Starts on 19 at 32, 16, 8, 4, 2 left. Binary 101001 → 010011", so the halving laps and the binary rotation are on stage.
- r6 #2 (reveal told the learner to scrub): the reveal now quotes the readouts and the current circle; no instructions.
- r6 #4: readouts show "→ 7 (4 + 3)", "→ 5 (8 + 2)", "→ 19 (32 + 9)".
- r6 #3 (top of circle cropped on 7/10): not changed. The SVG is a fixed 340 viewBox; the crop looks like the walkthrough's scroll position after pressing the lower buttons. Check on the next walkthrough.
- Changed claims c2–c5 are unverified.

## Pre-flight v2

1. Title and hook: "Every second seat out" / "41 in a circle, every second one out. Who is left?" Neither names or hints at 19.
2. Options: "1" / "19" / "41". All bare numbers.
3. Locked stage: the full circle of 41, "Left: 41", "next skip: 1", buttons, readouts "→ ?". No 19 highlighted; the formula lines are empty while locked.
4. Reveal values: "19 survived", "41 = 32 + 9", "9 removals left 32", "2 × 9 + 1 = 19": the 41 game, gated by milestones pow-41 and survivor-41 (b), and shown in the readout "→ 19 (32 + 9)". "On your N circle the count started on S at … left", "binary … = S": computed from the learner's current circle n if it is finished, else the 41 game (a). "7 = 4 + 3 gave 7, 10 = 8 + 2 gave 5": only for sizes in the learner's table (a), shown in the readouts.
5. QA path: Remove next (40 left) → Run to a power of two left (32 left, count on 19: pow-41) → Run to the end (19: survivor-41) → scrubber → 7 people (auto-runs, 7) → 10 people (5) → 41 people (19). Each run is under 400 ms. Both formula lines for the current circle and all three readouts are on stage when the reveal opens.
6. Reset: there is no reset; switching size reruns the new size to the end when the old one was finished, so the quoted lines always describe a finished circle. Reveal on the QA path: "19 survived. 41 = 32 + 9: 9 removals left 32, and the count started on 2 × 9 + 1 = 19. / On your 41 circle the count started on 19 at 32, 16, 8, 4, 2 left. A power of two halves each lap and comes back to the starter, so the starter survives. In binary, 101001 with its leading 1 moved to the end is 010011 = 19. 7 = 4 + 3 gave 7, 10 = 8 + 2 gave 5: the same rule."

## Revision v3 (W-267, compact stage for the phone fit, 2026-10-14)

- Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`: at 390×844 the stage top was cropped by 275 px at the reveal, with the circle already at the kit's 40% floor (320 → 128 px). The picture cannot shrink further, so the rest of the stage was compacted.
- What must stay, from the cm-cs brief (#72 in `company/domains/briefs/cs.algorithms.md`): the circle, "remove next" / run, the 7 / 10 / 41 people chips, and the binary payoff (101001 → 010011 = 19). All kept. Also kept: both formula lines, the scrubber with its key-frame ticks, and each circle's result (all quoted by the reveal).
- Changes (estimated saving each, not measured):
  - Step buttons in one three-column grid, "Run to a power of two left" relabelled "Run to a power of 2" so it wraps to two lines at most (was a flex row that wrapped to two rows): about 45 px.
  - Size chips in one three-column grid with each circle's result ("→ 19 (32 + 9)", data-qa="readout") on one line right under its chip. The "People" label and the three Readout boxes are gone (the chips say "7 people" etc.). The old chip row and readout row each wrapped to two rows: about 75 to 125 px.
  - Scrubber label beside the track (ticks offset to match the track) and tick labels tucked 8 px under the track: about 25 px.
  - Rule line on one line: "Skip one, remove the next, until one is left." (the question already says "then round again"): 0 to 18 px.
  - Stage gaps 6 → 4 px: about 15 px.
  - Reveal 88 → 81 words: the first two sentences merged ("after 9 removals the count started on 2 × 9 + 1 = 19 and stayed on 19 at 32, 16, 8, 4, 2 left"). About 20 px.
- Total estimate: about 180 to 250 px against 275 px. It may not reach 0. If the screenshot still shows a crop, the next lever is cutting reveal content, and which teaching sentence goes is cm-cs's call (demo-standard), not mine. Font sizes and tap targets are unchanged (buttons keep min-height 44 px; only their side padding went 12 → 8 px).
- Claims reopened: c2 (button label in its stage address), c3 (reveal sentence; text updated), c4 (reveal sentence), c5 (stage address now the result line under the chips; text updated). c1 unchanged. Status published → review.

## Pre-flight v3

1. Title and hook: unchanged ("Every second seat out" / "41 in a circle, every second one out. Who is left?").
2. Options: unchanged, "1" / "19" / "41".
3. Locked stage: the full circle of 41, "Left: 41", "next skip: 1", rule line, buttons, results "→ ?" under each chip. Formula lines empty. Nothing highlights 19.
4. Reveal values: "19 survived", "41 = 32 + 9", "after 9 removals … 2 × 9 + 1 = 19": the 41 game, gated by pow-41 and survivor-41 (b), shown in the formula line and the result "→ 19 (32 + 9)". "stayed on 19 at 32, 16, 8, 4, 2 left" and the binary: the learner's current circle if finished, else the 41 game (a); shown in the second formula line. "7 = 4 + 3 gave 7, 10 = 8 + 2 gave 5": only sizes the learner finished (a), shown under the chips.
5. QA path: Remove next → Run to a power of 2 (pow-41) → Run to the end (survivor-41) → scrubber → 7 people → 10 people → 41 people. DOM order unchanged. Both formula lines and all three results are on stage when the reveal opens.
6. Reset: no reset; switching size re-runs a finished circle. Reveal on the QA path: "19 survived. 41 = 32 + 9: after 9 removals the count started on 2 × 9 + 1 = 19 and stayed on 19 at 32, 16, 8, 4, 2 left. / A power of two halves each lap and comes back to the starter, so the starter survives. In binary, 101001 with its leading 1 moved to the end is 010011 = 19. 7 = 4 + 3 gave 7, 10 = 8 + 2 gave 5: the same rule."
7. Phone fit: reveal 81 words. Named by the reveal: the circle, the formula lines, the results under the chips. Stage-top crop: not measured (no build allowed this session). Estimated 275 px → about 25 to 95 px left. Needs a 390×844 screenshot of the open reveal, then the design lead's review (W-267).

## Revision v4 (phone fit, build 6 measurement, 2026-10-14)

- Build 6 (W-287 10 px label floor) measured crop 175 px at 390×844 with the reveal open, seats "10" and "41" (top of the circle) off screen. Re-measured on the dev server before editing: 175 px; parts picture 309 (fitted 309/320, labels already at the floor), controls 166, text 68; reveal 205 px of a 638 px window.
- Changes:
  - The three step buttons (Remove next, Run to a power of 2, Run to the end) stand in a column beside the circle instead of a row under it. DOM order unchanged.
  - Seat labels 11 → 14 viewBox units, R_NUM 150 → 147, viewBox 0 0 340 340 → 8 8 324 324, so the card's fit can draw the circle at about 232 px with labels still at 10 px. Centre text 26/14 → 30/16 units.
  - The binary rotation moved from the second formula line into the circle centre ("binary 101001 → 010011", under "survivor: 19", only once the circle is finished). The second formula line now fits on one line: "Starts on 19 at 32, 16, 8, 4, 2 left."
  - The rule line "Skip one, remove the next, until one is left." is cut: the question states the rule ("every second person is removed (2, 4, ... then round again)"). No claim addressed it.
  - Stage gaps 4 → 2 px, tick row 1.3em → 15 px.
  - Reveal text unchanged (76 words with the verdict line on the QA path).
- Claims reopened: c3 (second formula line wording), c4 (binary's stage address). Claim text unchanged. c1, c2, c5 untouched.
- Also fixes r7 minor "at the reveal no circle shows at all": the whole circle is now on screen at the reveal.

## Pre-flight v4

1. Title and hook: unchanged.
2. Options: unchanged, "1" / "19" / "41".
3. Locked stage: the full circle of 41 with "Left: 41 / next skip: 1" and a column of three step buttons beside it, empty formula lines, scrubber, chips with "→ ?". No rule line; nothing highlights 19.
4. Reveal values: unchanged sources. The binary is now read from the circle centre (a: current circle if finished, else the 41 game, same as the reveal).
5. QA path: unchanged (Remove next → Run to a power of 2 → Run to the end → scrubber → 7 → 10 → 41 people).
6. Reset: unchanged. Reveal text unchanged.
7. Phone fit (measured, `node tools/reveal-fit.mjs --url http://localhost:3530 every-second-seat-out`, dev server): crop 0 px (was 175), hiddenBelow 0, phoneFit true. Named and visible: 10, 16, 19, 32, 41, removals. Circle fitted 233/250 px (labels 10 px). Stage 408 px, reveal 205 px, 76 words.
