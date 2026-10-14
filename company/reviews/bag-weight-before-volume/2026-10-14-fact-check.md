# Fact-check: bag-weight-before-volume (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/bag-weight-before-volume v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt in home-lessons.ts spec.recall; not rendered anywhere (only meta.json recall reaches the Feed). A yes/no question with no false presupposition; the model (mass sums, empty space subtracts nothing) answers it. Convention. Owner may withdraw it as unrendered. |

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 6 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Matches home-models weight-limit (B value max(0,p+2-5)) and the fixed "10 of 20" amount row; mass row b = p+2. |
| c4 | verified | 2 + 4 = 6 kg; max(0, 6 - 5) = 1 kg over; stage B reads "1 kg · over" at the initial 4 kg. |
| recall | verified | True as worded: fullness alone fixes no mass, only the masses decide; the limit is stipulated. Advisory to cm-lifehacks (pedagogy, not fact): naming pillows gives a sensible reason to skip weighing that bag. |
| c6 | verified | Stipulated example; the amount row is the literal "10 of 20" at every slider load 2-7 kg (checked at every 0.1 step) and does not enter the result. |
| c7 | verified | 2 + 4 = 6 kg, 1 kg over 5 kg; Total mass row reads 6 kg at p = 4. |
| seen | verified | Re-run at all 51 slider values (exact and float-accumulated steps): reveal equals table on every one; at 4 kg exactly this text. Below 3 kg B reads "0 kg (within limit)", above it the overload with "over". scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 6 verified, 0 disputed, 0 held (unverified).
