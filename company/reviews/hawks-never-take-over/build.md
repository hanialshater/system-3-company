# Build note: hawks-never-take-over

builder: ncm-l (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card, from NCM brief 1 (company/domains/briefs/life.genetics-evolution.md). The payoff table comes first (hawk −1/4, dove 0/2), then one chart: hawk share across 150 generations. The starting-share slider (1–99%) redraws the whole run at once, and the last three runs stay as faint dashed lines, so "from either start" shows as lines meeting. The controls, in DOM order, are Start at 10%, Start at 90% and the slider. The opening start is 30%, so both presets change the stage. A message line gives the hawk and dove scores at the start ("hawk 3.5, dove 1.8. Hawks grow."). Readouts give the share at generation 150 and both scores there (0.7, 0.7). Milestones: from-few (start ≤ 20%) and from-many (start ≥ 80%).

## Answers re-run in node
- Scores: hawk 4 − 5x, dove 2 − 2x; equal at x = 2/3 (both 0.667). At 10%: 3.5 vs 1.8. At 90%: −0.5 vs 0.2.
- Offspring = 10 + score, x' = x·W_H/mean W: every start from 1 to 99% rounds to 67% at generation 150. 10% gives 0.6666 and 90% gives 0.6667; both are 0.66667 at 400 (this matches the brief's check).

## Known gaps
- The brief's cross-reference (someone-has-to-swerve) is not built on this branch, so the reveal does not name it. It lives only in curriculum.also (economics:hawk-dove-chicken).
- The baseline of 10 is shown on the stage ("Offspring = 10 + score"). It changes the speed but not where the share settles; the claim says so.
- All claims are unverified. c4 (V/C as the ESS, Maynard Smith 1982) needs its attribution confirmed. References cite chapter 7 only.
- I have not run the build, QA or walkthrough (the caller said not to). The QA path is my own reading of the code: preset 10%, preset 90%, then the slider, and each one changes the chart.

## Pre-flight v2

Revision for r6 (adult-beginner): the title "Why hawks never take over" and the hook ruled out "100% hawks", and "About 67% hawks, from either start" was the only precise option. New title and hook; four options, each naming a share; the stage line derives the −1 ("Two hawks: win 4 or lose 6, so (4 − 6) ÷ 2 = −1."); the reveal's end shares are computed from the learner's own low and high starts; chart capped at 24dvh so the reveal does not crop it. c6 added.

1. **Title and hook.** "Hawks and doves: who wins?" / "Hawks fight for the prize; doves share it. What mix does the population end up with?" Neither rules out an option.
2. **Options.** "Nearly 100% hawks", "About 67% hawks", "About 33% hawks", "Near its start (10% or 90%)": every option has a share, same precision.
3. **Locked stage.** Payoff table (−1, 4 / 0, 2), the −1 derivation line, a chart with axes 0/50/100% and "?", readouts "?". No line at 67%, no end value.
4. **Reveal values.** "From 10% and from 92% hawks": min of the learner's starts ≤ 20% and max ≥ 80% (milestones "from-few", "from-many"; `seen` lives in the lesson, so it survives). "ended at 67% and 67%": endPct() of those same starts, the same rounding as the chart's end label; the current run's label and the dashed earlier runs show it. "4 vs 0", "−1", "0": the payoff table and stage line. "4 ÷ 6 = 2/3": told (c4), pointing at the equal-scores readout.
5. **QA path.** Start at 10% ("from-few"), Start at 90% ("from-many"), slider two presses (91%, 92%). Both milestones; at the reveal the 92% run is drawn with the 10% and 90% runs dashed behind it, all ending at 67%.
6. **Reset.** No Reset control. Reveal from that run: "From 10% and from 92% hawks, the share ended at 67% and 67%: two hawks in three. Aggression did not take over. A hawk meeting a dove takes the whole prize (4 vs 0), so hawks grow while they are few. Two hawks fight and average −1, while a dove facing a hawk just backs off (0), so hawks shrink once they are many. The share settles where both score the same: prize ÷ cost = 4 ÷ 6 = 2/3. That mix is evolutionarily stable."
