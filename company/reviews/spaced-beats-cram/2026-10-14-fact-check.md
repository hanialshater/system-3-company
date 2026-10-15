# Fact-check: spaced-beats-cram

Independent claim checks for src/demos/lifehacks/spaced-beats-cram. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| recall | held unverified | The recall why ('Research on verbal recall generally favours spreading the same study time across sessions') is an empirical claim. It rests on Cepeda et al. 2006 (and Rawson & Kintsch 2005), and no abstract or full text could be opened (WebFetch DNS failure, proxy 403). The keyed option is consistent with the claim as cited, but the claim itself is unchecked. Left unverified. |

**Result:** 0 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| recall | unverified | HELD. Cepeda et al. 2006 and Rawson and Kintsch 2005 not opened. Partial corroboration from an opened source: OpenStax Psychology 2e section 8.4 'Ways to Enhance Memory' (raw GitHub module m82216) advises 'Use distributed practice: Study across time in short durations rather than trying to cram'. That is advice, not a report of research on verbal recall, so it does not carry 'Research on verbal recall generally favours'. Builder option: cite OpenStax and reword to what it says. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Opened on PMC: Benjamin and Tullis (2010), 'What makes distributed practice effective?', Cogn Psychol 61(3): 228-247 (PMC2930147). Abstract: 'The advantages provided to memory by the distribution of multiple practice or study opportunities are among the most powerful effects in memory research.' Introduction: 'The effects of distributing practice are extremely robust and cross-cutting: the advantages are evident in basic memory tasks using words (Cepeda, Pashler, Vul, Wixted, & Rohrer, 2006 ...)'. Kornmeier et al. (2014), PLoS One 9(3): e90656 (PMC3946552), shows the same spacing pattern in verbal paired-associate learning. The why ('generally favours spreading the same study time across sessions; total hours alone do not decide later recall') is hedged and matches. Cepeda et al. 2006 itself is still not opened; the basis is the two PMC papers. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
