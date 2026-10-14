# Fact-check: outside-option-sets-the-split (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: maximiser of (A-40)(100-A) over whole cents is A=70; formula 0.4+0.3 = 0.70, B 0.30. |
| c2 | verified | Verified on derivation: with linear payoffs, max (A-a)(B-b) s.t. A+B=1 gives A = a + (1-a-b)/2 (own node for a = 0..80 cents). Nash 1950, Econometrica 18(2) 155-162 correct to my knowledge (not opened). E&K ch. 12 'Bargaining and Power in Networks' confirmed via library-catalogue TOC in web search; section (I believe 12.5) unconfirmed. |
| c3 | verified | A = 0.5 + a/2: own node table a = 0..80 gives 50, 55, ..., 90 cents. |
| c4 | verified | For a < 1, A = 0.5 + a/2 > a and B = (1-a)/2 > 0 (own node, all slider values). Model assumption stated. |
| c5 | verified | Matches the reveal's muted model line. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
