# Build note: longest-drinking-straw

Builder: demo-builder (demo-builder-wj64), 2026-10-16. Dispatch: mailbox 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 (r6 B2, W-487). Worktree s3c-wj64, branch wj-phys-64-68, lesson commit fba1dce. Brief: `company/domains/briefs/physics.md` round 4, #67. Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: a glass of water, a tall straw against a 0-14 m height scale (numerals 10 px, the unit "m" once), a pump drawn at the top of the straw (not labelled), and down-arrows of air pressure on the open water labelled "air pushes" (the cause; thinner and shorter on Everest). The column rises to min(straw, h) with h = (P − P_vap)/(ρ g); when it stops short, the space above is drawn empty and labelled "no air", with a level line and the column's height. Three preset buttons in brief order; each disables itself while active. Seen row recorded at each milestone, never cleared. No Reset.

Departures and builder choices (none adds a stage word):
- Title "The longest drinking straw"; hook "A perfect pump on a very tall straw. How high can it lift the water?" (not in the brief; it does not say there is a limit).
- The stage starts with no straw (glass, air arrows and scale only), so no first press is a no-op.
- The column readout shows the height for every straw ("5.0 m" at 5 m); the brief lists it as one readout ("3.2 m").
- No "Seen:" prefix (not on the brief's closed list). No animation of the rising column: the column is drawn at its final height at once.

Check figures: `node artifacts/scratch/cm-physics-r4/check.mjs` re-run in the main checkout before building (2026-10-16); every figure this lesson uses reproduced.

## Stage word budget

Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. The dispatch asks for Ruling r3's strict reading (a unit after a space counts 1), so the strict column is the binding count here; the Ruling 2 column is given because head-of-product has since ruled that a unit after a number counts 0. Both counted from the rendered stage (text nodes inside `data-testid="stage"`, `aria-hidden` excluded) by a builder probe at 390×844 on the own build, pressing each control once in DOM order.

Brief's closed list: controls 6, scale unit "m" 1, "air pushes" 2, "no air" 2, column readout "3.2 m" 1, Seen row 8, caption "Perfect pump, 20 °C water." 4 = 24.

| Busiest frame: after "On Everest" (and at the reveal) | strict | Ruling 2 |
|---|---|---|
| Scale ticks 0-14 / unit "m" (alone) | 0 / 1 | 0 / 1 |
| "air pushes" / "no air" | 4 | 4 |
| Column readout "3.2 m" | 1 | 0 |
| Caption "Perfect pump, 20 °C water." | 4 | 3 |
| Seen row "5 m: top · 12 m: stops at 10.1 m · Everest: 3.2 m" | 8 | 4 |
| Controls "5 m straw" / "12 m straw" / "On Everest" | 6 | 4 |
| **Total** (no stimulus) | **24** | **16** |

**Rendered stage count under Ruling r3 (strict): 24.** (My probe's Ruling 2 tally printed 15 because it also zeroed the lone "m" of the scale; by the ruling's own text a lone unit counts 1, so 16.)

Every frame, rendered:

| Frame (rendered, 390×844) | strict (spaced unit = 1) | Ruling 2 (unit after a number = 0) |
|---|---|---|
| locked | 16 | 10 |
| explore-start | 16 | 10 |
| after-1 | 18 | 11 |
| after-2 | 23 | 15 |
| after-3 | 24 | 15 |
| reveal | 24 | 15 |

## Pre-flight v1

1. **Title and hook.** "The longest drinking straw" / "A perfect pump on a very tall straw. How high can it lift the water?" No height, no hint that there is a limit.
2. **Options.** "About 1 m", "About 10 m", "Any height, with enough pull": the brief's options; the two numbered ones share "About" and whole metres.
3. **Locked stage.** Glass of water, two "air pushes" arrows, the 0-14 m scale with ticks every 2 m (10 is one tick among eight, not highlighted), caption, Seen row of dashes. No straw, no level line.
4. **Reveal values.** "5 m ... reached the top": milestone s5, Seen row "5 m: top". "12 m", "10.1 m", "empty space above": milestone s12 (the question's case), Seen row. "3.2 m", "thinner air": milestone everest, Seen row and current column readout, thinner arrows on the stage. "about 10 m": told rule (c1, c2), matching the 10.1 m seen.
5. **QA path.** DOM order: 5 m straw (s5), 12 m straw (s12, the question's case), On Everest (everest). Three presses reach all three. At the reveal the stage shows the 12 m straw on Everest, column at 3.2 m, "no air" above it, and the full Seen row.
6. **Reset.** No Reset control; switching presets never clears the Seen row. Reveal on the QA path (rendered, builder probe at fba1dce): "Not quite: it was “About 10 m”. In your 5 m straw the water reached the top, but in the 12 m straw it stopped at 10.1 m, with empty space above, however hard the pump worked. Suction does not pull water. The pump only removes air from the straw; the air pressing on the water in the glass pushes it up, and that push can hold up only about 10 m of water. On Everest, under thinner air, it held just 3.2 m."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3664 <the 5 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/wj64-r6b2.json --shots` (tool commit 79c22aa, head fba1dce, clean true): **verdict fit, crop 0, phoneFit true**, hiddenBelow 0, namedHidden 0, revealWords 84 (tool count, verdict line included, at most 90), picScale 1, stageH 323. Screenshot `artifacts/reveal-fit/longest-drinking-straw.png` (local, untracked). The reveal's quoted values are all in the Seen row, on screen with the stage top.

Builder's probe (same run): every control 44 px tall, smallest SVG label 10 px as drawn at 390 px, 0 console or page errors, reveal unlocked after the three presses.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build at fba1dce (`NEXT_DIST_DIR=.next-wj64 npx next build`, exit 0), served with `tools/serve.sh start 3664 .next-wj64`. `QA_BASE_URL=http://localhost:3664 QA_ONLY=two-batteries-side-by-side,clap-at-the-cliff,scale-on-a-slope,longest-drinking-straw,power-line-voltage-loss QA_OUT=artifacts/qa-wj64-r6b2 npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec, default timeouts: **10 passed** (phone and desktop for all five). `npm run typecheck` exit 0, `npm run check` passed. This is not a QA record; the qa-tester's run is still owed (lane 10).
