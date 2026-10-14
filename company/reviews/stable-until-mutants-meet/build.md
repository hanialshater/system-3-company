# Build note: stable-until-mutants-meet

builder: ncm-l (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card, from NCM brief 4 with the strand manager's edit. The stage shows the payoff table (A 2/1, B 2/3) and the line "Score = surviving offspring, no baseline. Meetings are random." Below that, a chart of B's share over 0–130 generations is drawn as the learner steps. The controls, in DOM order, are +10 generations, Run to gen 120 and Restart. The readouts show the share playing B (one decimal below 10%) and B's edge over A (2y). That edge is the stage's stand-in for the cause: it is tiny while B's rarely meet and grows as they spread. Milestones: stepped and swept (gen ≥ 111).

## Answers re-run in node
- A averages 2 − y and B 2 + y. At 1% B the scores are 1.99 and 2.01 (edge 0.02).
- From 1%: 1.11% at 10, 1.96% at 50, 21.0% at 100, first ≥ 99% at 111 (0.9963), 100% at 120.
- **Discrepancy with the brief:** the edit says that with a baseline of 10, B "reaches only 1.2% by 400 generations". My run of y' = y(12 + y)/mean W gives 2.9% at 400. The conclusion (much slower, so the card must say no baseline) still holds, but the number is not the brief's. It appears only in c3's source, not on the card. The strand manager (cm-life-genetics-evolution) should recheck.

## Known gaps
- The options were reworded slightly from the brief ("No" became "No, they die out"; "They stay at 1%" became "They stay at about 1%"), so that A and C are distinct.
- The ESS conditions (c2) need their attribution confirmed. All claims are unverified. References cite chapter 7 only.
- I have not run the build, QA or walkthrough (the caller said not to).
