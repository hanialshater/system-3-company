# Fact-check: binary-numbers

fact-checker · 2026-10-12 · inputs: `src/demos/cs/binary-numbers/meta.json` (c1–c5), `artifacts/walkthroughs/binary-numbers/transcript.md`, `Demo.tsx` strings, recall card.

**Result: 5 recorded claims verified, 0 disputed. 1 unrecorded claim found and added as `unverified` (c6); true by my working. Nothing blocks on accuracy.**

## Method

`artifacts/scratch/fc2-binary-numbers.mjs` (node). Output:

```
c1 sum: 255
c2 patterns: 256  distinct sums: 256  min/max: 0 255  covers 0..255: true
c3 sum_{i<k}2^i = 2^k-1, k<=60 (BigInt): true
c4 2^(k+1) = 2*2^k, k<=20: true   9 switches: 512
c5 2^8 = 256 ; 2^32 = 4294967296 ; > 4e9: true ; max 32-bit value 4294967295
recall: 10 switches max: 1023
127+1 flips 8 switches (01111111 -> 10000000) ; 255+1 wraps to 0
flip count = trailing ones + 1 (8 at 255), mismatches over n=0..255: 0
```

## Recorded claims

- **c1 (128+...+1 = 255): VERIFIED.** Sum recomputed.
- **c2 (256 patterns, each names exactly one whole number 0 to 255): VERIFIED.** All 256 on/off patterns enumerated: 256 distinct sums covering 0..255 exactly. Knuth TAOCP Vol. 2, 4.1 not opened; the enumeration is the evidence.
- **c3 (sum of 1, 2, 4, ... is one less than the next): VERIFIED.** Exact check to k = 60 with BigInt; follows from the geometric series.
- **c4 (one more switch doubles the count): VERIFIED.** 2^(k+1) = 2 * 2^k, with the on/off pairing argument. The stage says "A ninth switch doubles the count to 512": 2^9 = 512, matches.
- **c5 (byte = 8 bits, 256 values 0 to 255; 32 bits give 4,294,967,296): VERIFIED.** Arithmetic recomputed. On byte = 8 bits: IEC 80000-13:2008 treats byte and octet as synonyms for 8 bits (secondary description from search; the standard's text was not opened). Convention support: only consistency is needed. Nuance: "0 to 255" is the unsigned reading of a byte; the lesson's switches only make non-negative numbers, so it is consistent. The reveal's "32 of them pass four billion" is true (largest 32-bit value 4,294,967,295 > 4e9).

## Unrecorded claims (added to meta.json as `unverified`)

| id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c6 | Explore hint; live messages | "try +1 from 127"; "+1 flipped 8 switches."; "Out of switches: back to 0." | 127+1 flips all 8 bits; 255+1 = 2^8 does not fit, so wraps to 0. Flip count verified for all n in 0..255 |

Checked and not claims: option distractors (8, 16, 128); "That is binary" (definition/framing); recall answer 1,023 = 2^10 - 1 (covered by c3). "The biggest you made was N" is computed live and was correct in the transcript (252).

## Fixes routed to demo-builder

None required for accuracy.

- F1. c6 is my addition and needs a checker other than me.
