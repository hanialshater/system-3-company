# Fact-check: route-explosion (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Derivation: an order of k-1 cities has k gaps, each giving a distinct order of k cities, and every k-order arises exactly once (delete city k), so count(k) = k x count(k-1). Matches the stage's 'fact(k-1) x k' readout. |
| c4 | verified | Node BigInt: 19! = 121,645,100,408,832,000; the stage's Number fact(19) is exact (odd part < 2^53) and prints the same string. 19! / 1e9 / 31,557,600 s = 3.855 years (3.857 with 365-day years): 'about 3.9'. |

**Result:** every claim verified or withdrawn.
