# Fact-check: coiled-cord-bend-radius

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/coiled-cord-bend-radius), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | Re-checked against the new drawing (LH-1 saw the old box). κ = 1/r. Turns drawn × 2πr = 200 cm at every slider value, both states (0 mismatches). |
| c2 | verified | The caption and reveal limit are shown. r=Ncm is the model input, not a product limit. |
| c3 | verified | value = 1/r and comparison radius = 2r. Turns rendered: r=10 gives 3.18, r=20 gives 1.59, r=40 gives 0.8, matching 200/(2πr). Drawn radius = r×95/40. |
| c4 | verified | Key "Double radius" halves the curvature. |
| c5 | unverified (held) | Not rendered and superseded by .recall. **Builder deletes it.** |
| recall | verified | (1/15)/(1/30) = 2, so the key "It doubles" is right. |

Drawing note: at r=5 the coil is small (about 12 px), as the builder said. Pedagogy is not my call.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 3 claims in meta.json that the migration reset or added (meta version 3).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Curvature 1/(2r) = (1/r)/2 at every r; stage B is always half of A. |
| c6 | verified | 2π·10 = 62.8 cm, 4π·10 = 126 cm; 200/62.83 = 3.18, 200/125.66 = 1.59; 1/10 = 0.100, 1/20 = 0.050 per cm. The engine uses π = 3.14159, which changes no shown digit. |
| seen | verified | Re-run at all 31 radii 5-20: reveal equals table; sharper/gentler labels hold everywhere (B always half of A). scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 3 verified, 0 disputed, 0 held (unverified).
