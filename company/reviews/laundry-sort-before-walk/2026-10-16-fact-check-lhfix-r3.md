# Fact-check: laundry-sort-before-walk (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | VERIFIED. Model 'trips': travel = 2 × 8 × trips; one batch = 16 m regardless of count (node 4-12 items: 64-192 m vs 16 m). The unlimited-capacity assumption is stated; the limit line names capacity. |
| c3 | verified | VERIFIED. Formula = spec, values [8]: 2 × 8 = 16 m per round trip; 16 × count, or 16 for one batch. Command: node -e "console.log(10*2*8, 2*8*1)" → 160 16. |
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 2 = spec. Ten one-item round trips to a machine 8 m away: 10 × 2 × 8 = 160 m (node -e "console.log(10*2*8)" → 160). 16 m is one round trip, 80 m is one-way only. Key unique. |
| seen | verified | VERIFIED. homeRevealLine at start 10 = 'One-item trips: trips 10; travel 160 m. Grouped trip: trips 1; travel 16 m.' exactly. |
