# Fact-check: every-scale-equally-likely (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node sums (fc21b/ring.mjs), people(d) = 2 for d < 512, 1 at 512: q=1 bands 14.7 12.2 11.1 10.6 10.4 10.3 10.2 10.2 10.2 (%). |
| c2 | verified | Same sums: bands 2-3 to 256-512 run 12.2% to 10.2%, i.e. 10-12% to whole percent (12.2 rounds to 12). Builder may prefer 'about 10-12%' since the stage shows 12.2%. |
| c3 | verified | Re-derived: band [2^k, 2^(k+1)) has 2^k distances, each weight in (2^-(k+1), 2^-k], total in (1/2, 1], tending to ln 2. Last band 256-512 holds 257 distances (one person at 512), approximately double. |
| c4 | verified | Own sums: q=0 last band 513/1023 people = 50.15% -> 50.1%; q=2 band 1 = 60.9%. |
| c5 | verified | Own check on this ring: probability one 1/d link lands within D/2 of the target from distance D is 10.6, 8.7, 8.2, 8.1, 10.2% for D = 4, 16, 64, 256, 512 (uniform: 0.5% to 50%; 1/d^2: 15% to 0.1%), so roughly constant only for 1/d. Own greedy-routing simulation (400 trials): mean steps q=0 28.5, q=1 24.0, q=2 116.9, so 1/d does route fast here; note q=0.5 gave 21.7, so at n = 1,024 1/d is fast but not measurably the fastest, and the lesson must not say it is. Kleinberg (2000, Nature 406; STOC 2000) and E&K ch. 20 (advanced section on decentralized search) cited from memory, not opened (hosts blocked); the sentence is verified on the derivation and simulation. |
| c6 (new) | unverified | Unrecorded reveal sentence "two distances against 257, about equal" recorded as a claim; left unverified because I recorded it. |

**Result:** all open claims verified; one unrecorded reveal sentence recorded as c6 (unverified) for the next independent pass.
