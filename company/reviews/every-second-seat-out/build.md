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
