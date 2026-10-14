# Build note: pcr-not-quite-doubling (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Copying DNA, almost perfectly" (the brief's slug and title say "not quite doubling").
- Design: log-scale chart of copies against cycles; dashed grey = perfect doubling, coloured = the learner's efficiency. Preset buttons 90, 80, 95, 100 then a 80-100% slider. All numbers (counts, percent, 0.95, 0.21) come from count()/ratio() in Demo.tsx; checked in node (1.9^30 = 230,466,618, ratio 0.2146).
- Model label on the locked stage: one molecule, fixed efficiency, no plateau (also reveal, c3).
- Gate: milestone "ninety" when the efficiency is 90% (first button). Counts and the coloured curve are hidden while locked.
- Claims all unverified.

## Revision v2

Input: latest learner review (and fact-check). Log chart argued for the wrong answer. Added a straight-scale bar (perfect vs chosen, "21% of perfect"); gridline label explains each is 1,000 times more; question says PCR copies DNA; stage snaps to 90% in the reveal. c3 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 2, `format` set, edited claims are unverified for the fact-checker.
