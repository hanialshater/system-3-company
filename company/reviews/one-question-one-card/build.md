# Build note: one-question-one-card

## Revision v2 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/one-question-one-card/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **Plan line implemented as written.** The card asks "Capital, currency and language of Peru?". The attempt is the question's own premise (two of three right, Lima · peso · Spanish), so the miss always exists. This lesson is about what a card records, not about retrieval, so TP-3's empty attempt does not apply; the plan's stage fix ("show the compound card hiding the miss, beside three single cards") is what I built.
- Two buttons: "Mark as one card" records a single mark, right. "Split into 3 cards" marks capital ✓, currency ✗ (it is sol), language ✓.
- New factual content (Peru's capital, currency, language): claim c5, support source, **not opened by me** (CIA World Factbook pointer). The fact-checker must open it.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c3 reset; c4 new (stage); c5 new (Peru facts, source not opened). c2 and recall unchanged and verified.

**Version** → 2.

## Pre-flight v2
1. **Title and hook:** "One question per card" / "You answer two of three and mark it right. What did the card record?" The title leans toward single cards; cm did not rename it.
2. **Options:** "That you know all three", "A pass that hides a miss". Same precision.
3. **Locked stage:** the compound card with the three given answers. No mark is drawn until a button is pressed.
4. **Reveal values:** both sentences come from the fixture, shown only after their milestones ("one", "split"); each says "You did not …" if its button was not pressed.
5. **QA path:** Mark as one card, Split into 3 cards. Both milestones; the split cards and both readouts are on screen at the reveal.
6. **Reset:** none. QA-path reveal: "As one card, the record is a single “right”: the missed currency left no trace. As three cards, the currency card is marked wrong (peso, not sol)."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 56 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
