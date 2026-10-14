*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): hailstone-27-climbs
lesson version: v1
boundary: knows a rule can be applied repeatedly (lesson call-stack-depth); does not know that tiny rules give wildly different run lengths, or that nobody has proved they all stop (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/hailstone-27-climbs/sheet.png)
Verdict: revise

## 1. From the artifact
- Hook and title fit (a tiny rule; how long can it run?). The rule is printed on the stage too, which helps.
- Predict, where it first broke: the options are "Under 30", "111", "Never reaches 1". Two are rough bands and one is an exact number. An exact number among vague ones reads as the answer: I would pick 111 because someone obviously computed it, not because I expected a long climb. The wrong guess the lesson needs ("small start, short run") has no real competitor except "Never", and the exact option gives the answer away. Locked stage: 27 at step 0 on a 0–100 axis, which leaks nothing.
- Explore: "Step" takes 27 to 82, which makes the rule concrete. "Run to 1" rescales the plot to 10,000 and draws the jagged climb to 9,232 near step 80. That is the surprise, and it is on stage. The table (start / steps / peak) builds up as I tap 26, 28 and 97: 10/40, 18/52, 118/9,232. The neighbours' tiny runs make the point in the table. On the plot, the 26 and 28 traces flatten into the baseline at the 10,000 scale, so the table is doing the work.
- 97 draws a trace that overlaps 27's almost exactly (same peak, 9,232). Nothing says why (97 joins 27's path). A curious learner wonders, but it is not a blocker.
- Layout: at step 4 and on the reveal the stage crops. The start buttons are cut at the bottom, and on the reveal the plot's top (the peaks and the rule line) is cut off.
- Reveal: 111 / 9,232 / 10 / 18 / 118 all match what I saw. "The start number tells you almost nothing" points at the table. The Collatz-open sentence is told context.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json.

## 3. Show the why you promised

doesNotKnow has two parts:
- "Tiny rules make wildly different run lengths" is shown. The 27 climb and the 26/28/97 table are on stage, and the reveal points at them.
- "Nobody has proved they all stop" is only told, in the reveal's last sentence. Nothing on the stage stands for it. Under the decision, a doesNotKnow item that is only told is a revise. A stand-in that reuses the stage could be the learner seeing that a run's length can only be found by running it (for example, a start whose run length is hidden until it finishes, or a label on the run-to-1 button such as "the only way to know: run it"). If the head of product judges "unproved" to be context that cannot be shown, the brief should move it out of doesNotKnow. That call is not mine.

## 4. New findings

- Blocking (top finding): the option "111" is an exact number among vague bands, so it gives the answer away. Use bands of the same kind (for example "Under 30", "About 50", "Over 100") or three exact numbers.
- Blocking: "nobody has proved every start reaches 1" is a doesNotKnow item that is only told (see section 3).
- Should fix: the stage crops at the bottom (start buttons) mid-explore and at the top (peaks) on the reveal.
- Minor: at the 10,000 scale the 26 and 28 traces are invisible; the table carries the contrast. A log scale or a short-run highlight would let the picture make the point.
- Minor: 97's trace overlapping 27's is unexplained.
- No FATAL.
