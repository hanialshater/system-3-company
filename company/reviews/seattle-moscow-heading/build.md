# Build notes: seattle-moscow-heading

## v1 (2026-10-13, wave 4)
- Brief #33. Re-run: initial bearing 11.505°, distance 8,369.9 km (the brief says 8,371; coordinate rounding). The route samples cross the USA, Canada (Arctic islands), Greenland at 82°N, the Arctic Ocean, northern Norway (71°N), Finland and Russia. Peak latitude 82.3°N.
- Map: azimuthal equidistant centred on Seattle, clipped at 100°. Lines from the centre are great circles, and the stage says so. Changed from the brief: buttons instead of a draggable needle. "Face east / north-east / north" set the heading, and "Turn right 10° / Right 1° / Left 1°" fine-tune it, because a drag is not on the QA path.
- "Route passes Moscow by" is the closest approach of the drawn 9,500 km route, sampled every 10 km (the first draft used cross-track distance to the whole circle, which did not match the drawn line). Values: east 7,940 km, north-east 3,590, north 1,240, 10° 160 km, 11° and 12° about 50 km.
- Key state: `east` (heading 90 tried) then `on-target` (within 2° of 11.5°). QA path: E, NE, N, +10 (10°, on target), +1, −1. The "Exact: 11.5°, 8,370 km" line appears only once on target, so the reveal quotes only numbers already shown. The east miss is quoted only if east was pressed.
- c7 (winds and airspace) is general knowledge, from memory.
