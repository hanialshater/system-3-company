*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): door-swing-clearance
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A hinged door sweeps an arc. In this top-down drawing, placing the basket outside the door radius removes the collision; the wall opening alone does not show the space needed.)
Screenshots seen: yes (artifacts/walkthroughs/door-swing-clearance/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "In swing" (wrong); tapped Beyond swing; slid Door width to 82; opened reveal.

1. **The picture is good.** The top-down quarter-circle with the door line passing through the basket shows the collision at a glance. Moving the basket outside the arc is the right picture.
2. **The prediction is a giveaway.** "Where can this light basket clear the door? In swing / Beyond swing / Same outcome." Nobody thinks an object inside the swing clears the door. "Same outcome" makes no sense here. The real mistake people make (measuring only the door opening, or putting something just past the hinge side) is not offered.
3. **Where it first broke: the slider does nothing.** Moving Door width from 80 to 82 also moved "basket radius" from 90 to 92, so Radial margin stayed 10cm. The lesson is that a wider door needs more room; the slider should show the margin shrinking or going negative. Instead the basket follows the door.
4. **I never saw the in-swing number.** The margin was "?" until I switched to Beyond swing. "In swing" would have shown a negative margin (the collision as a number); I never saw it.
5. **Words.** "Radial margin", "basket radius=65cm" (radius of what? I took it to be the distance from the hinge) and "light basket" (why does weight matter?) all slowed me down.
6. **Reveal versus my question.** "Placing the basket outside the door radius removes the collision; the wall opening alone does not show the space needed." That does answer a practical question (you need floor space equal to the door width as a quarter circle), though only obliquely. The safety line about exits is good.

Fixes (for the builder):
- Keep the basket fixed when the door width changes so the margin shrinks and then turns into a collision.
- Ask a prediction with a real trap: "An 80cm door. How far from the hinge must the basket be?" with 40cm / 80cm / it depends on the angle.
- Say "distance from the hinge" instead of "radius".

Verdict reason: the slider moves the basket with the door so the margin never changes, and the prediction is answered by its own options, though the quarter-circle picture is right.

## After reading the brief (meta.json)

- Objective matches the reveal; the quarter-circle picture delivers the 'door sweeps an arc' half. The slider moving the basket with the door (finding 3) is not mentioned in the brief and may be a bug.
- Fix route: demo-builder (slider behaviour, prediction).
