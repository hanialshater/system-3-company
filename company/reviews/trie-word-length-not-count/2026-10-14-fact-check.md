# Fact-check: trie-word-length-not-count (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node rebuild (scratchpad fc1/trie.mjs, kit mulberry32 seed 1000, randInt 3..8): 1,000 distinct words; walking c,a,t ends on an end-of-word mark at depth 3 in the 10-word and the 1,000-word tree; steps = length for all 1,000 words. |
| c2 | verified | Same script: 990 added strings, lengths 3 to 8, letters a-z; first-letter counts c 48, d 51, s 41, a 44, b 40 ..., summing to 1,000; the stage prints FIRST[ch] from that same list. |
| c3 | verified | Derivation: a successful lookup of a length-L word visits one node per prefix, L steps, with one child choice per step (constant for a fixed 26-letter alphabet); the number of stored words never enters. Knuth TAOCP Vol. 3 (2nd ed.) 6.3 digital searching. Node check: steps = length for all 1,000 words. |
| c4 | verified | Web search (Crossref DOI 10.1145/367390.367400; NIST DADS 'trie'; Wikipedia 'Trie'): E. Fredkin, 'Trie memory', CACM 3(9):490-499, Sept 1960. Note: de la Briandais (1959) described the structure independently; 'described by Fredkin' is still true. |
| c5 | verified | Convention stated on the stage model line, 'One step = follow one letter down the tree.'; the readout counts exactly the letters walked. |
| c6 | verified | Same script: cat is at depth 3 in both trees; c branch 48 words, 5 starting 'ca' (cat, car, cap, cavblpcu, cacruudt); the added words create nodes off the c-a-t path. |

**Result:** every claim verified or withdrawn.
