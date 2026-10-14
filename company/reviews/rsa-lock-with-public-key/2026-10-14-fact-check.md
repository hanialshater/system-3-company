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

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node BigInt: 7^3 = 343 = 6 x 55 + 13; m^3 < 55 exactly for m = 0..3 (4^3 = 64). Demo.tsx lock() note says 'below 55, so it never wrapped. A plain cube root undoes it' when m^3 < 55; default message 7. |
| c4 | verified | Own node: (m^3)^3 mod 55 = m for exactly 15 of 55 messages (0,1,10,11,12,21,22,23,32,33,34,43,44,45,54), not for the other 40; 13^3 mod 55 = 52, not 7. Stage note 'happens to come back; most do not' on those 15. 'Some' is right. |
| c7 | verified | m^e > n holds: 7^3 = 343 > 55, and 13 has no integer cube root, so the plain-cube-root shortcut fails. 13^27 mod 55 = 7 (own node). At hundreds of digits, recovering m from c needs d, which needs p and q (RSA 1978; CLRS 3rd ed. 31.7, 31.9; rests on verified c5, c6). Non-blocking note: with a huge n and e = 3, the message 7 itself would not wrap (343 < n), which is why real RSA pads messages; the question asks about the locked number 13, so the claim stands. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
