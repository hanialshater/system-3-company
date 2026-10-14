# Fact-check: apply-not-quote

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | 3 < 8 < 12, so '3, 8, 12' (index 2) is the only ascending option; the why matches the rendered principle. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 3 claims in meta.json that the migration reset or added (meta version 3).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Attempt [2,0,1] over words 2,5,9 reads 9, 2, 5; positions vs 2, 5, 9 all differ: 0 of 3. Re-run in a copy of reconstructionMatches. |
| recall | verified | 0.125 < 0.25 < 0.5; the third option equals the given order 0.25, 0.5, 0.125. |
| seen | verified | Numbers re-run over every prediction and every Yours state; 0 mismatches between table and reveal. The column order in this text is one path: the reveal quotes optionToMode[prediction] first, so some learners read the same two sentences in the other order, and a Yours sentence is appended when the learner moved the stage to a third state (its numbers match the Yours column). The keyed prediction (0) reads "Rule: ascending: match 0/3." first. Yours reachable: 3/3, 1/3. |

**Result:** 3 verified, 0 disputed, 0 held (unverified).
