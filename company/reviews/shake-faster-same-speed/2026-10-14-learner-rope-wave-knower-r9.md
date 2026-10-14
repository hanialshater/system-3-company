*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): shake-faster-same-speed
lesson version: v1 (meta.json version 1)
boundary: rope-wave-knower (the lesson's own: knows waves travel along a rope or slinky and that shaking harder makes bigger waves; does not know that wave speed on a rope is set by its tension and mass per length (v = sqrt(T/mu)), or that shaking faster only shortens the wavelength (lambda = v / f)). First learner review of this lesson.
Screenshots seen: yes (artifacts/walkthroughs/shake-faster-same-speed/sheet.png, release build recorded 2026-10-14T15:27Z, 6 frames; 06-reveal.png opened at full size). Frames are stills; I could not see crest motion.
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("Twice as fast"), the pick my boundary makes.

1. **Where it first asks for an idea I don't have: nowhere on the required path.** "Twice as often" is plain; the stage only needs me to read a trip time and a spacing.
2. **No answer before the commit: met.** "Twice as fast / In the same time / Half as fast": the right one is worded as a time, not a speed, but it is no more precise than the others. Locked stage "crest trip ? s", presets disabled.
3. **Shows the why: met for the main idea.** "1/s: 2.0 s, 2 m" and "2/s: 2.0 s, 1 m" sit side by side as trace rows, the rope visibly has twice as many waves at 2/s, and the "1 m apart" bracket shrinks. "4× tighter" gives "tight: 1.0 s", so the rope, not the hand, changes the speed. All three rows are on stage at reveal.
4. **The reveal shows the payoff: met.** 2.0 s, 4 m, 2 m, 1 m, 1.0 s are all on stage at reveal (06-reveal). "2 m/s" is not on the stage, but it is 4 m ÷ 2.0 s from two numbers that are; acceptable, though a speed readout would make "speed" something I can see rather than compute.
5. **Where I am left with a question: "four times tighter ... twice as fast".** I would ask "why twice, not four times?". The reveal does not say; the brief-side idea (speed goes with the square root of tension, and with mass per length) is neither shown nor told. Not a revise for the core misconception, but the second gap's mechanism is only half covered: tension is shown to matter, its law is not.
6. **"Wavelength equals speed divided by frequency" is told.** The stage supports it (2 m at 1/s, 1 m at 2/s, 2 m at 2/s tight), but no speed readout lets me check it at a glance.
7. **Fit and budget: met.** Reveal 72 words; 06-reveal ~795 CSS px tall, stage top and last line on one 390×844 screen.
8. Trust line reads 0/5 claims checked (fact-checker's gate).

Where understanding first broke: it did not; the closest point is the unexplained "twice" from "four times tighter" (finding 5).

## After reading build.md

Read after the section above; no earlier reviews exist. Nothing in build.md changes the findings. Findings 4–6 are candidates for a v2 (a speed readout), not launch blockers.
