# Build note: pennies-dont-add-up (demo-builder, 2026-10-12)

- Design intent: the learner hunts for 0.1 with 12 binary switches (1/2..1/4096) and keeps landing either side of it; the closest pattern (410/4096) is a hair over. A button then shows the real 53-digit values: 0.1 and 0.2 both a hair high, so the sum is over 0.3.
- Reveal gate: interact() only fires on 'How does a computer store 0.1?', which unlocks after 3 switch taps, so the learner must try by hand and must see the computer's values (which hold the more/less answer) before the reveal.
- Why not a pure 12-switch toy for the sum: with fixed-point rounding 0.1 + 0.2 rounds to exactly the nearest 0.3 (1229/4096), which would teach the wrong answer; the sum uses real binary64 values instead.
- After screenshots: the reveal credited the computer's snapped value as 'your closest try' (fixed: only the learner's own toggles count); added 'over 0.3' to the sum line so the side is on the stage, not only in the reveal.
