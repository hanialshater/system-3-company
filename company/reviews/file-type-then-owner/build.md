# Build note: file-type-then-owner

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "Four files match one clue" was false, because list.txt matches neither clue.
- **Fix:** Hook and c1 now say "Four files; two are PDFs and two are Ana's. Which one matches both?"
- **Recall check:** Recall (spreadsheet + Lee) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
