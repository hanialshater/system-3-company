# Build note: average-that-never-settles (demo-builder, 2026-10-13)
- Substitute for brief 16 (fake-the-coin-flips), skipped because its answer is wrong as worded (see the wave report): P(a run of 5+ heads OR tails in 20 flips) = 0.458, not 0.25. 0.2499 is the heads-only figure.
- Intent: five die running averages (pinned at 3.5) and five Cauchy running averages (jumping) on one chart up to 20,000 draws. 'New draws' gives five new runs.
- Gate: 2 milestones, 10,000+ draws, then new draws at that length.
- After screenshots: the first build drew one Cauchy run. On the QA path, 'New draws' landed on a calm run that drifted to 0, which supports the misconception. Five runs per batch now show the spread every time (all five within +/-1 in 4 of 200 batches).

## v2 (revision 2026-10-13)

Source: 2026-10-13 learner-adult-beginner review and fact-check. Finding -> change:

- Jargon in the question (Cauchy, heavy-tailed) -> question now says 'numbers where a rare draw can be enormous (a Cauchy distribution)'; chip on stage repeats it.
- Chart funnel read as slow settling, contradicting the reveal -> replaced the running-average chart with a dot strip: 30 runs, each dot one run's average after 1/10/100/1,000/10,000 draws. Die dots collapse; Cauchy dots stay as spread (17 of 30 beyond +/-1 at 1 draw, 18 of 30 at 10,000).
- 'No matter how many draws' unvisited -> gate is two milestones: dots seen at 1 draw and at 10,000 (Play order puts 1 draw first, 10,000 fourth, within QA's path).
- Spread claim told -> reveal shows the farthest Cauchy dot and the single draw (about 250,115) inside it; all numbers computed from dots() (seed 1853, untuned).
- Hook leaked ('one that won't') -> 'More data, steadier average. Does that always hold?'. Claim c4 rewritten, unverified.
