*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): heavy-book-close-to-back
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The same weight produces a smaller static moment when its horizontal distance from the support is shorter. The drawing changes distance, not the book’s mass.)
Screenshots seen: yes (artifacts/walkthroughs/heavy-book-close-to-back/sheet.png, recorded 2026-10-15T21:33:26.426Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Far from back"; tapped Near back; slid Book mass 2 -> 2.2 kg; opened reveal.

1. **Where understanding first broke: the vocabulary.** "Static turning moment", "N·m" and "g=9.81m/s²" are physics words. As a beginner I translate "turning moment" to "how hard it pulls the bag backwards", but the lesson never says so. The question is asked in the words I do not have.
2. **The prediction is fair once translated.** Near vs far is an easy guess for anyone who has carried a backpack, and "Same outcome" (same book, same weight) is a real tempting option. Good.
3. **The far-from-back number is never shown.** I saw 1.96 N·m near the back (and 2.16 N·m after adding mass), but never the 5.89 N·m for 30 cm. "Three times less" is the whole point and I never saw it.
4. **The slider varies the wrong thing.** The lesson says "the drawing changes distance, not the book's mass", but the only slider changes mass. Distance can only be flipped between two values. A distance slider would show the idea.
5. Reveal "The current near back setting gives 2.16N·m" compares nothing. The safety hedge (no posture or injury claim, follow the pack's limits) is good.
6. Recall card uses 25 cm -> 5 cm; the stage used 30 cm and 10 cm. Button highlight stuck on "Far from back" after tapping Near back.

Verdict reason: the far-from-back moment is never displayed, so the comparison the question asks for is not on stage, and the key term "turning moment" is never put in plain words.

## After reading the brief (meta.json)

- doesNotKnow is the reveal sentence verbatim and itself uses "static moment"; the boundary ("knows everyday sizes, positions and amounts") does not include that term, so the brief expects the stage to translate it, and the stage does not (finding 1).
- The brief says "the drawing changes distance, not the book's mass", yet the only continuous control is mass (finding 4).
- Recall claim uses 25/5 cm, stage uses 30/10 cm; route to fact-checker. Fix route: demo-builder.
