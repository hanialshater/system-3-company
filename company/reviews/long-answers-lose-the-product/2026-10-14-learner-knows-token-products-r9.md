*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): long-answers-lose-the-product
lesson version: v1
boundary: knows-token-products (from meta.json learner: knows that a model picks the next token from probabilities and that a whole text's probability is the product along its path; does not know that because every extra token multiplies by a number below 1, the most probable whole answer is biased toward short ones, so search for the single most likely text needs a length correction)
Screenshots seen: yes (artifacts/walkthroughs/long-answers-lose-the-product/sheet.png and 06-reveal.png; walkthrough re-run 2026-10-14T15:26 after the first attempt timed out)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "S"; tapped "+1 token", "All tokens", "Per token"; moved "Tokens in L" from 10 to 8; opened reveal.

1. **The prediction is a real question for this mind.** I know to multiply, but 0.85^10 is not something I can do in my head, and "L has much better tokens" pulls hard. Options S / L / They tie are the same shape. The locked stage shows the token chips but no products. No leak.
2. **The payoff is shown, not told.** After "All tokens" the bars read S 25% ◀ more probable, L 19.7%. "Each extra token multiplies the whole by something below 1" is what I just watched the L bar do. The slider to 8 shows the flip back (27.2%), and the "Seen:" line keeps all three numbers.
3. **Where the idea I lack first appears: "Per token".** The doesNotKnow ends on "a length correction". The stage's only stand-in for that is the "Per token" button. In this toy every token in an answer has the same chance, so "per token: 85%" just reads back the chip value. I cannot tell it is an average over the whole answer (a geometric mean) and not just "look at one token". So I see that the winner flips, but not that this is a *correction* to the whole-answer score. Not blocking, because the flip is visible and the reveal names it in one claimed sentence. A learner could still leave thinking "length correction = ignore the product".
4. "Past 8 it always loses" is told: I saw only 10 and 8, never 9. It follows from finding 2, so it is fine.
5. **The reveal fits with its picture.** In 06-reveal the stage top ("Invented token odds", the Seen line) and the last reveal line are both on screen, and both bars and their readouts are visible. 82 words (budget 90).
6. In step 4 I am still in "Per token" mode, so the "◀ more probable" marker on L shows the per-token winner, not the 27.2% vs 25% whole-answer win the reveal quotes. I had to compare "(whole: 27.2%)" with "(whole: 25%)" myself. Small.
7. The trust link reads "0/5 claims checked" in this build (fact-checker's lane, not mine).

Verdict reason: the central surprise (shorter beats more confident) is staged and quoted from what I saw. The length correction is thin but present.
