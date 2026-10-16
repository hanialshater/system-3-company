*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: suitcase-layer-access
lesson version: v2
boundary: adult beginner. Packs bags, owns a drawer of cords and a sock pile, does school arithmetic (add, subtract, multiply). Has no physics of moments, no combinatorics (has never seen n(n-1)/2), and has never seen these household hacks framed as counts.
Screenshots seen: yes (artifacts/walkthroughs/suitcase-layer-access/sheet.png, recorded 2026-10-16T11:17:20Z, lhw3 at 99d6f2d, production build, phone viewport, option 1 chosen)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Walked from the transcript cut at the trust-sheet appendix (steward ruling R1) and sheet.png. Path: option 1, A, B, slider.

1. **Where understanding first broke.** At the question itself: "The rain jacket is under five items. How many do you lift to reach it?" The answer (5) is in the question. The locked stage also shows five arrows above the jacket.
2. **What the prediction felt like.** Not a prediction. The distractors "0: it's in the bag" and "1" are not beliefs anyone holds, so the only way to be wrong is to misread. I chose 0 (on the forced path) and got "Not quite: it was 5" for a question that had told me 5.
3. **Did the reveal answer my question?** It said "it was 5" and then, in the next sentence, "you lift 7 items". The 7 comes from the slider (8 items), but next to "it was 5" it reads as a contradiction. The idea it teaches (what you need first goes in last) is the same as jacket-last-first in this wave, which teaches it better because it asks about order instead of stating the count.

Verdict reason: the question states its own answer, so the predict step tests nothing; and the reveal's "it was 5" sits next to "you lift 7" without saying the slider changed the scene.

## After reading build.md / meta.json

- The brief's misconception is "packing order doesn't matter as long as everything fits", which is a good target, but the question as written ("under five items. How many do you lift?") does not test it. A question about order or choice would, as jacket-last-first's question does.
- The `.seen` claim confirms that the reveal's first sentence is recomputed from the slider state. That is where "you lift 7" comes from, next to the fixed "it was 5".
- The r11 point (the stack did not read as a stack) is fixed: the stack is clear now.
