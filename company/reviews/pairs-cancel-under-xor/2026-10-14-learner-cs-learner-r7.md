*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): pairs-cancel-under-xor
lesson version: v3
boundary: learner who knows bitwise operators on a number (mask-the-flags) and reads 3-bit binary; has never been shown that a XOR a = 0 or that XOR ignores order (meta.json learner field; same mind as r6).
Screenshots seen: yes (artifacts/walkthroughs/pairs-cancel-under-xor/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Hook: "Seven numbers, one operation, folded left to right. What is left at the end?" It no longer says "all but one has a twin". The options 0 / 7 / 31 are all plain numbers. The locked stage shows the list 5 3 3 4 7 5 4 with bits, and the lamps at 000. A sharp eye can still see that 7 is the only unpaired value, but nothing labels it. "0" is a real trap, and I took it.
- Explore: "Fold next" gives 0 → 5. "Fold to next twin" stops right at the second 3: "110 XOR 011 = 101: the second 3 flips lamps 2 and 1 back, as the first did". Lamp 2 drops to 0, and the twins are struck through. The trace row keeps it: "First twin: the second 3 flipped lamps 2 and 1 back, 6 → 5." I watched a XOR a cancel. "Fold the rest" ends at 111 = 7, with every tile except 7 struck through. "New order" deals 7 3 4 5 4 3 5, folds it to the end, and the trace row records "Ended at: 7 (5 3 3 4 7 5 4), 7 (7 3 4 5 4 3 5)". Order-independence is on the stage.
- Reveal: it quotes 111/7, the second-3 flip (lamps 2 and 1, 6 → 5), and the other order. All of these sit in the trace rows, which survive "Start over".
- Minor findings, not blocking:
  1. After "Start over" (the last QA press), the lamps read 000 when the reveal opens, but the reveal says "Your lamps ended at 111". The trace row "Ended at: 7" carries it, though not as lamps.
  2. "New order" folds the whole second order in one tap, so I saw only its result, not its pairs cancelling. That is enough for "order doesn't matter".
  3. Wording: "flips lamps 4 back" should be "lamp 4".
  4. "31" is not a mistake anyone makes; it could be a more tempting distractor (for example, the OR of all, 7, is taken, so maybe the plain sum).

## 2. Earlier findings (r6, on v2)

1. The hook ("has a twin") let the learner find 7 by eye: **fixed** (neutral hook).
2. No single-step fold showed a partner flipping lamps back: **fixed** ("Fold to next twin" plus the trace row).
3. "XOR ignores order" was told, and the second order was never folded: **fixed** (New order runs to the end and records 7).
4. The reveal claimed unseen states: **fixed**. Every quoted state is in a trace row.

## 3. After reading the brief

- Both doesNotKnow items (a XOR a = 0 / a XOR 0 = a; order does not matter) now have stage stand-ins that the reveal points at.
- The trust sheet shows 1/5 checked (it was 5/6 at v2). This looks like the claims were re-opened for v3 and belongs to the fact-checker.
