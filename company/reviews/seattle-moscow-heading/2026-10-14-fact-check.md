# Fact-check: seattle-moscow-heading, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c8 | verified | Own slerp (sm.mjs): great circle peaks at 82.3 N, lon 43.9 W, between endpoints 47.6 N and 55.8 N; longitudes stay in -122.3..37.6, so no antimeridian cut on the 42 W-centred equirectangular map. Drawn as an arch bending north. Distance re-run 8,370 km. |

Disputes: none.

Result: 1 verified, 0 disputed, 0 withdrawn.

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | Own node: initial bearing 11.5 deg; for headings 10-13 deg the 9,500 km route peaks at 81-83 N near 34 W and stays within -80..+85 deg of the 42 W map centre (no wrap), so on the equirectangular map it is an arch bending north. On the azimuthal equidistant map centred on Seattle every great circle through the centre is a straight line. The 'flat-hit' gate shows the on-target route on the flat map. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.
