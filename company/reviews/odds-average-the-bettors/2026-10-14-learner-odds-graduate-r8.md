*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): odds-average-the-bettors
lesson version: v3 (meta.json version 3)
boundary: odds-graduate. Knows odds and probability (odds-three-to-one); does not know that when bettors split their money by belief, the market's implied chance is the wealth-weighted average belief (meta.json learner field, same tag as r6/r7).
Screenshots seen: yes (artifacts/walkthroughs/odds-average-the-bettors/sheet.png, build 5, 9 frames; 04-step-3.png and the reveal frame checked at full size)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("60%").

1. **No answer before the commit: met.** Options 60% / 70% / 80% all bare numbers. The locked stage shows an empty pool track, legend, "Seen: nothing yet" and "IMPLIED CHANCE OF A ?" only; the simple-average readout is gone from the locked frame (r7 minor fixed).
2. **Shows the why: met on the stage.** The pool bar splits each bettor's money into on-A / on-B pieces labelled "1 $240", "2 $40", "1 $60", "2 $60", with the solid odds line and the dashed simple-average line. Equal money puts the lines together; Bettor 2 richer slides the solid line to 50% while the dashed one stays at 60%. That is the wealth-weighting, pictured. Bar labels are readable during explore (04-step-3.png at full size).
3. **The reveal still opens away from what it quotes (r7 top finding, not fixed in practice).** The three new "Seen" rows record every number the reveal quotes, which is the right fix on paper. But in the reveal frame the stage is scrolled so its top (the model chip, the pool bar with the solid and dashed lines, the legend and all three Seen rows) is off screen. What is on screen beside the reveal is "IMPLIED CHANCE OF A 87%", "SIMPLE AVERAGE 80%" and the sliders at $400 / 100% / $200 / 60%. The reveal says "the odds said 70%", "the solid line sat on the dashed one" and "the odds slid to 50% ... while the dashed average stayed at 60%". The lines it names are not visible, and the readouts that are visible say something else. A learner who played with the sliders, as the panel invites, reads "70%" next to "87%".
4. **Fit fails.** Reveal is 113 words (> 90 on a new version, v3) including the grey model note, and the stage-top crop is the whole picture. The pre-flight 7 fix order applies: cut told context first (the model note is already on the stage as the chip "Model: no house cut; all money bet by belief", so the reveal's last paragraph is a candidate; the category manager chooses).
5. **Stage text budget.** With all three Seen rows, the legend and the chip, stage text is about 55 words at once (frames 04–08), over the 25-word budget. The Seen rows are what make the reveal honest, so this is the trade-off to solve, not a reason to drop them: folding the rows into the bar (e.g. marks on the track for each seen odds) may help both fit and budget.
6. Labels at the reveal: the picture is off screen, so the W-287 kit shrink could not be judged for this lesson.

Where understanding first broke: not on the stage. It broke at the reveal, which talks about lines I can no longer see while showing me different numbers.

## After reading build.md (Pre-flight v3)

v3 added the Seen rows, hid the locked simple-average readout and split bar labels onto two lines; all visible in build 5. Pre-flight 4 says every quoted value is "on stage in the start Seen row", which is true of the DOM, but Pre-flight 7 (phone fit) is not answered and the 390×844 reveal frame shows those rows off screen. "Not seen in a browser."

**Top finding (revise, reveal fits with its picture / quotes what you saw):** at 390×844 the open reveal hides the pool bar, both lines and all three Seen rows while showing live readouts 87% / 80% that contradict its "70%"; reveal 113 words (> 90). Cut told context (category manager picks; the model note duplicates the stage chip) and fold stage text so the bar, its lines and the Seen record are on screen with the reveal's last line.

| r7 finding | Status |
|---|---|
| Top: reveal's 70% numbers not on stage when it opens | partly fixed: recorded in Seen rows, but those rows are scrolled off at reveal |
| Locked "SIMPLE AVERAGE ?" hints the answer | fixed (hidden until commit) |
| $40 sliver unlabelled | fixed (two-line labels) |
