# Build note: cut-the-cube-surface
- Built by a sonnet builder (EXP-003 model comparison). Brief 44. Title "One cube, a thousand cubes".
- Brief's "halve every edge" would reach 8 and 64 pieces, never the question's 1,000. Changed to buttons for 1, 2, 5, 10 pieces per edge (1, 8, 125, 1,000 pieces; 6, 12, 30, 60 cm2). Milestone `thousand` is 10 per edge, the value the question names.
- Area computed by area1(n) = n^3 x 6 x (1/n)^2, rounded to kill float noise (a screenshot showed 60.000000000000014 before the fix). Drawing is the front face, pieces pulled apart.
- QA: phone and desktop pass.

## Revision v2
Fixes from the v1 learner review: the front-face drawing stayed one size, which looked like 'same'. Added a bar under the drawing that grows with total outside area (tick at the whole cube's 6 cm2), a caption saying the drawing shows the front face only and that cuts make hidden new faces, a 'Outside of one piece' readout (0.06 cm2 at 10 per edge, so the reveal's number is on the stage) and a 'Surface a reaction can touch' readout (x10) linking area to reaction speed. Reveal now refers to what the learner saw. c4 and c6 reworded and reset to unverified.
