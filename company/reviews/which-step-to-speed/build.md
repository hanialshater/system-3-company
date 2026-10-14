# Build note: which-step-to-speed

Builder: demo-builder (wave-j-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.energy-rates.md` #15. Status draft; every claim unverified.

Departures from the brief: the brief's control 3 "Undo step 2" became "Only step 1 ×10" (a preset), and the first two controls are toggles ("Step 2 ×10" ↔ "Undo step 2", "Step 1 ×10" ↔ "Undo step 1"), so every state can be reached in any order and the QA path ends on the step-1-only curve the reveal quotes. A first build had a fourth "Start over" button; the row clipped at 390 px and the QA path ended on the starting curve, so it went. Because the 7.03 s and 6.94 s dots sit 2.5 px apart, the half-times live in a legend (one row per state reached, each with its line style), not in dot labels. The starting curve is drawn as a grey dashed ghost from the first press; the step-2 curve stays as a dotted trace.

## Pre-flight v1

1. **Title and hook.** "Which step to speed?" / "A reaction runs in two steps. Make one of them ten times faster. Does it matter which?" No answer stated.
2. **Options.** "about 10 times sooner", "about 2 times sooner", "almost no sooner" (brief wording). The right option is the one without a number; the two numbered options are wrong, so precision does not point to it.
3. **Locked stage.** Pipe A → gate 1 → B → gate 2 → C (gate 2 drawn wider, as the question says), empty plot with axes 0-10 s and a dotted ½ line. No curve, no legend.
4. **Reveal values.** "7.03 s" and "6.94 s": milestone step2 (legend rows "start: 7.03 s", "step 2 ×10: 6.94 s"). "0.80 s": milestone step1-only (legend "step 1 ×10: 0.80 s", current curve).
5. **QA path.** DOM order "Step 2 ×10" (step2), "Step 1 ×10" (step1, state both ×10), "Only step 1 ×10" (step1-only): all three milestones in 3 presses. At the reveal the ghost, the step-2 trace, the step-1 curve and all four legend rows are on screen.
6. **Reset.** No Reset button; the toggles change the current curve but legend rows never disappear. Reveal text from the QA run: "Making the fast step ten times faster moved half-time only from 7.03 s to 6.94 s. Making the slow step ten times faster cut it to 0.80 s. In a chain, molecules queue at the narrowest gate: the slowest step sets the pace of the whole reaction. That step is the rate-determining step, and it is the one a catalyst, or a chemist, has to speed up."
7. **Phone fit.** Measured 2026-10-14 against :3530 with a scratchpad copy of `tools/reveal-fit.mjs` whose only change is longer page-load timeouts: verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 74 reveal words (with the verdict line), picScale 1 (smallest SVG text 10.5 px). Screenshot `artifacts/reveal-fit/which-step-to-speed.png`.

`node tools/overlap.mjs` against cs and economics bottleneck lessons (brief, Differs from) was not run; cm-chemistry owns that call.

## QA (local)

Computer-use QA 2026-10-14 against the shared dev server :3530: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J slugs> QA_OUT=artifacts/qa-wavej-chemistry npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=300000`. The `--timeout` flag raises only the per-test time budget (the config's 45 s ran out on page load, with the server at 15-60 s a page); no check was changed. Result: phone and desktop pass. Not run: next build, npm run verify (shared machine), walkthrough.
