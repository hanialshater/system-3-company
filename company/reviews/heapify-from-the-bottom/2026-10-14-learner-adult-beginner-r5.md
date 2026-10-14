*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): heapify-from-the-bottom
lesson version: v2
boundary: learner who knows bubbling a new item up a heap (heap-bubble-up lesson); doesn't know that building a whole heap at once is cheaper than inserting one by one.
Screenshots seen: yes (artifacts/walkthroughs/heapify-from-the-bottom/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the question spells out the procedure (sift each parent down, last parent first, swap with the bigger child). 4 / 7 / 10 is a fair spread, and 10 turns out to be the one-by-one count. Answering means simulating three sifts in my head, which is heavy for a predict step but doable with the tree on screen. The locked stage shows both trees, "Swaps: ?" on each, and "Parents: 3, then 2, then 1." No leak.
- Explore: three taps sift 3, 2 and the top. Badges "↓1", "↓1", "↓2" mark how far each card sank; Swaps 1 → 2 → 4. The caption "No work started at a leaf" points at the four bottom cards, which never moved on their own. Then "Insert next" / "Insert the rest" build the right-hand tree: Swaps 10, "Climbs: +0 +1 +1 +2 +2 +2 +2". Side by side, 4 vs 10 makes "all at once is cheaper" visible, and the climbs row shows why: the late cards are the big ones and land at the bottom, then climb the full height.
- Reveal: every number it quotes (4, 10, the ↓1 ↓1 ↓2 pattern) was on stage. I got "most cards sit low, and sifting down from the bottom costs them nothing, while inserting makes each new card climb" from the two trees before reading it. The "under 2n" generalisation is told; fine as a closing line.

## 2. Earlier findings

- None: this is the first learner review of this lesson.

## 3. New findings

- Minor: "Top unlocks: its children are fixed." is jargon-ish. "Now the top: both its subtrees are already heaps" says what "fixed" means.
- Minor: the input (1-7 in increasing order) is the worst case for inserting. A learner may wonder whether the gap is just this order. One line ("this order is the worst case for inserting") or a shuffle would answer that.
- Minor: the hook ("one card at a time, or all at once?") asks a comparison, but the question only asks the bottom-up count. Fine, because the stage delivers the comparison.
- Note for other roles (not a learner finding): the card shows DRAFT and "0/5 claims checked" on this build.
- No FATAL.
