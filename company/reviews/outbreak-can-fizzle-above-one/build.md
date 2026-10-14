# Build note: outbreak-can-fizzle-above-one

Builder: ncm-c · 2026-10-14 · from brief life.health-epidemiology, Course NCM #1 (simulation run, seeded outbreaks, R chips), accepted version with edits.

- Poisson offspring (Knuth product method), one case to start, a chain past 2,000 cases counts as taking off (the brief's rule). One mulberry32 stream per R, seed 218 + 10R (227, 233, 238, 248), so outbreak n at a given R is fixed whatever the learner did first.
- My own run (node mirror, scratchpad ncmc/outbreak.mjs) at R = 1.5: outbreak 1 took off; 37 of 100, 38 of 101, 418 of 1,000 died out; first case infected 0 or 1 in 49 of 101 and 547 of 1,000. R = 0.9: 1,000 of 1,000 died; R = 2: 237; R = 3: 48. Exact fixed point: 0.4172, 0.2032, 0.0595, 1. P(0 or 1) = 0.5578. The seed formula was not tuned; 101 outbreaks show 38%, below 41.7%, and the reveal says so by quoting the learner's tally next to the exact value.
- Poisson assumption is named on the stage note before the first run ("Poisson spread: ...") and in the reveal, with the more-uneven-spread caveat (claim c6, Lloyd-Smith 2005), per the acceptance edit.
- The why on stage: the latest outbreak's generations as rows of dots, gen 1 (the first case's infections) emphasised, plus a tally "First case infected 0 or 1"; the reveal points at it.
- Controls: 1 outbreak, +100 outbreaks (cap 1,000 per R), R chips 0.9 / 1.5 / 2 / 3. Milestones `first-outbreak`, `hundred-at-main` (100 outbreaks at R = 1.5); QA's first two presses reach both. No reset, so the reveal's R = 1.5 tally is always at least 100.
- Not run here: next build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 7 claims `unverified`.
