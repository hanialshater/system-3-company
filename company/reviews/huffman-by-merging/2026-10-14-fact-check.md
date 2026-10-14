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

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node port of join()/lightest() (fc22-5/huff.mjs): two presses of 'Join the two rarest' give (CD), then ((CD)B) and the automatic join with A; joins 2 + 4 + 8 = 14; codes C 000, D 001, B 01, A 1, so lengths 1,2,3,3 and 4+4+3+3 = 14. Bits readout text is joins.join(' + ') + ' = 14'. |
| c6 | verified | join() in Demo.tsx: when next.length === 2 it merges the two at once, so the forest goes 4 -> 3 -> 1 and is never left at 2. The caption 'Join two of these. The last two then join on their own.' shows when forest.length is 3 (not 4, not done, nothing selected, not in the 10-bit view). Every manual order ends with a join of 8 (all 10 distinct totals enumerated). |
| c8 | verified | SHORT_BITS recomputed: 4x1 + 2x1 + 1x2 + 1x2 = 10. '00' parses as C or A A, '01' as D or A B, so the set is not uniquely decodable. Stage message: '10 bits, but is "00" C, or A then A? A's 0 starts C's 00.' |

**Result:** every claim in this pass verified.
