*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: winning-bid-overpays
lesson version: v2
boundary: adult beginner who knows that in an auction the highest bid wins; does not know that when the prize is worth the same to everyone and each bidder only has an estimate, the winner is the one who overestimated most, so bidding your estimate loses money on average, and more bidders make it worse (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/winning-bid-overpays/sheet.png, recorded 2026-10-16T14:43:26Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("pays about $100").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Not in a way that blocks. "Run 20 auctions" fills the chart: grey dots (each bidder's guess) scattered around the $100 line, a red dot per auction (the winning bid) sitting near $120, and the tiles "AVG GUESS $99.2 · AVG WINNING BID $116.5", with "(20/20 over)". The picture says it before the words do: the guesses are centred, the winners are not. "2 bidders" drops the winners to $105.4 and some fall below $100 (shown as hollow green rings); "20 bidders" pushes them to $118.6, pressed against the $120 cap.
   Two things make this mind pause:
   - The **hollow green rings** in the 2-bidder chart have no legend. They read as "winner paid under $100", which is probably right, but the learner has to guess.
   - **AVG GUESS reads $99.2 for 10, 2 and 20 bidders.** With 2 bidders there are 40 guesses on the chart, with 20 there are 400; the same average to the cent for all three looks like a tile that did not update. A careful learner may stop trusting the tiles. I have not checked the code yet; this is a hypothesis for the builder or QA, not a finding of fact.
2. **What the prediction felt like.** A real choice. The stem says "guesses are right on average", which pulls hard towards "pays about $100": that is the misconception, set up honestly. The wording "Each bids its guess" (its, for a person) is a small stumble.
3. **Whether the reveal answered the question the learner actually had.** Yes. "Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one" is the explanation this mind needed, and "more rivals, bigger overpayment" generalises it from the 2-bidder run. The 20-bidder run ($118.6) is not in the log line or the reveal, though it is on the stage at reveal time; it supports the same point.

Notes (not blocking):
- The log line under the chart records 10 and 2 bidders but not 20, so the third control looks like it did not "count".
- No dead end under R4: every control changes the stage; "Show me why" unlocked after "2 bidders".

Verdict reason: launch. No finding blocks a first-time learner; the chart shows centred guesses and high winners before the reveal names why. The constant AVG GUESS tile is a note to check, not a block.
