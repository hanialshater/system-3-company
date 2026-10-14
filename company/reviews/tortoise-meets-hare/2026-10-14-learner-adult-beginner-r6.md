*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): tortoise-meets-hare
lesson version: v3
boundary: adult beginner who knows a linked list as boxes with arrows; does not know how to tell a looping list from a long one without remembering every box.
Screenshots seen: yes (artifacts/walkthroughs/tortoise-meets-hare/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact

- Predict: "Yes, always" / "Only if the loop length is even" / "No, the fast one can jump over". The last is the worry I actually have, so the choice is real. The locked stage shows the chain 1→2→3, the loop 3→7→3, both markers on box 1 and "Gap ?". Nothing leaks. The tick buttons are now visible in the predict frame. The "Point last arrow at nowhere" button is half cut at the stage's bottom edge, which is minor.
- Explore:
  - Tick 1: "Gap —: slow not in the loop yet". Now I know why there is no number.
  - Ticks 2–4: a green arc runs from the triangle forward to the circle, labelled 3, then 2, then 1, with the text "boxes fast must run to reach slow (green arc)". The arc is what made it click: I can see the stretch the fast one still has to cover, and watch it shrink.
  - Tick 5: both are on box 6, the box is outlined, and "Gap 0: same box".
  - "Point last arrow at nowhere" gives "Fast hit the end at tick 3: no loop", and the chain end becomes a dead stub.
- What the prediction felt like: an honest commitment. The loop has 5 boxes (odd), so the run itself quietly answers "only if even".
- Reveal: "3, then 2, then 1, then they shared box 6 at tick 5" were all on stage. "Gains exactly one box per tick, so the arc shrinks by one box and cannot step over 0" points at the arc I watched. "Fast hit the end at tick 3" was seen. "Tails of 0 to 10 and loops of 1 to 10" is told generality, and that is acceptable once the shrinking-gap argument has landed.
- Minor findings:
  - "Gap 1 boxes" is a plural slip.
  - In the reveal frame the stage is back on the loop run ("Your run: tick 5, box 6"), not on the no-loop state I left it in. That is fine, but it is a jump.
  - Ticks 6–8 are greyed after the meeting, which reads as "done". Good.

## 2. Earlier findings (r5, v2)

1. "Gap" undefined, and its numbers contradicted the picture: **fixed** (a defined green arc measured forward from fast to slow, with "—" explained).
2. Tick buttons clipped in the predict frame: **fixed** (the arrow toggle under them is now slightly clipped, minor).
3. Arrow toggle read like a status label: **fixed** ("Point last arrow at nowhere" / "Point last arrow back to box 3").
4. Duplicated last line of the reveal: **fixed**.
5. Claims 0/6 checked: now 4/7 (fact-checker gate).

## 3. After reading the brief

- The objective's cause ("the fast marker gains exactly one box per tick, so the gap shrinks by one and cannot skip over zero") is stood for by the green arc 3 → 2 → 1 → 0, and the reveal points at "your green arc". doesNotKnow (telling a loop from a long chain without memory) is shown by the two runs and the "Nothing else is remembered" line. Show-the-why rule: met.
- No FATAL.
