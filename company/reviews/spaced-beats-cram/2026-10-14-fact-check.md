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
