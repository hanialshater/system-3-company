# Build note: told-the-sum-is-eight (demo-builder, 2026-10-13)
- Intent: 6 x 6 grid of two-dice outcomes, cells with a six outlined. Clue chips (Total is 8, Total is 7, Total at least 10, No clue) grey out ruled-out cells; readouts show cells left and the share with a six. No randomness.
- Gate: 2 milestones, "Total is 8" and one other total clue. "Total is 8" is first in DOM order; "No clue" (start state, 11 of 36) is last.
- Question options are computed (11/36 -> "about 31%", 2/5 -> 40%; 50% typed). The reveal quotes 2/5 and 11/36 (both seen: start state and first clue) and only the other clues the learner tried.
- The brief's "one of the dice shows a six" is worded "at least one die" on the question to avoid the exactly-one reading.
