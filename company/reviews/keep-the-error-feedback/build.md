# Build note: keep-the-error-feedback

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "Useful evidence only if you compare it" was contradicted by R&K 2006.
- **Fix:** Hook and c1 now say "Comparing your attempt with the target shows which item you got wrong."
- **Recall check:** Recall (attempt beside target, errors marked) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
