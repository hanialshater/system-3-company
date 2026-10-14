# Fact-check: london-december-noon-sun (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | Node: Dec altitude 90 - 51.5072 - 23.44 = 15.0528 deg; 1/sin = 3.850, which the reveal and readout print with f1 as '3.9', not '3.8'. June 61.9328 deg: 1/sin = 1.133, '1.1' (right). Fix (builder): claim text 'about 3.9 times at 15.1 deg'. |
| c6 | disputed | 90 - lat + dec is the noon altitude only where the Sun culminates south of the zenith (lat >= dec). The stage's latitude slider runs 0 to 60N, so on 21 June at 0-23N the readout prints e.g. '90 - 0.0 + 23.4 = 113.4' as the Sun's height, which is impossible (max 90; true value 66.6 deg to the north). Fix (builder): set the latitude slider min to 24N (or show 180 - x 'to the north' when x > 90), and qualify the claim 'for places north of the tropics'. |
| c7 | disputed | On an equinox day and night are only nearly equal: day exceeds night by several minutes because of refraction and the Sun's disc (USNO 'Equinoxes and Solstices' FAQ; timeanddate 'Equinox: almost equal day and night'). The company's own equinox-twelve-everywhere c5 (verified) says so. The stage note repeats 'day and night equal'. Fix (builder, claim and Demo.tsx note): 'a spring or autumn day when day and night are nearly equal'. |

**Result:** c5, c6, c7 disputed (blocks publishing until the builder fixes it and a fact-checker re-checks); the rest verified.

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Node: Dec 90 - 51.5072 - 23.44 = 15.0528 deg (f1 '15.1'), 1/sin = 3.850 -> f1 '3.9'; June 61.9328 deg ('61.9'), 1/sin = 1.133 -> '1.1'. Geometry: a beam of cross-section A lands on A/sin(h) of level ground. The reveal prints these same f1 values. |
| c6 | verified | Re-check of the pass 17 dispute: Demo.tsx now has MIN_LAT = 24, MAX_LAT = 60. At 24N in June the formula gives 89.44 deg (< 90, Sun south of zenith); at 60N in December 6.56 deg (> 0). For lat >= dec the noon altitude is 90 - lat + dec (derivation from the meridian: zenith distance = lat - dec). Claim text now qualified 'north of the tropics'. |
| c7 | verified | Re-check of the pass 17 dispute: claim and stage note (Demo.tsx line 140) now say 'nearly equal'. Matches USNO 'Equinoxes and Solstices' (day slightly longer than night because of refraction and the Sun's disc) and the company's verified equinox-twelve-everywhere c5. |

**Result:** every claim verified or withdrawn.
