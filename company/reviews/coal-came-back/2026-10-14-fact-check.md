# Fact-check: coal-came-back (2026-10-14)

Lesson: src/demos/history/coal-came-back/ (status draft, version 1; builder history-builder-3).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/coal-came-back/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). RAW coal/oil/gas/co2 in Demo.tsx = World row rounded to 0.1 Mt, 1750-2024 (275 values each, 0 mismatches). Codebook (opened) defines coal_co2, oil_co2, gas_co2, co2 in Mt. |
| c2 | verified | 1900 coal 1882.645 / 1962.884 = 95.9%. |
| c3 | verified | oil_co2 > coal_co2 in exactly 1968-2004 (37 years, contiguous); coal ahead every year 2005-2024. 1968: oil 5,528.2, coal 5,319.7. |
| c4 | verified | 2024: coal 15,805.3 (40.9%), oil 12,470.6 (32.3%), gas 8,009.8, total 38,598.6; 1968 41.2/42.8; 2005 38.8/37.3. The denominator includes cement, flaring and other industry. That matches the Global Carbon Budget's 'fossil CO2' term (OWID metadata: 'fossil fuels and industry'), so 'fossil CO2' is right. |
| c5 | verified | 15,805.3 / 5,319.7 = 2.97, shown 3. |
| c6 | verified | Held sentence checked against an opened source: OWID metadata for these indicators (raw.githubusercontent.com/owid/etl/master/etl/steps/data/garden/gcp/2025-11-13/global_carbon_budget.meta.yml, line 165): 'Fossil CO2 emissions are estimated using national statistics on energy use - such as coal, oil, and gas consumption - and industrial production'. Builder: re-cite the source to that file. |
| c7 | verified | OWID co2-data README (opened): 'Most metrics are published on an annual basis'; the changelog lists a new Global Carbon Budget each year (v2021, 2022, 2023, 2024, 2025). Pin check: I re-fetched owid-co2-data.csv from master today and its SHA-256 (7f78e2b2...) still equals the pin. So the numbers stand on today's master too. They will need re-checking when OWID next updates (expected with the next Global Carbon Budget). |

**Result (Pass 39):** 7 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.
