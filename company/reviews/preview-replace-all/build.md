# Build note: preview-replace-all

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The preview reveal said "The highlighted position is 1", but both red tokens (positions 1 and 3) are highlighted.
- **Fix:** `observation()` in StudyLesson.tsx has a branch for this slug at step 1: "The preview marks 2 exact matches, at positions 1 and 3; previewing did not rewrite the tokens." c3 now records that sentence.
- **Recall check:** Recall (Dr → Drive, check every match) agrees.
- **Claims:** c3 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
