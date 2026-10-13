# Fact-check: big-number-swallows-one, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 In JavaScript, 9007199254740992 + 1 comes out as 9007199254740992, wit... | verified | Node: 2**53 + 1 === 2**53 true; no error. |
| c2 A JavaScript number is a double (IEEE 754 binary64) with 53 bits of pr... | verified | ECMAScript Number type = IEEE 754 binary64, 53-bit significand. |
| c3 Every whole number up to 2^53 = 9007199254740992 fits exactly, but bey... | DISPUTED | Wording overreach: "beyond it only every second whole number exists" is true only up to 2^54; from 2^54 up only every fourth number exists, and so on. Immediately above 2^53 (all the stage shows) it is exact. Fix: "just beyond it (up to 2^54) only every second whole number exists", or "beyond it, whole numbers start to be skipped, first every second one". Rest of the claim (exact up to 2^53; MAX_SAFE_INTEGER = 2^53 - 1) verified. |
| c4 Past 2^53, adding 1 lands exactly halfway between two numbers and is r... | verified | Node: 2**53+2 = ...994; (2**53+2)+1 = ...996; (2**53+4)+1 = ...996. Ties-to-even explains "does nothing or jumps by 2". |
| c5 For exact big integers, JavaScript has BigInt.... | verified | BigInt exists in ECMAScript 2020; 9007199254740992n + 1n = ...993n. |

Result: 4 verified, 1 disputed, 0 added unverified.
