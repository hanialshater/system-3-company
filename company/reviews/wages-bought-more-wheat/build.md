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

## v2 (2026-10-15, demo-builder, branch hrA: W-989, learner r1)
- Numbers re-derived in node from the pinned Wheat.csv (sha256 holds): 1565 41 s / 5 s, 1810 99 s / 30 s; wheat ×2.41, wage ×6.00, buys ×2.48 (0.122 -> 0.303 quarters); best 1785 0.548, worst 1595 0.087. All match the stage.
- Finding 2 (axis title cut at the reveal): at 390x844 this dev server showed crop 0 already; at 412x839 (the walkthrough's Pixel 7) it cropped 27 px, which is what the reviewer saw. Fixes: readout value shortened to one line ("wheat ×2.4, wage ×6: buys ×2.5"; was "... buys ×2.5 the wheat"); the reveal's second paragraph shortened ("two different scales" -> "two scales"; "On his own figures the best year for wages in wheat was 1785, not the last one" -> "On his figures the best year was 1785, not the last"); and the best-year label carries its unit ("best year 1785: 0.55 quarters"), so the quoted value keeps a unit even if the axis title is ever off screen. The worst-year label stays unitless (with the unit it ran over the line near 1730).
- Not done: the "quarter (8 bushels)" gloss (finding 3) and the distractor change (finding 1, options); the options are cm-history's call with the title.
- **Title and hook: proposed, not shipped (cm-history rules, W-991).** Current: "Dearer bread, poorer workers?" / "Wheat got much dearer over 250 years. Did that make a working man poorer?" (a double yes/no that cues "no"). Proposal: title "Wheat prices and a week's pay"; hook "Wheat cost about 2.4 times as much in 1810 as in 1565. What could a mechanic's week's pay buy?" (the hook's number is c2, already on the locked stage readout and in the question). Also for the ruling: the right option "More: about 2.5 times as much" sits beside the question's "2.4", which the reviewer read as a cue; one fix is "More: about 2½ times as much" or a distractor that is not near 2.4. meta.json title and hook are unchanged.
- Claims: c4 (label unit, reveal wording), c5 (wording) reset to unverified. I verified none. meta.json version 2.
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3671: 390x844 fit, crop 0 px, hidden 0, namedHidden 0, phoneFit true, 82 reveal words with the verdict line; 412x839 fit, crop 0 px, phoneFit true.
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3671, QA_ONLY = the five W-989 lessons): phone and desktop pass (10/10, artifacts/qa-hrA-w989/qa-report.json). Dev server, not a production build.

## v3 (2026-10-15, demo-builder, branch patience: W-1024, cm-history r1-revision ruling 1; FC48 c5 source fix)

- meta.json title "Wheat prices and a week's pay"; hook "Wheat cost about 2.4 times as much in 1810 as in 1565. What did a mechanic's pay buy?" (85 characters), exact ruling text.
- Demo.tsx options now carry no number: "Less: under half as much" / "About the same" / "More: over twice as much" (answer index 2, unchanged). Re-derived from the pinned Wheat.csv (sha256 holds): wheat x2.415, wage x6, buys x2.48 (> 2, so C); 1/2.41 = 0.41 (< 1/2, so A is the "wages stood still" answer). Reveal unchanged.
- c2 text gains its hook address; c5 source no longer says HELD and names the HistData Wheat doc FC48 opened. Both reset to unverified.
- Not done here (cm-history's follow-up): brief 7 and history-cycle1-check.mjs section 7 options/pick.
- reveal-fit (dev server, tool clean): 390x844 fit, crop 0, phoneFit true, 81 words; 412x839 fit, crop 0, phoneFit true. QA contract: phone and desktop pass.
