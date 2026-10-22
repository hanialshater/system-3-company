# Design note: three-sticks-one-triangle (math:triangle-inequality)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.geometry.md`, Wave J, brief 3 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (G3)

## The payoff
Tilting cannot rescue sticks that are too short. The closest the two short sticks' ends ever get is lying flat, where they reach a + b; if that is shorter than the base, no tilt closes the triangle. The learner should see the gap shrink to its least (1 cm) when flat, then grow when raised, and then watch a set that adds to more than 6 (3 + 4) close at once.

## Knowledge boundary (meta.json `learner`)
- knows: a triangle has three sides.
- doesNotKnow: that three lengths make a triangle only if the two shorter add to more than the longest.

## Misconception
Any three sticks can be joined into a triangle if you tilt them the right way.

## Objective
The learner can say that 2, 3 and 6 cm sticks can never make a triangle, because even lying flat the two short ones reach only 5 cm, and that three lengths close only when the two shorter add to more than the longest.

## Prediction
Brief's kit text with the condition "tilting them any way you like" stated (copy-style: every condition the answer depends on): "You have three sticks, 2 cm, 3 cm and 6 cm long. You join them end to end, tilting them any way you like. Can they make a triangle?" Options: "Yes, tilted the right way" / "Only lying flat" / "No, never" (answer C), all worded alike.

## Interaction
- One picture (340 × 200 viewBox, 50 px per cm): the 6 cm base as a grey bar with hinges at both ends; the short sticks (left in the domain colour, right in the foreground colour) hinged there. Free ends are dots; while apart, a dashed line joins them and the readout at the top says "gap 2.6 cm" (computed live: distance between the ends). When the ends meet above the base, the dots turn green and the triangle fills. When they meet only flat (2, 4, 6) the readout says "height 0".
- Controls (DOM order, brief): "Lay them flat" (2, 3, 6 at 0°: gap 1.0 cm), "Raise them" (2, 3, 6 at 60°: gap 3.6 cm), "Sticks 3, 4, 6" (the sticks go to the angles where they meet, 36.3° and 26.4°), "Sticks 2, 4, 6" (meet at 0°), Reset (2, 3, 6 at 45°: gap 2.6 cm).
- "Lay them flat" and "Raise them" belong to the 2, 3, 6 set: pressed while another set is shown, they bring back 2, 3, 6 (the stick labels change with it). The brief does not say what they do on the other sets; tilting 3, 4, 6 flat would make the sticks overlap, which teaches nothing.
- Trace: each tried chip keeps a mark under its label ("✓ 1.0 cm", "✓ 3.6 cm", "✓ △", "✓ height 0"), so Reset cannot erase what the reveal quotes.
- Milestones: `flatGap` (2, 3, 6 flat), `closed` (3, 4, 6). minInteractions 2. QA path: chip 1 then chip 3 fire both.

## Reveal (brief draft, conditional on what was seen)
"Even lying flat along the 6 cm stick, the 2 and 3 cm sticks reached only 5 cm and left a 1.0 cm gap[; raising them only widened it, to 3.6 cm]. The two shorter sides must add to more than the longest. 3 + 4 = 7 beats 6, and that set closed[; 2 + 4 = 6 met only lying flat]. A straight line is the shortest way between two points, so the detour must be longer."
Bracketed parts appear only if the learner pressed "Raise them" / "Sticks 2, 4, 6". The 1.0 is the recorded flat gap (stage rounding).

## Told vs shown
The cause (two shorter sides must add to more than the longest) is shown three ways on the stage: 5 < 6 leaves the flat gap, 7 > 6 closes, 6 = 6 meets flat at height 0. The "shortest way" sentence is the one told reason (claim c1).

## Recall
"Which three sticks can be joined end to end into a triangle?" 1, 2 and 4 cm / 2, 3 and 4 cm / 2, 2 and 4 cm (answer 2, 3, 4; in claim c2).
