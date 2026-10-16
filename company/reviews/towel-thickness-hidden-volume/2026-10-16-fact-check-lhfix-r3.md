# Fact-check: towel-thickness-hidden-volume (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | VERIFIED. Face 2 × 50 × 100 = 10,000 cm² at any thickness; cloth 50 × 100 × t/10 cm³ doubles with t; per cm³ = 10,000/(500 t) halves (node at 1, 2, 5 mm: 20/10, 10/5, 4/2). Reveal at start 2 mm: '10,000 cm² … 1,000 cm³, 10 cm² per cm³ … 2,000 cm³, 5 cm² per cm³: half as much.' |
| c2 | verified | VERIFIED. Scope hedge, true: drying also depends on water held, air humidity, temperature and airflow; the model computes no drying time. |
| c3 | verified | VERIFIED. Formula = spec; model 'area-volume' value = 2/(t_cm), the same as 10,000 ÷ (5,000 × t_cm) (node). |
| c5 | verified | VERIFIED. Transfer prompt = spec.recall; a question whose answer in the model is 'half as much' (c1). |
| recall | verified | VERIFIED. meta.recall: 1 mm → 2 mm, options Twice / Same / Half, answer 2. 10,000 cm²; 500 → 1,000 cm³; 20 → 10 cm² per cm³ (node). Key unique; why = claim. |
