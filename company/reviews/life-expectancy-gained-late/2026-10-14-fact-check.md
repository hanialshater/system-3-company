# Fact-check: life-expectancy-gained-late (2026-10-14)

Lesson: src/demos/history/life-expectancy-gained-late/ (status draft, version 1; builder history-builder-3).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/life-expectancy-gained-late/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). lex world: 1800 30.64173, 1900 33.48469, 2000 68.20445, 2023 74.04122. Concept lex v15 (ddf--concepts.csv opened): 'The number of years a newborn infant would live if the current mortality rates at different ages were to stay the same'. |
| c2 | verified | PTS in Demo.tsx = file values at the 10 years, full precision (all 10 identical); rounded 30.6 31.1 31.4 32.4 33.5 39.3 51.8 60.8 68.2 74.0. |
| c3 | verified | +2.843, +34.720, ratio 12.21 (12), 2000-2023 +5.837 (5.8); hook rounds 2.8 to 3. |
| c4 | verified | Falls of more than a year: 1876, 1918, 1927, 1941, 1942, 1943, 1959, 1960, 2021 (my script, same list). 1918 falls 35.63 -> 24.15, so 'fell sharply' holds. |
| c5 | unverified | Held. No opened source names a cause for any of these falls (the file has none; Gapminder's lex documentation is unreachable). Fix (builder): use the fallback and cut 'such as epidemic years', leaving '...and single years fell sharply.' |

**Result (Pass 39):** 4 verified, 0 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c5 (unverified): fix in the note above. Owner: history-builder-3.
