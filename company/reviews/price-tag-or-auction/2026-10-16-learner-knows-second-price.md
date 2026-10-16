*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: price-tag-or-auction
lesson version: v1
boundary: knows second-price auctions (bid-what-its-worth): highest bidder wins and pays the second bid; does not know that a seller who knows only the value range earns more from the best fixed price with one or two bidders, but from an auction from three. Phone viewport, first-time learner, chose "2".
Screenshots seen: yes (artifacts/walkthroughs/price-tag-or-auction/sheet.png, recorded 2026-10-16T22:40Z, built from 236737ff with a private NEXT_DIST_DIR)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** The second row under the x-axis, "tag: $50.00 $57.74 $63.00 $66.87". It is in the same green as the "best price tag" revenue line, so at step 1 I read "$57.74" and "$38.49" as two competing revenue numbers for the tag. Only the reveal ("the best tag ($57.74) earned $38.49") tells me the row is the price set and the line is what it earned. I also had no way to see why the best tag rises with bidders (more chances someone's value clears a higher tag); the lesson never says, and I did not need it for the main point. Mild; the caption line "2 bidders: tag earns $38.49 · auction $33.33" carries the comparison on its own.
2. **What the prediction felt like.** Real. 2, 3 and 5 are all plausible; the 1-bidder state visible before committing (tag $25, auction $0) makes the auction look bad without giving away where it catches up. With my boundary I understood why the auction earns $0 with one bidder (no second bid, and no reserve), which made "2" feel safe. Being wrong by one bidder was a fair surprise.
3. **Did the reveal answer my question?** Yes. My question was "why does the tag still win at 2?" The reveal gives both halves: a tag set knowing only the range is a guess (too high, nobody buys; too low, money left), while the auction's price is the second-highest value, which gets better with every rival. At 2 bidders that second value is still low; at 3 it overtakes. "Simulate 1,000 sales" (tag $52.69, auction $59.33 at 4) helped me trust that the line values are averages, not one lucky run.
4. **Other notes (non-blocking).** At 3 bidders the two value labels ($50.00 and $47.25) sit almost on top of each other at the crossing; the caption line is where I read them. "No reserve" appears only in the reveal; a learner who knows real auctions have reserve prices may wonder about it earlier.

Verdict reason: the comparison, the crossing at 3 and the reason for it all reach a learner with this boundary; the "tag:" row labelling is a polish note.

Status note: the lesson is status draft. From the learner side it is ready to move to review.

## After reading meta.json

- Intent matches experience: the objective (tag wins with 1 or 2 bidders, auction from 3, because the auction price is the second-highest value while a tag is a guess) is what the stage and reveal showed, and the misconception ("an auction always earns more") is what my "2" carried.
- Claim c8 ("best price tag is set knowing only the range") is what makes the "tag:" row meaningful; on the stage that row has no label beyond "tag:". It supports finding 1 (label the row as the price, e.g. "tag price:").
- Not read: build.md.
