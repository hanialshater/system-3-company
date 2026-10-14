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

## Pre-flight v2

Changes for r6 (fitness-knower, revise): new title, because "Bigger beetles, everyone loses" stated the answer (top finding). The curve is marked "99% at gen 24" where it crosses 99%, so the reveal's number is on stage (minor 2). "Turn 5% small" is now "Turn 5% small, run 5": it dips the share, runs 5 generations, and reports "Mutants scored 2.2 vs 4.2. 5 generations on: 100% large." It is a new milestone, `mutated` (minor 3). Restart keeps the previous run as a faded trace with its 99% mark (minor 4). Residual leak: the slug (URL) still reads "bigger-beetles-everyone-loses". Renaming a slug moves review history, so that call is for the learning designer or category manager. Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "Bigger beetles take over. Then what?" / "Large beetles out-breed small ones in every meeting. Is the population better off?" Neither says whether the average rises or falls. "Take over" gives away the invasion, which is not what the question asks.
2. **Options.** "Higher than 6", "The same, 6", "Lower than 6": all anchored on 6, same precision.
3. **Locked stage.** Payoff table (6, 2 / 8, 4, which the question also states), axes, no curve, readouts "?", "Predict first." No 4 and no falling line.
4. **Reveal values.** "1% to 99% by generation 24": (b) milestone took-over; g99 is recorded in the parent, and the "99% at gen 24" mark is on the curve (or on the faded trace after Restart). "6 to 4": (b) took-over; the average readout reads 4.0 at gen 30, and the message says "not 6". "8 vs 6, 4 vs 2": the payoff table, always visible. "About 2 vs about 4, your 5% shrank back within 5 generations": (b) milestone mutated; the message line, plus the dip and recovery on the curve (faded after Restart).
5. **QA path.** +5 generations (stepped), Run to gen 30 (took-over), Turn 5% small, run 5 (mutated, gen 35), Restart (the faded trace keeps the curve, the mark and the dip). All three milestones in three presses; no animation.
6. **Reset.** Reveal after Restart (traced from code, not run): "Large beetles went from 1% to 99% by generation 24 (the mark on the curve), and the average score fell from 6 to 4. Everyone is worse off. / Large beats small against either opponent (8 vs 6 against small, 4 vs 2 against large), so it spreads whatever the mix. Once nearly everyone is large, a small mutant scores about 2 where the large score about 4, so your 5% of mutants shrank back within 5 generations. A strategy that, once common, no small group of mutants can invade is evolutionarily stable, even when it leaves everyone with less: an arms race. / Toy model…" Matches: the faded trace keeps the curve, the 99% mark and the dip, and the message reads "Restarted. Faded: your last run, which ended at average 4.0, not 6." The readouts show gen 0 (1.0%, 6.0), labelled as the new run.
