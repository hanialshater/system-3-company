# Build note: ninety-five-percent-of-what (demo-builder, 2026-10-13)
- Intent: each press shows 100 seeded pollsters' 95% Wald intervals (n = 1,000, truth exactly 50%; seed 1937, untuned; up to 10 batches) as stacked bars; misses are red. Readouts: misses this batch and running total. The stage says the truth is known only because it is a simulation (c3).
- Gate: 1 milestone, the first batch drawn with at least one miss (seed 1937 gives 7).
- The answer "about 5" is computed from exactMiss() = 5.37%. The reveal quotes the learner's first batch and their running total only if they drew more.
- Taken in place of fake-the-coin-flips (brief 16 skipped: its check 0.2499 is the heads-only probability; for "heads or tails in a row", as the question says, P(run of 5+ in 20) = 0.458, which none of the options match).
- Iteration after screenshots: x-range widened to 40-60% so the widest missing bars are not clipped.
