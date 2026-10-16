# Fact-check (lane A, publish-blocking claims): drying-room-water-load

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| c6 | verified | VERIFIED. Rendered warning (home-lessons.ts line 1152) matches the text. Source of the kind the safety record asks for (a public-health body's guidance), opened first-hand via the PMC OAI API: AWMF mold guideline 'Medical clinical diagnostics for indoor mold exposure', Update 2023, AWMF Register No. 161/001, Allergologie Select 2024, PMC11097193 (guideline of the Association of the Scientific Medical Societies in Germany; contributors include the German Environment Agency). It says mold growth 'is therefore favored by high humidity, inadequate ventilation, and cold component surfaces', 'The living area should be kept dry by ventilation', and 'If possible, dry wet towels and other laundry outside or in a designated, well-ventilated room.' That supports 'without ventilation it can cause damp and mould' and the ventilate advice. Non-blocking, for cm-lifehacks and the safety reviewer: the guideline is stricter than the card; its prevention list also says 'Do not dry laundry in the interior.' Builder (non-blocking): replace 'Source owed' in the source field with this citation. |

The same text is in each claim's note in src/demos/*/drying-room-water-load/meta.json.
