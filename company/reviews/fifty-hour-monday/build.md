# Build notes: fifty-hour-monday

## v1 (2026-10-13, wave 2)
- Map: equirectangular (geoEquirectangular fitted to the Sphere, 320 x 160), 1:110m countries, no graticule.
- Brief answer holds: 50 hours, computed in Demo.tsx from the offset list (MON_START = 24 - 14 = Sun 10:00 UTC, MON_END = 48 + 12 = Tue 12:00 UTC).
- Model on the stage: nominal 15-degree bands for UTC-12..+12 shaded by calendar day, plus two marker dots for the real extremes, Kiritimati (UTC+14) and Baker Island (UTC-12). The caption says "nominal" so the bands are not read as legal zones. No date line or borders are drawn. Island coordinates come from memory and are flagged in claim c4.
- Dropped brief claim (2), Kiribati's 1995 move: the lesson does not need it, and I could not check it.
- Key state: the clock at "last Monday ends", with the readout showing 50 h. Milestones: "begins" (Monday exists somewhere) and "ends" (t >= Tue 12:00 UTC). The two jump chips come first in DOM order, so QA reaches both.
- Locked: the clock starts at Sun 00:00 UTC; both readouts show "?".
- Iteration: the UTC-12 label was clipped off the left edge of the map, so I moved it to the right of its dot. Added an "other" swatch to the legend for Sat/Wed bands.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Hook no longer says "longer than 24"; neutral question. UTC defined on the stage (new claim c5).
- "Forward 6 hours" step button so the wave of dates is watched; bands carry S/M/T letters and stronger colours; islands are named on the map. "Clocks spread over 26 h (UTC-12 to UTC+14)" readout lets the learner build 24 + 26.

## Revision v3 (wave C builder 13, 2026-10-14)

- Review (r2) and fact-check c5: the gate skipped any mid-Monday state, white was unexplained, UTC+14 beside UTC-12 unexplained, 'UTC is the clock at Greenwich' disputed. Fix: three milestones (a mixed state with at least 3 Monday bands, Monday first starting, Monday ending); the one-tap step is 'Forward 18 hours', which lands in a mid-Monday sweep; legend adds 'earlier day'; caption now says UTC is the world reference clock, the same as Greenwich winter time (GMT); reveal gains one line on the date line bending east round Kiribati (new claim, unverified).
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.
