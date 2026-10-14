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
