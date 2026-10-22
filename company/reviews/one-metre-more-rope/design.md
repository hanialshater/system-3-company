# Design note: one-metre-more-rope (math:circumference-linear-in-radius)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.geometry.md`, Wave J, brief 1 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (G1)

## The payoff
The size of the circle never enters the sum. Rope length is 2πr, so 1 m more rope means 1 ÷ 2π more radius, for a ball and for the Earth alike. What should make the learner sit up: the Earth's zoomed-in top looks like a flat floor, and the rope still floats the same 15.9 cm above it, on the same ruler as the ball.

## Knowledge boundary (meta.json `learner`)
- knows: circumference = π × diameter (`math/pi-is-three-and-a-bit`).
- doesNotKnow: that adding a fixed length to the rope round any circle lifts it by the same height, 1 ÷ 2π of that length, however big the circle.

## Misconception
An extra metre of rope round the Earth would lift it by a microscopic amount, far less than the same metre round a small ball.

## Objective
The learner can say that 1 m more rope lifts it about 15.9 cm round a ball and round the Earth alike, because the extra metre adds 1 ÷ 2π to the radius whatever the size.

## Prediction
Brief's kit text, given a second-person scene per `company/product/copy-style.md` (the brief's version: "A rope hugs a circle. Add 1 m and lift it evenly all round. Round the Earth, compared with a small ball, the gap is…"):
"You tie a rope tight round a small ball, and another round the Earth. You add 1 m to each rope and lift it evenly all round. Round the Earth, compared with the ball, the gap is…" (36 words). Options: Far smaller / The same / Far bigger (answer B). All three are bare comparisons, none numbered.

## Interaction
- One picture (340 × 180 viewBox): a zoom window on the top of the circle, drawn at one scale for every circle (5 px per cm), so the 20 cm ruler (100 px) is the scale. Ground = the circle's true top arc (ball: a tight bump; wheel: a gentle arc; Earth: flat, because its true sag across the window is far under a pixel). Rope = the concentric circle of radius r + gap. A double arrow marks the gap at the top; readout "gap 15.9 cm" beside it.
- Icon (top left, 78 px box): the whole circle, a dashed box on the zoomed part, label "r = 11 cm" / "r = 35 cm" / "r = 6,378 km". The icon circle is the same size for all three: the label carries the size, the zoom carries the scale.
- Controls (DOM order): "Ball (r = 11 cm)", "Wheel (r = 35 cm)", "Earth (r = 6,378 km)", Reset. Initial: the ball with the rope tight (dashed, gap 0 cm). Each chip adds the metre to that circle and lifts the rope; the shown chip is active and disabled. Reset returns to the tight ball (disabled when already there).
- Trace: a tried chip keeps "✓ 15.9 cm" under its name, so after Reset the quoted gaps are still on the stage.
- Milestones: `small` (ball or wheel lifted; which one first is recorded and named in the reveal), `earth`. minInteractions 2. QA path: chip 1 (small), chip 2, chip 3 (earth), Reset.

## Reveal (brief draft, 69 words; {small} = ball or wheel, the first small circle the learner lifted)
"For your {small} and for the Earth, the extra metre lifted the rope by the same 15.9 cm. The rope's length is 2π times the radius, so each extra metre adds 1 ÷ 2π, about 0.159 m, to the radius, whatever the size. The Earth's huge radius never enters the sum: the metre is shared out the same way round any circle."
- v2: the cat clause (old claim c4) is cut: the fact-checker found cats are taller than 15.9 cm even lying down (Pongrácz 2024). The reveal stands without it, as the brief allows.
- v2: the recall's object is a round water tank (a circle), not a running track, so claim c2 (circles) covers it.

## Told vs shown
The cause in doesNotKnow (the extra radius is 1 ÷ 2π whatever r) is shown by the same ruler and the same gap on three circles of wildly different size; the formula 2πr is the learner's prerequisite (π × diameter) restated, one claimed sentence (c1).

## Recall
"A rope hugs a running track all the way round. You add 2 m to it and lift it evenly. About how high is the gap?" About 3 cm / About 32 cm / About 3 m (answer: 32 cm; 2 ÷ 2π = 0.318 m, in claim c2).
