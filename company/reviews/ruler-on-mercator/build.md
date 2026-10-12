# Build notes: ruler-on-mercator

## v1 (2026-10-12, wave 1)
- Design change from the brief: a 1,000 km bar is about 8 px on a phone-width world Mercator, so the bar is 2,000 km on a map spanning 120° of longitude; options became 1,000 / 2,000 / 4,000 km. The answer is still "half" (sec 60 = 2).
- The readout inverts the projection at the bar's ends and measures along the parallel; at 60°N it reads 1,000 km. A green dashed bar shows a true 2,000 km at the current latitude.
- Reveal unlocks at 60°N.
- Looked at 60°N on a phone: the yellow and green bars are distinct and readable; no change needed.
