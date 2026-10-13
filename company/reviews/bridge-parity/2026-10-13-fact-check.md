# Fact-check: bridge-parity, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 In Euler's Königsberg problem there were 4 land areas joined by 7 brid... | verified | Standard Euler/Konigsberg layout (island 5, other three places 3 bridges each); Demo.tsx BRIDGES has exactly these 7 connections. |
| c2 The bridge counts at the four places are 5, 3, 3 and 3: all four are o... | verified | Degrees recomputed from Demo.tsx BRIDGES: island 5, north 3, south 3, east 3; sum 14 = 2 x 7. |
| c3 Passing through a place uses two bridges, one in and one out, so only ... | verified | Euler 1736 / Hierholzer 1873 criterion (0 or 2 odd places). Reveal says "two too many" for 4 odd places: correct. |
| c4 With bridge 7 (south-east) closed only two places are odd, and a walk ... | verified | With bridge 7 closed degrees are island 5, north 3, south 2, east 2. Walk N-1-I-2-N-3-E-4-I-5-S-6-I crosses all six (checked against BRIDGES). |

Result: 4 verified, 0 disputed, 0 added unverified.
