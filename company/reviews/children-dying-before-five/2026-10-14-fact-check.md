# Fact-check: children-dying-before-five (2026-10-14)

Lesson: src/demos/history/children-dying-before-five/ (status draft, version 1; builder history-builder-1).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/children-dying-before-five/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). 221 values 1800-2020: 1800 430, 1900 411, 1950 246, 2020 37. Concept (ddf--concepts.csv, opened): u5mr v12, 'the probability of dying between birth and exactly five years of age expressed per 1000 live births'. |
| c2 | verified | 411/37 = 11.11, shown 11. |
| c3 | verified | 1800 430 to 1900 411. In between the series reaches 444 (max 1800-1900), so 'barely moved' is fair: it stayed within 411-444 for a century. |
| c4 | verified | (246-37)/(411-37) = 0.5588, shown 56%. |
| c5 | verified | 41.1 and 3.7 per 100, rounded 41 and 4. |
| c6 | unverified | Held. Gapminder's u5mr documentation (gapm.io/du5mr) is unreachable (DNS fails; gapminder.org blocked); ddf--concepts.csv and the open-numbers READMEs say nothing about record coverage by period. Not verified on trust. Fix (builder): use the named fallback, 'Where it stops: this is one source's world figure, an average over very different places.' That follows from the file being a single world aggregate. |
| c7 | verified | Hook: 411 per 1,000 = 41 in 100, about four in ten. From c1. |

**Result (Pass 39):** 6 verified, 0 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (unverified): fix in the note above. Owner: history-builder-1.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Gapminder's u5mr documentation is still unreachable: gapminder.org is on the allow-list but redirects to www.gapminder.org, which the proxy blocks (403), and gapm.io fails. Opened instead: OWID grapher metadata for child-mortality (ourworldindata.org/grapher/child-mortality.metadata.json), OWID 'Mortality in the past' and 'Child and infant mortality' articles. None says that record coverage thins as the series goes back. They say Gapminder 'provides estimates of child mortality rates from 1800 to 2015', that OWID drops Gapminder rows labelled 'Guesstimate' or 'Model based on Life Expectancy', and that Sweden's Tabellverket (1749) was the first office for population statistics. That is suggestive, not the claim. Fix (history-builder), checkable now: 'Where it stops: this is one source's world figure, and some of its early values are guesses or modelled, not counted.' (source: OWID child-mortality metadata, descriptionProcessing). Or the pass-39 fallback ('an average over very different places'). |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (unverified): see the basis above for the fix or the source it needs.

## Pass 43

Checker: fact-checker, a fresh instance, 2026-10-15 (W-954). I did not write, build or record any of these claims. Scope: the claims the History round-1 v2 commit (c255d8e) reset to unverified. Method: I read the v2 Demo.tsx diff and the full stage, question, hook and reveal strings before any builder note; re-derived every number with my own node scripts on artifacts/history-data (SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs; all match); opened sources from this host (CRAN, raw.githubusercontent.com, ourworldindata.org). Blocked this pass: warwick.ac.uk, cambridge.org, repec, Gutenberg, Wikipedia, eutils, math.uni.edu and the plague-bill pages. Scripts: session scratchpad fc43/scripts (check.mjs, cholera.mjs, apply.mjs). The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 43').

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | VERIFIED. Reveal: 'Where it stops: this is one source's world figure, and some of its early values are guesses or modelled, not counted.' Opened: OWID grapher child-mortality.metadata.json, descriptionProcessing: 'In the Gapminder dataset we remove rows where the source is labeled as "Guesstimate" or "Model based on Life Expectancy"'; so Gapminder's own series carries guessed and modelled values. The pinned file is a single Gapminder world aggregate (concept u5mr v12, ddf--concepts.csv, opened). Inference noted: OWID describes Gapminder's country data (v7), and the world figure is built from it; the pinned 1800-1851 world values sit at 423-430 with multi-year flat runs, which is what modelled values look like. I found no Gapminder page reachable that labels the world aggregate's years directly. |

**Result (Pass 43):** 1 verified, 0 disputed, 0 held, of 1 re-checked. Lesson now: 7 verified of 7.

No open claim items. Non-blocking advisories are in the basis column.
