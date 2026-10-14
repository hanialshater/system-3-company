# Learner review r11: every-second-seat-out

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v5
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: knows-recursion (same as r6/r7). Knows recursion reduces a problem to a smaller case (hanoi-tower-doubles); does not know that a counting-out game has a closed form based on the binary of n.
artifact: walkthrough against a release build on :3590 (I started it; nothing was serving there). transcript.md read first, then sheet.png. Screenshots seen: all 9 frames.
path walked: chose 1; Remove next; Run to a power of 2; Run to the end; slider back to 38; 7 people; 10 people; 41 people; reveal.

## Findings (written before reading meta.json)

- **Prediction:** 1 and 41 are the obvious "edge" guesses for this mind; 19 looks arbitrary. That is the right tension.
- **The key move is a button, and it works:** "Run to a power of 2" stops at Left: 32 with next skip 19 and prints "41 = 32 + 9 → start 2 × 9 + 1 = 19". Then "Run to the end" puts the star on 19. The reduce-to-a-smaller-case idea I already have is used directly: at 32 the starter wins, so the problem is "who starts at 32?".
- **The halving is scrubbable:** the slider with "32 left" and "lap 1 done" ticks lets me check that the count comes back to 19 after each lap. "Starts on 19 at 32, 16, 8, 4, 2 left" is printed, and I can verify it by dragging. Shown, not just told.
- **Transfer cases are good:** 7 (4 + 3 → 7) and 10 (8 + 2 → 5) fill the table and the reveal names them as the same rule.
- **Weak spot, carried from r7:** the binary rotation "101001 → 010011" is printed, never built. For this boundary it reads as a told aside. It agrees with the numbers, so it does no harm.
- **Cosmetic:** in frame 3 (9 removals) the slider tick label at the far right is clipped to "32 l". Readable from context; not a blocker.
- "next skip" is understandable after one tap (3 is skipped, 4 goes), though "skip" is an unusual word for "survives this turn".

## After reading the brief

The objective (starter survives at a power of two; 19 = 2·9 + 1; binary rotation) matches what the stage shows, with the binary part told rather than shown, as r7 found. The misconception "you have to simulate" is addressed by the three-case table. No false claim, dead control or reinforced misconception seen.
