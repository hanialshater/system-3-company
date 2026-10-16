# Build note: towel-over-two-bars

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).

## Revision v2 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 2 of 3 (TP-8).
- [x]=0.98 m² from case 'exposed' at 70 cm. New picture: towel folded over one bar with the touching faces hatched, vs draped over two bars with air between.
- First reveal sentence at the start: "One bar: 0.98 m² of face pressed together, 0.98 m² open. Two bars: nothing touching, 1.96 m² open: 0.98 m² more face in the air, from the same towel."
- Claims: all reset to unverified (new: lifehacks.towel-over-two-bars.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.
