# Fact-check: quarters-add-to-a-third (2026-10-14)

Board: W-659. Lesson: src/demos/math/quarters-add-to-a-third/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: partial sums 0.2500, 0.3125, 0.3281, 0.3320, 0.3330, 0.3333; S6 = 0.333251953125 = (1 - 4^-6)/3; check A5 re-run. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/math.mjs. |
| c2 | verified | Construction checked in the code: level k draws squares of side S/2^k at the top-left (solid), bottom-left (dotted) and bottom-right (hatched) of the previous leftover, and the leftover is the top-right square, so the three patterns have equal totals. |
| c3 | verified | Derivation: 3 S_n + 4^-n = 1, so S_n = (1 - 4^-n)/3 -> 1/3; the geometric series a/(1 - r) with a = r = 1/4. Recall (1/3 + 1/9 + ... = 1/2, by the same three-part picture) checks out. |

**Result:** no disputes. All claims verified.
