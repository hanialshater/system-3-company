# Build note: lowball-offer-should-pass

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #16 (NCM)

- Intent: ten coins split between you and the proposer, with the two outcomes (Accept and Reject) side by side. The better one is ringed green. At $0 both are ringed in dashed grey ("$0 either way"). This follows the brief's Edited note: the question asks for the smallest offer worth accepting ($1), not the smallest you accept (which would be a tie at $0).
- Controls: preset offers $5, $3, $1 and $0 come first in DOM order, so QA reaches both milestones. The brief's whole-dollar slider comes after them. The offer starts at $4, so every preset changes the stage.
- Milestones: "offer-one" (accepting still beats rejecting) and "offer-zero" (the tie that makes $1 the smallest).
- The reveal handles the misconception using what the learner saw: rejecting $1 punishes the proposer ($9) but costs you $1.
- Kept out of learner text: brief claim 3 (experimental offers of 40-50% and rejections below about 20%), which is flagged for a human source check. The reveal's last line only says that a responder who cares about fairness is a different model (c5). For the same reason I dropped "and that real people often don't" from learner.doesNotKnow: the lesson does not show it, so promising it would leave a told sentence. Once the empirical claim is checked, a v2 could add it.
- The title does not name $1, because $1 is the answer.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
