# Build note: lru-eviction-order (demo-builder, 2026-10-13)

- Design intent: the request tape A, B, C, A, D above three cache slots. Each slot shows its item and "used step N" (LRU) or "in since step N" (first in, first out), with a "next out" tag on the victim once the cache is full. Next request steps; Play to the end jumps to D; the rule toggle replays the same stream position under the other rule.
- Deviation from brief: no free tapping of items and no longer stream; the lesson stays on the question's stream so the comparison is the same five requests under two rules. Hits/misses are the same on this stream for both rules (1 / 4), so the reveal does not claim LRU has fewer misses here.
- Key state: D's eviction under LRU (B) and under first-in (A). Milestones ["lru-evict", "fifo-evict"], minInteractions 2. QA path: Next, Play to end, Rule toggle, Restart.
- Numbers: question stream, slot count and the reveal's evicted letters come from STREAM/simulate() in Demo.tsx. Brief answer (B) re-computed in Node with an independent implementation and held.
- After screenshots: layout reads on phone; no changes.

## v2 (revision 2026-10-13)

- Reveal no longer claims LRU "keeps more hits" (both rules show 1 hit, 4 misses on this stream). It now says the rules score the same here and shows where they differ if B or A is requested again. Claim c4 rewritten (unverified); new derivation claim c6 (unverified).
