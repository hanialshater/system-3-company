# Fact-check: lh-same-energy-new-tariff (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx and the shared engine first (src/components/lifehacks/ResourceLesson.tsx: useResourceState, Test A / Test B, slider, results with printed formulas, assumptions and warning lines, reveal; src/lib/lifehacks/resource-model.ts evaluateResource; the spec in src/lib/lifehacks/resource-specs.json), then meta.json claims and recall, then source fields. No Reset control or animation on this path. Source hosts (energy.gov.au, nist.gov and other government sites) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Verified as a derivation from unit definitions, not on the cited energy.gov.au page (not opened). Energy (Wh) = power (W) × time (h), and 1 kWh = 1000 Wh, so kWh = W × h ÷ 1000 for a constant load; a per-kWh price is by definition charged per kWh, so energy cost = kWh × price, and any stated fixed charge is a separate term. Matches the stage formulas printed by resourceFormula (e.g. 3 kWh × €0.40 = €1.20 and × €0.20 = €0.60). |
| c6 | unverified | HELD. An empirical claim (real tariffs and appliance ratings differ by product, plan, region and time) plus an instruction. The source field says a source is owed (national energy body or tariff regulator) and none is named; every such host I tried (energy.gov.au, ofgem.gov.uk, eia.gov, energy.gov, ec.europa.eu) is unreachable here. I did not verify it from common knowledge. It does not conflict with the stage, which uses invented ratings and tariffs and says so. |

**Result:** 1 verified (c5, by derivation), 1 held unverified (c6, source owed and unopenable). No disputes.
