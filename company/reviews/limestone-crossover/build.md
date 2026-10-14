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
