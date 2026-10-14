# Fact-check: huffman-by-merging, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 Giving each of the 8 letters a 2-digit code costs 16 bits. | verified | Message is 4 A + 2 B + 1 C + 1 D = 8 letters; 8 x 2 = 16 (matches FIXED = 16 in Demo.tsx and the predict text). |
| c3 Each join puts one more digit on the code of every letter inside it, s... | verified | Total bits = sum weight x depth; each merge adds 1 to the depth of every leaf beneath it, so sum over merges of merged weight is the same total. For 4,2,1,1: merges 2 + 4 + 8 = 14. |
| c4 In a code read off such a tree, no code starts another, so a message c... | verified | Codewords are root-to-leaf paths and leaves have no children, so no codeword is a prefix of another; brief codes 1, 01, 000, 001 checked prefix-free. |
| c5 Huffman proved that always joining the two rarest groups gives the few... | verified | Huffman 1952, Proc. IRE 40(9):1098-1101; optimality among prefix codes is CLRS 3rd ed. Thm 16.4 (greedy choice Lemma 16.2, optimal substructure Lemma 16.3). Claim limits itself to prefix codes: correct. |

Result: 4 verified, 0 disputed.
