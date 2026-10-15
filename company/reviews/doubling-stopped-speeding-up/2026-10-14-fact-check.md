# Fact-check: doubling-stopped-speeding-up (2026-10-14)

Lesson: src/demos/history/doubling-stopped-speeding-up/ (status draft, version 1; builder history-builder-1).

## Pass 39

Checker: fact-checker, a fresh instance (History set: the 15 history drafts on W-818, W-848, W-853). I did not write, build or record these claims. No walkthrough transcript exists yet for this lesson (artifacts/walkthroughs/doubling-stopped-speeding-up/ is absent), so I read Demo.tsx directly for every learner-visible string (title, hook, question, options, stage labels, readouts, reveal). Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold. (2) I re-derived every number with my own node scripts (my own CSV parser, written in the session scratchpad, not the builder's check scripts) from artifacts/history-data/. (3) I compared each data array copied into Demo.tsx with the pinned file, value by value. (4) I read the stage's formulas and checked they compute the claim the same way. (5) I opened source documentation from raw.githubusercontent.com: HistData docs via Rdatasets; the Maddison 2020 README (OWID copy); OWID co2-data README and codebook; OWID etl GCB metadata (global_carbon_budget.meta.yml, 2025-11-13); Gapminder Fast Track ddf--concepts.csv, datapackage.json and READMEs; vega-datasets 3.2.1 datapackage.json. Blocked: gapm.io, gapminder.org, datavis.ca, journals, Zenodo, ESSD, UN WPP, Wikipedia, Britannica, university pages (W-583). WebFetch fails DNS. WebSearch returns only summaries, which I did not count as opened sources. No verdict rests on a source I could not open.

Unrecorded claims: None new; reveal wording 'no faster than the one before' noted under c4.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in my own node script from the pinned file (history-data.mjs pins all hold; sha256 re-checked) and compared with the copied array in Demo.tsx (identical). POP in Demo.tsx = the file's pop column 1800-2024 (225 values, identical); stage draws to 2023. |
| c2 | verified | First year >= threshold: 1 bn 1805 (1,002,667,483), 2 bn 1927, 4 bn 1975, 8 bn 2022 (8,021,407,192). 122, 48, 47. Same in Demo.tsx firstAt(). |
| c3 | disputed | The peak holds (forward rate 100 x (P[y+1]/P[y] - 1) peaks at 2.245% in 1963; backward rate gives the same 2.245% labelled 1964). The 2023 figure does not hold as a record. 0.87% is pop(2024)/pop(2023) - 1, and the file's pop concept is v8 dated 'July 29, 2024' (ddf--concepts.csv, opened). A mid-2024 value published in July 2024 cannot be a counted record. It is a projection or a nowcast. The lesson's own limit sentence says the chart stops at the present and 'any later number is a projection, not a record', so the stage contradicts its own limit. I could not open Gapminder's pop documentation (gapm.io/dpop is unreachable) to see where its estimates end. Fix (history-builder): use only values up to 2023. Either (a) a backward rate throughout, 100 x (P[y]/P[y-1] - 1), giving peak 2.25% in 1964 and 0.88% in 2023, or (b) keep the forward rate and label the last value '2022 to 2023: 0.88%'. Then drop 2024 from POP. Either way the reveal says 0.88%, not 0.87%. Also bring the check script (history-cycle2-check.mjs section 15) into line. |
| c4 | verified | Follows from c2, c3: 47 vs 48 years, and the rate falls after the 1960s peak. Wording note, not blocking: the reveal says 'the last was no faster than the one before'. Read literally, 47 < 48 is one year faster, though that is within the one-year resolution of 'first year above'. Suggest 'about as fast as the one before'. |
| c5 | unverified | Second half verified by definition (the stage stops at 2023; values after the present are projections). First clause 'early totals are the least certain' has no opened source. The pin description's 'estimates before 1950' is the pin author's note; it is not in ddf--concepts.csv or the open-numbers READMEs I opened. Fix (builder, as the source field offers): cut the clause, giving 'Where it stops: the chart stops at the present; any later number is a projection, not a record.' |
| c6 | verified | Hook: 1927-1805 = 122, 1975-1927 = 48 (c2). 'Doubled faster and faster' is true of those two spans. |

**Result (Pass 39):** 4 verified, 1 disputed, 1 unverified.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c3 (disputed): fix in the note above. Owner: history-builder-1.
- c5 (unverified): fix in the note above. Owner: history-builder-1.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | STILL DISPUTED (Demo.tsx unchanged since pass 39: POP still runs to 2024 and the 2023 rate is pop(2024)/pop(2023) - 1). New supporting evidence, opened: OWID 'What are the sources for Our World in Data's population estimates?' (ourworldindata.org/population-sources): the UN World Population Prospects give 'Annual historical estimates running from 1950 to the year before the most recent dataset publication; Annual projections running from the year of the most recent dataset publication'. Gapminder pop v8 is dated 29 July 2024 (ddf--concepts.csv), so its 2024 value is at best a same-year projection, not a record, which the lesson's own limit sentence (c5) rules out. Fix unchanged (history-builder): backward rate 100 x (P[y]/P[y-1] - 1), giving 2.25% in 1964 and 0.88% in 2023, or keep the forward rate and label the last value '2022 to 2023: 0.88%'; drop 2024 from POP; align history-cycle2-check.mjs section 15. |
| c5 | verified | Learner text (Demo.tsx line 213): 'Where it stops: early totals are the least certain, and the chart stops at the present; any later number is a projection, not a record.' The first clause, held in pass 39, is now supported by opened OWID pages. 'The Spanish flu' article (ourworldindata.org/spanish-flu-largest-influenza-pandemic-in-history), endnote: 'precise annual counts of the world population are not available for the past. Instead historians try to reconstruct the population figures for 5-year or 10-year intervals and the annual estimates are interpolations between these estimates.' The 'population sources' page says HYDE estimates 'are only available once per decade for the period 1800-1950' and that Gapminder's 1800-1949 series is built on Maddison and Clio Infra reconstructions, while UN WPP gives annual estimates from 1950. The second clause is true by definition (the stage stops at 2023). Note: c3's dispute is separate. It is the 2024 value inside the 2023 growth rate, not this sentence. |

**Result (Pass 41):** 1 verified, 1 disputed, 0 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c3 (disputed): see the basis above for the fix or the source it needs.

## Pass 43

Checker: fact-checker, a fresh instance, 2026-10-15 (W-954). I did not write, build or record any of these claims. Scope: the claims the History round-1 v2 commit (c255d8e) reset to unverified. Method: I read the v2 Demo.tsx diff and the full stage, question, hook and reveal strings before any builder note; re-derived every number with my own node scripts on artifacts/history-data (SHA-256 of each file re-checked against company/domains/briefs/checks/history-data.mjs; all match); opened sources from this host (CRAN, raw.githubusercontent.com, ourworldindata.org). Blocked this pass: warwick.ac.uk, cambridge.org, repec, Gutenberg, Wikipedia, eutils, math.uni.edu and the plague-bill pages. Scripts: session scratchpad fc43/scripts (check.mjs, cholera.mjs, apply.mjs). The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 43').

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | VERIFIED. Stage: 'peak 2.25% in 1963; 0.88%, 2022 to 2023', chart labels 'peak 1963: 2.25%' and '2022 to 2023: 0.88%'; reveal 'peaked at 2.25% in 1963 and was 0.88% from 2022 to 2023'. Own node script on the pinned gapminder-pop-global.csv (sha256 84e8705b... matches the pin): 100 x (3,264,487,339 / 3,192,807,828 - 1) = 2.24503 -> 2.25, the maximum over start years 1900-2022; 100 x (8,091,734,930 / 8,021,407,192 - 1) = 0.8768 -> 0.88. Demo.tsx POP = the file's 224 values 1800-2023, 0 mismatches; no 2024 value. Gapminder concept 'pop' is v8, 29 July 2024 (ddf--concepts.csv, opened), i.e. after UN WPP 2024, so 2023 is the last estimate year. Advisory, not blocking: the rate is not monotonic after 1963 (2021 to 2022 was 0.84%, so the last rate is slightly up), and history-cycle2-check.mjs still computes gr(2023) (W-869). |
| c4 | verified | VERIFIED. Reveal: 'the last was about as fast as the one before. ... A doubling that takes as long as the last one, at a falling yearly rate, means growth is slowing, not racing.' Spans 48 and 47 years at first-year resolution; by linear interpolation of the crossings they are 47.5 and 47.6, so 'about as fast' is right and 'faster' would not be. Average rate over each doubling 1.48% (1927-1975) and 1.45% (1975-2022); yearly rate 1.81% in 1975, 0.88% in 2022 to 2023. Growth slowing, not accelerating, holds. |

**Result (Pass 43):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 6 verified of 6.

No open claim items. Non-blocking advisories are in the basis column.

## Pass 47

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1014). I did not write, build or record any of these claims. Scope: the claims the History r1 revisions (W-990, commits c7a927e, db7bda4, 3d4a9c1 and the doubling v3) reset to unverified or added. Method: (1) `node company/domains/briefs/checks/history-data.mjs`: all 23 pins hold, and my script re-hashes the four files it reads (all match). (2) I read Demo.tsx first, then built the app and regenerated the walkthrough (`npm run walkthrough -- <slug>`; the transcripts on disk predated the revisions), and checked every learner-visible string against the claims. (3) Every number re-derived by my own node script with my own CSV parser (session scratchpad fc47/check.mjs); arrays copied into Demo.tsx compared value by value with the pinned files (0 mismatches in all four). (4) The simulation: mulberry32 re-typed from src/kit/random.ts, run for seed 1 and seeds 1-1000. (5) Sources opened this pass from this host: the OWID Maddison 2020 README.md and datapackage.json (raw.githubusercontent.com), OWID 'The Spanish flu' and 'Life Expectancy' pages (ourworldindata.org). No page contained instructions addressed to an AI; all were treated as data. The full basis for each verdict is in the claim's `note` in meta.json (prefix 'FC pass 47').

Unrecorded claims: none found in the regenerated walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED. Rendered (fresh walkthrough 2026-10-15): question 'took 122 years to go from 1 to 2 billion, and 48 years to reach 4 billion. How long to reach 8?', options 'About 24 years' / 'About 48 years' / 'About 96 years' (half, same, double of 48; all three from d2), answer 'About 48'; reveal 'the last was about as fast as the one before'. Own node script on the pinned gapminder-pop-global.csv (sha256 84e8705b... matches): first year at or above 1/2/4/8 bn = 1805, 1927, 1975, 2022; spans 122, 48, 47. 47 against 48 is within the one-year resolution of 'first year at or above', so 'About 48' is the right option and 'about as fast' holds. Average yearly rate over the doublings: 1.48% (1927-1975), 1.45% (1975-2022). |
| c7 | verified | VERIFIED. Rendered: strip '1 to 2 bn: 122 yrs +1 bn', '48 yrs +2 bn', '47 yrs +4 bn'; aria label 'added 1/2/4 billion people'; reveal 'It added 4 billion people, not 2, only because it started from twice as many; as a share of those alive, growth is slowing.' Own node script, pinned file: P(1927) - P(1805) = 1.005 bn; P(1975) - P(1927) = 2.063 bn; P(2022) - P(1975) = 3.951 bn, so the +1/+2/+4 labels (threshold differences) match the data to the shown precision. 'Only because it started from twice as many': the doubling times are 48 and 47 years (c2), and the average rate per year over each doubling is about the same (1.48% and 1.45%), so twice the base is what doubled the people added. 'Growth is slowing' as a share: yearly rate 100 x (P[y+1]/P[y] - 1) peaked at 2.245% in 1963; 2.03% (1970), 1.83% (1980), 1.71% (1990), 1.35% (2000), 1.27% (2010), 0.88% (2022 to 2023). Advisory, not blocking: the last rate is slightly up from 0.84% (2021 to 2022) and 0.86% (2020 to 2021), so 'slowing' is the decades-long trend, not every year. |

**Result (Pass 47):** 2 verified, 0 disputed, 0 held, of 2 re-checked. Lesson now: 7 verified of 7.

No open claim items. Non-blocking advisories are in the basis column.

## Pass 49

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1042). I did not write, build or record any of these claims. Scope: the claims reset to unverified by the History r1 revisions and the patience merge (e2747d6, 68e1668). Method: I read Demo.tsx in full and the meta.json hook before any builder note. The walkthrough transcripts predate e2747d6 (10:05-10:38 against 10:54), so Demo.tsx and the hook were my source for the rendered text. I re-derived every number with my own node scripts and a quote-aware CSV parser, written fresh in the session scratchpad (fc49/check.mjs, apply.mjs), from artifacts/history-data/. Every file's SHA-256 matches its pin, and `history-data.mjs` reports all 23 pins hold. Each data array copied into Demo.tsx equals the file value by value. Sources were opened myself: raw.githubusercontent.com (Rdatasets HistData docs, OWID Maddison README) and PMC full text (the OAI API; for PMC2831262, which OAI does not serve, the article page). The egress proxy refuses cambridge.org, ideas.repec.org, iris.santannapisa.it, eutils and ebi.ac.uk, and WebFetch fails DNS. Search summaries were not counted as opened sources. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 49').

Unrecorded claims: none found in the revised text.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | New hook 'doubled in 122 years, then in 48'. Pinned pop file: first years at or above 1, 2, 4 bn are 1805, 1927, 1975, giving 122 and 48. The POP array equals the file 1800-2023. |

**Result (Pass 49):** 1 verified, 0 disputed, 0 held, of 1 re-checked. Lesson now: 7 verified of 7.

No open claim items.
