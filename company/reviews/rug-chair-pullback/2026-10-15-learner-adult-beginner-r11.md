*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): rug-chair-pullback
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The drawing reserves space outside the table footprint for the selected chair movement. Adding that allowance at both sides produces a wider rectangle; the table dimensions alone omit it.)
Screenshots seen: yes (artifacts/walkthroughs/rug-chair-pullback/sheet.png, recorded 2026-10-15T21:35)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Table footprint"; after lock-in the stage showed Rug width 120 cm with the chairs hanging off the rug; tapped Include pullback (240 cm); slid table width to 122 (242 cm); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **This is a real beginner error and the drawing shows it.** With the rug sized to the table, the chairs sit on the edge and would drop off when pulled back. With pullback, the tan rug border clearly holds them. 120 cm → 240 cm doubles the rug, which is a good "oh" for the size of the mistake. The reveal's caveat that 60 cm is illustrative, not an ergonomic rule, is good.
2. **Where it wobbled: "width" vs where the chairs move.** The chairs are drawn at the top and bottom of the table and move up and down, but the slider and readout say "Table width" / "Rug width". In the pullback drawing the rug also grows on the left and right, where there are no chairs. I was not sure which dimension the 2×60 applies to.
3. **"Which rug covers the pictured chair movement?"** The chair movement is not really pictured (no arrow or ghost chair). Calling the option "Include pullback" gives the answer.
4. **The reveal restates only the current number** (242 cm), and "Not quite" gives no comparison with 120.
5. **Selected-state styling is inverted.**

Notes (not blocking):
- Put chairs on the sides that grow, or label the dimension along the chair direction.
- Draw a ghost chair or an arrow for the pullback.

Verdict reason: the stage shows chairs falling off a table-sized rug and the reveal explains the allowance; the width/direction confusion is a clarity note.

## After reading the brief (meta.json)

- The objective is delivered (allowance outside the table at both sides).
- The trust-sheet example uses a 90 cm table (210 cm), while the stage default is 120 cm (240 cm). Route: fact-checker (consistency).
- Width/direction mismatch (finding 2) goes to the demo-builder as a note.
