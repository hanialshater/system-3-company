# Build note: waves-return (demo-builder, 2026-10-13)

- Design: SIRS with the brief's parameters (beta 0.4, gamma 0.2, waning 1/100 per day; 0.1% sick on day 0), Euler 0.01 day, recorded daily to day 900. A 400-dot town fills row by row: hollow = susceptible, red = sick, solid = immune; the dashed outline is half the town (1/R0). Scrubbing shows the hollow block swing around the line (45-60% between waves) and settle on it.
- Brief answer checked: S at day 900 = 50.00%, I = 2.38%; S at each peak 49.96%, 49.99%, then 50.00% (artifacts/scratch/w3life/sirs.mjs mirrors simulate()).
- Reveal gate: milestones "a-peak" (landed exactly on a wave peak, via "Next wave peak") and "settled" (day 700 or later). Control order: Next wave peak, Day 900, day slider, immunity chips (100, 50, 200 days). The reveal lists the peaks the learner visited at 100 days and the exact S at each peak instant.
- Deviation from brief: the brief's key state was "at least two waves"; QA presses each control once, so "Next wave peak" reaches wave 1 only, and the second milestone is day 700+ (which passes six peaks). A stricter gate (wave 2 peak) would need a second press.
- Immunity-length chips show that the 50% level does not depend on immunity length (50 days: 4.5% sick; 200 days: 1.3%, still oscillating at day 900, S 48.9-50.7%).
- Screenshots: fine on phone; no change.
- All claims unverified.
