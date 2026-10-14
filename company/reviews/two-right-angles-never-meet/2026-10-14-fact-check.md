# Fact-check: two-right-angles-never-meet (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: math/two-right-angles-never-meet v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived: draw the parallel to the base through the apex; alternate angles give A + B + C = 180° in the Euclidean plane. 180 − 90 − 90 = 0. Reveal 'Those two corners already use all 180°, leaving 0° for the third.' Euclid I.32 not opened; not needed. |
| c2 | verified | Right triangle with the right angle at the left end: height/base = tan B. Own node with the stage's fmtH: tan 89° = 57.3 (1 decimal at 10-100), tan 85° = 11.4, tan 60° = 1.73; top corner 90 − B. Readouts in the picture read 'sides meet' / '57.3 bases up' and 'top corner' / '1°' (labels are lower-case on the stage). Reveal quotes the largest B in 85-89 the learner set (milestone near, required). |
| c3 | verified | If two lines perpendicular to one base met, the triangle would have angle sum 90 + 90 + apex > 180°, contradicting c1, so they are parallel. Stage at B = 90: meet(90) = null → readout 'never', both sides drawn vertical, trace '90° → never'. |
| c4 | verified | Definition of proof by contradiction (reductio): an assumption that implies an impossibility is false. Reveal sentence states exactly that. Convention; no number. |
| c5 | verified | Stage caption reads 'Flat page. The left corner stays square. Turn the right one.' (and 'On a flat page.' while locked); predict question says 'On a flat page'. Parenthetical checked: own node of the octant triangle (north pole, (1,0,0), (0,1,0)) gives three 90° angles, so on a sphere two or three right angles occur; not shown to learners. |
