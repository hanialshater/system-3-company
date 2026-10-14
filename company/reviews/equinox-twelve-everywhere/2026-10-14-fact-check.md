# Fact-check: equinox-twelve-everywhere (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Node with Demo.tsx model: declination(0) = -23.44 cos 0 = -23.44; hours = 2 acos(-tan 60 tan(-23.44))/15 = 5.510 h, fmtH '5.5 h'; the stage opens on 21 Dec at 60N. The claim says 'on the stage' (geometric day, no refraction); real Helsinki/Oslo day is near 5 h 50 m with refraction, which the claim does not assert. |

**Result:** all pass-17 claims verified.

