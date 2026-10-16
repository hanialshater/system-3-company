# Build note: drying-room-water-load

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10 (r3 dispatch D1): slider `min` 1 → 2, so "1 shirts" never renders. revealLine, c3 and the p = 12 sentence unchanged; no claim reset. c6 waits on the steward (W-1346), not this batch.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Pre-flight v2

2026-10-14, demo-builder. Board W-361(a).

- **Problem (safety second read, company/reviews/drying-room-water-load/2026-10-14-safety.md):** the reveal's ventilation line "Dry indoors with a window open or a vent on: the water ends up in the room." contradicts itself. With a window open, the water leaves the room.
- **Change:** the `warning` in `src/lib/lifehacks/home-lessons.ts` is now the reviewer's first proposed wording, verbatim: "Dry indoors with a window open or a vent on: the water you dry goes into the room's air, and without ventilation it can cause damp and mould." Claim c6 has the same text.
- **Claims:** c6 is unverified (advice claim, source still owed, fact-checker). c1 to c4 keep their fact-checker verdicts because their text did not change. c5 was already unverified. Version 1 → 2.
- **Still open, not mine:** (1) The reviewer wrote this wording, so a reader outside lifehacks-safety-reviewer must approve it (W-361(c), suggested evaluation-steward). (2) `recall.why` still has the "do not infer mould or health outcomes" phrase, which waits on the session 2 recall patch. (3) International should check the region flag: opening a window may not help in humid or air-conditioned climates.
- **Not done:** no build and no QA. The line renders in the reveal only (HomeLesson.tsx), and I did not screenshot the reveal.

## Pre-flight note (W-383, version unchanged)

2026-10-14, demo-builder. From FC LH-2 Pass LH-2. The unrendered c5 transfer prompt is deleted (`.recall` replaces it). Nothing a learner sees changed, so the version stays 2.

## Revision v3 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 3 of 3 (TP-8).
- Start count 4 → 12 (max 16) so 12 × 250 g = 3,000 g. Every shirt drawn; A highlights one. Hook condensed from the question (the plan's question is over 90 characters). Safety warning unchanged.
- First reveal sentence at the start: "One shirt: 250 g. Whole load: 12 shirts, 3,000 g into the room."
- Claims: all reset to unverified (new: lifehacks.drying-room-water-load.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Formula: '30m³ room shown only as context' dropped (FC52 c3 dispute). Reset: c3 (text = new formula). c6 untouched (held, health line).
- NOT applied: the singular 'Whole load: 1 shirt' at 1 shirt. revealLine '{amountB0} shirts' has no plural support in engine-v2.ts; fixing it without changing the p=12 sentence needs a shared-engine change (a plural token), which this batch does not make. Rewording the revealLine would change the seen claim. Left as is; routed in the B4 report.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
