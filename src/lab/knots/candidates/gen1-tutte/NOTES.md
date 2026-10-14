# gen1-tutte (slot A): reweighted Tutte embedding of a triangulation, then planarity-guarded stress

rnd-engineer, generation 1, 2026-10-14. Parent: `gen0-baseline`. Brief: `company/rnd/evolution/knots-gen1-brief.md`.

## The idea, in two lines
Triangulate the diagram's plane graph (crossings, one point per dart, one vertex per face) so that Tutte's theorem applies, embed it with a reweighted Tutte solve,
then run stress majorization in which no step may flip a triangle. Every drawing along the way is therefore planar, with the same embedding.

## What changed
- **New `layout.mjs`** (`layout(pd, {K = 2})`). It replaces gen 0's circle packing and its Tutte fallback for *every* diagram, table knots included.
  1. **Triangulation.** Vertices: crossings, one point per dart (the stub end), and one vertex per face that is not a monogon.
     - Edges: stubs, edge middles, a corner chord between consecutive stubs at a crossing (skipped at a monogon's corner, where the edge middle closes it), and spokes from each face vertex to the face's stub points.
     - Triangles: the 4 corners round each crossing, plus a fan in each face.
     - Why the chords matter: without them, gen 0's crossing/edge/face graph has 2-cuts (a crossing plus a face vertex) at every kink and bigon, and Tutte collapses those parts onto segments. That is the cramping the brief describes. With the chords, every face of the graph is a triangle and the drawing is a valid embedding: 0 zero-area or flipped triangles on the 11 seed-1 bench diagrams I checked. The first version, without chords, had dozens per diagram.
  2. **Outer face.** The K = 2 largest faces with no isthmus edge are tried. The best is picked by a score: closest crossing pair × √n, plus 5 × the closest approach of a strand to a crossing it does not touch, both ÷ the drawing size. These are the brief's two headroom metrics, computed on the layout's straight segments, not on the bench's samples. The outer face's vertex is left out of the Tutte system and the stress, but its spokes stay in the graph distances, so the outer boundary is pulled round, like a face.
  3. **Reweighted Tutte.** The outer boundary goes on a circle and the system is solved exactly (Gaussian elimination, N ≈ 6n). Then 5 rounds: each edge's weight × (its length ÷ its target length), clipped to [¼, 4], and solve again. Weights stay positive, so Floater's theorem keeps every round a planar embedding. Long edges get pulled in, and the exponentially shrunk inner parts open up.
  4. **Stress majorization.** Graph distances use target lengths: stub 1, middle 1, chord 1.4, spoke 0.6 / sin(π/2k) for a k-gon. Weights are 1/d², and the run starts at the stress-optimal scale.
     - The guard: a step may not flip any triangle or make the outer boundary cross itself. The corners of any triangle that would flip keep their old positions, and the next step is cut to 0.6×. The run stops when the step falls below 10⁻³, usually after about 15 iterations.
     - Once a crossing's four stub ends form a convex quadrilateral, it may not stop being convex.
  5. **Crossing straightening.** 4 guarded rounds turn each crossing's stubs halfway toward a right-angled cross, and halfway toward 0.8 × that crossing's mean stub length.
- **`draw.mjs`**: the packing, `pl`, `planar` and `tutteLayout` are gone; it imports and re-exports `layout`.
  - One rendering change: the Catmull-Rom tangent at a crossing now runs along the difference of the two *unit* stub directions, not the raw chord. Unit vectors in cyclic order form a convex quadrilateral, so the two strands cross with the right handedness whenever the stubs go round the crossing in order, which the triangle guard ensures.
- **`index.d.ts`**: `layout` doc and options (`{K}` replaces `{iters, tutte}`).
- Hot loops (distances, Tutte elimination, stress) are separate small functions. Inlined in the big closure, V8 left them unoptimised and they ran about 4× slower.

## Prior art (no code copied; all from the papers)
- W. T. Tutte, "How to draw a graph", *Proc. LMS* 13 (1963): barycentric embedding of a 3-connected planar graph with a convex outer face.
- M. Floater, "Parametrization and smooth approximation of surface triangulations", *CAGD* 14 (1997), and "Mean value coordinates", *CAGD* 20 (2003): any positive weights on a triangulation give an embedding. This is what makes the reweighting safe.
- E. Gansner, Y. Koren, S. North, "Graph drawing by stress majorization", GD 2004: the SMACOF update and the 1/d² weights.
- The planarity guard (keep every triangle's orientation) is my own, in the spirit of injectivity-preserving mesh parametrisation. It is not from slot B's papers.
- No licence issues: these are published algorithms, written from the papers. Nothing was ported from any code base.

## Numbers (`node tools/evolve.mjs eval knots <id> --seed=N`; archive lines removed afterwards)

| seed | id | score | bench | extra | planar | spacing | spread | aspect | slow |
|---|---|---|---|---|---|---|---|---|---|
| 1 | gen0-baseline | 10,409.02 | 325.10 | −1 | 95 | 8.87 | 37.64 | 90.54 | 0 |
| 1 | **gen1-tutte** | **10,451.08** | 368.77 | 0 | 100 | 13.16 | 52.61 | 91.32 | 0 |
| 2 | gen0-baseline | 10,400.74 | 316.82 | −1 | 95 | 7.20 | 36.14 | 94.59 | 0 |
| 2 | **gen1-tutte** | **10,438.94** | 356.64 | 0 | 100 | 11.68 | 49.55 | 88.61 | 0 |
| 3 | gen0-baseline | 10,375.17 | 291.24 | −2 | 90 | 6.94 | 28.60 | 93.41 | 0 |
| 3 | **gen1-tutte** | **10,430.25** | 347.94 | 0 | 100 | 11.65 | 49.46 | 91.00 | 0 |

**+38 to +55 per seed.** All 101 tests pass, and the size gates hold. The non-layout metrics are identical to gen 0's apart from Jones timing noise.

**Size.**

| | gen 0 | gen1-tutte | change |
|---|---|---|---|
| mean lesson | 8,036 | 8,846 | +810 (about −1.6 points) |
| random-knot | 10,986 | 11,794 | 494 B left under 12,288 |
| library | 11,001 | 11,811 | |

**Speed.** Warm, gen1-tutte costs about 18–25 ms CPU per draw against gen 0's 10 (20 messy diagrams of 14–20 crossings). On the bench, 0 slow penalty in all 3 runs.
- But this machine had a load average of about 25–30 on 4 cores during my runs, and there wall time per draw reached 90–150 ms.
- **If the lead's scoring run is that loaded, `layoutSlowPenalty` can take back 10–50 points.** `layout(pd, {K: 1})` is about 30 % cheaper, for about −4 points.

## What I expected, and what happened
- **Expected:** reweighted Tutte alone would un-bunch the crossings.
- **Found:** that only works once the graph is a real triangulation. On gen 0's graph, kinks and bigons are 2-cuts, and no weights can stop them collapsing.
- After the fix:
  - plain Tutte: spacing about 8;
  - adding stress with the triangle guard: 12–13;
  - adding the reweighting rounds: +0.3 to 0.6 more.
- **Surprise 1: more stress iterations make it worse.** The stress optimum is not planar, so a long guarded run presses triangles flat against the barrier (a step floor of 0.05 with 150 iterations: spacing 12.6 → 9.4 on seeds 1–3). The early stop, triggered by the 0.6× cut on every step that needs a revert, works as regularisation.
- **Surprise 2: tangential crossings.** Stress plus guard leaves some crossings nearly tangential: mean crossing angle 57°, the worst 0°. One (4_1) failed the handedness test. Two fixes:
  - the straightening pass: mean 85°, worst 12°, at a cost of about 1 in spacing;
  - the unit-stub tangent in `draw`.
- **Handedness, beyond the test set.** On 65 random braid closures and scrambles and 45 projections, 1 crossing is drawn mirrored. Gen 0 has 5 on the same set. In both, the cause is a sub-diagram behind a 2-strand neck (a connected-sum-like part) that Tutte shrinks to under 1 px, where the SVG's 0.1 rounding loses the direction.

## Trade-offs
- **Table knots look less textbook than circle packing.** Bigons on the rim render as flat "sausages", and the outer boundary has a few cusps. They are planar and evenly spread, but if the lead wants textbook pictures for reduced diagrams, a crossover could keep packing for diagrams where it is planar. That costs about 1 KB and spends the packing's CPU on every diagram.
- **A mean-lesson cost of +810 B**, all in `draw`'s closure.

## What I would try next
1. Necks. Find 2-edge cuts and lay the two sides out separately (or recursively), then join them. That fixes the residual sub-pixel parts and the last mirrored crossing.
2. A softer barrier in place of the revert: a log-barrier on triangle area in the stress, or slot B's node–edge repulsion as a crossover. That should let stress run to convergence without flattening triangles.
3. Use the score to choose between this layout and circle packing per diagram (crossover with gen 0) for textbook table knots.
4. Mean-value weights (Floater 2003) as the first Tutte round, in place of the uniform weights.
