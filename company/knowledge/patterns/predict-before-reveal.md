```yaml
id: predict-before-reveal
confidence: "*"    # was "**" (2026-10-12 review). The testing and generation effects are well supported in the literature, but nothing in our own data supports it yet, and our own reviews show the form can be satisfied without the effect. Restore "**" when EXP-003 (not yet written; see known_failure) or EXP-002 shows recall benefit.
context: Any lesson whose idea has a surprising or checkable outcome.
problem: Showing the answer first feels efficient and produces recognition, not recall; learners cannot tell they did not know.
therefore:
  - Ask for a commitment (2–4 options) before the stage moves.
  - Lock the stage visibly until they commit (enforced by src/kit/Lesson.tsx and QA).
  - In the reveal, compare their guess with what they saw.
  - The commitment must be able to be wrong. At least one option is a belief a real learner would hold, and neither the title, the hook nor the option wording gives the answer away. (Added 2026-10-12: a locked, 4-option question that nobody can get wrong is the form without the effect.)
  - Ask for the surprising number, not the obvious direction or the definition. The guess must be wrong for the misconception's reason: "below / at / above" and "which method checks fewer?" can be right without the insight. (Added 2026-10-14, crit candidate 3.)
would_be_wrong_if: In EXP-003, an explain-first variant of the same lessons produces equal or better first-revisit recall with real learners.
documented_cases: [merge-sort-payoff]   # exemplar that produced the pattern; no case yet that it did not produce
known_failure:
  - "Form satisfied, substance missing (2026-10-12 learner reviews, same wave; all simulated): odd-numbers-make-squares (two examples plus the title give the answer away; no wrong belief to correct), binary-numbers (the prediction is arithmetic on supplied numbers), supply-demand (title and hook nearly give the answer), exponential-growth (option 1 names its own flawed reasoning, reads as the decoy), binary-search (the only non-'About' option is the answer), mercator-greenland v1 (title and hook leaked the answer; fixed in v2). QA passed 17 of 17 lessons, so the enforced check cannot see this failure."
  - "birthday-paradox: the locked stage already shows a match in the sample room before the learner predicts, so 'commit before anything moves' was not true."
  - "EXP-003, which this pattern and product/vision.md name as its test, has no file in company/experiments/. The refutation condition cannot currently be run."
  - "2026-10-14, answer on the card before the commit (decisions/2026-10-14-reveal-quotes-what-you-saw.md, pattern 1): range-min-in-four-nodes, middle-of-three-takes-all, newton-doubles-the-digits, four-in-a-row-two-thirds, ternary-asks-more; about 18 of 64 revise files by keyword grep. The rule existed and new lessons still broke it."
  - "2026-10-14 crit: lh-discount-round-trip's three-way direction question is easier to guess than fifty-up-fifty-down's number question; sock-pairs' answer holds by definition (pairs 2, 3). Simulated reading."
part_of: demo-standard
may_call: teach-the-payoff
```
