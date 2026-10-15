*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): spacer-protects-clearance
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Subtracting the largest plausible object size from the smallest plausible opening produces a more conservative margin than comparing nominal values. The card makes the uncertainty allowance visible.)
Screenshots seen: yes (artifacts/walkthroughs/spacer-protects-clearance/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Nominal fit"; tapped Allow uncertainty; slid Opening from 30 to 30.2 cm; opened reveal.

1. **The question answers itself.** "Which fit check includes the pictured size uncertainty?" with an option called "Allow uncertainty" is a vocabulary match, not a prediction. The interesting question (does a 28 cm part fit a 30 cm opening if each could be 1 cm off?) is never asked.
2. **Where understanding first broke: I never saw the nominal clearance.** The panel sent me to "the second layout" only, so I saw 0 cm (and 0.2 cm at 30.2). The nominal 2 cm, which is what makes "0 cm" a surprise, stayed "?" and never appeared. Without it, "a fit with no margin is fragile" has nothing to contrast with.
3. **The picture does not show the uncertainty.** The insert and opening are drawn the same in both modes; no worst-case outline shows the part growing to 29 cm and the opening shrinking to 29 cm.
4. **"Each bound=±1cm" and "nominal" are jargon** for my boundary; I worked out ± from school maths, but "nominal" is not explained.
5. **The title's "spacer" never appears** on stage.
6. **The selected button looks reversed.**
7. **The reveal's rule is right** (smallest opening minus largest part), but it is phrased for engineers ("more conservative margin than comparing nominal values").

Fixes (for the builder):
- Show both clearances together (on paper 2 cm; worst case 0 cm).
- Draw the worst-case sizes as dashed outlines.
- Ask "will it still fit if each size is off by up to 1 cm?" instead of naming the method.
- Plain words for nominal and bounds.

Verdict reason: the nominal 2 cm never appears, so the learner cannot see the margin vanish, and the prediction is answered by the option's name.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which fits the finding that the prediction has no real trap.
- Fix route: demo-builder (show both results side by side, fix the selected-button look, picture, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
