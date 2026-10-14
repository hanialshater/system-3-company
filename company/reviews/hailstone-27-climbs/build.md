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

## Pre-flight v2

Revision for r6 (knows-repeated-rules): "111" was the only exact option; "nobody has proved" was only told; the stage cropped. Options are now three bands; title renamed (it said "long climb"); the table lists all four starts with "?" for steps and peak until each run reaches 1, under the stage line "No known formula fills a ?. Run it." The reveal points at those "?" and explains 97's overlap (it lands on 27's path at 94). Chart capped at 30dvh. c6, c7 added.

1. **Title and hook.** "How many steps does 27 take?" / "A tiny rule and a small number. How long can it run?" Both ask; neither says long or short.
2. **Options.** "Under 30", "30 to 100", "Over 100": three numbered bands, same precision.
3. **Locked stage.** Rule line, "Start 27 · step 0 · value 27", one dot at 27 on a 0–100 y axis, no x tick labels, the table with all "?" (26, 27, 28, 97), the note. No 111, no band highlighted.
4. **Reveal values.** 111 and 9,232: computed from SEQ[27], gated by milestone "27-at-1" and shown in the table's 27 column. 26/28/97 sentences: printed only if that start is in `done` (the learner ran it), and shown in its table column. 94 (the join): computed, printed only with 97's sentence; 97's trace overlaps 27's on the chart. "Each ? stayed a ? until you ran it": the table.
5. **QA path.** Step (27 → 82), Run to 1 (~350 ms; "27-at-1"; x ticks appear), Step to show slider (cursor moves), chip 26 (runs out: "another-start"), 27, 28, 97 (each runs out in < 400 ms). Both milestones; the table is full when the reveal opens.
6. **Reset.** There is no Reset; picking a start redraws that start only, and `done` never shrinks. Reveal from that run: "27 took 111 steps and climbed to 9,232 before falling to 1. Its neighbours were tiny: 26 took 10 steps, 28 took 18. 97 took 118: at 94 it lands on 27's path and follows it down. The start number tells you almost nothing about the run. Each ? in your table stayed a ? until you ran that start: no known formula gives the count. Every start that computers have checked reaches 1. But nobody has proved that every start does: the Collatz conjecture is still open."

## Pre-flight v3 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

c7 was held: "no known formula" rests on Lagarias 1985, which nobody here can open, and is a state-of-knowledge claim.
- The stage note now reads "Only running a start fills its ?." (it was "No known formula fills a ?. Run it."). The reveal now reads "Each ? in your table stayed a ? until you ran that start: only running the rule filled it in."
- c7 is reworded to describe only what the stage does and is set to unverified. c5 (the Collatz conjecture is open) is unchanged.
- No mechanics changed, so the every-control path is the same as Pre-flight v2. Not run: build, QA, walkthrough.

## Pre-flight v4

Revision for r7 (knows-repeated-rules): the reveal's "at 94 it lands on 27's path" named a value the stage never showed, and read as a step or a value. Now, once 97's run passes its step 13, a ring marks the join on 97's line and a stage line appears and stays: "97 meets 27's path at value 94 (its step 13), ringed." The reveal says "at the value 94 (its step 13)" and prints the join sentence only after that line was shown. c6 reworded, unverified. Not addressed here: the reveal frame cropping the plot top (kit fix in progress); 26/28 traces flat at the 10,000 scale (minor, the table carries the contrast).

1. **Title and hook.** "How many steps does 27 take?" / "A tiny rule and a small number. How long can it run?" Neither says long or short.
2. **Options.** "Under 30", "30 to 100", "Over 100": three numbered bands, same precision.
3. **Locked stage.** Rule line, "Start 27 · step 0 · value 27", one dot at 27 on a 0–100 axis, no x tick labels, table all "?", the note. No join line, no ring. Nothing matches "Over 100".
4. **Reveal values.** 111, 9,232: SEQ[27], milestone "27-at-1", table column 27. 10, 18, 118: printed only if that start is in `done`, shown in its table column. 94 and step 13: JOIN97 / JOIN97_STEP computed from SEQ, printed only when joinSeen (set when 97's run is drawn to step >= 13), the same text as the stage line, which persists.
5. **QA path.** Step, Run to 1 ("27-at-1"), Step to show slider, chips 26 ("another-start"), 27, 28, 97 (each runs out in < 400 ms; 97 sets joinSeen). Both milestones; table full and the join line visible when the reveal opens.
6. **Reset.** No Reset control; `done` and joinSeen never clear. Reveal from that run: "27 took 111 steps and climbed to 9,232 before falling to 1. Its neighbours were tiny: 26 took 10 steps, 28 took 18. 97 took 118 steps: as your stage line says, at the value 94 (its step 13) it lands on 27's path and follows it down. The start number tells you almost nothing about the run. Each ? in your table stayed a ? until you ran that start: only running the rule filled it in. Every start that computers have checked reaches 1. But nobody has proved that every start does: the Collatz conjecture is still open."
