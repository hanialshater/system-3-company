# Fact-check: london-la-over-greenland, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | On a gnomonic map every great circle, the shortest path between two points on a ball, is a... | Gnomonic projection maps every great circle to a straight line (central projection from the centre of the sphere; Snyder, Map Projections: A Working Manual, USGS PP 1395, ch. 22; Wolfram MathWorld 'Gnomonic Projection'). Also true by construction: a great circle plane through the centre cuts the tangent plane in a line. |
| c2 | verified | A gnomonic map shows less than half the globe. | r = R tan(c) diverges at c = 90 deg, so at most an open hemisphere (strictly less than half) can be shown; the lesson clips at 52 deg. |
| c3 | verified | The shortest London to Los Angeles route crosses the southern tip of Greenland, not Icelan... | Re-ran with d3-geo geoInterpolate + geoContains against the kit's world-atlas 110m countries (node): UK 0-337 km, Ireland ~635-639, sea, Greenland 2,780-3,156 km (42.6W-49.9W, 62.2-62.4N), sea, Canada from 4,211, US from 6,619. Iceland outline min distance 432 km. The route crosses southern Greenland about 280 km north of Cape Farewell (59.8N); 'southern tip' is loose but fair for the southern part of an island 2,600 km long. |
| c4 | verified | The shortest London to Los Angeles route is about 8,760 km on a round Earth, ignoring wind... | Node: great-circle London (51.5072N,0.1276W) to Los Angeles (34.0522N,118.2437W) = 8,755.6 km on R = 6371.0088 km, shown 8,760. Airline routes differ; the lesson says ignoring winds. |
| c5 | verified | The line that looks straight on Mercator is a constant compass bearing; from London to Los... | Node: rhumb-line length 9,733.3 km (formula with Delta-psi); Mercator rhumb lat at 43W = 45.7N, about 16 deg south of Greenland's southern coast, so 'far south of Greenland' holds; 9,733 vs 8,756 km makes it longer. A rhumb line is a constant-bearing line and is straight on Mercator (Snyder ch. 7). |

## Result (pass 4)
5 verified, 0 disputed, 0 left unverified, 0 added unverified.
