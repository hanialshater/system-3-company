*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): accurate-bettor-takes-the-pot
lesson version: v4
boundary: adult-beginner (from meta.json learner: knows betting odds are the wealth-weighted average belief, and that repeated bets multiply money rather than add to it; does not know that repeated betting shifts wealth toward the more accurate bettor, so prices drift toward the truth, though luck can lead for a long time)
Screenshots seen: yes (artifacts/walkthroughs/accurate-bettor-takes-the-pot/sheet.png and 09-reveal.png, recorded 2026-10-14T15:17)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About equal"; tapped "1 race", "+50 races", "Run to 500"; opened runs 2, 3, 4, 5; opened reveal.

1. **The prediction is genuine.** "Nearly the same belief, the same money" (hook) makes "About equal" the natural pick. The three options are the same shape, and the locked chart is flat at 50%.
2. **The payoff is shown, with both halves of the gap.** Five traces climb to 98.8% to over 99.9% ("the 60% bettor takes the pot"). Run 5's dip to the circle at 94.2% for the 50% bettor at race 176 is the "luck can lead for a long time" half. POOL ODDS reading 59.9–60.0% is the "prices drift toward the truth" half. All three are on the stage when the reveal names them.
3. **Where the idea I lack first appears: "money ratio ×1.2 on a win, ×0.8 on a loss".** My boundary knows that bets multiply. It does not know why the factors are 1.2 and 0.8. They are 60/50 and 40/50, which only holds if each bettor spreads money across outcomes in proportion to belief. The note "Model: … all-in every race" makes this worse for me: "all-in" usually means everything on one side, which would bankrupt someone on the first loss. Not blocking, because the factors are given and the compounding (×1.11 for the true mix) is shown, but the model line works against the arithmetic.
4. The "Seen: … 3 wins + 2 losses ×1.11" item appears after "Run to 500", but I did not see a 3-win, 2-loss block happen. It is a computed fact labelled as seen. Small.
5. Chart labels ("Five runs end at …", "Run 5: …") overlap the traces and are hard to read at phone size.
6. **The reveal fits with its picture.** In 09-reveal the chart top, run 5 with its circle, the chips, the Seen line and the "Model:" line are on screen. 90 words: exactly at budget.
7. The trust link reads "1/6 claims checked" (fact-checker's lane).

Verdict reason: wealth moving to accuracy, the long lucky lead and odds drifting to 60% are all on the stage and quoted from the runs I opened.

## After reading build.md (Pre-flight v4) and the r8 review

- r8's fit revise is fixed: crop 0, everything the reveal names is on screen, 90 words.
- The claim for 1.2 / 0.8 (visible in the trust sheet) says "winners split the pool by stake", so the factors hold "whatever the shares". That is clearer than the learner text. "All-in every race" in the model line still reads to me as "everything on one side" (finding 3). It is a wording hypothesis for cm-economics, not a blocker. The reveal is at exactly 90 words, so any change must swap words, not add them.
- Fix route: none required for launch.
