# Build note: average-that-never-settles (demo-builder, 2026-10-13)
- Substitute for brief 16 (fake-the-coin-flips), skipped because its answer is wrong as worded (see the wave report): P(a run of 5+ heads OR tails in 20 flips) = 0.458, not 0.25. 0.2499 is the heads-only figure.
- Intent: five die running averages (pinned at 3.5) and five Cauchy running averages (jumping) on one chart up to 20,000 draws. 'New draws' gives five new runs.
- Gate: 2 milestones, 10,000+ draws, then new draws at that length.
- After screenshots: the first build drew one Cauchy run. On the QA path, 'New draws' landed on a calm run that drifted to 0, which supports the misconception. Five runs per batch now show the spread every time (all five within +/-1 in 4 of 200 batches).
