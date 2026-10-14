# Fact-check: buffer-for-a-late-finish

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 3 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | With the event applied (draft 0-25): A call 20-35 overlaps 5 min; B call 25-40, notes 45-55, 0 min. Only "Gap, call at 25" has no clash. Stipulated data. |
| c4 | verified | Union-overlap and pair re-run in my copy of calendarResult/calendarClashes: 5 min (draft × call) vs 0 min. |
| seen | verified | Numbers re-run over every prediction and every Yours state; 0 mismatches between table and reveal. The column order in this text is one path: the reveal quotes optionToMode[prediction] first, so some learners read the same two sentences in the other order, and a Yours sentence is appended when the learner moved the stage to a third state (its numbers match the Yours column). Keyed prediction (2) reads the "5-min gap" sentence first. Note: "Gap before call" is the planned gap (ignores the overrun), so a Yours layout can read "gap 1 min; overlap 4 min", which is true but worth a look by interaction-designer. |

**Result:** 3 verified, 0 disputed, 0 held (unverified).
