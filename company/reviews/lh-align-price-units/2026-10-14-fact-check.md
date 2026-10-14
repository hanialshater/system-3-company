# Fact-check: lh-align-price-units

Independent claim checks for src/demos/lifehacks/lh-align-price-units. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | held unverified | Read the engine first. 'A unit price expresses cost per stated quantity' is definitional. But 'comparable unit-price labels use consistent units of measure' is a claim about labelling practice and rests on NIST SP 1181-2025, which I could not open (DNS failure, proxy 403). Left unverified. |

**Result:** 0 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).
