# Fact-check: keep-the-error-feedback (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c3 | verified | VERIFIED. RetrievalLesson.tsx FeedbackStage read: caption and feedback line read the latest try (st.tried); the chips now say 'Try 3, count only' → '3 tries' and 'Try 3, marked' → '1 wrong', computed from the stipulated try 3 (r.attempt), so the label and the value agree after any retry (clears FC 61 W-1345). Reveal = feedbackObservation + principle; neither names a productivity or memory benefit. |
| c4 | verified | VERIFIED. Fixture: code 4·9·2, attempt [0,0,0] → 4·7·2, tries 3; choices (4,1,6; 7,9,1; 2,5,8) cycle by nextChoice; markAttempt marks digit 2 wrong, 1 and 3 right; the lock opens only when every digit equals the code. Status '3 tries · still locked'. Reveal: '“3 tries, still locked” did not say which digit was wrong. The marks did: digit 2 (7) wrong, the rest right.' Chips as quoted. All as stated. |
