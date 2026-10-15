# Build note: the-doctor-picks-the-patients (demo-builder, wave-j-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.md` Round 4 item 58. Status draft, version 1. Claims c1-c4 unverified.

- Stage: one SVG. Legend "Chance to recover: 30% [gradient] 90%" (dark = frail, pale = fit). 40 dots in 4 x 10 unassigned; on assignment they move (0.35 s, cx/cy transition, off under reduced motion) into two boxes "Drug" / "No drug" (4 x 5 each, ordered by chance), each with "expected: x of 20". Bottom line "Gap: ±g recoveries" plus a trace of the other split ("Last coin split: a vs b" when the doctor is shown; "Doctor's split: ..." when a coin is shown).
- model.ts: chance_i = 30 + 60 i/39; coinSplit(k) = Fisher-Yates with mulberry32(58 + k), first 20 get the drug (seeds in order, not chosen); doctorSplit = 20 fittest. Values: doctor 15.1 vs 8.9; seed 58: 11.8 vs 12.2; seed 59: 11.8 vs 12.2.
- Presets in DOM order: Coin chooses (seed 58), Coin again (next seed), Doctor chooses. Milestones coin, doctor.
- Departure from the brief: the gap is shown in expected recoveries (difference of the two rounded readouts, e.g. +6.2) instead of points (30.8), so the three numbers on the stage always agree at the stage's rounding. Caption is one sentence: "In this model the drug does nothing."

## Pre-flight v1
1. **Title and hook.** "Who should pick who gets the drug?" / "Forty patients, one drug, twenty doses. Does it matter who decides who gets one?" Names neither the doctor nor the coin as better.
2. **Options.** "The doctor, who knows the patients" / "A coin flip for each" / "Either: with 20 per group it evens out": none numbered.
3. **Locked stage.** Legend and 40 unassigned dots, no boxes, no numbers, buttons disabled.
4. **Reveal values.** 15.1 and 8.9: (b) milestone doctor, recorded. Coin "a against b": (b) milestone coin, the last coin split recorded. "Less than 1 time in 100": told (claim c3), not a stage value.
5. **QA path.** Coin chooses (11.8 vs 12.2, coin) -> Coin again (11.8 vs 12.2, new positions) -> Doctor chooses (15.1 vs 8.9, doctor). At the reveal the boxes show the doctor's split and the trace "Last coin split: 11.8 vs 12.2".
6. **Reset.** No reset control. Reveal on the QA path: "The drug does nothing, yet the doctor's choice gives the drug group 15.1 expected recoveries of 20 against 8.9. She picked the fittest, so fitness passes for a cure. Your coin split gave 11.8 against 12.2. A coin knows nothing about the patients, so fit and frail land on both sides about equally. A gap as big as the doctor's turns up by coin less than 1 time in 100." (70 words)
7. **Phone fit.** See "Measurements" below.

## Measurements (2026-10-14, shared dev server :3530)

- reveal-fit (before a legend-spacing tweak): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 79 words with the verdict (70 reveal). Parts: picture 166, controls 78, text 16 px. Smallest SVG text 10.5 viewBox px at about 1.0 scale. Screenshot artifacts/reveal-fit/the-doctor-picks-the-patients.png.
- The shared dev server answered pages in 25-730 s under load 30-60, so `tools/reveal-fit.mjs` timed out on page.goto (30 s) on every try. The numbers above come from a scratch copy of the tool whose only changes are a 240 s goto timeout and a 120 s lesson-render wait (scratchpad, not committed); the measuring code is unchanged.
- QA (tests/qa/contract.spec.ts on :3530, `--timeout=400000` CLI flag because pages took 1-4 min; spec unchanged): desktop passed in the first run; phone first failed with 'lesson renders' (page still Loading while the dev server recompiled), then passed on rerun (artifacts/qa-wavej-probability-rerun/qa-report.json). Re-measured after the legend tweak: fit, crop 0, namedHidden 0, phoneFit true.

## v2: learner r10 fixes (W-821 (BLOCK), demo-builder, 2026-10-14)

Review: company/reviews/the-doctor-picks-the-patients/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- 'Coin again' replaced by two coin controls: 'Coin picks' (next seed: 58, 59, ...) and '+20 coins' (the next 20 seeds). Every coin gap is kept as a tick on a gap line under the boxes, with the doctor's gap as a red mark and the label 'n coin gaps: lo to hi' / 'Doctor +6.2'. Repeated presses visibly add ticks and change the range.
- Coin boxes draw their dots in the coin's shuffled order (model.ts coinOrder), not sorted by fitness, so each split looks different even when two seeds give the same totals (seeds 58 and 59 both give 11.8 vs 12.2: the brief's seeds in order, not changed).
- Buttons shortened to one row (Coin picks, +20 coins, Doctor picks). Reveal p2 now quotes the learner's tally: 'Your 21 coin splits gave gaps from −2.0 to +1.6, against the doctor's +6.2.' c2 text and source rewritten (reset to unverified); c1, c3, c4 unchanged.
- Not done: finding 4 ('expected: 11.8 of 20' for a beginner) left as is; cm-probability to confirm the reveal wording now that the coin varies.

## Pre-flight v2

1. Title/hook unchanged: 'Who should pick who gets the drug?' / 'Forty patients, one drug, twenty doses. Does it matter who decides who gets one?' No answer pointed to.
2. Options unchanged, none numbered.
3. Locked stage: legend and 40 unassigned dots; no boxes, no gap line, no numbers.
4. Reveal values: 15.1, 8.9 (b, doctor milestone recorded); n coin splits and the gap range (a, the tally in state, on the gap line); the doctor's +6.2 (b, recorded, red mark and label). 'Less than 1 time in 100' told (c3).
5. QA path: Coin picks (seed 58, gap −0.4, milestone coin), +20 coins (seeds 59-78; 21 gaps, −2.0 to +1.6), Doctor picks (+6.2, milestone doctor). All quoted values on the gap line at the reveal.
6. Reset: no Reset control. Reveal on the QA path: 'The drug does nothing, yet the doctor's choice gives the drug group 15.1 expected recoveries of 20 against 8.9. She picked the fittest, so fitness passes for a cure. Your 21 coin splits gave gaps from −2.0 to +1.6, against the doctor's +6.2. A coin knows nothing about the patients, so fit and frail land on both sides about equally. A gap as big as the doctor's turns up by coin less than 1 time in 100.' (about 71 words)
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 86 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
