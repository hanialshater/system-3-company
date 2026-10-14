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
