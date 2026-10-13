# Build note: growth-gap-seventy-years

builder: demo-builder · 2026-10-13

- Intent: two bars (income as a multiple of the start), scrubbed by year; the bar scale is fixed at the faster country's year-70 value for the chosen gap, so the bars grow visibly as the years run.
- Milestone: year 70 with the 1-point gap. DOM order: a "Year 70" jump button first (QA's first press reaches it), then the year slider (QA presses Left twice from 70, so it ends at 68), then the 0.5/1/2-point gap tiles.
- Bar values and the ratio readout are hidden while locked; at year 0 both are 1.
- The reveal quotes the year-70, 1-point figures (gated) and other gaps only if the learner viewed them at year 70.
- Changed from the brief: a jump button beside the slider, because a slider alone cannot reach year 70 in QA's two presses.
