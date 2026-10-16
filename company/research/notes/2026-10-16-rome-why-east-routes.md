# Rome "why all east?": route survey, with a defined end (B3, W-1045, W-1026)

Author: research-scientist (Dario), 2026-10-16, run window 12:19Z to 12:22Z.
Batch: `company/ops/dispatch-requests/2026-10-16-r3-research.md#B3` (POC: research-lead). Project: [project:history].
Question: can anything reachable from this sandbox supply an opened sentence saying why all 12 of van Langren's 1644 estimates of the Toledo-Rome longitude difference were too far east, for example that 17th-century tables inherited Ptolemy's eastward error? That sentence would let cm-history word a replacement for the cut claim c10 in `rome-placed-too-far-east`.

## Verdict

**We don't know from this sandbox.** I tried 30+ routes (the batch's stop) and none opened a sentence that states a cause for the eastward error or says the error was inherited from Ptolemy. No wording goes to cm-history. c10 stays cut, and c11 ("this record does not say why every one was too far east") stays true as written.

Confidence: **high** that no reachable host has the sentence among the routes listed below. **Low** on whether the sentence exists at all. I have not opened Friendly et al. 2010. My belief that it discusses the inherited Ptolemaic error is **from memory, unverified**, and nothing here rests on it. If the founder supplies the paper and it gives no cause, then the answer is "the sources we hold do not say", which is what c11 already tells the learner.

## (1) Host table

Times are UTC on 2026-10-16. "Per pass 53" means I did not retry the host. Its result is copied from `company/reviews/rome-placed-too-far-east/2026-10-16-fact-check.md` ("one more try" table), and "manager probe" means the B3 batch header (12:15Z).

| # | Route (exact URL or query) | Status, time | What it gave |
|---|---|---|---|
| 1 | https://cran.r-project.org/web/packages/HistData/index.html | 200, 12:19Z | Version 1.1.1. Two vignettes: HistData-Challenge and Snow_deaths-duplicates |
| 2 | https://cran.r-project.org/src/contrib/HistData_1.1.1.tar.gz | 200, 12:19Z, 9,245,932 bytes, sha256 `b602f00c07c1d954dba8a00bd4d772aa3f9188554c772f6f677d91a3000ce702` | **Opened.** `grep -rli ptolem` over the whole unpacked package: **no hits**. Details below |
| 3 | tarball `HistData/man/Langren.Rd` | opened, sha256 `2034983bb4b538f3ccb4f20b6c5b9493821ddff3dac5bf3a660203e8c772672f` | The same text pass 53 read (see note a). It says 'a compelling example of the notions of statistical variability and bias' and gives no cause. References: Friendly, Valero-Mora & Ulargui (2010), *Am Stat* 64(2) '185-191', with supplementary materials at http://datavis.ca/gallery/langren/. Also Langren (1644) *La Verdadera Longitud por Mar y Tierra*, English translation at http://datavis.ca/gallery/langren/verdadera.pdf, and Lelewel (1851) *Géographie du Moyen Âge* |
| 4 | tarball `vignettes/HistData-Challenge.Rmd` (lines 60, 739-744) and `vignettes/histdata.bib` | opened | The vignette names `sandbox/Langren-graph.R` and the 2026-07 blog post as re-drawings of the graph. It gives no cause. The bib file has no Langren or Ptolemy entry |
| 5 | https://raw.githubusercontent.com/friendly/HistData/master/sandbox/Langren-graph.R (the path the vignette names) | 200, 12:20Z, 2,214 bytes, sha256 `3d4a35d0a9f578f6f0c5d82b89c1ec78c78d782f54701b01ae801e008ee1bfbf` | Plotting code only. No Ptolemy, and no cause |
| 6 | https://raw.githubusercontent.com/friendly/HistData/master/R/data-concepts.R (named in the Rd header) | 200, 12:20Z, 154,249 bytes, sha256 `7872a034970d29d31f5bdf346210c9bc0f6b2f55180e27abc8c20514b72e47b8` | The Langren roxygen block is the same text as the Rd. 'systematically in error' (line 2474) belongs to OldMaps, not Langren |
| 7 | https://raw.githubusercontent.com/friendly/HistData/master/man/Langren.Rd | 200, 12:20Z, sha256 `d365d87de81e02cd3ec33c50b8890f6bd950324f280da0005bb142c8fe7326b2` | The same hash pass 53 recorded, so the GitHub master copy is unchanged since pass 53 |
| 8 | https://raw.githubusercontent.com/friendly/HistData/master/issues/TASKS.md (named in the vignette) | 200, 12:20Z, sha256 `5f2850cc...` | No Langren cause and no Ptolemy |
| 9 | https://raw.githubusercontent.com/friendly/friendly.github.io/master/blog/posts/2026-07-van-langren/index.qmd | 200, 12:20Z, 40,206 bytes, sha256 `5eb33e8403422386d22341909ec2c905332f90c78d197202f2c22baee5b88278` | The same file as pass 48 and pass 53. The only nearby mention is line 101: the [Alfonsine Tables] 'provided data for computing the position of the Sun, Moon and planets relative to the fixed stars'. That is about van Langren's cipher, not the longitude error. No Ptolemy and no cause |
| 10 | the same path on branch `main` | 404, 12:20Z | (master is the branch) |
| 11 | http://datavis.ca/gallery/langren/verdadera.pdf (the 1644 English translation, named in the Rd) | curl (6) DNS failure, 12:20Z | — |
| 12 | https://datavis.ca/gallery/langren/ (the supplementary page) | proxy CONNECT 403, 12:20Z | — |
| 13 | https://www.datavis.ca/gallery/langren/verdadera.pdf | proxy CONNECT 403, 12:20Z | — |
| 14 | https://api.crossref.org/works/10.1198/tast.2010.09154 | 200, 12:20Z, sha256 `9774e9ea70f58b673d3c04a09c3be658967f8e454d1848c46e203b0a868db012` | Metadata only. Authors are Michael Friendly, Pedro Valero-Mora and Joaquín Ibáñez Ulargui. Vol 64, issue 2, **pp. 174-184**. 9 citing works. 11 references deposited. The full-text link is tandfonline (blocked) |
| 15-21 | api.crossref.org/works/ for the 7 reference DOIs: 10.1086/348018 (Boyer 1947, Isis), 10.1016/S0167-9473(02)00290-6 (Friendly & Kwan 2003), 10.1086/368425 and 10.1086/368480 (Funkhouser 1936, 1937, Osiris), 10.1080/03085695608592130 (Keuning 1956, *Imago Mundi*, 'The van Langren family'), 10.1016/0315-0860(75)90072-5 (May 1975), 10.1086/350424 (Wallace 1968) | 200 each, 12:20Z | Titles only. Keuning 1956 is the only one about cartography, and it is on tandfonline (blocked). None is about the history of Ptolemy's longitudes |
| 22 | https://pmc.ncbi.nlm.nih.gov/search/?term=%22van%20Langren%22 | 200, 12:21Z | 1 hit: PMC10960004 |
| 23 | PMC search `Langren longitude Toledo Rome` | 200, 12:21Z | 0 hits |
| 24 | PMC search `Ptolemy longitude error Mediterranean` | 200, 12:21Z | 3 hits: PMC7738181, PMC9286359, PMC9333327 |
| 25 | PMC search `Ptolemy Geography longitude overestimate` | 200, 12:21Z | 0 hits |
| 26 | PMC search `"Mediterranean" Ptolemy length longitude` | 200, 12:21Z | 4 hits: adds PMC11779635 and PMC5799693 |
| 27 | PMC OAI `https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:10960004&metadataPrefix=pmc` | 200, 12:21Z, sha256 `794f0987...` | 'Measuring the similarity of charts in graphical statistics'. It mentions Langren only in reference 1, which gives *Am. Stat.* 64, **174-184**. No cause |
| 28 | PMC OAI, the same form, for 9286359 | 200, 12:21Z, sha256 `de4dffb4...` | 'Inventing the Grand Banks: A deep chart'. Ptolemy appears only as 'the rediscovery of Ptolemy's work' and 'redrafted Ptolemaic mappae' that 'bore little relation to the real experiences of navigators'. That is about the Atlantic and gives no longitude error |
| 29 | PMC OAI for 7738181, 9333327, 11779635, 5799693 | 200 each, 12:21Z | Mummified baboons, constellation networks, Iron Age Britain, the 1841 Niger expedition. 'Ptolemaic' here means the Egyptian dynasty or similar. Not relevant |
| 30 | babel.hathitrust.org, www.biodiversitylibrary.org, www.loc.gov/maps, www.persee.fr, doaj.org (API), ui.adsabs.harvard.edu, api.adsabs.harvard.edu, www.e-periodica.ch, journals.openedition.org, www.digitale-sammlungen.de, wellcomecollection.org, www.mdpi.com, link.springer.com, quod.lib.umich.edu, www.davidrumsey.com | proxy CONNECT 403 each, 12:21Z | — |
| 31 | https://friendly.github.io/blog/posts/2026-07-van-langren/ (rendered blog) | proxy CONNECT 403, 12:21Z | (the raw qmd, row 9, is the same post) |
| — | doi.org → tandfonline.com (abs, pdf) | per pass 53: 302, then 403 | — |
| — | datavis.ca/papers/langren-TAS09154.pdf, langren-TAS-rev2.pdf, www.datavis.ca/gallery/langren/ | per pass 53: DNS failure or 403 | (rows 11-13 confirm today) |
| — | euclid.psych.yorku.ca, producciocientifica.uv.es, roderic.uv.es | per pass 53: 403 | — |
| — | jstor.org/stable/20799899 | per pass 53: 200, but a bot challenge page. **Not retried**, per the stop rule on bot challenges | — |
| — | api.semanticscholar.org, api.openalex.org, core.ac.uk, scholar.archive.org | per pass 53: 403 | — |
| — | archive.org, en.wikisource.org, penelope.uchicago.edu, gutenberg.org, zenodo.org/records/3585758, e-perimetron.org, r-bloggers, storymaps.arcgis.com | per pass 53: 403 | — |
| — | academic.oup.com, idp.nature.com, www.ncbi.nlm.nih.gov, europepmc.org, web.archive.org, en.wikipedia.org, books.google, cambridge.org, sciencedirect, springer, perseus.tufts.edu, gallica.bnf.fr, Heidelberg digi, e-rara | per manager probe 12:15Z: 403 | — |

Re-run: every curl here was `curl -sS -A 'Mozilla/5.0' -o <file> -w '%{http_code} %{size_download}' <url>` through the default proxy. I fetched the files into the session scratchpad. They are not committed.

Notes:
- a. **Two Langren.Rd copies.** CRAN 1.1.1 (`2034983b...`) and GitHub master (`d365d87d...`) have different hashes, and both lack any cause. I did not diff them line by line. The Rdatasets doc pinned for `langren` in history-data.mjs is a third rendering. None of the three gives a cause.
- b. **Citation pages, now three for 174-184.** Crossref (row 14) and PMC10960004's reference list (row 27) both give pp. 174-184, while the HistData Rd gives 185-191. This supports pass 53's advisory on c7's source string (owner: demo-builder).
- c. **The batch file's citation is wrong.** It names "Friendly, Valdez-Rodríguez & Valero-Mora 2010". Crossref gives **Friendly, Valero-Mora & Ibáñez Ulargui**. Use the Crossref form in any founder ask.
- d. **No GitHub search.** The GitHub search API is refused, so I could open only the GitHub paths that a file names exactly (rows 5-9).

## (2) Routes not yet tried (beyond the ones above)

- **Crossref's list of citing works.** Crossref's cited-by data is for members only, and the OpenAlex and Semantic Scholar citation APIs return 403. The one citing paper I found in PMC (row 27) cites the 2010 paper only for priority. So of the paper's 9 citing works, I found 1 and none of the other 8.
- **A Ptolemy-inheritance statement in history-of-cartography literature.** The natural homes are *Imago Mundi* (tandfonline), the *Journal for the History of Astronomy* (SAGE), ADS, and the *History of Cartography* volumes (press.uchicago.edu). The first three are blocked here (tandfonline and ADS confirmed today), and I did not try SAGE or the Chicago press site. PMC (rows 22-29) has nothing on it.
- **Lelewel 1851** and the 1644 *Verdadera* translation: blocked (datavis.ca, gallica, archive.org).

## (3) Verdict and what it means for the lesson

- **Verdict: we don't know from this sandbox.** No opened sentence states a cause, so no replacement for c10 goes to cm-history.
- **The only Ptolemy evidence on disk is Ptolemy's own value.** The Langren1644 file holds Ptolemy's entry at 27.787°, 11.3° east of the true 16.53°. Under the batch's stop rule, that is "Ptolemy's own value only". It does not show that later tables inherited the error, and it must not be worded as if it did.
- **For the lesson:** nothing changes. c11 already tells the learner that this record does not say why. That is honest, and it is verified (pass 53).

## The founder ask (word for word, for the chief of staff to file as F-<n>)

> **Rome "why all east?" (W-1045, W-1026).** Nothing reachable from the agents' sandbox says why all 12 of van Langren's 1644 longitude estimates were too far east. Either of the following would settle whether a sourced sentence exists. Neither is needed to publish, because the lesson already says the record does not explain it.
> (a) **Put these PDFs in the repo** (for example in `artifacts/sources/`, or anywhere you choose and tell us the path): Friendly, M., Valero-Mora, P. & Ibáñez Ulargui, J. (2010), "The First (Known) Statistical Graph: Michael Florent van Langren and the 'Secret' of Longitude", *The American Statistician* 64(2): 174-184, doi 10.1198/tast.2010.09154; and, if you can, the English translation of van Langren's *La Verdadera Longitud por Mar y Tierra* (1644) from datavis.ca/gallery/langren/verdadera.pdf.
> (b) **Or allow-list these hosts** for the agents' proxy: `www.tandfonline.com` (with `tandfonline.com`), and `datavis.ca` with `www.datavis.ca`. Today datavis.ca fails DNS and www.datavis.ca gets a proxy 403. This is a permission change only you can make.
> If neither happens, the lesson stays as it is and W-1045 closes as "blocked on this ask".

This note lists the options. It does not ask for the permission change on the founder's behalf. Whether to raise the ask is the chief of staff's call.

## Who acts next

- **Chief of staff (board):** record W-1045 and W-1026's rome item as **blocked on founder ask F-<n>** (the text above), not as an open retry. File the ask if the B2 note also ends "not reachable", so the two can go together as the batch header proposes.
- **Fact-checker (lane 10, routed by evaluation-steward):** no passage to open. Optionally re-run rows 2, 14 and 27 to confirm "nothing opened".
- **demo-builder (optional):** note b, c7's pages, now with three sources.
- **cm-history:** nothing to word.
