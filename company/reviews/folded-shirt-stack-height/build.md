# Build note: folded-shirt-stack-height

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The predict options (One fold / Two folds / Same outcome) did not answer "What changes when you halve the footprint again?".
- **Fix:** Question is now "Which fold count gives the taller stack of the same shirts?" (key Two folds, unchanged). I left the hook as a teaser; cm-lifehacks may want it aligned.
- **Recall check:** Recall (2 → 4 layers, 4 → 8 cm) agrees.
- **Claims:** c4 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.

## Revision v3 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 1 of 3 (TP-8).
- Start count 6 → 5 so [h]=4 cm (case 'layers'). Stack drawn to scale, half footprint in B. Title 'Half the footprint, twice the stack' states the answer and the plan did not rename it (listed for cm-lifehacks).
- First reveal sentence at the start: "Folded once: 2 layers per shirt, stack 4 cm. Folded twice: 4 layers, stack 8 cm: half the footprint, 2 times the height."
- Claims: all reset to unverified (new: lifehacks.folded-shirt-stack-height.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
