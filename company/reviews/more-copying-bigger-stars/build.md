# Build note: more-copying-bigger-stars

builder: ncm-p2 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Simulation run. Three horizontal bars share one linear axis (0-7,000 links), one bar per copying share (0%, 50%, 90%). Each bar shows how many in-links the biggest page has.

Controls in DOM order:
- Run 0% copying, Run 50% copying, Run 90% copying. Each fills its bar and then disables itself.
- A "Pages so far" slider (1,000-10,000) that rewinds every bar to that point in the growth.
- Next seed, which cycles seeds 1-3 and clears the bars.

Readout: the share of links held by the top 1% of pages, for the last run. Milestones: ran-0 and ran-90.

## Generator (pinned)
- mulberry32(seed) with seeds 1-3. Two draws per page, and the same draws for every copying share.
- Page 0 starts the world. Page i, with chance c, copies the link of a uniform page in 1..i-1. Otherwise it links uniformly to a page in 0..i-1.
- All nine runs are computed once at module load.

## Answers re-run in node (lesson's own generator)
- Biggest page at 10,000 (0% / 50% / 90%): seed 1 gives 12 / 160 / 6,278, seed 2 gives 18 / 179 / 4,537 and seed 3 gives 12 / 158 / 5,122.
- The top 100 pages hold about 7%, 26-27% and 84-86% of links.
- The cm re-run gave 12/18/12 and 6277/4536/5121. Mine is one higher at 90%, probably because of a different start rule. The answer "Hundreds of times more" holds either way: the ratio is 252-523.

## Known gaps
- At 0% the bar is a 2 px sliver on the shared axis. This is deliberate, and the number is printed next to it.
- Brief claim 3 (exponent 1 + 1/c, Kumar et al.) is not shown to the learner, so it is not recorded as a claim.
- All claims are unverified.
