# Fact-check: square-bow-stays-tied

Independent claim checks for src/demos/lifehacks/square-bow-stays-tied. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | held unverified | Read HomeLesson.tsx BowStage and home-models.ts first. The reveal shows spec.idea, which matches the claim. The claim is about real knots (reef vs granny bow orientation, and loosening by impact and moving ends) and rests on Fieggen and Daily-Diamond et al. 2017. Neither could be opened (WebFetch DNS failure, proxy 403). Left unverified. |
| recall | held unverified | Same source dependency as c1: the recall why's claim that matching stages give a bow along the shoe and opposing stages one across it is a fact about real knots, from unopened sources (DNS, proxy 403). The keyed option (second stage right-over-left) is the only one that opposes a left-over-right first stage, so the logic is consistent. The physical claim is unchecked. Left unverified. |

**Result:** 0 verified, 0 disputed, 2 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified | HELD. Real-knot claims rest on Fieggen (fieggen.com) and Daily-Diamond et al. 2017 (escholarship.org); both proxy 403. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |
| recall | unverified | HELD. Same sources as c1 (unreachable). The keyed option is the only one that opposes a left-over-right first stage. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 2 held (unverified), 0 withdrawn.
