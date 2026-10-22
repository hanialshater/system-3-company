# Design note: regions-from-circle-points (math:pattern-is-not-proof)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md`, Wave J, brief 3 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (D3)

## The payoff
The learner watches 1, 2, 4, 8, 16 pieces appear, then 6 points give 31. The table beside the picture shows why: lines and crossings add up to the pieces minus one (1 + 15 + 15), and neither grows by doubling.

## Knowledge boundary (meta.json `learner`)
- knows: joining points with straight lines; counting pieces.
- doesNotKnow: that a pattern holding for five cases can still break, and why this one does (pieces = 1 + lines + crossings).

## Misconception
2, 4, 8, 16 must continue as 32: a pattern that held five times is proved.

## Objective
The learner can say that 6 points give 31 pieces, not 32, because pieces = 1 + lines + crossings (1 + 15 + 15), and that five matching cases are evidence, not a proof.

## Prediction
Brief's kit text in a scene with the hidden condition stated (copy-style; claim c4: evenly spaced points give 30, so without "no three lines meet at one spot" both 30 and 31 are defensible): "You put points around a circle, unevenly so no three lines meet at one spot, and join every pair with a straight line. Pieces: 1 point, 1. 2 points, 2. 3: 4. 4: 8. 5: 16. With 6 points?" (38 words). Options 30 / 31 / 32 (answer B), all bare numbers.

## Interaction
- Picture: circle (viewBox 300, radius 136), points at 0°, 64°, 113°, 179°, 230°, 308° (first n), every pair joined, crossings as red dots (about 6 px), pieces in two tones of the domain colour (a piece is dark when it is on the small-arc side of an odd number of lines; neighbours always differ). The picture has no text, so the card may shrink it at the reveal.
- Trace table (HTML, replaces the brief's one-line readout): rows points / lines / crossings / pieces, columns 1–6. A column fills when the learner first shows that many points and never clears; the current column is highlighted. Unseen cells read "?". So 1, 2, 4, 8, 16, 31 and 1 + 15 + 15 stay on screen after Reset.
- Chips "2 points" … "6 points" (current one active and disabled), Reset (back to 1 point; disabled at 1 point and at the reveal).
- At the reveal, a learner who pressed Reset sees the 6-point drawing again, so the 15 lines and 15 crossings the reveal quotes are in the picture.
- Milestones: `five` (5 points shown, 16 pieces), `six` (6 points shown, 31 pieces). QA path: chips in DOM order.

## Reveal (brief draft, 68 words, plus "(16 pieces)")
"Doubling held up to 5 points (16 pieces), then 6 points gave 31, not 32. Every piece is made by a line or a crossing: pieces = 1 + lines + crossings. With 6 points that is 1 + 15 + 15 = 31. Lines come from pairs of points and crossings from groups of four, so the count was never doubling. Five matching cases are evidence, not a proof." Numbers come from the kept counts.

## Told vs shown
Shown: the pieces row breaking at 31; lines and crossings rows that sum (plus 1) to pieces in every column. Told in one claimed sentence: why lines are pairs and crossings are groups of four (c3). The formula is in c2.

## Recall
"You test a rule on the first five cases you try and it works every time. What have you shown?" → "It is evidence, but a later case could still break it" (claim c1).
