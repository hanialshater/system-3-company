# Build note: drop-the-losing-start (algo-pair-01, 2026-10-14)

Built from the brief (#20) and spec. Status draft, all 5 claims unverified.
- Re-ran in node: 45 stretches, best 6 only at days 4-7; kept-everything best 2; one-pass reset best 6; one-pass = brute force on 20,000 random lists; of 256 start-over patterns, 16 reach 6 and all of them start over after day 3.
- Controls (DOM order): Walk again (disabled until day 9), Next day, Start over, Auto toggle, Play to day 9, Check all 45. QA path: Next, Start over, Auto, Play, Check reaches both milestones (best-found, checked), both only when the walk's best equals 6.
- Reveal quotes the learner's own start-over log from the snapshot of the walk that reached 6. Walk again and Auto are disabled in reveal/day 9 so the stage matches the reveal.
- Spec said an SVG wireframe exists; none was on disk.
- NOT run (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` passed. Risks to look at: day-strip bracket and "dropped" labels at 390 px, chart label overlaps, page height with triangle.

## v3 (2026-10-14): QA-path fix

Problem (computer-use QA, phone + desktop): "Auto: start over below 0" was flagged as a dead control. On the QA path it is pressed right after "Start over", when the total is 0, so no flag is added; its only change was the button's class and aria-pressed, which the stage fingerprint does not see. A learner pressing it at total 0 also saw nothing change.
Change: a rule line under the readout shows the current rule ("Rule: you choose when to start over." / "Rule: start over whenever the total goes below 0."), so the toggle always changes the stage. No claim text changed. Version 2 -> 3.
Not run here: next build, computer-use QA, walkthrough.

## Pre-flight v3

1. Title and hook: unchanged from v2 ("Drop the stretch that went negative" / "Nine days of gains and losses. Find the best run without trying every pair.").
2. Options: "4", "6", "12": same precision, none numbered.
3. Locked stage: nine gain tiles, fixed axis -4..12, legend, "Day 0 · Total ? · Best ?", new line "Rule: you choose when to start over." No 6, no best marker.
4. Reveal values: start-over log and days 4-7 are (a) from the snapshot of the learner's walk that reached 6; 6 is (b) the best-found milestone; "never got above 2" and 45 are (b) shown on stage (kept-everything line, triangle after Check).
5. QA path: Walk again (disabled) -> Next day (day 1, -2) -> Start over (drop -2) -> Auto (rule line changes) -> Play to day 9 (auto drop -2 after day 3, best 6 days 4-7: best-found) -> Check all 45 (checked). Best 6, both drops and the triangle are on stage at reveal.
6. Reset: Walk again is first in DOM order and disabled until day 9, so it is not pressed after the walk; it is disabled in reveal. Reveal from that run: "You dropped −2 after day 1 and −2 after day 3, then days 4 to 7 climbed to 6. The line that kept everything never got above 2."
