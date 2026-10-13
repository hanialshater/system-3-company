*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: flip-and-add-one
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: this needs binary, which I have never seen. "In 8 bits, 5 is 00000101. Flip every bit, then add 1." I do not know what a bit is. The stage's place-value row (-128, 64, 32, 16, 8, 4, 2, 1) above the digits gives me a way to see that 00000101 = 4 + 1, which is helpful, but the red "-128" is unexplained. I can "flip" mechanically, but "add 1" in binary (carrying) is something I would have to guess. The three options differ by one digit, so for me it is a coin flip. The hook ("a negative number just the positive one with a minus-sign bit stuck on the front?") uses "bit" and "minus-sign bit" without grounding.
- What was SHOWN: "Flip all" gives 11111010 and the stage labels it "= -6"; "+ 1" gives 11111011 "= -5"; "Add 5 to it" shows 00000000 "= 0" with "Carry 1 falls off the 8th bit". That chain is convincing: I saw a number that, added to 5, gives 0. Because "-6" appears after flip, a learner who picked 11111010 sees immediately why add 1 is needed.
- Where understanding first broke: why 11111011 reads as -5. The stage computes it, but the rule that the left bit is worth -128 is just printed in red. A non-programmer will take the "= -5" label on faith. "Carry falls off the 8th bit" is shown as text, with no picture of the carry moving.
- The explore also lets me tap individual bit-value buttons ("Bit worth -128", etc.) which toggle the middle row; in the transcript path these toggles leave the stage in an arbitrary state (bits 00000100 = 4, sum = 9) when the reveal opens, so the stage next to the reveal does not show the result the reveal explains. Nothing says these buttons are optional.
- Reveal: "You went flip -> 11111010, +1 -> 11111011, 5 + 11111011 -> 00000000" matches the stage the first time through. "-128 + 123 = -5" quotes 123, which is only on the stage if the learner toggles bits (it appears only in the toggling steps). The key payoff, "a machine can subtract by adding: a - b is a + (flip b, add 1)", is told, not shown. "A minus-sign bit would not work: 10000101 reads -123 here" is told; the stage never lets me try that pattern as an alternative.
- Terms used before defined: bit, 8 bits, "flip", carry, adder.
- Reveal earned: the -5 pattern yes; the "why a machine does this" payoff no.
- Problems: (1) binary is a prerequisite never taught; (2) -128 place value unexplained; (3) stage at reveal can be in a leftover toggle state that contradicts the reveal; (4) subtraction payoff and the sign-bit counterexample are told only; (5) "123" in the reveal is not on the default stage path.
- No FATAL; the behaviour shown is true.

## 2. After reading the brief

- The brief assumes wheel-of-negatives (the -128 top bit) and binary addition with carries; my boundary has neither, so the -128 column and '= -5' labels had to be taken on trust. The objective (flip, add 1, get 11111011 = -5, add 5 gives 0 with the carry dropped) is shown by the first three taps. The explore's bit-toggle buttons are extra and can leave the stage in a state that contradicts the reveal. Misconception (minus-sign bit) is stated only in the reveal.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
