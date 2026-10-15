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

## Pass 47

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1014). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions (W-990, commits c7a927e, db7bda4, 3d4a9c1 and the doubling v3) reset to unverified or added. Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold, and my script re-hashes the four files it reads (all match). (2) I read Demo.tsx first, then built the app and regenerated the walkthrough (`npm run walkthrough -- <slug>`; the transcripts on disk predated the revisions), and checked every learner-visible string against the claims. (3) Every number re-derived by my own node script with my own CSV parser (session scratchpad fc47/check.mjs); arrays copied into Demo.tsx compared value by value with the pinned files (0 mismatches in all four). (4) The simulation: mulberry32 re-typed from src/kit/random.ts, run for seed 1 and seeds 1-1000. (5) Sources opened this pass from this host: the OWID Maddison 2020 README.md and datapackage.json (raw.githubusercontent.com), OWID 'The Spanish flu' and 'Life Expectancy' pages (ourworldindata.org). No page contained instructions addressed to an AI; all were treated as data. The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 47').

Unrecorded claims: none found in the regenerated walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | disputed | DISPUTED. Rendered: 'Where it stops: this is one reconstruction, of the north and centre only, and the data file names no unit, so it is shown as an index.' 'One reconstruction, of the north and centre only' holds: OWID Maddison README (opened 2026-10-15 from raw.githubusercontent.com): 'Italy 1310-1871 (North Italy) Malanima, P. (2010), "The long decline of a leading economy: GDP in central and northern Italy, 1300-1913"'. The unit clause does not hold as a learner reads it. The CSV header is 'GDP per capita' with no unit (literally true), but the dataset's own datapackage.json, published in the same OWID folder as the pinned CSV (opened 2026-10-15: .../datasets/Maddison Project Database 2020 (Bolt and van Zanden (2020))/datapackage.json), gives the field 'GDP per capita' owidDisplaySettings unit '2011 int-$', and the GDP field is described as 'measured in international-$ using 2011 prices'. So the unit is stated by the source; 'names no unit, so it is shown as an index' tells the learner the unit is unknown, which it is not. The index is still a sound way to show it (ratios do not depend on the unit). Fix (history-builder-2): either (a) drop the unit reason: 'Where it stops: this is one reconstruction, of the north and centre only, shown as an index (1450 = 100).', or (b) state the unit: '... the figures are in 2011 international dollars, shown here as an index.' Also cm-history: the maddison pin's 'what' in history-data.mjs ('Units are not stated in the copy we opened') should cite datapackage.json's '2011 int-$'. |
| c7 | verified | VERIFIED. Rendered: '25-year averages' view labels 'avg 101' and 'avg 79', readout '1438–1462: 101 → 1788–1812: 79'; reveal 'averaged over the 25 years around each date, it still fell, from 101 to 79'. Own node script on the pinned maddison2020.csv (sha256 23a67c11... matches); Demo.tsx GDP = the file's 562 Italy values 1310-1871, 0 mismatches, none missing. Index 100 x g / g(1450), g(1450) = 3,218.06. Centred 25-year means: 1438-1462 GDP 3,251.9 -> index 101.05 -> 101; 1788-1812 GDP 2,531.1 -> index 78.65 -> 79; ratio 77.84%, a fall of 22.2%. Robust: 21-year windows 100.43 -> 78.68 (fall 21.7%); 51-year windows 99.84 -> 79.46 (fall 20.4%); 10-year 1445-1454 vs 1795-1804 ratio 75.1%; shifting either 25-year centre by up to 10 years gives ratios 76.8% to 80.6%. So 'not just a high year against a low one' holds. Demo.tsx avgIdx is the same centred mean (HALF = 12). |

**Result (Pass 47):** 1 verified, 1 disputed, 0 held, of 2 re-checked. Lesson now: 6 verified of 7.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (disputed): fix in the basis above. Owner: history-builder-1; the pin text in history-data.mjs is cm-history's.
