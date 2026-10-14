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
