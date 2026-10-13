*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: huffman-by-merging
lesson version: v2
boundary: an adult who remembers school arithmetic and science, new to the topic.

## 1. From the artifact

Screenshots seen: predict, step 2 ("Group of weight 2"), reveal (all viewed).

- Prediction: the question is dense. "A message has 4 A's, 2 B's, 1 C and 1 D ... a code of two 0s and 1s (00, 01, 10, 11) costs 16 bits ... Codes may be shorter for some letters if no code is the start of another. How few bits can it take?" The key rule ("no code is the start of another") is the hardest idea in the lesson and it is in a subordinate clause, with no example of why it matters. 16, 14, 10: with the hook ("Can uneven codes do better?") I know the answer is not 16, so I choose between 14 and 10 on a coin-flip. I chose 16 as the instructed path and learned nothing from the guess.
- Where understanding first broke: step 1. "Join the two lightest" joins C and D into a "2" circle, and the bit counter jumps to 2, the codes under C and D show 0 and 1, and the caption says "Each join adds a bit to everything below it." Why joining costs bits is not visible: I see the number 2 appear, but I do not see which letters now cost one more. "Lightest" (a weight) is never defined; the circles are labelled "C x 1", which a beginner reads as "C multiplied by 1".
- What was SHOWN: the tree forming from the bottom, edges labelled 0 and 1, the code under each letter growing (000, 001, 01, 1) and the bit total settling at 14 with "Done: 14 bits, versus 16 fixed." That is a clear picture of a short code for A and long ones for C and D. The path I was given let the lesson join the pairs for me ("Join the two lightest" button), so I did not need to understand which pair to pick.
- Values in the reveal never on the stage: "a join costs its weight" (2 + 4 + 8 = 14) is the key trick and is told; my tree's per-letter costs (4 + 4 + 3 + 3) are not displayed as numbers on the stage. "Always joining the two lightest gives the fewest bits possible: Huffman coding" is a claim I cannot test: the stage never offers a worse tree for comparison (and the option 10 is never shown to be impossible). The reveal text is cropped on the phone view.
- Reveal earned: 14 yes. "Optimal" is told. The idea of a prefix-free code is explained by one sentence ("No code is the start of another, so the message decodes without gaps"), with no example of a code that fails.
- Terms before definition: "bit" (used as a unit of cost with a half-definition), "weight", "lightest", "start of another" (prefix), "Huffman coding".
- Problems: (1) the prefix rule is buried in the question with no counterexample; (2) "C x 1" notation and "weight" undefined; (3) the auto-join button removes the choice that carries the idea; (4) optimality is told, no worse tree is shown.
- No FATAL.

## 2. After reading the brief

(PENDING-SECTION-2)

Verdict: revise
