*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): one-crowded-bucket
lesson version: v1
boundary: knows counting sort tallies values instead of comparing them (sorting-without-comparing); does not know that bucket sort is fast only when values spread evenly (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/one-crowded-bucket/sheet.png; 03-step-2.png opened for the clipped controls)
Verdict: revise

## 1. From the artifact

- Predict: the hook "Is a sort that never compares across the whole list always fast?" sets up the misconception well. Coming from counting sort, "About 1, as before" is my honest guess. One small cue: "30" is the only exact number among the options ("About 1", "About 10"), which marks it as the computed one. The locked stage shows ten empty buckets labelled 1, 11, …, 91 and the spread hand. It doesn't leak.
- Explore: "Drop into buckets" puts the spread hand in nine buckets, with 64 and 70 sharing bucket 61. "Sort buckets" sets COMPARISONS 1 / SPREAD 1, and a bold "1" appears under bucket 61. Clear. Then the panel says "switch to the clumped one". On the phone frame the Hand row (Spread / Clumped) is cut off by the bottom edge of the stage, so only the tops of the two buttons show (03-step-2.png). Once tapped, Clumped drops and sorts in one go: one tower of ten in bucket 41, with "30" under it and COMPARISONS 30. The tower pushes the stage, so its top and the caption scroll off.
- Reveal: "Only 64 and 70 shared one" and "all ten fell into 41-50" point at what I saw: the one tall bucket stands in for the cause, and that works. "The tiny sorts became one insertion sort of ten numbers: 30 comparisons" is told. I saw 30 appear, but no comparisons happening, and nothing tells me why ten numbers cost 30.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json.

## 3. Findings

1. **Revise:** the control for the key step is clipped. Spread / Clumped sit below the visible edge of the stage on a phone, and the learner has to find an inner scroll to do what the panel asks. A learner who doesn't find it stays on the spread hand, and the reveal never unlocks (or unlocks without the crowded bucket). Put the Hand toggle above the buckets, or make the stage fit.
2. Moderate: the clumped sort is instant. The 30 comparisons that are the lesson's punchline appear as a number, not as work. A "Sort buckets" step on the clumped hand too, with the count climbing while the tower sorts, would let me feel "as slow as the one crowded bucket".
3. Minor: the clumped tower overflows, and the stage scrolls so its top and caption are cut, on both step 3 and the reveal frame.
4. Minor: "30" as the only exact option is a cue. "About 30" would fix it, or the other options could be exact too.
5. Not mine: DRAFT, 0/5 claims checked (fact-checker).
- No FATAL.
