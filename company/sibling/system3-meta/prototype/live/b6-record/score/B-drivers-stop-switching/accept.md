# Accept: B-drivers-stop-switching ("Do selfish drivers ever settle?")

Verdict: accept

## Why
- Prediction commits: three distinct outcomes (stops / flips for ever / depends on order), each a real belief, locked before the stage moves. The question states the setup clearly in two sentences.
- Exploring earns the answer: "One at a time" settles in 3 switches with the meter falling 255 -> 210 -> 180 -> 165, and "All at once" shows the same crowd flipping 55 -> 60 -> 55 -> 60 min. That contrast is what would change the mind of someone who picked "for ever".
- The reveal is true. I recomputed it: A=10n, B=25+5m. All on B is 55 min and the meter is 30+35+40+45+50+55 = 255. The switches save 55-10=45, 50-20=30 and 45-30=15, giving meters 210 (10+200), 180 (30+150) and 165 (60+105). At 3/3 it ends at A 30 / B 40, and nobody strictly gains (A->B would be 45, B->A would be 40, a tie). All on A is 60 min and the meter is 10+...+60 = 210. Taking 6 on A to 5 to 4 also stops (4/2 is the other equilibrium, meter 165). The farthest start from any equilibrium is all on B, 3 moves away, so "64 starts stop within 3 switches" holds (2^6 = 64). The potential argument (Rosenthal) is stated correctly.
- It fits a phone: every state fits one 1082x2202 screen without scrolling, the buttons are thumb-sized and the reveal text is readable.

## Minor defects
- "Start over" (step 3) resets the picture to all on B / meter 255 but leaves the stale history ("settled: A 30 · B 40", the flip lines) underneath. For a moment it reads as if the current state is settled.
- "One at a time" jumps straight to the final 3/3 state in the screenshot. The learner never steps through a switch themselves, so the exploring is two button presses rather than choices.
- The "meter" (the potential function) is shown on the predict screen before it is explained. It is abstract jargon, and the 1+2+...+n-cars rule is only spelled out in the explore panel.
- "All at once, the meter rose again": the step the learner actually sees after tapping it shows the meter *falling* to 210. The rise appears only in the 255 -> 210 -> 255 summary line.
- The question says "faster" but the settled state depends on a tie (B->A would be 40 vs 40). "Strictly faster" appears only in the trust sheet.
- Large empty band above the stage in the explore steps, while the table and text below are cramped.
- The trust sheet's teaching evidence is 0 human-learner studies.

## Blocking defects
- (none)
