# Fact-check: zebra-sorts-before-apple (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: cs/zebra-sorts-before-apple v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node charCodeAt and Buffer 'ascii' encoding: A 65, B 66, Z 90, a 97, b 98, z 122. Python 3 unicodedata (UCD 15.1.0, shipped with the interpreter): U+0041 LATIN CAPITAL LETTER A … U+007A LATIN SMALL LETTER Z at the same values, and Python's ascii codec gives the same bytes. RFC 20 and the Unicode chart not opened (hosts blocked); the encodings that ship with node and Python are the openable artifacts. Stage RULER is built with charCodeAt: 'A 65 … Z 90 · a 97 … z 122'; tiles show 'Z = 90', 'a = 97', 'B = 66'. |
| c2 | verified | Own node: ['Zebra','apple','Banana'].sort() = Banana, Zebra, apple; Demo byCode compares strings with < (UTF-16 code units). Reveal 'put Banana and Zebra ahead of apple' is computed from CODE_ORDER. Predict answer index 2 = 'Last' matches. |
| c3 | verified | Own node: sorting on toLowerCase() gives apple, Banana, Zebra; reveal prints CASE_ORDER[0] = apple; reveal needs milestone case-ignored. |
| c4 | verified | Own node over all 26 letters: small minus capital = 32 and toLowerCase maps each capital to that code; Python unicodedata names pair CAPITAL/SMALL for each. Reveal prints GAP = 32. |
| c5 | disputed | As worded the sentence is false: real software commonly sorts text by raw codes. Openable evidence on this host: GNU sort with LC_ALL=C (and C.UTF-8) prints Banana Zebra apple; Python sorted() gives ['Banana','Zebra','apple']; JavaScript's default Array.prototype.sort() does the same, as this lesson's own c2 shows. node Intl.Collator('en') (ICU 77.1) gives apple, Banana, Zebra, so language-aware collation exists, but 'real apps sort … not raw codes' overstates it. UTS #10 not opened. Fix (builder; owner decides wording): qualify the claim, e.g. say that apps sorting words for people usually use language rules (collation) rather than raw codes, and give a source that can be opened. Blocks publishing. |
| c6 | verified | Follows from c1 (verified): every capital 65-90 is below every small letter 97-122. Reveal prints the ranges from charCodeAt. 'Stores each letter as a number' is true of these encodings (node and Python encode each letter as one byte/code unit). |

Dispute c5 is on the board as W-497 (demo-builder). After the fix, a fact-checker re-checks it.
