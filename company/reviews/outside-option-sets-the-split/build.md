# Build note: outside-option-sets-the-split (ncm-e01, 2026-10-14)

Built from brief #14 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version). No spec or wireframe existed.

- Stage: a $1 split bar with three parts (A's fallback, A's half of the rest, B's half), a "No deal" line and a "Deal" line. Presets $0/$0.20/$0.40/$0.60 and a slider (0 to $0.80 in 10-cent steps, so every split is whole cents). B's outside option is fixed at $0. Milestone `at-question` (A's option = $0.40, the predict question).
- Slider stops at $0.80 rather than $1: above that the halves are too thin to label on a phone.
- Re-ran in node: A = 0.4 + 0.6/2 = 0.70; the Nash product (A - 0.4)B is maximised at A = 0.70; A = 0.5 + a/2 for a in 0..1.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
