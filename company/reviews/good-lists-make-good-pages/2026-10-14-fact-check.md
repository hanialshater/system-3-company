# Fact-check: good-lists-make-good-pages (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node (fc21/hits.mjs), same update order (hub then authority, normalised to sum 1): after 50 updates X 0.099, Y 0.277, Z 0.277, W 0.346; already settled at update 10. W highest, X lowest, as the reveal says. |
| c2 | verified | In-link counts X 3, W 3, Y 2, Z 2 of 10: X 0.300, Y 0.200 at round 0 (own run). |
| c3 | verified | Mutual hub/authority update: Kleinberg 1999, 'Authoritative sources in a hyperlinked environment', J. ACM 46(5) (citation from memory, not opened). Easley and Kleinberg ch. 14 'Link analysis and Web search' confirmed by library-catalog search snippet (book host blocked); hubs and authorities is its section 14.2 from my knowledge. The rule is also exactly what Demo.tsx hits() does. Kleinberg normalises by sum of squares, E&K by sum; the sentence just says 'normalised', which covers both. |
| c4 | verified | Own run: h3 and h4 hub 0.041 (from 0.200), h1 and h2 0.368, h5 0.182. |
| c5 | verified | Demo LINKS: X from h3, h4 (only X) and h5 (X, W): 2 of 3 from single-page lists = 'mostly'; Y from h1, h2 (Y, Z, W each). Predict says 'several good pages'; that is the question's framing, consistent with Y, Z, W ending as top authorities. |

**Result:** all open claims verified.
