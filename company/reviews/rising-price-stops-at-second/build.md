# Build note: rising-price-stops-at-second (ncm-e01, 2026-10-14)

Built from brief #9 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version, including the "Edited:" prediction that asks what the winner pays). No spec or wireframe existed.

- Stage: three value bars ($70, $55, $40) and a price line starting at $30. Raise $1 (step), Raise $5, Run to the end, Reset. A bidder is in while price <= value; the auction ends at $56 when only the $70 bidder is left. Milestone `auction-over` gates the reveal; QA reaches it with one press of "Run to the end".
- Re-ran in node (scratchpad ncm-e01-checks/check.mjs): end price $56, winner $70, keeps $14. Demo.tsx computes FINAL with the same rule.
- Claim c2 rephrases the brief's claim 3 as "any price above $55 and up to $70" (at exactly $55 two bidders are still willing under the lesson's quit rule).
- Built before bid-what-its-worth by instruction ("Build after" is learner order only); the lesson states the sealed second-price rule in one claimed sentence (c3).
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
