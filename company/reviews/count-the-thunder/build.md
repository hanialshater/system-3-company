# Build note: count-the-thunder

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view with a km ruler; the slider is the count (0-15 s in 3 s steps, the '3 s per km' rule), arcs mark the thunder's front each second, readouts give distance and the flash's microseconds.
- Earned reveal: milestone 'six-seconds'. Readouts hidden while locked.
- After screenshots: no change needed.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- "µs" never explained, and the reveal used "millionths" while the readout used µs: the readout now shows the flash time in plain seconds ("0.0000069 s"); the reveal gives both forms side by side ("6.9 millionths of a second (0.0000069 s)").
- Reveal talked about 6 s while the screen showed 15 s: the reveal now describes the count the learner ends on ("Your 6 s count ...", or "Your 15 s count ... (6 s is 2.06 km)"). On the current QA path the slider's two steps land on 6 s, which is also the milestone.
- Arcs didn't say 343 m: the predict caption says "Each arc: one second of the thunder's trip, 343 m", and the first arc carries a "343 m" label.
- The flash arrived nowhere: a dashed yellow ray labelled "flash" runs from the bolt to you whenever a count is set, next to the arcs still on their way.
- "Divide by 3" appeared only in text: the explore caption applies it to the stage at every count ("Count ÷ 3 = 2: the strike sits near the 2 km mark"), so the learner can check it against the km ruler before the reveal.
- "Same event, two messengers" only an aside: now drawn (ray vs arcs); the line stays as the closing aside.
- Not done: a separate "now estimate this one" step (brief section 2); it would need a second stage state and a new control, and the caption check above is the smaller fix. Claim texts unchanged.
