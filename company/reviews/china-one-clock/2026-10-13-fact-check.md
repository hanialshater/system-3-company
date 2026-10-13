# Fact-check: china-one-clock (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; geometry recomputed with topojson-client against src/kit/geo/countries-110m.json in artifacts/scratch/fc-aiecongeo/china.mjs (run from repo root). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | China's single official time is Beijing time, UTC+8 (no DST since 1991). Web check: a secondary source (timeanddate and IANA tz mailing-list posts) agrees, and notes the unofficial Xinjiang clock (UTC+6) used locally; the lesson says 'official', which is correct. I did not open the tz source files themselves (network). |
| c2 | verified | The kit's 110m 'China' outline spans 73.677 E to 135.025 E = 61.35 deg = 4.09 hours of Sun travel (reveal: 61 deg, 4.1 hours). |
| c3 | verified | Mean solar noon on UTC+8: Kashgar (75.99 E) 14:56, Shanghai (121.47 E) 11:54 (for reference Beijing 12:14, Urumqi 14:10). Coordinates are the ones in Demo.tsx; they match Kashgar 39.47 N 75.99 E and Shanghai 31.23 N 121.47 E as I know them, but I did not look them up this session. |
| c4 | verified | Equation of time ranges roughly -14.2 to +16.4 minutes; my own approximation formula gives -14.6 to +16.5, consistent with 'up to about 16 minutes'. |
| c5 | verified | 360 / 24 = 15 degrees per hour; the dashed bands are described as nominal 15-degree bands, not legal zones. |
| c6 | verified | Framing claim: legal time zones are set by governments. Consistent with c1 (one legal zone for 61 degrees of longitude). |

Stage check: reveal numbers (11:54, 14:56, 61 deg, 4.1 h) all reproduced. Unrecorded claims: none.
