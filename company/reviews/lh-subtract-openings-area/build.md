# Build note: lh-subtract-openings-area

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** At Width=1 m the 2 m-wide opening was drawn wider than the panel.
- **Fix:** `variable.min` goes from 1 to 3 in resource-specs.json. Start 4, max 8 and the recall at 7 are unchanged. The c2 text is unchanged and its source notes the range.
- **Recall check:** Recall (Width 7, B=21 m²) agrees. The session 2 resource recall patch may still replace it.
- **Claims:** c2 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
