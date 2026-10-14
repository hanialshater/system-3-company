*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): huffman-by-merging
lesson version: v3
boundary: adult beginner (school arithmetic, new to the topic)
Screenshots seen: yes (artifacts/walkthroughs/huffman-by-merging/sheet.png, all 5 frames)
Verdict: revise

## 1. From the artifact

- Predict: the stem defines a bit and gives the counts (A4 B2 C1 D1) and the 16-bit baseline. It asks "how few bits can the message take?" with 16 / 14 / 10. The locked stage shows four letter circles with counts and dashes for codes. Nothing leaks.
- Explore: "Join the two rarest" joins C and D under a "2" node. Codes 0 and 1 appear under them, with "1×1=1" costs, and BITS reads 2. Then I tap the 2 group and B. The final join with A happens on its own, and BITS jumps straight from 2 to 14: "Done: 14 bits, versus 16 fixed." The finished tree shows codes A 1, B 01, C 000, D 001 with per-letter costs 4×1, 2×2, 1×3, 1×3. Reading the codes, I can see why it beats 16: A, the common letter, got the one-digit code.
- Where I lost the thread: after the first join the stage says "When two are left, they join automatically", but three items were left. I read it as an error until the third step.
- The counter skipped the middle join: it went 2 → 14 without showing 6. So "a join costs the group's total count, 2 + 4 + 8" is told in the reveal, not watched.
- Reveal: 14 and the codes match what I saw. My real question as a beginner was "why not 10?". If I give A "0", B "1", C "00", D "01", I count 10 bits. The reveal answers only in words ("No code starts another … so the message decodes with no gaps. Huffman proved that joining the two rarest first is never beaten"). The stage never shows a too-short code set failing to decode, and never lets me build a worse tree to compare. So "14 is the fewest" is told, and the question asked for the fewest.

## 2. Earlier findings (r2 review, v3)

1. No failing code shown for the prefix rule: **not fixed**.
2. Optimality told, no worse tree shown: **not fixed**.
   r2 accepted findings 1 and 2 as a sourced told claim and gave launch. I disagree for this boundary. The predict question asks "how few bits", and 10 is offered as an option. A learner who picks 10 gets "Huffman proved" as the only rebuttal, so the stage does not answer the question that learner has. That is why the verdict moves to revise (new finding 1). This is a judgment difference with r2, not a regression in the lesson: the lesson version is unchanged (v3).
3. Auto-join removes the choice: **unchanged**. The last join still happens automatically, and the misplaced caption is new finding 2.
4. "C 1" label odd before the first join: **unchanged**, minor.

## 3. New findings

1. Moderate (top): the question asks for the minimum, and the 10-bit distractor is the natural beginner answer. The stage never shows why 10 fails (an ambiguous message such as "00" = C or AA, when codes may start one another), and never shows a different tree costing more. "14 is the fewest" rests on "Huffman proved". For a first-time learner the lesson shows that uneven codes beat 16. It does not show why 14 is as low as it goes.
2. Minor: "When two are left, they join automatically" appears after the first join, when three items remain. It reads as wrong at that moment.
3. Minor: BITS jumps 2 → 14 because the last two joins land together, so the 2 + 4 + 8 sum is not seen step by step.
4. Minor: duration chip reads 80S (product-owner item).
- No FATAL.
