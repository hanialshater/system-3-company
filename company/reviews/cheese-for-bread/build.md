# Build note: cheese-for-bread

builder: demo-builder · 2026-10-13

- Intent: two rows of 8 hour cells (Ana, Ben), each bread or cheese and showing its output; sliders in 2-hour blocks (Ben: hours on cheese; Ana: hours on bread).
- Brief asked for 16 draggable tokens; replaced with two sliders so QA's two-arrow path reaches the key state (Ben 8 cheese, Ana 6 bread = 12 cheeses, 24 loaves), the only such plan on the 2-hour grid.
- Milestone: same 12 cheeses and more than 20 loaves.

## Revision v2

Wave C, builder 11, 2026-10-14, from the latest learner review and fact-check. Options equally specific; caption shows the current split; "1 cheese costs Ana 2 loaves, Ben 1 loaf" on stage; counters turn green at 24/12; new "Ana bakes in her spare hours" button (disabled when it changes nothing); reveal shortened. c3 edited, unverified.
QA contract: pass (phone and desktop). Claims edited are unverified and need a fact-check pass.

## Revision v3 (wave C builder 13, 2026-10-14)

- Board W-168: on a phone the last slider was clipped. Fix: tighter stage CSS (smaller gap, svg minimum height 70 px, stage scrolls if still too tall).
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.
