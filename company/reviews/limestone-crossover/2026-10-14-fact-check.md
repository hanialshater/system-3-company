# Fact-check: limestone-crossover (2026-10-14)

Board: W-639. Lesson: src/demos/chemistry/limestone-crossover/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (chem.mjs, nasa.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. No wave-J chemistry check script exists, so I re-ran the brief's inline Check (#18). I gave **c5** special attention. The 845 °C estimate is verified. The 'measured about 890 °C' sentence is held: no measurement source could be opened, though the NASA TM-4513 data put dG° = 0 at 893 °C.

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Opened: the CRC table (chemicals 1.5.2) gives calcite -1,207.6 and 91.7, CaO -634.9 and 38.1, CO2 -393.5 and 213.8. JANAF 1998 gives CO2 -393.522 and 213.795. CODATA not opened; the -393.51 and 213.79 figures agree. 'Calcite differs by about 1 kJ/mol between tables' checked: NASA TM-4513 (Barin 89) gives -1,206.9 and 92.9; with those, the crossover moves by under 1 °C. |
| c2 | verified | Derivation re-run: dH = +179.19 kJ/mol, dS = +160.19 J/(mol K). |
| c3 | verified | Verified on derivation (Atkins not opened): at constant T and p the second law gives dG <= 0 for a spontaneous change. The stage applies dG° at 1 bar CO2, the condition stated in the question. |
| c4 | verified | Derivation re-run: TdS 47.76, 123.85 and 187.93; dG +131.43, +55.34 and -8.74. The stated model is on the stage ('(25 °C data)' on the switch label). With the full NASA TM-4513 data, dG° is +130.9, +57.7 and -1.0 kJ/mol: the signs and verdicts are unchanged. Non-blocking: the 900 °C readout shows -9 kJ where the full data give about -1 kJ, so the '(25 °C data)' caveat could also go next to the dG readouts. |
| c5 | unverified | Split. Part 1 verified on derivation: 179,190/160.19 = 1,118.6 K = 845.5 °C, shown as 845 °C and labelled '(25 °C data)'. Part 2 ('Measured decomposition at 1 bar CO2 is about 890 °C') held: Greenwood & Earnshaw and the CRC dissociation-pressure table could not be opened. In node, the NASA TM-4513 polynomials (calcite BAR 89, CaO J 6/73, CO2 L 7/88) give dG° = 0 at 893 °C. That is consistent with 890 °C, but it is evaluated data, not the cited measurement. Fix: drop the 'measured' sentence (the brief's instruction), or reword it to 'full-temperature data (NASA TM-4513, McBride et al. 1993) put dG° = 0 near 893 °C' and I will verify. The right option 'about 850 °C' is still the nearest at 893 °C. |
| c6 | verified | Derivation: with dH > 0 and dS > 0, dG < 0 exactly when T > dH/dS. |

**Result:** no disputes. Held unverified: c5, because the source could not be opened (see the notes); publishing waits until these are withdrawn or sourced. Everything else is verified.

Non-blocking note: the recall's 'why' says "Limestone switches near 850 °C" without the word "estimate". That is the same figure as c5 part 1 (the 25 °C estimate), while the full data give about 893 °C. To fix it, write "near 850 °C (an estimate from 25 °C data)" or "near 850-900 °C". The builder owns the wording.

## Pass 37 (2026-10-14, W-732)

Checker: fact-checker, a fresh instance. I did not write, build or record these claims. Scope: the claims changed by the wave-J dispute fixes (fd53f77, merged in 754195b; meta.json v2). Method: I read Demo.tsx (and model.ts or solar.ts) v2 on every reachable path before I read the claims and then the build note's Revision v2. Then I re-ran the numbers in node and python from my own copies of the lesson logic, not imported from the lesson (scripts: artifacts/fact-check-wave-j/w732/). I did not use the dev server. No walkthrough transcript exists for this slug. Sources opened: only GitHub (raw files and public git clones) and PyPI. Each verdict names the file it rests on, and no verdict rests on an unopened source.

Paths read: the chips 25, 500 and 900 in any order, 'Find the switch' (enabled after 900 C), and the readouts. Stage unchanged in v2; only the claim and the recall why changed.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Pass 37 (W-732): derivation re-run from a copy of Demo.tsx: dH = 179.19 kJ/mol, dS = 0.16019 kJ/(mol K), T_SWITCH = 845.46 C, shown 'switch ~ 845 C (25 C data)' and 'near 845 C' in the reveal; 'about 850 C' is the nearest option. The withdrawn 890 C sentence is gone from claim, stage, reveal and recall. Recall why ('near 850 C (an estimate from 25 C data)') is honest: my own full-data run (NASA TM-4513 via Cantera nasa_gas.yaml and nasa_condensed.yaml, artifacts/fact-check-wave-j/w732/lime.mjs) puts dG = 0 at 893 C, so the 25 C figure is correctly labelled an estimate. The recall's answer ('above some temperature, where TdS outgrows dH') rests on c6 (verified). |

**Result:** c5 verified. All six claims are now verified.
