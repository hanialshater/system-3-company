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
