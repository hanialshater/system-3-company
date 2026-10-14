# Fact-check: centre-moves-the-gap (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Node haversine and d3-geo geoDistance, R = 6,371.0088: Haneda (35.55N, 139.78E) to LAX (33.94N, 118.41W) = 8,812.56 km, displayed Math.round(KM/10)*10 = 8,810. KM is a constant computed without the projection, so the slider cannot change it. |
| c5 | verified | Demo.tsx: geoEquirectangular scale W/(2 pi), so 360 deg of longitude spans exactly W px; PX_PER_DEG = W/360. The projection clips at the antimeridian of the rotated centre, which is the left/right edge. Equirectangular spans 360 deg of longitude by construction (plate carree: x = R lambda). |

**Result:** all pass-17 claims verified.

