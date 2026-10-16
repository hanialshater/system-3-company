# Build note: separate-confusable-pairs

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/separate-confusable-pairs/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **TP-3, the confusable case is tested.** Two cables (K-417, grey, 2 m; K-471, grey, 5 m) show at the prediction, with the caption "your notes say only 'grey cable'". After the prediction the codes are covered. Row 1 asks for the code from the cue "grey cable", which fits both codes; the 5 m one was meant, so a pick is a guess (shown after the check: "this cue fits 2 codes"). Row 2 asks from "grey, 5 m", which fits one code. Choices include K-714, a digit swap.
- **Miscount fixed.** There are now exactly two codes, and the principle no longer says "the last digit" (417 and 471 differ in two digits). The new principle is claim c2.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c2 rewritten (miscount fix); c3 reset; c4 new. recall unchanged and verified.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "Separate similar pairs" / "Asked for the grey cable's code, how often do you pick the right one?" The title hints that the pairs need separating; cm did not rename it.
2. **Options:** "Always: I learned it", "About half the time". Same precision.
3. **Locked stage:** two cables with their codes and lengths, two empty rows. The "fits" counts appear only after each check.
4. **Reveal values:** each row's pick and its "fits" note come from the learner's box at that row's Check (milestones 1 and 2).
5. **QA path:** grey cable, Check, grey 5 m, Check. Both milestones; both marks and the uncovered codes are visible.
6. **Reset:** none. QA-path reveal: "Cue 'grey cable': K-417, but K-471 was meant (this cue fits 2 codes). Cue 'grey, 5 m': right, K-471 (this cue fits 1 code)."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 63 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
