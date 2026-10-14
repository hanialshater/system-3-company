# Fact-check: bid-what-its-worth, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write these claims). Method: read Demo.tsx and the walkthrough transcript, then re-ran the exact rule (`wins = bid > rival`, `profit = 70 - rival` if win else 0) in my own node script: rival bids $0.00-$400.00 in cents x alternative bids $0-$200 in whole dollars.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 highest bidder wins, pays second-highest | verified | Definition of the sealed-bid second-price (Vickrey) auction; stage rule line says the same and the code charges the rival's bid. E&K ch. 9: a search-index read of the Cambridge front matter lists "9.4 Second-Price Auctions" (after 9.3 at p. 228); not opened directly, so `section_unconfirmed` stays. |
| c2 $70 never worse, sometimes strictly better | verified | 0 cases (of 40,001 x 201) where any bid beats $70. Every alternative bid is strictly worse for some rival: $50 for 2,000 rival values, $90 for 1,999, $69 for 100, $71 for 99. Weak dominance, as the claim says. |
| c3 rival $75: $90 pays $75, loses $5; $70 keeps $0 | verified | profit(90,75) = -5, profit(70,75) = 0. Transcript bars at Rival $75 show "−$5" for $90. |
| c4 rival $60: $50 earns $0; $70 pays $60, keeps $10 | verified | profit(50,60) = 0, profit(70,60) = 10. |
| c5 tie goes to the rival | verified | `wins` uses strict `>`; stage rule line and reveal say so. |
| c6 bid only decides whether you win; below $70 gives up paying wins, above adds losing wins | verified | A bid b < 70 changes the outcome only for rivals in [b, 70), all with profit > 0; a bid b > 70 only for rivals in [70, b), profit <= 0. Note (non-blocking): at a rival bid of exactly $70 the extra win breaks even rather than loses; "wins that lose money or break even" would be exact. No stage rival is at $70. |
| c7 why the format invites honest bids | verified | Follows from c2 (truthful bidding is weakly dominant); this is the standard Vickrey result and the subject of E&K ch. 9 (section as above). |

Also checked: the predict question says "whatever the others bid" (plural) while the stage has one rival; with several rivals the price is the highest other bid and the same argument holds, so the predict answer ($70) is correct. Recall ($100 value) is the same argument at a different value.

Unrecorded claims: none found.

Result: 7 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own case analysis with ties to the rival: a bid b > 70 differs from 70 only when 70 <= r < b, where it wins and earns 70 - r <= 0 (0 only at r = 70); a bid b < 70 differs only when b <= r < 70, where 70 wins and earns 70 - r > 0. Matches the reveal paragraph 2 and the profit() rule in Demo.tsx. |

**Reveal check:** Reveal quotes rival $60 and $75 (both milestones). Paragraph 2 is c6/c2. No unbacked sentence.

**Result:** 1 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 7 verified.
