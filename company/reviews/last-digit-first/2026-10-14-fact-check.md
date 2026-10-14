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

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | Numbers verified (own node fc21/radix.mjs: places 2, 1, 0 end 720 355 436 457 657 329 839; last digits ascend, list not sorted; marks > < < < > <). DISPUTED on what the stage shows: the reveal adds 'with red > marks', but the stage shows only the run last touched and finished runs cannot be re-shown. A learner who finishes first-digit-first before last-digit-first sees the sorted run (all green <) while the reveal points to red > marks. Fix (builder): keep both final lists with their marks on stage (e.g. the 'ended' lines with marks) or drop the stage pointer. |
| c3 | disputed | Facts verified: last-digit-first pass 3 rings bucket 3 holding 329 then 355, tied on first digit 3, in pass-2 order; stability argument re-derived (CLRS 4e 8.3 from memory, not opened). DISPUTED: the stage shows only the run last touched. Following the explore hint (last first, then first first), the reveal's 'Look at the ringed bucket on pass 3: those cards tied on the first digit' points at the first-digit-first stage, where bucket 7 is ringed holding 457 and 657, which tied on the LAST digit (first digits 4 and 6). The pointer is false on the likely path. Fix (builder): name the bucket in the reveal ('bucket 3 on your last-digit-first pass 3: 329 then 355'), or keep the last-digit-first pass-3 buckets visible. |

**Result:** 2 disputed; the lesson cannot publish until the builder fixes and the claim is re-checked.
