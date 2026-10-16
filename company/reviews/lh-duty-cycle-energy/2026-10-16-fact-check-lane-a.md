# Fact-check (lane A, publish-blocking claims): lh-duty-cycle-energy

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| c6 | unverified | HELD. No national energy body or regulator host opens here this pass (eia.gov, ofgem.gov.uk, aer.gov.au, ec.europa.eu eurostat, energystar.gov: proxy refusal); a PMC search found no source stating that tariffs and ratings vary. Two ways to unblock: (1) evaluation-steward rules on W-847 (safety hedges); (2) cm-lifehacks with the safety reviewer replaces the line with one that claims only the stage: 'These prices and ratings are illustrative: use your own bill and your appliance's label.' (checkable against the spec's assumptions, which say 'illustrative'/'fictional'). |

The same text is in each claim's note in src/demos/*/lh-duty-cycle-energy/meta.json.
