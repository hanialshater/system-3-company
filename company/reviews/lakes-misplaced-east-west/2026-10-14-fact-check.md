# Fact-check: lakes-misplaced-east-west (2026-10-14)

Lesson: src/demos/history/lakes-misplaced-east-west/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/lakes-misplaced-east-west/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). OldMaps.csv: 39 points, 11 maps, Coronelli 1688 to Melish 1818; Demo.tsx ACTUAL and MAPS equal the file in absolute value (ACTUAL longitudes stored as negative = west, a display convention). HistData doc (opened) cites Andrews & Herzberg (1985), Table 10.1, and notes the sign typos. |
| c2 | verified | My script: Coronelli NS 58.9 / EW 363.1 km; Melish NS 24.1 / EW 41.1; EW worse on 9 of 11 (not Mitchell 1755 47.5/46.1, Lattre 1784 50.2/39.9). Demo.tsx uses the same formulas (cos of actual latitude). |
| c3 | verified | Same derivation as rome-placed-too-far-east c6: latitude from the altitude of the Sun or a star; longitude needs a local-time difference at 15 degrees per hour. |
| c4 | verified | HistData OldMaps doc (opened): coordinates 'were recorded using a grid overlaid on each of 11 old maps, and using linear interpolation'. 'Read off by hand' is a fair paraphrase. |
| c5 | verified | Code checked: geoConicEqualArea().parallels([42, 47]).rotate([84, 0]) in Demo.tsx; WorldMap from src/kit/geo uses countries-110m.json (Natural Earth 1:110m). |

**Result (Pass 39):** 5 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
