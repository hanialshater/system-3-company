```yaml
id: teach-the-payoff
confidence: ""     # was "*" (2026-10-12 review). One documented case (the book's Merge Sort demos). Marking a single-anecdote pattern with a star breaks the librarian's own rule; it returns to "*" at 3 independent cases.
context: Lessons about procedures (algorithms, methods, proofs).
problem: Making the procedure visible is not the same as showing why it is worth doing; early versions animate the steps and leave the payoff as cleanup.
therefore:
  - Name the step that makes the idea worth having before designing.
  - Make the learner perform that step, not watch the others.
would_be_wrong_if: Pairwise reviews and real learners prefer step-by-step procedure lessons over payoff-first versions of the same concept.
documented_cases: [merge-sort-payoff]
excluded_cases: [odd-numbers-make-squares, binary-numbers, pendulum-period]   # not procedures; their findings are about the reveal gate and the prediction, not about a skipped payoff step
known_failure:
  - "merge-sort-payoff (the exemplar itself, learner review 2026-10-12): the learner performs the merge, but the thesis (why splitting beats comparing every pair) sits entirely in reveal text with no stage support. Performing the payoff step did not make the payoff visible."
  - "binary-search: a 'Pick the middle' button performs the payoff step for the learner, who is handed the insight (middle is best) rather than discovering it, and is never shown a bad guess for contrast."
  - "gradient-descent: the best step size (0.5) is never named and the 0.05 / 0.95 tie, the payoff, has no side-by-side view. Procedure lessons in scope; payoff step told, not performed."
part_of: demo-standard
```
