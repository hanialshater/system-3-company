# Build note: garment-overlap-hides-face

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and hook replaced (1D). Reset: c4.
- NOT applied: the slider row (TP-2(c), 'slider works in A only'). Hiding the slider breaks the W2 ratchet in tests/lifehacks/home-v2.test.mjs ('keeps its slider'), and making it drive B needs a change to home-models.ts case 'overlap' (B has no overlap by definition). Neither is specified by the patch; routed in the B4 report.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).

## Revision v2 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 3 of 3 (TP-8).
- [x]=1,800 cm² (30 cm × 60 cm overlap at the start). Overlapped patch hatched to scale. The slider changes A only: B has no overlap in this model, so the plan's 'slider must work in both layouts' is not met (listed for cm-lifehacks).
- First reveal sentence at the start: "Overlapping: 1,800 cm² of overlap hides 3,600 cm², one patch on each shirt; 20,400 cm² stays open. Hung apart: nothing hidden, 24,000 cm² open."
- Claims: all reset to unverified (new: lifehacks.garment-overlap-hides-face.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.
