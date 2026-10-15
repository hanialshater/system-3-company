# Build note: note-gap-check

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/note-gap-check/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **TP-3.** The note (room B4, day Friday, code 627) shows at the prediction and is covered after it. The rebuild row starts empty. Each box cycles through fixed choices; the code's are digit swaps (672, 627, 267), the field a learner tends to get wrong. Pressing each box once gives 2 of 3 with the code missed (disclosed in c4). "Remove field" is gone: it removed nothing a learner could notice (r11 finding 2).
- The readout "Note looks 3/3 filled" stands for reading the complete-looking note.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c3 reset; c4 new. c2 and recall unchanged and verified. The principle still says "local completeness check", which r11 called system words; changing it would reset c2, so I left it for cm.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "Find the missing note" / "Cover it and rebuild its three fields: how many do you expect to get?" The title says something is missing, which points at "Can't tell"; the title is cm content and the plan does not rename it.
2. **Options:** "Can't tell until you try", "All 3: it's all there". Same precision.
3. **Locked stage:** the note with all three values, empty rebuild boxes, "Note looks 3/3 filled · Rebuilt ?".
4. **Reveal values:** "3/3 filled" is the fixture's note. "Rebuilt n of 3" and the named miss are computed from the learner's boxes at Check (milestone 2).
5. **QA path:** room, day, code, Check. Both milestones reached; marks and the uncovered note visible at the reveal.
6. **Reset:** none; boxes lock at Check. QA-path reveal: "The note showed all three fields filled. Rebuilt: 2 of 3 right; code: 627, not 672."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 38 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.
