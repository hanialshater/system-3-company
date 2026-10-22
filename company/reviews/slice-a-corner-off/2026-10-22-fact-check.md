# Fact-check: slice-a-corner-off v1

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read in this order: artifacts/walkthroughs/slice-a-corner-off/ (transcript.md, sheet.png), then meta.json claims, Demo.tsx and the brief (company/domains/briefs/math.geometry.md #5). Did not read build.md or design.md.

The drawing matches the claims. Demo.tsx recounts V, E and F from the drawn solids. Cube cuts are at 30% along each edge, at two corners joined by an edge, so the cuts do not overlap (0.3 + 0.3 < 1). The pyramid apex cut is at 35%. Screenshots 02–05 show triangle and square cut faces and the readouts 10−15+7, 12−18+8, 5−8+5 and 8−12+6, all = 2.

| claim | new status | finding |
|---|---|---|
| math.slice-a-corner-off.c1 | verified | All counts recomputed by hand. Each gives 2. |
| math.slice-a-corner-off.c2 | disputed | "Always adds k − 1, k, 1" holds only for a slice that cuts just the k edges at that corner. Counterexample: cutting a cube corner through its 3 neighbouring corners gives 7, 12, 7 (−1, +0, +1). Required: scope c2 and the reveal sentence "A slice through a corner where k edges meet always adds…" to a small slice that cuts only that corner's edges. |
| math.slice-a-corner-off.c3 | verified | V − E + F = 2 for convex polyhedra, named for Euler: Encyclopedia of Mathematics "Euler theorem" (https://encyclopediaofmath.org/wiki/Euler_theorem); ProofWiki "Euler Polyhedron Formula". I did not confirm the title of the 1758 paper in the source field; the learner text has no title or date. |
| math.slice-a-corner-off.c4 | verified | 2 − 12 + 30 = 20; icosahedron 12, 30, 20. |

Unrecorded claims: none found. The hook and predict sentences restate c1's cube count. The chip traces, change line and reveal sentences map to c1–c3.

Verdict: revise (c2 disputed: a wording fix; no numbers change).
