# Build note: shake-faster-same-speed

Builder: demo-builder (wave-i-physics), 2026-10-14. Brief: `company/domains/briefs/physics.waves.md` round 3 #1. Status draft; every claim unverified.

Departures from the brief: as in head-on-is-a-wall, Send is folded into the chips. Each rate chip (½, 1, 2 per s) and each tension chip (Normal rope, 4× tighter) sends a new wave at once, because one press per control in DOM order has to reach all milestones. The trip time is measured from when the tinted first crest leaves the hand (a quarter shake after the hand starts moving) to when it reaches the far end. Timing from the hand's first movement would add 1/(4f) and make the time depend on the rate (claim c1 says so). The trip replays in at most 400 ms of wall time and reports simulated seconds.

## Pre-flight v1

1. **Title and hook.** "Shake the rope twice as often" / "Shake a rope's end more often. Does that change how quickly its waves travel?" It asks the question and does not answer it.
2. **Options.** "Twice as fast", "In the same time", "Half as fast": none numbered, all the same precision.
3. **Locked stage.** A flat rope between a hand and a post, "crest trip ? s" and "4 m rope". No crest, ruler, speed or record is shown.
4. **Reveal values.** "the same 2.0 s … at 1 and 2 a second": milestones "f1" and "f2" (each recorded; stage "1/s: 2.0 s, 2 m" and "2/s: 2.0 s, 1 m"). If the two times ever differed, the reveal would print both. "2 m/s": computed from the f1 record (4 m / 2.0 s). "2 m apart, then 1 m": the f1 and f2 records. "1.0 s, twice as fast": milestone "tight"; stage "tight: 1.0 s" and the live "crest trip 1.0 s".
5. **QA path.** ½/s (normal, sent), 1/s ("f1"), 2/s ("f2"), Normal rope (disabled, since that wave is already on screen, so QA skips it), 4× tighter ("tight", at 2/s: 1.0 s, ruler "2 m apart"). All 3 milestones. When the reveal opens, the three record lines, the live trip time and the ruler are visible.
6. **Reset.** There is no Reset control. Reveal from the QA-path run: "At 1 shake a second and at 2 a second, your crest took the same 2.0 s to cross the 4 m rope: 2 m/s both times. Shaking faster only packed the crests closer: 2 m apart, then 1 m. Speed is set by the rope, not your hand: when you made the rope four times tighter, the crest arrived in 1.0 s, twice as fast. Wavelength equals speed divided by frequency."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 shake-faster-same-speed`: fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named "2 m apart" and "4 m rope", both visible), 80 reveal words, phoneFit true. Screenshot: `artifacts/reveal-fit/shake-faster-same-speed.png`.

Stage text at most about 21 words. No console errors in the locked frame. Not run: next build, computer-use QA, walkthrough (per the task).
