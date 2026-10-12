# Build notes: coastline-ruler

## v1 (2026-10-12, wave 1)
- Divider walk recomputed on the 1:110m Great Britain polygon (azimuthal equidistant, km units): 2,385 / 2,642 / 3,002 / 3,159 km at 200/100/50/25 km, matching the brief exactly (artifacts/scratch/w1-coast.mjs; Demo.tsx recomputes live).
- Resolution limit stated in the reveal: the outline has only 47 corners, so no ruler can pass its 3,404 km perimeter. No cited real coast length is shown to the learner.
- Gate: two new ruler sizes tried (minInteractions 2). Chips rather than a slider, so each ruler is a distinct, readable state.
- Looked at the 25 km walk on a phone: the dots trace the outline legibly; no change needed beyond a smaller dot size for short rulers.
