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

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c9 | unverified | HELD. The stage text now reads (Demo.tsx lines 87-88): 'Where it stops: these are reconstructions from wages, prices and output records, and the series covers England only before 1700, so early values are estimates.' Opened: OWID grapher metadata for the Maddison Project series (ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.metadata.json): 'This work builds on the efforts of many researchers who have carefully reconstructed historical data on economic growth', and the Maddison 2020 README (England 1252-1700). These support 'reconstructions', 'England only before 1700' and 'estimates'. The method clause 'from wages, prices and output records' still rests on Broadberry et al. (2015), which is not opened (the rug.nl allow-list entry redirects to www.rug.nl, blocked; CUP blocked). Fix (history-builder): drop the method clause: 'Where it stops: these are modern reconstructions, and the series covers England only before 1700, so early values are estimates.' I can verify that wording from the opened OWID metadata and README. |
| c10 | disputed | STILL DISPUTED. The title ('How fast did England get richer?'), hook ('England's income per person doubled in 430 years. What did the next 318 years do?') and question ('Income per person in England ... From 1700 to 2018, how many times over did it grow?') are unchanged and still credit England with the 1700-2018 rise. The Maddison README (opened) labels only 1252-1700 as England; after that the series is Britain, then the UK. Fix unchanged from pass 39 (history-builder): name the measured entity for the second span, e.g. '...From 1700 to 2018 (Britain, then the UK), how many times over did it grow?', and a matching hook and title. |

**Result (Pass 41):** 0 verified, 1 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c9 (unverified): see the basis above for the fix or the source it needs.
- c10 (disputed): see the basis above for the fix or the source it needs.

## Pass 43

Checker: fact-checker, a fresh instance, 2026-10-15 (W-954). I did not write, build or record any of these claims. Scope: the claims the History round-1 v2 commit (c255d8e) reset to unverified. Method: I read the v2 Demo.tsx diff and the full stage, question, hook and reveal strings before any builder note; re-derived every number with my own node scripts on artifacts/history-data (SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs; all match); opened sources from this host (CRAN, raw.githubusercontent.com, ourworldindata.org). Blocked this pass: warwick.ac.uk, cambridge.org, repec, Gutenberg, Wikipedia, eutils, math.uni.edu and the plague-bill pages. Scripts: session scratchpad fc43/scripts (check.mjs, cholera.mjs, apply.mjs). The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 43').

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | VERIFIED (status kept); claim-text address is stale. 'England only before 1700' is in the opened OWID Maddison 2020 README: 'United Kingdom ... 1252-1700 (England)'. But the question no longer says 'Income per person in England' (it now reads 'England's income per person about doubled ...'); that phrase is now in the hook ('Income per person in England doubled in 430 years.'). Fix (builder, claim text only): change the address to hook 'Income per person in England' / question 'England's income per person'. Also the source field says the README gives 'Britain for 1700-1870'; it does not (see c10). |
| c9 | verified | VERIFIED. Reveal: 'Where it stops: these are modern reconstructions, and the series covers England only before 1700, so early values are estimates.' Opened: OWID grapher metadata gdp-per-capita-maddison-project-database.metadata.json ('researchers who have carefully reconstructed historical data on economic growth and population'); OWID Maddison 2020 README ('Maddison style estimates of the evolution of the world economy'; UK '1252-1700 (England)', Broadberry et al. 2015). Wording advisory (pedagogy, not mine): the 'so' links England-only to 'estimates', which follows from 'reconstructions', not from the territory. |
| c10 | verified | VERIFIED, with a source note. Own node script on maddison2020.csv (sha matches): 1270 1,192; 1700 2,412; 2018 38,058; x2.02 and x15.78. Territory: the opened README labels 1252-1700 '(England)' and cites Broadberry et al. (2015) 'British Economic Growth 1270-1870' for 1700-1870 without a territory label; the entity is 'United Kingdom'. So 'Britain, then the UK' is supported as 'British' (the cited work) then the UK (the entity); no opened source says 'Great Britain 1700-1870' in so many words (Warwick CAGE and Cambridge pages that do are blocked from this host; OWID's Bank of England chart, opened, says 'England until 1700 and the UK from then onwards'). Either reading leaves the learner text true. The pinned population column is UK-wide throughout (8.565 m in 1700, drop in 1921), so it does not settle the territory. Fix (cm-history, non-blocking): history-data.mjs 'what' says 'Britain 1700-1870 ... per the README'; the README does not say it. |

**Result (Pass 43):** 3 verified, 0 disputed, 0 held, of 3 re-checked. Lesson now: 10 verified of 10.

No open claim items. Non-blocking advisories are in the basis column.

## Pass 45

Checker: fact-checker, a fresh instance, 2026-10-15 (W-980). I did not write, build or record any of these claims. Scope: c8, which the v3 commit (a3e472a, W-957) reset to unverified. The learner text did not change. Method: I read the Demo.tsx question and reveal and the meta.json hook before the builder notes. I re-opened the OWID Maddison 2020 README on raw.githubusercontent.com. The full basis is in the claim's `note` in meta.json (prefix 'FC pass 45').

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | All three addresses are present: reveal 'the series covers England only before 1700'; hook 'Income per person in England doubled in 430 years.'; question 'England's income per person about doubled from 1270 to 1700'. README: 'United Kingdom ... 1252-1700 (England) Broadberry ... (2015)'; '1700-1870 Broadberry ...' with no territory label. The corrected source field now matches the README. |

**Result (Pass 45):** 1 verified of 1 re-checked. Lesson now: 10 verified of 10.

No open claim items.

## Pass 48

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1020). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions commit (e52d366, W-989) reset to unverified or added. Method: I read Demo.tsx in full (question, options, stage labels, readouts, aria labels, reveal) before any builder note. The walkthrough transcripts in artifacts/walkthroughs/ predate e52d366 (10:04 against 10:33), so Demo.tsx was the rendered-text source. I re-derived every number with my own node script and a quote-aware CSV parser, written fresh in the session scratchpad (fc48/check.mjs, apply.mjs), from artifacts/history-data/. SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs, and all match. Each data array copied into Demo.tsx was compared with the file value by value, and all are identical. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 48').

Unrecorded claims: none. The new log caption and legend text are covered by c6, and the reveal's "sags below ... slower before 1850 and faster after" by c11.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | 2412/1192 = 2.0235 (×2.0), 0.1640%/yr; 38058/2412 = 15.7786 (×15.8), 0.8713%/yr; "430 years ... the 318 after" correct. |
| c6 | verified | Both dashed lines start at the series value at their span's start, at that span's average rate. Log ticks 50 to 1,600, each ×2. The series (41.3 to 1,577.9) fits the 40 to 1,700 log axis. Constant rate gives a straight line on a log axis. |
| c7 | verified | 1.00164^70 = 1.122; 1.00871^70 = 1.835; the pre-1700 values use the bottom 6.8% of the 0 to 1,600 linear plot. Advisory: the "1270 to 1700" preset is also linear (0 to 200) and not flat; the reveal means the full view. |
| c11 | verified | 1700 to 1850: ×1.796, 0.391%/yr. 1850 to 2018: ×8.785, 1.302%/yr. The record is below the 0.87% model in 304 of the 317 years 1701 to 2017, and its lowest point is 0.41 of the model, in 1921. Other splits give the same speed-up: 0.327%, 0.824%, 1.375%. **Source-field fix (non-blocking, not learner-facing):** "first reaches it in 2002" is wrong. The record is above the line in 1701, 1702, 1704, 1705 and 1708 (by 2 to 11%), then in 2002 to 2008 and in 2017. |

**Result (Pass 48):** 4 verified, 0 disputed, 0 held, of 4 re-checked. Lesson now: 11 verified of 11.

Open item for demo-builder: correct the c11 source string (above).
