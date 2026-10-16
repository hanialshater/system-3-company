# src/kit/knots: knot theory for 60-second lessons

Status: **kit** since 2026-10-14 (EDD-004, engineering review
`company/rituals/records/2026-10-14-eng-review-EDD-004.md`). The layout is **`fix1-bigon`** since 2026-10-14 (EDD-004
Addendum A; it was `gen2-force-smooth`). This is the shipped copy.
`src/lab/knots` remains the R&D evaluator, bench and provenance record. Plain ESM JavaScript, no dependencies.
Types and API documentation are in `index.d.ts`.

The full API tour, conventions (handedness, Jones, Alexander, signature, DT codes) and lesson examples are in the lab README:
`src/lab/knots/README.md`, sections "What it does", "Conventions" and "Examples for lessons". They apply unchanged here,
with these differences:
- **No `U10` / `monster-unknot`.** `knot('monster-unknot')` returns `undefined`. The hard unknot stays in the lab bench.
- `table.mjs` is the **derived table**: a copy of `src/lab/knots/provenance/table.derived.mjs`, with only the import
  path changed to `'./core.mjs'`. Every code is derived by our own code from a short, cited notation typed in by hand
  (see `src/lab/knots/provenance/README.md`). Do not edit `table.mjs` by hand. To change it, edit `sources.mjs` in the lab,
  run `node src/lab/knots/provenance/derive.mjs --write`, then copy the file again:
  `sed "s#'../core.mjs'#'./core.mjs'#" src/lab/knots/provenance/table.derived.mjs > src/kit/knots/table.mjs`.

Prior art and licences: `src/lab/knots/PRIOR-ART.md`. No code was copied from any source. The test reference values in
`test/published.mjs` were computed by GPL programs used only as offline oracles; they are mathematical facts, not copied files.

## How to import (enforced by typecheck)

```ts
import { knot, layout, draw, crossingChange, simplify } from '@/kit/knots'
```

Import only from `@/kit/knots`. TypeScript reads `index.d.ts` (the repo has `allowJs: false`), and the bundler loads
`index.mjs`. A deep import such as `@/kit/knots/draw.mjs` has no types and fails `npm run typecheck` (TS7016).
Unused exports are tree-shaken by the build.

## Rules for lessons (EDD-004; the engineering review record has the reasons)

1. **Compute `layout` once and reuse it.** Do it on mount or when the seed changes (for example in `useMemo`), never per
   frame and never per tap. Draw taps with `draw(pd, { layout: L })`, which takes about 0.1 ms. `crossingChange` keeps
   labels, so the stored layout stays valid.
2. **Import blocks on `draw` / `layout`.** These are active until lifted in writing in the EDD or the review record:
   - **(a) Extra crossings.** No lesson may draw arbitrary diagrams. That means `randomKnot` output (the random-knot
     game, as the VP ruled), any diagram that has been through `scramble`, `simplify`, `randomMove` or `apply`, and any
     diagram from `project`. The block lifts when the follow-up fixes the defect, or when the library exports a planarity
     check and the lesson uses it to redraw a bad result.
     **Scope (W-407, 2026-10-16; [EDD-011](../../../company/engineering/edd/EDD-011-knots-extra-crossings.md) Part 1,
     proposed, for the principal engineer to confirm):** block (a) does not cover *table-knot pictures*: a one-component
     `KNOTS` entry drawn with the default or its stored layout, its `mirror`, or the entry after any `crossingChange`s
     drawn with its stored layout. All of them draw with 0 extra crossings (test "table knots stay clean when mirrored or
     after crossing changes on the stored layout" in `test/draw.test.mjs`). Every other picture stays inside block (a).
     Blocks (b), (c) and the design limits below still apply to table-knot pictures.
   - **(b) Flattened bigons.** No lesson may draw **3_1 or 4_1** with the default layout (tricolour-check, unknot-game).
     *Status 2026-10-14:* the library fix has shipped (fix1-bigon: 3_1 bigon width 23.5, 4_1 17.0, both above the
     design floors of 20 and 15; `company/rnd/evolution/knots-fix1.md`), and the design lead accepted those pictures in
     writing (`company/design/reviews/2026-10-14-knot-pictures.md` §1b). **The block is still active.** It lifts per
     lesson, in writing in that lesson's design review:
     - tricolour-check: after cm-math-discrete is consulted on the fix1-bigon trefoil **and** the design lead reviews
       the lesson's contact sheet at phone size;
     - unknot-game: after the design lead reviews the lesson's contact sheet at phone size.
     Any change to `draw.mjs` that takes 3_1 below 20 or 4_1 below 15 (view box 100) goes back to the design lead.
   - **(c) Links.** Link drawing is not supported. No lesson may `draw` L2a1, L5a1, L6a4 or any multi-component
     diagram. Link invariants (`linkingNumber`, `jones`, …) are fine.
   - Not blocked: drawing other table knots, for example draw-a-table-knot with 5_2. The design lead accepted the kit's
     5_2 in both versions and prefers fix1-bigon's 6_1 (design ruling 2). Limits from that ruling:
     - **6_3 is not cleared** for any lesson picture (its narrowest face is 2.7 under fix1-bigon, 4.7 before). A lesson
       that wants it goes to the design lead with its contact sheet. Knots other than 5_2, 6_1 and 6_2 need the same.
     - random-knot pictures need their own design look before block (a) lifts (random diagrams' narrowest faces got
       thinner in the low tail under fix1-bigon).
3. **Diagrams over 12 crossings** (from `project`, or after up-moves): measure draw time at phone-class CPU before you
   ship. 9 to 19 crossings take up to 64 ms on the reference desktop, which could be several hundred ms on a phone.
4. `simplify(...).status == 'unknown'` must never be shown as "knotted".

## Tests

`npm run test:kit` runs `node --test src/kit/knots/test/*.test.mjs`. It is part of `npm run verify`. There are 98 tests:
the lab's codes, invariants, moves, draw (including the crossing-change test and, since 2026-10-16, the block (a)
scope test) and lesson-entry tests without U10, plus `types.test.mjs`, which keeps `index.d.ts` and `index.mjs` in step.

## Changing this library

This is kit code, so the engineering tiers apply (company/engineering/README.md):
- **Tier 1:** an added export (also add it to `index.d.ts`), a bug fix that keeps results the same, or a table refresh
  through the derive route above.
- **Tier 2 (EDD and engineering review):**
  - removing or renaming an export;
  - changing what a function returns for existing input, including the `layout` data shape and the drawings of table entries;
  - anything that pushes a lesson-entry size over budget.
- A drawing change that is a declared follow-up of a defect in EDD-004 may be designed and reviewed as an **addendum to
  EDD-004** instead of a new EDD (precedent: Addendum A). It is still tier 2: re-score with N declared, widths or other
  measures on the kit table, the design lead's written acceptance of the pictures, and the principal engineer's review.

## Changelog

- 2026-10-16, **W-407 close-out** (tests and docs only; library code and `table.mjs` unchanged). Added the block (a)
  scope test to `test/draw.test.mjs` (98 tests) and the scope paragraph under rule 2(a) (EDD-011 Part 1). Re-checked
  C1: `derive.mjs --write` reproduces `table.derived.mjs` byte for byte, and `table.mjs` equals it after the `sed`.
  Change note: `company/engineering/reviews/2026-10-16-knots-w407-change.md`.
- 2026-10-14, **draw: gen2-force-smooth → fix1-bigon** (EDD-004 Addendum A, tier 2). `draw.mjs` copied byte-identical
  from `src/lab/knots/candidates/fix1-bigon/`; one doc comment in `index.d.ts`. API and `layout` shape unchanged.
  Pictures change for every table entry: bigons open into lenses (minimum width/chord 0.10 → 0.28 over prime table
  knots). +213 to +218 B per lesson entry, `layout` about 5–10 % slower. 6_3's narrowest face 4.7 → 2.7.
- 2026-10-14, kit created from the lab (EDD-004).

**`package.json` has `"sideEffects": false`.** Without it, Turbopack bundles the whole library into every lesson that
imports anything from the barrel. A page importing `{ knot, draw }` measured 10,310 B gzip without the flag and 5,194 B
with it, against 10,717 B for a page that uses everything (scratch Next 16.4 build, 2026-10-14). So **no module here may
have an import-time side effect** outside itself.

Sizes on 2026-10-14 after fix1-bigon (stripped gzip of each lesson entry's module closure, measured on this folder):
random-knot 11,542 B (condition ≤ 11,776 B, gate 12,288 B), draw-a-table-knot 5,623 B, tricolour-check 9,904 B,
unknot-game 7,261 B, whole library 11,561 B.
