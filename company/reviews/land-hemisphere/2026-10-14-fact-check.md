# Fact-check: land-hemisphere (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rebuilt the mask from the kit land-110m.json with d3.geoContains at every 2-deg cell centre: 0 of 16,200 cells differ from mask.ts. Own search of every 2-deg centre with cos-weighted cells: max 47.13% at 42N, 2E (40N 2E 47.13%, 46N 0E 47.12%: a flat ridge across France/Iberia); a 0.5-deg refinement peaks at 47.16% (44N, 0.5E). Reveal prints pct = 47%. Claim says 'on this map', so the published Nantes-centred values are not asserted. |

**Result:** all pass-17 claims verified.

