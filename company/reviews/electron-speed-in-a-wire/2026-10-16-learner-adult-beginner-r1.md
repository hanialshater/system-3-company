*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: electron-speed-in-a-wire
lesson version: v2
boundary: adult beginner who knows current flows round a loop and that a lamp lights the moment you switch it on; does not know that each electron drifts at well under a millimetre a second, or that the lamp lights at once because the wire is already full of electrons that all start moving together (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/electron-speed-in-a-wire/sheet.png, recorded 2026-10-16T14:42:49Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("Under a millionth of a second").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** It did not break in a way that blocks. The stage is clear: battery, switch, 2 m wire, bulb, a 30 cm ruler under it, and the caption "1 A in 1 mm² copper wire. Tinted dot: one electron." Each button changes something visible: "Switch on" lights the bulb with "lit after ~10 ns" while the tinted electron has moved "0.00 mm"; "Wait 1 s" moves it "+0.07 mm"; "Wait 1 min" "+4.4 mm"; "Wait 1 h" "+26 cm". The contrast between the instant bulb and the motionless dot is the lesson, and it lands in frame 02. The one place this mind hesitates: after "Wait 1 h" a "2 m trip: 7.6 h" label appears. I never waited 7.6 h, so for a moment it reads like a number from nowhere. It is a fair extrapolation (26 cm an hour, 2 m to go), but nothing says "at this rate".
2. **What the prediction felt like.** A real choice. "Under a millionth of a second" is what the hook ("A lamp lights the moment you flip its switch") pushes a beginner towards, and "Several hours" sounds absurd before the explore. The question says "one electron at the switch", so the learner who picks the fast answer has been told the right thing to attend to and still gets it wrong, which is fair. A careful learner may feel half-right when the bulb lights in ~10 ns ("I said under a millionth, and it was"), but the stage separates "lit" from "trip" in the Seen row, so the distinction is on screen.
3. **Whether the reveal answered the question the learner actually had.** Yes. The question this mind has after the explore is "then how does the lamp light at once?", and the second paragraph answers it: "The faint dots are the wire's free electrons, there all along. Closing the switch pushed on all of them at once, so the ones in the bulb moved straight away." The numbers in the reveal (10 ns, 4.4 mm, 26 cm, 7.6 h, 0.07 mm a second) all match what the stage showed.

Notes (not blocking):
- "The faint dots" are faint indeed. On the sheet at phone size the wire's free electrons read as a dotted line, not as particles. The reveal points to them as evidence; a learner who did not notice them has to take it on trust. Worth checking on a single frame at 390 px whether they read as dots.
- The Seen row has no "1 s" slot, though "Wait 1 s" is a button and the reveal's "0.07 mm a second" comes from that step. The stage label "+0.07 mm" shows it at the time, then it is gone.
- The 30 cm ruler is a zoomed track for a 2 m wire. It works, but nothing says it is a magnified view; the tinted dot also moves on the circuit, so the two motions are at different scales.
- No dead end under R4: every control changes the stage; "Show me why" unlocked after "Wait 1 h".

Verdict reason: launch. No finding blocks a first-time learner; the instant bulb against the crawling dot answers the hook, and the reveal answers the follow-up question.
