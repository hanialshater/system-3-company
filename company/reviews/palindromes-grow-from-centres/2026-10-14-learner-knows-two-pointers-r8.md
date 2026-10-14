*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): palindromes-grow-from-centres
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 bare locked readouts)
boundary: knows-two-pointers (knows two fingers moving apart or together over a list and what a palindrome is; does not know palindromes can be counted by growing each centre outward, or that n letters have 2n − 1 centres). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/palindromes-grow-from-centres/sheet.png, 9 frames; 09-reveal.png opened at full size)
Verdict: launch with notes

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass, and the r7 blocking finding is fixed. The locked readouts read CENTRES GROWN 0, AAAA FOUND 0, ABAA FOUND 0, ABAA TESTED 0, with no "/ 7" or "/ 10". The seven centre buttons are the stage itself (they match the distractor 7, not the answer 10). Options 4 / 7 / 10, bare numbers.
- The why is on the stage: each centre tap grows green brackets in "aaaa" and "abaa" at once; red dashed brackets and "letters differ" mark where "abaa" breaks; the +n chips accumulate under each word.
- Reveal quotes what I saw: 7 centres, 1 + 1 + 2 + 2 + 2 + 1 + 1 = 10 (the green chip row under "aaaa"), found 6 and the 3 red chips (+0, +0, +1 in red) under "abaa", and "ABAA TESTED 9 / 10, not "abaa"" as a readout. The untested substring is now named on stage (r7 minor fixed).
- Phone fit: pass. In 09-reveal.png the stage top (caption, both words) and the reveal's last line are both on screen; labels, tiles and chips are readable at about natural size.
- Note (word budget): ~92 words by whitespace count excluding the verdict line, ~89 counting only real words (the sum has six "+" and an "="). At the 90 line within counting error; the fit passes. Not a revise on its own.
- Minor: "3 stopped at a red mismatch" points at the red chips; the red dashed brackets that showed each mismatch are only drawn for the current centre, so at the reveal the learner must map "red" to the chip colours. It works.
- Minor (from r7): the +n rows sit between the words and can read as labels for the row below.
- Minor: the reveal does not speak to my "4" directly (I counted single letters); "All 10 of its substrings are palindromes" answers it implicitly.

## 2. Earlier findings (r7), read after section 1

1. Blocking, "/ 10" denominator before the commit: FIXED.
2. Minor, untested substring told only: FIXED ("9 / 10, not "abaa"" readout).
3. Minor, reveal does not address the wrong guess: NOT FIXED (minor).
4. Minor, +n chip placement: NOT FIXED (minor; builder says not changed).

## 3. After reading build.md (Pre-flight v3)

- Pre-flight 3 and 4 match what I saw. No Pre-flight item 7 (phone fit); I judged it from 09-reveal.png (crop 0 by eye).
- Verdict: launch with notes. No blocking finding, no FATAL. Notes: the ~90-word edge, chip placement, the "4" guess unaddressed.
