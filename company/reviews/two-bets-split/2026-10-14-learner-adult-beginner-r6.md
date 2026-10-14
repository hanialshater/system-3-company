*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): two-bets-split
lesson version: v4
boundary: adult beginner with savings who knows expected value as an average over many tries and that two coin flips land four ways; thinks splitting just lowers returns.
Screenshots seen: yes (artifacts/walkthroughs/two-bets-split/sheet.png, 3 frames, integrated build 3 at :3470)
Verdict: revise

## 1. From the artifact

- Predict: "Split the money, keep the average" with the hook "Does spreading money ... cost you returns? Or just risk?" The title half-answers the hook ("keep the average"), but the question is about the chance of a loss, so that's fine. 50% / 25% / 0% are good options, and 50% is my natural wrong answer. The locked stage shows an empty chart with only "average +5%" and "?" readouts.
- Explore: the walkthrough's two arrow presses take the slider 1 → 2 → 3, and the reveal unlocks. The 3-bet chart now labels the grey 0% bar "break even" and has a +10% tick: 12.5 / 37.5 / 37.5 / 12.5, CHANCE OF A LOSS 12.5%, AVERAGE +5%, WORST −10% at 12.5%. The 2-bet state flashed by between presses, so on this path I did not look at it.
- Reveal: the stage now pins the 2-bet chart (25% / 50% / 25%, CHANCE OF A LOSS 25%, AVERAGE +5%), and the reveal says "On the stage now, two bets ... ½ × ½ = 25%". So the 25% is on screen when it is explained. "Independent bets partly cancel" points at the bars bunching around +5%, which I saw at 3. But the second doesNotKnow item, "that this depends on the bets being independent", is only the stage chip "Model: independent coin-flip bets" and the told line "Real investments often fall together". Nothing on stage ever moves together.

## 2. Earlier findings (r5, v3)

1. Gate on having seen 2 bets / the reveal explains a state never seen: **fixed in effect**. The milestone needs n = 2 and the reveal pins the 2-bet chart, so the 25% is on screen. A fast drag can still pass 2 without the learner noticing, but the reveal now shows it.
2. Label the 0% bar and add a +10% tick: **fixed** ("break even", +10%).
3. The panel says what to do, but the gate doesn't enforce it: **fixed** (same as 1).

## 3. New findings

1. **Revise (Show the why you promised):** independence is a doesNotKnow item, and the objective asks the learner to explain that splitting "needs independence". On stage it is only a chip label, and in the reveal one told sentence. A single toggle on the existing chart, such as "bets move together", which collapses any split back to −10% / +20% at 50% each, would let the learner see that cancelling needs independence. The reveal could then point at it. The builder decides the form.
2. Minor: the reveal repeats itself. "The worst case, every bet falling, gets rarer" appears twice in one paragraph. Cutting one makes room for the independence pointer.
3. Minor: on the reveal frame the stage is scrolled, and the pinned chip "Showing 2 bets, as the answer explains" is cut, so a learner may not realise the slider jumped back from 3 to 2. The slider reads 2 but the learner left it at 3.
4. Minor: "try 4 bets: it goes back up" is an invitation the reveal gives after the stage is no longer the learner's to drive.
- No FATAL.
