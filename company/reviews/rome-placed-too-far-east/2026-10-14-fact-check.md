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

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c8 | unverified | HELD (unchanged). Learner text: 'Where it stops: some estimates may copy others, so these are not 12 independent measurements.' The CRAN HistData reference manual, opened directly from cran.r-project.org this pass, again says only 'Source: Likely source for this determination of Longitude; a factor with levels Astron Map' and points to Friendly, Valero-Mora and Ulargui (2010), The American Statistician 64(2), for discussion. Friendly et al. are still unreachable: datavis.ca and the journal hosts are not on the allow-list, doi.org redirects to blocked hosts, and the paper is not in PMC. Fix unchanged (history-builder-1): 'Where it stops: five of the twelve were probably read from maps, not measured, so these are not 12 independent measurements.' (HistData Langren1644 Source column: Map 5, Astron 7.) |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c8 (unverified): see the basis above for the fix or the source it needs.

## Pass 43

Checker: fact-checker, a fresh instance, 2026-10-15 (W-954). I did not write, build or record any of these claims. Scope: the claims the History round-1 v2 commit (c255d8e) reset to unverified. Method: I read the v2 Demo.tsx diff and the full stage, question, hook and reveal strings before any builder note; re-derived every number with my own node scripts on artifacts/history-data (SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs; all match); opened sources from this host (CRAN, raw.githubusercontent.com, ourworldindata.org). Blocked this pass: warwick.ac.uk, cambridge.org, repec, Gutenberg, Wikipedia, eutils, math.uni.edu and the plague-bill pages. Scripts: session scratchpad fc43/scripts (check.mjs, cholera.mjs, apply.mjs). The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 43').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | correction to the pass-39 note above, status unchanged: the Source column is Map 2 / Astron 10 (pinned CSV and CRAN HistData 1.1.1 Langren1644.RData), not Astron 7 / Map 5 (that is the Gap column). 'Astronomers and mapmakers' still holds. |
| c8 | verified | VERIFIED. Reveal: 'Where it stops: 2 of the 12 were probably read from maps, not measured.' COUNT RESOLVED: the pinned Langren1644.csv (sha256 644b1008... matches the pin; re-fetched from Rdatasets today, byte-identical) has Source = Map for 2 rows (G. Jansonius 1605, G. Mercator 1567) and Astron for 10. The CRAN original, HistData_1.1.1.tar.gz data/Langren1644.RData (downloaded from cran.r-project.org, read with python rdata), has the same 2 Map / 10 Astron. The HistData doc (opened) gives only the factor levels 'Astron Map', no counts. Passes 39 and 41 said 'Map 5, Astron 7': that matches the Gap column (0 for 5 rows, 1 for 7), not Source, so it was a column mix-up. 'Probably' renders the doc's 'Likely source for this determination'. Demo.tsx copies the column and computes MAPS = 2. |
| c9 | verified | VERIFIED. Hook: 'Astronomers and mapmakers spent centuries on one short distance. How close did they get?' Years in the file run 150 (C. Ptolomeus) to 1610 (A. Argelius); Source has both levels (Astron 10, Map 2); the HistData doc calls it 'even this modest distance'. Advisory on the claim text only: say 'likely' ('each marked with its likely source, astronomical or a map'), as the doc does. |

**Result (Pass 43):** 2 verified, 0 disputed, 0 held, of 2 re-checked (c1 is a note correction only, status unchanged). Lesson now: 9 verified of 9.

No open claim items. Non-blocking advisories are in the basis column.
