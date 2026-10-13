*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: big-number-swallows-one
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the hook ("Rounding errors hide in far decimal places. Surely whole numbers are safe?") assumes I know computers round decimals; I know calculators, not that. The question says "In JavaScript" and I do not know what that is, and a 16-digit number is unreadable. The three options (…993, …992, an error) are a fair guess; most beginners pick …993 and are right in ordinary life. The stage only shows "Last 3 digits shown" and a mysterious bold "2^53" under 992, unexplained.
- What was SHOWN: "+ 1" goes 990 to 991; "+ 1, five times" ends at 992 with a red line "...992 + 1 = ...992 (x4)"; "+ 2" jumps to 994. The number line with solid dots (can hold it) and hollow dots (can't) after the first tap makes the idea concrete: 993, 995, 997 are hollow. That works, and the surprise that adding 1 does nothing is a real hook.
- Where understanding first broke: the reveal's second paragraph: "a double with 53 bits of precision", "Number.MAX_SAFE_INTEGER is 2^53 - 1", "rounded to the even one", "BigInt". All new, none shown. I could not follow why 2^53 is the edge: the stage labels it but never says what it means. A beginner leaves believing "computers cannot count above 9 quadrillion" or "JavaScript is broken", not knowing that it is a storage limit.
- Numbers: reveal's "4 times in a row" and "994" match the stage. But "adding 1 either does nothing or jumps by 2" is not shown: only the does-nothing case appeared (the jump case needs 994 + 1, never offered). "Beyond it only every second whole number exists" matches the hollow dots here but the transcript's own trust sheet shows that claim as DISPUTED (it is only true up to 2^54): a sentence the learner reads is overstated.
- Hook/answer: not given away. Payoff: the surprise is shown; the explanation is told.
- Reveal earned: the fact yes; the reason no.
- Problems: (1) "JavaScript", "double", "53 bits", "MAX_SAFE_INTEGER", "BigInt" undefined; (2) hook assumes knowledge of decimal rounding; (3) 2^53 label unexplained; (4) the "jump by 2" half of the rule never shown; (5) disputed claim sentence sits in the reveal.
- No FATAL; the displayed behaviour is true.

## 2. After reading the brief

- The brief assumes pennies-dont-add-up and powers of 2; I had neither, so JavaScript/double/53 bits blocked the explanation, not the experiment. The stage delivers the 'adding 1 does nothing' half of the objective but not the 'every second number exists' framing beyond the hollow dots. Separately the trust sheet I could see lists claim c3 as DISPUTED (wording overreach: 'beyond it only every second whole number exists'), and that sentence is in the reveal as learners read it.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
