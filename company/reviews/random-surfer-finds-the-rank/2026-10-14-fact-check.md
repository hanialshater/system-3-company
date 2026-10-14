# Fact-check: random-surfer-finds-the-rank (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own copy of surf() with kit mulberry32: seed 146 at 100,000 -> A 31,211, B 29,645, C 33,220, D 2,948, E 2,976 (31.2%, 33.2%); 1,000 clicks A 31.9%, C 32.5%; seeds 7, 2026, 14 agree within 0.1 pt. Note for the builder: the claim's parenthetical is wrong: the reveal always quotes the fixed 100,000-click run (FINAL), not the learner's count at their stopping point. Harmless because the 'long-run' milestone forces 100,000, but fix the claim wording. |
| c2 | verified | Power iteration (500 rounds) and exact linear solve: A 0.31234, B 0.2955, C 0.33217, D = E = 0.03. |
| c3 | verified | Sources not opened (hosts blocked). From my own knowledge: E&K ch. 14 'Link Analysis and Web Search' (14.3 PageRank, scaled PageRank; 14.6 random-walk formulation) and Brin & Page 1998, Computer Networks and ISDN Systems 30, which introduces the 'random surfer' reading. Chapter placement: confident. |
| c4 | verified | Demo.tsx OUT = A->B, B->C, C->A, D->C, E->C: C's only out-link is A; IN_LINKS D 0, E 0; D, E shares 0.03 each. |
| c5 | verified | OUT has one target per page; SEED = 146 fixed and surf() restarts mulberry32(SEED), so totals depend only on the click count. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
