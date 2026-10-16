*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: the-swap-that-goes-in-circles
lesson version: v1
boundary: knows what it is to prefer one thing to another and to pay a little for something you prefer; does not know that circular preferences let someone sell you swaps for ever, nor the word "transitive" or why choice models assume it. Phone viewport, first-time learner, chose "Apple, 60¢ poorer".
Screenshots seen: yes (artifacts/walkthroughs/the-swap-that-goes-in-circles/sheet.png, recorded 2026-10-16T22:40Z, built from 236737ff with a private NEXT_DIST_DIR)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** The reveal's second paragraph: "That is why choice models assume preferences are transitive." This is the sentence that states the lesson's point, and it rests on a word I do not have. Nothing on the stage or in the panel says "transitive"; the only bridge is the previous sentence's "Once his preferences were ranked", so I have to guess that transitive means "ranked, no circle". A learner with my boundary leaves able to say "circles cost you money" but not what the models assume. The very next sentence then adds a new claim the lesson never showed: "A group's majority can still go round in a circle even when every voter's preferences are ranked." There are no groups, voters or majorities anywhere in the lesson; it raises a question ("so is the circle rational after all?") in the last line and leaves it.
2. **What the prediction felt like.** Real but narrow. The cycle diagram is visible before committing, so a careful learner can trace three swaps back to cherry; that is fine, it is a reasoning prediction. The third option, "Banana, 30¢ poorer", cannot be right on its face (6 swaps at 10¢ is 60¢), so the choice is really two-way. I chose Apple by mis-counting the circle, and "Not quite" was a fair surprise.
3. **Did the reveal answer my question?** Half. My question was "wait, so he paid 60¢ and is back where he started?" The first paragraph answers it well (after 3 he held the cherry again, 30¢ poorer; after 6, 60¢ for nothing; ranked, he stopped at his favourite after 2). The interaction is strong: the "✕ refused" dashed edge after "Rank them: apple first" shows exactly where a ranking breaks the circle. The second paragraph is where the lesson loses me (finding 1).
4. **Other notes (non-blocking).** After "6 swaps" and "3 swaps" both end on cherry, the frames look identical except for the paid figure and the fruit trail; that is the point, and the trail under the diagram carries it.

Verdict reason: the reveal's takeaway sentence uses "transitive" without saying what it means and then adds an unshown claim about group majorities; gloss the word in the learner's terms (for example, "ranked: if he prefers A to B and B to C, he prefers A to C") and drop or earn the voter sentence.

Status note: the lesson is status draft. From the learner side it should not move to review until the reveal's second paragraph is revised; the fix is text-only.

## After reading meta.json

- Intent vs experience: the objective's first half (every swap wanted, 3 swaps return the cherry, 6 cost 60¢; ranked preferences stop at the favourite) reached me fully. The second half ("this is why choice models assume transitivity") did not, because the reveal never glosses "transitive". The objective and the recall "why" both write "ranked (transitive)"; that parenthetical is in meta.json but not in the reveal the learner reads. Putting it there is the smallest fix for finding 1.
- Claim c5 (a group majority can cycle) is verified, and curriculum.prerequisites lists math:condorcet-cycle, so for a learner who did that lesson the voter sentence is a callback, not a new idea. The stated boundary (meta.json learner.knows) does not include it, and I walked from that boundary, where the sentence reads as an unearned turn. The revise verdict rests on the missing "transitive" gloss alone; the voter sentence is the builder's call if the boundary is widened to include condorcet-cycle.
- Not read: build.md.
