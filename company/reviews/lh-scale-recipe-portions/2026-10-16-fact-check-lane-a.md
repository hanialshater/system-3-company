# Fact-check (lane A, publish-blocking claims): lh-scale-recipe-portions

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| c5 | unverified | HELD. fsis.usda.gov and food.gov.uk still refused by the proxy; two PMC searches (cooking time vs size/thickness) found no food-safety body text on how cooking time scales with quantity. Unblock wording for cm-lifehacks and the safety reviewer, claiming only the card: 'This card scales quantities only, not cooking times: follow the recipe's own times and check food is cooked through.' |

The same text is in each claim's note in src/demos/*/lh-scale-recipe-portions/meta.json.
