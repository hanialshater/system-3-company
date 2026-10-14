# Fact-check: drift-of-a-straight-throw (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Horizontal Coriolis parameter f = 2 Omega sin(lat): 0 at the equator, increasing monotonically to 2 Omega at the poles. Demo.tsx drift() returns east = 0 when f = 0 and the readout shows '0 m' at 0N; drift grows with the latitude slider. The claim is about the horizontal deflection the stage shows (the vertical component is out of scope). |
| c6 | verified | 100 m/s x 3.6 = 360 km/h; 1,000,000 m / 100 m/s = 10,000 s = 2.78 h ('about 3 hours'). The predict text states both. |
| c7 | verified | Definition: in a rotating frame a moving body is deflected sideways by the Coriolis effect (apparent force -2 Omega x v). The reveal names the stage's drift this way. Standard naming; no number at stake. |

**Result:** all pass-17 claims verified.

