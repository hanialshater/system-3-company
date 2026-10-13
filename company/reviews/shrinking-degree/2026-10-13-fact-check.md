# Fact-check: shrinking-degree (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; sphere and WGS84-ellipsoid degree lengths computed in artifacts/scratch/fc-aiecongeo/deg.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | pi x 6371.0088 / 180 = 111.195 km. |
| c2 | verified | Sphere: 60 N 55.60 km, 80 N 19.31 km, 90 N ~0. On the WGS84 ellipsoid the real figures are 55.80 and 19.39 km, so 'about 56' and 'about 19' hold for the real Earth too. |
| c3 | verified | WGS84 degree of latitude: 110.574 km at the equator to 111.694 km at the pole (all within 0.6% of 111.1). The lesson's 'about 111 km everywhere' is right to a percent; the sphere gives a constant 111.195. |
| c4 | verified | WGS84: pi x 6378.137 / 180 = 111.319 km at the equator (record says 111.3). |
| c5 | verified | Oslo 59.91 N, Helsinki 60.17 N by standard gazetteer values; I did not open GeoNames this session, but both are widely documented to within 0.1 degree and the lesson only says 'about 60 N'. |
| c6 | verified | Meridians are half great circles from pole to pole; definition. |

Stage check: reveal numbers (56 km, 55.6 km, 111 km, 19 km at 80 N, zero at the pole) all reproduced. 'Its north-south size on the ground stayed the same' follows from c3 (the box is 10 degrees of latitude). Unrecorded claims: none.
