# Build note: strategy-builder (demo-builder, 2026-10-13)

- Design: 100 players (TFT circles, cheat squares) under deterministic imitation dynamics f' = f + f(1-f)(W_TFT - W_cheat)/15. 5% start dies out, 7% takes over by gen 40; the tipping point 1/17 does not depend on the speed constant.
- Reveal gate: reach gen 50+ from 5% and from 7%; the start toggle keeps the generation.
- The brief's rule-chip strategy builder was not built: strategies are fixed (TFT vs always-cheat). Slug kept to match the brief. Legend glyphs coloured after screenshots.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- "Start at 5%" / "Start at 7%" bracketed the answer 6% -> the learner now sets the starting share on a slider (1-30%, opening at 3%) and there is a "Start at 25%, run" button; the 5/7 buttons are gone. Milestones: a run to generation 60 where cheats won, and one where tit-for-tat grew; both reached on the QA path (To gen 60 from 3%, then Start at 25%). The reveal quotes the learner's own highest losing start and lowest growing start (e.g. 3% and 25%), then says the tipping point is 1 in 17.
- The equation 21f + 9 = 4f + 10 was told -> removed; the four pairing scores (30, 9, 14, 10) and both running averages are in a table on the stage, with "Tit-for-tat scores more" / "Cheats score more" in the caption, so the crossing is visible.
- "Cheat 14.0" with zero cheats -> the absent strategy's average shows a dash.
- Generation slider removed (58 and 60 were identical); "+10 generations" added. A pairing is defined in the table header. Question now says "Both help" etc. with 4 options (6, 25, 50, 95%). From 6% the share grows but only reaches 18 of 100 by generation 60 (see c3), so the outcome test is "grew vs shrank", not "took over".
- Claims c2 and c3 rewritten, unverified.
