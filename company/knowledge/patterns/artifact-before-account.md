```yaml
id: artifact-before-account
confidence: "**"   # the book's Ch.3 and Ch.5 argument; correlated errors across shared context are well documented
context: Any evaluation of a lesson, mockup or design.
problem: A critic who reads the builder's explanation first inherits its reasons to approve; five such critics are one witness.
therefore:
  - Evaluators start from `npm run walkthrough -- <slug>` (transcript + screenshots) only.
  - They write their first findings before opening meta.json, design.md or build.md.
  - Briefs to evaluators link artifacts, never the builder's reasoning.
would_be_wrong_if: In EXP-001, isolated evaluators catch the planted false claim no more often than evaluators who read the builder's notes first.
documented_cases: []
known_failure: none recorded
part_of: demo-crit
```
