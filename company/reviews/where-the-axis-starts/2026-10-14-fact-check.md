# Fact-check: where-the-axis-starts (2026-10-14)

Board: W-655. Lesson: src/demos/probability/where-the-axis-starts/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (poll.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. The brief check script was also re-run (brief 60: 1.08, 1.33, 3.00).

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation re-run: (56 - s)/(52 - s) is 1.0769, 1.3333 and 3.0000 for s = 0, 40 and 50; the bars are drawn as value minus start (yOf). |
| c2 | verified | Derivation: 56/52 = 1.0769, shown as 1.08. Recall check: 95/91 = 1.044 ('about 4%'), and the bars from 90 are 5 against 1. |
| c3 | verified | Derivation: (b - s)/(a - s) = b/a for all a and b only when s = 0. The claim stays within the brief's limit (bar lengths only). |
| c4 | verified | Convention, consistent: the caption 'Pass rates at two invented schools.' is on the stage. |

**Result:** every claim verified; no disputes. Non-blocking notes, if any, are in the Basis column (the builder owns any wording fix).
