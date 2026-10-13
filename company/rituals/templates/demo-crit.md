# Demo Crit: {{date}}

convenes: chief-of-staff (does not vote) · reports first: learner-evaluator, pedagogy-critic, qa-tester, accessibility-reviewer, fact-checker · answers questions after: learning-designer, demo-builder · decides: head-of-product

## Rules (from company/reviews/README.md)

1. Evaluators report **from the artifact** (`npm run walkthrough -- <slug>`) before anyone states intent.
2. Pairwise, never 1–10. Name the version to give a first-time learner and why.
3. Findings are phrased as problems ("learners lose track of which pile is which"), not as the test.
4. A specific fatal flaw blocks, and favourable verdicts do not cancel it.
5. Builders do not see the rubric before building; they see the findings after.

## Lessons in review

### <slug>
- Evaluator findings (in the order received):
- Pairwise result (A vs B, which and why):
- QA: pass / fail (record link)
- Claims: open / verified
- Builder answers to questions:
- **Decision:** keep / revise (problems listed) / kill / send to real learners
- Objections that travel with the decision:

## Strange branches
Which alternative lineage gets another generation, even though it is not winning? Why?

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
