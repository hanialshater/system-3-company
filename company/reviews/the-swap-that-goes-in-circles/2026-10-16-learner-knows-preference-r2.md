*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: the-swap-that-goes-in-circles
lesson version: v1
boundary: same as r1 (company/reviews/the-swap-that-goes-in-circles/2026-10-16-learner-knows-preference.md): knows what it is to prefer one thing to another and to pay a little for something you prefer; does not know that circular preferences let someone sell you swaps for ever, nor the word "transitive". Phone viewport (Pixel 7), first-time learner, chose "Apple, 60¢ poorer".
Screenshots seen: yes (artifacts/walkthroughs/the-swap-that-goes-in-circles/sheet.png, recorded 2026-10-16T23:15Z, built from e092f6c3 with NEXT_DIST_DIR=.next-le-ncm-r2, port 3711; plus a playwright probe of the reveal gate on the same build, port 3712, scratchpad, not committed)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Does r1 still hold?** No; the blocking finding is fixed. The reveal's second paragraph now reads "That is why choice models assume preferences are ranked (transitive): if Max prefers apple to banana and banana to cherry, he prefers apple to cherry, so there is no circle to sell him." The word is glossed in my terms, with Max's own fruit, and the example ties back to the "Rank them: apple first" replay, where the cherry-to-apple edge showed "✕ refused". The unshown voter/majority sentence is gone, so the lesson ends on its own point.
2. **Where understanding now first breaks.** Nowhere that blocks. Still from r1: "Banana, 30¢ poorer" cannot be right on its face (6 swaps at 10¢ is 60¢), so the prediction is really two-way.
3. **What the prediction felt like.** Real but narrow, as in r1; I mis-counted the circle, and "Not quite" was a fair surprise.
4. **Did the reveal answer my question?** Yes, both halves now: "he paid 60¢ and is back where he started?" (paragraph 1) and "so what do the models assume, and why?" (paragraph 2).
5. **The reveal gate (QA observation: locked until every milestone is hit, with only "Try it first" as a hint).** This is the lesson where it bites hardest. Probed: "6 swaps", "Rank them: apple first", "Back to the circle" leaves "Try it first". That is everything the panel asks ("Replay the swaps, then give Max a ranking and replay again"); the reveal opens only after "3 swaps". The 3-swap fact is already visible in the 6-swap fruit trail, so this gate guards the least new step. Still not blocking: "3 swaps" is the one untouched button of four, one tap away, and a learner facing "Try it first" will try it. It is friction a learner may read as a broken button; the hint could name the untried control, or the panel could mention "3 swaps".
6. **Version stamp.** The reveal changed, but the lesson is still v1 (r1 also reviewed v1, verdict revise). Two v1 reviews on the same day with different verdicts: tools/publish-ready.mjs breaks that tie by file mtime, which a fresh checkout does not preserve. Not a learner finding; recorded so the builder or steward can bump the version.

Verdict reason: the r1 revise finding (unglossed "transitive", unearned voter sentence) is fixed; nothing left stops a first-time learner with this boundary.

## After reading build.md / meta.json
- Intent matches experience, now in full: the objective's second half ("ranked (transitive) preferences ... this is why choice models assume transitivity") is now what the reveal says, in the same words the objective and recall use.
- meta.json version is still 1 (build.md: "Text-only change to the reveal's second paragraph; stage, predict and gates unchanged"). My stamp is v1 to match. Two v1 reviews now exist (r1 revise, r2 launch, same date); per tools/publish-ready.mjs the tie goes to the file written last (mtime). Bumping the version to 2 would make this unambiguous; that is the builder's call (finding 6), not mine.
- build.md confirms milestones six, three and ranked (minInteractions 3), and the QA reveal-fix record (2026-10-16-qa-reveal-fix.md) saw the same: the reveal opens only after all three. The panel names two of the three (finding 5).
- tags still include "voting" though the voter sentence is gone; not learner-facing.
