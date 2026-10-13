# Build note: pcr-not-quite-doubling (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Copying DNA, almost perfectly" (the brief's slug and title say "not quite doubling").
- Design: log-scale chart of copies against cycles; dashed grey = perfect doubling, coloured = the learner's efficiency. Preset buttons 90, 80, 95, 100 then a 80-100% slider. All numbers (counts, percent, 0.95, 0.21) come from count()/ratio() in Demo.tsx; checked in node (1.9^30 = 230,466,618, ratio 0.2146).
- Model label on the locked stage: one molecule, fixed efficiency, no plateau (also reveal, c3).
- Gate: milestone "ninety" when the efficiency is 90% (first button). Counts and the coloured curve are hidden while locked.
- Claims all unverified.
