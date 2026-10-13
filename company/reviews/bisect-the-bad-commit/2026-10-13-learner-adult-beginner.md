*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bisect-the-bad-commit
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: a good one. I can picture 1,000 versions of an app. 10 vs 500 vs 1,000 is a real guess; many beginners will say 1,000 or 500. The locked stage states the key rule ("Once a version breaks, every later one stays broken") before I choose, which is fair but means the premise is given. The hook ("Do you really have to test them one by one?") leaks that the answer is not 1,000.
- What was SHOWN: "Test the middle: v500" drops suspects from 999 to 500 and the bar half-greys. That single step is clear. "Keep halving to the end" then jumps straight to the end (10 tests, v737). In the transcript path the learner never sees 250, 125, 63 ... appear: the reveal lists "999 -> 500 -> 250 -> 125 -> 63 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1", but only the first step was displayed. The numbers in the reveal were told, not shown. A learner who taps "Test the middle" repeatedly would see them; the auto button skips it.
- Where understanding first broke: "because 2^9 = 512 is too few and 2^10 = 1,024 is enough". Powers of two are unexplained and the link between "keep halving" and "how many halvings" is asserted. Also 125 -> 63 (why rounds up) is unexplained. "Testing one by one would have taken 736 tests" is never shown (the "next one" button exists but was not used) and 736 is not a number the stage ever displayed.
- The prediction asks for the worst case ("the most tests you could ever need") but the stage runs one case (v737). The reveal does explain "at most", but it is the argument, not the picture, that carries it.
- "git bisect" appears only at the end, so it is not a barrier. Payoff of the clever idea is shown, the maths of why 10 is the ceiling is told.
- Reveal earned: the halving idea yes; the "at most 10" ceiling only by assertion.
- Problems: (1) hook leaks the answer; (2) the auto-run skips the steps the reveal quotes; (3) 736 and powers of two unshown/unexplained; (4) worst case vs single run.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows binary search; my boundary does not, but the stage stands alone well for the first halving. The objective (999 to 1 in at most 10 tests, 2^10 = 1,024) is delivered by the reveal's arithmetic; the stage shows only the first halving and an auto-run. The misconception (test one by one) is hit by the hook, which also leaks the answer.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
