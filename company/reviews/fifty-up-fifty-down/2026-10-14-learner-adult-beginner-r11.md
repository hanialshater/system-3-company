# Learner review r11: fifty-up-fifty-down

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v2
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: adult-beginner (same tag as r6-r8). Knows what a percentage of a number is and that a rectangle's area is width × height; does not know that successive percent changes multiply, or (1 + p)(1 − p) = 1 − p².
artifact: walkthrough against a release build on :3590 (I started it). transcript.md read first, then sheet.png. Screenshots seen: all 3 frames.
path walked: chose 100; slider to 50%; reveal.

## Findings (written before reading meta.json)

- **Prediction:** 100 is the honest wrong answer for this mind; the hook ("Surely you are back where you started?") invites it. Good tension.
- **One move, one picture, and it works:** at 50% the dashed start square, a rise column to the right, a fall band across the whole risen width and a darker "lost 25" corner appear together, with "Up 50%: 150. Down 50% of 150: 75." under it. My rectangle-area knowledge is enough to read it.
- **Weak spot (not a blocker): label placement.** "rise +50" sits in the bottom-right cell, which is only half of the rise column (the other half is the "lost 25" corner), and "fall −75" sits in the top-left cell, which is only 50 of the 75. A careful reader who checks areas against labels has to work out that the corner belongs to both the rise and the fall. The reveal's "across the whole risen width" helps; the picture alone is ambiguous on first look.
- **Weak spot:** "even 10% up then 10% down ends at 99" is told; the slider would show it, but the path ends after one move. The general 1 − p² is never named; "the corner you never get back" stands for it.
- Reveal fits; the picture stays visible above it.

## After reading the brief

The objective (the fall is taken from the larger amount; result 1 − p²) is shown as one instance with the corner as p². The identity in doesNotKnow is present only as the picture, not as a formula; for a 60-second lesson that is a fair trade. The misconception "they cancel" is directly answered. No false claim, dead control or reinforced misconception seen.
