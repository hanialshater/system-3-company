# Fact-check: giving-up-lowers-unemployment (2026-10-14)

Board: W-679. Lesson: src/demos/economics/giving-up-lowers-unemployment/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). No economics check script exists under company/domains/briefs/checks/, so I re-ran the brief's inline Check lines (company/domains/briefs/economics.md #60-#64). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: every claim is arithmetic, a derivation or a lesson rule.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Lesson rule, on the stage chip ('Rate = looking / (working + looking). People not looking are not counted.'); town() computes exactly this. I did not check, and the lesson does not claim, any official (ILO or BLS) definition. |
| c2 | verified | Arithmetic: 10/100 = 10%; 6/96 = 6.25%; jobs 90. town(4, 0). The slider path also checks out (for example 9/99 = 9.09%, 0/90 = 0%). |
| c3 | verified | Arithmetic: 6/100 = 6%; jobs 94. town(0, 4). |
| c4 | verified | Derivation from c1: looking -> not looking lowers the numerator and the denominator by 1 each; looking -> working lowers only the numerator. 6.25% against 6%, with jobs 90 against 94. |
| c5 | verified | Lesson rule; the reveal's last sentence 'A toy town of 100.' |

**Result:** no disputes. All claims verified.
