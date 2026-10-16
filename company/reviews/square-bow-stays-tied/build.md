# Build note: square-bow-stays-tied

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- idea (rendered by the bow reveal as spec.idea, so c1 is that field) and question reworded without shoe-relative directions. Reset: c1, c4. c3 source note corrected to the 25-step numbers (0 mm, 12.5 mm); c3 text unchanged, status kept verified.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- Reveal idea (home-lessons.ts): 'Opposing knot stages make the balanced reef bow lie flat; the granny bow twists out of line. Impact and moving lace ends can work a bow loose.' Recall question and why now say 'twists out of line' / 'lie flat' instead of 'along / across the shoe'. Source now leads with Daily-Diamond et al. 2017 (PMC5415684). Residual for the checker: the shared BowStage picture (src/components/lifehacks/HomeLesson.tsx) still draws the matching bow rotated 90°, i.e. as turned on the shoe; I did not change the shared component.
- Claims reset to unverified: c1, recall. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 64 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.

## Revision v2 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 2 of 3 (TP-8).
- Both bows drawn from the start (twisted left, flat right); one Walk 25 steps button plus a steps slider; the twisted bow's loops run out at 25 steps. 'loss=…mm/step' and 'Model steps=' removed; the reveal prints no verdict of its own and says how to read your own bow. Walk length 20 → 25 changes the formula claim.
- First reveal sentence at the start: "After 25 steps: the twisted bow's loops are undone (0 mm), the flat bow's 12.5 mm."
- Claims: all reset to unverified (new: lifehacks.square-bow-stays-tied.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.
