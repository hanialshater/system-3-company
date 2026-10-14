*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): insert-at-front-cost
lesson version: v3
boundary: adult beginner (knows a row of items, can count; has never heard of arrays or linked lists; meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/insert-at-front-cost/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- Predict: the row A to F sits in slots 1 to 6, with slot 7 empty, and the options are 1 / 6 / 7. "1" is a real pull and 7 is a counting trap. Nothing leaks.
- Explore, row: "Insert N at front" turns A to F red, prints "each moved one slot →", and ITEMS MOVED reads 6. My "1" broke on the stage itself. "Go to item 4" highlights C in slot 4 and STEPS TO ITEM 4 reads 1 ("Slot 4: one jump").
- Explore, chain: "Switch to chain" shows N at the front, a faded dashed "old start arrow" next to the new start arrow, "Nothing moved: 2 arrows redrawn", ITEMS MOVED 0, and hop numbers 1, 2, 3 on the arrows up to C, which is labelled "item 4". STEPS TO ITEM 4 reads 3.
- Both gap items are on stage: the shift (red boxes, 6) and the cheap insert with a slow walk (faded old arrow, 0 moved, 3 hops). The reveal points at each one ("the faded one is the old start arrow").
- Reveal: every number in it (6, 1 jump, 2 arrows, 3 hops) is one I saw. "k − 1 hops" generalises from the one case I saw, and that is fine.
- Minor: the chain insert is shown already done when I switch views. I don't press insert in the chain view, and that button is greyed there. The old-arrow trace covers it, but tapping it myself would be stronger (prefer manipulation).
- Minor: the hop numbers and the "old start arrow" label are small on a phone.

## 2. Earlier findings (r5, v2)

1. Row "Go to item 4" never seen, so "reaching any slot instant" was told: **fixed** (it is in the path and on the counter).
2. Chain insert not seen ("2 arrows changed" taken on trust): **mostly fixed**. The faded old start arrow shows before and after, but the learner still does not perform the act (minor).
3. Hop numbers read like item numbers, and C was not highlighted: **fixed** (numbers on the arrows, "item 4" under C).
4. Prediction pull (r1 finding 1): unchanged, and acceptable.

## 3. New findings

- None beyond the minors. No FATAL.
