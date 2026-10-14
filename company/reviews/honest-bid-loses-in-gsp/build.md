# Build note: honest-bid-loses-in-gsp (ncm-e01, 2026-10-14)

Built from brief #12 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version, including the edit that drops the GSP revenue range). No spec or wireframe existed.

- Stage: two slot boxes (10 and 4 clicks) showing who holds each and the price per click, X's profit sum, and a profit bar for every bid X has tried ($0-$10). Presets Bid $5, Bid $8, Honest $7 and a slider. Y and Z bid $6 and $1. Milestones `bid-lower` and `bid-higher`.
- Tie rule chosen and disclosed on the card: ties go to the other bidder. Under it, bids $2-$6 give slot 2 at $1 (profit 24), $7-$10 give slot 1 at $6 (profit 10), $0-$1 no slot. The brief's numbers ($7 -> 10, $5 -> 24, $8 -> 10) do not depend on the tie rule (checked both ways in node).
- Not claimed, per the brief's edit: any GSP revenue range, and the VCG revenue comparison ($44). No sentence says search engines used this rule (the brief's doesNotKnow says so, but no claim supports it); the hook says "each ad pays the next bid down" instead.
- Built before pay-for-the-harm-you-do by instruction; the lesson stands alone because the card states the rule.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
