# src/lab/knots: knot theory for 60-second lessons

Status: **lab, generation 0 (baseline)**, 2026-10-14. Plain ESM JavaScript, no dependencies, types and
docs in `index.d.ts`. **Lessons may not import `src/lab/`** (company/rnd/README.md). It reaches lessons
only after the R&D lead's EDD and the principal engineer's review move it to `src/kit/`.

- Prior art, data sources and licences: [PRIOR-ART.md](PRIOR-ART.md)
- Tests (the fixed evaluator): `node --test src/lab/knots/test/*.test.mjs`. 101 tests, about 15 s. Node 22 needs the glob, because `node --test <dir>/` does not accept a directory.
- Bench (quality metrics, one JSON line): `node src/lab/knots/bench.mjs`
- Sizes: `node src/lab/knots/size.mjs`

## What it does

| Area | Functions |
|---|---|
| Representations | PD code (primary; `[a,b,c,d]` per crossing, counter-clockwise from the incoming under-strand; `[k]` = loose loop; `[]` = unknot). `toGauss` / `fromGauss` (signed, or unsigned up to mirror image), `toDT` / `fromDT`, `fromBraid` (σᵢ = `i`, σᵢ⁻¹ = `-i`). `load` validates: each label twice, a consistent orientation, planarity (Euler count of faces). |
| Table | `KNOTS`, `knot(name or alias)`: unknot, 3_1 … 7_7, 10_8 (for unknotting number), Hopf (L2a1), Whitehead (L5a1), Borromean (L6a4), granny and square (connected sums), and the 10-crossing "monster" unknot `U10`. Each entry has `pd`, crossing number `c`, unknotting number `u` and amphichirality `a`. The published invariant values are in `test/published.mjs`, not in the library. |
| Diagram data | `crossingCount`, `components`, `signs`, `writhe`, `linkingMatrix`, `linkingNumber`, `isAlternating`, `nugatory`, `regions`, `arcs` |
| Operations | `crossingChange`, `mirror`, `turnOver` (a 3-D flip: same knot), `reverse`, `connectedSum`, `deleteComponent` |
| Invariants (exact) | `colourings(pd, p)` (Fox p-colourings), `tricolourable`, `colouringOk` (per-crossing check for a learner's colouring), `determinant`, `alexander`, `bracket`, `jones`, `signature`, plus the `poly` helpers (`pstr`, `pparse`, `pmul`, `pinv`…) |
| Moves | `moves(pd)` lists every R1, R2 and R3 move available, with the crossings and edges involved, for highlighting. `apply(pd, move)`. Up-moves: `addKink`, `addBigon`. `reduce` (removals only), `scramble` (seeded random moves), `simplify` (may go up first) |
| Drawing | `layout(pd)` gives plain coordinates (store it to keep a picture fixed). `draw(pd, {layout})` gives one SVG path `d` per edge, cut at under-passes, plus crossing centres (tap targets) and signs |
| Random and 3-D | `mulberry32`, `randomKnot(seed)` (braid closure), `randomWalk(seed, steps, radius)`, `closeCurve(pts, 'direct' or 'radial')`, `project(pts)` (3-D polygon to PD) |
| Identification | `identify(pd)` lists every table entry with the same components, Alexander and Jones after `simplify`, flagged `mirror` when the match is the mirror image. `[]` means not in the table. Several entries means ambiguous. |

### Conventions (fixed, and tested)
- **Handedness.** A crossing is **+1** (right-handed) when the over-strand passes from right to left as seen travelling along the under-strand. The **right-handed trefoil** has three +1 crossings, writhe +3, and is `fromBraid([1,1,1])`, or `mirror(KNOTS['3_1'].pd)`.
- **The table's 3_1 is the left-handed trefoil** (writhe −3), because the table uses the Rolfsen / Knot Atlas diagrams unchanged. Other chiral entries also have the chirality of those diagrams.
- **Jones.** V(unknot) = 1, skein t⁻¹V₊ − tV₋ = (t^½ − t^−½)V₀. The right-handed trefoil is **t + t³ − t⁴**, the left one t⁻¹ + t⁻³ − t⁻⁴, and the positive Hopf link −t^½ − t^(5/2). Mirroring sends t to 1/t (`pinv`).
- **Alexander.** Δ(t) = Δ(1/t), and Δ(1) = 1 for knots. For links, the top coefficient is positive (the sign is otherwise a convention). Split links give 0.
- **Signature.** The positive trefoil has σ = −2 (the KnotInfo sign convention).
- **DT codes** start at an over-pass. An even label is negative when that pass is over (3_1 → `[4, 6, 2]`).

## Examples for lessons (after promotion, import from `@/kit/knots`)

**"Tap crossings to make it the unknot"** (unknotting number; research note §2.7)
```js
import { knot, layout, draw, crossingChange, simplify } from '@/kit/knots'
const L = layout(knot('trefoil').pd)            // compute once, then the picture stays put
let pd = knot('trefoil').pd
const pic = () => draw(pd, { layout: L })       // pic().edges → <path d>, pic().crossings → tap targets {i, x, y}
function onTap(i) {
  pd = crossingChange(pd, i)                     // labels and crossing order are kept, so L stays valid
  if (simplify(pd).status == 'unknot') reach('untied')
}
```
`simplify` says `'unknot'` only when it reaches 0 crossings, and `'minimal'` only for a reduced alternating diagram, which is a proof. Otherwise it says `'unknown'`. A lesson must never print "knotted" for `'unknown'`.

**"Is this trefoil tricolourable?"** (§2.2)
```js
import { knot, arcs, colouringOk, colourings, draw } from '@/kit/knots'
const pd = knot('trefoil').pd, A = arcs(pd)      // A.edges[k] = edge labels of arc k → colour those paths
const col = Array(A.count).fill(0)               // tap an arc: col[k] = (col[k] + 1) % 3
const ok = colouringOk(pd, col)                  // per crossing: all same or all different?
const proof = colourings(knot('figure-eight').pd, 3) == 3   // only the 3 one-colour ones: 4_1 is not tricolourable
```

**"Wiggle it all you like"** (an invariant survives moves; §2.8): `moves(pd)` gives highlightable sites, `apply(pd, m)` applies one, `pstr(jones(pd))` stays the same, then `crossingChange` changes it.

**"Cut one Borromean ring"** (§2.3): `deleteComponent(knot('borromean').pd, k)`, then `simplify(...).status == 'unlink'`, and `linkingNumber(knot('whitehead').pd) == 0`.

**"Left or right?"** (§2.4): compare `pstr(jones(pd))` with `pstr(pinv(jones(pd)))`. `turnOver(pd)` versus `mirror(pd)`: only the mirror changes the readout (for the trefoil).

**"Is it the unknot?" game**: `randomKnot(seed)`, `scramble([], seed, 20)` (an unknot in disguise; disclose that the seed was chosen), and `identify(pd)`.

## Size budget (measured with node's zlib, `node src/lab/knots/size.mjs`)

| A lesson that imports… | real cost (unused exports dropped, minified, gzip) | module closure, raw source, gzip |
|---|---|---|
| a table knot + `draw` | **4.3 KB** | 5.9 KB |
| tap crossings to unknot (`layout`, `draw`, `crossingChange`, `simplify`) | **5.7 KB** | 7.7 KB |
| tricolourable trefoil (`arcs`, `colouringOk`, `colourings`, `draw`) | **4.9 KB** | 10.8 KB |
| moves keep Jones (`moves`, `apply`, `jones`, `pstr`, `draw`) | **5.4 KB** | 10.8 KB |
| linking numbers (`linkingNumber`, `signs`, `deleteComponent`, `draw`) | **4.5 KB** | 5.9 KB |
| random knot game (`randomKnot`, `simplify`, `identify`, `draw`) | **7.3 KB** | 12.6 KB |
| everything (`index.mjs`) | 9.8 KB | 12.7 KB |

The "real cost" column is estimated by joining the modules, exporting only the names used, and minifying with the terser that ships inside Next.js. This is a dev-time measurement only. Every typical lesson is within the **≤ 10 KB** lesson budget. The comments were moved from the source into `index.d.ts`, to keep the raw size down.

## Not supported (yet)
- Animated transitions between diagrams after a move (§3 item 4). A move re-lays the diagram out. A lesson that wants continuity must keep its own layout for crossing changes, which keep the geometry.
- Multivariable Alexander, HOMFLY-PT, Khovanov, hyperbolic invariants. The Jones state sum is exponential: about 3 ms at 10 crossings, but impractical past about 22 after `reduce`.
- `toBraid` (Vogel's algorithm). DT codes for links. Unsigned Gauss/DT codes of composite knots are realised up to mirroring of each summand (granny and square have the same unsigned code).
- A complete unknot recogniser. `simplify` is a seeded heuristic: it solves the monster unknot, but leaves Haken's Gordian unknot at 117 of its 141 crossings.
- A self-avoidance check for dragging strands (§3 item 13). Unknotting numbers in the table are from memory (KnotInfo values), and the tests check only u(3_1) = 1.
- A planar-isotopy "redraw" animation, CSS-variable styling (the lesson does it: paths carry `component` and `label`), and composites beyond granny and square.

### Research note requirements (company/research/notes/2026-10-13-teachable-knot-theory.md)
| # | Requirement | Status |
|---|---|---|
| 1 | Links and composites in the table, plus 10_8 | done (Hopf, Whitehead, Borromean, granny, square, 10_8). The Solomon link (L4a1) is deferred. |
| 2 | Hard unknots: never "knotted" from being stuck | done: `simplify` goes up first, and reports `'unknown'`, never "knotted". A Goeritz diagram is deferred: arXiv (Gauss codes in 2104.14076) was unreachable. The monster unknot stands in for it. |
| 3 | Turn over versus mirror; connected sum; delete a component | done |
| 4 | Seeded random 3-D curves, closure, projection | done (direct and radial closure). Confinement to a ball is done; a box is not. |
| 5 | Simplify before Jones | done (`jones` runs `reduce` first) |
| 6 | Fixed, documented conventions, tested | done (see Conventions; tests pin the right trefoil and the positive Hopf link) |
| — | Animate transitions; Solomon link; amphichirality for links; identification beyond 7 crossings | deferred |

## Evolution (company/rnd/evolution.md)
This is **generation 0**. The source is the parent of `candidates/gen0-baseline/`. The evaluator is `test/`
(imports only `../index.mjs`; reference values in `test/published.mjs`), `bench.mjs` (inputs generated
at bench time) and `evolve.json`. The R&D lead owns all three from now on.

**Baseline score: 10,415.83** on the evaluator fixed by the R&D lead on 2026-10-14 (it was 0, gated out, under the
first evaluator's whole-library raw size gate). The evaluator, its size gate (per lesson, `test/lessons/`), the
bench (inputs generated at bench time from `EVOLVE_SEED` by `test/benchgen.mjs`) and the reasons are in
[company/rnd/evolution/knots-gen0.md](../../../company/rnd/evolution/knots-gen0.md). Generation 1 targets layout:
[knots-gen1-brief.md](../../../company/rnd/evolution/knots-gen1-brief.md).

**The three weakest areas**, where a generation of competing variants would help most:
1. **Layout of arbitrary diagrams.** Circle packing gives textbook pictures for the reduced table knots. But 40 of 70 random and scrambled diagrams fall back to the Tutte embedding: planar but cramped, with strands bunched near the outer circle (`layoutSpacing` 6.4). The Hopf link is drawn as a thin lens. Ideas: handle kinks and bigons in the packing (subdivide), hyperbolic maximal packing, planarity-preserving force relaxation (PrEd / ImPrEd), orthogonal layouts (Tamassia), and choosing the outer face by score.
2. **Simplifying hard unknots.** The scrambled hard set is too easy (100 %). Only the Gordian unknot discriminates (17 % of its crossings removed). Ideas: tangle-aware search, simulated annealing over R2/R3 with a crossing budget, a breadth-first beam, and moves as in Juhász et al. (2024). The lead should add the "really hard" diagrams from that dataset when egress allows.
3. **Jones speed and range.** A plain 2ⁿ state sum is fast enough to 10 crossings (about 360 per second), but random curves from §2.6 reach 30 to 50 crossings before `reduce`. Ideas: a tangle-by-tangle bracket (planar-diagram contraction ordering) or Temperley-Lieb transfer, with memoisation on the boundary state.

## Lesson ideas for the math category manager (cm-math)
Ranked by the research note. Each idea uses only what exists now.
1. **The unknot in disguise.** `scramble([], seed)` gives a 6-crossing loop. The learner taps highlighted R1/R2/R3 sites from `moves()` until it is a circle. Predict: knotted or not?
2. **Three colours prove it.** Tap arcs to colour the trefoil (`arcs`, `colouringOk`). Then try the figure-eight and fail; the reveal says `colourings(…, 3) == 3` checked all 81.
3. **Cut one ring.** Borromean rings: predict how many stay linked after one cut (`deleteComponent`, `simplify` → `'unlink'`). A Whitehead follow-up: linking number 0, still linked.
4. **Left or right?** Mirror the trefoil, and turn it over. The Jones readout changes only under the mirror; the figure-eight's never changes.
5. **The crossings you see are not the crossing number.** A 9-crossing scrambled 5_2: `simplify` gets it to 5, and `status == 'minimal'` proves 5 is the floor.
6. **One switch unties it.** The trefoil and `crossingChange` (u = 1). The 10_8 story is for the reveal only (its minimal diagram needs 3 switches; u = 2).
7. **A fingerprint that survives wiggles.** Random moves leave `jones` fixed, and a switch changes it.
8. **Long cords knot themselves** (Life Hacks link). `randomWalk` → `closeCurve` → `project` → `identify`, with a length slider. Knotting rises with length; the claims cite Raymer & Smith.
