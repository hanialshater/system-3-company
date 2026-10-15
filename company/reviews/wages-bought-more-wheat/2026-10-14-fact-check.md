# Fact-check: wages-bought-more-wheat (2026-10-14)

Lesson: src/demos/history/wages-bought-more-wheat/ (status draft, version 1; builder history-builder-1).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/wages-bought-more-wheat/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). 53 rows 1565-1821; Wages blank for 1815, 1820, 1821, last wage 1810; HistData Wheat doc (opened): 'Price of Wheat (Shillings/Quarter bushel)', 'typical weekly wage for a "good mechanic" from 1565 to 1821'. |
| c2 | verified | 99/41 = 2.415 (2.4); 30/5 = 6. Demo.tsx PRICE_X, WAGE_X. |
| c3 | verified | 5/41 = 0.122, 30/99 = 0.303, ratio 2.485 shown 2.5. |
| c4 | verified | Over the 50 rows with a wage: max Wages/Wheat 1785, 23/42 = 0.548; min 1595, 5.54/64 = 0.087. Matches. |
| c5 | verified | Held sentence checked against the HistData Wheat doc (opened; Playfair 1821 not opened): Playfair's graph 'commits the sin of showing two non-commensurable Y variables on different axes. Scatterplots of wages vs. price or plots of ratios (e.g., wages/price) are in some ways better'. That carries 'two different scales' and the ratio point. Source string should name the doc as the opened source. |
| c6 | verified | Convention, matches the file: one wage series (a good mechanic) and one price (wheat), per the HistData doc. |

**Result (Pass 39):** 6 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.

## Pass 48

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1020). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions commit (e52d366, W-989) reset to unverified or added. Method: I read Demo.tsx in full (question, options, stage labels, readouts, aria labels, reveal) before any builder note. The walkthrough transcripts in artifacts/walkthroughs/ predate e52d366 (10:04 against 10:33), so Demo.tsx was the rendered-text source. I re-derived every number with my own node script and a quote-aware CSV parser, written fresh in the session scratchpad (fc48/check.mjs, apply.mjs), from artifacts/history-data/. SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs, and all match. Each data array copied into Demo.tsx was compared with the file value by value, and all are identical. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 48').

Unrecorded claims: none. The readout "wheat ×2.4, wage ×6: buys ×2.5" is c2 and c3 (×2.4146, ×6.0000, ×2.4848), unchanged in meaning.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Of the 50 rows with a wage, the best is 1785, 23/42 = 0.5476 (0.55). Next come 1790 at 0.537 and 1760 at 0.532. The worst is 1595, 5.54/64 = 0.0866 (0.09). The last wage year, 1810, is 0.303, so "not the last" holds. |
| c5 | verified | I opened the HistData Wheat doc myself (Rdatasets, sha256 443ae182...). It says Playfair "commits the sin of showing two non-commensurable Y variables on different axes" and that "plots of ratios (e.g., wages/price) are in some ways better". Playfair 1821 itself was not opened. **Source-field fix (non-blocking):** the source string still says HELD and should name the doc. |

**Result (Pass 48):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 6 verified of 6.

Open item for demo-builder: update the c5 source string (above).
