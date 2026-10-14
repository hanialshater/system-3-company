# Build note: hailstone-27-climbs

builder: algo2-sd · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/hailstone-27-climbs.md` (+ svg) and brief #71 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (node, own script, then the Demo.tsx logic itself transpiled and run)
Step = one rule application until 1. 27: 111 steps, peak 9,232 at step 77; value at step 109 is 4 (the QA scrub). 26: 10 (peak 40). 28: 18 (peak 52). 97: 118 (peak 9,232 at step 84); longest start under 100. Matches brief and spec.

## Built as specced
Storyboard / scrub over the learner's own run. Rule line; cursor readout "Start 27 · step N · value V"; line chart with a linear y axis that grows (100, 1,000, 10,000) and never shrinks; 27 always the 2 px `--fg` line, other starts `--muted` (1.5 px while active, 1 px otherwise); dots while a run has fewer than 20 steps; x tick labels hidden until the first run reaches 1 (answer visibility). Runs table with one row per start that reached 1. Seven controls in DOM order: Step, Run to 1 (drawn in about 22 frames of 16 ms), Scrub slider (0 to steps taken, disabled until a step), chips 26 · 27 · 28 · 97 (27 active and disabled at start; switching after a finished run runs the new start to 1 at once). Milestones `27-at-1`, `another-start`; minInteractions 2. The reveal quotes only rows in the table.

## Choices and deviations
- The kit `Slider` uses one string for the visible label and the aria-label, so the slider reads "Step to show" (the spec's aria-label) rather than "Scrub". Its input is 44 px tall in the lesson CSS.
- The runs table is a three-column grid with one header row (Start, Steps, Peak) instead of "27 · 111 steps · peak 9,232" per row, to stay under 25 stage words with four rows.
- Switching to a start restarts its line from step 0 (so pressing 27 again redraws the mountain, as the spec's QA path says).
- All controls are disabled while a run is being drawn.

## Problems found in the brief or spec
None. Claim c4 (Barina 2021, about 2^68) is still "check before building" in the brief; the stage and reveal give no number, as the spec says.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
