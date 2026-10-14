# Fact-check: divide-six-by-zero (2026-10-14)

Board: W-659. Lesson: src/demos/math/divide-six-by-zero/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: 6/3 = 2, 6/1 = 6, 6/0.1 = 60. JavaScript gives 59.999..., but count() rounds to 60 and the jug draws 60 bands. |
| c2 | verified | Definition: a / b is the q with q x b = a (the measurement reading of division). |
| c3 | verified | Derivation: q x 0 = 0 for every q, so no q solves q x 0 = 6, and 6/0 is undefined in the real numbers. Recall (5/0) checks out. Scope note: the claim is about ordinary (real-number) arithmetic. Some extended systems (the projective real line) write 6/0 = infinity, but there infinity is not a number that times 0 gives 6, so 'No number works' stands. |
| c4 | verified | Derivation: 6/s > N whenever 0 < s < 6/N, so 6/s is unbounded as s -> 0+, and no real q satisfies q x 0 = 6. |
| c5 | verified | Arithmetic: 3 x 2 = 6 (the hook). |

**Result:** no disputes. All claims verified.
