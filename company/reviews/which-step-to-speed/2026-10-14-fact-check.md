# Fact-check: which-step-to-speed (2026-10-14)

Board: W-639. Lesson: src/demos/chemistry/which-step-to-speed/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (chem.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. No wave-J chemistry check script exists, so I re-ran the brief's inline Check (#15) and also checked it against an independent RK4 integration. I checked the reworked controls (toggles plus 'Only step 1 x10') on every order of presses: the legend rows and half-times stay correct, and the reveal's 0.80 s is the step-1-only state.

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: the closed form checked against my own RK4 integration of dA/dt = -k1 A, dB/dt = k1 A - k2 B. The half-times agree to 4 decimals for all four (k1, k2) pairs. Atkins not needed. |
| c2 | verified | Re-run in node with my own copies of C() and halfTime() and an independent RK4: 7.0320, 6.9415, 0.7984 and 0.7032 s, shown as 7.03, 6.94, 0.80 and 0.70 s. 7.03/6.94 = 1.013, so 'almost no sooner' is right. |
| c3 | verified | Derivation: as k2/k1 -> infinity, C(t) -> 1 - exp(-k1 t), and the half-time -> ln 2/k1 = 6.93 s; c2 shows it numerically. 'Rate-determining step' is the name of this limit (terminology). No outside fact rests on Atkins. |
| c4 | verified | Convention, consistent: k1 = 0.1 /s and k2 = 10 /s match the question's 'step 2 is 100 times faster'; no real reaction is named. |
| c5 | verified | Derivation within the model: only a change to k1 moves the half-time much (7.03 -> 0.80 s, against 7.03 -> 6.94 s). With k2 >> k1, B stays tiny and material waits as A (the 'queue'). The general remark about catalysts is not used as evidence. |

**Result:** every claim verified; no disputes. Non-blocking notes, if any, are in the Basis column (the builder owns any wording fix).
