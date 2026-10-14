# Build note: fragmented-time-does-not-fit

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "Three gaps total thirty minutes" contradicted the calendar, which has two 10-minute gaps before minute 40.
- **Fix:** The FC sentence is 110 characters, and the hook bound in study.test.mjs is 90. I did not loosen the fixture. Instead the hook and c1 say the same thing in 84 characters: "Two ten-minute gaps before minute 40. A thirty-minute task needs one continuous gap." The predict distractor "Any three 10-minute gaps" is unchanged, because the FC note about the recall distractor is moot after the recall patch.
- **Recall check:** Recall (gaps 20, 15, 25; 40-minute task) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
