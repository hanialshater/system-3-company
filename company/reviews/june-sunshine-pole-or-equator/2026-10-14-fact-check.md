# Fact-check: june-sunshine-pole-or-equator (2026-10-14)

Board: W-665. Lesson: src/demos/geography/june-sunshine-pole-or-equator/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/geography-wave-j.mjs, sections watershed, ekman, june, insol-annual and sunset, re-run. The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: ERA-Interim monthly winds (pydata/xarray-data eraint_uvz.nc, raw.githubusercontent.com); astropy 8.0.1 (IAU 2015 B3 nominal L_sun, IAU 2012 au, ERFA Sun ephemeris); pyproj (WGS 84 ellipsoid); geonamescache (GeoNames London); tzdata 2026.5 (IANA Europe/London). Not opened: Talley et al. 2011, Hartmann 2016, Meeus 1998, Kopp and Lean 2011, Berger 1978. Where a claim cites them, the verdict rests on a derivation or on an opened source named in the note.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: integrating the lesson's hourly flux() over 24 h (28,800 steps) reproduces the closed form to 0.01 W/m2 at 0, 30, 45, 60, 66, 67, 80, 89 and 90 N. The formula is the standard daily-mean insolation (Berger 1978 not opened; verified on derivation). artifacts/fact-check-wave-j/wj-econ-phys-math-geo/geo/insol.mjs. |
| c2 | verified | Opened: astropy 8.0.1 constants, IAU 2015 Resolution B3 nominal solar luminosity 3.828e26 W and IAU 2012 B2 au. L/(4 pi au^2) = 1,361.2 W/m2; Resolution B3 defines the nominal L from a TSI of 1361 W/m2. Kopp and Lean 2011 not opened. |
| c3 | verified | Opened: astropy 8.0.1 get_sun (ERFA built-in ephemeris). 21 June 2026 12:00 UTC: declination 23.436 degrees, distance 1.01620 AU. IAU 2006 mean obliquity 23.4358 degrees. Meeus not opened. |
| c4 | verified | Derivation re-run: 524.2, 384.8 and 483.4 W/m2 give 12.6, 9.2 and 11.6 kWh/m2; noon Sun 23, 67 and 68 degrees; days 24, 12 and 15.4 h. The maximum over 0-90 N is at the pole. fmtDay prints '12 h' for the equator. |
| c5 | verified | Derivation: with dec > 0, both sin(lat) sin(dec) and h0 grow northward. 'Above the air' is a scope statement that matches the model (no atmosphere). The recall's wrong option 'closer to the Sun in June' is indeed wrong: Earth is at 1.016 AU (c3). |

**Result:** no disputes. All claims verified.
