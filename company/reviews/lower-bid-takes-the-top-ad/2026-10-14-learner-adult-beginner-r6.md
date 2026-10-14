*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): lower-bid-takes-the-top-ad
lesson version: v1
boundary: adult who knows ads can be sold by auction and how to multiply two numbers; does not know that ranking by bid × quality lets a lower bid win the top slot and pay less (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/lower-bid-takes-the-top-ad/sheet.png)
Verdict: revise

## 1. From the artifact
- The hook ("Is A sure to get the top slot?") sets up the tension well. But the question then gives every number and the rule: "$2.00 × 0.5 ... $1.50 × 1.0. Ranked by bid × quality, who gets the top slot?" A learner who does the multiplication (1.0 vs 1.5) gets B without needing any intuition. The prediction is a sum, not a belief, so a wrong guess comes only from not computing. Weak commit, not a blocker.
- Locked stage: the slots ranked by bid (A on top) with "rank number ?". Nothing leaks the bid × quality order.
- Explore: "Rank by bid × quality" swaps B to the top, with score bars (1.5 vs 1.0) and a dashed line at A's score 1.0 across B's bar. Lowering B to $1.20, then $1.00 (Tie), then $0.80 slides B's bar back past the dashed line, and A retakes the top. Quality multiplying the bid is visible as bar length.
- Where it went thin: the "Top ad pays per click" readout. It shows $1.00 at B=$1.50 and also at $1.20. That is the interesting second-price point (the price is set by A's score, not B's bid), but nothing on stage or in the reveal says "same price at both bids". Then at B=$0.80 A is on top and pays **$1.60**, a number I can't explain from anything shown (it is B's 0.8 ÷ A's quality 0.5). The model caption "the top ad pays the least bid that keeps its slot" is the only hint.
- Reveal: "1.5 against 1.0", "pays 1.0 ÷ 1.0 = $1.00", "When you dropped B to $0.80 ... A took the slot back" all match what I saw. The $1.60 is not mentioned. "A simplified model with invented numbers" is honest.
- On the reveal the stage is cropped at the top (the top slot is hidden).

## 2. Earlier findings

No earlier learner review exists (no fact-check either; the trust link reads 0/5 claims checked). The boundary is taken from meta.json.

## 3. Show the why you promised

- "A lower bid can win the top slot" is shown. The score bars and the dashed line at A's 1.0 make it visible, and the reveal points at them.
- "...and pay less", and the objective's "work out that the winner pays the next ad's score divided by its own quality", is not shown. The stage gives a bare price readout. Its one informative case (B's quality 1.0, so ÷ 1.0 changes nothing) cannot show division by quality, and the case that would show it ($1.60 = 0.8 ÷ 0.5 when A wins) is never explained. The reveal tells "1.0 ÷ 1.0 = $1.00". The learner cannot work out the rule from what they saw.

## 4. New findings

- Blocking (top finding): the price rule is told, not shown. Put the working on stage under "Top ad pays" (for example "A's score 1.0 ÷ B's quality 1.0 = $1.00", then "B's 0.8 ÷ A's quality 0.5 = $1.60"), and have the reveal point at the $1.60 case, where quality visibly changes the price. Also point out that the price stayed $1.00 when B's bid fell from $1.50 to $1.20.
- Should fix: the question hands over every number and the rule, so the prediction is arithmetic. Consider asking before stating the ranking rule (for example "Who gets the top slot?" with quality shown), so "Ad A" is a real belief that the stage then overturns.
- Should fix: the stage under the reveal is cropped at the top slot.
- Minor: "Model:" at the top reads like jargon; "Rule:" would be plainer.
- No FATAL.
