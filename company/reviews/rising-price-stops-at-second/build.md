# Build note: rising-price-stops-at-second (ncm-e01, 2026-10-14)

Built from brief #9 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version, including the "Edited:" prediction that asks what the winner pays). No spec or wireframe existed.

- Stage: three value bars ($70, $55, $40) and a price line starting at $30. Raise $1 (step), Raise $5, Run to the end, Reset. A bidder is in while price <= value; the auction ends at $56 when only the $70 bidder is left. Milestone `auction-over` gates the reveal; QA reaches it with one press of "Run to the end".
- Re-ran in node (scratchpad ncm-e01-checks/check.mjs): end price $56, winner $70, keeps $14. Demo.tsx computes FINAL with the same rule.
- Claim c2 rephrases the brief's claim 3 as "any price above $55 and up to $70" (at exactly $55 two bidders are still willing under the lesson's quit rule).
- Built before bid-what-its-worth by instruction ("Build after" is learner order only); the lesson states the sealed second-price rule in one claimed sentence (c3).
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.

## Pre-flight v2

Revision for r6 learner review (knows-quit-above-value, revise): the hook "The lamp is worth $70 to the top bidder. So why does she pay less?" ruled out the $70 option before the commit. The reveal also opened over a reset stage.
Changes: the title is now "What does the winner pay?" (it was "Who sets the winner's price?", which hints that someone else sets it). The hook is now "Three bidders, one lamp, a price that rises a dollar at a time. Where does it stop?". Reset is disabled once the auction is over. No claim text changed, and the version is bumped to 2.

1. **Title and hook.** "What does the winner pay?" / "Three bidders, one lamp, a price that rises a dollar at a time. Where does it stop?" No: neither says less than $70, nor near the runner-up.
2. **Options.** "$70", "$56", "$41": all whole-dollar amounts.
3. **Locked stage.** "One lamp · rising price", three bars labelled Ana $70, Ben $55, Cal $40 (also in the question), each "still in", and a price line at $30. Nothing is drawn at $56, and nothing marks a winner.
4. **Reveal values.** $56, Ben (worth $55) quit, Ana won and kept $14 of $70: (b) milestone `auction-over`. The stage still shows "wins at $56", "quit at $56", "quit at $41" and the price line at $56, because Reset is now disabled at the end. "Any price above $55 and up to $70" and the sealed-bid $55: told context (c2, c3).
5. **QA path.** Raise $1 -> Raise $5 -> Run to the end (`auction-over`, price $56) -> Reset is disabled. The milestone is reached, and the end state is on the stage at the reveal.
6. **Reset.** Reset cannot be pressed after the end, so the stage stays at $56. Reveal: "The price stopped at $56, the moment Ben (worth $55) quit. Ana won and paid $56, keeping $14 of her $70 value. Her own value decided who won; the runner-up's value set the price. / Any price above $55 and up to $70 leaves exactly one willing buyer. Rising a dollar at a time, the auction stops at the first such price. A sealed second-price auction would charge $55: nearly the same. / A model: each bidder knows their own value and quits the moment the price passes it."
