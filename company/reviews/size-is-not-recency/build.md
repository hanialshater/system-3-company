# Build note: size-is-not-recency

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The day-number direction was never stated ("90MB d1"), and the Drive help citation was off-topic.
- **Fix:** The FileStage caption for this slug is now "d = day modified; higher = more recent", and c1 records it. The c4 source is now the fixture and the fileResult sort derivation, with Drive help removed. The c4 text is unchanged.
- **Recall check:** Recall (date modified, newest first) agrees.
- **Claims:** c1, c4 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
