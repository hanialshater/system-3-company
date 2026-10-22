# Fact-check: ant-on-a-cube v1

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read in this order: artifacts/walkthroughs/ant-on-a-cube/ (transcript.md, sheet.png, 04-step-3.png, 05-step-4.png), then meta.json claims, Demo.tsx and the brief (company/domains/briefs/math.geometry.md #4). Did not read build.md or design.md.

Independent recomputation (my own script, not the brief's check): Dijkstra over the whole cube surface (40 grid points per edge, straight segments inside each face) gives 2.2360680 = √5 from a corner to the opposite corner. Two-face minimisation √(1+t²)+√(1+(1−t)²) is least at t = 0.500, value 2.23607. 1+√2 = 2.41421; √20 = 4.47214; 2+2√2 = 4.82843.

The drawing matches the claims. Demo.tsx routes: edges (0,0,0)→(1,0,0)→(1,1,0)→(1,1,1); diag (0,0,0)→(1,1,0)→(1,1,1); bent (0,0,0)→(1,0.5,0)→(1,1,1). Every segment lies in one face. The unfolded net is the front face [0,1]² plus the right face swung out to [1,2]×[0,1]. The far corner maps to (2,1), and the line crosses the dashed shared edge at its midpoint (screenshot 04). The folded path in screenshot 05 bends at the midpoint of the front-right edge.

| claim | new status | finding |
|---|---|---|
| math.ant-on-a-cube.c1 | verified | 3 m and 1 + √2 ≈ 2.41 m recomputed; drawn routes match. |
| math.ant-on-a-cube.c2 | disputed | Maths right, but "two faces that share an edge … with the ant's corners at opposite ends" holds only for a pair with one face at each corner (6 of 12 adjacent pairs). Example: faces x=0 and y=0 both hold the start and neither holds the end. Required: name the pair (a face at the ant's corner and the adjacent face at the far corner). |
| math.ant-on-a-cube.c3 | verified | Independent surface Dijkstra = √5. This also covers the reveal's "no route over other faces is shorter". |
| math.ant-on-a-cube.c4 | disputed | Overgeneral. "A straight line on some unfolding" is true for convex polyhedra (a box) and false in general: on non-convex polyhedra a shortest path can bend at a reflex vertex. The reveal's "the best walk over a surface is found by unfolding it" is wider still: curved surfaces (a sphere) cannot be unfolded. Required: scope the claim and the reveal sentence to a box or convex flat-faced surface. |
| math.ant-on-a-cube.c5 | verified | √20 ≈ 4.47 (rounds to the 4.5 m option), 4.83, 6 recomputed. |

Unrecorded claims: none found. Hook and predict are questions. The stage labels, readouts, chip traces, aria labels and every reveal sentence map to c1–c4.

Verdict: revise (c2 and c4 disputed; both are wording fixes, no numbers change).
