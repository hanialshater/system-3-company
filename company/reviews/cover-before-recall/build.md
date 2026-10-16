# Build note: cover-before-recall

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/cover-before-recall/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **TP-3.** The stage is the new retrieval stage (`RetrievalLesson.tsx`, `studyRecall.ts`). The three cards (bell → lake, kite → plum, leaf → door) show at the prediction, because the question's premise is that you looked at them with the answers showing. After the prediction they are covered. The answer boxes start empty and ask the cues in a different order (leaf, bell, kite), so position memory does not help. Each box cycles through three fixed choices with plausible wrong ones (dock, lane, pear, and the other cards' answers). The readout "Answers showing 3/3" stands for the look-only check.
- **One covered miss (plan).** I cannot force a learner to miss without faking it. The choice order is fixed, so pressing each box once (the QA and walkthrough path) gives 2 of 3 with bell → lane. A learner who remembers cycles to the right word. This is disclosed in claim c4.
- **Reveal** names the look-only result and the covered result with the miss, then the unchanged principle (c2).
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten (hook, question, options); c3 reset (new stage rules); c4 new (stage fixture, choice order and reveal sentences). c2 and recall unchanged and still verified.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "Cover before you test" / "Cover the answers: how many can you give?" Neither says whether you can.
2. **Options:** "3: I just saw them", "Can't tell until you try", "0". Two are numbers and the right one is not; it is the only one without a number, which a reviewer may call a tell. cm content, kept.
3. **Locked stage:** the three studied cards, empty answer boxes ("?"), and "Answers showing 3/3 · Covered ?". Nothing marks the right option.
4. **Reveal values:** "3 of 3 with answers showing" is the fixture's look-only readout (constant). "Covered n of 3" and the named miss are computed from the learner's own boxes at Check (milestone 2), and Check locks the boxes.
5. **QA path:** leaf, bell, kite (milestone 1 at the first tap), Check (milestone 2). The marked boxes and the uncovered card stay on screen at the reveal.
6. **Reset:** no Reset control; after Check the boxes are locked, so the reveal cannot go stale. QA-path reveal: "With the answers showing, all three cards read right. Covered: 2 of 3 right; bell: lake, not lane."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 45 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
