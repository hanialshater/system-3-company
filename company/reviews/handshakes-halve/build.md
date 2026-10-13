# Build note: handshakes-halve (demo-builder, 2026-10-13)

- Intent: ten seats on a circle, with person 1 seated. Chips 2 to 10 bring people in, in order (only the next chip is enabled). Each newcomer draws a line to everyone present, and their new lines are highlighted. The caption tallies 1 + 2 + ... + (n-1). "Count lines at each person" (enabled at 10) labels every person with 9 and says 10 × 9 = 90 line ends, two per handshake.
- Key states (two milestones): all ten present (45 lines); the per-person count shown. QA's in-order presses make the 9 arrivals, then the count toggle.
- Numbers: the question, the options (100, 90, 45), the caption, the readout and the reveal come from N and lines(n). Recomputed in node.
- Locked: the handshake readout shows "?".
- Deviation from brief: one chip per arrival, because QA presses each control once. There is no "Start over": QA would press it last and leave an empty stage in the screenshots.
- After screenshots: the 45-line picture is dense but readable on the phone, and the green 9s sit clear of the seats. No change.
- All claims unverified, for the fact-checker.
