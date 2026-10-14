# Fact-check: why-the-poles-get-less-sun (2026-10-14)

Board: W-665. Lesson: src/demos/geography/why-the-poles-get-less-sun/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/geography-wave-j.mjs, sections watershed, ekman, june, insol-annual and sunset, re-run. The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: ERA-Interim monthly winds (pydata/xarray-data eraint_uvz.nc, raw.githubusercontent.com); astropy 8.0.1 (IAU 2015 B3 nominal L_sun, IAU 2012 au, ERFA Sun ephemeris); pyproj (WGS 84 ellipsoid); geonamescache (GeoNames London); tzdata 2026.5 (IANA Europe/London). Not opened: Talley et al. 2011, Hartmann 2016, Meeus 1998, Kopp and Lean 2011, Berger 1978. Where a claim cites them, the verdict rests on a derivation or on an opened source named in the note.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation re-run from Demo.tsx annual(): 415.5, 365.2, 277.0, 236.3 and 172.3 W/m2, giving 100%, 88%, 67%, 57% and 41%; pole/equator 0.415. The circular-orbit average is stated in the code comment. Hartmann not opened; verified on derivation. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/geo/insol.mjs. |
| c2 | verified | Opened: WGS 84 via pyproj (a = 6,378,137 m, b = 6,356,752.314 m) gives the IUGG mean radius (2a + b)/3 = 6,371.0088 km = EARTH_RADIUS_KM in src/kit/geo; astropy gives the au as exactly 149,597,870,700 m (IAU 2012 B2). 6,371/149,597,870.7 = 0.0043%, shown 0.004%. Geometry: at equinox the pole is R farther along the Sun line than the sub-solar point (at solstice the summer pole is nearer than the centre), so 'at most'. |
| c3 | verified | Derivation: 1 - (AU/(AU + R))^2 = 0.0085% < 0.01%. |
| c4 | verified | Derivation: a parallel beam meets the ground at incidence angle = latitude at equinox noon, so it spreads over 1/cos(lat): 1.15, 1.61 and 2.00 at 30, 51.5 and 60 N, and grazes the ground at 90. Code: spread = 1/cos(lat), and at the pole the lit arc draws only the part of the band below the pole. |
| c5 | verified | Convention: the stage caption. |

**Result:** no disputes. All claims verified.
