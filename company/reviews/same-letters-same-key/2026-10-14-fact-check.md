# Fact-check: same-letters-same-key (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: grouping by sorted letters gives eilnst(4) eggloo(2) act(3) dgo(1), same as Demo binsFor. |
| c2 | verified | Derivation; independent node check by letter counts finds the same 10 anagram pairs as key equality. |
| c3 | verified | node: 10 x 9 / 2 = 45 pairs. |
| c4 | verified | Derivation: each word is keyed and placed once. Note: a hash-table lookup (and Demo's bins.find) compares the new key with stored bin keys; that is key-to-bin, not word-to-word, so the stage's 'Word-to-word checks 0' holds under the claim's own definition. CLRS ch. 11 O(1) expected time from memory, not opened. |

**Result:** 4 verified, 0 disputed, 0 withdrawn.
