# Fact-check: lh-duty-cycle-energy (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx and the shared engine first (src/components/lifehacks/ResourceLesson.tsx: useResourceState, Test A / Test B, slider, results with printed formulas, assumptions and warning lines, reveal; src/lib/lifehacks/resource-model.ts evaluateResource; the spec in src/lib/lifehacks/resource-specs.json), then meta.json claims and recall, then source fields. No Reset control or animation on this path. Source hosts (energy.gov.au, nist.gov and other government sites) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Verified as a derivation from unit definitions, not on the cited energy.gov.au page (not opened). Energy (Wh) = power (W) × time (h), and 1 kWh = 1000 Wh, so kWh = W × h ÷ 1000 for a constant load; a per-kWh price is by definition charged per kWh, so energy cost = kWh × price, and any stated fixed charge is a separate term. Matches the stage formulas printed by resourceFormula (e.g. (100×0.25×8)÷1000 = 0.2 kWh). |
| c6 | unverified | HELD. An empirical claim (real tariffs and appliance ratings differ by product, plan, region and time) plus an instruction. The source field says a source is owed (national energy body or tariff regulator) and none is named; every such host I tried (energy.gov.au, ofgem.gov.uk, eia.gov, energy.gov, ec.europa.eu) is unreachable here. I did not verify it from common knowledge. It does not conflict with the stage, which uses invented ratings and tariffs and says so. |

**Result:** 1 verified (c5, by derivation), 1 held unverified (c6, source owed and unopenable). No disputes.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Rendered warning line. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The source is still owed (a national energy body or tariff regulator), and none is named or reachable. As in pass 35: it needs an openable source, or an evaluation-steward ruling on whether a safety hedge is a factual claim. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
