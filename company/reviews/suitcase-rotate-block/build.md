# Build note: suitcase-rotate-block

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The formula said floor(24/itemH), but the bag is 36 cm tall.
- **Fix:** Formula is now "Count=floor(W/itemW)×floor(36/itemH), item=18×12 or 12×18 cm.". The slider max goes from 40 to 35, because from W=36 both orientations fit 6, which would contradict the keyed answer. For W=28 to 35 the counts are 3 and 4. The c1 and c2 sources quote the new formula.
- **Recall check:** Recall (30×40 space, 20×10 blocks, 6) is a separate scenario and agrees. The fixture value at W=30 (3, 4) still passes.
- **Claims:** c3 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
