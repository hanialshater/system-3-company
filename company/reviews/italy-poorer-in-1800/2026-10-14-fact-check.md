# Fact-check: italy-poorer-in-1800 (2026-10-14)

Lesson: src/demos/history/italy-poorer-in-1800/ (status draft, version 1; builder history-builder-1).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/italy-poorer-in-1800/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). Italy 1310-1871: 562 values, no gaps, identical to Demo.tsx GDP. Maddison README (opened): 'Italy 1310-1871 (North Italy) Malanima, P. (2010), "The long decline of a leading economy: GDP in central and northern Italy, 1300-1913"', so 'north and central' is right. |
| c2 | verified | 1450 3,218.06; 1800 2,403.94; index 74.70, shown 75. |
| c3 | verified | (2403.94/3218.06)^(1/350) - 1 = -0.0833% a year, shown 0.08%. |
| c4 | verified | 1310 2,857.08 -> 88.78 (89); 1871 2,811.12 -> 87.35 (87). |
| c5 | verified | Follows from c2-c3 on this series; the reveal says 'On this series'. |
| c6 | verified | README opened: one source for 1310-1871 (Malanima 2010, North Italy), Baffigi (2011) from 1871. The CSV header is 'GDP per capita' with no unit, and the README states none. |

**Result (Pass 39):** 6 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
