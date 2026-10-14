# Fact-check: london-la-over-greenland (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Node: rhumb length with Delta-psi formula 9,733.3 km (fmtKm 9,730) vs great circle 8,755.6 km (8,760). Rhumb latitude at 43W = 45.8N, at 50W = 44.8N, about 14-16 deg south of Greenland's southern tip (about 60N), over open Atlantic. On the stage the dashed line joins the two projected cities on Mercator, which is the rhumb line (Mercator maps loxodromes to straight lines). |
| c6 | verified | A great circle is the intersection of the sphere with a plane through its centre; the shortest path between two points on a sphere lies along one (the minor arc). The claim's 'is called' is the standard simplification and matches c1 (verified). |

**Result:** all pass-17 claims verified.

