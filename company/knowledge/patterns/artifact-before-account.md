```yaml
id: artifact-before-account
confidence: "*"    # was "**" (2026-10-12 review). Rests on the book's argument about correlated errors; EXP-001, the test of it, is "designed, not run". No in-house case yet differs between the isolated and the primed condition. Restore "**" if EXP-001 shows B survives less often than A.
context: Any evaluation of a lesson, mockup or design.
problem: A critic who reads the builder's explanation first inherits its reasons to approve; five such critics are one witness.
therefore:
  - Evaluators start from `npm run walkthrough -- <slug>` (transcript + screenshots) only.
  - They write their first findings before opening meta.json, design.md or build.md.
  - Briefs to evaluators link artifacts, never the builder's reasoning.
would_be_wrong_if: In EXP-001, isolated evaluators catch the planted false claim no more often than evaluators who read the builder's notes first.
documented_cases: []
known_failure:
  - "Isolation of context is not isolation of model. All 17 learner reviews on file used one simulated reader (16 of them the same 'adult beginner' boundary) and the fact-check batches ran on one checker model per domain (decisions/2026-10-12-scale-operations.md). The pattern is followed and the witnesses are still correlated; this is EXP-001 condition C, not yet tried."
  - "Weak supportive observation, not a confirming case: the isolated learner reviews found 5 fatal flaws (reveal reachable without the key state) that the fact-check and QA of the same lessons did not. No primed condition exists to compare with."
part_of: demo-crit
```
