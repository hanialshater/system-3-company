# Fact-check: higher-orbit-slower (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | v = sqrt(GM/r) for circular orbits; GM_E = 3.986004e14 m^3/s^2 is the standard value (IERS/IAU). |
| c2 | verified | node: r=6771 km gives 7.673 km/s, 92.4 min; r=42164 km gives 3.075 km/s, 23.93 h. |
| c3 | verified | node: r=6571 km gives 7.788 km/s, 88.35 min; r=20000 km gives 4.464 km/s, 7.82 h. |
| c4 | verified | node: (6771/42164)^2 = 0.0258 (2.6%); the reveal computes the same rounding. |
| c5 | verified | Circular orbit E = -GMm/2r rises with r while KE = GMm/2r falls: re-derived. |
| c6 | verified | Stage states to-scale top view and 2000x speed-up; laps T/2000 s on screen; ISS altitude about 400 km is illustrative and flagged so. |
