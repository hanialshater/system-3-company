# Fact-check: lowball-offer-should-pass (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Curriculum reference easley-kleinberg-2010 ch. 12 (bargaining and power in networks; the ultimatum game is discussed there): placement matches my knowledge, high confidence. The book was not opened (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rules as coded (POT 10, whole dollars; Accept cell (X, 10 - X), Reject (0, 0)). |
| c2 | verified | accepts(offer) = offer > 0; SMALLEST = 1; offer 0 shows the tie ring and '$0 either way'. Predict answer index resolves to '$1'. |
| c3 | verified | X = 1: accept (1, 9), reject (0, 0). Reveal quotes POT - SMALLEST = 9. |
| c4 | verified | Backward induction with a sure-acceptance proposer. Note: in the discrete game an equilibrium where $0 is offered and accepted also exists; the sentence does not say 'only', and the source states the tie. Easley-Kleinberg ch. 12 (bargaining, ultimatum game) placement matches my knowledge; book not opened. |
| c5 | verified | Framing; stage chip and reveal muted line match. Experimental rates correctly kept out of learner text. |
