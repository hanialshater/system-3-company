# Build note: drop-the-losing-start (algo-pair-01, 2026-10-14)

Built from the brief (#20) and spec. Status draft, all 5 claims unverified.
- Re-ran in node: 45 stretches, best 6 only at days 4-7; kept-everything best 2; one-pass reset best 6; one-pass = brute force on 20,000 random lists; of 256 start-over patterns, 16 reach 6 and all of them start over after day 3.
- Controls (DOM order): Walk again (disabled until day 9), Next day, Start over, Auto toggle, Play to day 9, Check all 45. QA path: Next, Start over, Auto, Play, Check reaches both milestones (best-found, checked), both only when the walk's best equals 6.
- Reveal quotes the learner's own start-over log from the snapshot of the walk that reached 6. Walk again and Auto are disabled in reveal/day 9 so the stage matches the reveal.
- Spec said an SVG wireframe exists; none was on disk.
- NOT run (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` passed. Risks to look at: day-strip bracket and "dropped" labels at 390 px, chart label overlaps, page height with triangle.
