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
