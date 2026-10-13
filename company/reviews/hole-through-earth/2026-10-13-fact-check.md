# Fact-check: hole-through-earth (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Antipode rule (-lat, lon+-180); the ellipsoid is centrally symmetric. |
| c2 | verified | node (kit 1:110m, geoContains): (176.30 E, 40.42 S) is inside New Zealand; Madrid 40.42 N 3.70 W is inside Spain. |
| c3 | verified | node: 1-degree cos-weighted grid on the kit's land polygon: 28.9% of surface is land, 13.3% of land has land antipode (3.86% of surface). Search: published about 15% of land / 4.4% of surface (Wikipedia, secondary). Stage says 'on this map' and 'about'. |
| c4 | verified | node: 99.3% of US cells have ocean antipodes (0.6% Antarctica, 0.1% Botswana). |
| c5 | verified | node: China 72.7% ocean, Argentina 22.3%, Chile 4.8%. |
| c6 | verified | node: Beijing (-63.6, -39.9) Argentina; Buenos Aires (121.62 E, 34.6 N) no land (Yellow Sea/East China Sea off China); New York (106 E, 40.71 S) no land (southern Indian Ocean). |
