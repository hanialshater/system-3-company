# Build note: acid-diluted-a-thousandfold

Builder: demo-builder (wave-i-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.solutions-acids.md` #4. Status draft; every claim unverified.

Departures from the brief: (1) the brief's single stacked bar became three bars on one log axis ("from acid", "from water", "total"), because stacked segments do not add on a log axis. (2) "Dilute ×10" and "Undo" became preset buttons ×10, ×100, ×1,000, ×10,000: QA presses each control once, and a single ×10 button could never reach ×1,000 on that path. The undiluted ×1 state is the opening frame. (3) The reveal no longer quotes the acid and water concentrations at ×1,000 (they are not on the stage once the learner moves on). It quotes the water-to-acid ratio of the bars on screen when it opens (at ×10,000: 100 times; claim c7), plus the recorded pH values, which stay on two readouts. The pH 7 "neutral" line appears only once ×1,000 has been reached. The hook states the rule the lesson then breaks ("Diluting a strong acid tenfold raises its pH by about one"), recorded as claim c1 with its condition.

## Pre-flight v1

1. **Title and hook.** "Acid diluted a thousandfold" / "Diluting a strong acid tenfold raises its pH by about one. What does a thousandfold do?" The hook invites the wrong answer (pH 8) and does not mention water's ions or pH 7.
2. **Options.** "about 5", "about 6", "about 7", "about 8": all numbered, same precision.
3. **Locked stage.** Log axis 10⁻⁴ to 10⁻¹⁰ mol/L with pH 4 to 10 tick labels; bars at ×1: acid 1.0×10⁻⁵, water 1.0×10⁻⁹, total 1.0×10⁻⁵; readouts "pH now 5.00", "pH at ×1,000 –", "pH at ×10,000 –". No neutral line and no highlight at pH 7 (the pH 7 tick looks like every other tick).
4. **Reveal values.** "6.98": milestone "x1000" (readout "pH at ×1,000"). "7.00": milestone "beyond" (readout "pH at ×10,000"). "×10,000" and "100 times": computed from the current state when the reveal opens (the bars' values 1.0×10⁻⁷ and 1.0×10⁻⁹ are labelled). "10⁻¹⁴", "10⁻⁷": told constants (claim c2), the second also drawn as the neutral line.
5. **QA path.** DOM order ×10 (pH 6.00), ×100 (6.79), ×1,000 (6.98, milestone x1000, neutral line appears), ×10,000 (7.00, milestone beyond). Both milestones by the 4th press. When the reveal opens the bars, the neutral line and both recorded pH readouts are on the stage.
6. **Reset.** There is no Reset; the presets move the bars but never clear the two recorded readouts, and the ratio sentence recomputes from whatever is on screen. Reveal from the QA-path run: "At 1,000-fold dilution your pH stopped at 6.98, not 8, and one more tenfold reached only 7.00. On your bars now (×10,000), water itself supplies 100 times more H⁺ than the acid. Water always splits a little: at 25 °C, [H⁺] × [OH⁻] stays 10⁻¹⁴, so neutral water holds 10⁻⁷ mol/L of each. As the acid's share shrank, water's grew, so adding water brings an acid toward pH 7, never past it."
7. **Phone fit.** `node tools/reveal-fit.mjs` at 390×844, 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 77 reveal words (tool count, including the "Not quite" line), phoneFit true, picScale 1. Screenshot `artifacts/reveal-fit/acid-diluted-a-thousandfold.png`. The reveal points at the bars, the two recorded pH values and the neutral level; all visible. Smallest picture label 10.5 px at scale 1; controls 35 px.

Measured on my own `next dev` of this worktree (port 3547), not on :3530 (main checkout). Stage text about 22 words. No console errors. Not run: next build, computer-use QA, walkthrough.

## v2: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/acid-diluted-a-thousandfold/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Reveal p2 rewritten to reconcile the small early water bar with 10⁻⁷: 'Water splits into equal H⁺ and OH⁻, and at 25 °C [H⁺] × [OH⁻] stays 10⁻¹⁴. Strong acid squeezes OH⁻ down, and water's H⁺ comes paired with it, so water's bar started tiny. As the acid thinned, water's share grew toward 10⁻⁷ mol/L each: pH 7, never past it.' (new claim c8; c2, c6, c7 text updated).
- A learner who chose 'about 5' gets a first clause: 'Dilution does move pH.'
- Numbers re-run in node: water H⁺ 1.00e-9, 9.90e-9, 6.18e-8, 9.51e-8, 9.95e-8 mol/L; pH 5.00, 6.00, 6.79, 6.98, 7.00.

## Pre-flight v2

1. Title/hook unchanged.
2. Options 'about 5/6/7/8': same precision.
3. Locked stage unchanged (×1 bars).
4. Reveal values: 6.98 (b, x1000 milestone), 7.00 (b, beyond milestone), ratio on the bars now (a). No new numbers added.
5. QA path unchanged (×10, ×100, ×1,000, ×10,000).
6. Reset: no Reset. Reveal ≤ 90 words (tool 90 incl. verdict and trust link).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 90 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
