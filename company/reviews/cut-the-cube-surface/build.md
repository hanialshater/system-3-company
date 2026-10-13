# Build note: cut-the-cube-surface
- Built by a sonnet builder (EXP-003 model comparison). Brief 44. Title "One cube, a thousand cubes".
- Brief's "halve every edge" would reach 8 and 64 pieces, never the question's 1,000. Changed to buttons for 1, 2, 5, 10 pieces per edge (1, 8, 125, 1,000 pieces; 6, 12, 30, 60 cm2). Milestone `thousand` is 10 per edge, the value the question names.
- Area computed by area1(n) = n^3 x 6 x (1/n)^2, rounded to kill float noise (a screenshot showed 60.000000000000014 before the fix). Drawing is the front face, pieces pulled apart.
- QA: phone and desktop pass.
