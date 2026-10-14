*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): merge-sort-payoff
lesson version: v3
boundary: an adult who remembers school arithmetic and science, new to the topic (knows sorted lists and comparing two numbers; not recursion, Merge Sort or big-O).
Screenshots seen: yes (artifacts/walkthroughs/merge-sort-payoff/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: the hook "How many comparisons can that cost?" now matches the question ("most comparisons you could ever need" to merge two sorted piles of 4). I guessed 7 (8 minus 1). 16 and 28 are plausible slips. The locked stage shows Pile A 10/20/21/23, Pile B 4/5/18/36 and an empty 8-slot merged row.
- Explore: "Where did the piles come from?" shows 8 single cards and "Split into 8 single cards: 0 comparisons", plus a "Next round" button. I did not need to press it, and the gate opened without it. Tapping 10 first gives "The other top card is smaller, so it goes first. Each card placed while both piles have cards is one comparison". That is clearer than v2, though the counter staying at 0 after I compared 10 with 4 in my head still jars a little. I placed 4 myself, then "Finish for me" placed the other seven: "Merged with 7 comparisons". These piles interleave to the end (A empties on card 7, then 36 slides over), so 7 is the worst case on screen.
- Reveal: "The merge on screen took 7" is honest now. "At most 7, once a pile empties the rest slides over for free" follows from what I saw. The second paragraph carries the lesson's title payoff, "that is why Merge Sort splits". It rests entirely on told numbers: 10 rounds, fewer than 10,000, 28 pairs, 499,500. None of them, and no round of merging beyond the first, was on the stage.

## 2. Earlier findings (v2 review)

1. Hook and question differ: **fixed**.
2. "Finish for me" removes the learner's merge, and the reveal said "your merge": **partly fixed** (the reveal now says "on screen"). On the default path the learner still places one card of eight.
3. Wrong-tap wording contradicted my idea of a comparison: **mostly fixed** (it now defines a comparison as a placement while both piles have cards).
4. Rounds never shown: **not fixed**. "Next round" exists but is optional and was not used on my path.
5. 10,000 and 499,500 told, not shown: **not fixed**.

## 3. New findings

- Top (revise): why splitting pays is only told. A first-timer leaves knowing "a merge of 8 costs at most 7". The "splitting is setup, the merge is the payoff" claim they are meant to take away needs at least one more round on stage: merging pairs of 1s into 2s, then 2s into 4s, with a running comparison total set against 28 for every pair. Making "Next round" part of the gate, or showing a cumulative total beside the 28, would let the stage carry it.
- Minor: "Next round" stays visible at the top of the reveal frame as a dangling control.
- Minor: the "75s" chip (product-owner item). Trust link 9/11 (fact-checker's lane).
- No FATAL.
