# Build note: link-label-names-the-target

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The principle said "scope", but the stage fields are Artifact, Version and Section.
- **Fix:** The principle (studyCatalog.ts), c2 and c4 now say "artifact, version and section".
- **Recall check:** recall.why already said "artifact, version and section", so no change was needed there.
- **Claims:** c2, c4 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
