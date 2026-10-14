*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r5 wave): tortoise-meets-hare
lesson version: v2
boundary: adult beginner who knows a linked list as boxes with arrows; does not know how to tell a looping list from a long one without remembering every box (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/tortoise-meets-hare/sheet.png, 8 frames)
Verdict: revise

## 1. From the artifact

- Predict: "No, the fast one can jump over" is the natural worry at my boundary, and "only if even" is a clever distractor. I picked "Yes, always" on instinct, not reasoning. The locked stage shows the chain 1→2→3, the loop 3→4→5→6→7→3, both markers on box 1 and "Gap ?". Nothing leaks.
- Layout: in the predict frame the tick buttons are cut off at the bottom of the stage (only the tops of 1 to 4 show).
- Explore: the ticks move slow (circle) and fast (triangle) with faint ghosts of their last positions. Tick 5 boxes both on 6: "Same box at tick 5: loop found". "Last arrow: nowhere" re-runs to "Fast hit the end at tick 3: no loop". Both outcomes are on stage.
- Where understanding first broke: "Gap". At tick 2, slow is on 3 and fast on 5. On the picture fast is 2 boxes ahead, but the stage says "Gap 3". At tick 3 (slow 4, fast 7) fast looks 3 ahead, and the stage says "Gap 2". The reveal then says "Your fast marker was 3 boxes behind". The gap is measured as fast chasing slow around the loop, but the stage never says so, and its numbers contradict what my eyes read. That gap is the whole argument for "always" ("gains exactly one box per tick ... cannot step over 0"). So the reason the answer is "always", not just "this time", is the part I could not get from the stage. Tick 1 shows "Gap —", which is also unexplained (slow is not in the loop yet).
- One run with one loop (length 5) shows they met once. It does not show "always". The general claim ("tails of 0 to 10 and loops of 1 to 10") is told. That is fine if the gap argument lands, and at the moment it does not.
- The "Last arrow: to box 3" button reads like a status label, not an action. The panel prompts it, so I found it.
- Reveal: the closing line "The gap shrinks by one each tick, so it must hit zero" repeats the first paragraph.

## 2. Earlier findings

- None. This lesson has no earlier learner review (only a fact-check, 2026-10-14).

## 3. New findings

- Blocking, top: define the Gap on stage, for example "Gap: boxes fast must still run to reach slow, around the loop". Better still, draw it as a highlighted arc from the triangle forward to the circle. Show it only once slow has entered the loop ("Gap —" needs a word: "slow not in the loop yet"). As it stands, the numbers (3, 2, 1) contradict what the picture appears to show (fast 2 or 3 boxes ahead).
- Should fix (layout): the tick buttons are clipped in the predict frame.
- Minor: phrase the arrow toggle as an action ("Point last arrow at nowhere").
- Minor: remove the duplicated last line of the reveal.
- Not my lane (fact-checker): 0/6 claims checked, DRAFT.
- No FATAL.
