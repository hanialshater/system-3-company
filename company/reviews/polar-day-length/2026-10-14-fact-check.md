# Fact-check: polar-day-length (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c3 | verified | Aphelion 2026 = 6 July 17:30 UTC (USNO via Farmers' Almanac, search snippet); model PERI 283 deg puts aphelion at longitude 103 deg, about two weeks after the June solstice. Kepler's second law gives slowest motion at aphelion, which lies in the March-September half. |
| c6 | verified | Demo.tsx: orthographic rotate([0,-90]) (pole view), night = geoCircle center [180,-dec] radius 90 (Sun at longitude 0), OE = 0.4 vs ECC = 0.016709, NORTH_DAYS/SOUTH_DAYS labels on the inset. |
