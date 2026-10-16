# Fact-check: jacket-last-first (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 0 = spec. Model at 3 items: in use order the jacket is under 2, reversed under 0 (N − 1 vs 0, node, 3-7 items). Top-opening bag is last in, first out, so the shoes (needed last) go in first. Key unique. |
