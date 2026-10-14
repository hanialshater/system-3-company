# Build note: limestone-crossover

Builder: demo-builder (wave-j-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.energy-rates.md` #18. Status draft; every claim unverified.

Departures from the brief: ΔG lives in two recorded readouts ("ΔG at 25 °C", "ΔG at 900 °C", the two values the reveal quotes); the 500 °C case shows only in the TΔS label's sign word. "Find the switch" is enabled once 900 °C has been seen (the brief: "after the third chip") and has its own row, because it clipped beside the readouts at 390 px. The "estimate from 25 °C data" caption is folded into the switch label ("switch ≈ 845 °C (25 °C data)"). The measured 890 °C figure from brief claim 4 is not shown to the learner; it sits in claim c5 for the fact-checker.

## Pre-flight v1

1. **Title and hook.** "When limestone lets go" / "Breaking limestone soaks up heat. So can it ever happen by itself, and when?" No temperature given.
2. **Options.** "about 100 °C", "about 400 °C", "about 850 °C", "about 2,000 °C": all numbered, same precision.
3. **Locked stage.** The ΔH bar "ΔH (heat in): 179 kJ" (given by the question's "absorbing heat"), an empty dashed TΔS slot, axis 0-200 kJ, readouts "–". No crossover line or tick.
4. **Reveal values.** "179 kJ": constant (ΔH label). "+131 kJ": milestone t25 (readout). "−9 kJ": milestone t900 (readout). "845 °C": milestone switch (switch label and line).
5. **QA path.** DOM order "25 °C" (t25), "500 °C", "900 °C" (t900), "Find the switch" (switch): all three milestones by press 4. At the reveal both bars, the switch line and label, and both readouts are on screen.
6. **Reset.** No Reset; readouts and the switch never clear. Reveal text from the QA run: "At 25 °C the TΔS bar was far shorter than the 179 kJ of heat needed, so ΔG was +131 kJ and nothing happened. At 900 °C it passed the heat bar: ΔG was −9 kJ and limestone breaks up by itself. The switch sits near 845 °C, where TΔS equals ΔH. Making a gas raises entropy, and temperature multiplies that gain. Absorbing heat does not forbid a change; it sets the temperature where it starts." (The first sentence names the TΔS bar at 25 °C; after the path the bar shows 900 °C, and the 25 °C state survives as the readout "+131 kJ".)
7. **Phone fit.** Measured 2026-10-14 against :3530 with a scratchpad copy of `tools/reveal-fit.mjs` whose only change is longer page-load timeouts: verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 83 reveal words (with the verdict line), picScale 1 (smallest SVG text 10.5 px). Screenshot `artifacts/reveal-fit/limestone-crossover.png`.

## QA (local)

Computer-use QA 2026-10-14 against the shared dev server :3530: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J slugs> QA_OUT=artifacts/qa-wavej-chemistry npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=300000`. The `--timeout` flag raises only the per-test time budget (the config's 45 s ran out on page load, with the server at 15-60 s a page); no check was changed. Result: phone and desktop pass. Not run: next build, npm run verify (shared machine), walkthrough.

## Revision v2 (demo-builder, 2026-10-14, wave-J fact-check disputes)

Fact-check 2026-10-14 held c5 (W-675): the 'measured decomposition about 890 °C' sentence had no openable source. Withdrawn from the claim (it was never shown to the learner); the claim keeps only the 845 °C estimate, which was verified on derivation. Took the non-blocking note too: the recall why now reads 'Limestone switches near 850 °C (an estimate from 25 °C data).' c5 reset to unverified; no stage change.

Local checks, 2026-10-14, own dev server :3600 (worktree, NEXT_DIST_DIR=.next-fix): computer-use QA (unmodified tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wj-disputes) phone and desktop pass for all 8 wave-J dispute lessons; npm run check passed; tsc --noEmit clean. No stage change, so reveal-fit was not re-run.

## v3: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/limestone-crossover/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Rule on the stage: 'ΔG = ΔH − TΔS. Negative ΔG: it goes by itself.'
- TΔS glossed and in kelvin: locked label 'TΔS = T in kelvin × entropy gain'; at a chip 'TΔS at 900 °C (1,173 K): 188 kJ'. Switch caveat '(25 °C data)' became '(estimate)'. c3, c4, c5 rewritten (unverified).

## Pre-flight v3

1. Unchanged.
2. Unchanged (all numbered).
3. Locked: ΔH bar and an empty TΔS slot; no switch line.
4. Reveal values unchanged (milestones t25, t900, switch).
5. QA path unchanged.
6. Reset: no Reset (about 69 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 83 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
