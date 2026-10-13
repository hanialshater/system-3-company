# Build note: virulence-sweet-spot (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Deadlier germs: do they spread more?" (the slug names the answer).
- Design: the learner plots R0 for harm levels they pick (buttons 0.25, 1, 4, then a 7-step slider); each pick adds a dot and a line joins them. The stage message shows rate x days = R0 (harm 1: 4.0 cases a day for 0.5 days = 2.0), so R0 is explained where it appears. R0 is defined in the question ("new cases per carrier over the whole infection") and on the locked stage.
- Numbers come from rate(), days(), r0() in Demo.tsx; node grid search peaks at v = 1.00, R0 2.000 (artifacts/scratch/w5life/virulence.mjs).
- Gate: three milestones, harm 0.25, 1 and 4 (all on the QA path, in that order). The plot is empty while locked, so the curve does not give the answer away.
- Reveal quotes the harm levels the learner plotted. The reveal says "peaking at harm 1" which the learner has seen via the gate.
- Option letters in the question are the brief's; "toy / chosen square-root link" is stated in the reveal and c3.
- Claims all unverified.
