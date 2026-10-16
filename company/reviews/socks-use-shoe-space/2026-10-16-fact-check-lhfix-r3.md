# Fact-check: socks-use-shoe-space (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 0 = spec. Model 'hollow' at the start 200 cm³: beside adds 200 (1,000 total), inside adds max(0, 200 − 600) = 0 (800 total). Key 'None' holds for socks up to the 600 cm³ hollow, which the idea states; above 600 the stage shows the overflow (800 → 200 added). |
| picture | verified | VERIFIED. HomeLesson.tsx w3Picture case 'hollow': label drawn only when mode is set (v2Marks gets null while locked and before the first press); A: `${fmt(600)} cm³ empty` = '600 cm³ empty'; B: `${fmt(600 − min(p,600))} cm³ still empty` → 400 at 200, 0 from 600 up (node). |
