# Fact-check: count-setup-in-the-block

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 5 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Task bar 0-15 (setup 5 + work 10); call at 10 → 5 min of the task remain. Stipulated data. |
| c2 | verified | Same fixture: 5 + 10 = 15; booking 10 leaves 5 min overlapping the call. |
| recall | verified | 10 + 20 = 30 > 25 by 5; 25 - 20 = 5 is the "to spare" slip. |
| c4 | verified | A call 10-25 overlaps task 0-15 by 5 min; B call 15-30, file 30-40: 0 min. |
| seen | verified | Re-run for predictions 0-2 and all Start positions: table and reveal agree. The Yours sentence omits the "Booked for the task" row (the Yours column shows "–" there), so it is consistent. scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 5 verified, 0 disputed, 0 held (unverified).
