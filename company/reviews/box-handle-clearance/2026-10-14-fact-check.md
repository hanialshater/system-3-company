# Fact-check: box-handle-clearance (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first: src/components/lifehacks/HomeLesson.tsx (Stage, both layout buttons, slider, inputs line, readout, caption, reveal) and src/lib/lifehacks/home-models.ts (evaluateHome case for this model, plus homeCordScene for cord lessons), with the spec in src/lib/lifehacks/home-lessons.ts; then meta.json claims and the recall card (rendered by src/components/Feed.tsx from meta.recall), then source fields. This engine path has no Reset control and no animation, so reduced motion changes nothing. Note: spec.recall (the c5 transfer prompts) is not rendered by HomeLesson or Feed; I checked it as a convention whose presupposition must hold.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Convention: transfer question (spec.recall), not rendered on the card. Its presupposition, that a box's width for a fit test should include more than the body, is what the engine shows: case 'clearance' tests opening − (40 + 2×3) cm with 'Include handles' against opening − 40 with 'Body only'. |

**Result:** the one open claim verified. No disputes.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 3 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | 40 + 2 × 3 = 46 cm > 42 cm; clearance 42 - 46 = -4 cm. The v2 drawing shows both handles at predict on one 4 px/cm scale, so "as drawn" holds. |
| c6 | verified | A 42 - 40 = +2 (fits), B 42 - 46 = -4 (too wide); re-run in a copy of the clearance model and the verdict rule. |
| seen | verified | Re-run at all 15 openings 38-52: reveal equals table; exact fit shown at 40 (A) and 46 (B); the drawing's dimension text uses the same 40/46 cm and the "<p> cm opening" label. scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 3 verified, 0 disputed, 0 held (unverified).
