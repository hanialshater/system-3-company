# Fact-check: last-digit-first (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own stable bucket passes (scratchpad fc19b2/radix.mjs): 720 355 436 457 657 329 839 -> 720 329 436 839 355 457 657 -> 329 355 436 457 657 720 839 = sorted. |
| c2 | verified | Own run places 2,1,0: 329 355 457 436 657 720 839 -> 329 720 436 839 355 457 657 -> 720 355 436 457 657 329 839; last digits 0 5 6 7 7 9 9 ascending, list not sorted (436 after 355 fine but 329 after 657). Reveal branch in Demo.tsx shows this text only when not sorted. |
| c3 | verified | Derivation: Demo.tsx deal() pushes in list order into each bucket and flattens buckets 0-9, so equal-digit cards keep prior order (stable). Inductively after pass p the list is sorted on the last p digits. CLRS 4e 8.3 / Figure 8.3 (this input) from memory, not opened; argument re-derived. |
| c4 | verified | Same induction as c3 with d = 3 places; own random check: 50,000 lists of 1-40 three-digit numbers incl. duplicates, three passes always equal numeric sort. |
| c5 | verified | Demo.tsx: mark is '<' iff v < next, else '>'; values distinct so no equal case. Own run of pass-2 list gives > < < > < <. |

**Result:** every claim in this lesson is now verified.
