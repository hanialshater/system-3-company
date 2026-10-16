# Fact-check: square-bow-stays-tied (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED (source). Text = meta title/hook and spec question, options, answer 1; unchanged. Opened Daily-Diamond, Gregg & O'Reilly 2017 (PMC5415684) via the PMC OAI API this pass (XML sha256 1406ded1…747cd): the granny's 'two trefoils have the same handedness, causing the knot to twist instead of laying flat when tightened'; 'As expected, the weak knot failed much faster than the strong knot.' So the twisted (granny) bow comes undone first. Support retype convention → source is right. |

## Sources this pass

- Daily-Diamond, Gregg & O'Reilly 2017, PMC5415684, full text via https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:5415684&metadataPrefix=pmc (sha256 1406ded18e8a85ce73416ad39fc5c38eb72440095860e61fb1c7a15a1ae747cd).
