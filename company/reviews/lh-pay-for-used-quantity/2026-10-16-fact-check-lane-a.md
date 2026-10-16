# Fact-check (lane A, publish-blocking claims): lh-pay-for-used-quantity

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| c6 | verified | VERIFIED. Text matches resource-specs.json 'lh-pay-for-used-quantity' question, options and answer 0. Own arithmetic at 5 used: singles 5 x 0.50 = 2.50, so 0.50 per used piece; ten-pack 4 / min(5,10) = 0.80 per used piece (formulaB). Singles is the only true option; 'Equal' holds only at 8 used (4/8 = 0.50), which the question excludes. |

The same text is in each claim's note in src/demos/*/lh-pay-for-used-quantity/meta.json.
