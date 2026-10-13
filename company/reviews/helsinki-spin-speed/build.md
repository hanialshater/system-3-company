# Build notes: helsinki-spin-speed

## v1 (2026-10-13, wave 4)
- Brief #35. Re-run: 1,672.5 km/h at the equator, 831.9 at 60.17°N, 1,040.9 at London, 0 at the pole (sidereal day 86,164.09 s, R 6,371.0088 km). Circles: 40,030 km and 19,912 km. The question, options, readouts and reveal all use speed() and circleKm() in Demo.tsx.
- Stage: an orthographic globe seen from above the North Pole (rim = equator, labelled), with the circle of latitude and an eastward arrow whose length is proportional to speed. Buttons for Equator / London / Helsinki / North Pole come first, then a 0 to 90° slider.
- Key state: `equator` and `helsinki` (buttons; the slider reaches 0 but not 60.17). The QA path visits all four places.
- Model labels on the stage: "One turn per 23 h 56 min", and the top caption. The reveal says "about half" (the ratio is 0.497 because Helsinki is at 60.17°, not 60°).
- Phone screenshot: the QA path ends at 88°N (slider), with a tiny circle at the pole. Fine.
