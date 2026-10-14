# Fact-check: circle-tray-square-corners

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt, no assertion; implied answer (arrangement, e.g. staggered rows) matches the rendered limit. HomeSpec.recall is not rendered; could be withdrawn. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 5 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Accurate scope statement: the model is floor(W/10)² for a square grid. |
| c4 | disputed | Disputed. Outside the square grid, 5 discs of 10 cm fit a 28 cm tray (four in the corners plus one in the centre: centre spacing 18/√2 = 12.7 cm ≥ 10; this works for any side ≥ 10(1+√2) = 24.1 cm). The new question dropped the old "in this grid", so "how many 10 cm discs fit" keyed "4" is false as asked, and the distractor holds the true count (with a wrong reason). Fix (cm-lifehacks wording, demo-builder applies): put the grid in the question, e.g. "how many 10 cm discs fit in this square grid once each is turned 45°?". Rotation-changes-nothing (c1) stands. |
| recall | verified | 32 ÷ 10 → 3 per row, 9 in the stated square grid either way; 32 ÷ 8 = 4 → 16. |
| c6 | verified | floor(28/10) = 2 per row, 2 × 2 = 4 in both modes; true as a grid count. |
| seen | disputed | Disputed. Numbers match the table at every side 22-34, but the row label "Discs that fit" makes the grid count a fit claim: at 25-29 cm 5 discs fit (grid shows 4), and at 34 cm about 10 fit (grid shows 9). Fix: resultLabel "Discs in the grid" (or keep the model's "Grid count"); then this verifies. |

**Result:** 3 verified, 2 disputed, 0 held (unverified).

**Fix needed (blocks publishing):** c4 and .seen. Put the square grid back in the question ("…fit in this square grid once each is turned 45°?") and relabel the result row "Discs in the grid" (or "Grid count"). Wording: cm-lifehacks; applying it: demo-builder. Then a fact-checker re-checks c4 and .seen.
