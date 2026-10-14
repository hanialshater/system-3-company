# Build note: someone-has-to-swerve

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #19 (NCM)

- Intent: the 2 × 2 chicken table, with your payoff large and theirs small. Tapping an outcome draws best-reply arrows in red, labelled "you +2" or "them +10". If no one would switch, the cell gets a green ring and "Stable" instead.
- The brief says to use the "same grid as no-best-move-one-stable-pair". That lesson is not built yet, so this grid follows the table geometry of two-suspects-payoff. Whoever builds no-best-move-one-stable-pair should match this grid, or the two should be brought together in a crit.
- There are four outcome buttons in a 2-column grid. The active one is disabled, so every enabled press changes something. Milestones: both-swerve, both-straight, one-each.
- The predict answer comes from the table (STABLE), not a typed index. I re-ran it in node: only (swerve, straight) and (straight, swerve) are pure Nash equilibria.
- Not run (per dispatch): next build, QA, walkthrough, tsc. The arrow labels near cell edges should be checked on a phone screenshot.
