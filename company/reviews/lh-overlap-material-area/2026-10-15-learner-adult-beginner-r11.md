*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-overlap-material-area
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Include a seam or overlap strip in area requirements.)
Screenshots seen: yes (artifacts/walkthroughs/lh-overlap-material-area/sheet.png, recorded 2026-10-15T21:35, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "With overlap"; tapped Test A, Test B; slid Width 30 to 40cm; opened reveal.

1. **Where understanding first broke: the question answers itself.** "Which modeled paper area includes the overlap?" with options "With overlap", "No overlap", "Both". The answer is the option's name. There is nothing to predict.
2. **The hook asked a better question.** "Where does its area go?" makes me wonder how much extra paper a 2cm overlap costs. The prediction never asks that (for example 2, 40 or 64cm²).
3. **The stage is clear.** (30+2)×20 = 640cm² against 600cm²; the picture shows a thin coloured strip on one edge. Sliding width keeps the gap at 40cm², which shows the overlap cost depends on the 20cm edge, not on the width.
4. **Does the reveal answer my question?** Yes: the strip is 2 by 20, so it adds 40 square centimetres, and hidden material is still material.

Fixes (for the builder):
- Ask "How much extra paper does the 2cm overlap need?" with 2cm², 40cm², 64cm² as options.

Verdict reason: the prediction is answered by the option labels, so nothing the learner believes is tested.

## After reading the brief (meta.json)

- Objective: include an overlap strip in area requirements. The stage and reveal include it; the prediction is tautological (finding 1).
- Fix route: demo-builder (ask for the extra area).
