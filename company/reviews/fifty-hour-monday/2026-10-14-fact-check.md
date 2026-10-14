# Fact-check: fifty-hour-monday (2026-10-14)

## Pass 17 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage captions, readouts, reveal), then recomputed every number in my own node scripts (scratchpad fc17: haversine and d3-geo geoDistance with R = 6,371.0088 km, rhumb lines, Kepler declination, day length, land-mask rebuild from the kit's land-110m.json). Source claims were corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Demo.tsx draws bands o*15 +/- 7.5 deg for o = -12..12 (nominal strips; stage caption 'Bands: 15 deg strips of the world'). Coordinates corroborated by web search: Kiritimati 1 52 N 157 24 W (Nations Online; NGA GeoNames 1.8667N 157.4167W; en.wikipedia 1.85N 157.40W); Baker Island 0 11 45 N 176 28 45 W (en.wikipedia, 0.1958N 176.4792W). Claim's 'about 1.9 N, 157.4 W' and '0.2 N, 176.5 W' and the stage's 1.87/-157.36, 0.19/-176.48 agree within 0.06 deg. |
| c5 | disputed | Second half holds (UTC+n = n hours ahead of UTC). First half is wrong for about seven months a year: Greenwich clocks keep UK civil time, GMT (= UTC) in winter but BST (UTC+1) from late March to late October (timeanddate 'GMT vs UTC'; time.is Royal Observatory). The stage caption repeats 'UTC is the clock at Greenwich'. Fix (builder, claim and Demo.tsx caption): 'UTC is the world reference clock, the same as Greenwich winter time (GMT); UTC+14 runs 14 hours ahead of it.' |

**Result:** c5 disputed (blocks publishing until the builder fixes it and a fact-checker re-checks); the rest verified.

