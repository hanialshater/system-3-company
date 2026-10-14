# Fact-check: minus-one-flips-the-order (2026-10-14)

Board: W-659. Lesson: src/demos/math/minus-one-flips-the-order/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: -2 > -5; check A4 re-run. |
| c2 | verified | Arithmetic: x2 gives 4 < 10; -3 gives -1 < 2; x(-2) gives -4 > -10 (re-run). The number line runs -10..10, so every endpoint fits. |
| c3 | verified | Derivation: (b + c) - (a + c) = b - a > 0; (b - a)c has the sign of c. |
| c4 | verified | Derivation: x -> -x is the reflection through 0 and reverses order. The stage also draws 'mirror' for x(-2), which is a mirror plus a stretch; the reveal's 'Multiplying by a negative mirrors the line' is right for the order, which is the point. Recall (-3 < 4 divided by -1 gives 3 > -4) checks out. |
| c5 | verified | Derivation: substitution of equals (if a = b then a + c = b + c and ac = bc). |

**Result:** no disputes. All claims verified.
