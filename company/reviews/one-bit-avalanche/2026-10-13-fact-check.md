# Fact-check: one-bit-avalanche, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 SHA-256 turns any message into 256 bits.... | verified | FIPS 180-4: SHA-256 digest 256 bits. |
| c2 Flipping one bit of the message changes about half of the 256 output b... | verified | Independent run in Node crypto: 5,000 random 3-byte messages, one random bit flipped: mean 127.8 changed bits, min 98, max 153. On "cat" (24 single-bit flips) mean 125.0, range 112-143. |
| c3 The stage computes a real SHA-256 of the 3-letter message (8 bits per ... | verified | Imported the lesson's sha256.ts and compared with crypto.createHash on 500 random inputs: 0 mismatches; "abc" gives the FIPS test vector. |
| c4 A good hash is built so that each output bit flips with a chance of ab... | verified | Strict avalanche criterion (Webster & Tavares 1985); expectation 128 matches c2. |
| c5 So similar messages do not get similar hashes, and a message cannot be... | verified | Stated as a design property (preimage resistance goal, NIST SP 800-107), not a proof: reveal wording "similar messages do not get similar hashes" is a safe reading. |

Result: 5 verified, 0 disputed, 0 added unverified.
