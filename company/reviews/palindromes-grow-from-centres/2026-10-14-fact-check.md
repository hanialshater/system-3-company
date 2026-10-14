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

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v2 wave E revision. Method: read v2 Demo.tsx (two aligned words, brackets, +n rows, readouts, reveal; no Reset) before the sources, then re-ran grow() in my own node port with a brute-force cross-check (scratchpad fc24/pal.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | 20,000 random words: every palindrome found exactly once from its own centre, nothing else counted. Growth passes through the inner substring first. |
| c7 | verified | abaa: 1+0+2+0+1+1+1 = 6 (brute force 6); 3 fails; 9 distinct substrings tested, only 'abaa' untested; middle 'ba' fails. Reveal values equal these once all-centres fires. |

**Result:** every claim open at this pass is now verified.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own port of grow('abaa', k): per-centre 1, 0, 2, 0, 1, 1, 1 = 6 (brute force over 10 substrings: 6); fails at centres 1, 3, 4; tested set has 9 distinct substrings (each substring has one centre, so the per-centre sum 9 equals the distinct count); the only untested one is [0, 3] = "abaa"; middle centre k = 3 fails on [1, 2] = "ba". Readout label "abaa tested" with value '9 / 10, not "abaa"' appears only when done.length = 7, which the reveal requires (all-centres); taps only add. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
