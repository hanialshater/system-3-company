# Fact-check: which-sea-gets-the-rain (2026-10-14)

Board: W-665. Lesson: src/demos/geography/which-sea-gets-the-rain/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx, model.ts on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/geography-wave-j.mjs, sections watershed, ekman, june, insol-annual and sunset, re-run. The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: ERA-Interim monthly winds (pydata/xarray-data eraint_uvz.nc, raw.githubusercontent.com); astropy 8.0.1 (IAU 2015 B3 nominal L_sun, IAU 2012 au, ERFA Sun ephemeris); pyproj (WGS 84 ellipsoid); geonamescache (GeoNames London); tzdata 2026.5 (IANA Europe/London). Not opened: Talley et al. 2011, Hartmann 2016, Meeus 1998, Kopp and Lean 2011, Berger 1978. Where a claim cites them, the verdict rests on a derivation or on an opened source named in the note.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. One found; see below.

**Unrecorded claim found:** the recall ('A ridge runs 20 km from a country's west coast. Most of its rain probably reaches...' / why: '...that is most of the land') assumes the country is much wider than 40 km. I recorded it as c5, unverified (I do not verify a claim I recorded). Fix: give the country a width.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Simulation re-run: node ran model.ts itself (type-stripped copy). Drop at (10, 12) ends east after 30 squares; drop at (5, 12) ends west. 55 km = 11 x 5 and 150 km = 30 x 5. Identical to section 'watershed' of company/domains/briefs/checks/geography-wave-j.mjs (its mulberry32 is written differently but is equivalent). artifacts/fact-check-wave-j/wj-econ-phys-math-geo/geo/. |
| c2 | verified | Simulation re-run: 764 of 960 east (79.6%, shown 80%), 284 nearer the west coast still drain east. The divide sits at x = 7-9 in every row, with no east square west of a west square in any row. |
| c3 | verified | Definition, true by construction: every square has one outlet, and divideSegs are the edges between squares with different outlets. |
| c4 | verified | Convention: the stage caption, and KM = 5. |
| c5 | unverified | Recorded by the fact-checker as an unrecorded learner-facing claim (so I do not verify it myself). It holds only if the country is wider than twice the ridge's distance from the coast; the recall never says so. Fix for demo-builder: state a width (for example 'a country 300 km wide'), then a different checker verifies it. |

**Result:** no disputes. Held unverified: c5. All other claims verified. The fixes are in the notes; demo-builder owns them (board).
