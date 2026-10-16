# Build note: check-confidence-with-output

## Revision v3 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/check-confidence-with-output/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **Studied order covered until B (plan, r11).** The spec now sets `hideTarget: true`, so the studied order shows "?" at the prediction and in mode A, and appears only in mode B. No text changed, so no claim was reset; the version is bumped because the stage changed.
- **Still open, cm content:** the hook ("You studied map, key, route and feel sure of the order.") lists the studied order, so a reader can still see 0 of 3 before choosing. Routed to cm-lifehacks.
- Still open (not in the plan line): after B is pressed, the swaps in "Yours" happen with the order visible (r11 finding 3).

**Claims** (none marked verified by me): none reset (no text changed).

**Version** → 3.

## Pre-flight v3
1. **Title and hook:** unchanged. The hook lists the order (see above).
2. **Options:** unchanged ("All 3 of 3: you feel sure", "Unknown until checked", "At least 2 of 3").
3. **Locked stage:** studied order "? ? ?", attempt route · map · key, Seen table "?".
4. **Reveal values:** unchanged engine-v2 reveal (A and B snapshots, Yours when it differs).
5. **QA path:** A, B, Swap 1↔2, Swap 2↔3. Both milestones.
6. **Reset:** none. QA-path reveal: "Feels familiar: match not checked. Check it: match 0/3. Yours: match 3/3."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 40 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).

## Revision v2 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 10 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c1, recall, c4, seen. New: lifehacks.check-confidence-with-output.seen (the engine's first reveal sentence). Nothing marked verified.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 40 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).

## Fact-check rewording (W-844 (FC38-41), 2026-10-15, demo-builder)

- Recall why: second sentence is now 'This one check is not a forecast of later recall, but it does show which step to fix.'
- Claims reset to unverified: recall. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 40 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
