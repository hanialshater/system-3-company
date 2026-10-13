# Build notes: fifty-hour-monday

## v1 (2026-10-13, wave 2)
- Map: equirectangular (geoEquirectangular fitted to the Sphere, 320 x 160), 1:110m countries, no graticule.
- Brief answer holds: 50 hours, computed in Demo.tsx from the offset list (MON_START = 24 - 14 = Sun 10:00 UTC, MON_END = 48 + 12 = Tue 12:00 UTC).
- Model on the stage: nominal 15-degree bands for UTC-12..+12 shaded by calendar day, plus two marker dots for the real extremes, Kiritimati (UTC+14) and Baker Island (UTC-12). The caption says "nominal" so the bands are not read as legal zones. No date line or borders are drawn. Island coordinates come from memory and are flagged in claim c4.
- Dropped brief claim (2), Kiribati's 1995 move: the lesson does not need it, and I could not check it.
- Key state: the clock at "last Monday ends", with the readout showing 50 h. Milestones: "begins" (Monday exists somewhere) and "ends" (t >= Tue 12:00 UTC). The two jump chips come first in DOM order, so QA reaches both.
- Locked: the clock starts at Sun 00:00 UTC; both readouts show "?".
- Iteration: the UTC-12 label was clipped off the left edge of the map, so I moved it to the right of its dot. Added an "other" swatch to the legend for Sat/Wed bands.
