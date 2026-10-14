# Build note: apply-not-quote

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "The target uses new values" was false (it is the same 2, 5, 9), and R&K 2006 did not support the sentence.
- **Fix:** The principle and c2 now say "The target is 2, 5, 9 in ascending order, smallest to largest. Matching it requires applying it to the numbers shown." The c2 source is now the exercise fixture and the study.test.mjs fixture.
- **Recall check:** Recall (3, 8, 12) agrees.
- **Claims:** c2 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
