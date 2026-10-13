# Fact-check: diagonal-escapes-the-list, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A string whose place k is the opposite of row k's place k differs from... | verified | By construction new[k] = 1 - row_k[k]; differs from row k at place k. |
| c2 The stage shows only the first 8 rows and 8 places; the argument is fo... | verified | Grid is a labelled illustration of 8 rows; the argument is stated for row n generally. |
| c3 No list of endless 0-1 strings can hold them all; this is Cantor's dia... | verified | Cantor 1891 diagonal argument; reveal claims nothing about sizes of infinity. |

Result: 3 verified, 0 disputed, 0 added unverified.
