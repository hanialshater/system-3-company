# Build note: shoelace-order-matters

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- 4 x 3 grid with the rectangle's corners. Four corner buttons (DOM order is the question's bow-tie order) add corners to a path, which closes on the fourth. Each edge with a nonzero contribution draws its signed strip down to the x-axis (green +, red −) with its value; edges carry direction arrows; corners show their tap order.
- Readouts: corners tapped, "Sum so far" then "Signed area". Reset order button.
- Milestone (minInteractions 1): `zero` (closed path with area 0).
- The brief says "dragged" in the key state and "tap" in the interaction; built as tap.

## Checks run
- Node: in order 12, reversed -12, bow-tie 0; all 6 orders from (0,0) give 12, -12 and four 0s. The strip (trapezoid) sum equals the shoelace sum (telescoping, c2).

## Brief note
- The brief says the bow-tie is "two triangles of area 6 with opposite signs". The two edge strips are 6 and -6, but the bow-tie's enclosed lobes are area 3 each (+3 and -3). The lesson says strips of 6 and lobes of 3 (c3, c4).

## Choices to challenge
- Teaches through the trapezoid form rather than the cross-product form: same total, but the stage never shows x_i*y_(i+1) - x_(i+1)*y_i.

## Pre-flight v2

Revision for r6 learner review (grid-coordinates, revise). Three findings: the title "Same four corners, no area" and the hook "...the formula says 0?" stated the answer; the sign and direction (12 / −12) were told, because only the bow-tie was gated; and the reveal printed a hyphen minus.
Changes:
- New title "Same four corners, new order" and new hook "A 4 by 3 rectangle has area 12. Reorder its corners: what does the formula say?".
- Options are now "12", "0", "24". The old "12, the same corners" was worded differently from the others.
- Two new controls, "Go round ↺" and "Go round ↻", lay each boundary order in one press. They can also be tapped by hand.
- Milestones: `zero`, `anticlockwise`, `clockwise` (minInteractions 3).
- A "Your orders" log of every closed path sits under the readouts, and Reset does not clear it. The reveal quotes the log.
- The stage and the reveal use a true minus.
- c5 is reworded and set unverified.

1. **Title and hook.** "Same four corners, new order" / "A 4 by 3 rectangle has area 12. Reorder its corners: what does the formula say?" No, it does not name 0, "no area" or a change.
2. **Options.** "12", "0", "24": all bare numbers.
3. **Locked stage.** The grid, four corner dots with their labels, "Predict first, then tap the corners in an order.", Corners 0 of 4, "Sum so far –" (v1 showed "0" here, the right option; it now reads a dash until the first edge exists), disabled buttons. No strips, no log, nothing that reads 0.
4. **Reveal values.** 0 for the question's order: (b) milestone `zero`, logged in "Your orders". −6 and +6: (b) the same milestone. They are drawn as strips while the bow-tie is on stage, and the log keeps the total, not the strips. The anticlockwise +12: (b) milestone `anticlockwise`, read from the log. The clockwise −12: (b) milestone `clockwise`, read from the log. Two triangles of area 3: told (c4).
5. **QA path.** (0,0) -> (4,3) -> (4,0) -> (0,3) (bow-tie, `zero`) -> Reset order -> Go round ↺ (+12, `anticlockwise`) -> Go round ↻ (−12, `clockwise`). All three milestones are reached in DOM order. The stage ends on the clockwise rectangle, and the log holds all three orders.
6. **Reset.** Reset clears the path but not the log. On the QA path Reset comes before the go-round buttons, and the stage is not empty at the reveal. Reveal: "The question's order gave 0. The formula adds a signed strip under each edge: the edge from (0,0) to (4,3) gave −6 and the edge from (4,0) to (0,3) gave +6. They cancelled, though the bow-tie encloses two triangles of area 3, one traced each way round. / Area from corners depends on the order. Going round the boundary, your anticlockwise order gave 12 and your clockwise order gave −12: the size is the area, and the sign tells you the direction. A path that crosses itself makes some parts count positive and some negative."
