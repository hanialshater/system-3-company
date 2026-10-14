# Fact-check: drop-on-the-train (2026-10-14)

Board: the cm-physics round-4 drafts (no fact-check board item; W-581 is the duck objection). Lesson: src/demos/physics/drop-on-the-train/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: artifacts/scratch/cm-physics-r4/check.mjs, re-run in full. The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: O. Certik, Theoretical Physics (git clone of github.com/certik/theoretical-physics; Maxwell's equations in src/elmag/elmag.rst); the PDG 2026 database (PyPI pdg 2026.0, pdg.sqlite, section S028); ht 1.2.0 (ASHRAE and DIN EN 12524 insulation tables, Churchill-Chu correlation); CoolProp 8.0 (air properties); chemicals 1.5.2 (CRC heat of fusion of water); iapws (IAPWS-06 ice Ih density). Not opened: Halliday-Resnick-Walker, Kundu and Cohen, Griffiths, Incropera. Every verdict that would have rested on them rests on a derivation instead, and the note says so.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Verified by derivation, not by the cited Halliday chapter (not opened; web blocked). Once released, the only force on the ball is vertical (no air resistance relative to the sealed carriage, c4), so its horizontal velocity stays at the train's v. Under x' = x - vt the acceleration is unchanged, so the fall in the carriage frame is the same as at rest. Support could be 'derivation'. |
| c2 | verified | Derivation: sqrt(3.6/9.81) = 0.6058 s, shown 0.61 s. |
| c3 | verified | Derivation and code: 20 x 0.6058 = 12.12 m, 40 x 0.6058 = 24.23 m; the ball lands at carX + 30 px, the hand's spot, 0 cm. Path note (not blocking): if the platform view is first opened at 40 m/s, the reveal's 'the same drop ... the train moved 24.2 m' follows a sentence about 20 m/s; still true, but 'the same drop' then refers to the 40 m/s drop. |
| c4 | verified | Derivation: 0.5 x 2 x 0.6058^2 = 0.367 m (37 cm). Not on the stage. |
| c5 | verified | Convention, checked: PX = 10, VY = 40 (4x), CW = 56 px; caption 'Heights drawn 4x taller'. |

**Result:** no disputes. All claims verified.
