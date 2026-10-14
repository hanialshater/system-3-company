# Fact-check: income-flat-then-sixteenfold (2026-10-14)

Lesson: src/demos/history/income-flat-then-sixteenfold/ (status draft, version 1; builder history-builder-3).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/income-flat-then-sixteenfold/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: Recorded as c10 (disputed): title, hook and question credit England with the 1700-2018 growth.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). United Kingdom, GDP per capita: 1270 1,192; 1700 2,412; 2018 38,058.09. |
| c2 | verified | 749 annual rows 1270-2018, no gaps; Demo.tsx GDP string = the file rounded to whole numbers (749/749 identical). |
| c3 | verified | 2412/1192 = 2.023; 38058/2412 = 15.779; 0.1640% and 0.8713% a year. On the rounded series 15.7786, same to shown precision. |
| c4 | verified | ln 2 / ln 1.008713 = 79.9, shown 80; Demo.tsx dbl() gives 80. |
| c5 | verified | 1348 1,229; 1400 1,717; 1500 1,697; 1600 1,691; 1650 1,446; pre-1700 index range 41-108 of 1700 = 100. |
| c6 | verified | Convention: labelled as our line in the legend; index(start) x (1+r)^(t-start) is a straight line on a log axis. |
| c7 | verified | 1.00164^70 = 1.122; 1.00871^70 = 1.835. |
| c8 | verified | Maddison README opened: 'United Kingdom ... 1252-1700 (England) Broadberry ... (2015)'; '1700-1870 Broadberry ...' (the README does not write 'Britain' for 1700-1870, but it marks only the pre-1700 span as England). See c10 for the stage's other use of 'England'. |
| c9 | unverified | Held. Broadberry et al. (2015) not opened (publisher blocked). The Maddison README names the work but not its method. The named fallback 'early values are rough' is also unsourced. Fix (builder): 'Where it stops: these are modern reconstructions, and the series covers England only before 1700.' The README supports both halves: it names Broadberry et al. (2015) for the series, and the Project describes itself as 'Maddison style estimates'. |
| c10 | disputed | Unrecorded claim found by the fact-checker (title, hook and stage question). The question reads 'Income per person in England about doubled from 1270 to 1700... From 1700 to 2018, how many times over did it grow?'. The hook reads 'England's income per person doubled in 430 years. What did the next 318 years do?', and the title is 'How fast did England get richer?'. All three credit England with the 15.8-fold rise. But the series after 1700 is not England: the README marks only 1252-1700 as England, Broadberry's 1700-1870 series is Britain, and after that it is the UK. The reveal's limit sentence says so, but the question has already made the claim. Fix (history-builder): name the measured entity for the second span, e.g. question '...From 1700 to 2018 (Britain, then the UK), how many times over did it grow?', hook 'Income per person in England doubled in 430 years. What did Britain's next 318 years do?', and a title such as 'How fast did Britain get richer?'. |

**Result (Pass 39):** 8 verified, 1 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c9 (unverified): fix in the note above. Owner: history-builder-3.
- c10 (disputed): fix in the note above. Owner: history-builder-3.
