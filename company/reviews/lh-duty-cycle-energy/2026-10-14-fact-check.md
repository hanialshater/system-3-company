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

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. 'Tariffs and appliance ratings vary: check your own.' needs a national energy body or tariff regulator, and none is allow-listed (ofgem.gov.uk, eia.gov, energy.gov: 403). OWID, the only allow-listed data host with energy pages, has no household electricity tariff chart (sitemap searched for 'electric' and 'pric': none). Still needs a source or an evaluation-steward ruling on whether a safety hedge is a factual claim (as in passes 35 and 38). |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c6 (unverified): see the basis above for the fix or the source it needs.

## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 24 h A = 100 × 0.25 × 24 / 1000 = 0.6 kWh, B = 2.4 kWh; readouts '100 W × a quarter of 24 h ÷ 1,000' / '100 W × 24 h ÷ 1,000'. Fixed energy scale (top label 4.8kWh, the 48 h maximum). Note for demo-builder: the assumptions line still lists €0.30/kWh, which no card uses (standby-days-add-up dropped the same unused price in v2). |
| c7 | verified | Hook scenario (100 W, on a quarter of the time, one day) is the stage start (24 h, Quarter on). It is framed as a hypothetical; the stage says 'illustrative'. No real-appliance figure is asserted. |
| c8 | verified | 100 W × 6 h on = 600 Wh = 0.6 kWh (spec index 0); 2.4 kWh is 100 W for all 24 h, card B. Matches the stage start. |

**W-1078 (trust sheet matches the stage):** still open. c4 recall is 200 W on half of 10 h (1 kWh). The stage is 100 W on a quarter of the time; at 10 h it shows 0.25 and 1 kWh. The recall arithmetic is true and stays verified; the row clears when the recall uses the stage's fixture (demo-builder, recall text from learning-designer or cm-lifehacks), then a fact-checker re-verifies c4.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
