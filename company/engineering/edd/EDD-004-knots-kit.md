# EDD-004: Promote the knots library (gen2-force-smooth) from src/lab/knots to the kit

author: rnd-lead (Bram) · reviewers: principal-engineer (required; owns where it lives in `src/kit`) + design-lead (bigon block) · tier: 2 · status: proposed · date: 2026-10-14 · board: W-162 (data provenance: W-145)

Sources: [knots-gen2.md](../../rnd/evolution/knots-gen2.md) (gen-2 record, **VP ruling**, and "Promotion re-score") · [provenance/README.md](../../../src/lab/knots/provenance/README.md) (W-145) · [evolution.md](../../rnd/evolution.md) · archive `company/rnd/evolution/knots.jsonl` (seeds 1592665369, 270539191, 16841215).

## Problem and why now

Knot-theory lessons (math discrete strand) need a tested library for diagrams: invariants, moves, and a picture that stays put while the learner taps crossings. The library is in `src/lab/knots`, and lessons may not import `src/lab`. The layout evolution is **closed** after gen 2 (VP ruling §2). The ruling selects `gen2-force-smooth` and attaches conditions (§3). Two of them are done and recorded in knots-gen2.md, "Promotion re-score": the crossing-change test, and a re-score on 103 tests. `node tools/evolve.mjs promote knots gen2-force-smooth` has run. That command copies into `src/lab/knots` only, not into the kit. **What remains is the tier-2 move into `src/kit`, which this EDD proposes.**

Why now: the champion before it (`gen1-force`, and gen 0) draws the wrong picture after the first `crossingChange` on a stored layout. That is exactly what the unknot-game lesson does. Promotion is how that fix reaches lessons.

## Goals / non-goals

Goals
- One importable module, `@/kit/knots`, with the lab API unchanged, no dependencies, and a size inside the lesson budget.
- Every table code in the kit has a provenance we can state: derived by our own code from cited, hand-typed notation.
- Every known defect is listed with what a learner would see, an owner, and the lessons it blocks.

Non-goals
- No change to `src/kit/Lesson.tsx`, the lesson contract, or any protected path.
- No new layout work (evolution closed). Fixes are follow-ups, listed below.
- No lesson is built or changed here. **The import blocks below restrict which lessons may import `layout`/`draw` after promotion.**

## Current state (with measurements)

All measured on 2026-10-14 in this checkout (Node v22.22.0, Intel Xeon 2.10 GHz, 4 cores, shared machine; load stated per figure).

**Re-score on the promotion evaluator** (103 tests; N = 3 declared before the first run; every run counts):

| run | seed | load (1-min, before → after) | gen2-force-smooth | gen1-force | gen2-ortho-force | gen2-ortho-round |
|---|---|---|---|---|---|---|
| 1 | 1592665369 | 14.88 → 13.53 | 10,651.50 (103/103) | 0 (102/103) | 0 (102/103) | 0 (102/103) |
| 2 | 270539191 | 13.53 → 12.66 | 10,667.62 (103/103) | 0 (102/103) | 0 (102/103) | 0 (102/103) |
| 3 | 16841215 | 12.66 → 12.00 | 10,665.65 (103/103) | 0 (102/103) | 0 (102/103) | 0 (102/103) |

The VP's prediction held: force-smooth is the only candidate that passes. gen1-force fails the new test on 3_1. ortho-force and ortho-round fail it on L2a1.

**Sizes** (stripped gzip of each lesson entry's real module closure, `node tools/evolve.mjs size`; lesson gate 12,288 B, VP condition random-knot ≤ 11,776 B):

| lesson entry (`src/lab/knots/test/lessons/`) | lab now (SnapPy table + U10) | **kit as proposed (derived table, no U10)** | under gate | under condition |
|---|---|---|---|---|
| draw-a-table-knot (`knot`, `draw`) | 5,459 | **5,408** | 6,880 | — |
| tricolour-check | 9,739 | **9,684** | 2,604 | — |
| unknot-game | 7,095 | **7,042** | 5,246 | — |
| **random-knot** | **11,377** (the ruling's figure: 911 under the gate, 399 under the condition) | **11,323** | **965** | **453** |
| whole library | 11,391 | 11,338 | (budget 16,384) | |
| mean lesson | 8,418 | 8,364 | | |

The R&D README's target ("≤ 10 KB gzipped for a typical lesson") holds for the mean and for 3 of the 4 entries. random-knot is over it by about 1.3 KB, because it also needs `simplify` and `identify`.

## Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| **A. Move force-smooth to `src/kit/knots`, with the derived table and without U10 (proposed)** | 1 session (platform engineer); mostly file moves | the defects below, held back by import blocks; the `.mjs`-in-TS question (open question 1) | full: lessons import nothing yet; delete the folder |
| B. Move the champion `gen1-force` instead | same | **fails the crossing-change test**: wrong picture after the first tap in unknot-game; random-knot 12,095 B breaks the VP's size condition | full |
| C. Move `gen2-ortho-force` (better small table knots, readable Hopf link) | same | fails the crossing-change test on links; the wiggle on random diagrams is not fixed; 158 B bigger. Rejected by the VP ruling §1 | full |
| D. Wait for the follow-up fixes (bigons, extra crossings), then move | delays every knot lesson | holds the correctness fix hostage (VP ruling §4) | — |
| E. Do nothing | none | no knot lessons; the lab keeps the only copy | — |

**Selection basis, as ruled by the VP (§1): a score tie, decided outside the score.** On gen 2's evaluator, force-smooth's median score beat ortho-force's by 3.3. The paired difference, ortho-force − force-smooth, was +18.13 / −3.33 / +0.37 / −11.99 / +15.09 (median +0.37), which is inside the ±15 noise floor. So the score does not separate the two. force-smooth is selected on evidence outside the score:
1. It is the only candidate that keeps a stored picture across `crossingChange`, a briefed API requirement. The re-score above confirms this.
2. It meets the generation's stated target: no wiggle on arbitrary diagrams.
3. It is 158 B smaller on every entry.

The stop rule failed (median gain +12.32 < T = 15), so there is no gen 3.

## Proposal

### What moves where (location to be decided by the principal engineer, VP ruling §3.5)

Proposed: `src/kit/knots/`, holding:

| from `src/lab/knots/` | to `src/kit/knots/` | note |
|---|---|---|
| `core.mjs codes.mjs moves.mjs invariants.mjs poly.mjs random.mjs rng.mjs identify.mjs draw.mjs index.mjs index.d.ts` | same names | byte-identical to the lab after `promote` (draw.mjs and index.d.ts are force-smooth's) |
| `provenance/table.derived.mjs` | **`table.mjs`** | import path `'../core.mjs'` → `'./core.mjs'`, nothing else. **Not** the lab's `table.mjs`, which holds the SnapPy-derived codes |
| `README.md` | `README.md` | the lab README, with status and import path updated |
| `test/{codes,invariants,moves,draw,lessons}.test.mjs`, `test/published.mjs` | `test/` | with the U10 edits below |
| `provenance/{sources,derive}.mjs`, `derive.test.mjs` | stay in the lab (the record), or go to `src/kit/knots/provenance/` if the kit should regenerate itself. Lessons do not need them | principal engineer's choice |
| stays lab-only | `bench.mjs`, `size.mjs`, `evolve.json`, `candidates/`, `test/bench*.mjs`, `test/benchdata.mjs` (holds `MONSTER`, i.e. U10, from Regina, GPL), `PRIOR-ART.md`, `NOTES.md` (force-smooth's design notes, copied in by `promote`) | |

**U10 stays lab-only.** It is not in `table.derived.mjs`, so `knot('monster-unknot')` returns `undefined` in the kit.

### API (unchanged from the lab; full types in `index.d.ts`)

- **Representations:** `load`, `toPD`, `toGauss`/`fromGauss`, `toDT`/`fromDT`, `fromBraid`.
- **Table:** `KNOTS`, `knot(nameOrAlias)`. Entries: 0_1, 3_1…7_7, 10_8, L2a1, L5a1, L6a4, granny, square.
- **Diagram data:** `crossingCount`, `components`, `signs`, `writhe`, `linkingMatrix`, `linkingNumber`, `isAlternating`, `nugatory`, `regions`, `arcs`.
- **Operations:** `crossingChange`, `mirror`, `turnOver`, `reverse`, `connectedSum`, `deleteComponent`.
- **Moves:** `moves`, `apply`, `addKink`, `addBigon`, `reduce`, `randomMove`, `scramble`, `simplify`.
- **Invariants:** `colourings`, `tricolourable`, `colouringOk`, `determinant`, `alexander`, `bracket`, `jones`, `signature`, plus the `poly` helpers.
- **Random and 3-D:** `mulberry32`, `randomKnot`, `randomWalk`, `closeCurve`, `project`.
- **Identification:** `identify`.
- **Drawing:** `layout(pd, {relax})` gives `{crossings, points, loops}`, plain data. `draw(pd, {size, margin, gap, layout})` gives one SVG path per edge plus crossing centres and signs.
  - **Changed in force-smooth:** `points` now holds 4 Bézier handles per crossing, indexed from the crossing's first incoming slot. **A layout stored from the lab's gen-0/1 code is not compatible.** No lesson stores one today.
  - The options `iters` and `tutte` are gone.

### Data provenance (W-145)

- **Resolution (R&D engineer's recommendation, adopted here): re-derive, don't cite.** No permissively licensed knot table was found: Spherogram, snappy_manifolds, Regina and the `database_knotinfo` package are all GPL. KnotInfo and the Knot Atlas could not be reached to check their terms.
- Every kit entry is derived by our own code (`fromDT`, `fromBraid`, a 4-plat from Conway notation) from one short, cited standard notation, typed in by hand. `iso()` proves each derived diagram is the table's diagram, relabelled. Crossing number, writhe, Alexander and Jones are equal for all 19 entries. The provenance tests pass (`node --test src/lab/knots/provenance/*.test.mjs`, 7/7, re-run after promote).
- The swap test was re-run with the promoted code: derived table plus `MONSTER` substituted for U10 in 3 test files gives 102/102. The 103rd lab test, "U10: invariants survive 12 random Reidemeister moves", is generated per `KNOTS` entry and leaves with the entry.
- **Drawings: 2 of 19 change under force-smooth.** The provenance README's "drawings do not change" was measured with gen 0's layout. With force-smooth, `derive.mjs` reports **5_2 and 6_1 drawing differently** ("differs (1.02)"; all others ≤ 0.009). force-smooth's output depends on edge labelling.
  - I looked at both: the same diamond with a bigon, arranged differently. Both are readable. See `company/rnd/evolution/knots-gen2-looks/kit-derived-table--{5_2,6_1,3_1,4_1}.svg`.
  - **The VP judged draw-a-table-knot's 5_2 as readable on the lab-labelled picture. The kit draws the other one.** I judge it equally readable. The design lead should see it before draw-a-table-knot ships.
- **For the principal engineer to rule: the 10_8 note.**
  - 10_8's DT code (6 14 12 16 18 20 4 2 8 10) was **read from the `database_knotinfo` 2026.10.5 snapshot**, a GPL-labelled packaging of KnotInfo. It is cited to KnotInfo, used as one 10-number fact, and the file was not copied or committed. The engineer's remembered code was wrong.
  - Every other entry was typed from memory and only *cross-checked* against that snapshot.
  - **A cleaner alternative now exists:** 10_8 is 2-bridge, and its Conway notation **5 1 4** (Conway 1970; Rolfsen App. C), run through the same 4-plat as 7_5, with `w −2, rev [0]`, gives **the same diagram** as the current entry (`iso`: same, component 0 reversed, as the DT route also needs). Alexander and Jones are equal. Checked in scratch on 2026-10-14; `sources.mjs` is not changed.
  - **Options:**
    - (a) accept the DT code as a cited fact;
    - (b) switch 10_8 to `conway: [5, 1, 4]` and regenerate (one line in `sources.mjs`, then `derive.mjs --write`; the rnd-lead can do it on the ruling);
    - (c) drop 10_8 from the kit. It is there for unknotting number u = 2; no planned lesson draws it.
  - My recommendation is (b).
- Optional, as the provenance README suggests: a decision record that short notations of individual knots are cited facts, so the next table extension follows the same route.
- Lab follow-up (rnd-lead): `test/benchdata.mjs`'s `KNOTS` holds 3_1 and 4_1 PD codes copied from the SnapPy table. They are lab-only bench data, not shipped. Swapping them is an evaluator change, so it waits until the knots evaluator next changes.

### Known defects, by what a learner would see

| # | Defect | What a learner sees | Measured | Lessons blocked (import block) | Owner of the fix |
|---|---|---|---|---|---|
| a | **Extra crossings** where cubic control hulls overlap | **A false picture:** a crossing the diagram does not have | **At the random-knot lesson's settings (`randomKnot(seed)` defaults: 3 strands, length 10 → 10 crossings; `draw(pd)` defaults): 0 of 10,000 seeds (95 % upper bound 0.038 %).** Also 0/1,000 each for {3, 12}, {4, 14}, {3, 16}. But **25/1,000 (2.5 %) on the bench's disguised braid closures** (diagrams after moves; the champion: 0.6 %), and 9/1,000 (0.9 %) on projected random polygons (champion: 2.8 %). Bench: −3 on 1 of 3 re-score seeds, −4 on 1 of 5 gen-2 seeds. Method: the bench's `layoutExtraCrossings` counter, copied verbatim. It reproduces the bench's −3 on seed 1592665369 exactly | **random-knot**, and any lesson that draws a diagram after `scramble`/`simplify`/`randomMove` or from `project`, until (1) the follow-up fixes it, or (2) the library exports a planarity check (e.g. `extraCrossings(drawing)`) that the lesson uses to detect a bad result and redraw it (VP ruling §4). *The 0/10,000 figure is evidence for the VP or principal engineer to consider narrowing the block to raw `randomKnot` diagrams. I am not lifting it.* | rnd-lead → one rnd-engineer (follow-up EDD; options: hull-overlap repair, or the exported check) |
| b | **Flattened bigons on 3_1 and 4_1** | Misleading, not false: each side of the trefoil reads as a doubled line, so the three arcs are hard to tell apart. Tricolour-check asks for exactly that | Seen in the gen-2 looks and again in the kit render (`kit-derived-table--3_1.svg`, identical drawing to the lab's, delta 0.000). The looks gate passes it (0 % straight, 0 % sharp). There is no width measure yet | **tricolour-check, unknot-game** (any lesson drawing 3_1 or 4_1 with the default layout), until (1) a follow-up fixes it, judged by a bigon-width / minimum-face-width check, or (2) the **design lead accepts the picture in writing**, with **cm-math-discrete** consulted on tricolour-check | rnd-lead → rnd-engineer (options: minimum bigon width in the forces; a stored layout shipped with table entries; size cap: random-knot ≤ 11,776 B) |
| c | **Hopf link draws as a flat lens** | Unreadable: the two components almost coincide | gen-2 looks (L2a1) | **Link drawing is not supported for lessons.** No lesson may draw L2a1, L5a1, L6a4 or any multi-component diagram with `draw` until a follow-up fixes and tests it. Link invariants (`linkingNumber`, `jones`, …) are fine | rnd-lead (only if a brief needs links) |
| d | **Slower than the champion, and slow under load** | A delay before the picture appears on a weak phone | **Unloaded (load 1.95–2.04), Node on a 2.1 GHz Xeon, median per `draw`:** 3_1 **1.2 ms** (first call 16–18 ms, cold JIT), 4_1 1.4 ms, 5_2 **1.5–2.3 ms**, `randomKnot(3)` **4.3–6.3 ms** (p95 ≤ 7.9 ms). Bench messy set (9–19 crossings), seed 243182556: mean 15.8 ms at load 1.65, against > 116 ms at load ≈ 35 (the −16.96 slow penalty). The champion is 10.0 ms on the same set, so force-smooth costs about 1.6× | none blocked by R&D. **Whether this is fine on a phone is the principal engineer's call** (VP ruling §4d). A mid-range phone is likely 3–5× slower than this CPU, which would put lesson diagrams at roughly 5–30 ms (up to about two 60 Hz frames), plus a cold first call of perhaps 50–90 ms. Estimated, not measured on a phone | principal-engineer (judgement); platform engineer (a phone measurement, if wanted) |
| e | 5_2 and 6_1 drawn differently from the picture the VP judged (labelling, above) | A different, equally readable picture | `derive.mjs`: delta 1.02 | none. Design lead to glance at `kit-derived-table--5_2.svg` before draw-a-table-knot ships | design-lead |

**draw-a-table-knot (5_2) is not blocked.**

**Enforcement.** The blocks are usage restrictions written here and in the kit README. Whether they become a mechanical check, for example `check` flagging an import of `draw` from `@/kit/knots` in a blocked slug, is for the evaluation steward and the principal engineer to decide (VP ruling §4).

### Tests

- **Lab (the evaluator, unchanged after promotion): 103 tests**, `node --test src/lab/knots/test/*.test.mjs`, all passing on the promoted lab source.
- They include the **crossing-change test** added at promotion. With the under-pass gap off, the drawing of a stored layout before and after any crossing change must be the same set of curves (Hausdorff ≤ 0.5 in a 100-unit box). It covers every `KNOTS` entry and `randomKnot(1..3)`, and asserts that L2a1 is in the case set.
- **Kit: 102 tests.** These are the lab's `codes`, `invariants`, `moves`, `draw` and `lessons` tests, with U10 removed:
  - `invariants.test.mjs`: drop `U10` from `REF` in `published.mjs` (2 tests).
  - `codes.test.mjs`: drop the `identify(knot('monster-unknot'))` assertion.
  - `moves.test.mjs`: drop the `simplify(knot('monster-unknot'))` assertion (keep `scramble([])` → unknot).
  - The per-entry move test for U10 disappears with the entry.
  - The lab keeps all U10 coverage against the same code (via the lab table). So the kit loses no coverage of the code, only of one data entry.
  - Swap test with `MONSTER` substituted: 102/102.
- The provenance tests (7) run where `provenance/` ends up.
- **How they run:** `npm run check` and `npm run verify` do not run `node --test` today. The principal engineer decides whether kit tests join `verify` (about 20 s).

## Measurements that will show it worked (committed before implementation)

| metric | now | target | command |
|---|---|---|---|
| kit tests | 102/102 in a scratch copy | 102/102 in `src/kit/knots` | `node --test src/kit/knots/test/*.test.mjs` |
| random-knot entry size | 11,323 B (scratch) | ≤ 11,776 B | `evolve.mjs size`, or the same measure on the kit copy |
| kit `table.mjs` = derived | — | byte-identical to `provenance/table.derived.mjs` except the import path | `diff <(sed "s#'../core.mjs'#'./core.mjs'#" src/lab/knots/provenance/table.derived.mjs) src/kit/knots/table.mjs` |
| no U10 in the kit | — | `grep -c U10 src/kit/knots/table.mjs` = 0 (the comment line excepted) | grep |
| typecheck and build | — | `npm run verify` green with one scratch import of `@/kit/knots` | `npm run verify` |

- **would_be_wrong_if:**
  - a lesson imports `draw` under an active block;
  - a learner report or QA screenshot shows an extra crossing on a raw `randomKnot` diagram (the measured rate predicts fewer than 1 in 2,500);
  - the crossing-change test passes but unknot-game's picture moves after a tap (then the test is too weak).

## Rollout and rollback

1. The principal engineer reviews this EDD and rules on the location, open question 1, and the 10_8 note.
2. The platform engineer (or the rnd-lead, if the principal engineer prefers) makes the copy as specified, plus the kit README with the import blocks.
3. `npm run verify`.
4. The rnd-lead adds a pointer in `src/lab/knots/README.md`: the kit is the shipped copy, and the lab is the evaluator.

Rollback: delete `src/kit/knots`. No lesson imports it at first, and no stored data depends on it.

## Open questions and objections

1. **`.mjs` in a TypeScript kit (principal engineer).** `tsconfig.json` has `allowJs: false`, and every other kit module is `.ts`/`.tsx`. Plain `.mjs` with `index.d.ts` keeps the library dependency-free and lets `node --test` run it without a build step. But TypeScript resolves `@/kit/knots` to `index.d.ts` while the bundler loads `index.mjs`, a split that has to be verified with `npm run verify`.
   - The alternatives are converting to `.ts` (loses `node --test` without a loader) or `.js` + `allowJs`.
   - I have not touched `src/kit` to test this.
2. **Labelling-dependent drawings** (defect e). A stored layout per table entry, follow-up option (b) for the bigons, would also pin these pictures.
3. **Import-block narrowing for random-knot** (defect a). It is the VP's or principal engineer's call on the 0/10,000 evidence. My view: keep the block until the library exports a planarity check, because the lesson's "is it the unknot?" game is likely to show diagrams after moves, where the rate is 2.5 %.
4. **The previous objection, carried:** ortho-force draws better small table knots and a readable Hopf link (gen-2 record, Selection). It was answered by the VP's ruling (§1), and it is preserved as the parent for any future layout project.
5. **NOTES.md came along with `promote`** into `src/lab/knots/`. It is the candidate's design record for `draw.mjs`, kept in the lab and not moved to the kit.
