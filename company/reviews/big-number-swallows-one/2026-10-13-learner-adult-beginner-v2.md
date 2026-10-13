*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: big-number-swallows-one
lesson version: v2
boundary: an adult who remembers school arithmetic and science, new to the topic.

## 1. From the artifact

Screenshots seen: predict, step 2 ("+ 1, five times"), reveal (all viewed).

- Prediction: the question is a 16-digit number plus one; almost every adult says ...993 (arithmetic), a few say "error". The right answer ...992 is the one a non-programmer would never pick, which is the point. The stage while locked already shows a number line with "2^53" under 992 and a tick of 989 to 998, and the answer button for 992 and the exact number in the question are the same digits, so a careful reader sees that "992" is special without being told why. The hook ("Rounding errors hide in far decimal places. Surely whole numbers are safe?") states the false belief and is not a leak.
- Where understanding first broke: "In JavaScript". I know none of this; the question assumes I know what JavaScript is and that it stores numbers in a limited way. "2^53" appears on the stage before it is defined, and the legend "a JavaScript number can hold it / it can't" appears only after the first tap.
- What was SHOWN: tapping "+ 1, five times" shows ...990 + 1 = ...991, ...991 + 1 = ...992, then ...992 + 1 = ...992 (x4) in red, with hollow dashed circles on 993, 995, 997 (numbers that "can't" be held) and filled dots on the others. That is a vivid picture: some numbers are missing from the line. "+ 2" lands on 994, which makes "every second number" visible.
- Values in the reveal never on the stage: "53 bits of precision", "double", "Number.MAX_SAFE_INTEGER = 2^53 - 1", "up to 2^54", "rounded to the even one" (why 993 goes to 992 and 995 to 996 is not shown), and "BigInt". The second paragraph is a wall of jargon for a learner at this boundary and is cropped on the phone screenshot.
- Reveal earned: the answer 992 yes (I saw four times in a row). The WHY (halfway rounding to even) is told in jargon.
- Terms before definition: JavaScript, 2^53, double, bits of precision, round-to-even, BigInt.
- Problems: (1) "2^53" and "can hold it" used before defined; (2) jargon-heavy reveal paragraph; (3) round-to-even is told, not shown (my path never adds 1 to 993-region numbers); (4) no note on why a learner who is not a programmer should care.
- No FATAL.

## 2. After reading the brief

- Previous review (v1, revise): jargon undefined; hook assumes decimal-rounding knowledge; 2^53 label unexplained; the "jump by 2" half never shown; disputed claim sentence in the reveal. Now: "+ 2" is a stage button and shows 992 to 994, the hollow circles show the missing numbers, and the reveal wording is rewritten. Partly fixed. Still open: JavaScript, double, bits, MAX_SAFE_INTEGER and BigInt are undefined, and 2^53 appears before it is explained.
- The brief's learner does not know that big numbers lose whole integers; the number line with missing points is the objective's picture, and round-to-even is told. The misconception (whole numbers are always safe) is hit by option 1.
- Claims verified.

Verdict: revise
