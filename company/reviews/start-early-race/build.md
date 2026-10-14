# Build note: start-early-race

builder: demo-builder · 2026-10-12

- Intent: two lines, Ana (10 years then stop) vs Ben (waits w years, saves to year 40); one slider for Ben's wait.
- interact() fires only once Ben waits 9+ years (the point where he falls behind: $244,975 vs $252,418), so the crossing is seen.
- Lines and readouts hidden while locked.
- After screenshots: the 'Ana'/'Ben' end labels were clipped; narrowed the plot. Replaced unlabeled deposit bars with 'Ana stops' / 'Ben starts' markers.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- "Ana" label: domain per theme; Ben line, fill and gap fill use --warn-fill/--bad-fill (shapes); Ben label stays --warn (text-safe).
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

