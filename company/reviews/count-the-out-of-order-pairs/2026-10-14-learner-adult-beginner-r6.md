*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6): count-the-out-of-order-pairs
lesson version: v1
boundary: adult-beginner (meta.json learner field). Knows how to merge two sorted lists by taking the smaller front card (merge-sort-payoff). Does not know that one merge pass also counts how far a list is from sorted, or that counting out-of-order pairs can take far fewer than n(n-1)/2 checks.
Screenshots seen: yes (artifacts/walkthroughs/count-the-out-of-order-pairs/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: the hook is a real tension ("Must you compare every pair?"). The question defines an out-of-order pair. The locked stage shows the halves 2 4 / 1 3 5, counters at 0, and leaks nothing. 2/3/5 are plausible miscounts.
- Explore: "Take next" moves 1 out and draws two red lines to 2 and 4, with the caption "1 from the right jumps 2 and 4 still waiting: +2". That is the idea made visible: one move counts two pairs. Good.
- Where it thinned: "Finish the merge" jumped straight to 5 of 5, with the caption on the last card ("5 from the right ... +0"). The step where 3 jumps only 4 (+1) was never drawn. I saw (4,3) appear in the pairs list but not why. The reveal's "3 jumped only 4" quotes a moment I did not watch. The gate opened after Finish, so a learner can skip the second jump. Then "Start over" reset the counter to 0.
- Reveal: the reveal stage shows the reset state (0 pairs, 0 of 5), while the text says "the counter stopped at 3". "Checking every pair of 5 cards takes 10 checks" is told, and 10 is never on the stage. "Merge sort splits and merges at every level, so ... O(n log n), not n²" is told. The stage shows one merge of two halves that were already sorted. Nothing shows splitting, the levels, or why the halves come in sorted. For a learner who has not seen merge sort, "O(n log n)" is a label with nothing on stage behind it.

## 2. After reading the brief

- doesNotKnow (a), "one merge pass also counts how far from sorted": **shown**. The red jump lines and "+2" stand for it.
- doesNotKnow (b), "far fewer than n(n-1)/2 checks", plus the objective's "explain why this counting is free (O(n log n) total)": **told only**. "10 checks" and "5 steps" sit side by side only in the reveal text. Nothing on stage counts the all-pairs checks, so the cheapness that the hook promises ("Must you compare every pair?") rests on one told sentence. Under "Show the why you promised" this is a revise.
- The objective also says "add the number of left cards still waiting *each time* a right card is taken". "Finish the merge" lets the learner skip the second jump (3 over 4), and the gate accepts that.

There is no earlier learner review, so section 3 is empty.

## 3. Earlier findings

None (first learner review).

## 4. Findings

1. **Revise: the cost comparison is told.** The stage never shows the 10 pair checks beside the 5 merge steps. The idea the hook asks about (do you have to check every pair?) has nothing on stage to stand for it.
2. **Revise: the key second jump can be skipped.** "Finish the merge" runs past "3 jumps 4: +1", but the reveal quotes that moment as if it was seen.
3. Minor: the reveal stage shows the reset state (0 pairs, 0 of 5) under "The counter stopped at 3".
4. Minor: "Merge sort splits and merges at every level" is told context. That is fine at this boundary as one claimed sentence, but O(n log n) will mean little without it.
5. No FATAL.
