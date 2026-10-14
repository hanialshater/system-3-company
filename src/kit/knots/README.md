# src/kit/knots: knot theory for 60-second lessons

Status: **kit** since 2026-10-14 (EDD-004, engineering review
`company/rituals/records/2026-10-14-eng-review-EDD-004.md`). The layout is `gen2-force-smooth`. This is the shipped copy.
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
   - **(b) Flattened bigons.** No lesson may draw **3_1 or 4_1** with the default layout (tricolour-check, unknot-game)
     until the follow-up fixes it, or the design lead accepts the picture in writing (with cm-math-discrete consulted
     on tricolour-check).
   - **(c) Links.** Link drawing is not supported. No lesson may `draw` L2a1, L5a1, L6a4 or any multi-component
     diagram. Link invariants (`linkingNumber`, `jones`, …) are fine.
   - Not blocked: drawing other table knots, for example draw-a-table-knot with 5_2. The design lead should look at the
     kit's 5_2 picture before that lesson ships (`company/rnd/evolution/knots-gen2-looks/kit-derived-table--5_2.svg`).
3. **Diagrams over 12 crossings** (from `project`, or after up-moves): measure draw time at phone-class CPU before you
   ship. 9 to 19 crossings take up to 64 ms on the reference desktop, which could be several hundred ms on a phone.
4. `simplify(...).status == 'unknown'` must never be shown as "knotted".

## Tests

`npm run test:kit` runs `node --test src/kit/knots/test/*.test.mjs`. It is part of `npm run verify`. There are 97 tests:
the lab's codes, invariants, moves, draw (including the crossing-change test) and lesson-entry tests without U10, plus
`types.test.mjs`, which keeps `index.d.ts` and `index.mjs` in step.

## Changing this library

This is kit code, so the engineering tiers apply (company/engineering/README.md):
- **Tier 1:** an added export (also add it to `index.d.ts`), a bug fix that keeps results the same, or a table refresh
  through the derive route above.
- **Tier 2 (EDD and engineering review):**
  - removing or renaming an export;
  - changing what a function returns for existing input, including the `layout` data shape and the drawings of table entries;
  - anything that pushes a lesson-entry size over budget.

Sizes on 2026-10-14 (stripped gzip of each lesson entry's module closure): random-knot 11,323 B (condition ≤ 11,776 B,
gate 12,288 B), draw-a-table-knot 5,408 B, tricolour-check 9,684 B, unknot-game 7,042 B.
