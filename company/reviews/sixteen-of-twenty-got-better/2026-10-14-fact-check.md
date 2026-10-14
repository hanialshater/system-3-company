# Fact-check: sixteen-of-twenty-got-better (2026-10-14)

Board: W-655. Lesson: src/demos/probability/sixteen-of-twenty-got-better/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (prob.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. The brief check script was also re-run (brief 57: 3 and 16).

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation re-run in node: PILL_ORDER and NONE_ORDER are both permutations of 0..19, so both rows hold the same day list; days <= 3: 3 of 20, days <= 7: 16 of 20 in each row. |
| c2 | verified | Derivation: the model effect is the treated count minus the untreated count, which is 0 on every day because the rows hold the same list. 'Colds clear up by themselves' is stated as the model ('In this model'), not as a fact about real colds. |
| c3 | verified | Convention, consistent: the caption 'Invented cold, invented pill.' is on the stage, and no medicine is named in Demo.tsx or meta.json. |

**Result:** every claim verified; no disputes. Non-blocking notes, if any, are in the Basis column (the builder owns any wording fix).
