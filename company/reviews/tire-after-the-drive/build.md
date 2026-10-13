# Build note: tire-after-the-drive
- Brief 36. Title "The tyre after a hot drive" (slug kept).
- Key state: milestone `hot`, the tyre at exactly 50 °C (323 K): gauge about 253 kPa, total about 354 kPa. The slider below 50 and the "Parked" button do not unlock. DOM order: slider, Parked 20 °C, After the drive 50 °C, so QA ends on the key state.
- One bar: grey "outside air" (101 kPa, which the gauge leaves out) under the coloured gauge part, with a dashed "cold" mark at the 20 °C total. Kelvin is defined on the stage ("K = °C + 273") beside the live "°C = K" pair. Gauge is defined in the question. Model label on the stage: "ideal gas, fixed volume".
- All numbers come from abs(c) = (220 + 101.325) × (c + 273.15) / 293.15. The options are 253 (right), 550 (Celsius ratio) and 354 (forgets to subtract the outside air); node gives 252.9 / 550 / 354.2.
- Locked stage shows the parked 220 kPa only (given in the question).
- After screenshots: labels clear on a phone; no change.
