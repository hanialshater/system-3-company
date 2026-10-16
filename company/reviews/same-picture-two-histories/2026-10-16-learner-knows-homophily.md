*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: same-picture-two-histories
lesson version: v1
boundary: knows that friends tend to be alike (friends-split-more-than-chance); does not know that "choosing similar friends" and "becoming like your friends" can leave the identical snapshot. Phone viewport, first-time learner, chose "Yes: they picked friends of their own colour".
Screenshots seen: yes (artifacts/walkthroughs/same-picture-two-histories/sheet.png, recorded 2026-10-16T22:40Z, built from 236737ff with a private NEXT_DIST_DIR; plus my own probe frames of Town 1 steps 2-3 and Town 2 step 2, scratchpad, not committed)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Step 1, "Town 1 (picking) · step 1 of 3". The picture uses three line codes: grey dashed, green, red. Only one has a key ("- - link swapped"). I had to infer that red = a friendship across colours and green = the new same-colour friendship that replaced it. The inference works by step 3, when the red arc becomes dashed and a green diagonal appears, but at step 1 "link swapped" for a dashed line reads as "this link is the swapped one", not "this link was dropped". Also at step 1 the counter already says "Town 1: 3 links swapped" while only one swap is visible, so I briefly thought I had missed two. Not blocking: by the last step the story (drop a cross-colour link, add a same-colour one) is readable.
2. **What the prediction felt like.** Weak. The question itself says "Two towns end in this same picture", and option 3 restates that premise word for word ("a picking town and a copying town can both end here"). A test-wise learner picks 3 by matching text, not by thinking. A learner with my boundary (friends are alike because they choose each other) still has a real pull to option 1, so the "Not quite" does land for that reader; but the honest guesser's surprise is thinner than it could be.
3. **Did the reveal answer my question?** Yes. My question after choosing "Yes" was "but Town 1 did pick, so wasn't I right?" The reveal answers it directly: the picture alone cannot tell you which town you are in; you need data over time, "who changed first, the link or the person". That is the idea, said plainly, and the counters ("3 links swapped · 2 colours changed") back it.
4. **Other notes (non-blocking).**
   - The reveal unlocked in the walkthrough after only step 1 of each town (Replay Town 1, Replay Town 2, Show final). A learner can reach the reveal without watching either history finish. In my probe it also unlocked after Town 1 complete plus Town 2 step 1.
   - Town 1's "step 3 of 3 = final" frame keeps the dashed ghosts of dropped links, so it does not look identical to the clean "Final picture" the hook shows; "compare where both end" needs the learner to ignore the ghosts.
   - Town 2 shows only the after-state of the first colour change (ringed node already recoloured); I never saw what colour it had been.
   - On the locked predict frame the second row of controls is clipped at the bottom of the stage on a Pixel 7 viewport.

Verdict reason: no finding stops a first-time learner with this boundary from reaching the idea; the unkeyed red/green code and the giveaway option are worth fixing but do not block.

Status note: the lesson is status draft. From the learner side it is ready to move to review.

## After reading meta.json

- Intent matches experience: the objective (picking vs copying histories end in the identical picture; a snapshot cannot separate them; needs data over time) is what the reveal says, and the misconception ("they must have chosen each other") is the one I walked in with.
- Claim c2 says Town 1 "starts with 3 friendships joining different colours and swaps one per step"; the step-1 frame (two red cross-colour links plus one dashed) is consistent with that, but the starting state is never shown, so a learner cannot count the 3 for themselves. Same for Town 2's first colour change. Non-blocking; it supports finding 1.
- The milestone gate opens before either history is finished on the QA path; whether that is intended is the builder's call.
- Not read: build.md.
