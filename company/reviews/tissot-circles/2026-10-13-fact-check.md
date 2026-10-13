# Fact-check: tissot-circles (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; the lesson's two projections and geoCircle rebuilt with d3-geo in artifacts/scratch/fc-aiecongeo/tissot.mjs (run from repo root). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Mercator, 1,000 km circles: area ratio 60 N / equator = 4.158 ('4.2'); 1.000 at 0, 1.339 at 30, 2.025 at 45. |
| c2 | verified | sec^2(60) = 4.000; the circle's top reaches 68.99 N (sec^2 69 = 7.79 against 2.52 at its bottom edge, 51 N), so the area ratio exceeds 4, as 4.158 does. |
| c3 | verified | Drawn bounding box of the 60 N circle on Mercator: 97.2 x 98.8 px (within 2% of round). A conformal map keeps infinitesimal circles round; at 1,000 km the circle is very slightly egg-shaped, as the record says. 'Still round' is a fair description. |
| c4 | verified | Equal Earth area ratio is 1.000 at 0, 30, 45, 60 N. The 60 N circle's bounding box is 74.0 x 42.9 (squashed). |
| c5 | verified | Gauss's Theorema Egregium argument (conformal plus equal-area would force an isometry, impossible for a sphere) is sound; it is the standard result (Snyder 1987 ch. 1). |
| c6 | verified | radius 1,000 km = 8.993 degrees; both circles' spherical area is 3.135 million km2 (cap formula 3.135 million, identical to 4 digits), shown in the record as 3.14 million. |

Note (not a false claim): on Equal Earth the equator reference circle is also not round. Its bounding box is 48.4 x 65.1 px (stretched vertically), while the 60 N circle is 74.0 x 42.9 (squashed). The reveal says 'the northern circle was squashed', true, but could leave the impression that the equator circle stays round. Unrecorded claims: none.
