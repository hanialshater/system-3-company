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

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | The run and 'ordered by the last digit only' check (own fc23/radix.mjs: places 2,1,0 end 720 355 436 457 657 329 839; last digits 0 5 6 7 7 9 9). But the claim's example is not what the reveal prints. Demo.tsx fBad = the first i with f[i] > f[i+1], which is i = 0, so the reveal reads '(720 comes before 355)', not '(657 comes before 329)'. The run is deterministic (one start list, no reset), so every learner sees 720/355. Fix (builder): change the claim's parenthetical to '720 comes before 355'. The learner text is already true, so no Demo change is needed. |
| c3 | verified | Demo.tsx v4 reveal: lb = runs.last.buckets once runs.last.passes === 3. Runs cannot be reset, and the gate needs both runs finished, so lb is always set at the reveal. lt = the first bucket with two or more cards = 3, holding '329 then 355' (own fc23/radix.mjs). The reveal no longer points at the stage, so it holds when the first-digit-first stage (bucket 7 ringed: 457, 657) is on screen. The caption template 'Tie in bucket N: kept the order earlier passes gave it' matches line 147. Stability re-derived from deal(): pushes in list order, flattens 0-9. CLRS 8.3 from memory, not opened; the claim rests on the derivation. |

**Result:** 1 verified, 1 disputed, 0 held this pass; the lesson cannot publish until c2 (disputed) is resolved.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own radix run first digit, middle, last: 720 355 436 457 657 329 839; last digits 0 5 6 7 7 9 9 ordered, the list is not; first out-of-order pair found by the reveal's findIndex is 720 > 355. Each run can be done only once (no reset), so the ending is fixed. |

**Result:** all open claims verified; no disputes.
