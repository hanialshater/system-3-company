# Build note: heat-the-ammonia-maker

Builder: demo-builder (wave-j-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.energy-rates.md` #11. Status draft; every claim unverified.

Departures from the brief: the plot is log K against temperature with the three temperature columns along the bottom; there is no separate thermometer column (the chips are the controls). Each dot carries its own K label (two significant figures), so both K values the reveal quotes stay on the stage; no separate K readout. The two-colour bar is not a qualitative split but the computed ammonia share of the settled gas from 1 N₂ : 3 H₂ at 1 bar (94%, 17%, 0.45%), new claim c3, so "the ammonia at equilibrium" in the question is drawn and not only K. The reveal quotes K at the stage's rounding (5.6 × 10⁵, 1.9 × 10⁻⁴) where the brief draft had 6 × 10⁵ and 2 × 10⁻⁴. The stage does not carry the "constant ΔH° and ΔS°" caveat (text budget); it is in claim c2. The factories sentence rests on c6 (Greenwood & Earnshaw); the brief says to cut it if no source can be checked, and that call belongs to the fact-checker and cm-chemistry.

## Pre-flight v1

1. **Title and hook.** "Heat the ammonia maker" / "Heat speeds reactions up. Does it also leave more product at the end?" A question; it names the tension without the direction.
2. **Options.** "rises a lot", "stays about the same", "falls a lot": none numbered, same precision.
3. **Locked stage.** Log K axis 10⁻⁵ to 10⁶ (labels every other decade), temperature labels 25 / 200 / 450 °C, caption "large K: mostly ammonia", an empty dashed bar "NH₃ at the end (1 bar)". No dot, no value.
4. **Reveal values.** "5.6 × 10⁵ at 25 °C": milestone t25 (dot label). "1.9 × 10⁻⁴ at 450 °C": milestone t450 (dot label). "a factor of billions": computed from the two dot values. "faster": milestone speed (label "reaches equilibrium faster"). The rest is told (claims c4, c6, c7).
5. **QA path.** DOM order "25 °C" (t25), "200 °C", "450 °C" (t450), "Show speed" (speed): all three milestones by press 4. At the reveal all three dots, their labels, the speed label and the 450 °C bar (0.45%) are on screen.
6. **Reset.** No Reset. Dots never disappear once plotted; "Hide speed" hides only the speed label. Reveal text from the QA run: "Heating did not help the ammonia: K fell from about 5.6 × 10⁵ at 25 °C to about 1.9 × 10⁻⁴ at 450 °C, a factor of billions. Making ammonia releases heat, so heat pushes the balance back toward nitrogen and hydrogen. Heat still makes the reaction faster, which is why factories run hot anyway, with an iron catalyst and high pressure to win some yield back. Temperature is the one change that moves K itself."
7. **Phone fit.** Measured 2026-10-14 against :3530 with a scratchpad copy of `tools/reveal-fit.mjs` whose only change is longer page-load timeouts (the shared dev server took over 30 s per page): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 81 reveal words (with the verdict line), picScale 1, so the smallest SVG text is 10.5 px. Screenshot `artifacts/reveal-fit/heat-the-ammonia-maker.png`. After the first run the speed button got a wider share of its row ("Hide speed" was clipped); re-measured, same numbers.

## QA (local)

Computer-use QA 2026-10-14 against the shared dev server :3530: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J slugs> QA_OUT=artifacts/qa-wavej-chemistry npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=300000`. The `--timeout` flag raises only the per-test time budget (the config's 45 s ran out on page load, with the server at 15-60 s a page); no check was changed. Result: phone and desktop pass. Not run: next build, npm run verify (shared machine), walkthrough.
