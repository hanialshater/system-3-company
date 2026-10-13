*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: list-doubling-copies
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "A list starts with room for 1 item and doubles whenever it is full. After appending 16 items, how many item-copies did all resizes do in total?" I know a shopping list, not a program list; "append", "resize", "item-copies" are jargon, and the hook presupposes that "appending is fast" (a claim I have no reason to hold). The options 15, 30, 120 can be reasoned about only if I simulate the doubling in my head (1, 2, 4, 8), which is a lot for a beginner; otherwise a guess.
- What was SHOWN: a row of boxes; "Append" fills one; when full the button "Grow: copy 1 into 2" copies; then "Append to 16" runs to the end. The final stage shows 16 boxes (1 to 8 green = copied, 9 to 16 dark = new), the line "Copies: 1 + 2 + 4 + 8 = 15" and counters APPENDS 16, COPIES 15, PER APPEND 0.94. That is a good summary picture. But after the single hand-grown step, the auto-run skips the doublings at 2, 4 and 8: the learner sees only the end total, so the reason it is 1+2+4+8 appears as text, not as a process.
- Where understanding first broke: "PER APPEND" is not defined (it is copies divided by appends); and "grow by hand once" is the only visible growth. The explore ends with "Start over" in the transcript path, so the stage next to the reveal is the empty "Room for 1" state, not the result being explained.
- Reveal: "less than one copy per append" matches 0.94, which is on the earlier screen. "Each big copy buys as many free appends as it cost: after copying 8 items there is room for 8 more" matches the dark boxes but nothing labels them as free. "For any power of two, n appends cost n - 1 copies" is told. "Java's ArrayList by 1.5x" and "not by a fixed amount" are unshown jargon.
- Reveal earned: the 15 yes; the "cheap on average" explanation partly; the real-world claim no.
- Problems: (1) list/append/resize jargon; (2) hook presupposes appending is fast; (3) auto-run hides the doublings; (4) PER APPEND undefined; (5) stage at the reveal is reset to empty; (6) ArrayList claim told.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows a fixed-slot list and doubling; my boundary does not know lists/append/resize. The objective (1 + 2 + 4 + 8 = 15 over 16 appends, a big copy buys as many free appends as it cost) is shown as an end total with the doublings skipped by the auto-run; the 'free appends' idea is told. Misconception (n appends cost about n squared) is not directly hit by any element.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
