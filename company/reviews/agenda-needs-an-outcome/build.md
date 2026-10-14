# Build note: agenda-needs-an-outcome

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The hook said "Three discussion topics", but the stage shows one topic.
- **Fix:** Hook (studyCatalog.ts and meta.json) and c1 now say "A topic alone does not name the decision needed."
- **Recall check:** Recall (Ravi picks option A or B) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.

## Revision v3 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 6 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c1, recall, c4, seen. New: lifehacks.agenda-needs-an-outcome.seen (the engine's first reveal sentence). Nothing marked verified.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 58 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).
