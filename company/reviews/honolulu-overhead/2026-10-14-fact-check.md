# Fact-check: honolulu-overhead (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Node with the Demo.tsx Kepler model: maximum declination 23.440 on day 172 = 21 June (non-leap), dateLabel '21 Jun', fmtLat '23.4N'. 23.4 > 21.31 (Honolulu) and < 25.76 (Miami), 30.04 (Cairo). Matches the reveal. |
| c6 | disputed | The claim text is right, but the stage says something else: the caption under the map reads 'Latitude is how far north of the equator a place is.', which omits south while the same stage draws and labels the Tropic of Capricorn at 23.4S. Fix (builder, Demo.tsx caption): 'Latitude is how far north or south of the equator a place is.' Re-check after the edit. |

**Result:** c6 disputed (blocks publishing until the builder fixes it and a fact-checker re-checks); the rest verified.

