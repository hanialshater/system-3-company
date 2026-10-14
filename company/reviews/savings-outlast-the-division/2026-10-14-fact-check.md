# Fact-check: savings-outlast-the-division (2026-10-14)

Board: W-679. Lesson: src/demos/economics/savings-outlast-the-division/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). No economics check script exists under company/domains/briefs/checks/, so I re-ran the brief's inline Check lines (company/domains/briefs/economics.md #60-#64). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: every claim is arithmetic, a derivation or a lesson rule.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: n = -ln(1 - 0.05 x 500/40)/ln 1.05 = 20.103; stepping gives 20 full withdrawals with $4,011 left (the source note says $4,013: a typo, not learner-facing), then a partial 21st. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/sav.mjs. |
| c2 | verified | Arithmetic: 0.05 x 500,000 = 25,000; 40,000 - 25,000 = 15,000. |
| c3 | verified | Derivation: the yearly fall is W - 0.05b, which grows as b shrinks, so the drawn line steepens toward zero. |
| c4 | verified | Derivation: 500,000 x 1.05 - 25,000 = 500,000 every year; life(25, 5) = Infinity, readout 'never runs out'. |
| c5 | verified | Arithmetic and derivation: 500/40 = 12.5. For r > 0, -ln(1 - x) > x and ln(1 + r) < r, so n > (rP/W)/r = P/W: division undercounts whenever the money earns. Slider values at 5%: $30k 36.7, $50k 14.2, $60k 11.0 years. |
| c6 | verified | Lesson rule: path() has a constant rate, end-of-year withdrawals and no inflation, tax or fee terms. Stage note (not a claim): at $20k a year the balance passes the chart's $600k top in year 15 and is then drawn flat along the top edge (py clamps at BMAX); the readout correctly says 'never runs out'. |

**Result:** no disputes. All claims verified.
