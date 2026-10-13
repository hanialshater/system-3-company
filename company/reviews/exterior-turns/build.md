# Build note: exterior-turns (demo-builder, 2026-10-13)

- Intent: an equal-sided shape with 3 to 12 sides (slider). At each corner a dashed "straight on" line continues the side you arrive on, and a coloured wedge marks the turn onto the next side (360/n). The first corner is labelled. "Gather the turns" copies the n wedges to the centre, where they close into one full circle.
- Key states (two milestones): 3 different side counts seen (the start at 3 counts); the turns gathered. QA path: slider 3 -> 4 -> 5, then the gather toggle.
- The readout "Total turning" is n × (360/n) = 360, from n. The reveal lists the side counts actually visited (e.g. "3 × 120°, 4 × 90°, 5 × 72°").
- Locked: no wedges or labels, and the readout shows "?".
- Deviation from brief: no animated walker dot (QA waits 450 ms, and the standard prefers manipulation). The dashed line and the wedge define "turn" on the stage instead. The reveal extends the result to any outward-bulging shape: this is claim c2, flagged as going beyond what the stage shows.
- After screenshots: the hook said "dodecagon" (undefined term), now "12-sided shape".
- All claims unverified, for the fact-checker.
