*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): next-word-tally
lesson version: v3
boundary: adult beginner; uses phone predictive text, can count; nothing about language models.
Screenshots seen: yes (artifacts/walkthroughs/next-word-tally/sheet.png, 5 frames, build 3 at localhost:3470)
Verdict: launch

## 1. From the artifact

- Predict: "the" with its followers (cat ×2; dog, fish, mat, rug ×1) and the three training sentences in the question. Nothing leaks; "No, it never saw that sentence" is a real pull.
- Explore: tapping cat, then sat shows each word's followers as count bars, so I can see the model's whole memory and how it picks one word at a time. "Let it finish" produced "the cat sat on the fish." with "New: not in the training text." and a row of pair chips (the→cat ×2, cat→sat ×1, sat→on ×2, on→the ×2, the→fish ×1, fish→. ×1). The gate stayed on "Try it first" until that new sentence existed, then opened "Show me why".
- That is the moment my "No" broke: the stage made a sentence nobody wrote, and every chip under it has a count. Both causes in the gap (picking from counts; recombining pairs) were on stage, not only in text.
- Reveal: quotes my sentence and points at the chips ("every pair under it on the stage had a count of at least 1"). It then maps the question's sentence onto pairs. dog→sat was not on my path, but the panel suggested building it and the derivation is one line. The nonsense sentence and the LLM paragraph are bounded, claimed context.
- Minor: the follower list at predict clips the rug row.
- Minor: the sentence box still moves vertically between frames (top at predict, middle in explore).

## 2. Earlier findings (r5, v2)

1. Gate opened on a verbatim fragment ("the mat."): **fixed**. The gate now waits for a sentence marked New.
2. Counterexample told, not built: **fixed** on the QA path, which built a new sentence with its pair chips on stage.
3. Sentence box jumps vertically: **not fixed** (minor).
4. Rug row clipped at predict: **not fixed** (minor).

## 3. New findings

- None beyond the minors above. No FATAL.
