*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: huffman-by-merging
lesson version: VERSION_TBD
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the question packs in "bits", "fixed 2-bit codes (00, 01, 10, 11)", and "codes can differ in length if none is the start of another". I can follow "16 bits" (8 letters x 2) but I cannot reason my way to 14 or 10; the options are a guess. The hook ("Can a code with uneven lengths do better?") answers itself with a yes. "Bits" is never explained for a non-programmer.
- What was SHOWN: four circles A x4, B x2, C x1, D x1; "Join the two lightest" and tapping two circles merges them into a tree, with 0 and 1 on the branches, and a BITS counter. The instruction "Each join adds a bit to everything below it" is on the stage and makes the cost idea reachable. The finished tree writes the code under each letter. In the transcript path I pressed "Join the two lightest" once (C and D merge into a 2), then tapped A and B myself (which merge into 6, not the lightest) and the stage ended "Done: 16 bits, no better than fixed". I was never shown the 14-bit tree: the lesson's payoff only exists if I start over and join in the right order (the button does it, but nothing told me to try).
- Where understanding first broke: the reveal, which says the right order is "C + D = 2, then with B = 4, then with A = 8, total 2 + 4 + 8 = 14". That number appeared on no stage I saw. Then "No code is the start of another (A 00, B 01, C 11, D 10), so the message decodes without gaps" lists the four 2-bit codes from my 16-bit tree, right after the 14-bit result; the 14-bit code (short for A, long for C and D) is never written out. A reader will think the 14-bit codes are those four codes, which cost 16. That sentence contradicts the paragraph above it.
- "Always joining the two lightest gives the fewest bits possible: Huffman coding" is told, not shown (one case only). The closing line ("short codes for common symbols, long codes for rare ones") is the real point and is never visible in my run, because in my run A got "00" the same length as D.
- Terms used before defined: bits, code, prefix rule, "weight", "lightest".
- Reveal earned: no, in the transcript path: the stage showed the failure, the reveal asserted the fix.
- Problems: (1) hook and question jargon; (2) the 14-bit tree is not on any stage the default tap path reaches; (3) the reveal's code list belongs to the 16-bit tree and contradicts its own 14; (4) optimality asserted.
- No FATAL, but the reveal's code list is misleading.
