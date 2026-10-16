# EDD-011: Extra crossings in drawn knot diagrams (EDD-004 defect a, import block a)

author: rnd-lead (Bram) · reviewers: principal-engineer + design-lead (random-knot pictures) · tier: 2 · status: **Part 1 approved with changes** (principal engineer, 2026-10-16: [re-read](../reviews/2026-10-16-knots-w407-reread.md); conditions in Part 1 below); Part 2 (the fix) is **paused** by the R&D Review of 2026-10-14 until a written brief needs it
date: 2026-10-16 · board: W-407 (remainder), W-857 · follows: [EDD-004](EDD-004-knots-kit.md) defect (a), [eng review](../../rituals/records/2026-10-14-eng-review-EDD-004.md) item 5 and "Follow-ups"

## Problem and why now

`draw` can show a crossing the diagram does not have where two strands' cubic control hulls overlap (EDD-004 defect a). That is a false picture, so the kit README's import block (a) forbids lessons from drawing "arbitrary diagrams". The engineering review asked for a follow-up EDD; the R&D Review (`company/rituals/records/2026-10-14-rnd-review.md`) paused it until a brief needs it.

Why now: the founder wants knot lessons shipping, and board W-407 ("conditions before any lesson imports `@/kit/knots`") listed this EDD as one of its parts. That made a block meant for random-knot read as a block on **every** knot lesson. It never was (the kit README says "Not blocked: drawing other table knots"), but nothing pinned down which pictures are safe, and nothing tested it beyond the raw table entries. This EDD does that (Part 1), and records the fix design so the random-knot brief can restart it without new research (Part 2).

## Goals / non-goals

- Goal 1: a precise, tested line between pictures that are outside block (a) and pictures that are inside it.
- Goal 2: a costed design for lifting block (a) for random-knot, ready to run when a brief asks.
- Non-goals: blocks (b) (3_1/4_1 bigons, lifted per lesson at design review) and (c) (links), the 6_3 design limit, and draw time (C4). None of them changes here.

## Current state (with measurements)

- Raw table entries: 0 extra crossings on every `KNOTS` entry (`test/draw.test.mjs`, "table knots draw cleanly", since gen 0).
- Random and moved diagrams (EDD-004 defect a): `randomKnot` defaults 0/10,000; the bench's disguised braid closures 25/1,000 (2.5 %); projected random polygons 9/1,000 (0.9 %).
- **New, 2026-10-16 (this EDD):** every one-component `KNOTS` entry (0_1 … 7_7, 10_8, granny, square), drawn (1) with its stored `layout`, (2) as its `mirror` with the default layout, (3) after each single `crossingChange` on the stored layout, and (4) after cumulative crossing changes 0..c on the stored layout: **0 extra crossings in all cases**, handedness correct at every crossing. Probe: 301 pictures over all 21 entries; the only non-zero results were 7 pictures of the link L6a4 after crossing changes (2 extra each), which block (c) already forbids. Now a test in both the kit and the lab: "table knots stay clean when mirrored or after crossing changes on the stored layout (outside block (a))" (`src/kit/knots/test/draw.test.mjs`, `src/lab/knots/test/draw.test.mjs`).

## Part 1: scope of block (a) (approved with changes 2026-10-16; no code change in the library)

**Ruling ([re-read](../reviews/2026-10-16-knots-w407-reread.md)).** Approved, with the safe set tightened so that it matches what was measured. The pictures below are outside block (a) only when (i) the layout is the diagram's default or `layout(pd)` with **default `relax`** from the current kit (computed at run time, or frozen and pinned by a test to equal it), and a crossing-changed diagram uses the stored layout of the entry or mirror it came from; and (ii) `draw` is called with the **default `size` and `margin`**, or `margin = 0.08 × size`, with scaling and padding done by the SVG `viewBox` or CSS. Reason: `margin` is absolute, and handles are clamped to the view box, so the margin/size ratio changes the picture's shape. `draw(knot('4_1').pd, { size: 360 })` shows 1 extra crossing, and 6_3 at size 360 / margin 8 shows 2; `relax: 0` shows 1 on 3_1 and 4_1 (re-read F2). "Any sequence" of crossing changes is confirmed for every subset, by code reading and an exhaustive probe (F1), and it also holds for the mirror with its own layout. `turnOver` pictures are not in the set (F4).

**Outside block (a)** ("table-knot pictures"): a lesson that draws only
1. a one-component entry of `KNOTS` (`knot(name).pd`), with the default layout or its own stored `layout`;
2. the `mirror` of such an entry;
3. such an entry after any sequence of `crossingChange`s, drawn with the entry's stored layout (`draw(q, { layout: L })`, kit README rule 1). This is the unknot-game and tricolour-check pattern.

**Inside block (a)** (unchanged): every picture not in 1–3. For example anything from `randomKnot`, `scramble`, `simplify`, `randomMove`, `apply`, `addKink`, `addBigon`, `reduce`, `project`, `fromDT`/`fromGauss`/`fromBraid` on a code that is not a table entry, `connectedSum` of entries other than the tabled granny and square, and any of the above re-drawn with a fresh `layout`.

Blocks (b) and (c), the 6_3 limit and the "other knots go to the design lead" limits still apply to table-knot pictures: Part 1 only says that block (a) is not what stops them. Enforcement stays by review (eng review item 5); the new test is the evidence a reviewer cites.

## Part 2: lifting block (a) for random-knot (paused)

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing: block stays, random-knot is not built | 0 | none to learners; the random-knot idea stays unbuilt | n/a |
| Narrow the block to raw `randomKnot` output (0/10,000) | 0 code | the game shows diagrams after moves (2.5 %); already rejected (eng review item 5, R&D Review objection 2) | trivial |
| **A. Export a planarity check** `extraCrossings(drawing) → number` (the bench counter, already written and tested) and have the lesson redraw or reject a bad picture | small: one tier-1 additive export plus `index.d.ts`; paid only by lessons that import it (sideEffects false) | the lesson must handle the rare reject (pick another seed or another move); a learner never sees a false picture if it does | remove the export |
| B. Repair hull overlaps inside `draw` (an evolution generation on the layout) | one generation plus a re-score and a design look; changes table drawings, so tier 2 again | could move bigon widths below the design floors (3_1 ≥ 20, 4_1 ≥ 15) | revert the draw copy |

**Proposal:** A, when a written random-knot brief exists (the restart trigger of the R&D Review). B only if A's reject rate is too high for the game in a measured run.

Measurements that will show A worked (committed before implementation):
- pictures shown with an extra crossing, random-knot game settings plus up to 12 moves, 1,000 seeds: from 2.5 % (bench disguised closures, the nearest measured proxy) to **0 shown** (rejects counted separately); `node` script in `company/rnd/evolution/`, to be written with the implementation.
- reject rate at those settings: report it; if over 5 %, consider B.
- random-knot lesson entry ≤ 11,776 B gzip (EDD-004 condition), measured with `src/lab/knots/size.mjs`.
- would_be_wrong_if: the counter misses an extra crossing a person can see on a phone-size render (check 20 rejected and 20 accepted pictures by eye with the design lead), or the check costs more than 1 ms per picture at phone class.

## Operational readiness

Part 1 changes tests and documentation only: no runtime code, no route, no data, no new capacity. Record: `company/engineering/readiness/2026-10-16-knots-w407.md`. Part 2 will need its own section here when it restarts.

## Rollout and rollback

- Part 1: lands with the W-407 change (`company/engineering/reviews/2026-10-16-knots-w407-change.md`). Roll back by reverting the kit README paragraph and the test; nothing else depends on it.
- Part 2: not started.

## Open questions and objections

- **"Part 1 lets lessons draw knots that block (a) was meant to stop."** No: Part 1 covers only pictures that were never in block (a)'s reasons (EDD-004 defect a names `randomKnot` and moved diagrams); it adds a test that shows each such picture is clean. Raised by me as a self-check. **Answered by the principal engineer (re-read, Decision):** holds for the stated set, which is now tightened by conditions (i) and (ii).
- **Crossing changes on a stored layout of a link (L6a4) show 2 extra crossings.** Not a lesson risk while block (c) holds. Whoever lifts block (c) must add links to the new test (owner: rnd-lead, only if a brief needs links).
- **Should Part 2 start now, since the founder wants knot lessons?** No brief needs random-knot yet (W-146 has none). Starting it would spend R&D budget against the R&D Review's pause; that is for the portfolio forum and vp-rnd, not this EDD.
