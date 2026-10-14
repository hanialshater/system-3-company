# Fact-check: cue-needs-a-boundary

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 4 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Capitals checked in two opened datasets: geonamescache 3.0.2 (PyPI, GeoNames countries.json: JP Tokyo, KE Nairobi, PE Lima) and mledoze/countries countries.json (GitHub raw: same three). Count 3 is the fixture. Source field still says "any atlas"; demo-builder may name these. |
| c2 | verified | Fixture: one note per country; candidates a = 3, b = 1. |
| recall | verified | Stipulated notes on three rivers; only a cue naming its river picks one. Convention. |
| seen | disputed | Disputed. The numbers are what the engine computes, but the sentence a learner reads, "Kenya's capital?: answers this cue fits 1; match 0/3.", pins a 0/3 failure on the specific cue. The 0/3 is the fixed wrong attempt (Lima, Tokyo, Nairobi), which is the same in both modes and has nothing to do with the cue; mode A just shows "not checked". On stage this contradicts c2. Fix: W-610 (files family), or drop the Match row for lessons that declare candidates. |

**Result:** 3 verified, 1 disputed, 0 held (unverified).

**Fix needed (blocks publishing):** .seen. The Match row under "Kenya's capital?" reads 0/3 because the fixed attempt is wrong, which makes the stage look as if the specific cue fails. Either W-610 (files family, which shows 3 vs 1 directly) or drop the Match row for recall lessons that declare `candidates`. Owner: interaction-designer (W-610), then demo-builder.
