```yaml
id: pairwise-not-scores
confidence: ""     # was "*" (2026-10-12 review). No pairwise record exists; all 17 learner reviews are single-artifact findings. A star had no case under it.
context: Judging lessons, mockups, or versions.
problem: Absolute scores (7.4/10) are low-bandwidth and unstable; they tell the next builder nothing about why.
therefore:
  - Show two artifacts labelled A/B without authorship; ask which to give a first-time learner and why.
  - Keep the reasons; they are the payload. Rankings across many pairs can use Bradley–Terry.
would_be_wrong_if: Pairwise verdicts are no more consistent across independent critics than absolute scores on the same set.
documented_cases: []
known_failure:
  - "Not applicable yet: pairwise needs two versions, and only mercator-greenland and merge-sort-payoff have a v2. The 2026-10-12 reviews avoided scores (they use findings and a fatal / revise / launch verdict), which is consistent with the pattern but is not a case for it: the rule against scores (reviews/README rule 3) is satisfied by findings alone."
part_of: demo-crit
```
