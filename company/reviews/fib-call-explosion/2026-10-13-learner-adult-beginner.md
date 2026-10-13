*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: fib-call-explosion
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the question is heavy for a non-programmer: "fib(n) = fib(n-1) + fib(n-2), and fib(1), fib(0) just return 1. Every use of fib counts as one call." It reads like a maths definition, and I would have to work out a call tree in my head to know 15; 5, 9, 15 is mostly a guess, and the hook ("looks like five steps of work. Open the calls and count") tells me the answer is bigger than 5. "Call" is never defined except as "use of fib".
- What was SHOWN: the panel says "Tap calls to open them" but the first (and only) exploring step is the button "Open every call", which expands the whole tree at once: CALLS 15 and the text "Repeats: fib(3) x2, fib(2) x3", with repeated nodes coloured yellow and red. This is a vivid picture of the same circle appearing again and again, and it matches the label "Same number = same work, done again". Then "Remember answers" shrinks the tree to a left-leaning chain with dashed nodes: "6 computed, 3 looked up". I could see the saving.
- Where understanding first broke: why the tree has the shape it has. The nodes say only "4", "3", "2" (not fib(4)), and I never saw a node open and produce its two children, so the rule fib(n) = fib(n-1) + fib(n-2) is not connected to the picture unless I tap nodes (which the transcript path never did). In the memoised tree, "looked up" is not explained until the reveal, and which node gets computed first is invisible.
- Reveal numbers: 15, fib(3) twice, fib(2) three times, 6 computed and 3 looked up all match the stage. "fib(30) makes 2,692,537 calls ... only 31 values" is told, not shown. "Memoization" and "recursion" appear in the last paragraph as vocabulary; both are defined in the same sentence.
- Reveal earned: yes for the 15 and the repeats; the fib(30) explosion is an assertion. The reveal text is also clipped at the card's bottom in the screenshot.
- Problems: (1) "Tap calls to open them" vs a single button that opens all; (2) nodes show bare numbers; (3) the question's definition is hard to read; (4) hook leaks that the answer is not 5; (5) fib(30) told only.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows following the recursive rule and adding but not call trees; my boundary lacks the rule, so the question reads as maths notation. The objective (15 calls, repeated fib(3) and fib(2), remembering answers cuts the work) is delivered by 'Open every call' and 'Remember answers'. The panel's 'tap calls to open them' does not match the stage, where one button opens everything, and nodes show bare numbers. fib(30) is told.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
