# Build note: two-thirds-of-the-average (ncm-e01, 2026-10-14)

Built from brief #13 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version, including both "Edited:" points). No spec or wireframe existed.

- Stage: a 0-100 number line with the "still sensible" region shaded up to the ceiling 100 x (2/3)^k, a tick at each round's cut, and markers at 33 and 22 that turn red when deleted. Next round, 4 more rounds, Reset. Milestone `past-33` (round 3, ceiling 29.6); QA reaches it via Next round + 4 more rounds.
- Real-valued guesses: the card says "decimals allowed"; no whole-number-only version is offered. The reveal says the ceiling falls under 1 from round 12 and keeps shrinking toward 0; it never says the bound "leaves 0" after finitely many rounds.
- Nagel (1995) experimental guesses are flagged for a human source check and are kept out of learner text. The reveal's last sentence is a derivation (c4), not an empirical claim about real players.
- Re-ran in node: bounds match the brief to three decimals; first under 1 at k = 12.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
