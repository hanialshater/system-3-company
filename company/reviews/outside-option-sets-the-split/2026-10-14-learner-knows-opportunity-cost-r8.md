*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): outside-option-sets-the-split
lesson version: v3
boundary: knows-opportunity-cost (from meta.json learner: knows splitting $1 by agreement and opportunity cost; does not know that under Nash bargaining each side first gets its outside option and the rest is split equally)
Screenshots seen: yes (artifacts/walkthroughs/outside-option-sets-the-split/sheet.png and 06-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "$0.50"; tapped $0.20, $0.40, $0.60; slider right to $0.80; opened reveal.

1. **The why is on the stage.** The bar splits into "A's fallback" (dark), then two equal halves, with the "split" marker and "before $0.xx" ghost line. At $0.40 it reads $0.40 | $0.30 | $0.30. "Fallback first, then half the rest" is a picture, not a sentence. "Your $0.40 case: A $0.70, B $0.30, deal made" stays as a trace.
2. **No answer before the commit: passes.** The options $0.50, $0.70 and $0.40 are all exact. The locked stage draws the $0 case (0.50/0.50), which matches a wrong option, not the right one. The hook repeats the question's numbers without hinting.
3. **The reveal quotes what I saw.** $0.40 → $0.70, and the Tried row $0.00 → $0.50 ... $0.80 → $0.90, are both on the stage at the reveal and readable in the HTML Tried line.
4. **Over budget, small crop (revise).** The reveal is about 111 words (budget 90). In 06-reveal the stage's top chip ("Split $1 · B's outside option $0") is cut off above the card, so the crop is not 0. The closing model line ("A model: money payoffs, both value a dollar the same, and the deal is sure to happen") is told context that could move to the stage caption. "Every 10 cents added to A's option moves 5 cents of the deal to A" restates the Tried row and could also go. The category manager picks.
5. **Labels at the reveal (kit, W-287).** The bar picture is drawn at about 40%. "A's fallback, then half the rest", "$0.80" and the "Your $0.40 case" line are about 3 to 4 px, so the picture's why cannot be read at the reveal. Kit finding, not counted as a lesson revise. With the 10 px floor the picture will grow back, which makes the crop worse, so the text trim matters more.
6. The question frames this as "bargaining (the Nash model)". Someone who knows opportunity cost will ask "why would B accept only $0.30?". The bar answers "B still beats its $0 fallback". Fine.

Verdict reason: the teaching is shown and quoted honestly, but the reveal is over budget and the stage top is clipped.

## After reading build.md (Pre-flight v3) and the r7 review

- r7 finding (quoted a slider stop the learner blinked past): **fixed** with the Tried row, which I could read and check. The r7 point that the hook gave the answer away is also fixed.
- Pre-flight has no item 7. The reveal is about 111 words, and the stage-top chip is clipped at the reveal. The picture fits now only because the kit shrinks it to about 40%, and W-287 will undo most of that, so the real crop after the floor will be larger.

Fix route: demo-builder. Bring the reveal to 90 words or fewer (candidates: the model line to the stage caption, and the "every 10 cents" restatement), with crop 0 at 390x844 measured after W-287. cm-economics approves cutting a claimed sentence.
