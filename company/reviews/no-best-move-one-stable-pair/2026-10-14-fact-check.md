# Fact-check: no-best-move-one-stable-pair (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder ncm-e01). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 6 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node (scratchpad fc22/nash.mjs): Row's best replies M/L, D/C, U/R; Column's C/U, L/M, R/D, all unique; no move of either player is a best reply to all three of the other's moves. |
| c2 | verified | Own enumeration of 9 cells: only (M, L) has both best replies (Row 4 best in L; Column 2 best in M). Each of the 8 others has a strict gain for at least one player. Pure strategies only, as stated. |
| c3 | verified | Own messages for all 8 unstable cells match verdict() logic in Demo.tsx (e.g. UL: Row->M 4>3, Col->C 3>1; DR: Row->U 2>1). |
| c4 | verified | Definition (pure-strategy case of Nash's equilibrium point). Nash, PNAS 36(1):48-49 (1950) confirmed as bibliographic data via web-search snippets (PMC1063129 record); paper NOT opened (hosts blocked). E&K ch. 6 (Games) placement agrees with my knowledge of the book; section not checked. |
| c5 | verified | Convention, present on stage: chip "Payoffs: (Row, Column) · invented"; reveal "Invented payoffs, one round." |

**Result:** every claim in this lesson is now verified.
