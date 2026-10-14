# Fact-check: lap-at-89-north (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Parallel radius = R cos(lat); cos 89 = 0.017452 = 1.7%. Node lap 2 pi R cos 89 = 698.6 km vs 40,030 km. Reveal text matches. |
| c8 | verified | Web search (route planners): Wanderlog 407 mi / 655 km, Sixt 405 mi, Road Genius 404 mi / 650 km (M6/A74(M)) and 412 mi / 664 km (M1/A1(M)). 'About 650 km' holds. The comparison sentence that carries it is a separate claim (c9). |
| c9 (new) | disputed | Unrecorded claim found on the stage and recorded: the note 'A bit more than London to Edinburgh by road (about 650 km).' shows whenever the lap is under 1,000 km. Node: 88.6N 978 km, 89.0N 699 km, 89.1N 629 km, 89.5N 349 km, 89.9N 70 km, so it is false at 89.1-89.9N (slider reaches 89.9). Fix (builder, Demo.tsx): show it only near 89N (lap about 680-760 km) or compute the ratio. |

**Result:** c9 disputed (blocks publishing until the builder fixes it and a fact-checker re-checks); the rest verified.

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Node with kit EARTH_RADIUS_KM = 6371.0088: 2R cos 89 deg = 222.4 km -> r10 '220'. The over-the-pole surface distance (2 deg of arc) is also 222.4 km. |
| c9 | verified | Node: lap 89.0N 698.6 km -> (698.6/650).toFixed(1) = '1.1'; 89.5N 349.3 -> '0.5'; 88.6N 978.0 -> '1.5'; 88.5N 1,047.9 km, no note shown (>= 1,000). Matches Demo.tsx line 124. |

**Result:** every claim verified or withdrawn.
