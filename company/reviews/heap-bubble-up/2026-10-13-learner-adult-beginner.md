*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: heap-bubble-up
lesson version: VERSION_TBD
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the question is written for someone who already programs: "A min-heap holds [2, 5, 3, 9, 6] (parent of index i is (i-1)/2 rounded down). You insert 1 at the end and swap it up while it is smaller than its parent. What is the final array?" I do not know "min-heap", "index", "array" or what the formula means. The locked stage helps a lot: a tree with 2 on top, 5 and 3 below, 9 and 6 under 5, each circle labelled i=0 ... i=4, and the sentence "Every parent is smaller than its children". From that picture I could guess. The three options are arrays of six numbers that differ in order only, so a guess is a coin flip unless I trace it.
- What was SHOWN: "Add 1 at the end" drops 1 under 3 with the message "1 < parent 3: swap"; "Swap with parent" moves it up one place (now under 2, "1 < parent 2: swap"); "Swap until it stops" finishes at the top: "1 is at the top: stop". The array line below the tree changes at every step, so I see the tree and the list change together. That is the strong part.
- Where understanding first broke: the link between the tree and the array. The "i=" labels are on the tree but nothing tells me that the array [2, 5, 3, 9, 6] is the tree read left to right, top to bottom, so the formula (i-1)/2 is meaningless to me. Also the key rule ("every parent smaller than its children") is on the stage only before I start; once I explore it disappears, so I have to remember it.
- Reveal: "1 climbed from index 5 to 2 to 0" matches the stage. "Only the path from the new leaf to the top changed; the other items never moved" is visible in the picture. "About log2 n swaps ... at most 19 for a million" is told, and "log2", "leaf" and "tree height" are new words (the TREE HEIGHT counter on the stage is unexplained). The reveal text is clipped at the card bottom in the screenshot.
- Hook: "Must you re-sort everything?" is a good question for a beginner, and the answer is shown. Not a leak.
- Reveal earned: the climbing idea yes; the efficiency claim by assertion.
- Problems: (1) the question's vocabulary (min-heap, index, array, the formula) blocks a non-programmer; (2) tree-to-array link not shown; (3) the rule disappears from the stage during exploring; (4) log2 and "19 for a million" told.
- No FATAL.
