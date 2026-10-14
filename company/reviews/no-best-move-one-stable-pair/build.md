# Build note: no-best-move-one-stable-pair (ncm-e01, 2026-10-14)

Built from brief #11 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version). No spec or wireframe existed.

- Stage: the brief's 3 x 3 table as nine tap targets (HTML buttons, not SVG, so each is a real control). Tapping a cell outlines Row's best reply in that column (solid) and Column's best reply in that row (dashed), prints who would switch and why (e.g. "Row switches to M (4 > 3)"), and marks the cell checked/stable. Milestones `someone-switches` and `found-stable`.
- The brief's "best-response arrows" became outlines plus a sentence: arrows across a phone-width grid crowded the payoffs. Flag for the design lead if arrows are required.
- Re-ran in node: no weakly dominant move for either player; the only pure equilibrium is (M, L). Best replies are unique in this table, which the code relies on.
- Says "pure" and leaves mixed strategies out, as the brief asks.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
