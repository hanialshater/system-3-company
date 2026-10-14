# Build note: lower-bid-takes-the-top-ad

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #22.
- Intent: two slots, two ads, a bar per ad for its ranking number. "Rank by bid" (start, the misconception's picture: A on top) vs "Rank by bid × quality" (B on top with the lower bid); the ads swap slots. B's bid presets $1.50, $1.20, $1.00 (tie), $0.80 (A retakes the top). In score mode a dashed line on B's bar marks A's score 1.0, the least B can bid and stay on top. Readouts: top slot, what the top ad pays per click.
- Payment rule stated on the card as the model ("the top ad pays the least bid that keeps its slot") = next score ÷ own quality: B pays $1.00; when A is on top it pays 0.8 ÷ 0.5 = $1.60.
- Kept out of learner text: the brief's claim 3 (real search engines use a quality factor; formulas not public) is flagged for a human source check. The footnote says it is a simplified model with invented numbers, not a description of any real search engine. "Quality" is not defined in real-world terms on purpose.
- Scores compared in integer thousandths so the $1.00 tie is a tie (no float drift).
- Title changed from the slug's wording to a question so it does not give away the answer.
- Milestones: score-rank and a-retakes (B's score below A's in score mode). QA order (bid × quality, then $1.20, $1.00, $0.80) reaches both.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
