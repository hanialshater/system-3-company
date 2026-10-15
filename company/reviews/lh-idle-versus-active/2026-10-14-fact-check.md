# Fact-check: lh-idle-versus-active

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Definitional, not resting on energy.gov.au (not opened, web blocked): 1 kWh = 1000 W x 1 h, so constant load energy = W x h / 1000; per-kWh cost = kWh x price, with fixed charges separate. Not rendered on this stage (no learner string contains it); the stage formulas apply it: 60 x 2 x 5 / 1000 = 0.6, 3 x 22 x 5 / 1000 = 0.33. |
| c6 | held (unverified) | Rendered warning line; the source owed (national energy body or tariff regulator) could not be opened (web blocked). |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

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

## Pass 50

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1084). I did not write, build or record any of these claims. Method: I read Demo.tsx and the shared spec or model files for every learner-visible string before any builder note. Derivations were re-run in my own node script (session scratchpad fc50/m.mjs). Sources were opened myself: PMC full text via the OAI API, the Crossref REST API (publisher-deposited abstracts), and raw.githubusercontent.com (OpenStax CNXML). The proxy refuses mdpi.com, pubs.aip.org, doaj.org, arxiv.org, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, cdc.gov and who.int, and WebFetch fails DNS. Search-result summaries were not counted as opened sources. No fetched page contained instructions addressed to an AI; all were treated as data. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 50').

Scope: c6, the safety line 'Tariffs and appliance ratings vary: check your own.' (resource-specs.json warning, rendered by ResourceLesson).

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | VERIFIED. Opened two sources myself. (1) Rokicki et al. (2021), 'Differentiation and Changes of Household Electricity Prices in EU Countries', Energies 14(21): 6894, DOI 10.3390/en14216894, publisher abstract read via api.crossref.org/works/10.3390/en14216894 (mdpi.com itself is blocked; abstract only, not full text): the paper sets out 'to identify the differentiation and variation of electricity prices for households in EU countries' (28 states, 2008-2019, Eurostat data) and finds 'higher electricity prices for households in the EU states were associated with better economic parameters', so household prices differ between countries. (2) OpenStax College Physics 2e, section 'Electric Power and Energy' (module m42714, raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/modules/m42714/index.cnxml): 'We also think of lightbulbs in terms of their power ratings in watts. Let us compare a 25-W bulb with a 60-W bulb'; a CFL 'puts out the same intensity of light as the 60-W bulb, but at 1/4 to 1/10 the input power'; 'It is easy to estimate the cost of operating electric appliances if you have some idea of their power consumption rate in watts or kilowatts, the time they are on in hours, and the cost per kilowatt-hour for your electric utility' (its worked example says 'If the cost of electricity in your area is 12 cents per kWh'). Together these carry 'Tariffs and appliance ratings vary'; 'check your own' is advice that follows from the OpenStax sentence. The line is hedged and claims no size. Builder: replace the 'Source owed' text with these two citations. Record: company/reviews/lh-idle-versus-active/2026-10-14-fact-check.md, Pass 50. |

**Result (Pass 50):** 1 verified, 0 disputed, 0 held. Open item for demo-builder: replace the 'Source owed' text in c6 with the two citations in the note.
