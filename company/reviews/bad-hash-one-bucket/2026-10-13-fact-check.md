# Fact-check: bad-hash-one-bucket, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Every multiple of 10 leaves remainder 0 when divided by 10, so with sl... | verified | Multiples of 10 mod 10 = 0; 10 slots, 1 used. |
| c2 Under slot = key mod 7 the same 10 keys use 7 slots.... | verified | Remainders 3,6,2,5,1,4,0,3,6,2: 7 distinct. |
| c3 Keys that land in the same slot are kept as a list in that slot, and f... | verified | Chaining: CLRS 11.2. |
| c4 A good hash breaks up the patterns real keys have, such as all ending ... | verified | CLRS 11.3: hash value should be independent of patterns in the data. (The source parenthetical about powers of 10 is not CLRS text; the claim itself stands.) |

Result: 4 verified, 0 disputed, 0 added unverified.
