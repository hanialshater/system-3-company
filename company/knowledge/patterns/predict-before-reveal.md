```yaml
id: predict-before-reveal
confidence: "**"   # testing and generation effects are well supported in the learning literature; untested on our lessons
context: Any lesson whose idea has a surprising or checkable outcome.
problem: Showing the answer first feels efficient and produces recognition, not recall; learners cannot tell they did not know.
therefore:
  - Ask for a commitment (2–4 options) before the stage moves.
  - Lock the stage visibly until they commit (enforced by src/kit/Lesson.tsx and QA).
  - In the reveal, compare their guess with what they saw.
would_be_wrong_if: In EXP-003, an explain-first variant of the same lessons produces equal or better first-revisit recall with real learners.
documented_cases: [merge-sort-payoff]
known_failure: none recorded
part_of: demo-standard
may_call: teach-the-payoff
```
