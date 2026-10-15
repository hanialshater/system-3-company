# Fact-check: cholera-fell-with-height (2026-10-14)

Lesson: src/demos/history/cholera-fell-with-height/ (status draft, version 1; builder history-builder-2).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/cholera-fell-with-height/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). Cholera.csv 38 districts; Demo.tsx DISTRICTS identical (deaths, popn, elevation, water). HistData doc (opened): 'deaths from cholera in 1849', 'elevation, in feet above the high water mark', 'water supply region'; Source: Bingham et al. (2004) Table 2. (The doc's own description also says 'Brigham et al. (2003)'; the Source section is the citation to use.) |
| c2 | verified | Under 20 ft: 16 districts, 8,584 / 935,869 = 91.7 (92); 80 ft and up: 4 districts (St Pancras, Islington, Marylebone, Hampstead), 817 / 412,415 = 19.8 (20); ratio 4.63, 'about 5' (and 'about a fifth as many'). Every district's own rate rounds to the file's cholera_drate. |
| c3 | verified | Low districts by water: Battersea 11, New River 4, Kew 1. Doc (opened): 'Thames, between Battersea and Waterloo Bridges' (central London). |
| c4 | verified | Within-supplier Pearson r (elevation vs rounded rate): Battersea -0.680 (12 districts), New River -0.548, Kew -0.475. |
| c5 | verified | Doc (opened): 'number of deaths registered from cholera in 1849', by London district. |

**Result (Pass 39):** 5 verified, 0 disputed, 0 unverified.

All claims verified. Nothing blocks publishing on facts. The lesson still needs its walkthrough, QA and learner evidence.

## Pass 43

Checker: fact-checker, a fresh instance, 2026-10-15 (W-954). I did not write, build or record any of these claims. Scope: the claims the History round-1 v2 commit (c255d8e) reset to unverified. Method: I read the v2 Demo.tsx diff and the full stage, question, hook and reveal strings before any builder note; re-derived every number with my own node scripts on artifacts/history-data (SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs; all match); opened sources from this host (CRAN, raw.githubusercontent.com, ourworldindata.org). Blocked this pass: warwick.ac.uk, cambridge.org, repec, Gutenberg, Wikipedia, eutils, math.uni.edu and the plague-bill pages. Scripts: session scratchpad fc43/scripts (check.mjs, cholera.mjs, apply.mjs). The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 43').

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED. Stage readout 'Central Thames' / 'still falls with height'. Own node script (quoted-field CSV parser) on the pinned Cholera.csv (sha matches): 16 districts under 20 ft, 11 of them Battersea; the 4 at 80 ft and up are New River or Kew, none Battersea, so height and water go together. Within Battersea (12 districts, -2 to 22 ft) Pearson r(elevation, rate) = -0.680 (same on the file's cholera_drate and on deaths/popn rounded), Spearman -0.71, leave-one-out -0.55 to -0.80: always negative, so 'still falls' is robust. New River -0.55 (20), Kew -0.47 (6). r is not on the stage. |

**Result (Pass 43):** 1 verified, 0 disputed, 0 held, of 1 re-checked. Lesson now: 5 verified of 5.

No open claim items. Non-blocking advisories are in the basis column.

## Pass 48

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1020). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions commit (e52d366, W-989) reset to unverified or added. Method: I read Demo.tsx in full (question, options, stage labels, readouts, aria labels, reveal) before any builder note. The walkthrough transcripts in artifacts/walkthroughs/ predate e52d366 (10:04 against 10:33), so Demo.tsx was the rendered-text source. I re-derived every number with my own node script and a quote-aware CSV parser, written fresh in the session scratchpad (fc48/check.mjs, apply.mjs), from artifacts/history-data/. SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs, and all match. Each data array copied into Demo.tsx was compared with the file value by value, and all are identical. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 48').

Unrecorded claims: none. The readout "Central Thames only: still falls, but none is high (max 22 ft)" and the reveal clause "none on that water was high" are both in c4.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Under 20 ft: 16 districts, 8,584/935,869 × 10,000 = 91.72 (92). 80 ft and up: 4 districts, 19.81 (20). Ratio 4.63, "about 5". The reveal now uses "ft". |
| c4 | verified | The 12 central-Thames (Battersea) districts run from -2 ft (Newington) to 22 ft (Wandsworth). None is at 50 ft or above, and none at 80 ft or above. The 4 districts at 80 ft or more are on New River or Kew water. Within Battersea, r = -0.680 (still falls). Demo.tsx computes BAT_MAX 22 and BAT_HIGH 0 from DISTRICTS. |

**Result (Pass 48):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 5 verified of 5.
