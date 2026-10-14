*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): every-second-seat-out
lesson version: v2
boundary: knows recursion reduces a problem to a smaller case (hanoi-tower-doubles); does not know that a counting-out game has a closed form based on the binary of n. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/every-second-seat-out/sheet.png, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Hook "41 in a circle, every second one out. Who is left?" is a question. Options 1 / 19 / 41 are all bare numbers. The locked circle shows "Left: 41, next skip: 1" and three "→ ?" readouts; nothing points at 19. "1" is the natural wrong guess (1 is never removed on lap one), and the reveal answers it.
- **The key state is on the required path.** "Run to a power of two left" stops at "Left: 32, next skip: 19" with the arrow on 19 and the line "41 = 32 + 9 → start 2 × 9 + 1 = 19". "Run to the end" then shows the star on 19. I watch the starter at 32 left become the survivor. That is the cause, on the stage.
- **The rule is checkable on three cases.** The readouts fill in "7 (4 + 3)", "5 (8 + 2)", "19 (32 + 9)", each with its own "n = 2^m + L → 2L + 1" line. I can test the rule myself on 7 and 10 before I read the reveal.
- **Reveal** quotes 32, 9, 19, the 32/16/8/4/2 starts, the binary and 7/5. All of them come from runs I made and are still in the readouts when it opens. About 85 words. It ends on "the same rule".
- Minor (shown vs told): "A power of two halves each lap and comes back to the starter" rests on the computed line "Starts on 19 at 32, 16, 8, 4, 2 left". It is true to the stage, but only the 32-left state is a stop I made. The slider has ticks only at "32 left" and "lap 1 done" (the 41-circle's lap), so 16 / 8 / 4 left with the count on 19 is never drawn unless I scrub there on my own.
- Minor (phone layout): once the runs and readouts appear, the stage is taller than the screen. In steps 4 to 8 the top of the circle is cropped ("Left: 1" is cut in half). At the reveal no circle shows at all, only the readouts. The quoted values survive in text, but the picture does not.
- Minor: the stage text at the end (instruction, three buttons, two formula lines, slider label, ticks, people chips, three readouts) is well over 25 words.
- Minor: the binary rotation "101001 → 010011" is printed but not built; for this boundary it reads as a told aside, though it agrees with the numbers.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| 1. Power-of-two step and binary form not required to be seen; only milestone was survivor-41 | fixed: "Run to a power of two left" stops at 32 left / next skip 19 with the 41 = 32 + 9 line; binary is now on stage |
| 2. Reveal opens with an instruction about an unvisited state ("Scrub to removal 9") | fixed: reveal now quotes the visited 32-left state |
| 3. Circle cropped at the top on 7 and 10; reveal shows half a circle | not fixed: still cropped in steps 4 to 8, and no circle shows at the reveal |
| 4. "Same rule" for 7 and 10 not shown | fixed: "(4 + 3)" and "(8 + 2)" labels and per-case formula lines |
| 5. Reveal dense, near budget | partly fixed: about 85 words, clearer, still arithmetic-heavy |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
