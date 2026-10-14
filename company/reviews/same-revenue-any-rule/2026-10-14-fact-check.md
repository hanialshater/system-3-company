# Fact-check: same-revenue-any-rule (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Curriculum reference easley-kleinberg-2010 ch. 9 (auctions; first-price, second-price, all-pay and seller revenue): matches, high confidence. The book was not opened (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own re-implementation (mulberry32(97), values 100 r() A then B): 33.395 / 33.303 / 33.302, shown to one decimal as 33.4 / 33.3 / 33.3. |
| c2 | verified | E[min] = 100/3; E[max]/2 = (200/3)/2; all-pay 2 x (10000/3)/200 = 100/3. Derivation holds. |
| c3 | verified | Own node best-response check at v = 60: first-price best bid 30.00 (v/2) against v/2 bidding; all-pay best bid 18.000 = 60^2/200 against v^2/200. Second-price truthful is dominant (standard). Note: the builder's source text says 'Fact-checker confirms' before any check; that phrase is the builder's, not this pass's. |
| c4 | verified | Holds for this model by c2/c3. Myerson, Math. Oper. Res. 6(1):58-73 (1981) and Riley & Samuelson, AER 71(3):381-392 (1981) confirmed as publications by search-result text only (not opened); their revenue-equivalence attribution is from my own knowledge. Easley-Kleinberg ch. 9 (auctions) placement matches my knowledge. |
| c5 | verified | Framing; chip 'Model: 2 bidders · values random $0-100 · seed 97' and reveal muted line match. |
| c6 (new, unrecorded) | disputed | Reveal: 'First-price charges less, half the winner's value.' Average payments are equal (33.3 vs 33.3) and half the winner's value is below the lower value in 10,065 of 20,000 seeded auctions. Builder rewords; see the claim's source for a suggestion. |
