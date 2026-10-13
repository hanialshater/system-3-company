# Build note: isolate-by-day-three (demo-builder, 2026-10-13)

- Design: six day-columns of a case's infectious period, 5 would-be infections each (10 cases x R0 3 = 30). A black isolation line sits after day d; later columns are crossed out. Message: "Isolated after day 3: 15 of 30 infections happen. R = 15/10 = 1.5."
- Brief answer checked: 3 x 3/6 = 1.5; day 2 gives 1.0. Options (3, 1.5, 0.5) computed from rAt().
- Reveal gate: milestones "day-3" and "day-2" (exact). The two chips come first; the slider (0-6, 6 = never) follows. The reveal lists any other days the learner tried with their R.
- The brief said "drag a marker"; a slider moves the line (dragging an SVG marker is fiddly at 24 px on a phone).
- c4 (uneven infectiousness, pre-symptomatic spread) cites Ferretti et al. 2020 as the brief did; flagged for the fact-checker. No health advice: the reveal speaks of the model only.
- Screenshots: fine on phone; no change.
- All claims unverified.
