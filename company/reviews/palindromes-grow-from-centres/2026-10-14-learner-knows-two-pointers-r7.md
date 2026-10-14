*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): palindromes-grow-from-centres
lesson version: v2
boundary: knows two fingers moving apart or together over a list (two-pointers-meet) and what a palindrome is; does not know palindromes can be counted by growing centres, or that n letters have 2n − 1 centres. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/palindromes-grow-from-centres/sheet.png, build 4 at localhost:3480)
Verdict: revise

## 1. From the artifact (written before reading r6)
- **Top finding (No answer before the commit): the locked stage shows the right answer as a denominator.** Before I commit, the readouts show "CENTRES GROWN 0 / 7" and "ABAA TESTED 0 / 10". The options are 4 / 7 / 10. "10" is the right option, and "/ 10" is the number of substrings of a 4-letter word. A learner who thinks "every piece of 'aaaa' reads the same both ways" only needs that denominator to pick 10 without counting. The "0 / 7" matches a distractor, so the locked stage names two of the three options. The total substrings should not be drawn until after the commit (or should appear as the tested count grows).
- **The why is on the stage now.** Each centre tap grows green brackets in "aaaa" and in "abaa" at once. In "abaa" a red dashed bracket and "letters differ" mark where the mirror breaks (+0 at gaps 1–2 and 2–3, +1 at letter 3). "ABAA TESTED" climbs to 9 / 10 while "ABAA FOUND" stops at 6. I can see that growing from centres skips work, which is the hook's question.
- **Reveal** quotes 7 centres, the 1 + 1 + 2 + 2 + 2 + 1 + 1 = 10 sum (readable off the +n row), 6 found, 3 red stops and 9 of 10 tested. All are on the stage when it opens. "4 letters and 3 gaps give 7 centres: 2n − 1" points at the button row. About 95 words.
- Minor: "'abaa' itself was never tested, because its middle, 'ba', had already failed" is true to the counts, but the stage never marks which substring is the untested one. The 9 / 10 is visible; the missing 1 is told.
- Minor: the reveal does not speak to my wrong guess "4" directly (that I counted only the single letters). "All 10 of its substrings are palindromes" answers it implicitly.
- Minor: the +n chips sit in two rows between the words and look like labels for the row below them; it took a second look to see the upper row belongs to "aaaa".
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Top: the mirror never breaks in "aaaa", so "you don't test every piece" is told | fixed: "abaa" grows in parallel, red mismatch brackets, "ABAA TESTED 9 / 10" |
| 2n − 1 told as a formula | fixed: reveal points at "4 letters and 3 gaps" |
| Manacher's algorithm as a new idea in the last line | fixed: dropped |
| Empty space above the letters on the phone | fixed: the second word fills it |

New in v2: the "ABAA TESTED 0 / 10" readout added to fix r6's top finding shows the right option's number before the commit.

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
