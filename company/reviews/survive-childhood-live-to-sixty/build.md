# Build note: survive-childhood-live-to-sixty

Builder: history-builder-2 (demo-builder) · 2026-10-14 · brief company/domains/briefs/history.md #1 · branch history-build-2. Kept from evaluators until they report.

- Data: SURVIVORS in Demo.tsx is HalleyLifeTable.csv column `number` (ages 1-84) with 1,238 at age 0, copied from the pinned file (history-data.mjs: halley). Stage and reveal values are computed live with the check script's trapezoid rule: e0 27.87 -> 28, 30 + e30 57.7 -> 58, 60 + e60 72.1 -> 72, died before 5 40.9% -> 41% (506 of 1,238). These match history-cycle1-check.mjs section 1.
- Deviation from the brief: the brief names two milestones (`birth`, `at30`). The reveal also quotes 41% and 72, so `under5` and `at60` are milestones as well (minInteractions 4), so that every quoted value is gated (demo standard, "the reveal quotes what you saw"). The QA path presses all four anyway.
- Every preset leaves a trace: a dashed line and label ("from birth: 28", "from 30: 58", "from 60: 72") and the red shaded "41% died before 5" stay on the chart. The current preset is in the domain colour, with the people it counts shaded under the curve.
- Title and hook are mine (the brief gives none): "When life expectancy was 28" / "A newborn in late-1600s Breslau could expect about 28 years. What about a 30-year-old?" For cm-history to confirm.
- Optional caption "Edmond Halley, 1693" (held source) was left out, so the lesson has no held sentence.
- Stage text at the end of the QA path, about 22 words plus tick numbers.

## Pre-flight v1
1. **Title and hook.** "When life expectancy was 28" / "A newborn in late-1600s Breslau could expect about 28 years. What about a 30-year-old?" Both state the given (28 at birth) and ask about the 30-year-old without giving any age.
2. **Options.** "About 58" / "About 45" / "About 31": all numbered, same form.
3. **Locked stage.** The survivor curve (0-84, y ticks 0/500/1,000, "alive, of 1,238 born"), "Make a prediction to start.", four disabled presets, readout "Average age at death -". No average, no marker, no shading.
4. **Reveal values.** 1,238: the cohort, on the stage from the start (axis label). 41%: (b) milestone `under5`, on stage as the red area label. 28: (b) milestone `birth`, dashed line label. 58: (b) milestone `at30`, the question's own case, dashed line label. 72: (b) milestone `at60`, dashed line label and readout. All computed from SURVIVORS.
5. **QA path.** DOM order: Average from birth, Deaths before age 5, Average from age 30, Average from age 60: four presses reach all four milestones, including the question's case (at30). All four traces are still drawn when the reveal opens.
6. **Reset.** No Reset control (brief rule). Pressing any earlier preset after the path keeps every trace; the reveal text is constant: "Of 1,238 babies born in a year, about 41% died before age 5, and that pulled the average from birth down to 28. People who got through childhood usually lived much longer: from 30, the average death came at about 58, and from 60 at about 72. Life expectancy at birth averages over everyone, infants included, so a low number does not mean adults died young. Where it stops: this is one city's records over five years."
7. **Phone fit.** `REVEAL_FIT_TIMEOUT_MS=300000 node tools/reveal-fit.mjs --url http://localhost:3622 survive-childhood-live-to-sixty` (2026-10-14): verdict fit, crop 0 px, namedHidden 0 (30, 60, average from birth, 72 all visible), phoneFit true, 80 words (77 reveal + verdict). The picture is fitted to 169/198 at the reveal, so 12 px viewBox labels render at about 10.2 px (at or above the 10 px floor); at predict they render larger. Screenshot `artifacts/reveal-fit/survive-childhood-live-to-sixty.png`.

QA: `tests/qa/contract.spec.ts` phone + desktop passed (artifacts/qa/survive-childhood-live-to-sixty/). Claims c1-c6 unverified.

Risk for cm-history: as the brief specifies, the locked stage shows the survivor curve. A learner who reads curves could estimate the answer from it before committing. Hiding the curve until the commit is the alternative, if the evaluators judge this "points to the answer".

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- cm-history ruling (W-868), reversing brief 1: the locked frame shows the axes, the "alive, of 1,238 born" label and "Make a prediction to start." only; the survivor curve is drawn from the first preset on. The aria-label describes axes only until then. Checked in a browser: 0 curve paths before the commit (screenshot in the session scratchpad).
- Pre-flight 3 (locked stage) now: axes, label, message, disabled presets, readout "-"; no curve.
- No claim text changed.
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 80 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/survive-childhood-live-to-sixty.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
