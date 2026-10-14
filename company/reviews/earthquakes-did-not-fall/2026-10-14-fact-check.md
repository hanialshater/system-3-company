# Fact-check: earthquakes-did-not-fall (2026-10-14)

Lesson: src/demos/history/earthquakes-did-not-fall/ (status draft, version 1; builder history-builder-3).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/earthquakes-did-not-fall/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). disasters.csv 'All natural disasters': 1900-1958 25,237,230; 1959-2017 7,369,926; -70.8%. Only 1904 has no row. Demo.tsx RAW.all identical (118 values). vega datapackage.json (opened): 'Annual number of deaths from disasters, sourced from EM-DAT ... Processed by Our World in Data'. |
| c2 | verified | Earthquake: 1,205,549 -> 1,371,252, +13.7% (shown 14%; the predict option 'about 15%' is a fair round). Missing years 1900, 1904, 1911, 1916, 1919, 1921, 1937 as stated. |
| c3 | verified | Mean Gapminder pop 1900-1958 2.106 bn, 1959-2017 5.186 bn (x2.46); per million a year 9.70 and 4.48 (shown 9.7, 4.5). Demo.tsx POP identical to the file for 1900-2017. |
| c4 | verified | 1976 276,994, 2004 227,290, 2010 226,733 = 53.3% of 1,371,252. |
| c5 | verified | Half-total difference 165,703 is smaller than any of the three biggest later years. Follows. |

**Result (Pass 39):** 5 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
