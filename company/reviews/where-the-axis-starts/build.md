# Build note: where-the-axis-starts (demo-builder, wave-j-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.md` Round 4 item 60. Status draft, version 1. Claims c1-c4 unverified.

- Stage: one SVG bar chart, School A 52% (muted) and School B 56% (domain), value labels on the bars, y-axis from the chosen start to 58% with ticks every 2 points (labels thinned to keep >= 14 viewBox px apart: every 10 from 0, every 2 from 40 and 50), tick text 10 px, zig-zag break mark when the start is not 0. Bars ease 0.3 s (off under reduced motion).
- Presets in DOM order: Axis from 0%, 40%, 50% (question last). Readouts "B's bar vs A's" (1.08x / 1.33x / 3.00x as tall) and "B's value vs A's" (1.08x), "-" until the first press. Milestones axis0, axis50.
- Departure from the brief: none.

## Pre-flight v1
1. **Title and hook.** "Read the bar, or read the number?" / "Two schools' pass rates on one bar chart. What does the taller bar really tell you?" No ratio named (an earlier title "Three times as tall..." was dropped because it stated the answer).
2. **Options.** "About 1.1 times" / "About 2 times" / "About 3 times": all numbered, same precision.
3. **Locked stage.** Axis from 0 with bars 52% and 56% (heights nearly equal), readouts "-", buttons disabled. Nothing shows a ratio of 3.
4. **Reveal values.** 1.08 and 56/52: (a) fixed data, also the second readout. 6 against 2 and "3.00 times": (b) milestone axis50, the question's case, pressed last; the first readout shows "3.00x as tall" at the reveal on the QA path.
5. **QA path.** Axis 0 (axis0) -> 40 -> 50 (axis50). At the reveal: axis from 50 with break mark, readouts 3.00x / 1.08x.
6. **Reset.** No reset control. Reveal on the QA path: "B's pass rate is only 1.08 times A's: 56 against 52. With the axis starting at 50, each bar shows only the part above 50, 6 against 2, so B's bar is 3.00 times as tall. A bar's length stands for its value only when the bar starts at zero. On a cut axis, read the numbers, not the heights." (60 words)
7. **Phone fit.** See "Measurements" below.
