# Fact-check: ruler-on-mercator (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; the lesson's projection (geoMercator, rotate -40, scale 320/(120 deg), clip 320 x 300) rebuilt with d3-geo in artifacts/scratch/fc-aiecongeo/rm.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Bar length = scale x 2000 / 6371.0088 = 47.96 px; inverted at the equator it spans exactly 2,000.0 km (17.986 degrees of longitude). |
| c2 | verified | At 60 N the same screen bar spans 17.986 degrees of longitude = 1,000.0 km along the parallel; the great-circle chord is 996.9 km (0.3% shorter), as the record says. The reveal and readout both measure along the parallel, which is the straight east-west line on Mercator. Other latitudes: 30 N 1,732.1 km; 45 N 1,414.2; 70 N 684.0. |
| c3 | verified | sec 60 = 2.000; sec 70 = 2.924 ('about 2.9'). Measured on the projection itself: local east-west scale 2.0000 at 60 N. |
| c4 | verified | Local north-south scale at 60 N is also 2.0000 (conformal), so shapes are preserved while area goes as sec^2. Snyder (1987) ch. 7 is the textbook source; I rely on the numerical check. |
| c5 | verified | Mercator scale factor is 1.0000 only at the equator and rises away from it (1.015 at 10 N, 1.064 at 20 N). 'Only true along one line' holds for this world map. |

Stage check: reveal's 'the same bar covers half the ground' and 'a real 2,000 km looks twice as long' (the green bar is drawn at 2,000 / cos(lat) times the equator length) are consistent with the computed values. Unrecorded claims: none.
