*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): each-element-pops-once
lesson version: v2
boundary: adult-beginner. Knows a stack is last-in-first-out (back-button-stack); has never met "next bigger to the right" or the waiting-stack trick (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/each-element-pops-once/sheet.png, build 4 at :3480)
Verdict: revise

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (5 frames). Chose option 1 ("36").

1. **The question's case is the case with no pops.** The prediction is about 9 8 7 … 1, where every new number meets a bigger top once and is pushed: 8 comparisons, 0 pops. The title is about waiting for a bigger number and the reveal is about each number being popped exactly once, but in the case I predicted nothing is ever popped. As a beginner I come away from the predicted case with "the stack checks once per number", which is true here only because the list is sorted. The pop-once idea lives in the second list (8 … 1 9), which I tapped because it was there, not because the question asked about it.
2. **The second list does show the why.** On 8 … 1 9 the 9's row gets 8 solid green ticks labelled "8 pops", every earlier number gets "9✓" as its answer, and the other numbers each get one hollow tick. "Every comparison either pops a number or ends that number's turn" has a picture: solid = pop, hollow = end of turn. That is the strongest part of the lesson.
3. **Hollow vs solid ticks are hard to tell apart on a phone.** The hollow ticks in the stack column are tiny outlined rectangles next to tiny digits. The reveal depends on that distinction ("a hollow tick", "8 solid ticks"). On the sheet I could see it only by looking closely.
4. **Two charts at once.** The scan bar chart (left) and the stack column (right) sit side by side with small labels, plus two summary cards, two feed buttons and two list buttons. At the moment of the 8 pops I was looking at the right column; the left one only mattered for its total (36). It is a lot to hold on a phone, but the summary cards ("scan 36 · stack 8", "scan 36 · stack 15") keep the comparison readable.
5. **The reveal mostly quotes what I saw.** 36, 8, 15, "8 pops" and the 9's row are on the stage when the reveal opens. "While the stack emptied box by box down to the 9" describes motion; the final frame shows only the 9 box left. Acceptable.
6. **The n vs n² line is told.** "9 numbers cost at most 9 pushes and 9 pops: the work grows like n, not n²" is a sentence. The stage shows two lists of 9 only. The counting argument (comparisons ≤ pushes + pops) is pictured by the ticks; the growth claim is not. One claimed sentence of context is allowed, if growth is outside the gap.
7. **No answer before the commit:** options 36/18/8 are all bare numbers; the locked stage shows "?" everywhere. The question stem gives 36 for the scan, which is a distractor, not the answer. Met.

Where understanding first broke: the question. "Keeping a stack of values still waiting (each new number pops the smaller ones on top, then is pushed)" is a procedure I could not run in my head as a beginner, so I guessed. Then the predicted case turned out to be the one where the interesting part (popping) never happens.

## After reading the brief and the r6 review

The objective's "because" is "each number is pushed once and popped at most once". v2 now has a picture for the pops (solid ticks with an "8 pops" label beside the 9), and that is a real improvement. But the moment the reveal quotes, "the stack emptied box by box down to the 9", is not something a learner can watch. Demo.tsx (the artifact) replays the 8 … 1 9 run at 22 ms per frame (18 frames, about 0.4 s), so the eight pops are a flicker, and the sheet's frame 04 shows only the end state. A learner arriving after 9 8 … 1 is already in the "finished" state, so tapping the second list replays the run automatically; there is no way to step the 9's arrival.

**Top finding (revise, show the why / reveal quotes what you saw):** the pops that carry "popped at most once" happen too fast to see, and the reveal tells the learner they watched the stack empty box by box. Make the 9's arrival something the learner steps or slows down, so each pop is a visible state. The builder chooses how.

| r6 finding | Status |
|---|---|
| Revise: the pops are not shown; "pop" not on the stage; the 8 bars are unlabelled | partly fixed: "8 pops" label and solid vs hollow ticks added; the popping itself is still a 0.4 s replay with no step (see top finding) |
| Minor: the stem doesn't state the stack rule | fixed (rule now in the stem and as a stage line) |
| Minor: locked frame crops the Next number / All the rest row | fixed in this build's phone frame? not fully: the locked frame still shows only the tops of the summary cards and no controls (frame 01) |
| Minor: the descending predict case has no pops | not fixed (my finding 1); still a judgment call, but it is now the reason the predicted case does not exercise the idea |

Other remaining items: hollow vs solid ticks are hard to tell apart at phone size (finding 3); two charts side by side (finding 4); "n, not n²" is told context (finding 6, acceptable as one claimed sentence). 5/6 claims checked (fact-checker).
