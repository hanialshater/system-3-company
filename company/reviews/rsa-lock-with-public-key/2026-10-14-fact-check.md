# Fact-check: rsa-lock-with-public-key (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 2^3 = 8 < 55 (node, BigInt). |
| c2 | verified | 4 x 10 = 40; gcd(3, 40) = 1; 3 x 27 = 81 = 2 x 40 + 1. CLRS 3rd ed. 31.7. |
| c3 | verified | Own node BigInt: (m^3)^27 mod 55 = m for all m in 0..54; 8^27 mod 55 = 2. |
| c4 | verified | Own node: m^9 mod 55 = m for exactly the 15 listed values; 8^3 mod 55 = 17. Stage says 'most do not' (40 of 55). Note: 15 of 55 (27%) is more than 'a few'; builder may prefer 'for some toy messages'. Not blocking. |
| c5 | verified | RSA (Rivest, Shamir, Adleman, CACM 21(2) 1978): encryption uses (e, n), decryption d, and d = e^-1 mod (p-1)(q-1) needs the factors; computing d is equivalent to factoring. True of the scheme at real sizes. For this toy see c7. |
| c6 | verified | No polynomial-time classical factoring algorithm is known (CLRS 3rd ed. 31.7, 31.9); 'known' wording is right; quantum excluded. |
| c7 | disputed | Unrecorded predict claim, recorded as c7. 'Only someone who knows 55 = 5 x 11' can unlock 8 is false here: 2^3 = 8 < 55, so the ordinary cube root of 8 gives 2 (likewise m = 0..3), and anyone can lock all 55 messages and look 8 up. Fix (builder): use a message whose cube wraps (e.g. 7 -> 343 mod 55 = 13) and ask about real key sizes. |

**Result:** disputed: c7. Publishing blocked until the builder fixes and a fact-checker re-checks.
