*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): four-in-a-row-two-thirds
lesson version: v4
boundary: ncm-learner (meta.json learner: knows the centre of a 3-path takes all, and Nash bargaining, fallback plus half of what is left; does not know that in a 4-path the inner people get 2/3, not all and not half). Same tag as r7.
Screenshots seen: yes (artifacts/walkthroughs/four-in-a-row-two-thirds/sheet.png, 5 frames, build 5 walkthrough; 05-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path walked: chose "About $0.50"; Next round; Run until settled; Reset; opened reveal.

- **No answer before the commit: pass.** "About $0.50" / "About $0.67" / "About $0.90", same precision. Locked chart ticks 0.50 / 0.75 / 1.00, no 0.67 mark; nodes "?".
- **Show the why: pass.** The header "B's fallback = $1 − C's last share $0.666 = $0.334", the dashed B–C fallback link, the hatched bars and the zig-zag strip show the cause. The right-hand tick labels no longer clip.
- **Reveal quotes what you saw: pass.** $0.750, $0.625, $0.688, $0.667 by round 9, A $0.333 and the round-2 fallback $0.250 are in the trace rows, which survive Reset.
- **The reveal fits with its picture: fail (revise).** In 05-reveal the stage top is cropped: the header chip and the A–D nodes are above the screen (only the bottoms of the circles show), and the bars and strip are a shrunk sliver with 3-5 px labels. The reveal points at "the trace rows", which are on screen, so the argument survives; the rule asks for stage-top crop 0.
- After Reset the readouts say ROUND 0, B GETS $0.500, the largest numbers on the screen, right above "Not quite: it was About $0.67". For a learner who picked $0.50, the biggest number in view agrees with the wrong guess. The trace rows carry the truth. r7 called this acceptable; it reads worse now that the readouts are the only large print left at the reveal.
- **Text budget: fail.** About 108 words with the model line, over 90 on a new version. The line-of-three paragraph (about 30 words, c4) is told context.

## 2. Earlier findings (r7, v3)

1. Reveal over budget (about 134 words): **partly fixed** (about 108; the budget is now 90).
2. Right-axis labels clipped: **fixed**.
3. After Reset the readouts contradict the reveal at a glance: **not fixed** (kept on purpose).

## 3. New findings

1. **Revise (top):** at 390x844 the open reveal crops the stage top (header chip and the A–D line), and the reveal is about 108 words. Bring it to 90 or less (candidates: the model line moves onto the stage caption; the line-of-three paragraph shortens to one clause; cm-economics decides) and measure stage-top crop 0 in Pre-flight item 7.
2. Should fix: after Reset, B GETS $0.500 sits above the verdict. Either keep the settled values in the readouts after Reset, or label them "now (round 0)".
3. Kit (W-287): bar and strip labels about 3-5 px at the reveal.
- No FATAL.

## 4. After reading build.md

Pre-flight v4 counts about 110 words by hand and has no item 7. It keeps the Reset readouts unchanged ("r7 called it acceptable"). Findings unchanged.
