# Learner review r11: mercator-greenland (screenshot re-review)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v5
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: no-projections (same tag as r6/r8/r9). Knows what a world map looks like, the equator and the poles; does not know map projections, why maps distort, or Mercator's purpose.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- mercator-greenland` against a release build I started on :3590. transcript.md read first, then sheet.png.

**Screenshots: I looked at the screenshots.** sheet.png (all 5 frames) was read as an image, and I opened 05-reveal.png at full size. I also measured the orange compass-bearing line in 01-predict.png (Mercator) and 05-reveal.png (equal-area) for straightness, because the reveal asks me to see a difference there. This review is written from what the images show. It answers the publish hold (company/ops/publish-holds.json).

path walked: chose Greenland about 15× Congo; Slide to equator; Equal-area map; slider back to 2°N; reveal.

## Findings (written before reading meta.json)

- **Prediction:** this mind trusts the map, so "about 15×" (my pick) is natural. The lesson wants that.
- **The main idea is shown, not told:** one tap on "Slide to equator" moves blue Greenland next to green Congo, leaves a dashed outline at its true place, and the readout drops from 15.4× to 0.9×. The same land, a different size: I see it happen. The equal-area toggle then holds 0.9× wherever Greenland sits (2°N still 0.9×), which confirms that this map does not stretch.
- **Weak spot (not a blocker, but the one I would fix first): the "bent" line is hard to see.** The reveal says the orange compass-bearing line is "straight on it, bent on the equal-area map". In the equal-area frames the line looks nearly straight to my eye. Measured on the screenshot it deviates about 10 px from a straight chord over about 380 px (Mercator: about 4 px, which is dash noise). The difference is real but faint, so a learner checking the picture may decide the reveal is wrong. This is the only evidence on stage for "Mercator keeps angles true", the doesNotKnow item about Mercator's purpose.
- **Cosmetic:** on the equal-area map Greenland's dashed true-place outline sits on the top edge of the oval and is partly cut off; the "Equal-area" label sits beside it. You can tell what it is, but only just.
- **Note:** the badge reads "70S", not 60S like the other lessons in this run. Not a learner problem; flagging for whoever owns the time budget.
- Reveal fits the phone frame with the stage visible; the numbers (2.17 vs 2.34 million km²) match "about 1×, Congo slightly bigger".

## After reading the brief

Objective (a flat map must distort; Mercator inflates area away from the equator; Greenland ≈ DR Congo) is what the stage shows for area. "Mercator's purpose" (angles) rests on the faint bend described above, so that part reaches me mostly as told. The misconception "sizes on a world map are real sizes" is broken by the first tap. No false claim (the line is bent, slightly), dead control or reinforced misconception seen in the images or the transcript.
