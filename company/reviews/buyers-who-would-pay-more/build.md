# Build note: buyers-who-would-pay-more

builder: demo-builder · 2026-10-13

- Intent: five bars (what a cup is worth to each buyer) cut by one price line. Tapping a buyer turns its bar into "+$gain" (green part above the price) or "out" (dashed). A running total adds what the tapped buyers keep. "Gain = worth − price" is on the stage before the reveal uses it.
- Milestone: price $5 with all three buyers who buy ($10, $8, $6) tapped. DOM order: the five buyer buttons first, so QA reaches it on its third press, then the price slider ($1 to $10, starts at the question's $5).
- Total gain is "?" while locked and counts only buyers the learner has tapped, so it never states the answer unearned.
- QA ends at $7 (two slider presses), so its screenshot shows the $7 state; the reveal quotes the $5 state, which the gate guarantees the learner reached.
- Changed from the brief: tapping buyers, so the learner adds up the gaps rather than reading a single summed readout.
