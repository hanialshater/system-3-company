# Build note: infinite-hotel (demo-builder, 2026-10-13)

- Intent: a row of full rooms 1-8 fading off to the right ("…"), with the new guest waiting at the door. "Everyone moves up one room" puts the guest from room n in room n + 1 (arrows), which empties room 1. "New guest takes room 1" seats the newcomer, and the "Without a room" readout drops to 0.
- "Same move, 12 rooms" shows the same picture for a 12-room hotel. There the move leaves guest 12 outside, in red, with "no room 13". This is the pigeonhole contrast, and the reveal mentions it only if the learner saw it.
- Key states (two milestones): everyone moved up; the new guest in room 1. QA presses move, admit, then the 12-room toggle, so the final screenshot shows the failure case and the reveal includes it.
- Locked: there is no new guest and the readout shows "?".
- No "Start over": QA presses every control, and one-way steps keep the final state on screen. The reveal names Hilbert's hotel as a thought experiment (claim c3).
- After screenshots: "new" overflowed the small 12-room guest circle, so its font is now smaller there.
- All claims unverified, for the fact-checker.
