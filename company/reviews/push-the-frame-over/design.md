# Design note: push-the-frame-over (math:parallelogram-area)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.geometry.md`, Wave J, brief 2 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (G2)

## The payoff
Leaning keeps every side and the perimeter but takes area away, because what counts is the height, not the slanted side. The learner watches the readout's sides and perimeter stay put while height and area fall, then sees the leaning frame's inside cut and slid into a rectangle 4 wide and only h tall: the area is base × height, shown, not told.

## Knowledge boundary (meta.json `learner`)
- knows: area of a rectangle = width × height.
- doesNotKnow: that a parallelogram's area is base × height, so pushing a frame over keeps its sides but loses area.

## Misconception
A frame that leans keeps its area, because its sides and perimeter have not changed (or: a parallelogram's area is base × slanted side).

## Objective
The learner can say that leaning a 4 by 3 frame keeps its sides and perimeter (14) but lowers its height, and that its area is base × height (at 30°, 4 × 1.50 = 6.0), because the slanted end cut off and slid across makes a 4 by h rectangle.

## Prediction
Brief's kit text in a second-person scene with the hinge condition stated (copy-style): "You push a 4 by 3 rectangular frame with hinged corners so that it leans over. Its sides keep their lengths. What happens to the area inside it?" Options: "It stays the same" / "It shrinks" / "It grows" (answer B), all worded alike, none numbered.

## Interaction
- One picture (340 × 200 viewBox, 46 px per unit): the frame on its 4-long base, hinges as dots, sides labelled 4 and 3, the vertical height from the top-left corner drawn dashed and labelled "h". Two readout lines at the top: "sides 4 and 3 · perimeter 14" / "height 1.50 · area 6.0" (live).
- Start (and locked frame): upright, height 3.00, area 12.0. This is the question's own starting frame; it points at no option.
- Controls in DOM order (brief): "Lean to 60°", "Lean to 30°", "Cut and slide" (toggle; disabled while upright, where there is no slanted end to cut), "Upright", "Reset". The shown angle's chip is active and disabled; Reset is disabled at the start state.
- Cut and slide: the triangle under the left slanted side is drawn as a dashed empty ghost, and the same triangle, filled darker, sits past the right end; with the rest of the inside it forms the 4 by h rectangle. Changing the lean keeps the cut on (the rectangle re-forms at the new height); Upright and Reset clear it.
- Trace: the first cut while leaning writes "✓ 4 × 1.50 = 6.0" (its h and area) under the Cut chip, so Reset or Upright cannot erase what the reveal quotes.
- Milestones: `leaned` (any lean, area below 12), `cutWhileLeaning` (h and area recorded). minInteractions 2. QA path: chips 1, 2, 3 fire both (cut at 30°).

## Reveal (brief draft, 66 words; {h}, {A} from the first cut)
"Leaning kept every side and the perimeter at 14, but the height fell to {h} and the area to {A}. Cutting off the slanted end and sliding it across made a rectangle 4 wide and only {h} tall. A parallelogram's area is base times height, not base times slanted side. Push the frame flat and its area goes to nothing while its sides stay the same."

## Told vs shown
The cause (area = base × height) is shown twice: the readout's height and area fall together while sides and perimeter stay, and the cut-and-slide rectangle is 4 by h. "Push the frame flat… goes to nothing" is the one told extrapolation (claim c1), following from what the two leans showed.

## Recall
"A hinged frame with sides 5 and 2 stands on its 5-long side. You push it over until its top is only 1 above the base. What is its area now?" 10 / 7 / 5 (answer 5; claim c4).
