# Fact-check: rome-placed-too-far-east v4

## Pass 53 (hist-fc4)

Checker: fact-checker, a fresh instance, 2026-10-16. Batch: `company/domains/history-dispatch/2026-10-16-round-1.md`, run 4 ([project:history]). I did not write, build or record any of these claims. If another fact-check pass in this batch also took the number 53, this one is the hist-fc4 pass.

Scope: the claims v4 (commit f49df18, merged 48c66af) added or reset. These are c11 (new) and c4 (reset because its quoted year-view label changed from 'Reading · 780 km too far' to 'Middle · 780 km too far'). The other eight claims did not change and keep their earlier verdicts.

Method:
- I read the artifact first: `NEXT_DIST_DIR=.next-fc4 npm run build`, then `npm run walkthrough -- rome-placed-too-far-east --port 3861` on that production build of 48c66af. Output: `artifacts/walkthroughs/rome-placed-too-far-east/transcript.md` and 6 screenshots. The server stopped itself, and port 3861 was free afterwards.
- Only then did I read meta.json and Demo.tsx.
- I re-fetched the pinned Langren1644.csv and its doc from Rdatasets into a fresh scratch directory. The sha256 is 644b1008a62a8971feb7d2c2270654af123d16a6c4d7bf2aad024a9c9daf4851, which equals the pin in `company/domains/briefs/checks/history-data.mjs` and the copy in artifacts/history-data.
- I re-derived the numbers with my own python script, and I read the doc in full.

Unrecorded claims: none new. The steps 1-3 readout label 'Reading' is a heading, not a claim. The year-view label is covered by c4, and the reveal clause by c11.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | **As rendered:** step 4 shows the readout label 'MIDDLE · 780 KM TOO FAR' (CSS uppercase of `Middle · ${MEDIAN_KM} km too far`) over 'AD 150: 27.8°, 1610: 28.2°'. The 'middle: 25.8°' marker is still drawn, so 'Middle' names a mark the learner can see. The median view reads '9.3° too far ≈ 780 km', and the reveal says 'The middle, 25.8, was 780 km too far.' **Re-derived:** the 6th and 7th sorted values are 25.617 and 26, so the median is 25.8085. Minus 16.53 that is 9.2785 degrees. At 111.32 × cos(40.875°) = 84.173 km per degree, that gives 781.0 km, which rounds to 780. Demo.tsx DATA matches the file row for row, and all three places use MEDIAN_KM. The numbers are unchanged from pass 48. |
| c11 | verified | **As rendered** (reveal paragraph 3): 'Where it stops: 2 of the 12 were probably read from maps, not measured, and this record does not say why every one was too far east.' This matches the claim text. 'Every one ... too far east' holds: 12 of 12 values are greater than 16.53. **The file:** its columns are rownames, Name, Longitude, Year, Longname, City, Country, Latitude, Source and Gap. None is a cause or explanation. **The doc** (Rdatasets HTML, and friendly/HistData `man/Langren.Rd`, sha256 d365d87d...), read in full: it says the graph 'showed large errors, for even this modest distance' and 'provides a compelling example of the notions of statistical variability and bias'. That names a bias but gives no cause. Gap is described as 'whether the Longitude value is below or above th[e] median'. The examples end with `# why the gap?` and `glm(Gap ~ Year + Source + Latitude, ...)`, with no answer stated. That question is about the split around the median, not the eastward direction. Source is 'Likely source for this determination of Longitude' (Astron or Map), which records where a value came from, not why it was wrong. Neither the file nor the doc gives a reason. |

Advisories. Neither changes a verdict, and none is learner-visible.
- **c11 source string.** It lists five columns ('Name, Year, Longitude, Source, Gap'). The file has ten: it also has Longname, City, Country and Latitude, and none of the four is a cause. Owner: demo-builder, to make the list complete.
- **Citation pages.** Crossref (api.crossref.org/works/10.1198/tast.2010.09154, opened today) gives *The American Statistician* 64(2), pages **174-184**. The HistData doc and c7's source string say 185-191. I could not open the paper to settle which is right, so Crossref's metadata is the better reference for now. Owner: whoever next edits c7's source string (demo-builder).

**Result (Pass 53):** 2 verified, 0 disputed, 0 withdrawn, of 2 checked. The lesson now has 10 of 10 claims verified (c1-c9 and c11; c10, the Ptolemy sentence, was cut before v4).

### Sourced reason for 'why all east' (W-1026, W-1045): one more try, not opened

| Tried | Result |
|---|---|
| doi.org/10.1198/tast.2010.09154 | 302 to tandfonline.com, then proxy CONNECT 403 |
| tandfonline.com (abs and pdf) | proxy 403 |
| datavis.ca/papers/langren-TAS09154.pdf (the WebSearch hit), datavis.ca/papers/langren-TAS-rev2.pdf, www.datavis.ca/gallery/langren/ | curl: DNS failure or proxy 403. WebFetch: ENOTFOUND |
| euclid.psych.yorku.ca (Friendly's mirror) | proxy 403 |
| producciocientifica.uv.es (Valero-Mora's university record), roderic.uv.es | proxy 403. WebFetch: ENOTFOUND |
| jstor.org/stable/20799899 | 200, but the page is a 'Client Challenge' bot page with no content |
| api.semanticscholar.org, api.openalex.org, core.ac.uk, scholar.archive.org | proxy 403 |
| api.crossref.org | 200: metadata only, with no abstract and no text |
| **Ptolemy editions or coordinates:** archive.org, en.wikisource.org, penelope.uchicago.edu (Thayer), gutenberg.org, zenodo.org/records/3585758 (the Ptolemy catalogue dataset), e-perimetron.org, r-bloggers, storymaps.arcgis.com | all proxy 403 |
| raw.githubusercontent.com friendly/friendly.github.io blog post 2026-07-van-langren (sha256 5eb33e84..., the same file pass 48 read) | opened, 6,044 words. It covers the cipher, the clepsydra and why a graph rather than a table. Searching it for Ptolemy, east, bias, overestimate, stretch, inherit, cause and reason finds no statement of why the estimates ran east, and no mention of Ptolemy. |

Nothing opened that states a cause or the Ptolemy inheritance, so there is no wording to pass to cm-history. Two notes for whoever tries next:
- A Ptolemy edition alone would give only Ptolemy's own coordinates. From the file, his value is 27.787, or 11.3 degrees too far east. An edition would not show that later tables *inherited* that error, so the replacement sentence needs a secondary source such as Friendly et al. (2010).
- The WebSearch summaries (not counted as sources) also said nothing about Ptolemy.

W-1045 stays open. The paper needs a host this sandbox can reach, such as an allow-listed datavis.ca or tandfonline.com, or a copy the founder supplies.

Next:
- **cm-history:** none needed for c11. The clause stands as verified, and W-1045 stays open with no wording found.
- **demo-builder (optional, non-blocking):** the two source-string advisories above.
- Rome's claim gate is clear. Publishing still waits on run 5 (the learner-evaluator re-walk).
