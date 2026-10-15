*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): wetter-cloth-more-water
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know If the removal rate is fixed, twice as much water takes twice as many model steps. Spreading the cloth and reducing retained water address different parts of the same equation.)
Screenshots seen: yes (artifacts/walkthroughs/wetter-cloth-more-water/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One water load"; tapped Double water load; slid Water from 200 to 220 g; opened reveal.

1. **The prediction is a tautology.** "Which load needs more model steps at the same rate?" Twice the water at the same removal rate takes twice as long; the question states the rate is the same. There is nothing for a beginner to get wrong except by misreading.
2. **Where understanding first broke: the picture never changes.** Both modes show the same flat cloth with the same arrows. Nothing shows more water (a darker or heavier cloth, drips, a bigger water bar).
3. **I never saw the one-load number.** Double gives 4 steps (4.4 at 220 g). One load (2 steps) stayed "?". The panel sent me to "the second layout" only.
4. **"Model steps" is an odd unit.** I do not know what a step is in time.
5. **The reveal's interesting line is not explored.** "Spreading the cloth and reducing retained water address different parts of the same equation" is the useful idea (wring it out, or spread it out), but no equation or second lever is on stage.
6. **The selected button looks reversed.**

Fixes (for the builder):
- Show both durations side by side, and draw the water amount.
- Give the learner both levers (wring out less water; spread out more area) and ask which helps more in a given case; that has a real prediction.

Verdict reason: the question answers itself, the picture does not change, and the one-load duration never appears, so the reveal confirms a tautology.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: Life Hacks category manager first (premise is a tautology at fixed rate; a two-lever version would have a real prediction), then demo-builder.
