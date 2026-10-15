# Fact-check: lh-fixed-energy-charge

Independent claim checks for src/demos/lifehacks/lh-fixed-energy-charge. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Read Demo.tsx, ResourceLesson.tsx and resource-model.ts first. The claim is the unit definition and the model's bill arithmetic, and needs no outside page: 1 kWh = 1000 W × 1 h, so kWh = W × h ÷ 1000; cost = kWh × price + fixed charge. That is formulaA = 0.2x + 10 and formulaB = 0.3x in resource-specs.json, own run at 40 kWh: €18 and €12. Verified on the definition. energy.gov.au was not opened (DNS), and nothing here rests on it. |
| c6 | held unverified | The stage line is spec.warning, rendered under the assumptions line exactly as claimed. 'Tariffs and appliance ratings vary' is a claim about the world. Its source is still owed (the safety review named none), and I could not open any energy-regulator page (WebFetch DNS failure, proxy 403). Left unverified: it needs a citable source that can be opened here, or a ruling that a safety hedge is not a factual claim (evaluation-steward). |

**Result:** 1 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Rendered warning line. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The source is still owed (a national energy body or tariff regulator), and none is named or reachable. As in pass 35: it needs an openable source, or an evaluation-steward ruling on whether a safety hedge is a factual claim. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Same safety line and gap as lh-duty-cycle-energy c6: no energy-regulator host is allow-listed, and OWID has no household tariff page. Needs a source or an evaluation-steward ruling. |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (unverified): see the basis above for the fix or the source it needs.

## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 40 kWh A = 40 × 0.2 + 10 = €18.00, B = 40 × 0.3 = €12.00; readouts '40 kWh × €0.20 + €10 fixed' / '40 kWh × €0.30'. Bills equal at 100 kWh (€30), a slider stop. |
| c7 | verified | The hook is a question with no assertion of its own, and the stage can run it (40 → 20 kWh are stops). See c8 for the problem with its keyed answer; a reworded c8 will likely reword this hook too. |
| c8 | disputed | The keyed answer is true only for the bill with a fixed charge. The stage shows two bills, and the question names neither. Halving usage 40 → 20 kWh (both slider stops): card A €18.00 → €14.00 (does not halve), card B 'No fee' €12.00 → €6.00 (halves exactly). A learner who answers 'Yes' about card B is marked wrong while the stage shows them right. Fix (cm-lifehacks owns the plan line, demo-builder implements): name the bill in the question, e.g. 'Your bill has a €10 fixed charge. Halve your usage from 40 to 20 kWh: does the bill halve?', or make the keyed answer conditional on the fixed charge. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall break-even 100 kWh; 100 kWh is a stop and both cards show €30.00 there (A lower from 110).

**Result (Pass 51):** 2 verified, 1 disputed, 0 withdrawn.

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c8 (disputed): see the basis above for the fix. Owner: cm-lifehacks (plan line), then demo-builder.
