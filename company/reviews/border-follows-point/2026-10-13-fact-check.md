# Fact-check: border-follows-point (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; geometry re-run in artifacts/scratch/fc-aiecongeo/bfp.mjs (10,000 random A positions in the slider range, no seeds shown to learner).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | axisCrossing([0,0]) = 2, axisCrossing([-2,0]) = 1; A moved 2, border moved 1. |
| c2 | verified | For 10,000 random A (x in [-4,0], y in [-2,2]): crossing point is equidistant from A and B, and the bisector passes through the midpoint at right angles to B-A (max error < 1e-9). |
| c3 | verified | 1-NN regions are unions of Voronoi cells with edges on perpendicular bisectors (de Berg et al. ch. 7; Hastie, Tibshirani & Friedman s13.3). Independent textbooks, but both are textbook-level; the fact is a definition, not an empirical finding. |
| c4 | verified | B fixed at (4,0); sliders A x -4..0, y -2..2 as in Demo.tsx. |

## Added (unverified) and a concern
- c5: the reveal's last clause, "moving any training point near it moves the decision for every spot around it". This is stronger than the geometry. In a 6-point check, nudging one point by 0.5 changed the label of 0.8% of the plane. Not marked disputed (the phrase is vague and the next checker may read it as 'spots near it'), but it should be reworded by demo-builder before launch.

Other stage text: "A moved 2; the border moved 1" is true on the axis, as stated.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | In 1-NN, moving one training point changes the class only of spots that switch nearest neighbour (the sliver between its old and new cell); 'every spot around it' overstates. Fix: 'moves the decision for the spots nearest to it' or 'moves the border near it'. |

Stage check: with the stage's two points the border does move for a whole half-plane, which is where the over-generalisation to 'every spot' comes from.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c5 | verified | With many points, moving a training point near a nearest-neighbour border moves the border... | Rechecked: revised reveal says the border moves near the moved point and spots between old and new border change class; matches 1-NN geometry. |

## Result (pass 4)
1 verified, 0 disputed, 0 left unverified, 0 added unverified.
