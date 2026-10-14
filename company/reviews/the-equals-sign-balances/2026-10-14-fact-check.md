# Fact-check: the-equals-sign-balances (2026-10-14)

Board: W-659. Lesson: src/demos/math/the-equals-sign-balances/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: 8 + 4 = 12 = 7 + 5; check A1 re-run. Beam: diff 0 at box = 7, so it is level. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/math.mjs. |
| c2 | verified | Arithmetic: 12 + 5 = 17, 17 + 5 = 22. angle = sign(diff) x min(10, 2|diff|) > 0, which rotates the beam clockwise, so the right pan goes down ('tips to the right'). The reveal quotes the first wrong value tried. |
| c3 | verified | Definition of equality (a = b: both sides name the same number). The recall ('box + 3 = 6 + 4' gives 7) also checks out. |

**Result:** no disputes. All claims verified.
