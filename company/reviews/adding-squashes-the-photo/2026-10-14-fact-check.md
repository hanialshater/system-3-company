# Fact-check: adding-squashes-the-photo (2026-10-14)

Board: W-659. Lesson: src/demos/math/adding-squashes-the-photo/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: 6/4 = 1.5, 4 x 1.5 = 6, 6 x 1.5 = 9, 9/6 = 1.5; check A2 re-run. |
| c2 | verified | Arithmetic: 6 x 8 ratio 1.33, 8 x 10 ratio 1.25, 8 x 12 ratio 1.5; onRay matches; r2() prints 1.33, 1.25 and 1.5. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/math.mjs. |
| c3 | verified | Derivation: with the anchor at the origin, (w, h) lies on y = 1.5x exactly when h/w = 1.5 (same orientation, short side across). |
| c4 | verified | Derivation: adding d to sides a < b raises them by d/a > d/b. Recall: 10 x 15 scaled by 0.4 gives 4 x 6; subtracting 6 gives 4 x 9, a different ratio. Checks out. |

**Result:** no disputes. All claims verified.
