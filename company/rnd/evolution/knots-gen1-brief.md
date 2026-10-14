# Knots, generation 1 brief: layout of arbitrary PD diagrams

owner: rnd-lead (Bram) · 2026-10-14 · project `src/lab/knots` · evaluator as fixed in [knots-gen0.md](knots-gen0.md)
· slots: 3 rnd-engineers, one approach each · ready for dispatch

## Target

`layout(pd)` (and through it `draw(pd)`) for **arbitrary** PD codes: random braid closures, projections of
random 3-D cords with their kinks and bigons left in, and scrambled diagrams. Lessons need a clean picture
of a random knot: "long cords knot themselves", "the unknot in disguise", and "is it the unknot?".

Gen 0 draws the reduced table knots well, using a circle packing. On anything else the packing comes out
non-planar, and gen 0 falls back to a Tutte barycentric embedding (40 of 70 random and scrambled diagrams).
That drawing is planar but cramped: crossings bunch against the outer circle. On the gen-1 bench, gen 0
scores:

| metric (bench.mjs) | gen 0 | table knots, for scale |
|---|---|---|
| `layoutCrossingSpread`: closest pair of crossings ÷ (size / √n), ×100 | 29–39 | 58 |
| `layoutSpacing`: closest approach of a strand to a crossing it does not touch ÷ size, ×100 | 6.9–8.9 | |
| `layoutExtraCrossings`: strand intersections that are not at a shared crossing (summed over 20) | 0 to −2 | 0 |
| `layoutPlanarShare` | 90–100 | 100 |
| `layoutAspect`: short side ÷ long side of the drawing, ×100 | 90–95 | |

The ranges come from bench seeds 1, 2, 3 and the scoring run. The headroom is in spread and spacing.

## How every slot is scored

All three slots use the same fixed evaluator: `node tools/evolve.mjs eval knots`. The lead runs it once for
all three candidates, so they all get **one** fresh bench seed that nobody knows beforehand.

- **Gates.** These make the score 0 if they fail:
  - all 101 tests pass;
  - each lesson entry in `test/lessons/` costs ≤ 12,288 B, measured as gzip of the comment- and whitespace-stripped module closure;
  - the whole library costs ≤ 16,384 B on the same measure;
  - only mutable files differ from the parent;
  - there is no dynamic `import()` or `require()`.
- **Score** = 100 × tests − 0.002 × mean lesson bytes + Σ bench metric × weight (`evolve.json` → `benchWeights`).
- **Layout weights:**
  - `layoutSpacing` × 5
  - `layoutExtraCrossings` × 2 (per intersection)
  - `layoutPlanarShare` × 1
  - `layoutCrossingSpread` × 1
  - `layoutAspect` × 0.5
  - `layoutSlowPenalty` × 1: minus the mean ms per `draw` above 100 ms, so a slow layout pays for it.
- **The other metrics** (hard unknots, Gordian, Jones) are also in the score. Gen 1 must not touch the modules behind them, so they should only move with noise. Jones timing is weighted 0.2 because of that noise.
- **Gen 0 on this evaluator:** 10,415.83 (bench term 331.91; seed 437101337). A slot "wins" by beating it, and the others, on the shared seed.

**Size headroom is tight.** `draw.mjs` is in every lesson's closure. The random-knot lesson already costs
10,986 of its 12,288 B, so a candidate has about **1.3 KB gz** (stripped) to spend in total. Every extra KB also costs
about 2 points across the four lessons. Spend bytes where the picture improves.

## The diversity rule: three slots, three different ideas

Each slot is a full copy of `candidates/gen0-baseline/` written into `src/lab/knots/candidates/<id>/`.

- **Parent:** `gen0-baseline`, for all three. They are already registered in `evolve.json`.
- **May change:** only `draw.mjs`, new `layout*.mjs` files that `draw.mjs` imports, and `index.d.ts` (docs). The harness refuses any other difference from the parent.
- **Keep the API:**
  - `layout(pd, opts)` returns plain data `{crossings, points, loops}` that `draw(pd, {layout})` accepts;
  - a stored layout must keep the picture fixed across `crossingChange` (this is tested);
  - the drawing must keep the right handedness (tested);
  - the layout must stay deterministic (seed any randomness from the PD code; no `Math.random`).
- **The fallback may stay.** Each slot may keep circle packing for diagrams where it is already planar, because the table knots look right that way. The slot's idea must carry the general case.

### Slot A: `gen1-tutte`, convex embedding of the planar structure, then relaxation
- **Idea.** Embed the crossing/edge/region map, or its planar dual (the Tait / checkerboard graph), with a Tutte barycentric embedding. Choose the outer face by score, not just the largest. Then improve it while keeping it planar:
  - iteratively reweight the barycentric weights toward uniform edge lengths, as in stress majorization, re-solving each time;
  - or use mean-value weights.
  
  Every intermediate drawing is a convex, planar embedding, so planarity is free. The work is in un-bunching.
- **Prior art:**
  - Tutte, "How to draw a graph", *Proc. LMS* 13 (1963);
  - Floater, "Mean value coordinates", *CAGD* 20 (2003);
  - Gansner, Koren & North, "Graph drawing by stress majorization", GD 2004;
  - the gen-0 Tutte fallback (`tutteLayout` in `draw.mjs`).

### Slot B: `gen1-force`, force-directed with crossing-preserving constraints
- **Idea.** Start from any planar drawing (gen 0's Tutte one will do) and run a spring or electric relaxation in which no node may cross an edge. Each node's move is clipped to a zone that keeps every edge crossing as it is, so the drawing stays planar and the combinatorial embedding never changes. Add:
  - node–edge repulsion, to raise `layoutSpacing`;
  - a mild pull toward the centroid, to fix the aspect ratio.
- **Prior art:**
  - Bertault, "A force-directed algorithm that preserves edge-crossing properties", *IPL* 74 (2000) (PrEd);
  - Simonetto, Archambault, Auber & Bourqui, "ImPrEd: an improved force-directed algorithm that prevents nodes from crossing edges", *CGF* 30 (EuroVis 2011);
  - Fruchterman & Reingold, *SP&E* 21 (1991), for the forces.
  - KnotPlot (Scharein) relaxes knot diagrams with energies. It is proprietary, so it may inform the idea only, not the code.

### Slot C: `gen1-ortho`, orthogonal grid layout, smoothed for drawing
- **Idea.** A knot diagram is a 4-regular plane graph, so it has an orthogonal grid drawing in which every crossing is a grid point with its four strands leaving N, E, S and W. The method:
  - compute bends with Tamassia's min-cost-flow method (a small flow network; write it from the paper);
  - compact the drawing;
  - turn each polyline edge into the `points` that `draw` expects. `draw`'s Catmull–Rom paths then round the corners off.
  
  It gives uniform spacing by construction. Watch the size budget: the flow solver must be small.
- **Prior art:**
  - Tamassia, "On embedding a graph in the grid with the minimum number of bends", *SIAM J. Comput.* 16 (1987);
  - Tamassia, Di Battista & Batini, "Automatic graph drawing and readability of diagrams", *IEEE SMC* 18 (1988) (topology–shape–metrics);
  - spherogram's orthogonal link diagrams (GPL), and Knottingham (MIT), which uses them. Read their documentation only and do not port code, because GPL code cannot go into our library.

If a slot's engineer finds their approach is a dead end, they say so in NOTES.md with the numbers, and do
not switch to another slot's idea. A failed idea, written up, is a result.

## Rules (every slot)

1. **Do not edit the evaluator.** That means `test/` (including `test/lessons/`, `test/benchgen.mjs` and `test/benchdata.mjs`), `bench.mjs` and `evolve.json`. Do not ship a `test/` folder; the harness refuses it.
2. **No peeking.** Do not read `candidates/gen1-*` other than your own during this generation, or another engineer's notes or transcript. You may read `gen0-baseline`, the README, PRIOR-ART and this brief.
3. **No special-casing.** The bench inputs come from a seed chosen at scoring time, but the rule covers more than inputs. A layout that detects the bench, the size entries or the table knots, or that tunes itself to the metrics' sampling (for example, the 4 % radius around crossings), is disqualified. The lead then adds a test that closes the gap.
4. **Run before you hand in.**
   - Run `node --test src/lab/knots/test/*.test.mjs` against your candidate: copy it over a scratch copy of the library together with the evaluator's `test/` and `bench.mjs`.
   - Run `EVOLVE_SEED=<any> node bench.mjs` the same way.
   - Run `node tools/evolve.mjs size knots <id>`.
   
   Do not append to the archive yourself; the lead scores all three in one run.
5. **NOTES.md** in the candidate folder must cover:
   - the idea, in two lines;
   - what changed (files and functions);
   - the prior art used, and its licence;
   - your own bench numbers on seeds 1–3 against gen 0's;
   - the size delta;
   - what you expected and what happened;
   - what you would try next.
6. **Selection.** The lead scores all three in one `eval` run, with one seed. They keep the top 2. Generation 2 gets mutations of those and at least one crossover. A crossover might use A's or C's start with B's relaxation.
