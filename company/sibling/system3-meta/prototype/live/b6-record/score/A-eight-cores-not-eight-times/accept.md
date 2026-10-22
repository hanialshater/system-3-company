# Acceptance: 8 cores: how much faster? (A-eight-cores-not-eight-times)

Verdict: accept

## Why
- The prediction makes the learner commit. Three concrete times include the tempting naive answer (60/8 = 7.5 min), and "Lock it in" means they have to pick one before the controls open.
- Exploring changes their mind. 2, 4 and 8 cores give 37.5, 26.3 and 20.6 min, and the grey "can't split" block never shrinks. A learner who said 7.5 min sees 20.6 and then a 15.0 floor with unlimited cores. The lane count (1/2/4/8) and the bar end marker match the numbers.
- The reveal lands and it is true. I recomputed everything: 15+45/2=37.5 (1.6x); 15+45/4=26.25, shown as 26.3 (60/26.25=2.29, shown as 2.3x); 15+45/8=20.625, shown as 20.6 (60/20.625=2.91, shown as 2.9x); 45/8=5.625, shown as 5.6 per core; unlimited cores gives 15.0 (60/15=4x). Amdahl's law is 1/(s+(1-s)/n) with s=1/4: 1/(0.25+0.09375)=2.91, with a ceiling of 4. The answer key "About 21 min" is correct, and the model caption states the no-overhead simplification.
- It fits a phone. Nothing is clipped or overlapping, the tap targets are large enough, and the reveal text sits fully beside the action rail without scrolling.

## Minor defects
- Explore screens have a large empty band between the controls and the "You said..." panel, so the panel and CTA sit far below the stage.
- Speed-up formatting is inconsistent: "1x" and "4x" have no decimal, while the others show one (1.6x, 2.3x, 2.9x).
- With unlimited cores the green split part disappears entirely. A thin sliver or a "-> 0" label would make it clearer that the split work went to zero instead of vanishing.
- "30 min" is a weak distractor. It does not come from an obvious misconception, unlike 7.5 (ignores the serial part).
- After Reset, the stage goes back to 60 min, but the reveal then shows the 8-core state without saying it switched back.
- The reveal leaves a lot of empty space at the bottom. The one-line formula (15 + 45/8) could go there.
- The "Lock it in" button looks the same before and after a choice is selected (it is not visibly disabled on the predict screen).

## Blocking defects
- None.
