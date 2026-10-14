# Fact-check: lh-standby-days-add-up

Independent claim checks for src/demos/lifehacks/lh-standby-days-add-up. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Same as lh-fixed-energy-charge c5: this is the unit definition (kWh = W × h ÷ 1000) and the model's arithmetic. formulaA = 2 × 24 × x ÷ 1000 and formulaB = 2 × x ÷ 1000; own run of resource-model.ts at 365 days gives 17.52 kWh and 0.73 kWh. Price × kWh appears in the assumptions (€0.30/kWh). Verified on the definition; energy.gov.au was not opened and is not relied on. |
| c6 | held unverified | Rendered as spec.warning under the assumptions line, exactly as claimed. The source is owed and no page could be opened (DNS, proxy 403). Left unverified: same as lh-fixed-energy-charge c6. |

**Result:** 1 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Rendered warning line. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The source is still owed (a national energy body or tariff regulator), and none is named or reachable. As in pass 35: it needs an openable source, or an evaluation-steward ruling on whether a safety hedge is a factual claim. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
