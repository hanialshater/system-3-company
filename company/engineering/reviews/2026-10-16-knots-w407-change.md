# Change note for re-read: knots W-407 close-out (src/kit/knots, tier 2)

author: rnd-lead (Bram) · for: principal-engineer (re-read, dispatched by the caller) · date: 2026-10-16 · board: W-407, W-857
EDD: [EDD-011](../edd/EDD-011-knots-extra-crossings.md) (Part 1 asks you to confirm a scope; Part 2 paused) · readiness: [2026-10-16-knots-w407.md](../readiness/2026-10-16-knots-w407.md) (ops approval pending) · prior review: [EDD-004 eng review](../../rituals/records/2026-10-14-eng-review-EDD-004.md)

**What the kit change is.** One new test in `src/kit/knots/test/draw.test.mjs` (and `check()` gains an optional `opts` passed to `draw`), plus README text. No library module, `index.d.ts`, `package.json` or `table.mjs` byte changed: `git diff --stat src/kit/knots` lists only `README.md` and `test/draw.test.mjs`. No lesson imports `@/kit/knots` (`grep -r "@/kit/knots" src/demos src/app` is empty).

## Conditions of your 2026-10-14 review

| # | State | Evidence (re-run today in this worktree) |
|---|---|---|
| C1 (rnd-lead) | **Done** (since 2026-10-14; no edit needed today) | `sources.mjs:44` is `conway: [5, 1, 4], w: -2, rev: [0]`. `node src/lab/knots/provenance/derive.mjs --write` reports `10_8 | Conway 5 1 4 (4-plat) | 10/10 | same | same | same diagram (relabelled)` and leaves `git status` clean, so `table.derived.mjs` is reproduced byte for byte. `sed "s#'../core.mjs'#'./core.mjs'#" …table.derived.mjs | diff - src/kit/knots/table.mjs` is empty. Provenance README row for 10_8 reads "Conway 514 … (until 2026-10-14: DT …)" plus the dated update paragraph. |
| C2 (rnd-lead) | **Done** (since 2026-10-14); status line freshened today | `src/lab/knots/README.md` lines 7–13: "Shipped copy: `src/kit/knots/` … Lessons import `@/kit/knots`, never this folder." Line 3 no longer says the kit move is "proposed". |
| C3 (platform-engineer, W-408) | **Open, not mine.** Not run here (no build in this run). The nearest evidence is PR #5's M3 run, where every verify stage was run (test:kit 97/97) but `verify` itself exited 1 at test:hq: `company/reviews/books-100/2026-10-16-pr5-m3-verify.md`. Whether that satisfies C3 is yours and the platform engineer's call. |
| C4 (platform-engineer + builder) | Open, triggered by the first lesson that uses `layout`. |

## The rest of W-407

- **The 4 U10 monster-unknot tests (lab).** With the derived table swapped into a scratch copy of the lab, exactly 4 tests failed: codes #10 (identify), invariants U10 ×2, moves #101 (simplify). They now read `MONSTER` from `test/benchdata.mjs` (lab-only bench data) instead of table entry U10, and a new bench-data test pins `knot('monster-unknot').pd` deep-equal to `MONSTER` while the lab table carries U10. Results: lab 105/105 on the lab table; **103/103 on the scratch derived-table swap** (U10's per-entry move test disappears with the entry). Lab only: the kit gets no U10 (your ruling 3, GPL-sourced bench data stays in the lab). I did **not** swap the lab's own `table.mjs` to the derived one: that is an evaluator change and waits for the next knots evaluator change (EDD-004 open question, same rule as benchdata's KNOTS).
- **Extra crossings follow-up (block a): EDD-011.** Part 1 scopes block (a) so that table-knot lessons are explicitly outside it, backed by the new kit test: every one-component `KNOTS` entry, drawn with its stored layout, as its mirror, and after every single and cumulative crossing change on the stored layout, has 0 extra crossings and correct handedness (301-picture probe over all 21 entries; the only non-zero results were the link L6a4, 2 extras after crossing changes, already under block c). Part 2 (exported `extraCrossings` check for random-knot) is designed and costed but **paused** per the R&D Review of 2026-10-14.

## What I ask you to rule

1. **Confirm or reject EDD-011 Part 1** (the scope paragraph now in the kit README under rule 2(a), marked "proposed, for the principal engineer to confirm"). If you reject it, revert that paragraph; the test can stay.
2. **W-407 closure:** with C1, C2, the U10 tests and EDD-011 done, is anything in W-407 itself still a condition before a lesson imports `@/kit/knots`? My reading of your table: only C3 (W-408) and C4 remain, and neither is rnd-lead's.
3. The kit test count goes 97 → 98, and `check()` in the kit test now takes an optional third argument; the lab and kit `draw.test.mjs` stay byte-identical.

## Commands run

`npm run test:kit` 98/98 · lab `node --test` over the six test files 105/105, plus `provenance/derive.test.mjs` 7/7 · scratch derived-table swap 103/103 · `npm run check` and `npm run typecheck` (results in the progress handoff of this run).

## Not done

No lesson, brief, board state of other roles, `ci.yml` or protected path touched. Nothing pushed or deployed.
