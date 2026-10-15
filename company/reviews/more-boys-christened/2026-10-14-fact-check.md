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

## Pass 47

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1014). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions (W-990, commits c7a927e, db7bda4, 3d4a9c1 and the doubling v3) reset to unverified or added. Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold, and my script re-hashes the four files it reads (all match). (2) I read Demo.tsx first, then built the app and regenerated the walkthrough (`npm run walkthrough -- <slug>`; the transcripts on disk predated the revisions), and checked every learner-visible string against the claims. (3) Every number re-derived by my own node script with my own CSV parser (session scratchpad fc47/check.mjs); arrays copied into Demo.tsx compared value by value with the pinned files (0 mismatches in all four). (4) The simulation: mulberry32 re-typed from src/kit/random.ts, run for seed 1 and seeds 1-1000. (5) Sources opened this pass from this host: the OWID Maddison 2020 README.md and datapackage.json (raw.githubusercontent.com), OWID 'The Spanish flu' and 'Life Expectancy' pages (ourworldindata.org). No page contained instructions addressed to an AI; all were treated as data. The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 47').

Unrecorded claims: none found in the regenerated walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | VERIFIED. Rendered: axis title 'boys minus girls, of 5,612–16,145 a year'; reveal 'London christened 5,612 to 16,145 babies a year, so the small surplus showed every year.' Own node script on the pinned Arbuthnot.csv (sha256 d81babe6... matches); Demo.tsx CHRISTENED = the file's 82 rows, 0 mismatches. Males + Females: smallest 1650, 2,890 + 2,722 = 5,612; largest 1705, 8,366 + 7,779 = 16,145. Yearly surplus 82 to 800, above zero in 82 of 82 years. 'So ... showed every year': with p = 0.51628, even the smallest year's expected surplus is 2.4 standard deviations above zero (normal approximation, n = 5,612), against an expected 27.5 of 82 years with girls ahead at 100 a year (exact binomial P(girls ahead) = 0.335); the simulation (c5) shows this on stage. |
| c5 | verified | VERIFIED. Rendered: headline 'simulation: girls ahead in 23 of 82 years', readout 'SIMULATED, 100 A YEAR girls ahead 23 of 82', ticks '−40, 0, +40, +80', back on the real chart 'simulated, 100 a year: girls ahead 23 of 82'; reveal 'Simulated with only 100 a year and the same split, girls led in 23 of 82 years.' Own re-implementation of mulberry32 from src/kit/random.ts (typed from the source, not imported), p = 484,382 / 938,223 = 0.516276, 82 years x 100 draws in year order, boy if rng() < p: seed 1 gives girls ahead 23, tied 4, boys ahead 55, yearly boys minus girls -22 to +24 (fits the ±40 scale). Seeds 1-1000: girls ahead min 14, max 41, 5th percentile 20, 95th 35, median 27.5 (the 500th and 501st sorted values are 27 and 28); 18.3% of seeds give 23 or fewer. Exact expectation 82 x 0.335 = 27.5. The stage and reveal say 'simulated' and quote seed 1's count only, so the sentence holds. Advisory, not blocking: the source field and the Demo.tsx header say 'median 28'; with 1,000 seeds it is 27.5. Seed 1 sits below typical (as the source field already says); whether it was the first seed tried cannot be checked from the artifact. |

**Result (Pass 47):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 5 verified of 5.

No open claim items. Non-blocking advisories are in the basis column.
