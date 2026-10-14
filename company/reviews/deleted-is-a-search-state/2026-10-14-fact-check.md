# Fact-check: deleted-is-a-search-state (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/deleted-is-a-search-state v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| recall | unverified | Rests on Google Drive Help 2375114 (trash and search state, retention rules), which could not be opened from this host (DNS failure, proxy 403). Left unverified, as in LH-3A. |

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 4 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Fixture notes deleted: true; active-only step drops it (Matches 2, Not in results 1). |
| c2 | verified | First two sentences are the fixture (B: 3 matches). "Real products keep deleted files for different lengths of time": the Google Drive page is still not openable, but two opened product docs support it: nextcloud/server config.sample.php (trashbin_retention_obligation: default keeps trash at least 30 days, configurable D1/D2 days or disabled = kept forever) and owncloud/core config.sample.php (default up to 30 days, configurable), both via GitHub raw. Demo-builder: add these to the source field. |
| recall | verified | Hedged and logical given deletion; "within the product's own retention rules" is supported by the same two opened docs. Narrowing cannot add results by definition. Drive Help itself remains unopened. |
| seen | verified | Re-run for predictions 0-2: identical on every path. scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 4 verified, 0 disputed, 0 held (unverified).

**Source field:** c2 and .recall now rest on opened Nextcloud and ownCloud docs (GitHub raw), not the unopened Drive Help page. Demo-builder should add them to the source fields.
