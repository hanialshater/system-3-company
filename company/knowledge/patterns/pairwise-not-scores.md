```yaml
id: pairwise-not-scores
confidence: ""     # was "*" (2026-10-12 review). No pairwise record exists; all 17 learner reviews are single-artifact findings. A star had no case under it.
context: Judging lessons, mockups, or versions.
problem: Absolute scores (7.4/10) are low-bandwidth and unstable; they tell the next builder nothing about why.
therefore:
  - Show two artifacts labelled A/B without authorship; ask which to give a first-time learner and why.
  - Keep the reasons; they are the payload. Rankings across many pairs can use Bradley–Terry.
  - When the newer lesson presupposes the older (A* on BFS, mixed equilibrium on dominant strategy), "which is better" is the wrong question. Output an order (B before A) and say what A assumes. (Added 2026-10-14, crit candidate 5.)
would_be_wrong_if: Pairwise verdicts are no more consistent across independent critics than absolute scores on the same set.
documented_cases:   # applications, not confirmation: the claim (more consistent than scores) is untested
  - "demo crit 2026-10-14, six pairwise records at company/reviews/{lh-sequential-discounts,lh-discount-round-trip,sock-pairs-not-all-combinations,penalty-kick-mix,a-star-heads-for-goal,who-pays-same-filter}/2026-10-14-pairwise.md. Pairs 4, 5, 6 returned an order (B first) because A assumes B."
known_failure:
  - "Not applicable yet: pairwise needs two versions, and only mercator-greenland and merge-sort-payoff have a v2. The 2026-10-12 reviews avoided scores (they use findings and a fatal / revise / launch verdict), which is consistent with the pattern but is not a case for it: the rule against scores (reviews/README rule 3) is satisfied by findings alone."
  - "2026-10-14: 'Not applicable yet' above is superseded: pairwise ran across different lessons on one concept, not only v1/v2. The old entry stays. But all six pairs were one critic, so consistency across critics (the refutation condition) is untested; the pairs were chosen from a duplicates list so the critic knew which was the newer lesson, so A/B was not blind."
part_of: demo-crit
```
