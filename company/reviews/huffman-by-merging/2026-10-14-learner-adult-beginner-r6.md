*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): huffman-by-merging
lesson version: v4
boundary: adult-beginner. Knows bits and binary codes, that 4 symbols fit in 2-bit codes, and small arithmetic; does not know that codes of different lengths can still decode, prefix codes, or Huffman's algorithm (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/huffman-by-merging/sheet.png, all 6 frames)
Verdict: launch

## 1. From the artifact

- Hook and predict: "8 letters, 2 bits each, 16 bits. Can uneven codes do better?" matches the question. The options (16 / 14 / 10) include a tempting 10. The locked stage shows four letter circles with counts and "Bits 0", and nothing leaks.
- Explore, the trap: "Try 10-bit codes" gives A 0, B 1, C 00, D 01. The stage itself asks: "10 bits, but is '00' C, or A then A? A's 0 starts C's 00." The codes go red. The learner sees why the cheap answer fails, which is the best moment in the lesson.
- Explore, the tree: "Join the two rarest" joins C and D into a "2". The learner then taps the 2 and B to make a "4", and the last two join on their own into an "8". Codes appear under each letter as joins add digits (C 0 → 000). Bits builds to "2 + 4 + 8 = 14". The join-cost rule ("a join costs the group's total count") can be read off the node numbers, which match the Bits sum. It is shown.
- Where I wobble: the stage reads "Join two of these" as if I could choose any pair, but this run only took the rarest-first path. I never saw a worse pair cost more, for example joining A with B first. "Huffman proved that joining the two rarest first is never beaten" is told, and the lesson gives me nothing to compare it against. As context it is acceptable. If "why rarest first" is the lesson's point, it is not shown.
- Reveal: it matches what I saw (14, 2 + 4 + 8, A 1 / B 01 / C 000 / D 001, the A-0-starts-C-00 clash). At the reveal the stage is scrolled and the top "8" node is cut off.
- Minor: the chip says 80 s, over the 60 s format (product-owner item). The trust link reads 5/8 claims checked (fact-checker item).

## 2. Earlier findings (r5 review, v3)

1. The stage never showed why 10 fails (top finding): **fixed**. "Try 10-bit codes" builds A 0 / B 1 / C 00 / D 01, and the stage asks whether "00" is C or A then A. The reveal points back at it.
2. "When two are left, they join automatically" appeared with three left: **fixed**. It now reads "Join two of these. The last two then join on their own."
3. BITS jumped 2 → 14 without showing the sum: **fixed**. The readout shows "2 + 4 + 8 = 14", and the node numbers 2, 4, 8 are on the tree.
4. Optimality told, no worse tree shown (r2 finding 2): **not fixed, now minor**. The learner can tap any pair, so a worse tree can be reached, but nothing prompts them to try one, and "never beaten" stays a told, claimed sentence.
5. 80 s chip: **unchanged** (product-owner item).

## 3. After reading the brief

- doesNotKnow "codes can have different lengths and still be decoded" and "prefix codes": both are shown. The red 10-bit set fails on stage, and the tree's codes are visibly prefix-free.
- doesNotKnow "Huffman's algorithm": the learner performs it (join rarest, join next, last join). The objective's "each join adds one bit to every symbol beneath it" is visible as codes lengthen under each join.
- The proof that rarest-first is optimal is not in the objective. It is context, told in one claimed sentence, which the told-vs-shown decision allows.
- Minors: no prompt to try a worse pair, reveal-frame crop, 80 s chip, 5/8 claims checked. No FATAL.
