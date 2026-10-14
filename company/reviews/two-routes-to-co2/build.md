# Build note: two-routes-to-co2

Builder: demo-builder (wave-j-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.energy-rates.md` #12. Status draft; every claim unverified.

Departures from the brief: on the ladder (440 kJ over 178 px) the +1.90 kJ graphite-to-diamond step is under 1 px, so the diamond level is drawn 3 px above the start level; the label "+1.90 diamond" carries the size, and claim c3 records the exaggeration. Route buttons stay pressed (disabled, "active") once drawn, so all three routes stay side by side. Sums are added on the stage from each route's own rounded steps. The model disclosure (c5, steps as if complete, standard conditions) is not on the stage (text budget).

## Pre-flight v1

1. **Title and hook.** "Two routes to CO₂" / "Burn carbon in one step or two. Does taking the detour change the heat you get?" No direction given.
2. **Options.** "the direct route", "the two-step route", "both the same": none numbered.
3. **Locked stage.** Axis 0 to −400 kJ/mol (gridlines every 100), the start level "C + O₂". The CO₂ end level, arrows and sums are hidden.
4. **Reveal values.** "−393.51 kJ": milestone via-co (its column sum "Σ −393.51" and the CO₂ level; also milestone direct). "−110.53 then −282.98": milestone via-co (step labels). "+1.90 to diamond": milestone diamond (step label "+1.90 diamond").
5. **QA path.** DOM order "Direct" (direct), "Via CO" (via-co), "Via diamond" (diamond): three milestones in 3 presses; all three routes and sums stay drawn at the reveal.
6. **Reset.** No Reset; nothing can be undrawn. Reveal text from the QA run: "Every route ended on the same level: −393.51 kJ per mole of CO₂, whether you went straight down, stopped at carbon monoxide (−110.53 then −282.98), or even climbed +1.90 to diamond first. Heat released depends only on where you start and where you finish, like height lost walking downhill by any path. So chemists add measured steps to find the heat of reactions they cannot measure directly."
7. **Phone fit.** Measured 2026-10-14 against :3530 with a scratchpad copy of `tools/reveal-fit.mjs` whose only change is longer page-load timeouts: verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 74 reveal words (with the verdict line), picScale 1 (smallest SVG text 10.5 px). Screenshot `artifacts/reveal-fit/two-routes-to-co2.png`.

## QA (local)

Computer-use QA 2026-10-14 against the shared dev server :3530: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J slugs> QA_OUT=artifacts/qa-wavej-chemistry npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=300000`. The `--timeout` flag raises only the per-test time budget (the config's 45 s ran out on page load, with the server at 15-60 s a page); no check was changed. Result: phone and desktop pass. Not run: next build, npm run verify (shared machine), walkthrough.
