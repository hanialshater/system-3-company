# Fact-check: centre-moves-the-gap, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | On a Greenwich-centred world map Tokyo and Los Angeles are about 258° of map width apart; ... | Node: Haneda 139.78E vs LAX 118.41W = 258.19 degrees on the Greenwich map, 360 - 258.19 = 101.81 on the 180-centred map; ratio 2.54 ('about 2.5'). Matches the Demo.tsx projection gapDegrees(). |
| c2 | verified | On an Equirectangular map each degree of longitude is equally wide. | Equirectangular (plate carree) maps x = R lambda, so equal longitude steps are equal widths at every latitude (Snyder, Map Projections: A Working Manual). |
| c3 | verified | The great-circle distance between Tokyo (Haneda) and Los Angeles (LAX) is about 8,810 km, ... | Node haversine, R = 6371.0088 km (the kit's EARTH_RADIUS_KM), Haneda (35.55N,139.78E) to LAX (33.94N,118.41W) = 8,812.6 km; with exact airport coordinates 8,812.6 km; shown as 8,810. Independent of map centre (the formula uses no projection). |
| c4 | verified | Most world maps are cut so the Pacific's two sides sit at opposite edges; Greenwich in the... | Greenwich-centred world maps are the common default (the prime meridian was fixed at Greenwich at the 1884 International Meridian Conference), so the Pacific is split at the edges; calling it a convention is accurate. 'Most' is a general statement about common maps, not a count. |

## Result (pass 4)
4 verified, 0 disputed, 0 left unverified, 0 added unverified.
