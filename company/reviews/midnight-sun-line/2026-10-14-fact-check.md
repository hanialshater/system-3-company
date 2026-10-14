# Fact-check: midnight-sun-line, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 | verified | Tropic of Cancer = northern declination limit, 23.44 N; on the June solstice subsolar latitude = declination, so the noon Sun is overhead there. Solstice falls June 20-22 by year and zone; declination one day off differs by 0.0035 deg, so "June 21 longest day" holds to seconds. Suggest "around June 21". |
| c6 | verified | Read Demo.tsx: strip[h] = geoDistance(town, [(12-h)*15, 23.44]) < pi/2. Own solar-elevation formula (ms2.mjs) gives the same lit hours: 65 N 21 of 24 cells, 66.6 N 24, consistent with the Daylight readout. |

Disputes: none.

Result: 2 verified, 0 disputed, 0 withdrawn.
