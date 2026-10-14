# Build note: flat-pack-volume-dimensions

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** A 40×30×30 box is 4 panels 40×30 plus 2 panels 30×30, not "6panels=40×30×t".
- **Fix:** `home-lessons.ts` formula now "4 panels 40×30 + 2 panels 30×30, thickness t; stack envelope 40×30×6t; assembled reference 40×30×30."; `home-models.ts` flat-pack inputs line now reads "4 panels 40×30 + 2 panels 30×30 · t=…cm". The computed values are the same (stack 40×30×6t, assembled 36,000 cm³), because the 30×30 panels sit inside the 40×30 footprint. The c1 and c2 sources quote the new formula; their text and verdicts are unchanged.
- **Recall check:** Recall (40×40 panels, 64,000 vs 9,600 cm³) is a separate scenario and still agrees.
- **Claims:** c3 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
