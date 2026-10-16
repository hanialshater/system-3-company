# Build note: clap-at-the-cliff

Builder: demo-builder (demo-builder-wj64), 2026-10-16. Dispatch: mailbox 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 (r6 B2, W-487). Worktree s3c-wj64, branch wj-phys-64-68, lesson commit fba1dce. Brief: `company/domains/briefs/physics.md` round 4, #65. Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: one side-view band with a person and flat ground. Each preset places a cliff (a fixed-width rock face) at its distance, to scale with the other distances (0.74 px per m), labelled with that distance. A sound pulse runs out and back in 360 ms; dashed out and back arrows stay drawn, and the readouts give the simulated echo time and "sound travelled N m" (the cause: the round trip). Three preset buttons in brief order; each disables itself while active. Seen row recorded at each milestone, never cleared. No Reset.

Departures and builder choices (none adds a stage word):
- Title "Clap at the cliff"; hook "You clap at a cliff and time the echo. How far away is the rock face?" (not in the brief).
- The stage starts with no cliff placed and the readouts at "echo –" / "sound travelled –", so no first press is a no-op.
- No "Seen:" prefix (not on the brief's closed list).
- Echo times use c = 343 m/s, as `check.mjs` does (2d/343); the 343.2 m/s derivation is in claim c1.

Check figures: `node artifacts/scratch/cm-physics-r4/check.mjs` re-run in the main checkout before building (2026-10-16); every figure this lesson uses reproduced.

## Stage word budget

Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. The dispatch asks for Ruling r3's strict reading (a unit after a space counts 1), so the strict column is the binding count here; the Ruling 2 column is given because head-of-product has since ruled that a unit after a number counts 0. Both counted from the rendered stage (text nodes inside `data-testid="stage"`, `aria-hidden` excluded) by a builder probe at 390×844 on the own build, pressing each control once in DOM order.

Brief's closed list: controls 6, cliff "340 m" 1, "echo 1.98 s" 2, "sound travelled 680 m" 3, Seen row 6, caption "Still air, 20 °C." 3 = 21.

| Busiest frame: after "340 m: clap" (and at the reveal) | strict | Ruling 2 |
|---|---|---|
| Cliff label "340 m" | 1 | 0 |
| "echo 1.98 s" | 2 | 1 |
| "sound travelled 680 m" | 3 | 2 |
| Caption "Still air, 20 °C." | 3 | 2 |
| Seen row "85 m: 0.50 s · 170 m: 0.99 s · 340 m: 1.98 s" | 6 | 0 |
| Controls "85 m: clap" / "170 m: clap" / "340 m: clap" | 6 | 3 |
| **Total** (no stimulus) | **21** | **8** |

**Rendered stage count under Ruling r3 (strict): 21.**

Every frame, rendered:

| Frame (rendered, 390×844) | strict (spaced unit = 1) | Ruling 2 (unit after a number = 0) |
|---|---|---|
| locked | 15 | 8 |
| explore-start | 15 | 8 |
| after-1 | 19 | 8 |
| after-2 | 20 | 8 |
| after-3 | 21 | 8 |
| reveal | 21 | 8 |

## Pre-flight v1

1. **Title and hook.** "Clap at the cliff" / "You clap at a cliff and time the echo. How far away is the rock face?" No distance, no mention of halving.
2. **Options.** "170 m away", "340 m away", "690 m away": all numbered, same precision.
3. **Locked stage.** Person on flat ground, no cliff, "echo –", "sound travelled –", caption, Seen row of dashes. The control labels "170 m: clap" and "340 m: clap" are disabled presets; they name two options equally and neither is highlighted.
4. **Reveal values.** "170 m", "0.99 s": milestone d170 (the question's case), Seen row. "340 m", "1.98 s": milestone d340, Seen row and current readout. "1.0 s", "343 m": the question's own givens. "half out, half back", "divided by two": told rule (c2), shown by the out and back arrows and the "sound travelled" readout.
5. **QA path.** DOM order: 85 m: clap (d85), 170 m: clap (d170, the question's case), 340 m: clap (d340). Three presses reach all three. At the reveal the stage shows the 340 m cliff, "echo 1.98 s", "sound travelled 680 m" and the full Seen row.
6. **Reset.** No Reset control; switching presets never clears the Seen row. Reveal on the QA path (rendered, builder probe at fba1dce): "Your prediction held. With the cliff 170 m away, your echo came back after 0.99 s, close to the 1.0 s in the question. At 340 m it took 1.98 s. The clap has to reach the cliff and come back, so in 1 s the sound covered 343 m in total: half out, half back. The distance to a cliff is the speed of sound times the echo time, divided by two."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3664 <the 5 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/wj64-r6b2.json --shots` (tool commit 79c22aa, head fba1dce, clean true): **verdict fit, crop 0, phoneFit true**, hiddenBelow 0, namedHidden 0, revealWords 73 (tool count, verdict line included, at most 90), picScale 1, stageH 259. Screenshot `artifacts/reveal-fit/clap-at-the-cliff.png` (local, untracked). The reveal's quoted values are all in the Seen row, on screen with the stage top.

Builder's probe (same run): every control 44 px tall, smallest SVG label 11 px as drawn at 390 px, 0 console or page errors, reveal unlocked after the three presses.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build at fba1dce (`NEXT_DIST_DIR=.next-wj64 npx next build`, exit 0), served with `tools/serve.sh start 3664 .next-wj64`. `QA_BASE_URL=http://localhost:3664 QA_ONLY=two-batteries-side-by-side,clap-at-the-cliff,scale-on-a-slope,longest-drinking-straw,power-line-voltage-loss QA_OUT=artifacts/qa-wj64-r6b2 npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec, default timeouts: **10 passed** (phone and desktop for all five). `npm run typecheck` exit 0, `npm run check` passed. This is not a QA record; the qa-tester's run is still owed (lane 10).
