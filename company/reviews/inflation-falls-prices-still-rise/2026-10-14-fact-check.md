# Fact-check: inflation-falls-prices-still-rise (2026-10-14)

Board: W-679. Lesson: src/demos/economics/inflation-falls-prices-still-rise/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). No economics check script exists under company/domains/briefs/checks/, so I re-ran the brief's inline Check lines (company/domains/briefs/economics.md #60-#64). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: every claim is arithmetic, a derivation or a lesson rule.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation, re-run from PATH: 100.00, 108.00, 114.48, 119.06, 122.63, 125.08. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/infl.mjs. |
| c2 | verified | Definition, not a source: the stage chip sets the rule (each year's rate applies to last year's price), so the rate is the yearly percentage change of the level and any rate above 0 multiplies the price by more than 1. Verified as the lesson's own definition. |
| c3 | verified | Derivation: 125.0836 x (1 + 0) = 125.0836, shown $125.08. The 'zero' milestone is required, so the reveal's sentence always matches a bar the learner saw. |
| c4 | verified | Derivation: 125.0836 x 0.99 = 123.8328, shown $123.83; p(1 + i) >= p for every i >= 0, so only i < 0 lowers the level. The 'negative' milestone is required. |
| c5 | verified | Lesson rule: RATES is the brief's illustrative path; the reveal says 'Made-up rates, not a forecast'. |

**Result:** no disputes. All claims verified.
