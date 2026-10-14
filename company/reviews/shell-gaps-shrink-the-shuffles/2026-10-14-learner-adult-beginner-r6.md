*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): shell-gaps-shrink-the-shuffles
lesson version: v1
boundary (from meta.json learner): knows insertion sort slides each card left one step at a time (insertion-by-hand); does not know that sorting far-apart cards first can save most of those steps.
Screenshots seen: yes (artifacts/walkthroughs/shell-gaps-shrink-the-shuffles/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and predict: the hook is a fair question. The question is long, about 60 words, with two definitions of "shift" and the whole gap sequence. It is the heaviest read before anything moves, but it is honest: it says a Shell shift moves a card "one gap over", so 32 is not a trick. Options 120 / about 60 / 32 are fair. The locked stage shows both lanes reversed and "total ?". Nothing leaks.
- Explore: "Plain insertion sort" makes the top lane 120 shifts, farthest 0. Then the four Shell passes go one tap each, with arcs under the lane showing which cards jumped together. The lane label "Farthest from its place" goes 15, 7, 3, 1, 0 while shifts go 8, 16, 24, 32. The passes unlock in order, so the gate follows the idea. This is the why, and it is on stage: the far passes cut the farthest distance, so the last pass has only one-step fixes left.
- Where it could lose a beginner: the lane labels ("Shifts: 24 · Farthest from its place: 1") are very small on the phone. They are also the very numbers the reveal says to "watch". A learner watching the cards move may never read them.
- Also minor: the reveal says "only 8 swaps left" where everything else says "shifts". It is one word, but the lesson is about counting a precisely defined move.
- The two lanes (plain and Shell) are a comparison inside one picture, not two places to track at once. Acceptable.
- Reveal: it quotes only values seen (120, 8 per pass, 32, then 15/7/3/1). It points at the on-stage label. It ends on the idea, plus one correctness sentence.
- Trust link 0/7 claims checked (draft; fact-checker's lane).
- No FATAL.

## 2. After reading the brief

No earlier learner review exists, so there are no earlier findings to track.

- doesNotKnow (sorting far apart first saves most steps): **shown**, as the farthest-from-place readout falling 15 to 7 to 3 to 1 alongside 8 shifts per pass, with the 120 lane beside it. The reveal points at it. It meets the told-vs-shown rule.
- The objective's "because the final gap-1 pass finds every card one step from home" is visible at the "Sort 2 apart" frame (pairs 2 1 4 3 ... ; farthest 1).
- Minors: the tiny readout text, "swaps" against "shifts", and the long question stem.
