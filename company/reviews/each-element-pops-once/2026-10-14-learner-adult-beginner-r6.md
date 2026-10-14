*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): each-element-pops-once
lesson version: v1
boundary: adult who knows a stack is last-in-first-out (back-button-stack) and has never met "next bigger to the right" or the waiting-stack trick.
Screenshots seen: yes (artifacts/walkthroughs/each-element-pops-once/sheet.png)
Verdict: revise

## 1. From the artifact

- Hook and title are a real tension ("Is 'next bigger' a scan from every position?"). The locked stage shows the 9 tiles, "Scan: ?" / "Stack: ?" and two "scan ? · stack ?" cards. Nothing leaks. The bottom controls ("Next number", "All the rest") are cut off in the locked frame.
- Predict: the stem gives the scan's 36 but never says what the stack does when a number arrives (pop smaller tops, then push). I had to guess the stack's cost without knowing its rule. That's fine for a wrong guess, but it means the stage has to teach the rule.
- Explore: "Next number" placed the 9 (Scan 8, Stack 0). "All the rest" finished 9 8 … 1: every answer "none", Scan 36, Stack 8, one small green bar per number, and the stack column filled with 1 to 9. That clearly shows "the stack is cheap here". Tapping "8 … 1 9" jumped to the finished state: every answer 9✓, Stack 15, the stack column holding only 9, and a row of 8 green bars beside the 9.
- **The moment the idea depends on, the 9 popping eight waiting numbers, never happened on screen.** I saw before (a full stack, from the other list) and after (a stack of one), but no pop. The word "pop" is not on the stage, and the 8 bars beside the 9 have no label. I had to infer that they are pops.
- Reveal: values match what I saw (36, 8, 15, "popped 8 waiting numbers at once"). The "pushed once, popped at most once, so at most 9 + 9" argument is the objective's "because", and it's mostly told. The bars stand for it only if you already know what they count. "Grows like n, not n²" is told context (one list size only). That's acceptable as told context.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json → learner.

## 3. New findings

- **Revise (show the why you promised):** the objective asks the learner to explain "each number is pushed once and popped at most once", but the pops are not shown. Let the 8 … 1 9 run step (or require "Next number" for the final 9) so the stack visibly empties one box at a time. Mark each popped box or bar as "pop", and have the reveal point at that.
- Minor: the stem doesn't state the stack rule. One stage line, such as "new number pops smaller waiting ones, then waits", would let the prediction be a real guess and not a blind one.
- Minor: locked frame crops the Next number / All the rest row.
- Minor: picking a descending list as the predict case makes the stack's 8 feel like a trick (no pops at all). This is a judgment call, not a blocker.
- No FATAL.
