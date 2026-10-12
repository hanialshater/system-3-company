```yaml
id: earn-the-reveal
confidence: "*"    # found independently by three reviewers in 7 of 18 lessons in one week; the fix is untested on real learners
context: Any lesson whose reveal explains something the learner was supposed to see on the stage.
problem: >
  The kit unlocks "Show me why" after any interaction, so a learner can reveal after one tap and be
  told the payoff they never saw. Worse, what they did see can confirm the wrong answer (base-rates at
  1 in 10 reads "99 of 108 are sick"), and the reveal then contradicts their own evidence.
therefore:
  - Name the key state: the moment that, once seen, makes the reveal obvious.
  - Call interact() only for steps that move the learner toward it, or call it once when the key state
    is reached and set minInteractions to match.
  - Write the reveal from the state the learner actually reached. Never narrate a run they did not have.
  - Never let the question's numbers differ from what the stage draws.
would_be_wrong_if: In EXP-002, learners on gated lessons recall no better than learners on ungated versions, or abandon at the gate more than 20% more often.
documented_cases: [merge-sort-payoff, base-rates, half-life, binary-search, natural-selection, herd-immunity, birthday-paradox, mercator-greenland]
known_failure: none recorded
part_of: demo-standard
may_call: predict-before-reveal
```
