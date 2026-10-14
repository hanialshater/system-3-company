*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): circle-tray-square-corners
lesson version: v1 (meta.json version 1, status review)
boundary: adult-beginner (has packed round tins or jars into a square box; knows a circle "looks the same" turned; has never thought about which packing changes can matter).
Screenshots seen: yes (artifacts/walkthroughs/circle-tray-square-corners/sheet.png, 4 frames)
Verdict: revise (blocking finding below)

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- Where I first lose it: the options. The question is yes/no ("Can rotation alone put more equal circles in this grid?") but the options are "First orientation / Rotate circles / Same outcome". "First orientation" is not an answer to a yes/no question; I picked it not knowing what it meant. The title "Rotating a circle changes nothing" gives the answer anyway.
- BLOCKING (misleading state): the count jumps from 4 discs to 9 discs while "Rotate circles" is the active mode, because the walkthrough moved Tray side 28 → 30 cm. Nothing on stage says the slider, not the rotation, caused it, and the "First orientation" count at 28 or 30 cm is never shown beside it. A beginner who chose "Rotate circles" sees "rotating gave 9, more than 4" — the misconception the lesson exists to remove.
- BLOCKING (misleading state): the mode indicator looks inverted. After tapping "Rotate circles", the white bold toggle is "First orientation" (02-step-1 through the reveal). So the screen says "First orientation: 9 discs" to a learner who reads the highlight as the selection. Same pattern as bag, box, coil, desk. (The white button may be meant as "try this next"; either way nothing on the stage marks the mode in effect, and the lit button is the one not in effect.)
- Rotation is invisible by design (a circle looks the same), but there is no marker on the discs (a dot or a stripe) to show they actually turned. So I cannot tell "rotated and nothing changed" from "nothing happened".
- Amounts check (independent of the crit): the count is shown, but the comparison the reveal explains (same count in both orientations, floor(W/10)² ) never has both numbers on the stage.
- Reveal: "The current rotate circles setting gives 9discs" (missing space, no comparison). The staggered-rows sentence introduces a new arrangement that is never shown.
- Phone fit: 01-predict clips the "Grid count ?" readout under the stage (minor, before commit). 04-reveal fits.
- Recall (answer text from the trust sheet: "A circle looks the same after any rotation, so rotating or flipping discs cannot change the count. Changing the arrangement, such as staggered rows, is a different experiment that can."): the first half is common sense; the second half (staggered rows) was only told, never shown. See section 3.

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 1. Boundary in meta.json: knows ["Everyday objects have sizes, positions and amounts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'rotating each disc cannot alter the row count'. The stage needs both counts side by side at the same tray size. In the walkthrough the slider gives the opposite impression.
- Recall: which change could alter how many discs fit (quarter-turn / staggered rows / upside down), key 1. Two of three options are rotations, so it is answerable by elimination. 'Staggered rows' was only mentioned in the reveal's caveat, never shown. Guessable, and it tests the told part.
- Builder notes: No build.md. Trust-sheet c3 'Count = floor(W/10)² in both selected square grids' confirms the two orientations always give the same count. The stage never shows the two counts together.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: the comparison count (First orientation) is never on the stage beside the Rotate count.
- Not in the crit: the mode toggle. In the illustrative-model engine (bag, box, circle, coil, desk in this batch) the white bold button after a tap is the mode *not* in effect. The crit did not raise it. I could not tell from the artifact whether it is a 'try this next' hint or a selection bug; either way no element marks the current mode. QA should rule on it (board item for qa-tester).
- Verdict: revise (blocking finding below).
