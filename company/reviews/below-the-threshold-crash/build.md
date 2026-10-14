# Build note: below-the-threshold-crash (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Two groups, one species" (the brief title says "crash").
- Design: log-scale chart of animals against 60 years, with a dashed line at the 50-animal threshold. Buttons release a group of 40, 60, 20 or 80 and draw its trail (green above the line, red below, a cross where it falls under 1 animal). Clear removes trails. Deterministic Euler run of dN/dt = 0.1 N (N/50 - 1)(1 - N/1000); the question's 40 and 60 are the first two buttons.
- Node check (artifacts/scratch/w5life/allee2.mjs): 40 under 1 animal by year 54; 60 reaches 1,000; 20 dies out by year 35; 80 reaches 1,000.
- Model label on the locked stage (toy, under 50 shrink, room for 1,000, log scale). Threshold, rate and capacity are invented: said in the reveal and c3.
- Gate: milestones "released-40" and "released-60" (both on the QA path). Trails are hidden while locked. The reveal quotes the learner's released starts and their outcomes, computed from the same simulation.
- Option text rewritten into parallel wording ("Both grow to 1,000" / "The group of 40 dies out; 60 grows" / "Both die out").
- Claims all unverified.

## Revision v2

Learner review round 2. The question no longer states the rule ("These animals need mates nearby to breed"); the locked stage no longer shows the threshold line or the 50, which appear when the stage unlocks. The reveal redraws the lines for every group the learner released, even after Clear. c3 back to unverified. Not changed: the recall question still states the rule.
