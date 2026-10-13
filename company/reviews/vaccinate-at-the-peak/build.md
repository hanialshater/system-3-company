# Build note: vaccinate-at-the-peak (demo-builder, 2026-10-13)

- Design: a 400-dot town showing the final outcome for the chosen vaccination day: red = ever infected, green = vaccinated, hollow = never infected; the dashed outline is the no-vaccine final (94%). Chips: Day 0, Peak (day 19), Day 40, Never; a day slider (0-60). The message gives the share not yet infected on that day and the final infected share.
- Brief numbers did NOT reproduce. Brief: day 0 50%, peak 56%, 87% of benefit. Same model (beta 0.6, gamma 0.2, 0.1% seed, 20% at once): day 0 70.3%, peak 75.7%, 77.5% of benefit (artifacts/scratch/w3life/vacc.mjs, two step sizes agree). The answer category ("Most") still holds, so I built it with the corrected numbers; the option reads "Most (about 78%)", computed from the stage's runs.
- Assumption-sensitive: 77.5% requires every dose to go to people not yet infected. With doses spread over random people (two thirds already infected at the peak), the peak keeps only 28.6%, which would make "About half" or "Almost none" closer. The targeting assumption is in the question, on the stage before the prediction, and in the reveal with the 29% figure (c4). cm-life may want to re-decide whether this brief teaches the right thing.
- Reveal gate: milestones "day-0", "peak" and "another-day" (any other date, including Never); the first three chips reach them on the QA path. The reveal quotes other days tried with their outcomes.
- After screenshots: paired each tried day with its outcome in the reveal; aligned the claims with the stage's rounding (77.5% shows as 78%).
- No health advice: the reveal says "Model, not guidance". All claims unverified.

## v2 (claim fix 2026-10-13)

Claim c3 disputed ('most infections were still to come' at the peak; 65.5% already infected). Reveal now: 'The peak is not the end of the epidemic: on day 19, 35% of the town had never been infected.' Claim rewritten; unverified.
