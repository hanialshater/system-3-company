*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: secret-in-the-counts
lesson version: v2
boundary: adult beginner who knows a language model picks the next word from counts of what followed, and that longer context gives sharper predictions; does not know that text seen only once can be reproduced word for word when its context is unique, so a model can leak private training data, and longer context leaks more (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/secret-in-the-counts/sheet.png, recorded 2026-10-16T14:43:12Z)
Verdict: revise

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("ready, the commonest word after 'is'").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Not in the explore, which is readable: seven training lines, the pin line tagged "private"; "2-word context" prints "my pin is 4 7 1 9" in red with "after 'pin is': 4 ×1"; "1-word context" prints "my pin is ready" with "after 'is': ready ×3, at ×1, …". The contrast is clear. It breaks at the third step the panel asks for: "Delete secret" strikes the line, tags it "deleted", and the stage then reads "**2-word**: my pin is ready" with "after 'is': ready ×3". The question says the model "counts what follows each two-word context", and after deletion there is no "pin is" left to count, so this mind asks: why is a two-word model now using the one-word counts? And what was deleting supposed to show me: that deleting the data fixes the leak? The reveal says nothing about the delete step at all. The panel told the learner to do it, and the lesson never pays it off.
2. **What the prediction felt like.** Too easy for this boundary, and for most careful readers. The question itself defines the model ("counts what follows each two-word context") and shows the training line with the pin in it. "pin is" occurs once, followed by 4. So option 2 follows from the stem by reading, and option 1 ("the commonest word after 'is'") describes a *one-word* model, which the stem has just said this is not. A learner who already knows next-word tallies (the stated boundary) gets this right by reading, not by holding the target belief. The learner who picks option 1 (this walk) has misread the stem, not shown the misconception "a model can't reproduce one rare line". The surprise the lesson is built on ("one sentence out of seven, yet the model wrote it back in full") is real, but the predict card gives it away.
3. **Whether the reveal answered the question the learner actually had.** Half. "After 'pin is', its counts held only one word, so the most common next word was the secret" explains the leak well, and "Longer contexts remember rarer text" generalises it. "Real language models have repeated phone numbers and addresses from their training data" connects it to the world. But the question this mind has after the third step ("does deleting the line fix it, and why does the 2-word model fall back to 'is'?") is not addressed.

**Blocking findings** (either is enough for revise):
- (a) The predict card answers itself from the stem's own definition of the model, so the prediction does not test the belief the lesson targets.
- (b) The "Delete secret" step, which the panel asks for, produces an unexplained result (a 2-word model using 1-word counts) and the reveal never says what it shows.
How to fix (reword the stem, add a backoff note, cut the delete step, or add a reveal sentence) is the CM's or builder's call.

Notes (not blocking):
- "Show me why" unlocked after step 2, before "Delete secret", so the third step is optional for the unlock but required by the panel's instruction.
- The secret is displayed in full in the question text ("including 'my pin is 4 7 1 9'"), so "the model wrote it back" can feel like an echo of what the learner was just shown.
- No dead end under R4: every control changes the stage.

Verdict reason: revise. The predict card's own wording ("counts what follows each two-word context") gives the answer away, and the delete step the panel asks for ends on an unexplained 2-word output that the reveal never mentions.

## After reading build.md / meta.json

(Written after the findings above were committed in 5246021. build.md not read. meta.json read at HEAD 74a730e, committed content only.)
- **Intent vs experience.** The objective is about 2-word vs 1-word context only; it does not mention the delete step. The misconception ("a model ... cannot repeat one private sentence it saw once") is a belief about models, but the predict card can be answered from the stem's description of the counting rule without holding or dropping that belief. Finding (a) stands.
- c2 records the intended behaviour after deletion: "'pin is' never occurred, the model backs off to 'is' and also outputs 'ready'". So the 2-word output after deletion is by design, but the backoff is in the claim and not on the screen or in the reveal. Finding (b) stands: the learner is asked to delete and is not told what it shows.
- The learner boundary says this mind already knows "that longer context gives sharper predictions". That makes the predict card even easier for the intended learner.
