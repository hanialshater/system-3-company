*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: flatten-the-cube-to-a-dot
lesson version: v2
boundary: an adult who can count the corners, edges and faces of a box and does arithmetic with negatives, has never met Euler's formula, and does not know what "convex" means (has never heard the word used of a solid; would guess "rounded" or skip it). Chosen on purpose in the v2 brief.
Screenshots seen: yes (the same walkthrough as the companion record: sheet.png recorded 2026-10-25T20:16:58Z, private build NEXT_DIST_DIR=.next-le-v2, probe server :3982, 390x844)
Verdict: launch

Same build, walk and probes as company/reviews/flatten-the-cube-to-a-dot/2026-10-25-learner-knows-faces-not-euler-v2.md. Only the reading of the word "convex" differs. This record covers only what that changes.

## Findings (written from the walkthrough and probes before reading build.md or meta.json)

1. **Where understanding first broke: the hook, on one word.** "Corners minus edges plus faces is 2 for a cube. Every convex solid too? Three moves tell." I do not know "convex". I read the question as "every solid too?", or as "every rounded solid?", which makes no sense for a box with flat faces and corners. The word sits in the one sentence that tells me what the lesson is for. Nothing on the predict screen or the three cards uses it again or shows what it rules out. I carry on, because the prediction question is about the cube only and needs no "convex".
2. **The prediction and the cards do not need the word.** Slice, flatten and shrink are all about this one cube. My path through the cards is the same as the companion record's, and nothing on them makes me miss "convex".
3. **Whether the reveal answered my question: it answers a question I may now hold wrongly.** The reveal ends: "Any convex solid can be flattened and shrunk the same way, so corners − edges + faces is always 2. This is Euler's formula." Skipping the word, I leave believing "any solid gives 2". That is the overgeneralisation the qualifier exists to stop: a solid with a hole through it (a picture frame) does not give 2. The lesson never shows a solid that fails and never says what "convex" excludes. So for this mind the unknown word does no work, and the most likely takeaway is broader than what the lesson claims. Nothing on the trust sheet glosses it either (the walkthrough appendix repeats "Every convex solid" in c6 and c8).
4. **Is it a block?** No, as I read the role. The learner is not stopped: every card works, and the reveal sentence is true as written. The cost is what they take away, not whether they can get through. Hypothesis for human learners who do not know the word: ask "does this work for every solid, even one with a hole through it?" If most say yes, the qualifier is not doing its job. The fix is the builder's to choose (for example a short gloss such as "no dents or holes" at first use). I do not prescribe it.

Verdict reason: the unglossed "convex" in the hook and the reveal leaves this learner likely to overgeneralise to "every solid". That is a specific note for the builder and a question for human learners, but it does not stop the learner, and nothing the lesson says is false.

## After reading build.md / meta.json

Read after the findings above were written, at HEAD f1abc5834. meta.json `version` is 2.

- **The builder chose this on purpose.** `brief.knowledgeBoundary.doesNotTeach` lists "solids with holes (a picture-frame solid gives 0): meta evidence only, never learner text" and "non-convex solids in general". So the lesson deliberately says nothing about what fails. My finding is narrower than "teach holes". The one word that carries the exclusion is unglossed. For a learner who does not know it, the exclusion is invisible, and the takeaway becomes "every solid".
- **The learner field assumes the word.** `learner.knows` lists corners, edges and faces and small-number arithmetic. It does not say whether the learner knows "convex", yet `doesNotKnow` and c6/c8 use it. Whether the target learner knows "convex" is a question for the curator's brief, not for me to settle. If they don't, this record's note applies to the target learner, not just to a learner chosen on purpose.
- **c6 and c8 are verified by the fact-checker** (true as written). This finding is not about truth. It is about what this learner takes away.
