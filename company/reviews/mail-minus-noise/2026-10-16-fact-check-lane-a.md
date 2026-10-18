# Fact-check (lane A, publish-blocking claims): mail-minus-noise

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| recall | unverified | HELD. support.google.com still refused. The recall asks 'Which Gmail search fits?' and its why states Gmail's operators (minus, OR, space); the lesson's fixture (studyModels.ts line 106) implements only the exclusion, not OR, so the fixture cannot carry it. Needs Gmail Help 7190 opened from a web-capable host, or a reword to the fixture: question 'You want messages about 'budget' but not the weekly digest. In this lesson's matcher, which query fits?' with the why 'budget -digest keeps budget messages that lack 'digest'.' (the OR and space options then need replacing with fixture operations). |

The same text is in each claim's note in src/demos/*/mail-minus-noise/meta.json.
