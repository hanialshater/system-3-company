# Build note: waves-return (demo-builder, 2026-10-13)

- Design: SIRS with the brief's parameters (beta 0.4, gamma 0.2, waning 1/100 per day; 0.1% sick on day 0), Euler 0.01 day, recorded daily to day 900. A 400-dot town fills row by row: hollow = susceptible, red = sick, solid = immune; the dashed outline is half the town (1/R0). Scrubbing shows the hollow block swing around the line (45-60% between waves) and settle on it.
- Brief answer checked: S at day 900 = 50.00%, I = 2.38%; S at each peak 49.96%, 49.99%, then 50.00% (artifacts/scratch/w3life/sirs.mjs mirrors simulate()).
- Reveal gate: milestones "a-peak" (landed exactly on a wave peak, via "Next wave peak") and "settled" (day 700 or later). Control order: Next wave peak, Day 900, day slider, immunity chips (100, 50, 200 days). The reveal lists the peaks the learner visited at 100 days and the exact S at each peak instant.
- Deviation from brief: the brief's key state was "at least two waves"; QA presses each control once, so "Next wave peak" reaches wave 1 only, and the second milestone is day 700+ (which passes six peaks). A stricter gate (wave 2 peak) would need a second press.
- Immunity-length chips show that the 50% level does not depend on immunity length (50 days: 4.5% sick; 200 days: 1.3%, still oscillating at day 900, S 48.9-50.7%).
- Screenshots: fine on phone; no change.
- All claims unverified.

## v2 (revision 2026-10-13)

- Waves were never shown, only snapshots -> a chart under the town draws the susceptible share (grey) and the sick share (red) up to the current day against the dashed 50% line; at day 900 the returning waves and the grey line hugging half are on screen. The refilling mechanism is now the grey line rising when the sick fall.
- 50.7% on the stage vs "50.0%" in the reveal -> peaks are now the daily snapshots the stage prints (local maxima of the daily sick share), so the reveal quotes the same number the learner saw (e.g. wave 1 with 50.7% susceptible) and says "about half" for the rule. Peak days are unchanged (34, 185, 329, ...).
- "Whatever the immunity length" was unvisited -> third milestone: another immunity length chosen at day >= 700 (reached on the QA path by the last chips). Three milestones, minInteractions 3.
- R0, "well mixed" and susceptible undefined -> question defines R0 and "can catch it"; "well mixed" dropped; legend says "susceptible (can catch it)". Title/hook no longer say waves return. Reveal about 80 words.
- The "0/5 claims checked" badge is the verification state, not a defect to fix here; claims c2, c3, c4 rewritten and new c6 added, all unverified.
