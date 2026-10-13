# Build note: dropped-vs-fired-ball

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: one side view; freeze-frame dots every 0.25 s joined by level lines, so 'same height at every instant' is seen, not told. Landing times stay '?' until a run lands.
- Earned reveal: interact() fires only at touchdown, so the landing has to be watched.
- After screenshots: at 25 m/s the fired ball landed off-screen (50.5 m); rescaled to 5.7 px/m and added a 50 m tick so every landing is on the stage.
- Brief range 0-30 m/s capped at 25 m/s so the arc keeps its true shape on a phone.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- The reveal never unlocked in the walkthrough (the flight takes 2.02 s; the QA path waits about 450 ms per press, the walkthrough 1200 ms): added a "Jump to landing" step button after "Fire both" in DOM order. It finishes the run at once (same freeze-frame rings, landing mark, readouts) and reaches the milestone 'landed' (now via useMilestones). QA path: speed 15 -> 25 m/s, Fire both, Jump to landing: landed.
- No key for which ball is which: a legend at the top right ("dropped" dark, "fired" orange).
- Hollow circles and dashed lines unexplained: the in-flight caption says "Rings: both balls every 0.25 s. Dashed line: same height."
- No timer during flight: a clock (t = 1.25 s) runs on the stage; the readouts are "Dropped landed at" / "Fired landed at".
- "Fire both" greyed in flight next to "Try it first" (looks broken): "Jump to landing" stays live during the flight, so there is always something to press. The kit's "Try it first" label is outside my scope.
- "Then change the speed and fire again" implied a second shot was required: one landing unlocks the reveal; the hint now says "Try other speeds if you like".
- Reveal quoted 30.3 m at 15 m/s whatever the learner fired: it now lists the landing distance and speed of each run the learner saw (e.g. "50.5 m out at 25 m/s"), and says "at every speed you tried" only if they tried more than one.
- Claim texts unchanged.
- Found in local QA: on a loaded machine the 2.02 s flight sometimes landed before QA reached "Jump to landing", which was then disabled (click timeout). The flight now plays at half speed (about 4 s on screen); the clock shows the real flight time and says "(slow-mo)" while flying.
