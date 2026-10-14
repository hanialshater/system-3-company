# Fact-check: diagonal-escapes-the-list, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 The stage shows only the first 8 rows and 8 places; the argument is fo... | verified | Diagonal rule: place n of the new string is the opposite of row n place n, so it differs from row n for every n, including 1,000,000; caption line 102 matches. |
| c4 If your string copies a row's digit at its highlighted place, it is no... | verified | A string differs from row k at place k iff the digits differ; Demo.tsx flags the first copied place (line 98) and colours rowSame. |

Result: 2 verified, 0 disputed.
