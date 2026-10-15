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
| c1 | verified | Formulas use 2 W and 24 h/day or 1 h/day (resource-specs.json); the rendered assumptions line is 'illustrative:2W;24h/day-or-1h/day.' (v2 dropped the unused €0.30/kWh). The trust-sheet text keeps 'Scaled model;', which the plain stage no longer prints; still true (the picture uses a fixed scale). |
| c2 | verified | Own run: at 365 days A = 2 × 24 × 365 / 1000 = 17.52 kWh, B = 2 × 365 / 1000 = 0.73 kWh; readouts '2 W × 24 h × 365 days ÷ 1,000' / '2 W × 1 h × 365 days ÷ 1,000'. 365 is a slider stop (5 + 72 × 5). |
| c7 | verified | 2 W × 8,760 h = 17,520 Wh = 17.52 kWh, so '17.5 kWh' (spec index 1) is right to one decimal; card A shows 17.52kWh at the start. |

**W-1078 (trust sheet matches the stage):** still open. c4 recall is a 3 W load (26.3 kWh a year). The stage's load is 2 W (17.52 kWh at 365 days). The recall arithmetic is true and stays verified; the row clears when the recall uses the stage's fixture (demo-builder, recall text from learning-designer or cm-lifehacks), then a fact-checker re-verifies c4.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
