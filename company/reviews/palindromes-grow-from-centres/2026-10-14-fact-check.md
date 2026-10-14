# Fact-check: palindromes-grow-from-centres (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Definition; odd-length substrings have a middle letter, even-length a middle gap. Predict question says each start and end position counted separately, matching brute() counting by (i, j). |
| c2 | verified | Own node (fc21/pal.mjs): centre counts 1,1,2,2,2,1,1 = 10; every centre stops at the word's end (l < 0 or r = n); brute force 10 = 4+3+2+1 substrings, all palindromes. |
| c3 | verified | n letters + (n - 1) gaps = 2n - 1; aaaa gives 7 (Demo CENTRES). |
| c4 | verified | Derivation checked: each substring has one middle; a substring is a palindrome iff its ends match and its inner substring (same centre) is a palindrome, so stopping at the first mismatch loses nothing. Own random test: centre expansion equals brute force on 20,000 random a/b strings. |
| c5 | verified | Own node: racecar has 7 x 8 / 2 = 28 substrings, 10 palindromes (7 letters, cec, aceca, racecar); Demo brute('racecar') same logic. |
| c6 | verified | Manacher, J. ACM 22(3) 1975, 346-351, title 'A new linear-time on-line algorithm for finding the smallest initial palindrome of a string': confirmed by web-search snippets (Wikipedia 'Longest palindromic substring'), which also say Apostolico, Breslauer and Galil (1995) observed the same algorithm finds all maximal palindromes in linear time. Sentence names 'Manacher's algorithm', the standard name for that linear all-centres method, and does not claim the 1975 paper counted palindromes; attribution acceptable. Papers themselves not opened. |

**Result:** all open claims verified.
