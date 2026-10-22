# Acceptance: A-faster-link-same-wait

Verdict: accept

## Why
- The prediction makes the learner commit. Three concrete totals; "About 255 ms" (half) is the intuitive trap, and the stage stays locked until the learner picks one.
- Exploring changes their mind. One tap on "Double speed" moves the total only from 510 to 505 while the grey wait bars stay put. Batching then cuts it to 110 and 60, so the learner sees what actually helps.
- The reveal lands and is true. Recomputed: 10 x (1+50) = 510; 10 x (0.5+50) = 505 (saves 5); 2 x (5+50) = 110; 10+50 = 60; 510/60 = 8.5. The claims about latency and bandwidth, and about TCP keeping packets in flight, are correct at this level.
- It fits a phone. Every screen fits a 393-pt-wide viewport with no clipping, the controls are thumb-sized, and the reveal text sits above the fold.

## Minor defects
- The explore prompt says "Double the speed, then send 5, then all 10", which suggests the effects stack. In fact, each batching button runs on the original 1 ms link (110, not 105; 60, not 55). Only the reveal's phrase "on the original link" says so.
- On the reveal the stage jumps back to the 505 "Double speed" state while the second paragraph talks about the 60 ms batch. The picture and the text point at different results.
- "Latency is set by distance and signal speed" leaves out queuing and processing delay. That is fine for a toy model, but a little absolute.
- Explore screens leave a large empty gap between the controls and the prompt panel. It wastes space but hides nothing.
- The 0.5 ms sending ticks are too thin to see on the timeline, so "sending" in the legend has almost nothing to point at.

## Blocking defects
- None.
