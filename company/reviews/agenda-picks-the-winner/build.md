# Build note: agenda-picks-the-winner (demo-builder, 2026-10-14)

- Intent: three voters with fixed rankings (A>B>C, B>C>A, C>A>B) in a row. Three agenda chips run two sincere majority votes each: "A vs B, then C", "B vs C, then A", "A vs C, then B". The stage shows both tallies (all 2-1), the winner, and a small triangle where an arrow (winner to loser) appears for each pair the learner has seen; unseen pairs are dashed. The elected option is filled. After all three chips the triangle is a full cycle.
- Prediction: the first chip's agenda (A vs B, then C); answer C is computed by the same `run()` the stage uses, not typed in. The answer is not on the stage before the learner predicts (vote lines show "?", chips are disabled).
- Key states (three milestones, one per chip): each agenda run. Chip order in the DOM is the prediction's agenda first, so QA's in-order presses end on the third agenda with the full cycle drawn.
- Numbers: recomputed in node with the lesson's exact rule (each voter votes for the option they rank higher; 2 votes win; winner meets the held-back option). A-B 2-1 for A, B-C 2-1 for B, C-A 2-1 for C. All six agenda orders: each of A, B, C wins twice, always the option held to the last vote. The three chips give C, A, B. Recall scenario (P>Q>R, Q>R>P, R>P>Q; Q vs R then P) checked in node: Q 2-1, then P 2-1, P wins.
- Brief deviation: the brief's chip list is followed exactly. The brief's "Beats triangle shows the cycle when all three pairs have been seen" is drawn progressively (arrows appear as pairs are seen) rather than appearing only at the end, so the first chip already draws two arrows. This does not reveal the answer before prediction.
- Names: "Condorcet" and any date are not used in learner text (claim 3 note in the brief). Reveal says "when every voter backs the option they rank higher" and does not claim real elections have such cycles (claim 4).
- Reference: curriculum.references has easley-kleinberg-2010 ch. 23 §23.3. **The section is unconfirmed** (brief: from memory, proxy 403); the fact-checker must confirm against the book. The number is in metadata only.
- Metadata deviations forced by the checker: `owner.categoryManager` is "cm-math" (the checker rejects "cm-math-discrete"; strand is "discrete"), and claim 4 uses support "convention" (the checker accepts derivation, simulation, source, convention).
- Stage words: voter numbers, three chips (vs / then), "Vote 1", "Vote 2", "Winner", short caption, one legend line. Roughly 20 words not counting letters and numbers.
- All claims are unverified, for the fact-checker. Not touched: kit, app shell, tests, board, progress, events.
- Workspace note: the worktree had no node_modules, so `npm ci` was run (no dependency changes). The regenerated `src/demos/registry.generated.ts` shows a large diff (re-sorted), which other branches adding lessons will also touch; regenerate rather than merge by hand.

## Revision v2 (demo-builder, 2026-10-14)

Inputs: learner review r2 (2026-10-14-learner-no-voting-theory-r2.md).
- **Reveal stage vs headline:** in the reveal the stage is pinned to the agenda the question asked about (A vs B, then C, winner C). The three chips are replaced by "Your question: A vs B, then C", which also frees the height, so the numbered ballots are no longer cropped (checked on the phone walkthrough).
- **Consistent voters, looping group:** reveal paragraph 2 now says each voter's own ranking is consistent, yet the group's majorities loop. New claim c5 (unverified).
- **Condition simplified:** "as long as each voter votes for the option they like better in every vote". c4 text changed, c3 re-opened (its paragraph was rewritten); both back to unverified.
- QA: contract spec for the slug passed on phone and desktop (QA_PORT 3931, own dist .next-polish). Feed chip spec fails in this worktree for reasons outside the lesson. Walkthrough frames all looked at.
