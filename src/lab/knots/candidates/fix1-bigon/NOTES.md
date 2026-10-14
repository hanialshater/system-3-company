# fix1-bigon: open long bigons into lenses (follow-up to gen2-force-smooth)

follow-up, not a generation · slot `fix1-bigon` · rnd-engineer · 2026-10-14 · parent `gen2-force-smooth` · authority:
VP ruling §4 in `company/rnd/evolution/knots-gen2.md` ("Import block, bigons (b)"; option "a minimum bigon width in
force-smooth's own forces"). Not registered in `evolve.json` (the evaluator is not mine), so `evolve eval` gates it out
with "not registered"; every number below is measured, not a score.

## 1. The idea, in two lines
force-smooth puts each piece's largest region on Tutte's outer circle with its crossings on it, then squares every
crossing; a long 2-sided region (bigon) between two such crossings stays two near-parallel strands (a doubled line). A
**bigon opener** in the relaxation pushes a long bigon's two edges apart across its chord until it reads as a lens.

## 2. What changed
Only `draw.mjs` and `index.d.ts` (doc line). All other library files are byte-identical to `gen2-force-smooth`.
`measure-bigons.mjs` and `renders/` are development files (not imported by `index.mjs`; see section 8).

- `tutte()` returns the outer region of each piece; `layout` passes it to `force()`.
- `force()` collects the bigons of the piece, skipping the outer region: for each, crossing a, edge 1's two handles
  (from a), crossing b, edge 2's two handles (from a).
- `relax()`, during the cooling steps only (not the 12 squaring steps): for each bigon with chord l = |ab|, normal n,
  `w` = (sum of edge 1's handle offsets along n) - (same for edge 2). If `6 (l - 1.5 k) > |w|`, edge 1's handles get
  `+10 x shortfall` along n (sign of w) and edge 2's the opposite. Crossings get no force. Moves are still cut by the
  8-sector zones, so the control polygons keep their faces and handedness exactly as before.
- Unchanged: the API, `Layout` shape, the `at()` dart indexing that keeps a stored layout valid across
  `crossingChange` (the 103rd test passes), `draw()`.

## 3. Prior art and licences
Ideas only, no code copied: PrEd (Bertault 2000) and ImPrEd (Simonetto et al. 2011) zones, as in the parent. Region
"inflation" in force-directed drawings is folklore (e.g. pressure / bubble models); the variant kept here is a per-bigon
separation force, my own. No GPL code read.

## 4. Internal objectives (what the code branches on or optimises)
None copies the bench or the looks test: no 4 % radius, no 1.5 cap, no spacing or spread formula, no curvature
measure, no 30 % / 3 % / 6 % / 2 x size, no bigon or face width as measured in section 5.
1. **Bigon separation target** `6 (l - 1.5 k)` on handle offsets (sum of two handles, so about 3 (l - 1.5 k) between the two edges' mean handle offsets).
   Goal: a long bigon is drawn as an open lens. `k` is the relaxation's own length unit (`sqrt(pi / N)`, inherited).
2. **Eligibility** `l > 1.5 k`: a bigon shorter than 1.5 relaxation units (a twist inside a dense diagram) is left
   alone. Goal: spend room where a bigon is long enough to be mistaken for a doubled line.
3. **Outer region excluded** (combinatorial, from Tutte's choice). Goal: never inflate the whole picture.
4. Inherited from the parent and unchanged: outer region = largest region; handedness guard; stopping rule.
5. Constants 6, 1.5, 10 were tuned by eye and with the scratch measures below on 3_1, 4_1, 5_2, L2a1, random12 and
   bench seeds 101-102 (not the scoring seeds 1-3).

## 5. Bigon width, before and after (`node measure-bigons.mjs [before]`)
Width = largest distance from a point of one edge's curve to the other edge's curve (both ways), drawn with `draw(pd,
{gap: 0})`, view box 100. Ratio = width / chord. Face width = for each edge of a region, the largest distance from its
middle third to the region's other edges; the region's width is the smallest; the column is the diagram's minimum over
all regions (catches squeezed triangles that are not bigons). Self-check in the script: two cubics bulging 7.5 to each
side of a 100-long chord measure 15.

| knot | bigons | min bigon width before -> after | ratio before -> after | min face width before -> after |
|---|---|---|---|---|
| **3_1** | 3 | **7.7 -> 23.5** | **0.10 -> 0.58** | 7.7 -> 18.2 |
| **4_1** | 2 | **8.3 -> 17.0** | **0.12 -> 0.33** | 8.3 -> 12.0 |
| 5_1 | 5 | 12.4 -> 19.8 | 0.27 -> 0.53 | 12.4 -> 18.0 |
| 5_2 | 3 | 10.0 -> 14.3 | 0.19 -> 0.44 | 10.0 -> 13.9 |
| 6_1 | 4 | 10.2 -> 10.0 | 0.24 -> 0.40 | 10.2 -> 10.0 |
| 6_2 | 3 | 9.7 -> 16.0 | 0.21 -> 0.41 | 9.7 -> 14.4 |
| 6_3 | 2 | 9.0 -> 8.6 | 0.17 -> 0.28 | **4.7 -> 2.7** |
| 7_1 | 7 | 10.8 -> 16.3 | 0.32 -> 0.55 | 10.8 -> 14.9 |
| 7_2 | 5 | 9.8 -> 11.0 | 0.26 -> 0.43 | 9.8 -> 11.0 |
| 7_3 | 5 | 9.3 -> 9.0 | 0.23 -> 0.52 | 9.3 -> 8.8 |
| 7_4 | 4 | 10.0 -> 15.5 | 0.26 -> 0.46 | 10.0 -> 15.0 |
| 7_5 | 4 | 8.9 -> 8.0 | 0.19 -> 0.46 | 8.9 -> 8.0 |
| 7_6 | 3 | 9.0 -> 9.1 | 0.21 -> 0.36 | 9.0 -> 8.5 |
| 7_7 | 2 | 9.0 -> 15.5 | 0.20 -> 0.42 | 9.0 -> 11.8 |
| 10_8 | 7 | 8.0 -> 11.0 | 0.29 -> 0.42 | 8.0 -> 10.9 |
| **all prime table knots** | | **7.7 -> 8.0** | **0.10 -> 0.28** | **4.7 -> 2.7** (6_3) |
| L2a1 (Hopf) | 4 | 4.2 -> 5.1 | 0.04 -> 0.05 | 1.3 -> 3.3 |
| random12 | 8 | 5.6 -> 4.6 | 0.24 -> 0.23 | 5.6 -> 4.1 |
| `randomKnot(1..200)` defaults, 1,013 bigons | | min 3.9 -> 3.8, 5th pct 5.5 -> 5.0, median 8.3 -> 13.1 | | per diagram: 5th pct 5.0 -> 4.0, median 7.5 -> 6.7 |

Reference (gen 0's circle packing, the "textbook" pictures, measured with a scratch version of the same script):
3_1 26.8 / 0.52, 4_1 10.1 / 0.32. So 3_1 is now close to the packing's trefoil and 4_1 is wider than it.

**Reading.** The minimum ratio on every prime table knot rises (0.10 -> 0.28); 3_1 and 4_1, the two the VP named, go
from doubled lines to open lenses. The cost is where the room comes from: 6_3's narrowest region (a triangle, not a
bigon) gets thinner, 4.7 -> 2.7, and random diagrams' narrowest regions get thinner (5th percentile 5.0 -> 4.0) while
their typical bigon gets much wider (median 8.3 -> 13.1).

## 6. Pictures
`renders/gen2-force-smooth--<name>.svg` (before) and `renders/fix1-bigon--<name>.svg` (after) for 3_1, 4_1, 5_2, L2a1
and random12 (`randomKnot(20261014, {strands: 3, length: 12})`, as in knots-gen2-looks/). What I see:
- **3_1:** three open lobes, close to the textbook trefoil (one lobe slightly smaller; the 8 axis-aligned zone sectors
  break the 3-fold symmetry). The top crossing's vertical strand bends a little just past the crossing.
- **4_1:** the left doubled side is now a lens; the right bigon is short (below the eligibility length) and is drawn
  small but round.
- **5_2:** both outer bigons open; readable, close to before.
- **L2a1:** still a flat lens. Not fixed (section 8).
- **random12:** outer lobes open; the centre-left S-shaped pair is a little tighter than before.

## 7. Gates and conditions
- **Tests:** 103/103 on the current evaluator (includes "a stored layout keeps every strand where it was across a
  crossing change", L2a1 included), on each of seeds 1-3.
- **Looks gate:** passes. My scratch copy of its measure (for the margin only), straight % / sharp %: 3_1 3/0, 4_1
  10/0, 5_1 8/0, 5_2 8/0, 6_1 14/0, 6_2 10/0, 6_3 7/0, 7_1 0/0, 7_2 3/0, 7_3 3/0, 7_4 8/0, 7_5 7/0, 7_6 5/0, 7_7 8/0,
  10_8 4/0. Worst straight 14 % (parent: 23 %, 7_7); sharp 0.0 % everywhere. More margin than the parent.
- **Size** (`node tools/evolve.mjs size knots fix1-bigon`):

| entry | gen2-force-smooth | fix1-bigon | delta |
|---|---|---|---|
| draw-a-table-knot | 5,459 | 5,673 | +214 |
| tricolour-check | 9,739 | 9,957 | +218 |
| unknot-game | 7,095 | 7,314 | +219 |
| **random-knot** | 11,377 | **11,592** | +215 (condition <= 11,776: **184 B under**) |
| whole library | 11,391 | 11,612 | +221 |

- **Extra crossings** (scratch counter, same method as the bench's: 9-point cubic samples, segment intersections not
  within 4 % of size of a crossing both edges share; `draw(pd)` defaults; same diagrams for both):

| family | gen2-force-smooth | fix1-bigon |
|---|---|---|
| `randomKnot(1..1000)` defaults (the random-knot lesson) | 0 / 1,000 | **0 / 1,000** |
| projected polygons, 1,000 (`benchgen`, rng 20261014) | 9 (32 intersections) | 12 (42) |
| disguised braids, 1,000 (same rng stream, after the polygons) | 19 (70) | 19 (57) |

  The disguised-braid count for the parent differs from the rnd-lead's 25 because my stream draws the polygons first;
  the comparison here is paired. 9 -> 12 on projected polygons is within what I would call noise at this count, but it
  is not an improvement: defect (a) is not fixed by this candidate and its import block stands.
- **Draw time** (warm median of 40, load about 10-14, so noisy): 3_1 1.23 -> 1.53 ms, 5_2 2.08 -> 2.18 ms,
  `randomKnot(3)` 6.95 -> 4.82 ms.

## 8. Self-score (`EVOLVE_ARCHIVE=<scratch> node tools/evolve.mjs eval knots fix1-bigon gen2-force-smooth --seed=N`)
fix1-bigon is not in `evolve.json` "parents", so the evaluator gates it out (score 0, problem "not registered"). The
"would-be score" column applies the evaluator's own formula (tests x 100 - 0.002 x mean lesson gz + bench) to its record.
Load 14.0 -> 11.4 across the three runs.

| seed | gen2-force-smooth score | fix1-bigon would-be score | g | spacing | spread | aspect | extra / planar | slow |
|---|---|---|---|---|---|---|---|---|
| 1 | 10,676.22 | 10,667.39 | -8.83 | 14.03 -> 12.70 | 69.63 -> 66.30 | 99.42 -> 99.15 | 0 / 100 both | 0 |
| 2 | 10,662.69 | 10,656.97 | -5.72 | 11.90 -> 11.53 | 66.23 -> 62.53 | 98.59 -> 98.75 | 0 / 100 both | 0 |
| 3 | 10,656.07 | 10,648.22 | -7.84 | 12.15 -> 11.10 | 68.17 -> 64.66 | 98.75 -> 99.00 | 0 / 100 both | 0 |

Median g = **-7.8** (about -2 % of the layout term). The loss is all spacing and spread: an open lens takes room that
the bench's "closest crossing pair" and "closest strand-to-crossing" measures reward being left to other strands. The
bench has no width measure, so it cannot see the gain. Size costs 0.43 points per seed.

**Process notes.** An earlier version of `measure-bigons.mjs` used `import()` to load a library by path; the evaluator
flagged it ("dynamic import() is not allowed"), so it now imports this folder and `../gen2-force-smooth/` statically
and must be run from inside `src/lab/knots/candidates/fix1-bigon/`. One re-run of seed 1 after the fix shows only the
"not registered" problem. If the lead registers this candidate, `measure-bigons.mjs` and `renders/` are not covered by
`mutable` and would fail the frozen-file check; move them out (for example next to the evolution record) first.

## 9. What I tried and dropped
- **Bigon target proportional to the chord, every bigon** (no eligibility length): fixes 3_1 and the Hopf link, but
  squeezes the triangles next to the bigons (4_1's top becomes a doubled line, 5_2 gets corners) and zig-zags the twist
  chains of random diagrams; bench layout -10 to -20.
- **Pulling a bigon's two crossings together** as well: rounder lenses, but spread fell further.
- **Region pressure** (every inner region pushed outward in proportion to 1 / its control-polygon area): random
  diagrams look balanced and the Hopf link opens when combined with the opener, but it **added extra crossings**: 1 in
  1,000 at the random-knot lesson's settings, and projected polygons 9 -> 26 in 1,000. A false crossing is worse than a
  thin region, so it is out.
- **Eligibility from the start (Tutte) chord** instead of the current one: opens the Hopf link (ratio 0.48) but pushes
  most bigons of a dense diagram; random12's narrowest bigon fell to 2.8.
- **A cap on the target** (to stop 5_1's lobes reaching 3 % sharp in the uncapped BT = 8 version): the cap also shrank
  the trefoil; lowering the gain to 6 did the same job without code.

## 10. Hopf link (L2a1): looked at, not fixed
All four of its regions are bigons; the outer one is excluded and the three inner ones lie on a chord that the centre
pull shrinks to about 1.8 relaxation units within 10 steps, close to the eligibility length, so the middle lens is
squeezed by its two neighbours' equal pushes. Every variant that opened it (sections 9's first, third and fourth items)
cost a lesson-relevant picture or a false crossing. A link-only route (for example: eligibility by the start chord only
in pieces whose regions are all bigons) is possible, but no lesson draws links and the EDD already says link drawing is
not supported, so I did not spend the bytes.

## 11. What I believe, and how sure
- 3_1 and 4_1 no longer draw doubled sides: **sure** (numbers above, pictures in `renders/`). Whether the result is good
  enough to lift the import block is the design lead's or a judge's call, with the pictures, not mine.
- No new false crossings at the random-knot lesson's settings: **fairly sure** (0 in 1,000 seeds; the parent's 0 in
  10,000 was the lead's run, I did not repeat 10,000).
- The bench cost (median -7.8) is real and structural, not noise: **fairly sure** (same sign on all 3 seeds and on my
  2 tuning seeds).
- Some regions in dense diagrams and 6_3 are thinner than before: **sure**; whether it is visible at lesson size I
  have not judged.

## 12. Proposed (the lead decides; evaluator is not mine)
- A bigon-width or minimum-face-width check for the looks test (VP's evaluator gap 2). `measure-bigons.mjs` has one
  definition of each with a self-check against a known value.
