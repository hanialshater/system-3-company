# Build note: city-poll-nation-poll (demo-builder, 2026-10-13)
- Retitled "1,000 voters: city or nation?" (the slug's brief title did not leak, kept the slug).
- Stage: 40 seeded polls (mulberry32 seed 2026, untuned, same seed for every size) of 1,000 people drawn without replacement from a 50%-yes population, as a dot plot; shaded band = 95% margin. Dots outside the band are red. Margin of error is defined on the stage and in the question.
- Controls: population buttons 300 million (start, active), 1 million, 100,000, 10,000, 2,000 in DOM order, so QA visits every value the question and reveal name.
- Gate: 2 milestones, "city" (100,000) and "half-the-crowd" (2,000). Margin readout and dots hidden while locked.
- Numbers: margin() in model.ts gives 3.099 / 3.097 / 3.084 / 2.940 / 2.192; question, readouts and reveal all call it.
- Seed 2026 is luckier than typical (40/40 inside at 300M; median over seeds 1-200 is 38/40): stated in c5; the reveal does not quote inside-counts.

## Revision v2

Learner review 2026-10-13. The stage varied only the population, so "it is how many are asked" was told. Added three buttons (nation, ask 250 / 1,000 / 4,000) as milestones; the reveal quotes the margins from them. The key now says "Red: missed". New claim c8 (the 250 and 4,000 margins), unverified; c6 back to unverified. Not done: an explanation of why +-3 comes from 1,000 people.
