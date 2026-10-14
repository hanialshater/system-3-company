*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): twenty-then-ten-off
lesson version: v3
boundary: knows-percent-discount (from meta.json learner: knows what a percent discount is; does not know that a second discount applies to the already-reduced price)
Screenshots seen: yes (artifacts/walkthroughs/twenty-then-ten-off/sheet.png and 06-reveal.png, build 5)
Verdict: launch with notes

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "30%"; tapped 20% off ($80), 10% off ($72, 28%), Swap order ($10 then $18, $72), Reset; opened reveal.

1. **The why is shown.** The red cut after 20% is visibly smaller than the first cut, and the label says "10% of $80 = $8 off". That is exactly the misconception (10% of what?), drawn. The swap's "20% of $90 = $18" makes order-independence concrete.
2. **No answer before the commit: passes.** The options 30%, 28% and 25% are all exact. The locked stage shows $100 and "TOTAL DISCOUNT ?". The title and hook only restate the question.
3. **The reveal quotes what I saw, and survives Reset.** After Reset the bar is back at $100 and 0%, but both "Seen" lines ($20 then $8 → $72 (28% off); $10 then $18 → $72) stay, and the reveal points at them ("Your Seen lines").
4. **Fits with its picture: passes.** The reveal is about 72 words. In 06-reveal the "Model:" chip at the stage top and the reveal's last line are both on screen.
5. Note: after Reset the picture is the plain $100 bar, so the small $8 cut is only in the Seen text when the reveal opens. That is acceptable under the trace rule, but the picture carries less than it could. A builder could keep the last two-cut bar ghosted. Not blocking.
6. Note (kit, W-287): the kit shrank the bar picture at the reveal even though there was room. The "$100" label is about 6 px, and the cut labels would be too. Kit finding.
7. Note: "0.8 x 0.9 = 0.9 x 0.8" uses decimals the stage never shows. One more step for this learner, but it is in the reveal and short.

Verdict reason: the misconception is drawn and quoted, the reveal fits, and the commit is clean.

## After reading build.md (Pre-flight v3) and the r7 review

- r7 finding (Reset cleared every number the reveal quotes): **fixed**. The Seen lines survive Reset, which matches 05-step-4 and the reveal. The r7 hook pointer ("Is that 30% off?") is fixed.
- Pre-flight has no item 7. From the screenshot: the reveal is about 72 words and stage-top crop 0. Passes.
- Board W-124 (float artefact 28.000000000000004%) is still open as "next". In this build every readout shows "28%", so it looks fixed. The owner should check it and close it.

No revise. Notes for demo-builder (optional): keep a ghost of the last two-cut bar after Reset, so the picture still shows the $8 cut at the reveal.
