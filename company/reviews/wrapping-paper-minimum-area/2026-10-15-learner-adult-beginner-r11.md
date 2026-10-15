*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): wrapping-paper-minimum-area
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The box has three pairs of equal faces. A single footprint rectangle omits the top and sides; adding all six gives the ideal surface area before overlaps.)
Screenshots seen: yes (artifacts/walkthroughs/wrapping-paper-minimum-area/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One rectangle"; tapped All six faces; slid Box length from 20 to 22 cm; opened reveal.

1. **The question answers itself.** "Which estimate covers the entire closed box surface?" with "All six faces" as an option. The title also says "A box has six faces". No tension.
2. **Where understanding first broke: the picture does not show six faces.** "All six faces" draws a green cross on the front face only, and the 20 × 10 × 8 cm box is drawn as a cube. I expected the faces to unfold (a net) or be outlined one by one.
3. **I never saw the one-rectangle number.** All six faces gives 880 cm² (952 at 22 cm). The footprint (200 cm²) stayed "?" because the panel sent me to "the second layout" only. Seeing 200 against 880 is the surprise ("more than four times the bottom").
4. **"Lower bound" is maths vocabulary.** "At least this much paper" is the plain version.
5. **The reveal's caveat is sensible** (overlaps, folds and trim add more).
6. **The selected button looks reversed.**

Fixes (for the builder):
- Show both areas (footprint 200, all faces 880) and draw the box as an unfolded net with the three pairs coloured.
- Predict on the amount ("about how many times the bottom face?") rather than which option is complete.

Verdict reason: the option names give the answer away, the picture does not show six faces, and the footprint area never appears, so the reveal's comparison is not seen.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (net drawing, both areas, selected-button look); Life Hacks category manager for whether the brief names a real beginner belief.
