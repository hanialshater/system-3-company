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

## Revision v3

Input: latest learner review (and fact-check). Payoff table orientation, 6% told. Table headers read "Row scores... against ..."; derivation line (30 = 10 x 3 ...); chart of both average scores by starting share with a cursor, crossing visible; the 25% button replaced by "Start at 4%, run" and "Start at 8%, run" (a bracket that does not name 6%); the gate needs a loss from at least 4% and a win from at most 8%. c2, c3 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 3, `format` set, edited claims are unverified for the fact-checker.

## Revision v4
Learner review r2 (2026-10-14) findings:
- N1 (blocking): the "Start at 4%/8%, run" buttons, visible while locked, bracketed the 6% option. They now render only after the prediction is committed, and the explore hint no longer names 4% and 8%. Removing them entirely would leave no one-press QA path to a tit-for-tat win (QA gives sliders two arrow presses and no run), so they stay as post-prediction controls.
- N2: the table's "average now" and the chart's average were two different numbers side by side; the chart title now says "average score at generation 0, by start".
