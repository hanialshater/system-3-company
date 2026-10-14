*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): coiled-cord-bend-radius
lesson version: v2 (meta.json version 2, status review)
boundary: adult-beginner (coils cables for storage; knows radius and circumference loosely; has never met "curvature" as a number or the unit cm⁻¹).
Screenshots seen: yes (artifacts/walkthroughs/coiled-cord-bend-radius/sheet.png, 4 frames; walkthrough re-run 2026-10-14 because the earlier transcript was an aborted page.goto timeout)
Verdict: revise

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- Where I first lose it: "Curvature" and "cm⁻¹". The readout "0.05cm⁻¹" is the lesson's key number and the unit is never explained. An adult beginner does not know that a bigger number means a sharper bend.
- The question answers itself: "Which coil bends the cord more gently?" — a bigger loop is obviously gentler, and the title "Tighter coils, more curvature" says it. The options "Chosen radius / Double radius" also make me guess what "chosen" means.
- The "Chosen radius" curvature (0.1 cm⁻¹ at r = 10) is never shown. I chose it; the walkthrough went straight to Double radius. So I never see 0.1 vs 0.05, the comparison that is the whole lesson.
- The slider looks dead. Radius 10 → 11 cm moves the picture to r = 22 cm and turns 1.59 → 1.45, but Curvature stays "0.05cm⁻¹" (1/22 = 0.045 rounds to 0.05). The one number I am meant to watch does not move.
- The slider label is confusing: "Radius 11cm" while the picture says "r=22cm". In Double-radius mode the slider sets the base radius, but nothing says so.
- Mode indicator: after tapping "Double radius" the white bold toggle is "Chosen radius" (02-step-1 to reveal). Nothing marks the mode in effect, and the lit button is the other one. Same pattern as bag, box, circle, desk. (The white button may be meant as "try this next"; either way nothing on the stage marks the mode in effect, and the lit button is the one not in effect.)
- Amounts the reveal explains are not shown: "uses more length per turn" — the length per turn (2πr: 62.8 cm vs 125.7 cm) never appears; only "turns of 200cm". The reciprocal rule is told.
- Reveal: "The current double radius setting gives 0.05cm⁻¹" — no comparison, no meaning for the unit.
- Recall (answer text from the trust sheet: "Curvature = 1 ÷ radius. Half the radius gives twice the curvature, a sharper bend, and each turn uses less cord"): "smaller loop = sharper bend" is common sense; "twice" needs 1/r, which was told, not shown. See section 3.
- Phone fit: pass.

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 2. Boundary in meta.json: knows ["Everyday objects have sizes, positions and amounts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'A circle's curvature is the reciprocal of its radius.' The reciprocal is told; the stage shows one curvature value at a time.
- Recall: 15 cm instead of 30 cm radius (doubles / halves / stays the same), key 0. Good transfer: 'stays the same' is the misconception, 'halves' the slip. It needs 1/r. But the stage never showed two curvatures together, so the factor of two is only told.
- Builder notes: build.md (Pre-flight v2, W-358) added the cord drawing, which is visible and works. It does not address the dead-looking curvature readout (0.05 at r = 20 and 22), the unexplained cm⁻¹, or the never-shown 0.1 for the chosen radius.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: only one curvature is shown, the rounding hides the slider's effect, and length per turn is never shown.
- Not in the crit: the mode toggle. In the illustrative-model engine (bag, box, circle, coil, desk in this batch) the white bold button after a tap is the mode *not* in effect. The crit did not raise it. I could not tell from the artifact whether it is a 'try this next' hint or a selection bug; either way no element marks the current mode. QA should rule on it (board item for qa-tester).
- Verdict: revise.
