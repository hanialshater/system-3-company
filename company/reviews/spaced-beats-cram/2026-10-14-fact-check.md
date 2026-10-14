# Fact-check: spaced-beats-cram

Independent claim checks for src/demos/lifehacks/spaced-beats-cram. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| recall | held unverified | The recall why ('Research on verbal recall generally favours spreading the same study time across sessions') is an empirical claim. It rests on Cepeda et al. 2006 (and Rawson & Kintsch 2005), and no abstract or full text could be opened (WebFetch DNS failure, proxy 403). The keyed option is consistent with the claim as cited, but the claim itself is unchecked. Left unverified. |

**Result:** 0 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).
