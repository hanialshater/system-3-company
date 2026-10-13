*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: runs-that-grow
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "Write a row as count-then-letter: WWWW becomes 4W. For the row BWBWBWBW (8 pixels), is the coded version shorter, the same, or longer?" The rule is shown by example and the row is short, so a careful learner can do it in their head; a hasty one says "shorter" because the hook says "squeezing a picture should make it smaller". The hook ("Can it ever make it bigger?") leaks that the answer may be "longer", but the choice is still a real decision. "Compression", "coded" are everyday enough.
- What was SHOWN: very good. Pixel buttons toggle black/white, and the code appears live under the row ("1B 1W 1B 1W ..."), with counters PIXELS, CODE CHARS and CHANGE. Painting a black pixel at a time on an all-white row gave CHANGE -4 (code "1B7W" = 4 chars), then all black gave -6; "Question's row" gave "+8" with the 16-character code on screen. I saw the row that shrinks and the row that grows, as the panel asked. The 16-pixel row with one more black pixel gave +4, a nice extra data point.
- Where understanding first broke: nothing blocking. A small one: in the transcript path the 8-pixel all-black row ("8B", 2 chars) is the "best", but the stage never tells me why long runs are good; I inferred it from the numbers. "Lossless" appears only in the reveal and is not defined.
- Reveal: "Your best row coded 8 pixels in 2 characters. Your worst took 16 for 8." Both numbers were on the stage. "16 white pixels code as 16W, 3 characters" matches what the all-white button would show (it was not pressed in the path, so told). The last sentence ("No lossless scheme can shrink every input: there are fewer short codes than inputs...") is a pigeonhole argument told in one breath; a beginner will not follow it and nothing on the stage supports it. The fact-check note on the trust sheet itself concedes the wording is only strictly true under conditions.
- Reveal earned: the main point yes; the "no scheme can shrink every input" generalisation no.
- Problems: (1) hook hints at "longer"; (2) "lossless" and the counting argument unearned; (3) the stage shows only run-length coding, so the reveal's claim about all schemes is not shown.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows reading black/white squares and counting; matches. The objective (16W is 3 characters; BWBWBWBW becomes 16 characters; no lossless scheme shrinks every input) is mostly delivered by live painting and the CHANGE counter; the last clause is told. The misconception (compression always shrinks) is hit by the hook and the Shorter option.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: launch
