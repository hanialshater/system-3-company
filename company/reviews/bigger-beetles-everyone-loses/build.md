# Build note: bigger-beetles-everyone-loses

builder: ncm-l (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card, from NCM brief 2 with the strand manager's edits. The prediction asks for the average score after large beetles take over, compared with 6 now (Higher / The same / Lower; the answer is Lower, 4). The stage shows the payoff table and the line "Score = surviving offspring, no baseline. Beetles meet at random." Below that, a share chart of large beetles over 0–60 generations is drawn as the learner steps. The controls, in DOM order, are +5 generations, Run to gen 30, Turn 5% small (enabled once large ≥ 90%) and Restart. Readouts show the share of large beetles and the population's average score. The message line gives large vs small scores, and at takeover it reads "Everyone now averages 4.0, not 6." Milestones: stepped and took-over (≥ 99%). Turning 5% small shows that the ESS resists invasion: the share climbs back.

## Answers re-run in node
- Large minus small is 2 at every mix (8 > 6, 4 > 2).
- From 1%: 4.15% at gen 5, 16.3% at 10, 52% at 15, 93.1% at 20, first ≥ 99% at 24 (0.9947). With a baseline of 10 it takes 69 generations.
- The average score is 5.98 at gen 0 (the readout shows 6.0), 4.01 at 24 and 4.00 at 30.
- Turning 5% small at gen 30 (0.9499) gives 0.9731, 0.9860, then 0.9929 after 3 generations.

## Known gaps
- The card avoids prisoner's-dilemma wording, as the edit asked. economics:prisoners-dilemma appears only in curriculum.also.
- The prediction says "After they take over", so it gives away the takeover. This follows the edit: the surprise is meant to be the average, not who wins.
- The ESS definition (c5, Maynard Smith & Price 1973) needs its attribution confirmed. All claims are unverified. References cite chapter 7 only.
- I have not run the build, QA or walkthrough (the caller said not to).
