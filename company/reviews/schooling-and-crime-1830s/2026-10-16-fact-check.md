# Fact-check: schooling-and-crime-1830s (2026-10-16)

Lesson: src/demos/history/schooling-and-crime-1830s/ (status draft, v1, last lesson commit a4a2a34, an ancestor of the server SHA bc0edc0; no change to the lesson between bc0edc0 and main).

## Pass 58

Checker: fact-checker, a fresh instance, 2026-10-16. SO-10-2 `[project:history]` (company/ops/dispatch-requests/2026-10-16-r3-quality.md, amended for the shared server). I did not write, build or record these claims. Their authors, from git log of meta.json: demo-builder (97875b6, a4a2a34). c6 and c7 carry cultural-reviewer wording applied by cm-history.

Server: http://localhost:3591, /home/user/s3c-qa/.next-review2/BUILT_FROM = bc0edc0ebf45440c75754a31a61c63a6f9bd10cb at the start and the end of the run; `git -C /home/user/s3c-qa rev-parse HEAD` = bc0edc0; `status --porcelain -- src content public package.json package-lock.json` empty.

Method:
1. Artifact first. `npm run walkthrough -- schooling-and-crime-1830s literacy-split-france --url http://localhost:3591`. I read the transcript cut at the trust-sheet appendix (R1) and wrote an inventory of every learner-visible factual string before I opened meta.json. I did not read build.md or the cultural brief.
2. Data. I re-fetched Guerry.csv from raw.githubusercontent.com/vincentarelbundock/Rdatasets. Its SHA-256 13f9ff6a...8433 equals the history-data.mjs pin and the cached copy. Own script: session scratchpad fc57/scripts/guerry.mjs. It parses RAW out of Demo.tsx and compares it with the file row by row.
3. Sources opened: Rdatasets doc/HistData/Guerry.html; CRAN Guerry_1.8.5.tar.gz (sha256 ef629231...c928): man/Guerry.Rd, Guerry-package.Rd, Angeville.Rd, propensity.Rd, vignettes. Refused by the proxy, so no verdict rests on them: arxiv.org (Friendly 2007), datavis.ca (Friendly, Whitt translation), wikipedia, projecteuclid, halshs, archives.somme.fr, archives.isere.fr, ac-orleans-tours.fr, globalsecurity.org, herodote.net.

Unrecorded claims: none. The title, hook, question, options, stage heads, bars, "x1.7", scatter labels, alt text and reveal all map to c1-c7.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | **held (unverified)** | The data verify: RAW equals the file in 86 of 86 rows, and the doc defines Literacy (conscripts who can read and write) and the crime columns (population per crime, Compte general 1825-1830). The hook's **"young men"** has no opened source. The docs say "military conscripts", and that they were 20-year-old men comes only from search snippets. Fix: hook "Where more conscripts could read, ..." or open a conscription source. |
| c2 | verified | Quarters of 21 by stable file-order sort: 18.57% and 63.38% (shown 19% and 63%). There is a tie at 25%: three departments, one of which enters the bottom quarter by file order, as the claim says. |
| c3 | verified, advisory | 11.293 and 18.925 per 100,000 (shown 11.3 and 18.9); the ratio is 1.676 (shown x1.7). |
| c4 | verified, advisory | 5.886 and 5.863 (both 5.9). |
| c5 | verified | r = 0.3694 (shown 0.37); persons r = 0.032. |
| c6 | verified | This follows from c3 and c4. "Cases brought to court" is supported by the Compte general source and by the package's citation of Guerry's "comptes de l'administration de la justice criminelle". |
| c7 | verified | The years and the court source are as in c6. "Depend on policing as well as crime" is ruled a reasoning limit that needs no source: a case is counted only once it is detected and prosecuted, and the sentence asserts no size. "Departments, not people" holds because the file has one row per department. |

Tie sensitivity (my own check, not in the claims): I tried each of the three possible 25% departments in the bottom quarter. Its property mean moves from 11.11 to 11.57, the ratio from 1.635 to 1.703, and its persons mean from 5.89 to 5.99.

**Result (Pass 58):** 6 verified, 1 held, 0 disputed, of 7. Lesson now: 6 verified of 7.

Advisories (non-blocking, owner cm-history; the builder makes any change):
- c4: "the same" depends on rounding and on the tie-break. "About the same, 5.9 per 100,000" would hold under every tie-break. Under one alternative tie-break, c3's ratio would also read 1.6.
- c1: the title says "1830s", but the records run 1825-1830 (the doc says "around 1830"). The hook and the reveal give the exact years. "around 1830" or "1825-30" in the title would match them.
- c3: the doc calls the columns "population per crime". A search snippet (not opened) says Guerry counted persons accused. If a session opens Friendly 2007 or the Whitt translation and confirms this, "recorded crimes" should become "recorded accusations".

## Pass 59

Checker: fact-checker, a fresh instance, 2026-10-16. SO-10-2 batch SO-10-2-2, `[project:history]`. I did not write, build or record any of c1-c7.

Server: shared review server, built from 5b2fee71701e8645e3cd6e2fde60bcea004833e8 (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end, unchanged). `check.sh 5b2fee7 src/demos/history/schooling-and-crime-1830s`: R3a pass (exit 0). Walkthrough `--url http://localhost:3591` read first, cut at the R1 appendix; build.md not read.

Why a second pass: the queue named c1-c7, but FC pass 58 (00f629b, on bc0edc0) had already checked them. Between 00f629b and 5b2fee7 the lesson changed only in `evidence.qa`, so no SO-10-2 trigger fired. I re-derived everything anyway, on my own fetch and my own script, so the verdicts rest on two independent passes.

Data: Guerry.csv re-fetched from raw.githubusercontent.com/vincentarelbundock/Rdatasets, SHA-256 13f9ff6a...8433 = the history-data.mjs pin. CRAN Guerry_1.8.5.tar.gz opened (man, vignettes, inst/doc). Script: scratchpad scripts/fc.mjs.

| Claim | Verdict | Basis (my numbers) |
|---|---|---|
| c1 | **held (unverified)** | RAW = the file 86/86 rows in file order, and the column meanings match the doc. "Young men" in the hook still has no source I could open (see below). |
| c2 | verified | 18.571 / 63.381, shown 19% / 63%. Three departments at 25%, and the lower boundary falls on a tie, as recorded. |
| c3 | verified | 11.293 / 18.925, ratio 1.6758, shown 11.3 / 18.9 / x1.7. |
| c4 | verified | 5.886 / 5.863, both shown 5.9. |
| c5 | verified | r = 0.3694 (persons 0.0320). |
| c6 | verified | Follows from c3 and c4. The rendered reveal matches the claim word for word. |
| c7 | verified | The rendered reveal matches. One row per department. I agree with pass 58 that "policing" is a reasoning limit. |

Correction to the pass-58 note on c5 (wording only, verdict unchanged): 73.1 is the file's highest property-crime rate per 100,000 (the y axis, 0-80). It is not the highest Literacy, which is 74 (the x axis, 10-80). Every dot is inside both axes.

Blocked hosts for c1 ("young men", the 1818 Gouvion-Saint-Cyr law's draw of 20-year-old men): fr.wikipedia.org, en.wikipedia.org, halshs.archives-ouvertes.fr, hal.science, persee.fr, gallica.bnf.fr, archive.org, cairn.info, journals.openedition.org, legifrance.gouv.fr, herodote.net, napoleon.org, universalis.fr, archives.creuse.fr, fr.vikidia.org, fr.geneawiki.com, www2.assemblee-nationale.fr, datavis.ca, gutenberg.org, openlibrary.org, britannica.com and core.ac.uk. curl got a proxy CONNECT 403 on each, and WebFetch got ENOTFOUND. CRAN Guerry's opened material says only "military conscripts". A web-search summary says the men were 20, but a search summary is not a source. c1 stays held, under SO-10-2's blocked-host exclusion (W-556). Fix (demo-builder, via cm-history): hook "Where more conscripts could read, did fewer crimes reach court?".

Counts: 6 verified, 1 held, 0 disputed. Pass 58's advisories still stand.
