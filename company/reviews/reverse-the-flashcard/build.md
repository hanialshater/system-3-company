# Build note: reverse-the-flashcard

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/reverse-the-flashcard/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **TP-3, both directions on stage.** The cards (dax → red, wug → blue, zib → green) show at the prediction and are fully covered after it. Row 1 tests word → meaning (choices are the three colours). Row 2 tests meaning → word, with look-alike spellings among the choices (dux, wog, zeb). The card stays covered until both rows are checked, so checking row 1 does not give row 2 away.
- **One direction fails (plan).** Pressing each box once gives word → meaning 3 of 3 and meaning → word 1 of 3 (disclosed in c4). A learner who remembers the spellings can pass both; the reveal then says only testing each direction showed it.
- I kept nonsense words on the stage (r11 liked them: no prior knowledge leaks in). The question uses perro/dog as the everyday case.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c3 reset; c4 new. c2 and recall unchanged and verified.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "Test the other direction" / "Shown 'dog', can you give 'perro'?" The title suggests testing the reverse, which leans toward "Not tested yet"; cm did not rename it.
2. **Options:** "Not tested yet", "Yes: same card". Same precision.
3. **Locked stage:** the three studied cards, two empty answer rows, two "?" readouts.
4. **Reveal values:** each row's score and misses are computed from the learner's boxes at that row's Check (milestones 1 and 2).
5. **QA path:** zib, dax, wug, Check, red, blue, green, Check. Both milestones; marks and the uncovered card visible at the reveal.
6. **Reset:** none; rows lock at Check. QA-path reveal: "Word → meaning: 3 of 3 right. Meaning → word: 1 of 3 right; red: dax, not dux; green: zib, not zeb."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 45 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.
