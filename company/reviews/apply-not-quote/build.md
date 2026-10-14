# Build note: apply-not-quote

## Pre-flight (W-404, no version change)

2026-10-14, demo-builder. Board W-404 (FC LH-4 found on the way).

- **Problem:** c5 ("One short reconstruction; not a retention experiment.") was recorded as a stage line, but StudyLesson.tsx never renders `spec.boundary`, so no learner sees it. It was also the wrong word for this lesson, which is rule application, not reconstruction.
- **Fix:** I deleted c5 and did not render the line. The reveal already says "this was not a memory test", and c3 says "There is no measured learning or productivity gain." Rendering a second disclaimer would add words to a phone reveal for nothing. The catalog's `boundary` field is now that same c3 sentence, so the claims-match test still finds it in a claim, and if a future engine renders `boundary` it is already recorded and verified.
- **Learner-visible change:** none, so no version bump (stays 2). No claim text changed.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`.

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "The target uses new values" was false (it is the same 2, 5, 9), and R&K 2006 did not support the sentence.
- **Fix:** The principle and c2 now say "The target is 2, 5, 9 in ascending order, smallest to largest. Matching it requires applying it to the numbers shown." The c2 source is now the exercise fixture and the study.test.mjs fixture.
- **Recall check:** Recall (3, 8, 12) agrees.
- **Claims:** c2 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.

## Revision v3 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 7 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c1, recall, seen. New: lifehacks.apply-not-quote.seen (the engine's first reveal sentence). Nothing marked verified.
- hideTarget (W-611 gap 3): the rule's-order row reads ? ? ? at predict, neutral and A. cm-lifehacks put this lesson forward for retirement review.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 37 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).
