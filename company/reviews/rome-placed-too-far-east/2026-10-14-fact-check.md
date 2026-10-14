# Fact-check: rome-placed-too-far-east (2026-10-14)

Lesson: src/demos/history/rome-placed-too-far-east/ (status draft, version 1; builder history-builder-1).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/rome-placed-too-far-east/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: Hook 'Astronomers spent centuries measuring one short distance' (5 of the 12 values are marked Map in the Source column, so 'astronomers and mapmakers' as in c1 would be exact). Not recorded as a claim; wording note for the builder.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). Langren1644.csv has 12 rows; all 12 (Name, Year, Longitude) are in Demo.tsx DATA unchanged; years 150-1610. HistData Langren1644 doc (opened from raw.githubusercontent.com) describes them as 'determinations of the distance in longitude between Toledo and Rome, from the 1644 graph', Source column Astron 7 / Map 5, so 'astronomers and mapmakers' is right. |
| c2 | verified | HistData Langren1644 doc opened: 'toledo <- c(39.86, -4.03); rome <- c(41.89, 12.5)'; 12.5 + 4.03 = 16.53, shown as 16.5. Demo.tsx computes TRUE from the same constants. |
| c3 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). /lon - 16.53/ <= 2: only G. Jansonius 1605, 17.736; all 12 > 16.53; min 17.736, max 30.128 (shown 17.7, 30.1). Demo.tsx WITHIN, EAST, LO, HI use the same rules. |
| c4 | verified | Median (25.617 + 26) / 2 = 25.8085; minus 16.53 = 9.2785 degrees; 111.32 x cos(40.875 deg) = 84.173 km/degree; 781.0 km, rounded to tens = 780. Demo.tsx MEDIAN, KM_PER_DEG, MEDIAN_KM are the same formulas. |
| c5 | verified | Sorted by Year: C. Ptolomeus 150, 27.787 (27.8); A. Argelius 1610, 28.17 (28.2). Demo.tsx BY_YEAR. |
| c6 | verified | Derivation checked: local solar time changes by 360/24 = 15 degrees of longitude per hour of the Earth's turn, so a longitude difference is a local-time difference; latitude follows from the altitude of the Sun or the pole star. Geometry, not a cited fact. |
| c7 | verified | Held sentence checked against the HistData Langren1644 documentation (opened; Friendly et al. 2010 itself not reachable): van Langren 'worked on one of the most significant problems of his time - the accurate determination of longitude', and his graph 'showed large errors, for even this modest distance'. That carries 'which nobody could then measure well'. The source string should cite the HistData doc as the opened source; the paper stays unopened. |
| c8 | unverified | Not supported by an opened source. The HistData doc says nothing about estimates copying one another; its Source column is 'Likely source for this determination of Longitude' (Astron 7, Map 5). Friendly et al. (2010) could not be opened (datavis.ca and journal hosts blocked). Fix (history-builder-1): use what the doc supports, e.g. 'Where it stops: five of the twelve were probably read from maps, not measured, so these are not 12 independent measurements.' (Source: HistData Langren1644, Source column.) Or keep 'may copy others' and route Friendly et al. to the W-583 web-capable session. |

**Result (Pass 39):** 7 verified, 0 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c8 (unverified): fix in the note above. Owner: history-builder-1; or the W-583 web-capable session.
