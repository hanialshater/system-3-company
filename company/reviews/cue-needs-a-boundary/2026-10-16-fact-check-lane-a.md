# Fact-check (lane A, publish-blocking claims): cue-needs-a-boundary

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| seen | disputed | STILL DISPUTED. engine-v2.ts recallColumn (line 245) still scores mode B on RECALL_INITIAL, the fixed wrong attempt, so the row reads 'Kenya's capital?: answers this cue fits 1; match 0/3.' What is wrong: '0/3' is the score of a fixed attempt that is the same in both modes; next to the specific cue it says the specific cue failed, against c2. Corrected statement (drop the Match result for recall lessons that declare candidates): 'Capital?: answers this cue fits 3. Kenya's capital?: answers this cue fits 1.' Owner: demo-builder (engine change, W-610 family). |

The same text is in each claim's note in src/demos/*/cue-needs-a-boundary/meta.json.
