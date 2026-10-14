# Build note: earliest-finish-wins (algo-pair-05, 2026-10-14)

Kept from evaluators until they report.

- Built from brief #8 and spec `company/design/specs/earliest-finish-wins.md`: three stacked lanes, shared hour axis, 4 controls in spec order (shared Book next, then one per lane). Milestones `first-picks` and `all-full`, `minInteractions=2`.
- Card title is neutral ("Three rules, one room"); the slug still names the answer (spec flagged it; cm-cs may rename).
- The question and claim c1 state the touching rule (B ends at 4, D starts at 4). Node run: with closed intervals every rule books 1 and the maximum is 1.
- Node reruns: earliest start [A], shortest [C], earliest finish [B, D]; maximum over 16 subsets = 2.
- **Spec error corrected:** the spec's reveal says "B, C, D overlap in pairs". False: B (1-4) and D (4-7) do not overlap. The reveal says "A clashes with every talk, and C clashes with both B and D, so no room holds 3" (claim c3).
- CLRS numbering: brief cites 16.1 (3rd ed.); works.json is the 4th ed. (I believe 15.1). Flagged in the claim and the reference note for the fact-checker.
- All claims `unverified`. Status left `draft`.
