# Fact-check: lower-bid-takes-the-top-ad (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | In bid mode, key = round(bid x 1000): A 2000 > B 1500, so A is top. The Demo shows 'Ranked by bid alone.' and the Top slot readout 'Ad A'. The reveal's 'A's $2.00 took the top' matches. |
| c2 | verified | Own copy of key() in score mode: B 1.5 x 1.0 = 1.5 (1500) > A 2.0 x 0.5 = 1.0 (1000), so B is top. The reveal prints '$1.50 x 1.0 = 1.5 against A's $2.00 x 0.5 = 1.0'; the predict key 'Ad B' matches. |
| c3 | verified | Demo pays = second.bid x second.quality / top.quality = 1.0 / 1.0 = $1.00, the same for B at $1.50 and at $1.20 (own node), and B_PRICE = A_SCORE / B_QUALITY = 1.00. $1.00 < A's $2.00 bid. 'Least bid that keeps your slot' is the usual GSP boundary: equal at $1.00, as the source says, and the chip states the rule. |
| c4 | verified | Own node with the Demo's integer keys. B $0.80: 800 < 1000, so A is top and pays 0.8 x 1.0 / 0.5 = $1.60. B $1.00: 1000 = 1000, so the readout says 'Tie' and pays shows a dash. The milestone a-retakes is reachable only at $0.80 in score mode, so the reveal's 'When you dropped B to $0.80' quotes a state the learner reached. (At a tie the stage draws A in the top row while the readout says Tie; that is cosmetic, not a claim.) |
| c5 | verified | Chip 'Model: the top ad pays the least bid that keeps its slot'; the reveal footnote is word for word this claim. The real-search-engine claim from the brief is kept out of learner text, as the source says; I checked every learner string in Demo.tsx. |
| c6 (new, unrecorded) | disputed | Reveal para 2, last sentence (line 62). Under the lesson's own rule (rank by bid x quality) it is false: A, at quality 0.5, outranks B's 1.5 with any bid above $3.00 (e.g. $3.10 x 0.5 = 1.55). A higher bid compensates for lower quality at a rate of 1/quality; that is the point of the score. The stage only varies B's bid, so the learner never tests this, but the sentence is stated generally. Fix (builder): 'A high bid alone does not win: A would need more than $3.00, double B's $1.50, because its quality is half B's.' Or 'Quality multiplies the bid, so a low-quality ad has to bid much more to win.' |

**Result:** 5 verified, 1 disputed, 0 held this pass; the lesson cannot publish until c6 (disputed) is resolved.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node with the Demo's integer keys: B at $1.50 and $1.20 tops (1500, 1200 > 1000) and pays 1.0 / 1.0 = $1.00. Every reachable log order checked: the reveal names the first B-on-top bid tried, or 'on top, B pays' if none was tried in score mode. |
| c4 | verified | Own node: B $0.80 -> key 800 < 1000, A tops, pays 0.8 x 1.0 / 0.5 = $1.60; B $1.00 -> 1000 = 1000, Tie. Milestone a-retakes guarantees the $0.80 log entry exists. |
| c6 | verified | Rank by bid x quality: A's score 0.5 x bid > B's 1.5 iff bid > $3.00 (own node: $3.00 ties at 1500, $3.01 gives 1505). Reveal computes usd(1.5 x 1.0 / 0.5) = $3.00. Pass 23 dispute resolved: the new wording is true under the lesson's rule. |
