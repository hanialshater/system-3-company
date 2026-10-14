# Fact-check: two-routes-to-co2 (2026-10-14)

Board: W-639. Lesson: src/demos/chemistry/two-routes-to-co2/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (chem.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. No wave-J chemistry check script exists, so I re-ran the brief's inline Check (#12).

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Opened: CRC (CO2 -393.5, CO -110.5), JANAF 1998 (-393.522, -110.527) and ATcT 1.112 (-393.474 +/-0.015, -110.525). CODATA itself not opened; the -393.51 and -110.53 figures agree with every opened table to within 0.04 kJ/mol. |
| c2 | verified | Derivation: -393.51 + 110.53 = -282.98 kJ/mol. From the opened tables: JANAF -282.995, ATcT -282.949, CRC -283.0. |
| c3 | verified | Opened: the CRC table gives dfH C(diamond) = 1.9 kJ/mol. The NBS 1982 value of 1.895 was not opened, so the stage's two-decimal '+1.90' rests on CRC's 1.9; the claim says 'about'. Node: -393.51 - 1.90 = -395.41, and the diamond route sums to -393.51. The 3 px drawing exaggeration is disclosed in this claim and in the code. |
| c4 | verified | Verified on derivation; Atkins not opened. Enthalpy is a state function (H = U + PV of the state), so every route between the same states has the same dH; the three stage sums each add their own steps to -393.51. On 'chemists add measured steps ... cannot measure directly': the CO step on this stage is such a case. From the opened CRC dfG values, 2CO -> C + CO2 has dG° = -120 kJ/mol at 25 °C, so carbon cannot be burned cleanly to CO alone, and its heat is found as the difference of two combustions. |
| c5 | verified | Convention: the disclosure matches Demo.tsx, where each step is drawn as complete at standard values. The 'mixture' remark is consistent with the Boudouard derivation in c4. The claim is not on the stage and makes the model more cautious, not less. |
| c6 | verified | Convention: the analogy claims only path independence, which holds for gravitational potential energy (a conservative force). |

**Result:** every claim verified; no disputes. Non-blocking notes, if any, are in the Basis column (the builder owns any wording fix).
