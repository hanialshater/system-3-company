# Build note: vaccinate-at-the-peak (demo-builder, 2026-10-13)

- Design: a 400-dot town showing the final outcome for the chosen vaccination day: red = ever infected, green = vaccinated, hollow = never infected; the dashed outline is the no-vaccine final (94%). Chips: Day 0, Peak (day 19), Day 40, Never; a day slider (0-60). The message gives the share not yet infected on that day and the final infected share.
- Brief numbers did NOT reproduce. Brief: day 0 50%, peak 56%, 87% of benefit. Same model (beta 0.6, gamma 0.2, 0.1% seed, 20% at once): day 0 70.3%, peak 75.7%, 77.5% of benefit (artifacts/scratch/w3life/vacc.mjs, two step sizes agree). The answer category ("Most") still holds, so I built it with the corrected numbers; the option reads "Most (about 78%)", computed from the stage's runs.
- Assumption-sensitive: 77.5% requires every dose to go to people not yet infected. With doses spread over random people (two thirds already infected at the peak), the peak keeps only 28.6%, which would make "About half" or "Almost none" closer. The targeting assumption is in the question, on the stage before the prediction, and in the reveal with the 29% figure (c4). cm-life may want to re-decide whether this brief teaches the right thing.
- Reveal gate: milestones "day-0", "peak" and "another-day" (any other date, including Never); the first three chips reach them on the QA path. The reveal quotes other days tried with their outcomes.
- After screenshots: paired each tried day with its outcome in the reveal; aligned the claims with the stage's rounding (77.5% shows as 78%).
- No health advice: the reveal says "Model, not guidance". All claims unverified.

## v2 (claim fix 2026-10-13)

Claim c3 disputed ('most infections were still to come' at the peak; 65.5% already infected). Reveal now: 'The peak is not the end of the epidemic: on day 19, 35% of the town had never been infected.' Claim rewritten; unverified.

## Revision v3 (wave C)

R0 rounded for display (no 2.9999999999999996) and explained as 'each sick person infects 3 others'. Options now all qualitative (quarter / half / three quarters). Reveal quotes only the learner's last date instead of every slider step passed. New claim c6 unverified.

## Pre-flight v4

builder: demo-builder (wave G revisions, batch 2) · 2026-10-14 · answers r7 learner review `2026-10-14-learner-adult-beginner-r7.md`

Changes: the reveal's headline arithmetic ("18.4 of the 23.8 points ... 78%") used decimals the stage never shows. It now uses the stage's whole percents: 94 - 76 = 18 of 94 - 70 = 24 points, about 75%. A "Seen" row under the status line keeps every final the reveal quotes ("Seen, infected in the end: none 94% · day 0 70% · day 19 76% · day N x%", plus "Day 19: 35% not yet infected."), so they survive later presses. The day-40 premise clash is answered on stage: from day 23 on, the line reads "only 6% not yet infected, so only 6% vaccinated". c2 reworded, unverified; c7 new (dose cap), unverified. Not changed: the random-doses sentence stays told context (claim c4).

1. **Title and hook.** "Is the peak too late to vaccinate?" / "The epidemic has peaked. Does protecting people now still change the ending?" Open questions; neither rules out "almost none", "half" or "three quarters". No.
2. **Options.** "Almost none of it" / "About half of it" / "About three quarters of it". All words, same precision, none numbered.
3. **Locked stage.** 400 hollow dots, the legend, "Make a prediction to start. Toy: R0 3, 20% vaccinated at once, all not yet infected.", buttons Day 0 / Peak (day 19) / Day 40 / Never and the slider, all disabled. No Seen row, no outline, no percents of outcome.
4. **Reveal values.** 94%, 70%, 76%: on the Seen row (none is always listed; day 0 and day 19 by milestones day-0 and peak). 18, 24, 75%: computed from those whole percents. "day N ended at x%": seen.other, the last other date, the Seen row's last entry. "on day 19, 35%": the Seen row's peak clause (milestone peak). "about 29%": told context, c4.
5. **QA path.** Day 0 (day-0), Peak (peak), Day 40 (another-day; capped line), Never, slider two presses (day 1, day 2). 3 of 3 milestones. At reveal the Seen row reads "none 94% · day 0 70% · day 19 76% · day 2 70%. Day 19: 35% not yet infected."
6. **Reset.** No Reset control; the Seen row only grows or updates its last other date. Reveal from that run: "Your Seen row: with no vaccine 94% are infected in the end. Day 0 brings that to 70%; the peak, to 76%. So the peak saves 18 of the 24 points day 0 saves: about 75% of the benefit. Your other date, day 2, ended at 70%. / The peak is not the end of the epidemic: on day 19, 35% of the town had never been infected. Protecting people then still removes a lot of the tail; by day 40 little is left to stop. / Model, not guidance: instant, perfect protection, and doses only to people not yet infected. Given to random people instead, the peak keeps about 29%." (Read from the code; this batch does not run QA.) Text budget: legend, status line and Seen row together run past 25 words, mostly numbers; flagged for the reviewer.

## Pre-flight v5 (demo-builder, 2026-10-14, wave H batch 7, learner r8 / W-298)

Changes: reveal 118 → 82 words as measured (verdict included; 71 body words). Cut "Your other date, day N, ended at X%" and the random-doses clause "Given to random people instead, the peak keeps about 29%" (c4 withdrawn; both named as candidates by r8; cm-life to confirm); the model line is now "Model, not guidance: instant, perfect protection." (the question already says "all not yet infected"). The town is 40 × 10 dots instead of 20 × 20 (same 400 people, same fill order and dashed no-vaccine outline), so at the reveal it is drawn at full size (no card shrink; it was 81/203, a strip). Buttons: "Peak (day 19)" → "Peak" so the four buttons fit one row (the stage line still says "Day 19 (the peak)"). Seen row keeps "day 40 94%" once visited, as well as the last other date (r8 minor 2). c1, c2, c3, c5 unverified.

1. Title and hook: unchanged.
2. Options: unchanged (three word options).
3. Locked stage: hollow 40 × 10 grid, legend, toy line, buttons and slider disabled. No number about the answer.
4. Reveal values: 94, 70, 76 (b) day-0 and peak milestones, in the Seen row; 18, 24, 75% computed from those whole percents; 35% (b) peak milestone, in the Seen row ("Day 19: 35% not yet infected"); "by day 40 little is left" has no number (the Seen row shows day 40 94% if visited).
5. QA path: Day 0, Peak, Day 40, Never, slider ×2 (day 2). At the reveal the grid, legend, stage line and Seen row ("none 94% · day 0 70% · day 19 76% · day 40 94% · day 2 70%. Day 19: 35% not yet infected.") are on screen.
6. Reset: no reset control. QA-path reveal: "Your Seen row: with no vaccine 94% are infected in the end; day 0 brings that to 70%, the peak to 76%. So the peak saves 18 of the 24 points day 0 saves: about 75% of the benefit. / The peak is not the end: on day 19, 35% had never been infected. Protecting them still cuts the tail; by day 40 little is left to stop. / Model, not guidance: instant, perfect protection."
7. Phone fit (tools/reveal-fit.mjs, localhost:3530 dev server, 2026-10-14): crop 88 px → 0 px; hiddenBelow 0; namedHidden 0; phoneFit true; stage 349 → 324 px; picture 83 px tall, not shrunk (was fitted 81/203). Screenshot artifacts/reveal-fit/vaccinate-at-the-peak.png looked at: whole grid with the dashed outline, Seen row and the reveal's last line on screen, with room to spare. Not run: build, QA, walkthrough.
