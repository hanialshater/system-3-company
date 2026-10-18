# Fact-check (lane A, publish-blocking claims): mail-exact-phrase

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read the rendering spec (home-lessons.ts, resource-specs.json, studyCatalog.ts) and engine (engine-v2.ts, home-models.ts, studyModels.ts) first; arithmetic by hand and in node. Sources: PMC OAI API (pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/) and api.crossref.org, the only scholarly hosts reachable; body hosts (nhs.uk, gov.uk, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, support.google.com, ginetex.net, ftc.gov, ecfr.gov) refused this pass.

| claim | status | reason / fix |
|---|---|---|
| recall | unverified | HELD. support.google.com and developers.google.com still refused (curl 000; WebFetch DNS). Within the fixture (studyModels.ts line 105, mode 2 matches the quoted string as a substring) only 'I saw a red car' matches, own check. Unblock wording (cm-lifehacks; the studyCatalog question already says 'in this fixture'): why 'In this lesson's matcher, quotes require the words next to each other in that order; only 'red car' as a sequence matches.' |

The same text is in each claim's note in src/demos/*/mail-exact-phrase/meta.json.
