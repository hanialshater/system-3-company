```yaml
id: fresh-checker-for-drafted-wording
confidence: ""     # promoted 2026-10-14 from the candidate second-check-for-checker-added-claims. Same-day steward ruling plus two uses; rests on an interpretation of a protected rule.
context: A fact-checker's dispute drafted replacement wording (or added a claim) and the claim needs a verified status.
problem: Rule 7 says a claim's author never verifies it. A checker who drafted the words and then marks them verified is an author checking their own claim; but banning every checker from drafting stalls disputes.
therefore:
  - A new instance, with no memory of the draft, verifies it (W-280 ruling, company/reviews/midnight-sun-line/2026-10-14-fact-check.md).
  - It reads the artifact first (Demo.tsx, claim text and support) before source fields, review files or the board, uses its own references and numbers, and records the pass.
  - Label the reading as a steward ruling until the board ratifies it (AMD-004 proposed).
would_be_wrong_if: A third reader on a different model overturns fresh-instance verdicts on drafted wording as often as it overturns same-instance ones, so the fresh instance adds nothing.
documented_cases:
  - "midnight-sun-line c5 and c7: pass 32 by a fresh instance that read the artifact first, with its own astronomy-engine and d3-geo runs (W-280, W-284)."
  - "eratosthenes-shadow c1 and c5: stage-only wording applied from the W-258 ruling and left unverified for a separate checker."
known_failure:
  - "Recurred and fell short: FC LH-2 (W-369) reports reading the LH-1 record and the source fields before the stage on lh-percentage-overage c4. Only the brief enforces the reading order; launchGates checks checkedBy !== builder and cannot tell two checker instances apart."
  - "Independence of context, not of model: fresh instances are the same checker model (see artifact-before-account)."
  - "The steward made the ruling that reinterprets protected rule 7 and also sits on the bench that judges checker independence (constitutional review J2)."
part_of: demo-standard
may_call: artifact-before-account
```
