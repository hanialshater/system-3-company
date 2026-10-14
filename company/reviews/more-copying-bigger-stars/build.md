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

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-rich-get-richer-r6.md`

Changes: the title no longer crowns a giant ("Copy a link, crown a giant" → "What does copying do to the top page?"). The bar axis scales to the runs shown, and the locked stage has no ticks (the fixed 0-6k axis hinted at big numbers). A results table keeps every run at 10,000 pages (biggest page, top 1%, and how many of the last 1,000 new links went to the page leading at that moment); Next seed does not clear it. The reveal quotes the latest seed in which the learner ran both 0% and 90%, from that table (v1 quoted seed 2 after Next seed had cleared it). The "to the leader" column is the rich-get-richer cause on stage: 576 of 1,000 at 90% against 0 at 0% (seed 1). Milestones: ran-0, pair (0% and 90% in the same seed).

1. **Title and hook.** "What does copying do to the top page?" / "New pages copy each other's links. Does the top page get a bit bigger, or far bigger?" The hook names two of the options at the same weight. No.
2. **Options.** "About the same" / "About double" / "Hundreds of times more". None numbered, all rough sizes. Yes.
3. **Locked stage.** "Seed 1 · 10,000 pages so far"; caption "links to the biggest page"; three rows "0% copy / 50% copy / 90% copy" each "not run"; no ticks; buttons and slider disabled; "Top 1% of pages hold –"; no table. Nothing points at a size.
4. **Reveal values.** "seed 1", "12 links with no copying and 6,278 with 90%", "about 523 times", "7% ... 84%": (b) milestone pair, read from the table rows for that seed. "576 of the last 1,000 ... with none, 0": (b) same rows, last column. "500 links ... 500 times more likely": told derivation, claim c4.
5. **QA path.** DOM order: Run 0% (ran-0), Run 50%, Run 90% (pair), slider (two ArrowLeft: 10,000 → 8,000), Next seed (bars cleared, seed 2): 2 of 2 in the first three presses. When the reveal opens the table still lists seed 1 at 0%, 50% and 90%.
6. **Reset.** There is no Reset; Next seed clears the bars but not the table, and the reveal reads the table. Expected reveal after the QA path: "In your seed 1 runs (the table), the biggest page ended with 12 links with no copying and 6,278 with 90% copying: about 523 times more. The top 1% of pages went from holding 7% of all links to 84%. / The last column is why. With 90% copying, 576 of the last 1,000 new links went to the page already in the lead; with none, 0. A copier links to whatever a random link points at, so a page with 500 links is 500 times more likely to be copied than a page with one. / The copying share does not nudge the winner. It decides how big the winners get." (Read from the code; this batch does not run QA.)
