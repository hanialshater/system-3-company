*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): the-pivotal-juror-convicts
lesson version: v3
boundary: knows-bayes (Bayes' rule from which-coin-is-it, and that a unanimous jury needs every vote to convict; does not know that your vote matters only when you are pivotal, or that being pivotal is itself evidence)
Screenshots seen: yes (artifacts/walkthroughs/the-pivotal-juror-convicts/sheet.png)
Verdict: launch

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "30%"; Flip Juror 1's clue; Flip Juror 2's clue; Flip your vote; opened reveal.

1. **The idea is on the stage.** Three juror figures, each with a clue tag and a vote tag, sit above a bar: "Chance of guilt from the three clues". At the start it reads 7%, with "One innocent vote already acquits. Your vote changes nothing." Flipping one juror gives 30% and still "No". Flipping both gives "Your vote decides the verdict", YOUR VOTE MATTERS Yes, and the bar jumps to 70%. "Flip your vote" then turns the verdict to Convict while the bar stays at 70%. A first-time learner who knows Bayes sees both halves from the stage: being pivotal means two guilty clues, and a vote is not a clue. I checked the bar values (7%, 30%, 70%) with Bayes at 70% reliability and a 50/50 prior, and they are right.
2. **The reveal quotes what was seen.** 70% and "your clue alone: 30%, the line under the bar" are both on the stage when the reveal opens. The reveal ends on the idea.
3. **The hook's question is never answered (moderate, not blocking).** The hook asks "Is voting innocent the rational thing to do?" The reveal answers the predict question (70%) and says sincere voting "throws away" evidence, but it never says whether the juror should vote guilty. That would need a conviction threshold (is 70% enough?), and none is given. A learner leaves with "so I should convict at 70%?" unresolved. Either the hook should ask what the learner can answer, or one claimed sentence should close it.
4. **No answer before the commit: passes.** Title "The juror whose vote decides" and the options 30% / 50% / 70% are neutral and at the same precision. The locked stage shows the all-innocent case (7%), not the pivotal one.
5. **Minor:** the panel says "Set the other jurors' votes", but the buttons flip their *clues* (votes follow). That is a small mismatch for a learner who wonders whether they set votes or evidence. The step-1 state is 30% on the bar and "your clue alone: 30%" at once, a coincidence that could blur which number is which for one frame.

## After reading the brief and the r6 review

r6 (v2) findings:
1. Clue and vote looked the same, so the final state contradicted the bar: **fixed**. Each juror now has a dashed clue chip and a solid vote tag. "You" keeps "clue: innocent" while the vote flips to guilty, and the bar stays at 70% "from the three clues".
2. The 50/50 prior was missing: **fixed** ("guilty or innocent equally likely beforehand" in the stem).
3. "Your clue by itself 30%" was told: **fixed** ("Your clue alone: 30%. Votes are not clues." under the bar, and the reveal points at it as "the line under the bar").

Verdict reason: pivotal = two guilty clues = 70%, and a vote is not a clue; both are seen on the stage. Open item for pedagogy-critic / demo-builder: the hook asks a should-I question ("rational to vote innocent?") that the lesson never answers (finding 3).
