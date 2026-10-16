# Build note: power-line-voltage-loss

Builder: demo-builder (demo-builder-wj64), 2026-10-16. Dispatch: mailbox 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 (r6 B2, W-487). Worktree s3c-wj64, branch wj-phys-64-68, lesson commit fba1dce. Brief: `company/domains/briefs/physics.md` round 4, #68. Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: a station, one cable and a village (labelled "10 kW"). The cable glows with the heat lost (opacity on a log scale, since the losses span four orders of magnitude), with readouts for current and watts lost on the cable. Dots moving along the cable stand for the current (the cause): their number is proportional to the current (20, 2 and 1 dots) and they all move at the same speed, so fewer dots is less current. No voltage is picked at first: the cable is dark and both readouts show "–". Three preset buttons in brief order; each disables itself while active. Seen row recorded at each milestone, never cleared. No Reset.

Departures and builder choices (none adds a stage word):
- Title "Same power, ten times the voltage"; hook "A village draws 10 kW down one long cable. What does the voltage do to the waste?" (not in the brief; neither says which way the loss goes).
- The control row sits under the picture, not on the station (kit `Row`); the labels are the brief's.
- No "Seen:" prefix (not on the brief's closed list). A non-breaking space keeps "2,300 V" and "23,000 V" from wrapping apart.
- The dots loop indefinitely (CSS, deterministic, off under reduced motion). No randomness.

Check figures: `node artifacts/scratch/cm-physics-r4/check.mjs` re-run in the main checkout before building (2026-10-16); every figure this lesson uses reproduced.

## Stage word budget

Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. The dispatch asks for Ruling r3's strict reading (a unit after a space counts 1), so the strict column is the binding count here; the Ruling 2 column is given because head-of-product has since ruled that a unit after a number counts 0. Both counted from the rendered stage (text nodes inside `data-testid="stage"`, `aria-hidden` excluded) by a builder probe at 390×844 on the own build, pressing each control once in DOM order.

Brief's closed list: controls 3, "station" "village" "10 kW" 3, readouts "0.43 A" "0.09 W lost" 3, Seen row 8, caption "Cable 0.5 Ω, values illustrative." 4 = 21.

| Busiest frame: after "23,000 V" (and at the reveal) | strict | Ruling 2 |
|---|---|---|
| "station" / "village" / "10 kW" | 3 | 2 |
| Readouts "0.43 A" / "0.09 W lost" | 3 | 1 |
| Caption "Cable 0.5 Ω, values illustrative." | 4 | 3 |
| Seen row "230 V: 43.5 A, 945 W · 2,300 V: 4.35 A, 9.5 W · 23,000 V: 0.09 W" | 8 | 0 |
| Controls "230 V" / "2,300 V" / "23,000 V" | 3 | 0 |
| **Total** (no stimulus) | **21** | **6** |

**Rendered stage count under Ruling r3 (strict): 21.**

Every frame, rendered:

| Frame (rendered, 390×844) | strict (spaced unit = 1) | Ruling 2 (unit after a number = 0) |
|---|---|---|
| locked | 13 | 5 |
| explore-start | 13 | 5 |
| after-1 | 18 | 6 |
| after-2 | 20 | 6 |
| after-3 | 21 | 6 |
| reveal | 21 | 6 |

## Pre-flight v1

1. **Title and hook.** "Same power, ten times the voltage" / "A village draws 10 kW down one long cable. What does the voltage do to the waste?" No direction or size of the change.
2. **Options.** "10 times more", "About the same", "100 times less": the brief's options. Two carry a number and one does not; the right one is not the only numbered option.
3. **Locked stage.** Station, dark cable, village with "10 kW" (the given), both readouts "–", caption, Seen row of dashes. No current, no loss value.
4. **Reveal values.** "230 V", "43.5 A", "945 W": milestone v230, Seen row. "2,300 V", "4.35 A", "9.5 W": milestone v2300 (the question's case), Seen row. "100 times less": arithmetic on the two seen losses (945 / 9.5, c3). "10 kW": the given. "a tenth of the current wastes a hundredth of the heat": told rule (c2), shown by the dot count and the glow.
5. **QA path.** DOM order: 230 V (v230), 2,300 V (v2300, the question's case), 23,000 V (v23000). Three presses reach all three. At the reveal the stage shows 23,000 V with "0.43 A", "0.09 W lost", one dot, a faint glow and the full Seen row.
6. **Reset.** No Reset control; switching presets never clears the Seen row. Reveal on the QA path (rendered, builder probe at fba1dce): "Not quite: it was “100 times less”. At 230 V your cable carried 43.5 A and wasted 945 W as heat. At 2,300 V the same 10 kW needed only 4.35 A, and the cable wasted 9.5 W: 100 times less. Power is voltage times current, so a higher voltage delivers the same power with less current. Cable heating goes as current squared, so a tenth of the current wastes a hundredth of the heat. That is why long-distance lines run at high voltage."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3664 <the 5 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/wj64-r6b2.json --shots` (tool commit 79c22aa, head fba1dce, clean true): **verdict fit, crop 0, phoneFit true**, hiddenBelow 0, namedHidden 0, revealWords 84 (tool count, verdict line included, at most 90), picScale 1, stageH 264. Screenshot `artifacts/reveal-fit/power-line-voltage-loss.png` (local, untracked). The reveal's quoted values are all in the Seen row, on screen with the stage top.

Builder's probe (same run): every control 44 px tall, smallest SVG label 11 px as drawn at 390 px, 0 console or page errors, reveal unlocked after the three presses.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build at fba1dce (`NEXT_DIST_DIR=.next-wj64 npx next build`, exit 0), served with `tools/serve.sh start 3664 .next-wj64`. `QA_BASE_URL=http://localhost:3664 QA_ONLY=two-batteries-side-by-side,clap-at-the-cliff,scale-on-a-slope,longest-drinking-straw,power-line-voltage-loss QA_OUT=artifacts/qa-wj64-r6b2 npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec, default timeouts: **10 passed** (phone and desktop for all five). `npm run typecheck` exit 0, `npm run check` passed. This is not a QA record; the qa-tester's run is still owed (lane 10).
