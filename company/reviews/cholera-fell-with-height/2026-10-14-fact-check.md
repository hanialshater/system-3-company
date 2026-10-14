# Fact-check: cholera-fell-with-height (2026-10-14)

Lesson: src/demos/history/cholera-fell-with-height/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/cholera-fell-with-height/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). Cholera.csv 38 districts; Demo.tsx DISTRICTS identical (deaths, popn, elevation, water). HistData doc (opened): 'deaths from cholera in 1849', 'elevation, in feet above the high water mark', 'water supply region'; Source: Bingham et al. (2004) Table 2. (The doc's own description also says 'Brigham et al. (2003)'; the Source section is the citation to use.) |
| c2 | verified | Under 20 ft: 16 districts, 8,584 / 935,869 = 91.7 (92); 80 ft and up: 4 districts (St Pancras, Islington, Marylebone, Hampstead), 817 / 412,415 = 19.8 (20); ratio 4.63, 'about 5' (and 'about a fifth as many'). Every district's own rate rounds to the file's cholera_drate. |
| c3 | verified | Low districts by water: Battersea 11, New River 4, Kew 1. Doc (opened): 'Thames, between Battersea and Waterloo Bridges' (central London). |
| c4 | verified | Within-supplier Pearson r (elevation vs rounded rate): Battersea -0.680 (12 districts), New River -0.548, Kew -0.475. |
| c5 | verified | Doc (opened): 'number of deaths registered from cholera in 1849', by London district. |

**Result (Pass 39):** 5 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
