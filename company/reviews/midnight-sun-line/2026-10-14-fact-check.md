# Fact-check: midnight-sun-line, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 | verified | Tropic of Cancer = northern declination limit, 23.44 N; on the June solstice subsolar latitude = declination, so the noon Sun is overhead there. Solstice falls June 20-22 by year and zone; declination one day off differs by 0.0035 deg, so "June 21 longest day" holds to seconds. Suggest "around June 21". |
| c6 | verified | Read Demo.tsx: strip[h] = geoDistance(town, [(12-h)*15, 23.44]) < pi/2. Own solar-elevation formula (ms2.mjs) gives the same lit hours: 65 N 21 of 24 cells, 66.6 N 24, consistent with the Daylight readout. |

Disputes: none.

Result: 2 verified, 0 disputed, 0 withdrawn.

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of dayHours(): 24 h first at 66.56 N (66.5 gives 23.42 h; first 0.1 slider step with 24 h is 66.6); 90-23.44 = 66.56 shown as 66.6. Since sets < 66.56 <= never, the reveal's line always lies between the two quoted latitudes. Obliquity 23.44 (IAU 2006: 23.4393 at J2000) correct to my knowledge. |
| c7 | verified | Own node: a 90-degree circle centred at 23.44 S reaches at most 66.56 N, on the antisolar meridian, leaving 23.44 degrees to the pole; any parallel above it is wholly lit. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.
