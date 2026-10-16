# Build note: breeze-is-not-extra-surface

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title, hook, options replaced (1A, FC52 c4 dispute); key 'Yes: moving air carries the damp away' (index 1). Recall question, options and why reworded (no 'flux'). OpenStax §14.6 added to spec source and c4 source.
- Reset: c4, recall.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).

## Revision v2 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 2 of 3 (TP-8).
- [N]=2 from the model's illustrative breeze setting; the correct option 'about 2× sooner' rests on an arbitrary parameter, which the limit states (fact-checker should weigh it). Idea and limit rewritten without 'flux'. Breeze lines drawn in B only. Recall why still says 'flux' (flagged).
- First reveal sentence at the start: "Still air: 1 m² of cloth open, drying speed 1. Breeze: the same 1 m², speed 2: 2× sooner, with no extra cloth open."
- Claims: all reset to unverified (new: lifehacks.breeze-is-not-extra-surface.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.
