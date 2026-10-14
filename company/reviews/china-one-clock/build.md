# Build notes: china-one-clock

## v1 (2026-10-12, wave 1)
- China's 1:110m extent 73.68–135.02 E = 61.35° = 4.09 h; the question text is computed from the outline. Kashgar's mean solar noon is 14:56 Beijing time. Brief answer (1) holds.
- The clocks read "? / ?" while locked, because showing two identical official clocks would give the answer away.
- Slider is world time (UTC); the yellow line marks mean solar noon. Reveal unlocks when the noon line reaches Kashgar (within 1.5°). Chips set the exact minute (step 1) so "Sun" reads 12:00 at each city.
- Dashed lines are nominal 15° bands, captioned as such; no border or regional-convention claims.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- city labels: dark ink with a white halo (they sit on the blue China highlight); sun line and disc use --warn-fill.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

