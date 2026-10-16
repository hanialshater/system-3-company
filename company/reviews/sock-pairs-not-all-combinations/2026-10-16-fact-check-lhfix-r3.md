# Fact-check: sock-pairs-not-all-combinations (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | VERIFIED. Node: 6·5/2 = 15 = 5+4+3+2+1; 10·9/2 = 45 = 9+…+1; adding the n-th sock adds n − 1 pairings, so pairings outgrow socks; marked: N/2. Stage (slider 4-10, step 2): 6, 15, 28, 45 vs 2, 3, 4, 5. |
| c2 | verified | VERIFIED. Scope statement consistent with the model (it counts C(N,2), not search steps); 'identical socks pair up any way' is true by definition. |
| c3 | verified | VERIFIED. Formula = spec; model 'combinations' uses N = 2·floor(p/2); slider min 4, max 10, step 2, so N is always even, 4 to 10, as stated. |
| c4 | verified | VERIFIED. Title/hook = meta.json; question, options, answer 1 = spec. 10·9/2 = 45 (node). '25: in step with the socks' = 15 × 10/6 (the linear slip); 90 = ordered pairs 10·9. Key unique. |
| recall | verified | VERIFIED. meta.recall: 'Eight socks … how many possible two-sock pairings … how many matches?' options 8 and 4 / 16 and 4 / 28 and 4, answer 2. 8·7/2 = 28, 8/2 = 4 (node); stage at 8 shows 28 / 4. Key unique; why = claim. |
| seen | verified | VERIFIED. homeRevealLine at start 6 = 'No marks: 6 socks make 15 possible two-sock pairings. Marked partners: 3, one per pair.' exactly. |
