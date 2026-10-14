# Fact-check: survive-childhood-live-to-sixty (2026-10-14)

Lesson: src/demos/history/survive-childhood-live-to-sixty/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/survive-childhood-live-to-sixty/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). HalleyLifeTable number: 1 1000, 5 732, 30 531, 50 346, 70 142, 80 41; Demo.tsx SURVIVORS = [1238, ...file] (85 values). |
| c2 | verified | HistData HalleyLifeTable doc (opened): 'The data from Breslau had a mean of 1,238 births per year: this is the value that Halley took for the size, P_0 of the population cohort at age 0.' |
| c3 | verified | HistData docs (opened): HalleyLifeTable 'In 1693 ... Halley studied the birth and death records of the city of Breslau'; Breslau doc gives the years 1687-1691. |
| c4 | verified | Trapezoid rule to age 84: e0 = 27.87 (28); 30 + e30 = 57.71 (58); 60 + e60 = 72.10 (72); died before 5 = 506/1238 = 40.9% (41). Demo.tsx avgDeath() is the same rule. |
| c5 | verified | Follows from c4. Cross-check note (not shown to learners): from Breslau.csv I get a mean age at death of 57.9 for deaths at ages 31-100, or 57.4 if each age is read as age - 0.5. The source string's 57.4 uses the half-year convention. |
| c6 | verified | Breslau doc (opened): deaths 'recorded in each of the years 1687:1691', one city; 'Halley's analysis was based on the total over those years.' |

**Result (Pass 39):** 6 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
