# Build notes: wages-bought-more-wheat

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #7. Numbers: history-cycle1-check.mjs section 7 (all checks pass).

- The 53 rows of Wheat.csv (Year, Wheat, Wages; NA after 1810) are copied into Demo.tsx unchanged. Every multiplier and the best and worst years are computed in the component with the check script's formulas.
- Before: wheat price bars, 1565-1821 (the locked frame). "Playfair's chart" adds the wage line on its own right-hand axis. This is our re-draw from the data, not a trace of the original. After: one line, quarters of wheat a week's wage buys (wage / price), 1565-1810.
- Presets in DOM order, each setting the full view: Playfair's chart, Wages divided by price (milestone `ratio`), Mark the best year (milestone `best`), Mark the worst year (keeps the best-year mark and adds the worst). There is no Reset button.
- Deviations from the brief, for cm-history to accept or reverse:
  1. The reveal unlocks after `ratio` **and** `best`, not after `ratio` alone. The reveal names 1785, and the demo standard requires every quoted state to be gated or computed from what the learner sees.
  2. The preset labels "Best year" and "Worst year" became "Mark the best year" and "Mark the worst year". At the reveal the control row folds (`foldAtReveal`), and reveal-fit counted the hidden "Best year" button as a stage label the reveal quotes ("off screen: best year"). The picture's own label ("best year 1785: 0.55") is what the reveal points at, and it stays visible.
- The two readouts were merged into one ("1565 to 1810: wheat ×2.4, wage ×6: buys ×2.5 the wheat") so that the stage fits with the reveal.
- Held source sentence: "Playfair drew price and wages on two different scales" (c5), with its fallback. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "Dearer bread, poorer workers?" / "Wheat got much dearer over 250 years. Did that make a working man poorer?" They state the tension, not the answer.
2. **Options.** "Less: about 40% as much" / "About the same" / "More: about 2.5 times as much". The two outer options are numbered. "About the same" is a ratio of 1 and needs no number. This is the brief's wording after the W-742 re-check.
3. **Locked stage.** It shows the wheat price bars and their axis (0-100 shillings), plus the readout "wheat ×2.4", which the question already states. There is no wage line and no ratio, so nothing matches "2.5 times".
4. **Reveal values.** 2.4 is computed (99/41) and on screen in the readout in every view. 6 is computed (30/5) and in the readout from Playfair's chart onward. 2.5 is computed (2.48) and gated by `ratio`, in the readout in the ratio views. 1785 is computed (max of wage/price) and gated by `best`; it is labelled "best year 1785: 0.55" in the best and worst views.
5. **QA path.** Pressing the 4 presets in DOM order reaches `ratio` (press 2) and `best` (press 3). It ends in the worst view, which still shows the 1785 label, the ratio line and the readout with ×2.4, ×6 and ×2.5.
6. **Reset.** There is no Reset button. Reveal text from the run: "Wheat cost 2.4 times as much in 1810, but wages rose 6 times, so a week's pay bought 2.5 times as much wheat. Playfair drew price and wages on two different scales, which hides this ratio; dividing one by the other shows it as one line. On his own figures the best year for wages in wheat was 1785, not the last one. Where it stops: this is one trade's wage and one food, not a cost of living."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, phoneFit true, 89 reveal words with the verdict line (the brief's script counts 79 without it). The control row folds at the reveal. The svg labels are 11 px in a 340-wide viewBox at about 330 px, so at least 10.6 px.
