*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: call-stack-depth
lesson version: VERSION_TBD
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "A function calls itself" and "factorial(n) = n x factorial(n - 1)" are meaningless words to me, but the question is still answerable by looking at the stage: one box, "factorial(3) n = 3 running", and a "Call factorial(2)" button. The options 1, 3, 4 are a real guess (1 if calls replace each other, 3 if you count 3, 2, 1, 4 only if you notice factorial(0)). The hook ("replace the old one, or wait on top of it?") and the question's own gloss "(waiting or running)" tell me that calls wait, which leaks the main idea.
- What was SHOWN: very good. Each tap adds a box on top; the old boxes say "waits for factorial(2)" etc.; the counters CALLS OPEN and MOST AT ONCE climb 1, 2, 3, 4. Then "Return 1" collapses the boxes one by one with "1 x 1 = 1", "2 x 1 = 2", "3 x 2 = 6" and ends with "ANSWER factorial(3) = 6". I could follow it by tapping the one button that is lit.
- Where understanding first broke: the 4th box. I expected 3 (3, 2, 1) and factorial(0) appears from nowhere; the stage labels it "base case: 1" but I do not know that term yet. The "x" in "n x factorial(n - 1)" is also never connected to what the returns do (why 1 x 1, then 2 x 1).
- Reveal: "4" and the list factorial(3), (2), (1), (0) match what was on the stage; "1, 1, 2, 6" matches. "Base case" is defined here and earned. "The stack runs out of room and the program crashes with a stack overflow" is told, not shown: the stage has no way to try a missing base case. The reveal's second paragraph is also cut off at the bottom of the card in the screenshot (may scroll).
- Terms used before defined: function, call, factorial, base case, stack (the reveal uses "stack of waiting boxes" as if known).
- Reveal earned: the count of 4 yes; the stack-overflow warning no (it is an aside).
- Problems: (1) "function" and "factorial" never explained to a non-programmer, though the stage carries me through; (2) hook plus "(waiting or running)" gives away the idea; (3) stack overflow told not shown; (4) reveal text clipped in the screenshot.
- No FATAL.
