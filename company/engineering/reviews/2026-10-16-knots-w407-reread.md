# Engineering Review: 2026-10-16: knots W-407 close-out re-read and EDD-011 Part 1

owner: principal-engineer · tier: 2 (by path: `src/kit/**`; content is one test plus README text) · author: rnd-lead · base: `ccedbd97` (contains `82f7f04e`)

- EDD: [EDD-011](../edd/EDD-011-knots-extra-crossings.md) Part 1 · prior review: [EDD-004 eng review](../../rituals/records/2026-10-14-eng-review-EDD-004.md) · change note: [2026-10-16-knots-w407-change.md](2026-10-16-knots-w407-change.md) (read **after** the findings below were written) · readiness: [2026-10-16-knots-w407.md](../readiness/2026-10-16-knots-w407.md)
- [x] The problem is real and measured: W-407 read as a block on every knot lesson. Block (a)'s reasons (EDD-004 defect a) name only random and moved diagrams.
- [x] Options: Part 1 is a scoping ruling, not a design. Part 2 has four options, including doing nothing. Part 2 is paused and not ruled on here.
- [x] Blast radius: none today. No lesson imports `@/kit/knots` (`grep -r "@/kit/knots" src/demos src/app` is empty). The ruling decides what the first four knot briefs may draw.
- [ ] Readiness approved by principal-engineer-ops: **pending** (board W-1521). Tests and README text only, so it does not block this ruling, but the record must be approved before the change counts as merged tier 2.
- [x] Rollback is one revert (EDD-011 "Rollout and rollback").
- [~] `npm run verify`: not run (asked: `test:kit` and typecheck). `npm run test:kit` **98/98 pass** (9.1 s). `npm run typecheck` **pass** (registry up to date, `tsc --noEmit` clean).
- [x] Measurements: the scope claim is a measurement (the new test). I re-measured it independently, with more cases than the test covers (below).
- [x] Security, privacy, licences: no dependencies, routes or events change.

## What changed (read from the diff, before the author's note)

`git show 82f7f04e -- src/kit/knots`: `test/draw.test.mjs` gives `check()` an optional third argument, which it passes to `draw`. It adds one test, "table knots stay clean when mirrored or after crossing changes on the stored layout (outside block (a))". `README.md` gains the scope paragraph under rule 2(a), the test count goes 97 → 98, and there is a changelog line. No `*.mjs` module, `index.d.ts`, `package.json` or `table.mjs` byte changed. The lab's `test/draw.test.mjs` is byte-identical to the kit's.

## Findings (problems, not fixes)

Read from code, then measured with throwaway probes (scratch, not committed). The probes reuse the test's detector: Bezier sampling, strand-segment intersections more than 3 % of size from every diagram crossing. I also ran a denser variant (32 to 64 samples per cubic, same-edge self-intersections, and the minimum strand separation more than 6 % of size from crossings).

**Why the claim holds (code).** With `{ layout: L }`, `draw` takes every curve point from `L` (`draw.mjs`, `draw()`: `Q = Lay ?? layout(pd)`, handles via `at(M, d)`, which indexes from each crossing's first incoming strand). The over/under state only decides which end of an edge `cut()` shortens by the gap. Cutting removes curve and never adds it. `crossingChange` and `mirror` only flip `M.u` (`core.mjs:85-86`), and `layout` is deterministic with no RNG, so `draw(pd)` is `draw(pd, { layout: layout(pd) })` (checked: identical JSON for all 18 one-component entries). So for a fixed layout, every over/under assignment draws the same curve set up to the gaps, and "clean for one assignment" implies "clean for all", up to sampling.

- **F1 (minor; coverage, not a defect). The test checks single changes and prefixes 0..c, but the README and EDD say "any sequence".** Since `crossingChange` is an involution per crossing, "any sequence" means "any subset", which is 2^n per knot. I enumerated every subset for all 18 one-component entries (10_8: 1,024) at default options, at `gap: 0` and at `gap: 0.6`: **0 extra crossings**. The code argument above is what makes the 2^n claim safe without putting 2^n cases in the test. No change needed.
- **F2 (major for the scope wording). The safe set depends on `draw`'s `size`/`margin` ratio and on `layout`'s `relax`, and the scope as written does not fix them.** `margin` is absolute (default 8 at size 100), and handles that fall outside the view box are clamped onto its edge. So the picture's shape, not just its scale, changes with `margin / size`. Measured, stored layout, `gap: 0`, extra crossings / min strand separation in % of size:

  | knot | 100 / 8 (default) | 360 / 28.8 (same ratio) | 360 / 8 | 100 / 0 |
  |---|---|---|---|---|
  | 4_1 | 0 / 3.47 | 0 / 3.48 | 0 / 1.79 | 0 / 1.11 |
  | 6_3 | 0 / 1.24 | 0 / 1.23 | **2** / 0.27 | **2** / 0.15 |

  `draw(knot('4_1').pd, { size: 360 })` at the default gap: **1 extra crossing**, strands 0.74 % apart (default call: 0, 3.82 %). Same ratio means the same picture to rounding, so the default call scaled by the SVG `viewBox` is safe. `layout(pd, { relax: 0 })` gives 1 extra crossing on 3_1 and on 4_1. With `relax` 20 or 120, all 18 entries were clean, but only the default is in the test. Exhaustive probe totals: 14,046 pictures (18 entries × every crossing subset × five option sets, plus mirrors and relax variants). The only non-zero results are `relax: 0` (3_1, 4_1: 1 picture each), 4_1 at `size: 360` (8 of 16 subsets at margin 8, 16 of 16 at margin 0) and 6_3 at `size: 360` (48 of 64 at margin 8, 48 of 64 at margin 0). Default options, `gap: 0` and `gap: 0.6`: 0 of 2,329 pictures each. Mirror with its default layout, and mirror plus every subset on the mirror's own layout: 0 of 2,347. This matters now: briefs 2 to 4 discuss 4_1 "at 360 px" and ask builders to "pad the view box" (U1). Passing `size: 360` or a smaller `margin` is a natural way to do both, and it would put a false crossing on the figure-eight.
- **F3 (minor). The 3 % exclusion zone around each diagram crossing is blind to an extra crossing that close to a real one.** This is the same detector as the EDD-004 bench, so the evidence keeps its known limit. The design lead's contact-sheet review at phone size remains the human check, and blocks (b) and the design limits already require it for every knot picture.
- **F4 (note). `turnOver` is outside Part 1, so it stays inside block (a)**, although brief 4 says it is "not on the block list". Measured, default call: 3_1, 4_1, 5_2 and 6_1 turned over draw with 0 extras. That is evidence for a later addendum, not a ruling. Separately, for brief 4's builder and design lead: a CSS 3-D flip (`rotateY`) that shows the back of the SVG at the half-way point draws the **mirror** knot, not the turned-over one, because the gaps stay on the same strand while the plane reflects. That would be a false picture on the lesson's own question. Use `backface-visibility: hidden` and end on the original drawing, which is what the brief already prefers.
- **F5 (note). Mirror with its own default layout is not the entry's layout** (`layout(mirror(pd))` differs from `layout(pd)` for every entry except 0_1). Both are measured clean. Mirror on the **entry's** stored layout is the all-crossings subset, which F1 covers. Mirror plus crossing changes on the mirror's own layout: 0 extras over all subsets.

## Decision

**Approve EDD-011 Part 1 with changes.** The changes are made in this commit, in the EDD status and README rule 2(a).

Table-knot pictures are outside block (a) when all of these hold:
1. The diagram is a one-component `KNOTS` entry, its `mirror`, or the entry (or its mirror) after any set of `crossingChange`s.
2. It is drawn with that diagram's default layout, or with a layout computed by `layout(pd)` with **default `relax`** in the current kit. That means computed at run time, or frozen as a literal and pinned by a test to equal `layout(pd)`. A crossing-changed diagram uses the stored layout of the entry (or mirror) it came from.
3. `draw` is called with the **default `size` and `margin`**, or with `margin = 0.08 × size`. Scale and pad with the SVG `viewBox` or CSS, never with `size`/`margin` (F2). `gap` is free.

Everything else stays inside block (a): `turnOver` pictures (F4), non-default `relax`, other `margin/size` ratios, and everything EDD-011 already lists. Blocks (b) and (c), the 6_3 limit and the design-lead limits are unchanged.

**W-407 closure (author's ask 2).** Nothing in W-407 itself still stands before a lesson imports `@/kit/knots`. C3 (W-408, platform-engineer) and C4 (first `layout` lesson) remain from the EDD-004 review, and neither is rnd-lead's. W-407 can close when principal-engineer-ops approves readiness (W-1521).

**Kit test (author's ask 3).** Accepted as is: 98 tests, and the kit and lab `draw.test.mjs` stay identical. Follow-up, not a condition: add one ratio row, `{ size: 360, margin: 28.8 }`, to the scope test, so condition 3 has a test behind it and not only my probe (rnd-lead, tier 1, board).

### Briefs this unblocks (company/domains/briefs/math.discrete.md, "Knots, batch 1")

Block (a) no longer stops any of briefs 1 to 4. Each still has its other gates:
- **1 draw-a-table-knot** (5_2, 6_1, `draw(knot(n).pd)`, no override): unblocked on (a). Needs a normal contact sheet, plus C3/C4.
- **2 tricolour-check** (3_1, 4_1, default layout): unblocked on (a). Block (b) lifts at its design review. Condition 3 applies to the U1 padding: pad with the `viewBox`.
- **3 unknot-game** (3_1, 4_1, crossing changes on the stored layout): unblocked on (a), for every subset of switches (F1). Block (b) at design review. `simplify` for status only.
- **4 left-or-right** (3_1, 4_1, `mirror` with the stored layout): unblocked on (a) **for the mirror and crossing-change pictures only**. A drawn `turnOver(pd)` stays inside block (a) until an addendum covers it (F4). The brief's own fallback, a flip animation ending on the original drawing, needs no addendum, but see F4 on the back face. Block (b) at design review.
- Briefs 5, 7 and 8 stay held (they draw `scramble`/`apply` output: Part 2, W-1519). Brief 6 stays held on block (c).

Objections that travel with it:
- **"Part 1 lets lessons draw knots that block (a) was meant to stop"** (EDD-011, the author's self-check). Answered: no. Block (a)'s reason is hull overlap in diagrams the table never fixed. For the table entries, the curve set is independent of over/under state (code reading, above), and every reachable picture was measured clean. The objection does find something real, though: the "same picture" assumption fails under other `size`/`margin` ratios and `relax` (F2). Those are now excluded by condition, not left to chance.
- **The 2026-10-14 ruling against "narrowing the random-knot block"** (EDD-004 review item 5) is untouched. Part 1 does not narrow block (a) for any random or moved diagram.

## What I did (files)

- This record.
- `company/engineering/edd/EDD-011-knots-extra-crossings.md`: status line and Part 1 header updated to "approved with changes", with the three conditions.
- `src/kit/knots/README.md` rule 2(a): scope paragraph reworded from "proposed" to "approved with changes (this record)", with conditions 2 and 3 and the `turnOver` exclusion.
- Board: W-1533 (rnd-lead: add the ratio row to the scope test) and W-1534 (cm-math-discrete: brief 4 `turnOver` and back-face flip, brief U1 padding by `viewBox`).

## Kudos (optional)

- @rnd-lead: wrote the scope as a test, not a sentence, and flagged its own objection. That made the re-read a measurement rather than an argument.
