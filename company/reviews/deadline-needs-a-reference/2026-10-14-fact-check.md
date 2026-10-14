# Fact-check: deadline-needs-a-reference

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 6 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 15:00 at UTC+9 = 06:00 UTC (node Date.parse "2026-10-16T15:00:00+09:00" → 06:00Z); 9 h before 15:00 UTC. |
| c2 | verified | Same arithmetic; a zone-less reader on UTC+9 aims 9 h early. DST disclaimer accurate. |
| recall | verified | On Fri 16 Oct 2026, London is UTC+1 (BST until 25 Oct) and Tokyo UTC+9 (tzdata 2026e from PyPI wheel and the system zoneinfo): 17:00 local = 16:00Z vs 08:00Z, different moments; 17:00 UTC is one moment. |
| c4 | verified | 15:00 - 9 h = 06:00 UTC; matches the consequence cell. |
| c5 | verified | Friday, by four independent computations: JS Date (UTC), Zeller's congruence, a day count from Sat 1 Jan 2000 (9,785 days, 9785 mod 7 = 6 → Friday), and GNU date / Python datetime. 14 Oct 2026 is a Wednesday, so the patch's fix is right. Derived from the Gregorian calendar, no outside source needed. |
| seen | verified | Re-run for predictions 0-2: identical on every path; A shows Date 16 Oct, Time 15:00, Zone missing (aFields 2). scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 6 verified, 0 disputed, 0 held (unverified).
