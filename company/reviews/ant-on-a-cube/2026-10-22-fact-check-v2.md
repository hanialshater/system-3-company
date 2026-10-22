# Fact-check: ant-on-a-cube (v2)

checker: fact-checker · date: 2026-10-22
Read first: artifacts/walkthroughs/ant-on-a-cube/transcript.md and screenshots (04-step-3, 07-reveal looked at in full), then meta.json claims, Demo.tsx and brief company/domains/briefs/math.geometry.md:65-82. build.md / design.md not read.

## Method
- Re-derived the geometry from Demo.tsx itself (x right, y up, z depth; ant at (0,0,0), far corner (1,1,1)):
  - edges route (0,0,0)→(1,0,0)→(1,1,0)→(1,1,1): three unit edges, 3.
  - diag route (0,0,0)→(1,1,0)→(1,1,1): front-face diagonal √2 plus an edge, 1 + √2 = 2.4142.
  - bent route (0,0,0)→(1,0.5,0)→(1,1,1): first leg in the front face z = 0, second in the right face x = 1, both √1.25; total √5 = 2.2361. (1,0.5,0) is the midpoint of the front-right edge, the only edge the two faces share.
  - swing(): the right face rotates about the edge x = 1, z = 0; (1,y,z) → (1+z, y, 0), so (1,1,1) → (2,1,0). Net = [0,2]×[0,1]; the line (0,0)→(2,1) crosses x = 1 at y = 0.5. Matches the drawing in 04-step-3 (line through the dashed shared edge at its middle, sides labelled 1 m and 2 m) and the bent path on the cube in 07-reveal (it meets the front-right vertical edge halfway up and ends at the back-top-right corner).
- Ran `node company/domains/briefs/checks/math-wave-j-check.mjs`: `G4 2.2361 0.500 2.2361 edges 3 diag+edge 2.4142 through 1.7321` (two-face minimum at t = 0.5 and the surface-grid Dijkstra both give √5).
- Recomputed c5: √20 = 4.4721, 2 + 2√2 = 4.8284, 3 × 2 = 6. The recall answer (4.5 m) is right.
- c4 is about any box (a general rule), so I checked it as one: on a convex polyhedron a shortest surface path passes through no vertex except its endpoints, so it unfolds to a straight segment (Alexandrov; Sharir & Schorr, "On shortest paths in polyhedral spaces", SIAM J. Comput. 15(1), 1986). The claim is scoped to boxes, which are convex, so no counterexample from reflex vertices applies. The triangle inequality (Euclid I.20) gives the flat-sheet part.
- c3 general statement ("whichever faces it crosses"): the ant's corner and the far corner share no face, so every route crosses at least one edge between a start face and an end face. The best case is two adjacent faces (√5 by symmetry for each of the six pairs), and the grid Dijkstra finds nothing shorter. This is the standard result for a unit cube.
- Reveal, hook, predict and trust sheet: every factual sentence maps to c1–c5. No unrecorded claims.

## Claims

| claim | new status | note |
|---|---|---|
| math.ant-on-a-cube.c1 | verified | 3 and 1 + √2 = 2.414 re-derived from ROUTES in Demo.tsx; G4 agrees. |
| math.ant-on-a-cube.c2 | verified | Unfolding via swing() gives a 2×1 net; √5 = 2.236; crosses the shared edge at y = 0.5. Matches screenshots 04 and 07. |
| math.ant-on-a-cube.c3 | verified | G4 two-face minimum and surface Dijkstra both √5; corners share no face; symmetric over the adjacent face pairs. |
| math.ant-on-a-cube.c4 | verified | Convex polyhedron: geodesics avoid vertices, so they unfold straight (Alexandrov; Sharir & Schorr 1986); scoped to boxes, so it holds. |
| math.ant-on-a-cube.c5 | verified | c1–c2 scaled by 2: √20 = 4.47, 4.83, 6. |

## Minor (not blocking, not factual)
- The reveal says "1 by 2 rectangle" while the screen-reader label says "2 by 1"; both describe the same net.

Verdict: pass

v1 disputes resolved in v2: c2 now names the pair (front face at the ant's corner, right face at the far corner); c4 and the reveal are scoped to a box (convex).

