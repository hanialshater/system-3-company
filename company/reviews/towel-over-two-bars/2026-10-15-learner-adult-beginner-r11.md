*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): towel-over-two-bars
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Two cloth faces pressed together are hidden from the surrounding air in this geometric model. Separating them restores exposed area; the cloth amount has not changed.)
Screenshots seen: yes (artifacts/walkthroughs/towel-over-two-bars/sheet.png, recorded 2026-10-15T21:35, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Faces touching"; tapped Faces separated; slid Towel width from 70 to 72 cm; opened reveal.

1. **Where understanding first broke: the two pictures look the same.** "Faces touching" and "Faces separated" both show one flat bar with four arrows on top and a small arc below. I could not see a towel folded over one bar versus hung across two. The slug says "two bars", and there are no bars drawn.
2. **I never saw the touching number.** Separated gives 1.96 m² (2.02 at 72 cm). Touching (half that, from the "exposed=50%" label) never appeared as a number, because the panel sent me to "the second layout" only.
3. **The question gives itself away.** "Which arrangement exposes more of the chosen faces?" with "Faces separated" as an option: separated faces are exposed by definition.
4. **Arrows only on top.** If both faces are exposed when separated, I expected arrows on both sides.
5. **The selected button looks reversed.**
6. **The reveal is clear and honest** ("exposed-area bookkeeping, not a measured drying-time prediction").

Fixes (for the builder):
- Draw a towel folded over one bar (faces pressed) and the same towel spread over two bars (gap between faces), with air arrows on every exposed face.
- Show both areas together (0.98 vs 1.96 m²).

Verdict reason: the two arrangements are drawn identically and the touching area never appears, so the learner cannot see what separating the faces changes.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
