# Fact-check: dakar-nearer-brazil (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Node haversine and d3 geoDistance, R = 6,371.0088 from Dakar (14.7167N, 17.4677W): Rome 4,170.3 km, Paris 4,205.06 km; fmt rounds to 4,170 and 4,210. Labels render for every city whenever !locked, independent of the ring, and the reveal repeats them. Both points sit inside the 52 deg clip (about 37.8 deg). |

**Result:** all pass-17 claims verified.

