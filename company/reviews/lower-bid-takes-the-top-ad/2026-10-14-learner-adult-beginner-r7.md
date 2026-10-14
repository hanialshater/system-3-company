*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): lower-bid-takes-the-top-ad
lesson version: v2
boundary: adult who knows ads can be sold by auction and how to multiply two numbers; does not know that ranking by bid × quality lets a lower bid win the top slot and pay less. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/lower-bid-takes-the-top-ad/sheet.png, 6 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict.** The title and hook ("Is A sure to get the top slot?") set up the tension without naming an option. Options Ad A / Ad B / A tie are equal. The locked stage shows the slots ranked by bid (A on top, "rank number ?"). That is the misconception's picture, not the answer. Weakness: the question states the rule and every number ("Ranked by bid × quality ... $2.00, 0.5 ... $1.50, 1.0"). A learner who multiplies gets B without holding any belief. The wrong guess comes only from not doing the sum.
- **The ranking idea is on the stage.** "Rank by bid × quality" swaps B to the top with score bars 1.5 vs 1.0 and a dashed line at A's score. Stepping B down ($1.20, $1.00 tie, $0.80) slides B's bar past the line and A takes the top back.
- **The price rule is now on the stage.** Each frame has the working as a caption: "B pays A's score 1.0 ÷ B's quality 1.0", then "A pays B's score 0.8 ÷ A's quality 0.5". The history line "$1.50 → B $1.00 · $1.20 → B $1.00 · $1.00 → Tie · $0.80 → A $1.60" lets me see that B's price did not move when its bid fell, and that A's quality doubles A's price.
- **Reveal** quotes 1.5 vs 1.0, $1.00 at both B bids, and $1.60 = 0.8 ÷ 0.5. All are in the history line when it opens. It ends on "a simplified model with invented numbers", which is honest but is the last line, not the idea.
- Minor (told): "A, at half B's quality, would need more than $3.00 to beat B's $1.50". There is no A-bid control, so this is told, not tried.
- Minor: in the $0.80 frame the dashed line still marks A's own score (1.0) on B's row. The value that sets A's $1.60 is B's score 0.8, which is only the end of B's bar. A line at the price-setting score in every frame would read more directly.
- Minor: "quality" is never said to mean anything (ad relevance, click rate). For an adult beginner it is just a number given by the question.
- Minor: on the reveal frame the stage is scrolled so the two slots and bars are cut off; only the buttons and the history line show. The reveal is about 120 words, at the budget.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Top: price rule told, $1.60 unexplained, "same price at both bids" not pointed at | fixed: working captions on stage, history line, reveal points at $1.00 twice and $1.60 |
| Question hands over every number and the rule, so the prediction is arithmetic | not fixed |
| Stage cropped at the top slot under the reveal | not fixed |
| "Model:" jargon | fixed: "Rule:" |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
