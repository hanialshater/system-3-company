# Design note: ant-on-a-cube (math:surface-shortest-path)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.geometry.md`, Wave J, brief 4 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (G4)

## The payoff
The routes you can see on a box (edges, a face diagonal) are not the shortest. Unfold two faces flat and the walk becomes one straight line, which is shortest on a flat sheet; fold the faces back and that line is a bent path crossing the shared edge at its midpoint. The learner should watch the right face swing open like a door, see the straight line on the 2 by 1 net, then watch it fold back into the bent path on the cube.

## Knowledge boundary (meta.json `learner`)
- knows: Pythagoras, √(a² + b²) for the long side (`math/two-squares-become-one`).
- doesNotKnow: that the shortest walk over a surface is found by unfolding it flat and drawing a straight line.

## Misconception
The shortest walk across a box goes along its edges or along a face diagonal, because those are the straight lines you can see.

## Objective
The learner can say the ant's shortest walk is about 2.24 m, found by unfolding two faces into a 1 by 2 rectangle and drawing the straight line √(1² + 2²), crossing the shared edge at its midpoint, and that it beats 3 m (edges) and 2.41 m (face diagonal plus edge).

## Prediction
Brief's kit text as a second-person scene with every condition stated (outside only, start corner to the farthest corner): "You watch an ant on the outside of a 1 m cube. It walks from one bottom corner to the top corner farthest from it, never leaving the surface. Its shortest walk is about…" Options "2.2 m" / "2.4 m" / "3.0 m" (answer A), all numbered at the same precision.

## Interaction (Before / after toggle: cube ↔ unfolded net)
- One picture at a time (viewBox 320 × 212, 120 px per metre). Cube in a fixed cabinet (oblique) view: front face true shape, depth drawn up-right at half scale. The ant (a small drawn ant in a ring) at the front-bottom-left corner; the far corner (back-top-right) a ring in the domain colour. Edge label "1 m".
- Start frame: the cube, both corners marked, no route and no readout (every chip enabled; nothing on the locked stage matches an option).
- Controls, DOM order (brief): "Along the edges" (red route, readout "length 3.00 m"), "Diagonal then edge" ("length 2.41 m"), "Unfold two faces" (the right face swings out about the front-right edge in ~350 ms until it lies flat beside the front face; the top face fades; the net is 2 by 1 with "1 m" and "2 m" sides, the shared edge dashed, the straight green line with its midpoint dot, the label "√(1² + 2²) = 2.24 m" and readout "length 2.24 m"), "Fold back up" (the face swings back; the same line becomes the bent path on the cube, through the dot at the midpoint of the shared edge; "length 2.24 m"), Reset.
- The shown state's chip is active and disabled; Reset is disabled at the start frame. Reduced motion: the swing is instant.
- Trace: each tried chip keeps "✓ <length> m"; after the fold-back milestone, Reset leaves the bent path as a faint dashed trace on the cube, so the reveal's "bends across the shared edge" is still on the stage.
- Milestones: `route` (edges or diagonal: a route ≥ 2.41 m seen), `flat` (the net with its straight line), `folded` (fold back up after the net was seen). minInteractions 3. QA path: chips 1 to 4.

## Why the right face, not the top face (deviation for cm-math)
The brief names the top and front faces, but its phone-fit line asks for the net to fit 300 × 150 px, which is a horizontal 2 by 1 net. Top and front unfold into a vertical 1 by 2 net (twice as tall, which would push the reveal off a 390 × 844 screen). Front and right share a vertical edge, so the right face swings out sideways like a door and the net lies flat at 240 × 120 px. The geometry is the same by symmetry (any two faces that share an edge, one at each corner): same √(1² + 2²), same midpoint crossing. Reveal and claims say "two faces", as the brief's reveal does.

## Reveal (brief draft, quoting what was seen)
"Along the edges was 3.00 m and the face diagonal plus an edge 2.41 m. | Unfolding two faces into a flat 1 by 2 rectangle turned the walk into one straight line, √(1² + 2²) = √5, about 2.24 m. Folded back up, it bends across the shared edge at its midpoint, and no route over other faces is shorter. | On a flat sheet a straight line is shortest, so the best walk over a surface is found by unfolding it."
The first sentence names only the routes the learner tried (edges, diagonal or both). "Folded back up …" replaces the brief's "crossing the shared edge at its midpoint" so it points at the fold-back state; "no route over other faces is shorter" says claim 3 on the reveal (the answer to "shortest").

## Told vs shown
The cause (unfolding makes the surface flat; on a flat sheet the straight line is shortest) is shown: the face swings flat, the green line is straight on the net, and folding back bends the same line. One told sentence: "On a flat sheet a straight line is shortest" (claim c4). "No route over other faces is shorter" is told (claim c3); the stage does not try three-face routes.

## Recall
"An ant walks on the outside of a cube with 2 m edges, from one corner to the corner farthest from it. Its shortest walk is about…" 4.5 m / 4.8 m / 6.0 m (answer 4.5 m: √(2² + 4²) ≈ 4.47; claim c5).
