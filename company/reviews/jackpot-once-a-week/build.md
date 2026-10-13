# Build note: jackpot-once-a-week (demo-builder, 2026-10-13)
- Retitled "One ticket a week until you win" (brief title kept as slug; it did not leak, but the hook needed the odds).
- Stage: a log time axis 1 to 10 million years ("each tick is 10 times longer", said on stage), a filled bar to the current span, a "lifetime" mark at 80 years.
- Controls in DOM order: 1 year, 10 years, 80 years, 1,000 years, 100,000 years, "Until a win is expected", "Until this run wins". The expected-wait button does not show its number, so the answer is not on a locked button.
- Gate: 2 milestones, "lifetime" and "expected". Chance readout hidden while locked.
- Seeded run: one mulberry32 draw (seed 1969, untuned) inverted through the geometric distribution: first win at 6.6 million years, after the expected wait. The reveal mentions it only if the learner pressed "Until this run wins".
- Numbers: tickets(), chanceBy(), EXPECTED_YEARS in model.ts. Brief's 0.0014% and 5.6 million years reproduced.
