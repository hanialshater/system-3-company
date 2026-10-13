*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: hash-bucket-pileup
lesson version: VERSION_TBD
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "hash table", "key", "slot" and "random slot" are not things I know; "collision (two keys in one slot)" is defined in brackets, which helps, and "more likely than not" is plain English. Options 2, 5, 9 are a fair guess (many people think 9 or 10 because "the table must fill first"); this is a birthday-paradox shaped question, and it is a real one. The hook is neutral and does not leak.
- What was SHOWN: "Next key" drops a numbered key into a random column; "Drop until a collision" runs to "Collision at key 4!" with the shared slot highlighted in red; "+20 tables" repeats and builds a bar chart titled "Key that caused the first collision, 21 tables" with the bars running along a 2 to 11 axis. I could see collisions arrive early.
- Where understanding first broke: the chart. The axis numbers (2 to 11) are never labelled as "key number", the bars have no counts, and the colours (red bars up to 5, grey after) are unexplained. The question asks when a collision becomes "more likely than not", which needs a running total or a half-way line; the stage has neither, so I cannot read the answer off it. The first bar being at key 2 is fine but nothing says how many tables each bar stands for.
- Reveal: "In your 21 tables, 15 had a collision by key 5" cannot be checked on the stage (bars have no values; I can only estimate). "1 x 0.9 x 0.8 x 0.7 = 0.504" and "0.3024 ... 70%" are told: the stage shows no probabilities, and the reason that each factor shrinks (a key must miss the already-filled slots) is one sentence of text. "Java's HashMap resizes when 75% full" is jargon that appears from nowhere. The reveal screenshot is also clipped at the card bottom mid-sentence (may scroll).
- Also: the last table shown collided at key 6, while the answer is 5: no problem, but a learner may wonder whether the stage contradicts the reveal; nothing explains that tables vary.
- Reveal earned: "collisions come early" yes (I watched them); the exact threshold and the maths no.
- Problems: (1) bar chart axis and colours unlabelled; (2) no running total or 50% line, so the question cannot be answered from the stage; (3) 15-of-21 and all the probabilities are told; (4) "hash table", "key", "HashMap" never grounded.
- No FATAL.
