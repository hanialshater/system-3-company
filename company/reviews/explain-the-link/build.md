# Build note: explain-the-link

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/explain-the-link/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **TP-3 with an unfamiliar chain.** Three made-up gears (tav turns bix, bix turns rell) show at the prediction with arrows. After it, the links are covered and the words stay listed A to Z (bix, rell, tav), which is the question's "you can list them". The learner answers "What turns rell?" and "What turns bix?" from memory. Common sense cannot give the order.
- The readout "Words listed 3/3" stands for the word list; "Links n/2" is the learner's result. Pressing each box once gives 1 of 2 (c4).
- The old principle described cloud, rain, puddle, which is no longer on the stage; the new one (c2) names the gears and points back to the question's example.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c2 rewritten; c3 reset; c4 new. recall unchanged and verified.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "Remember the links" / "Asked 'why is there a puddle?', can you answer?" The title leans toward the links option; cm did not rename it.
2. **Options:** "Only if you learned the links", "Yes: I know the words". Same precision.
3. **Locked stage:** the gear chain with its arrows, two empty link boxes, "Words listed 3/3 · Links ?".
4. **Reveal values:** "3/3 listed" is constant (the words stay on screen). "Links n of 2" and the miss are computed at Check (milestone 2).
5. **QA path:** both boxes, Check. Both milestones; the uncovered chain and the marks are on screen.
6. **Reset:** none. QA-path reveal: "You could list all three words. Links: 1 of 2 right; What turns rell? bix, not tav."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 58 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.
