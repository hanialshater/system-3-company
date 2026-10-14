# Fact-check: tug-of-war-scale (2026-10-14)

Board: the cm-physics round-4 drafts (no fact-check board item; W-581 is the duck objection). Lesson: src/demos/physics/tug-of-war-scale/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: artifacts/scratch/cm-physics-r4/check.mjs, re-run in full. The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: O. Certik, Theoretical Physics (git clone of github.com/certik/theoretical-physics; Maxwell's equations in src/elmag/elmag.rst); the PDG 2026 database (PyPI pdg 2026.0, pdg.sqlite, section S028); ht 1.2.0 (ASHRAE and DIN EN 12524 insulation tables, Churchill-Chu correlation); CoolProp 8.0 (air properties); chemicals 1.5.2 (CRC heat of fusion of water); iapws (IAPWS-06 ice Ih density). Not opened: Halliday-Resnick-Walker, Kundu and Cohen, Griffiths, Incropera. Every verdict that would have rested on them rests on a derivation instead, and the note says so.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation (Halliday et al. not opened): for a massless scale T_right - T_left = m a = 0, and a spring in series carries that one tension. Wording note for demo-builder (not blocking): the reveal's 'it can only be stretched if both ends are pulled equally' is true for the idealised massless scale at rest (c4), but not for a real scale that is accelerating. 'At rest, it is stretched only when both ends are pulled equally' would be exact. |
| c2 | verified | Derivation: Newton's third law. The rope pulls the wall 100 N and the wall pulls the rope 100 N; the stage draws the right-hand arrow as 100 N. |
| c3 | verified | Check script re-run (artifacts/scratch/cm-physics-r4/check.mjs, 'scale'): 100, 100, 200 N; Demo.tsx PULL matches; the Seen row and reveal quote PULL at each milestone. |
| c4 | verified | Convention, checked against the code: half-length 22 + 0.05 px/N, arrows 0.12 px/N; massless, at rest. |

**Result:** no disputes. All claims verified.
