# Fact-check: drying-room-water-load

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/drying-room-water-load), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c5 | unverified (held) | Not rendered and superseded by .recall. **Builder deletes it.** |
| c6 | unverified (held) | This advice claim (damp and mould) needs a housing or public-health body. None could be opened here. UK council damp-guidance snippets agree, but I did not open them, so I do not use them. The physical clause is true: evaporated water enters the room air first. Re-check from a connected host, for example the gov.uk "Understanding and addressing the health risks of damp and mould in the home" guidance or NHS damp and mould guidance. |
| recall | verified | 6 × 300 g = 1800 g = 1.8 kg, and the key is option 0. This is the evaluateHome mass balance. The why describes the model, so it does not contradict c6. |

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/drying-room-water-load v2. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | Warning renders in the reveal (spec.warning, home-lessons.ts line 721) with the claim's exact text. The physical clause (dried water enters room air) is a mass balance and true. The damp-and-mould advice needs a housing or public-health body; nhs.uk (tried this pass) and the other hosts fail DNS / proxy 403. Left unverified, as in LH-2. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. The physical clause (dried water enters the room air) is a mass balance and true. The damp-and-mould advice needs a housing or public-health body. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Rendered safety line (spec.warning): 'Dry indoors with a window open or a vent on: the water you dry goes into the room's air, and without ventilation it can cause damp and mould.' The physical clause is a mass balance (water that leaves the laundry enters the room air), as earlier passes found. The damp-and-mould clause now rests on opened public-health research on PMC. Int J Environ Res Public Health 2020, 'Fungal Contaminants in Energy Efficient Dwellings: Impact of Ventilation Type' (PMC7400204): indoor mould proliferation 'could be a result of water leakage or inadequate ventilation'. Air-tightening may 'promote moisture accumulation through human activities (e.g., showering, cooking, drying laundry)', and 'High moisture levels are associated with fungal growth'; mechanical ventilation lowers bedroom humidity and 'has been associated to an absence of visible moulds'. Environ Health Perspect 1986, 'Indirect health effects of relative humidity in indoor environments' (PMC1474709): 'Most species of fungi cannot grow unless the relative humidity exceeds 60%.' Cochrane 2015 (PMC6769180) lists 'exhausting water vapour from kitchens and bathrooms' among damp remediations. These are research papers, not a housing body's guidance page, but they support the line as worded ('can cause'). Builder (non-blocking): replace 'Source owed' in the source field with these citations. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
