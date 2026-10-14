# Fact-check: check-confidence-with-output

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 4 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Before the check, mode A reads "not checked": no place is known; stipulated fixture. |
| recall | held (unverified) | Held. "One attempt does not predict later recall" is an empirical claim marked convention, and no openable source supports it (Roediger & Karpicke 2006 is not openable here and is about retention, not prediction). It overstates the verified c2 boundary. Suggested fix (cm-lifehacks): "One check cannot tell you how well you will remember it later, but it does show which step to fix." |
| c4 | verified | Attempt [2,0,1] = route, map, key vs map, key, route: 0 of 3 positions match. |
| seen | verified | Numbers re-run over every prediction and every Yours state; 0 mismatches between table and reveal. The column order in this text is one path: the reveal quotes optionToMode[prediction] first, so some learners read the same two sentences in the other order, and a Yours sentence is appended when the learner moved the stage to a third state (its numbers match the Yours column). Keyed prediction (1) reads "Check it: match 0/3." first. Yours reachable: 3/3, 1/3. |

**Result:** 3 verified, 0 disputed, 1 held (unverified).

**Held:** .recall. It needs a reworded "why" with no empirical prediction claim (suggestion in the claim note), or an openable source. Owner: cm-lifehacks.
