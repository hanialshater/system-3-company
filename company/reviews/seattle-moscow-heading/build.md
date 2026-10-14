# Build notes: seattle-moscow-heading

## v1 (2026-10-13, wave 4)
- Brief #33. Re-run: initial bearing 11.505°, distance 8,369.9 km (the brief says 8,371; coordinate rounding). The route samples cross the USA, Canada (Arctic islands), Greenland at 82°N, the Arctic Ocean, northern Norway (71°N), Finland and Russia. Peak latitude 82.3°N.
- Map: azimuthal equidistant centred on Seattle, clipped at 100°. Lines from the centre are great circles, and the stage says so. Changed from the brief: buttons instead of a draggable needle. "Face east / north-east / north" set the heading, and "Turn right 10° / Right 1° / Left 1°" fine-tune it, because a drag is not on the QA path.
- "Route passes Moscow by" is the closest approach of the drawn 9,500 km route, sampled every 10 km (the first draft used cross-track distance to the whole circle, which did not match the drawn line). Values: east 7,940 km, north-east 3,590, north 1,240, 10° 160 km, 11° and 12° about 50 km.
- Key state: `east` (heading 90 tried) then `on-target` (within 2° of 11.5°). QA path: E, NE, N, +10 (10°, on target), +1, −1. The "Exact: 11.5°, 8,370 km" line appears only once on target, so the reveal quotes only numbers already shown. The east miss is quoted only if east was pressed.
- c7 (winds and airspace) is general knowledge, from memory.


## Revision v2

From the latest learner review and fact-check (batch 03).

- Hook no longer names north.
- New control "Show on a flat map" redraws the same route on an ordinary map where it bends north; reveal points to it or recalls it.
- Dropped the winds/airspace sentence from the reveal to keep it short. New claim c8 (flat-map bend), unverified.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Locked stage shows the ordinary flat map (Moscow plainly east), not the Seattle-centred disc. New milestone 'flat-hit': the on-target route viewed on the flat map. QA path reaches it: east, NE, N, +10° (on target), R1, L1, flat.
- Claims reopened (status unverified): c8.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
