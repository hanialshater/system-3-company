# Fact-check: more-boys-christened (2026-10-14)

Lesson: src/demos/history/more-boys-christened/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/more-boys-christened/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). Arbuthnot.csv Males sum 484,382, Females 453,841, 82 rows 1629-1710; Demo.tsx CHRISTENED identical. The 1674 and 1704 rows are identical (6,113 / 5,738); the HistData doc (Zabell) says the 1704 values were 'probably copied erroneously from the former'. |
| c2 | verified | 82 of 82 years Males > Females; 106.73 (107); min 1703 101.07 (101); max 1661 115.61 (116). Note, not blocking: one of the 82 years (1704) is probably a copying error, so the record has 81 independent years. Arbuthnot's own argument used all 82, and the lesson draws them as given. |
| c3 | verified | Each year's counts are 2,722-8,426 per sex; yearly surplus 82-800, all above zero. As stated. |
| c4 | verified | HistData Arbuthnot doc (opened), quoting Oeppen: 'Arbuthnot's data are annual counts of public baptisms, not births. Birth-baptism delay meant that infant deaths could occur before baptism.' |

**Result (Pass 39):** 4 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
