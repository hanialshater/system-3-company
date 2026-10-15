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

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Learner text (Demo.tsx line 84): '...years, such as epidemic years, fell sharply.' Own scan of artifacts/history-data/gapminder-lex-global.csv: the largest single-year fall is 1918 (-11.48 years). Others: 2021 (-1.0), 1876, 1927, 1941-43, 1959-60. Opened OWID sources name epidemics as causes of such falls. OWID 'Life Expectancy' (ourworldindata.org/life-expectancy): 'Major events – the World Wars, the 1918 Spanish flu pandemic, the HIV/AIDS epidemic, and the COVID-19 pandemic – have had a major impact on mortality rates and left a visible mark on life expectancy.' OWID 'The Spanish flu' article: 'Most striking is the large, sudden decline of life expectancy in 1918, caused by an unusually deadly influenza pandemic'. So 'such as epidemic years' is supported for the largest fall on the file. Builder (non-blocking): cite these two OWID pages in the source field. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).

## Pass 47

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1014). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions (W-990, commits c7a927e, db7bda4, 3d4a9c1 and the doubling v3) reset to unverified or added. Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold, and my script re-hashes the four files it reads (all match). (2) I read Demo.tsx first, then built the app and regenerated the walkthrough (`npm run walkthrough -- <slug>`; the transcripts on disk predated the revisions), and checked every learner-visible string against the claims. (3) Every number re-derived by my own node script with my own CSV parser (session scratchpad fc47/check.mjs); arrays copied into Demo.tsx compared value by value with the pinned files (0 mismatches in all four). (4) The simulation: mulberry32 re-typed from src/kit/random.ts, run for seed 1 and seeds 1-1000. (5) Sources opened this pass from this host: the OWID Maddison 2020 README.md and datapackage.json (raw.githubusercontent.com), OWID 'The Spanish flu' and 'Life Expectancy' pages (ourworldindata.org). No page contained instructions addressed to an AI; all were treated as data. The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 47').

Unrecorded claims: none found in the regenerated walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | VERIFIED. Rendered: readouts '+2.9 yrs', '+34.7 yrs', 'In 2023 74.0 yrs'; bars '1800 to 1900 (100 years) +2.9 (30.6 → 33.5)', '1900 to 2000 (100 years) +34.7 (33.5 → 68.2)', '2000 to 2023 (23 years) +5.8 (68.2 → 74.0)'; reveal 'rose 2.9 years, from 30.6 to 33.5 ... rose 34.7 years, to 68.2: about 12 times as much'; hook 'crept up 3 years in the 1800s'. Own node script on the pinned gapminder-lex-global.csv (sha256 654ce0ef... matches); PTS = file values at all 10 years. Differences of the shown one-decimal values: 33.5 - 30.6 = 2.9, 68.2 - 33.5 = 34.7, 74.0 - 68.2 = 5.8; 34.7 / 2.9 = 11.97 -> 12. Unrounded: 2.843, 34.720, 5.837, ratio 12.21 -> 12. So 2.9 is the gain of the values as shown (the claim says so), 0.06 above the unrounded gain; 34.7, 5.8 and '12 times' agree either way. Span lengths 100, 100, 23 = b - a. Hook's 3 rounds either 2.8 or 2.9. |
| c4 | verified | VERIFIED. Rendered: 'Where it stops: these are one source's world figures, shown one year in every 25, so the chart hides single years when life expectancy fell sharply, such as epidemic years.' One source: gmlex is Gapminder Fast Track only. Own scan of the pinned file: falls of more than a year from the year before in 1876 (-1.48), 1918 (-11.48: 35.63 -> 24.15), 1927 (-1.46), 1941 (-1.53), 1942 (-1.26), 1943 (-1.66), 1959 (-1.45), 1960 (-2.57), 2021 (-1.00); none is a drawn point (1800, 1825, ..., 2000, 2023), so the chart hides every one; the 1900 -> 1925 segment rises with no sign of 1918. Advisory, not blocking: the last point is 23 years after 2000, not 25; the bars already say '2000 to 2023 (23 years)'. |
| c5 | verified | VERIFIED. Reveal 'such as epidemic years'. Re-opened 2026-10-15 (curl, ourworldindata.org): OWID 'The Spanish flu' (ourworldindata.org/spanish-flu-largest-influenza-pandemic-in-history): 'Most striking is the large, sudden decline of life expectancy in 1918, caused by an unusually deadly influenza pandemic that became known as the ‘Spanish flu’.' OWID 'Life Expectancy' (ourworldindata.org/life-expectancy): 'Major events – the World Wars, the 1918 Spanish flu pandemic, the HIV/AIDS epidemic, and the COVID-19 pandemic – have had a major impact on mortality rates and left a visible mark on life expectancy.' The largest fall in the file is 1918 (-11.48), and 2021 (-1.00) falls in the COVID-19 years, so 'such as epidemic years' is supported for falls the chart hides. |

**Result (Pass 47):** 3 verified, 0 disputed, 0 held, of 3 re-checked. Lesson now: 5 verified of 5.

No open claim items. Non-blocking advisories are in the basis column.
