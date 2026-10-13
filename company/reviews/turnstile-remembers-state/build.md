# Build note: turnstile-remembers-state (demo-builder, 2026-10-13)

- Design intent: one two-state diagram (Locked, Unlocked) with four labelled arrows (coin unlocks, push passes and locks, push-while-locked loop, coin-while-unlocked loop). The question's six events are the tape under it; tapping event k plays events 1..k, lights the current state and the arrow just taken, and a "Passed" readout counts people (hidden as "–" while locked).
- Deviation from brief: no free coin/push buttons. The tape is the control so every tap stays on the question's sequence and QA (one press per control, DOM order) plays the whole trace in order.
- Key state: event 5 (second coin in a row, "already unlocked, no change") and event 6 (last push). Milestones ["second-coin", "last-push"], minInteractions 2. QA path: chips 1..6.
- Numbers: the question's events, the options (2, 3, 4), "event 5" and "2 people" come from EVENTS/run() in Demo.tsx. Re-computed in Node with an independent loop: 2.
- Retitled: brief slug says "remembers state", which is the answer; title is "How many get through the turnstile?".
- After screenshots: diagram and tape read on phone; reveal sits over the finished trace (event 6, Locked, Passed 2).
