# Fact-check: bearing-spiral-to-the-pole (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Node: tan 80 x ln tan(45 + 89/2) / 2pi = 4.280 turns, readout toFixed(1) at 89N = 4.3; psi(phi) diverges at 90, so turns are endless (readout prints 'endless' at the pole). Matches the stage. |
| c3 | verified | Node: s = R phi / cos alpha; to 89N = 56,990.9 km, to the pole 57,631.2 km, difference 640.3 km; fmtKm rounds to 56,990 / 57,630 / 640, as the reveal prints. s is finite while psi diverges. |
| c5 | verified | For a constant azimuth, d(northing)/ds = cos alpha: cos 80 = 0.1736 ('about 0.17'), independent of position. 1/cos 80 = 5.759 ('about 5.8'); 10,007.6 km x 5.759 = 57,631 km, consistent with c3. Stage prints the pole distance as 10,010 km. |

**Result:** all pass-17 claims verified.

