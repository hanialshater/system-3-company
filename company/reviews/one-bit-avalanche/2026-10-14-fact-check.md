# Fact-check: one-bit-avalanche (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Strict avalanche criterion, Webster & Tavares, 'On the Design of S-Boxes', CRYPTO '85, LNCS 218:523-534 (citation confirmed by web search). Own node check with node:crypto SHA-256 (fc1/aval.mjs): 71,120 single-bit flips of 2,000 messages, each of the 256 output bits flipped with frequency 0.494 to 0.505; mean 128.03 bits changed. Stage says 'whenever anything in the message changes', slightly broader than SAC, but true of SHA-256 in practice. |
| c5 | verified | Same script: a one-bit edit changes 94 to 170 of 256 bits (mean 128), the same as two unrelated digests, so similarity in the message carries no similarity in the hash and no single edit moves the digest only a little; preimage resistance (NIST glossary, citing SP 800-107 Rev. 1) is the design goal. I could not open SP 800-107 (NIST host blocked) to confirm 'section 4.1'; the property is confirmed, the section number is not. Stated as a design property, not a proof. |
| c6 | disputed | Sentence 1 holds (FIPS 180-4: a digest used to detect whether a message changed). Sentence 2 does not match the code: charOf shows bytes 33-126 as themselves and · only for bytes outside that range. Node: the 24 one-bit flips of 'cat' give # ! ` 4 / (non-letters, shown as themselves) and · only when the top bit is set. So · is not 'a character that is not a printable letter', and the stage label '· is a non-letter symbol' is wrong too. Fix (builder, claim and Demo.tsx label): '· stands for a byte with no printable character'. |

**Result:** not fully verified: c6 (disputed).

## Pass 20

Checker: fact-checker (did not write these claims). Re-check of the builder rewording: claim read against Demo.tsx (stage text and reveal), numbers re-run in own node scripts, Demo.tsx parsed with the TypeScript parser (no syntax errors). No build run.

| Claim | Result | Basis |
|---|---|---|
| c6 | verified | charOf(v) at Demo.tsx line 22 returns the character for 33..126 and '·' otherwise; stage label line 78 says '· stands for a byte with no printable character, or a space', matching the claim (32 is space, 0-31 and 127 control, 128-255 none in ASCII). Sentence 1 as pass 19 (FIPS 180-4). The question text repeats sentence 1. |
