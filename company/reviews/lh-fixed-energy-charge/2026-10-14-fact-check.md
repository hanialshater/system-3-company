# Fact-check: lh-fixed-energy-charge

Independent claim checks for src/demos/lifehacks/lh-fixed-energy-charge. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Read Demo.tsx, ResourceLesson.tsx and resource-model.ts first. The claim is the unit definition and the model's bill arithmetic, and needs no outside page: 1 kWh = 1000 W × 1 h, so kWh = W × h ÷ 1000; cost = kWh × price + fixed charge. That is formulaA = 0.2x + 10 and formulaB = 0.3x in resource-specs.json, own run at 40 kWh: €18 and €12. Verified on the definition. energy.gov.au was not opened (DNS), and nothing here rests on it. |
| c6 | held unverified | The stage line is spec.warning, rendered under the assumptions line exactly as claimed. 'Tariffs and appliance ratings vary' is a claim about the world. Its source is still owed (the safety review named none), and I could not open any energy-regulator page (WebFetch DNS failure, proxy 403). Left unverified: it needs a citable source that can be opened here, or a ruling that a safety hedge is not a factual claim (evaluation-steward). |

**Result:** 1 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).
