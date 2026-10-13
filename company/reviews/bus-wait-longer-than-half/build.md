# Build note: bus-wait-longer-than-half (demo-builder, 2026-10-13)
- Retitled "Buses every 10 minutes, on average" (the slug "longer than half" gives the answer away).
- Stage: 8 hours of random buses (exponential gaps, mean 10, mulberry32 seed 1010, untuned) as ticks on four 2-hour rows; gaps over 15 min shaded; riders (seed 1011) as dots, the first 11 with a red wait line to the next bus.
- Controls in DOM order, each enabling the next: "Drop 1 rider", "Drop 10 more", "Drop 200 more", "Regular buses" (toggle; same riders, buses every 10 min). Gate: "many" (211 riders) and "regular".
- The run's average gap is 9.5 min, not 10, so the stage shows it as a readout and the reveal compares the 9.4-min average wait with the run's own 9.5-min gap, then the 5.2 min for regular buses. The question keeps "10 minutes on average" because that is the process the stage samples (c1, c3).
- "Average wait" hidden while locked.
