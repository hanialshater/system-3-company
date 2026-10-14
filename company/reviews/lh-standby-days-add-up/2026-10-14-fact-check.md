# Fact-check: lh-standby-days-add-up

Independent claim checks for src/demos/lifehacks/lh-standby-days-add-up. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Same as lh-fixed-energy-charge c5: this is the unit definition (kWh = W × h ÷ 1000) and the model's arithmetic. formulaA = 2 × 24 × x ÷ 1000 and formulaB = 2 × x ÷ 1000; own run of resource-model.ts at 365 days gives 17.52 kWh and 0.73 kWh. Price × kWh appears in the assumptions (€0.30/kWh). Verified on the definition; energy.gov.au was not opened and is not relied on. |
| c6 | held unverified | Rendered as spec.warning under the assumptions line, exactly as claimed. The source is owed and no page could be opened (DNS, proxy 403). Left unverified: same as lh-fixed-energy-charge c6. |

**Result:** 1 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).
