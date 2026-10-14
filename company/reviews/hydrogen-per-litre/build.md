# Build note: hydrogen-per-litre

Builder: demo-builder (wave-j-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.energy-rates.md` #8. Status draft; every claim unverified.

Departures from the brief: the axis runs 1 kJ to 1 GJ (6 decades, labels at 10^3, 10^5, 10^7, 10^9 J) instead of 1 kJ to 100 MJ, because hydrogen's 142 MJ/kg would run off a 100 MJ axis. The liquid-hydrogen ghost bar has its own third row (dashed) rather than sitting on top of the gas bar, so both per-litre hydrogen values stay readable. Because the reveal quotes the per-kilogram values while the stage shows per litre, a readout row keeps them ("Per kg: H₂ · petrol 142 MJ · 48 MJ") and the per-litre ratios ("gas ×2,900 · liquid ×3.4"); both fill only when their view has been seen. The ×3.0 per-kg ratio is not shown (the question gives "about 3 times"). The reveal says "about 3.4 times less" (stage rounding) where the brief draft said "about 3 times less". "Liquefy" is a toggle ("Back to gas only") so it never presses without effect.

## Pre-flight v1

1. **Title and hook.** "Fill the same tank" / "Hydrogen beats petrol kilogram for kilogram. Now fill the same tank with each." No ratio, no direction for the per-litre case.
2. **Options.** "about 3 times more", "about the same", "about 30 times less", "about 3,000 times less". Three are numbered; "about the same" (the brief's wording) is not. It is a wrong option, so the right option is not the only precise one.
3. **Locked stage.** Log axis with gridlines and tick labels "1 kJ, 100 kJ, 10 MJ, 1 GJ", two dashed empty slots "petrol (octane)" and "hydrogen", caption "octane for petrol · water formed as liquid", readouts "–". No bar length or value.
4. **Reveal values.** "142 MJ", "48 MJ": milestone per-kg (readout row). "2,900 times": milestone per-litre (readout "gas ×2,900"). "12 kJ", "34 MJ": per-litre bar labels (milestone per-litre; on the stage in the per-litre view, which is where the QA path ends). "0.08 g": told context (claim c3). "3.4 times": milestone liquid (readout "liquid ×3.4").
5. **QA path.** DOM order "Per kilogram" (per-kg), "Per litre (gas, 1 atm)" (per-litre), "Liquefy hydrogen (−253 °C)" (liquid): all three milestones in 3 presses. At the reveal the per-litre bars, the ghost bar and both readouts are on screen.
6. **Reset.** No Reset. "Per kilogram" after the path switches the bars to per kg (the 12 kJ / 34 MJ labels go, the readouts stay). Reveal text from the QA run: "Per kilogram hydrogen won, about 142 MJ against 48 MJ for petrol. Per litre it lost by about 2,900 times: a litre of hydrogen gas at room pressure weighs only 0.08 g, so it carries about 12 kJ, while a litre of petrol carries about 34 MJ. Even liquefied at −253 °C, hydrogen holds about 3.4 times less per litre. Which fuel is “best” depends on whether you are short of mass or short of space."
7. **Phone fit.** Measured 2026-10-14 against the shared dev server :3530 with a scratchpad copy of `tools/reveal-fit.mjs` whose only changes are longer page-load timeouts (the dev server took over 30 s per page, past the tool's fixed goto timeout): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 84 reveal words (tool count, with the verdict line). Screenshot `artifacts/reveal-fit/hydrogen-per-litre.png`. Picture drawn at 169/176 px (scale about 0.96); SVG text is 11 px or more, so the smallest label renders at about 10.6 px. Re-measured after that change: same numbers.

## QA (local)

Computer-use QA 2026-10-14 against the shared dev server :3530: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J slugs> QA_OUT=artifacts/qa-wavej-chemistry npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=300000`. The `--timeout` flag raises only the per-test time budget (the config's 45 s ran out on page load, with the server at 15-60 s a page); no check was changed. Result: phone and desktop pass. The phone run failed once on the console error "Can't perform a React state update on a component that hasn't mounted yet" (desktop passed in the same run); a phone-only re-run passed (QA_OUT=artifacts/qa-wavej-chemistry-h2). The lesson has no effect or render-time state update, so I read it as a dev-server hot-reload flake while other agents edited files, but the next QA should watch for it. Not run: next build, npm run verify (shared machine), walkthrough.

## v2: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/hydrogen-per-litre/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Log axis replaced by a linear one: 0-150 MJ per kg (142 vs 48 now look 3× apart) and 0-35 MJ per litre, where hydrogen gas is a hairline drawn at the 1.5 px minimum and labelled 'hydrogen gas: 0.012 MJ/L (12 kJ), a hairline'. Reveal adds '(0.012 MJ, the hairline)'.
- Footnote 'octane for petrol · water formed as liquid' removed from the stage (c2 keeps the convention). c2, c3 rewritten (unverified).

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Locked: empty slots, no axis ticks, no values.
4. Reveal values computed from constants (unchanged).
5. QA path unchanged.
6. Reset: no Reset (about 74 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 88 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
