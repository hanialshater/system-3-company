# Build note: up-hill-down-hill (demo-builder, 2026-10-13)

- Intent: one chart, speed (up the page) against time (across). Each leg is a block: width = hours, height = speed, so its area is the 60 km driven. The uphill block is fixed at 30 km/h for 2 h. A slider sets the downhill speed (30 to 120 in steps of 15). The dashed green line is the round-trip average, 120 km ÷ total hours.
- Key state (one milestone): downhill at 60 km/h, with blocks of 2 h and 1 h and an average of 40. QA's two slider presses go 30 -> 45 -> 60 and end on it.
- Numbers: the question, the options (45 = average of the speeds, 40, 50), the readouts and the reveal come from DIST, UP, DOWN, hours() and avg(). Recomputed in node (36, 40, 42.9, 45, 46.7, 48 across the slider).
- The caption defines average speed ("120 km ÷ total hours") before the reveal uses it.
- Locked: there is no downhill block or average line, and both readouts show "?".
- Deviation from brief: the two side-by-side time bars became one speed-time chart, so "slow counts more" shows as a wide block. The reveal's (30 + 30 + 60) ÷ 3 can be read straight off the hour grid.
- After screenshots: the "km/h" axis label overlapped the 120 tick. It moved inside the axis, and the scale now leaves headroom.
- All claims unverified, for the fact-checker.
