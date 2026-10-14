# Build note: selfish-routes-cost-a-third-more

Builder: ncm-c · 2026-10-14 · from brief cs.systems, Course NCM #1 (single card, split slider drives live chart), accepted version.

- Road A 60 min; road B 60 × share. Average = 60 − 60x + 60x². Node grid search (scratchpad ncmc/check.mjs): minimum 45 at x = 0.5, ratio 60/45 = 1.333.
- Stage: one chart, average trip against share on B, current split marked; slider (0-100%, step 5, starts at 100% = the selfish equilibrium), presets "All on B (selfish)" and "Half on each", readouts for A, B and average. The note says at each split whether drivers on A want to switch, which stands for the selfish pull (the why).
- Milestones `tried-a-split` (any split below 100%), `found-best` (50%). QA's two slider presses reach the first; the "Half on each" preset reaches the second. The preset hands the answer over after the commitment; a slider-only gate would not be reachable by QA's one-press contract.
- The 4/3 bound is told in one claimed sentence (c4, Roughgarden and Tardos 2002); the externality is told in one claimed sentence (c3) and shown only indirectly (the average curve rises as B fills).
- Not run here: next build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.

## Pre-flight v3

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-adult-beginner-r6.md`

Changes: the full average-trip curve and the 30/45/60 ticks are gone; ticks are 30/40/50/60 and the chart draws only a trace of the splits the learner has visited. The hidden cost is on stage: for the last split visited between 5% and 95% a line reads "Of 100 drivers, at 50% on B: 5 more join, saving 135 min; the 50 on B lose 150." The reveal quotes that record and the lowest visited average. The title no longer says the drivers' choice failed ("Every driver chose well. Traffic didn't" → "Can a planner beat selfish drivers?").

1. **Title and hook.** "Can a planner beat selfish drivers?" / "Every driver picks the faster road. Could a planner still make the average trip shorter?" Both ask; neither says yes, no or 45. No.
2. **Options.** "No, 60 is best" / "Yes, to 45" / "Yes, to 30". Each has one number. Yes.
3. **Locked stage.** Axes with ticks 30 40 50 60 and 0% 50% 100%, one dot at 100% / 60 min labelled "60 min", readouts A 60, B 60, Average 60, caption "Everyone on B: both roads take 60 min. No driver gains by switching." No curve, no 45, no hidden-cost line. "Half on each" is a button label, not a value. Nothing matches "Yes, to 45".
4. **Reveal values.** "60 minutes": the starting state, visible as the first trace dot. "The lowest average you found was 45 minutes, with 50% on B, where B takes 30": (a) computed from the visited splits (milestone found-best puts 50% in it; the trace dot stays). "At 50% on B, the next 5 ... save 27 ... 135 in all ... The 50 already on B each lose 3, 150 in all": (a) the recorded last split, the same record the stage line prints. "60 / 45 = 4/3", "the worst it can ever be": told context, claims c4.
5. **QA path.** DOM order: slider (two ArrowLeft: 100 → 95 → 90, tried-a-split, hidden-cost line for 90%), All on B (back to 100), Half on each (found-best, line now for 50%): 2 of 2. When the reveal opens the trace dots at 90/95/100/50, the Average 45 readout and the 50% hidden-cost line are on the stage.
6. **Reset.** There is no Reset; the trace and the hidden-cost record only grow or update. Expected reveal after the QA path: "Selfish drivers all pile onto B, because B is never slower than A: everyone takes 60 minutes and no one gains by switching. The lowest average you found was 45 minutes, with 50% on B, where B takes 30. 30 is out of reach: whoever stays on A still takes 60. / The line under the chart is why. At 50% on B, the next 5 drivers to join each save 27 minutes, 135 in all, and they feel it. The 50 already on B each lose 3, 150 in all, and nobody choosing feels that. / Here selfish routing costs 60 / 45 = 4/3 of the best, a third more. With delays that are a fixed time plus a part proportional to traffic, that is the worst it can ever be." (Read from the code; this batch does not run QA. The reveal is near the 120-word budget.)
