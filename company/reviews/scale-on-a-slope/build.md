# Build note: scale-on-a-slope

Builder: demo-builder (demo-builder-wj64), 2026-10-16. Dispatch: mailbox 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 (r6 B2, W-487). Worktree s3c-wj64, branch wj-phys-64-68, lesson commit fba1dce. Brief: `company/domains/briefs/physics.md` round 4, #66. Status draft; every claim unverified (the builder never marks its own claims verified).

Kept from evaluators until they report.

Built as briefed: one ramp with a person standing upright on a bathroom scale, the weight arrow (dashed, no word) split into "into the ramp" (domain colour, the cause) and "along the ramp". The scale's display box, tied to the scale by a dotted leader, shows the reading. At 60° a stop block holds the scale and is labelled. The stage starts flat at 70.0 kg with "Back to flat" active and disabled, as the brief says; its milestone fires only when it is pressed after a tilt. Seen row recorded at each milestone, never cleared. No Reset.

Departures and builder choices (none adds a stage word):
- Title "A scale on a slope"; hook "Your bathroom scale reads 70 kg on the floor. What does it read on a ramp?" (not in the brief; 70 kg is the question's own given, a wrong option).
- In the locked frame no arrows are drawn (the display shows the given 70.0 kg); they appear when the stage unlocks.
- Labels have a background halo so "into the ramp" stays legible where it crosses the ramp edge at 60°.
- No "Seen:" prefix (not on the brief's closed list).
- The along-slope arrow's label sits below its tip so the display's leader line never crosses it.

Check figures: `node artifacts/scratch/cm-physics-r4/check.mjs` re-run in the main checkout before building (2026-10-16); every figure this lesson uses reproduced.

## Stage word budget

Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. The dispatch asks for Ruling r3's strict reading (a unit after a space counts 1), so the strict column is the binding count here; the Ruling 2 column is given because head-of-product has since ruled that a unit after a number counts 0. Both counted from the rendered stage (text nodes inside `data-testid="stage"`, `aria-hidden` excluded) by a builder probe at 390×844 on the own build, pressing each control once in DOM order.

Brief's closed list (an upper bound over frames): controls 5, readout "35.0 kg" 1, arrows 6, "stop block" 2 (60° only), Seen row 4, caption 4 = 22.

| Busiest frame: after "Tilt 60°" | strict | Ruling 2 |
|---|---|---|
| "stop block" | 2 | 2 |
| "into the ramp" / "along the ramp" | 6 | 6 |
| Display "35.0 kg" | 1 | 0 |
| Caption "At rest, not slipping." | 4 | 4 |
| Seen row "30°: 60.6 kg · 60°: 35.0 kg · flat: –" | 3 | 1 |
| Controls "Tilt 30°" / "Tilt 60°" / "Back to flat" | 5 | 5 |
| **Total** (no stimulus) | **21** | **18** |

At the reveal (after "Back to flat") the stage shows 17 strict (no "stop block", no "along the ramp" at 0°, full Seen row). The brief's 22 adds the full Seen row and the stop label, which are never on screen together. **Rendered stage count under Ruling r3 (strict): 21 at the busiest frame.**

Every frame, rendered:

| Frame (rendered, 390×844) | strict (spaced unit = 1) | Ruling 2 (unit after a number = 0) |
|---|---|---|
| locked | 11 | 10 |
| explore-start | 14 | 13 |
| after-1 | 18 | 16 |
| after-2 | 21 | 18 |
| after-3 | 17 | 13 |
| reveal | 17 | 13 |

## Pre-flight v1

1. **Title and hook.** "A scale on a slope" / "Your bathroom scale reads 70 kg on the floor. What does it read on a ramp?" 70 kg is the given; no reading for the ramp.
2. **Options.** "35 kg", "61 kg", "70 kg": all numbered, whole kg (the brief's options).
3. **Locked stage.** Flat ground, person on the scale, display "70.0 kg" (the given), caption, Seen row of dashes, "Back to flat" active and disabled. No arrows, no 61 or 35 anywhere.
4. **Reveal values.** "30°", "60.6 kg": milestone tilt30 (the question's case), Seen row. "60°", "35.0 kg": milestone tilt60, Seen row. "70 kg": the given, and milestone flat's "70.0 kg" in the Seen row. "the arrow into the ramp": the drawn arrow, on the stage at every unlocked frame.
5. **QA path.** DOM order: Tilt 30° (tilt30), Tilt 60° (tilt60), Back to flat (flat; enabled after a tilt). Three presses reach all three. At the reveal the stage is flat at 70.0 kg with the "into the ramp" arrow and the full Seen row.
6. **Reset.** No Reset control; switching presets never clears the Seen row. Reveal on the QA path (rendered, builder probe at fba1dce): "Not quite: it was “61 kg”. On the 30° ramp your scale read 60.6 kg, and at 60° only 35.0 kg, though you still weighed 70 kg. A scale measures only the push straight into its surface. On a slope your weight splits in two: part presses into the scale (the arrow into the ramp), and part pulls you down the slope, held by friction. The steeper the slope, the smaller the push into it."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3664 <the 5 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/wj64-r6b2.json --shots` (tool commit 79c22aa, head fba1dce, clean true): **verdict fit, crop 0, phoneFit true**, hiddenBelow 0, namedHidden 0, revealWords 75 (tool count, verdict line included, at most 90), picScale 1, stageH 299. Screenshot `artifacts/reveal-fit/scale-on-a-slope.png` (local, untracked). The reveal's quoted values are all in the Seen row, on screen with the stage top.

Builder's probe (same run): every control 44 px tall, smallest SVG label 11 px as drawn at 390 px, 0 console or page errors, reveal unlocked after the three presses.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own production build at fba1dce (`NEXT_DIST_DIR=.next-wj64 npx next build`, exit 0), served with `tools/serve.sh start 3664 .next-wj64`. `QA_BASE_URL=http://localhost:3664 QA_ONLY=two-batteries-side-by-side,clap-at-the-cliff,scale-on-a-slope,longest-drinking-straw,power-line-voltage-loss QA_OUT=artifacts/qa-wj64-r6b2 npx playwright test tests/qa/contract.spec.ts --workers=2`, unmodified spec, default timeouts: **10 passed** (phone and desktop for all five). `npm run typecheck` exit 0, `npm run check` passed. This is not a QA record; the qa-tester's run is still owed (lane 10).
