*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): count-the-out-of-order-pairs
lesson version: v2
boundary: adult-beginner (same tag as r6). Knows how to merge two sorted lists by taking the smaller front card. Does not know that one merge pass also counts out-of-order pairs, or that this takes fewer checks than comparing every pair.
Screenshots seen: yes (artifacts/walkthroughs/count-the-out-of-order-pairs/sheet.png, walkthrough against build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who can compare numbers and read a list, and has never heard of inversions or merge sort.

1. **Where it held.** The locked stage shows the two halves 2 4 / 1 3 5 and nothing that matches an option; options 2, 3, 5 are all bare numbers. No answer before the commit. On "Take next" the two red lines from 1 to the waiting 2 and 4 are the moment the idea lands: a card taken from the right is out of order with every left card still waiting. That is the why, drawn.
2. **"3 jumped 4" is only shown in text.** "Finish the merge" does the takes of 2, 3, 4 and 5 in one go. The second jump (3 over 4, +1) never gets its own red line. I see it only in the trace "1 jumped 2 4: +2 · 3 jumped 4: +1". The reveal leans on it ("3 jumped only 4"). It is still on the stage, so this is minor, but the one rule is drawn only once.
3. **The every-pair readout sits below the fold during explore.** In frames 2 to 5 the "EVERY PAIR: CHECKS" tile is cut off at the bottom edge of the stage. A phone learner who taps "Check every pair" sees no visible change unless they scroll. It is fully visible only when the reveal opens. The 10 vs 5 comparison is the hook's payoff, so it should not be hidden.
4. **Reveal quotes what I saw.** After Start over the stage says "Last merge: 1 jumped 2 4: +2 · 3 jumped 4: +1" and "10, 3 found", and the reveal quotes exactly those. It survives Reset.
5. **The O(n log n) sentence is told.** It is one sentence of context and is not part of the stage's idea (counting during a merge). A beginner will not follow "O(n log n)", but it does not block the main idea.
6. **Why each half has no pairs inside it** is said ("Each half is already in order") only after Start over, not before the first take. A beginner can see it from the cards anyway.

What the prediction felt like: a real guess. I counted 2 (I missed (4,3)), and the reveal answered exactly what I missed.

Verdict reasoning: a first-time learner gets the idea from the stage, through the red jump lines and the trace. Findings 2 and 3 are polish.

## Earlier findings (r6), checked after the findings above were written

1. Cost comparison told, not shown: **fixed.** "Check every pair" now sets "EVERY PAIR: CHECKS 10, 3 found" beside "MERGE: TAKES 5 of 5". New caveat: on a phone the tile is below the fold during explore (finding 3 above).
2. Second jump (3 over 4) can be skipped: **not fixed, softened.** "Finish the merge" still skips past it without drawing it. The jump is now kept in the on-stage trace, so the reveal quotes something visible.
3. Reveal stage shows the reset state under "the counter stopped at 3": **fixed.** The reveal now says "Your merge counted 3", and the "Last merge" trace stays on stage after Start over.
4. Merge sort levels and O(n log n) told: **not fixed (accepted).** It is still one told context sentence. At this boundary that is acceptable.

## Verdict

Launch. The idea that one take counts every waiting left card is drawn, there is no leak before the commit, and the reveal quotes the surviving trace. Polish for the builder, not blockers: draw the 3-over-4 jump as its own step, and keep the every-pair readout visible without scrolling.
