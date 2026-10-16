# Fact-check: tote-balance-sides (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | VERIFIED (derivation). Centre of mass of m kg at −20 cm and 1 kg at +20 cm = (−20m + 20)/(m + 1): −10 cm (m = 3), −13.3 cm (m = 5), 0 for m = 1; with (m + 1)/2 kg each side it is 0 (node; stage at 1, 3, 5). A freely hanging body rests with its centre of mass below the suspension point, so the unbalanced bag tilts and the balanced one hangs straight; total mass unchanged. Holds at every slider value. |
| caption | verified | VERIFIED (convention). HomeLesson.tsx caption(): view 'mechanics' → 'Model; no safe load limit', drawn in the picture. It is a scope statement, true of the model (nothing in evaluateHome 'balance' computes a load limit); it gives no instruction or number, so it needs no outside source. The W-1094 safety re-look is lifehacks-safety-reviewer's, not settled here. Advisory (cm-lifehacks): 'no safe load limit' can be misread as 'no load is safe'; 'Model only; gives no safe load limit' reads unambiguously. |

## Notes

- caption advisory (cm-lifehacks, non-blocking): 'Model; no safe load limit' can be read as 'no load is safe'.
- The caption is a scope statement, not an instruction, so no outside source is needed. The W-1094 safety re-look belongs to lifehacks-safety-reviewer.
