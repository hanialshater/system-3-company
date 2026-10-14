# Fact-check: caesar-falls-to-frequency (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | E = 4, X = 23 (A = 0); 23 - 4 = 19 (node). Stage KEY = 19; reveal 'X is 19 places after E'. |
| c2 | verified | Lewand (2000) table gives E 12.702%, highest of the 26 letters; claim is about typical English, as stated. Not re-opened from the book (no access); the figure matches every standard English table I know. |
| c3 | verified | Own node count of PLAIN: 94 letters, E 23, T 13, H 9, R 6. Shifted by 19, top cipher letter X 23, next M 13, so the tallest bar is unique and 'Tallest bar to E' lands on 19 first. Over-representation of E is disclosed in the source. |
| c4 | verified | A shift is a bijection on the 26 letters applied to every position, so counts are carried letter to letter (own node: cipher histogram is the plain histogram rotated by 19). |
| c5 | verified | Shifts 0..25; 0 is the identity; 25 non-trivial. |
| c6 | verified | Singh, The Code Book (1999) ch. 1: al-Kindi (9th century), 'A Manuscript on Deciphering Cryptographic Messages', earliest known description of frequency analysis. Stage: 'Al-Kindi described this attack in the 9th century'. |

**Result:** all claims in this pass verified.
