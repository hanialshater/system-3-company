# Fact-check: laundry-gap-air-path (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | VERIFIED. 5 × 8 = 40 cm of shirts; gap = (rail − 40)/4, so it falls with the rail at fixed shirts (node 45-80 cm: 1.25-10 cm); pushed together gives 0 cm. Matches the stage at every value. |
| c3 | verified | VERIFIED. Formula = spec; model 'gaps' value = max(0,(p − 5×8)/(5−1)), channels = 4 only when the gap > 0 (home-models.ts). Node: 60 → 5 cm, 48 → 2 cm. |
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 1 = spec. Node: (60 − 40)/4 = 5 cm (the premise), (48 − 40)/4 = 2 cm (the key). '5 cm: same five shirts' and 'None: they touch' are wrong in the model. Key unique. |
| seen | verified | VERIFIED. homeRevealLine at start 48 = 'Spread evenly: five 8 cm shirts use 40 cm of the 48 cm rail. The 8 cm left is shared by 4 gaps: 2 cm each. Pushed together: 0 cm between neighbours, so no gap is open.' exactly. |
