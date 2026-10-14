# Build notes: tissot-circles

## v1 (2026-10-12, wave 1)
- The lesson's own Mercator draws the 1,000 km circle at 60°N 4.16x the equator circle (not exactly 4: its top reaches 69°N). The options say "about", and the reveal explains the extra. Equal Earth gives 1.000 at every latitude (artifacts/scratch/w1-tissot.mjs).
- Two bugs found while recomputing: geoCircle's default 6° precision moved the ratio to 4.32, so precision is now 0.5°; the map's bottom edge clipped the equator circle (clipping changes path.area), so the map is now 342 px tall.
- Gate: Mercator at 60°N plus one view of Equal Earth (minInteractions 2). The chips come before the toggle in the DOM, so a single pass meets the gate.

## Revision v2

Review 2026-10-13: unclear which circle slides; 2x2 and 69N told. Circles labelled 'fixed' and 'slides'; new readouts 'Stretch each way' (2.00x at 60N) and 'Circle width : height' (round vs squashed); 69N dropped from the reveal; Mercator and Equal Earth glossed. c2, c5 reworded, unverified.
