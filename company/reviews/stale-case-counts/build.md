# Build note: stale-case-counts (demo-builder, 2026-10-13)

- Design: one chart, days -21 to today, linear y axis. The reported curve (100 today, doubling every 3 days) never moves. The "actually infected" curve is the same curve shifted earlier by the delay; a dashed horizontal line shows "infected on day -delay, counted today" and a dashed vertical gap at today shows the hidden size.
- Brief answer checked: 100 x 2^(9/3) = 800. The options (100, 300, 800) are computed from the same constants; 300 is the "3 doublings = 3 times" error.
- While locked only the reported curve is drawn (the infection curve is the answer).
- Reveal gate: milestones "lag-9" (delay exactly 9) and "other-lag" (any other non-zero delay). The "9-day delay" and "3-day delay" chips come first; the slider (0-12) follows. The reveal lists the other delays the learner tried with their numbers.
- Real-delay claim (c4) cites Gostic et al. 2020 for "delays vary"; the brief said a source is needed; flagged for the fact-checker. No specific real delay is stated.
- After screenshots: the "today" tick was clipped at the right edge; anchored to the end.
- All claims unverified.
