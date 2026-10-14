# Build note: rolled-or-folded-volume

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The slider said "12shirts" while the model is a 30×20×0.2 cm sheet.
- **Fix:** Slider unit is now " sheets" and label "Sheets" (home-lessons.ts). c3 adds one sentence saying the slider counts ideal sheets, one per shirt.
- **Recall check:** Recall (where the saving came from) has no unit and still agrees.
- **Claims:** c3 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
