# Fact-check: group-cables-with-ends (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED. Title/hook = meta.json (both are questions); question, options, answer 0 = spec. Stage at 3 cords: middle tie 6 loose ends, ends tucked 0 (2 × N, node, 2-8 cords). Key 'Ends tucked' rests on removing the free-end start of a tangle (idea; Raymer & Smith 2007 end-braid model, abstract opened via Crossref this pass: knots form by 'random braid moves of the string end'), not on a probability; unchanged from FC W3. |

## Notes

- The W-1094 safety re-look belongs to lifehacks-safety-reviewer. c4 states no instruction.
