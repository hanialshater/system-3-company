# Fact-check: atlantic-to-pacific-heading (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Node haversine and d3-geo geoDistance (R = 6,371.0088 km) Colon (9.36N, 79.90W) to Balboa (8.95N, 79.57W) = 58.23 km; stage and reveal print Math.round = 58 km. Longitude difference +0.33 deg, so the Pacific end is east of the Atlantic end. Reveal says 'straight line', matching the computation. |
| c4 | verified | Read against c1 coordinates: Colon (9.36N) is on the Caribbean coast, Balboa (8.95N) on the Pacific coast 0.41 deg south and 0.33 deg east; initial bearing 141.5 deg (SE). The stage labels Caribbean Sea north and Pacific Ocean south on the kit 1:110m outline, which runs east-west across the frame. Claim text equals the reveal sentence. |

**Result:** all pass-17 claims verified.

