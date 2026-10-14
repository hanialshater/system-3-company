# Fact-check: closer-in-winter (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Node with the Demo.tsx orbit model: declination is at least +22.07 deg on every June day and at most -21.82 deg on every December day, so the stage message ('The north/south leans toward the Sun', thresholds +/-5 deg) shows north in June, south in December. Geometry: in June earthLon is about 270 deg, so Earth sits below the Sun and the up-the-page axis arrow points toward it. Agrees with the June solstice subsolar point at 23.4N (c4). |
| c8 | verified | season() in Demo.tsx maps month index 2-4 to spring, 5-7 summer, 8-10 autumn, else winter, swapped for the south. Met Office (metoffice.gov.uk, 'When does Spring start?', 2026 blog; seasons pages) defines meteorological spring as 1 March to 31 May with four three-month seasons. |

**Result:** all pass-17 claims verified.

