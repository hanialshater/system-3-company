# Fact-check: shortest-way-to-tokyo (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; distances recomputed with a hand-written haversine (not d3's geoDistance) and a numerical integration of the rhumb line, plus topojson-client/d3-geo for the country test, in artifacts/scratch/fc-aiecongeo/tokyo.mjs (run from repo root). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Great circle JFK-HND = 10,875.5 km (haversine, R = 6371.0088); identical to d3. Shown as 10,880 km (10-km rounding). |
| c2 | verified | Maximum latitude of the great circle: 69.850 N by closed form and by sampling, at 145.42 W; the point lies inside the 110m 'United States of America' shape (Alaska). The great circle also passes over Canada and Russia, so 'passing over northern Alaska' is true but not exclusive. The vertex is inland of the Beaufort coast by a small margin in the 110m data; in reality about 30 km inland, so still Alaska. |
| c3 | verified | Rhumb line, west across the Pacific, by the closed-form formula = 12,818.14 km and by direct numerical integration = 12,818.14 km; ratio 1.1786, i.e. 17.9% longer (reveal: 18%). The straight line on Mercator is a rhumb line because Mercator is conformal. |
| c4 | verified | Via Honolulu 14,200.7 km; via Mexico City 14,677.9 km. The waypoints are city-centre coordinates (Honolulu 21.307 N 157.858 W is the downtown point; the airport is at 21.32 N 157.92 W), so the distances are 'via Hawaii' not 'via HNL'; the difference is a few km. |
| c5 | verified | Shortest path on a sphere is a great-circle arc; the haversine/d3 distance is the great-circle distance by definition. |
| c6 | verified | Mercator scale factor sec(latitude), checked numerically in ruler-on-mercator (2.0000 at 60 N). |
| c7 | verified | Modelling statement, stated to the learner (reveal last line). |

Stage check: the question says the flight 'takes the shortest path over the globe', and the shortest path tried is the Alaska route (10,880 km vs 12,820, 14,200, 14,680); the three ordinary routes are all longer, as stated. Airport coordinates (JFK 40.640 N 73.779 W; HND 35.549 N 139.780 E) match published values to 3 decimals as I know them; I did not look them up. Unrecorded claims: none.
