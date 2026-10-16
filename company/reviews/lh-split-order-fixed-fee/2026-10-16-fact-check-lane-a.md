# Fact-check (lane A, publish-blocking claims): lh-split-order-fixed-fee

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| c5 | verified | VERIFIED. Hook matches meta.json and resource-specs.json. Own arithmetic from formulaA = 24 + 4x: one order 28, two 32, three 36; the same 24 of goods gives different totals as the fee repeats. |
| c6 | verified | VERIFIED. Text matches resource-specs.json question, options and answer 1. Own arithmetic: split into two orders 24 + 4 x 2 = 32; combined 24 + 4 = 28. Combined is lower and the only true option; 'Equal' only at one order, which the question excludes. |

The same text is in each claim's note in src/demos/*/lh-split-order-fixed-fee/meta.json.
