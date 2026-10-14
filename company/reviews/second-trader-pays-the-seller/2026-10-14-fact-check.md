# Fact-check: second-trader-pays-the-seller (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Monopoly state in Demo.tsx: bid 0, T1 keeps 1 - 0 = $1; follows from the model rules. |
| c2 | verified | Own node of alternating 1-cent outbids: 100 outbids, bid $1.00 (T1 leads, even), profit 0, seller $1. Note for the builder (non-blocking): the last outbid, $0.99 to $1.00, is a tie (0 either way), so 'would rather outbid' is weak preference there; the limit result is standard Bertrand competition. |
| c3 | verified | BEKT, 'Trading networks with price-setting agents', Games Econ. Behav. 67(1) 36-50 (2009) confirmed by web search (IDEAS/RePEc listing in results; paper not opened). Abstract-level result in search: trader profit requires an essential connection, consistent with two competing traders earning 0. E&K ch. 11 'Network models of markets with intermediaries' confirmed via library-catalogue TOC in web search. |
| c4 | verified | Matches the stage chip and the reveal's muted line; Demo.tsx go() and leader rule. |

**Result:** 4 verified, 0 disputed, 0 withdrawn.
