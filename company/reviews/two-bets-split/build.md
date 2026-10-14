# Build note: two-bets-split

builder: demo-builder · 2026-10-13

- Intent: exact binomial histogram of outcomes for money split across n independent +20%/−10% bets; average line fixed at +5%.
- Milestone: n = 2. The brief's 'loss share shrinks' is false at n = 4 (31.3% > 25%); the stage shows it honestly, the reveal says so, and a worst-case readout (0.5^n) shows what does shrink.
- No randomness (exact enumeration).

## v2 (claim fix 2026-10-13)

Claim c7 disputed ('losses left are small ones' false at 2-3 bets). Reveal now: '...but the worst case, every bet falling, gets rarer at every step.' Claim rewritten; unverified.


## Revision v3

From the latest learner review and fact-check (batch 03).

- Worst case split into "Worst result" and "Chance of it".
- Reveal quotes the 4-bet 31.3% only if the learner visited 4 bets; otherwise points to try it. The 2-bet milestone already gated the reveal.

## Revision 2026-10-14 (wave D r5, demo-builder)

v4. Review: slider could pass 2 too fast to see; reveal explained 2 bets. Changes: at the reveal the stage pins the 2-bet chart with a chip saying so; slider disabled there; ticks under every bar; 0% bar labelled "break even". Reopened c1; new c8.

## Pre-flight v5

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-adult-beginner-r6.md`

Changes: independence is on stage. Two buttons, "Bets move together" and "Bets move independently", switch the chart; together, any split collapses to −10% / +20% at 50% each. A "Chance of a loss seen" row lists every state visited ("1 bet: 50% · 2 bets: 25% · 3 bets: 12.5% · 3 bets together: 50%"), and the reveal quotes it. The stage no longer pins itself to 2 bets at the reveal (the pinned chip was cut off and the slider jumped back from where the learner left it). The repeated worst-case sentence is gone, and the "try 4 bets" invitation is replaced by a sentence shown only if 4 bets was visited. Milestones: two-bets (2 bets, independent), together (2+ bets moving together).

1. **Title and hook.** "Split the money, keep the average" / "Does spreading money across bets cost you returns? Or just risk?" They are about the average, and the question asks the chance of a loss; neither names 25%. No.
2. **Options.** "50%" / "25%" / "0%". All percentages, same precision. Yes.
3. **Locked stage.** Chip "Model: independent coin-flip bets", the empty axes (−10%, 0%, +20% ticks), the dashed "average +5%" line, slider at 1, both mode buttons disabled, readouts "?", no seen row. Nothing matches "25%".
4. **Reveal values.** "½ × ½ = 25%": (b) milestone two-bets, in the seen row. "one rises and one falls, for +5%": the 2-bet chart's middle bar, seen at that milestone (told arithmetic, claim c2). "The average stayed +5%": the dashed line and Average readout throughout. "bars bunched ... worst case got rarer": (a) the 1/2/3-bet states in the seen row and the Chance of it readout. "with 4 bets it was 31.3%": only if 4 independent bets is in the seen row. "When you made the bets move together, 3 bets ... lost 50%": (b) milestone together, quoted from the seen row's together entries.
5. **QA path.** DOM order: slider (two ArrowRight: 1 → 2 → 3; two-bets), Bets move together (together, at 3 bets), Bets move independently (back to the 3-bet chart): 2 of 2. The seen row holds "1 bet: 50% · 2 bets: 25% · 3 bets: 12.5% · 3 bets together: 50%" when the reveal opens.
6. **Reset.** There is no Reset; the seen row only grows. Expected reveal after the QA path: "With two independent bets you lose only if both fall: ½ × ½ = 25%, as in the row under the chart. Half the time one rises and one falls, for +5%. The average stayed +5%, as with one bet. / Independent bets partly cancel: as you split further the bars bunched around +5%, and the worst case, every bet falling, got rarer. / When you made the bets move together, 3 bets lost 50% of the time, the same as one bet. Splitting only cancels risk when the bets do not fall together. / A model with made-up numbers. Real investments often fall together. Not advice." (Read from the code; this batch does not run QA.)

Status note: meta.json still says "review" from v4. v5 has not been through QA; the next QA run should confirm it before anyone treats v5 as reviewed.

## Pre-flight v6 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

W-236, c6 (disputed). "Real investments often fall together" was a claim about the world with no source anyone could open.
- The muted line now reads "A model with made-up numbers: in it, bets either move independently or all together. Not advice." It describes only the model's two modes, which are shown on the stage chip.
- c6 is reworded and set to unverified. No mechanics changed. Not run: build, QA, walkthrough.

## Pre-flight v7 (demo-builder, 2026-10-14, wave H batch 7, learner r8 / W-296)

Changes: reveal 111 → 76 words as measured (QA path, verdict included). The muted model line moved onto the stage chip ("Made-up model: independent bets. Not advice." / "... bets move together. Not advice."), as the r8 review suggested. "Independent bets partly cancel:" and "as with one bet" cut; the 4-bets sentence shortened; the together paragraph names only the last together split (bounds the longest path at about 88 words). Stage: "Worst result" and "Chance of it" readouts removed (the −10% bar's label already shows the worst case's chance); slider ("Bets split across") shares a row with Chance of a loss; "Together" / "Independent" share a row with Average; the loss row now reads "Seen: ..."; viewBox 200 → 190; chart labels 11/12 → 12/13 px so the card's reveal fit can shrink the chart to 158/190 with labels at 10 px. c1, c3, c4, c5, c6, c7, c9 unverified (c6 and c7: cm-economics to confirm the move/cut).

1. Title and hook: unchanged.
2. Options: unchanged (50% / 25% / 0%).
3. Locked stage: chip, empty chart with the "average +5%" line and axis, slider, two mode buttons, readouts "?". Nothing marks 25%.
4. Reveal values: 25% (b) two-bets milestone, in the Seen row; +5% for one-up-one-down (computed, the 2-bet bar tick); average +5% (computed; Average readout and chart line); bars bunching and worst case rarer (current chart: bar heights and the −10% bar's label); 31.3% (b) only if 4 independent bets were visited, in the Seen row; together 50% (b) together milestone, in the Seen row.
5. QA path: slider ×2 (2, 3 bets), Together (3 together), Independent (back to 3). The chart, Seen row and readouts are on screen at the reveal.
6. Reset: no reset control. QA-path reveal: "With two independent bets you lose only if both fall: ½ × ½ = 25%, as in the Seen row. Half the time one rises and one falls, for +5%. The average stayed +5%. / Splitting further, the bars bunched around +5% and the worst case, every bet falling, got rarer. / Moving together, 3 bets lost 50% of the time, like one bet. Splitting only cancels risk when the bets do not fall together."
7. Phone fit (tools/reveal-fit.mjs, localhost:3530 dev server, 2026-10-14): crop 254 px → 0 px; hiddenBelow 0; namedHidden 0; phoneFit true; stage 530 → about 400 px; chart fitted 158/190. Screenshot artifacts/reveal-fit/two-bets-split.png looked at: chip, "average +5%" line, all bars with labels, Seen row and the reveal's last line on screen. Not measured: the longest path (4 bets visited, one more reveal sentence, about +2 lines); it may crop by up to about 40 px. Not run: build, QA, walkthrough.
