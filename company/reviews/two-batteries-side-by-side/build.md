# Build note: two-batteries-side-by-side

Builder: demo-builder (demo-builder-wj64), 2026-10-16. Dispatch: mailbox 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 (r6 B2, W-487). Worktree s3c-wj64, branch wj-phys-64-68, lesson commit fba1dce. Brief: `company/domains/briefs/physics.md` round 4, #64. Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: one circuit band with a battery holder (empty and dashed at first, the circuit open), a voltmeter across the pack, a 5 Ω bulb whose glow follows the power, and a run-time fuel gauge (fill only, no text, `aria-hidden`). Inside each cell an arrow from − to + stands for the cause (each cell lifts charge through 1.5 V); only the first cell's arrow is labelled "lifts 1.5 V". End to end the two arrows stack in one column; side by side they stand in parallel. Three preset buttons in brief order; each disables itself while active. Seen row recorded at each milestone, never cleared. No Reset (the brief lists none).

Departures and builder choices (none adds a stage word):
- Title and hook were not in the brief. Title "Two batteries side by side"; hook "Two 1.5 V batteries, joined side by side instead of end to end. What do you get?" (a setup, no claim).
- No "Seen:" prefix on the Seen row: the brief's list is closed at 25 and does not include it.
- The glow's area grows with the power (radius 20·sqrt(P/0.45)), so end to end reads as about 4× the glow; the gauge fill is h / 13.3. Both are schematic (claim c4).
- End to end, the cells are shorter (42 px) and their + / − signs sit just outside them, so the arrows keep their length. The signs carry no letters and are `aria-hidden`.

Check figures: `node artifacts/scratch/cm-physics-r4/check.mjs` re-run in the main checkout before building (2026-10-16); every figure this lesson uses reproduced.

## Stage word budget

Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. The dispatch asks for Ruling r3's strict reading (a unit after a space counts 1), so the strict column is the binding count here; the Ruling 2 column is given because head-of-product has since ruled that a unit after a number counts 0. Both counted from the rendered stage (text nodes inside `data-testid="stage"`, `aria-hidden` excluded) by a builder probe at 390×844 on the own build, pressing each control once in DOM order.

Brief's closed list: controls 7, "lifts 1.5 V" 2, voltmeter "1.5 V" 1, Seen row 12, caption "Ideal cells, 2,000 mAh." 3 = 25.

| Busiest frame: after "One" (and at the reveal) | strict | Ruling 2 |
|---|---|---|
| Arrow label "lifts 1.5 V" | 2 | 1 |
| Voltmeter "1.5 V" | 1 | 0 |
| Caption "Ideal cells, 2,000 mAh." | 3 | 2 |
| Seen row "side by side: 1.5 V, 13.3 h · end to end: 3.0 V, 3.3 h · one: 6.7 h" | 12 | 7 |
| Controls "Side by side" / "End to end" / "One" | 7 | 7 |
| **Total** (no stimulus) | **25** | **17** |

**Rendered stage count under Ruling r3 (strict): 25, at the limit, not over.** No word was added or trimmed relative to the brief's list. Under Ruling 2 of the counting decision (which has since made a unit after a number count 0) it is 17.

Every frame, rendered:

| Frame (rendered, 390×844) | strict (spaced unit = 1) | Ruling 2 (unit after a number = 0) |
|---|---|---|
| locked | 17 | 16 |
| explore-start | 17 | 16 |
| after-1 | 22 | 17 |
| after-2 | 24 | 17 |
| after-3 | 25 | 17 |
| reveal | 25 | 17 |

## Pre-flight v1

1. **Title and hook.** "Two batteries side by side" / "Two 1.5 V batteries, joined side by side instead of end to end. What do you get?" No voltage for the pair, no hint of 1.5 vs 3.0.
2. **Options.** "0 V", "1.5 V", "3.0 V": all numbered, one decimal on the two non-zero values.
3. **Locked stage.** Empty dashed holder, open circuit (dashed wires), voltmeter "–", unlit bulb, empty gauge, caption, Seen row of dashes. Nothing reads 1.5 V or 3.0 V.
4. **Reveal values.** "1.5 V" (side by side): milestone parallel, Seen row. "13.3 hours": milestone parallel, Seen row. "6.7": milestone one, Seen row. "3.0 V", "3.3 hours": milestone series, Seen row. "the same as one battery", "twice the current", "four times the power", "1.5 V" per cell: told rule (claims c1, c2), shown by the glow and the arrow label.
5. **QA path.** DOM order: Side by side (parallel, the question's case), End to end (series), One (one). Three presses reach all three. At the reveal the stage shows one cell, voltmeter 1.5 V, and the full Seen row.
6. **Reset.** No Reset control; switching presets never clears the Seen row. Reveal on the QA path (rendered, builder probe at fba1dce): "Not quite: it was “1.5 V”. Side by side, your voltmeter read 1.5 V, the same as one battery. The bulb glowed as brightly as with one, but for 13.3 hours instead of 6.7. End to end it read 3.0 V: the bulb drew twice the current at twice the voltage, four times the power, and lasted only 3.3 hours. Each battery lifts charge through 1.5 V. In a row the lifts add; side by side they share the work."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3664 <the 5 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/wj64-r6b2.json --shots` (tool commit 79c22aa, head fba1dce, clean true): **verdict fit, crop 0, phoneFit true**, hiddenBelow 0, namedHidden 0, revealWords 80 (tool count, verdict line included, at most 90), picScale 1, stageH 292. Screenshot `artifacts/reveal-fit/two-batteries-side-by-side.png` (local, untracked). The reveal's quoted values are all in the Seen row, on screen with the stage top.

Builder's probe (same run): every control 44 px tall, smallest SVG label 11 px as drawn at 390 px, 0 console or page errors, reveal unlocked after the three presses.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build at fba1dce (`NEXT_DIST_DIR=.next-wj64 npx next build`, exit 0), served with `tools/serve.sh start 3664 .next-wj64`. `QA_BASE_URL=http://localhost:3664 QA_ONLY=two-batteries-side-by-side,clap-at-the-cliff,scale-on-a-slope,longest-drinking-straw,power-line-voltage-loss QA_OUT=artifacts/qa-wj64-r6b2 npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec, default timeouts: **10 passed** (phone and desktop for all five). `npm run typecheck` exit 0, `npm run check` passed. This is not a QA record; the qa-tester's run is still owed (lane 10).
