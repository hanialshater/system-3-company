# Build note: accurate-bettor-takes-the-pot

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #21.
- Intent (Simulation run): one chart of the 60% bettor's share of all money over 500 races, all five seeded runs drawn thin, the selected run bold. "+50 races" steps, "Run to 500" jumps (no animation, so QA's 450 ms wait is enough). Run 1–5 select the seed. Stage line: "Win: money ratio ×1.2. Loss: ×0.8." (the cause); readout "Pool's win odds" shows the price drifting toward 60%.
- Model: pari-mutuel pool, no fees, each bettor stakes all money split by belief (60/40, 50/50), winners split the whole pool by stake. One rng() per race, win if < 0.6. Seeds 2211 to 2215 come from the brief (consecutive, not picked); the reveal quotes run 2 (seed 2212) because it shows the long lucky lead, disclosed in c2.
- Re-run with the lesson's exact draw order: shares at 50/100/200/500 match the brief for all five seeds (2212: .265 .397 .114 .988). Final shares 0.999905, 0.987766, 0.999678, 1.000000 (rounded), 0.991811; shown as "over 99.9%" above 0.9995 so nothing reads as exactly 100%.
- Milestones: full-run (race 500) and luck-run (a selected run where the 50% bettor held over half after race 50, up to the current race: runs 2 and 5). QA order (+50, Run to 500, Run 2…) reaches both.
- c5 (Blume and Easley 2006, the general result) is context only; the reveal speaks about this model.
- Not run (per dispatch): next build, QA, walkthrough, tsc.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-adult-beginner-r6.md), disputed c5
- Top finding (the per-race multiply was a caption): new first control "1 race". The caption reads "Race 1: loss, money ratio ×0.8." and a new readout "Money ratio, 60% : 50%" moves 1.00 → 0.80. Every jump's caption shows the wins and losses since the last press and their product ("Races 2–51: 31 wins ×1.2, 19 losses ×0.8: ratio ×…"). The first single race is recorded and stays as a chip ("Your single race 1: loss, ratio ×0.8"); milestone one-race (minInteractions 3).
- Second finding ("88.6% at race 200" never shown): the low point of each run where the 50% bettor led after race 50 is circled; the run the reveal quotes carries a label ("Run 5: 50% bettor 94.2%, race 176"). The reveal quotes that label, computed from the selected run (or the first such run opened).
- c5 disputed (pass 23: "closest to the truth" is false in percentage points; no learner sentence uses it): withdrawn. c2 and c3 reworded; c7 new for the captions and the ratio readout.
- Title "60% or 50%: does a little error matter?" suggested the error matters; now "60% or 50%: who ends with the money?".
- Not done: "Pool's win odds" gloss (the reviewer later rated it minor for this boundary); small axis text.

## Pre-flight v2
1. Title and hook: "60% or 50%: who ends with the money?" / "Two bettors, nearly the same belief, the same money. Bet against each other for 500 races." "Nearly the same belief" pulls toward "About equal"; nothing names a winner.
2. Options: "About equal" · "The 60% bettor" · "The 50% bettor". None carries a share; all are the same length.
3. Locked stage: model chip, "Predict first.", an empty chart with 0/50/100% gridlines (the dashed 50% line is the starting split, not an answer), a dot at 50%, readouts all "?". No run line, no circle, no final share.
4. Reveal values: "at least 98.8%" (milestone full-run; at race 500 the chart prints "Five runs end at 98.8% to over 99.9%"); "run 5 ... 94.2% at race 176" (current state: the labelled circle on the selected run, milestone luck-run); "1.2 on a win, 0.8 on a loss: your race 1 was a loss, ×0.8" (milestone one-race, recorded; still shown in the chip); "1.11" (told arithmetic from c3); "true 60%" (Pool's win odds readout reads 60.0% at race 500).
5. QA path: 1 race (one-race), +50 races (t = 51), Run to 500 (full-run), Run 2 (luck-run), Run 3, Run 4, Run 5. All three milestones in four presses; the question's case (race 500) is full-run, and the selected run's line, circle label and readouts stay on stage.
6. Reset: no Reset control; t only grows and the single race is recorded. Reveal after that path (Run 5 selected): "In all five runs the 60% bettor ended with at least 98.8% of the money. But luck can lead for a long time: in run 5 the 50% bettor held as much as 94.2% at race 176 (the circle). / Each race multiplied the money ratio by 1.2 on a win, 0.8 on a loss: your race 1 was a loss, ×0.8. Three wins and two losses, the true mix, multiply it by 1.11: a small edge that compounds. As money moves to the better belief, the pool's odds move toward the true 60%. / A simplified model: two bettors, no fees, everyone bets everything each race."
