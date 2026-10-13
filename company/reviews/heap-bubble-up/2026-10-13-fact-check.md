# Fact-check: heap-bubble-up, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 In a min-heap every parent is smaller than (or equal to) its children,... | verified | CLRS 6.1 min-heap property; stage values distinct. |
| c2 Inserting 1 into [2, 5, 3, 9, 6]: 1 swaps with 3 (index 5 to 2), then ... | verified | Re-ran the sift-up: swaps (index 5<->2), (2<->0); result [1,5,2,9,6,3]. |
| c3 Each swap climbs one level, so an insert costs at most the tree's heig... | verified | floor(log2 6) = 2, floor(log2 1e6) = 19; insert O(log n) (CLRS 6.5). |
| c4 A heap can be stored as an array where the parent of index i is (i − 1... | verified | Zero-based parent floor((i-1)/2). |

Result: 4 verified, 0 disputed, 0 added unverified.
