# Fact-check: fitted-sheet-corners-nest (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 1 = spec. Model 'nest' at 4 corners, 8 cm depth, 2 cm per layer: apart 4 × 8 = 32 cm, nested 8 + 3 × 2 = 14 cm, 32 − 14 = 18 (node); reveal 'Corners apart: four 8 cm corners stacked, 32 cm thick. Corners nested: tucked inside each other, 14 cm: 18 cm flatter.' Key unique in the model. |
| c5 | verified | VERIFIED. Transfer prompt = spec.recall. Its premise holds in the lesson's model: nesting reduces folded thickness 32 → 14 cm with the same four corners of cloth (no material removed). 'Envelope' is gone. |
