# Fact-check: slice-a-corner-off (v2)

checker: fact-checker · date: 2026-10-22 · lesson version: v2
Read first: artifacts/walkthroughs/slice-a-corner-off/transcript.md and sheet.png, then meta.json claims, Demo.tsx and brief company/domains/briefs/math.geometry.md:83-100. build.md / design.md not read. The earlier record for this order (2026-10-22-fact-check.md) is left unchanged; this file is the v2 check.

## Method
- Counts come from the drawn solid: Demo.tsx `counts()` takes vertices, distinct face sides and faces of `slice()`d CUBE and PYR, so the readouts in the transcript are the stage's own counts: cube 8/12/6, one slice 10/15/7, two 12/18/8, pyramid 5/8/5, tip sliced 8/12/6, each giving 2. Recounted by hand: a truncated cube corner has 3 new vertices, 3 new edges and 1 triangular face; the pyramid apex has 4 edges, so the cut gives 4 new vertices, 4 edges and 1 square face (the frustum is 8/12/6).
- The second slice of the cube (corner (−1,1,1), t = 0.3) cuts toward the earlier cut point (0.4,1,1), not into the first cut face, so it still meets only the 3 edges at that corner (screenshot 03 shows two separate triangles). The pyramid cut at 35 % along four symmetric edges is planar (a square, screenshot 05).
- c2 is a general rule, so I checked its scope: a plane that meets only the k edges at one vertex of a convex polyhedron removes that vertex, makes k new vertices, k new edges (the cut polygon's sides; the old edges are shortened, not lost) and one new k-gon face, and every old face keeps one face. The change is (k − 1) − k + 1 = 0. The v2 wording ("a small slice that cuts only the k edges at a corner") excludes cuts that reach other vertices or edges, which is where the unscoped rule fails.
- c3: Euler, "Elementa doctrinae solidorum" (E230), Novi Commentarii academiae scientiarum Petropolitanae 4 (1758), pp. 109–140, per the Euler Archive (scholarlycommons.pacific.edu/euler-works/230); Encyclopedia of Mathematics "Euler theorem" gives V − E + F = 2 for convex polyhedra and the 1758 attribution. Learner text names Euler but gives no date, which fits the brief. (Euler's own proof had a gap, but the attribution of the formula is standard.)
- c4: F = 2 − 12 + 30 = 20; the regular icosahedron has 12 vertices, 30 edges and 20 faces. The recall answer (20) is right.
- Reveal: "lost 1 corner and made 3", "+2, +3, +1", "where 4 edges meet, gave +3 − 4 + 1" are computed from change() and match c1/c2. Every factual sentence on the stage, reveal and trust sheet maps to c1–c4. No unrecorded claims.

## Claims

| claim | new status | note |
|---|---|---|
| math.slice-a-corner-off.c1 | verified | Counts are recounted live from the drawn solids in Demo.tsx and match hand counts; each gives 2. |
| math.slice-a-corner-off.c2 | verified | Scoped to a small slice that cuts only the k edges at a corner; the rule holds for that case. |
| math.slice-a-corner-off.c3 | verified | Euler 1758, E230, Novi Commentarii 4:109–140 (Euler Archive); Encyclopedia of Mathematics. |
| math.slice-a-corner-off.c4 | verified | 12 − 30 + 20 = 2; icosahedron 12/30/20. |

Verdict: pass
