# Fact-check: britain-made-most-co2-in-1850 (2026-10-14)

Lesson: src/demos/history/britain-made-most-co2-in-1850/ (status draft, version 1; builder history-builder-3).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/britain-made-most-co2-in-1850/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). co2: UK 1850 122.350, World 196.848 Mt; 62.15%, shown 62%. In 1850 World co2 = coal_co2 (196.848), so 'fossil-fuel CO2' is exact here. OWID codebook (opened): co2 = 'Annual total emissions of carbon dioxide (CO2), excluding land-use change, measured in million tonnes'. |
| c2 | verified | RAW in Demo.tsx = file co2 rounded to 0.1 Mt for all 5 entities, 1750-1950 (201 values each, 0 mismatches; missing rows drawn as 0, first rows US 1800, Germany 1792, France 1802). Shares: 1800 95.6/0.8/2.4/0/1.3; 1850 62.2/10.1/7.7/10.0/10.1; 1900 21.4/33.8/16.6/6.6/21.5; 1950 8.4/42.9/8.6/3.4/36.7. All round to the stage labels. |
| c3 | verified | UK 122.35 -> 419.741 Mt; 419.741/1962.884 = 21.4%. |
| c4 | verified | 1962.884/196.848 = 9.97, shown 10. |
| c5 | verified | US 19.793 -> 664.132 (coal 626.544), Germany 15.14 -> 326.759 (coal 323.729), World coal 1882.645 of 1962.884 in 1900. Read from coal_co2 as stated. |
| c6 | unverified | Held. First half verified from an opened source: OWID's metadata for this indicator (raw.githubusercontent.com/owid/etl/master/etl/steps/data/garden/gcp/2025-11-13/global_carbon_budget.meta.yml, line 165) says 'Fossil CO2 emissions are estimated using national statistics on energy use - such as coal, oil, and gas consumption - and industrial production, particularly cement.' I found no opened source for 'early years are the roughest' (not in the README, codebook or metadata; the GCB paper and Zenodo are blocked). The brief's fallback ('early years are the roughest estimates') is exactly the unsourced half, so do not use it. Fix (builder): 'Where it stops: these figures are estimates rebuilt from national records of coal and other fuel use.' Re-cite the source to the OWID metadata file. |
| c7 | verified | 1850 rows with co2 >= 15 Mt among countries: UK 122.35, US 19.793, France 19.617, Germany 15.14; coal_co2 = co2 for each. |

**Result (Pass 39):** 6 verified, 0 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (unverified): fix in the note above. Owner: history-builder-3.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Learner text (Demo.tsx line 79): 'Where it stops: these figures are rebuilt from records of coal and other fuels, and early years are the roughest.' Both halves now rest on opened OWID pages (ourworldindata.org, allow-listed for pass 41). First half: OWID's GCB metadata line 165 (opened in pass 39), 'Fossil CO2 emissions are estimated using national statistics on energy use - such as coal, oil, and gas consumption'. Second half: OWID 'CO2 dataset sources' (ourworldindata.org/co2-dataset-sources, opened 2026-10-15): 'Researchers have invested large efforts into reconstructions of historical energy statistics, dating back to 1750 ... The further back in time we go, the less detailed our records are; and for some countries, these figures have greater uncertainty.' Also OWID 'CO2 emissions' (ourworldindata.org/co2-emissions): 'our understanding of emissions in the late 20th and 21st centuries is more reliable than our long-term reconstructions.' Builder (non-blocking): add the co2-dataset-sources URL to the source field. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
