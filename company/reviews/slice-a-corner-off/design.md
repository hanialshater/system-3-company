# Design note: slice-a-corner-off (math:euler-polyhedron-formula)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.geometry.md`, Wave J, brief 5 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (G5)

## The payoff
A slice is not a random change: it trades exactly one corner for k new ones, adds k edges round the cut and one face, and those changes cancel in corners − edges + faces. The learner sees the change line "+2 corners, +3 edges, +1 face" next to the unchanged total after each cube slice, and "+3, +4, +1" at the pyramid's tip, so the cancelling is shown for two different k.

## Knowledge boundary (meta.json `learner`)
- knows: corners (vertices), edges and faces of a cube.
- doesNotKnow: that for any convex solid, corners − edges + faces = 2, and that cutting a corner off cannot change it.

## Misconception
Slicing a corner off a solid changes its counts in an unrelated way, so corners − edges + faces changes too.

## Objective
The learner can say that slicing a cube's corner adds 2 corners, 3 edges and 1 face, so the total stays 2, that a small slice cutting only the k edges at a corner adds k − 1, k and 1, and that every convex solid gives 2.

## Prediction
Brief's kit text as a second-person scene (copy-style): "You hold a wooden cube: 8 corners − 12 edges + 6 faces = 2. You slice one corner off with a knife. Now what is corners − edges + faces?" Options: "Less than 2" / "Still 2" / "More than 2" (answer B); all three name 2 the same way.

## Interaction
- One picture (340 × 236 viewBox): the solid as a wireframe, turned 30° and tipped 22°, hidden edges dashed and muted, corners as dots, cut faces shaded (the newest darker). Above it: key "corners − edges + faces", readout "10 − 15 + 7 = 2", and after a slice the change line "+2 corners, +3 edges, +1 face" in the domain colour.
- Every count is recounted from the drawn solid (`counts()` over `slice()`d vertex/face lists), so the stage cannot drift from the picture.
- Controls in DOM order (brief): "Slice a corner" (cube, front top right corner), "Slice another" (front top left; enabled only after the first slice), "Square pyramid", "Slice its tip" (enabled only while the unsliced pyramid is on screen), Reset. The shown state's chip is active and disabled.
- Trace: "Slice a corner" keeps "✓ +2 − 3 + 1 = 0" and "Slice its tip" keeps "✓ +3 − 4 + 1 = 0" once pressed, so Reset cannot erase what the reveal quotes.
- Milestones: `cubeSliced`, `tipSliced`. minInteractions 2. QA path: chips 1 to 4.

## Reveal (brief draft, 78 words; numbers from the recorded changes)
"Slicing a corner off your cube lost 1 corner and made 3, so +2 corners, +3 edges and +1 face: 2 − 3 + 1 = 0, and the total stayed 2. The pyramid's tip, where 4 edges meet, gave +3 − 4 + 1 = 0 too. A small slice that cuts only the k edges at a corner always adds k − 1 corners, k edges and 1 face. For every convex solid the total is 2: Euler's formula."

## Told vs shown
The cause (each slice's changes cancel) is shown by the change line and the traces for k = 3 and k = 4. The general k rule and "every convex solid" are the told generalisation (claims c2, c3); the name "Euler" stands only if the fact-checker accepts the attribution (brief).

## Recall
"A convex solid has 12 corners and 30 edges. How many faces does it have?" 18 / 20 / 22 (answer 20; claim c4).

## Revision v2 (demo-builder, 2026-10-22)

Fact-check 2026-10-22: the rule "a slice through a corner where k edges meet always adds k − 1, k, 1" is false for a slice reaching the neighbouring corners (a cube corner cut through its 3 neighbours gives 7, 12, 7). Claim c2 and the reveal now scope it to a small slice that cuts only the k edges at that corner, which is what every slice on the stage does. Pedagogy unchanged.
