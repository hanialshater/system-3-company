# Fact-check: the-middle-voter-decides (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node copy of duel(): wins vs other whole numbers 4,6,8,10,8,6,4,3,2,1,0 for 0..10; only 3 beats all 10. On a 0.1 grid too, only 3 beats every other position. |
| c2 | verified | 24/5 = 4.8; duel(3,5) = 3-2 (own node). Reveal states only that 5 lost; the stage shows 3-2. |
| c3 | verified | duel(4,4.8) = 3-2, halfway 4.4 (own node); matches the reveal. |
| c4 | verified | Own node check over every rival 0..10 in tenths: r>3 keeps 1,2,3 strictly nearer 3; r<3 keeps 3,8,10. 3 of 5 is a majority. |
| c5 | verified | Definition-level: the vote count depends only on each voter's side of (a+b)/2; the mean depends on values. Correct. |
| c6 | verified | Verified on derivation (c4 argument holds for any odd number of voters with single-peaked preferences). Black 1948, JPE 56(1) correct to my knowledge and confirmed as the origin by web search snippets (paper not opened). E&K ch. 23 'Voting' (sec. 23.6 median voter theorem) from my own knowledge, not confirmed (book host blocked); high confidence. |

**Result:** 6 verified, 0 disputed, 0 withdrawn.
