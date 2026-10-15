# Fact-check: checking-is-not-finding (2026-10-14)

Board: W-657. Lesson: src/demos/cs/checking-is-not-finding/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Check, Search 9, Search 13, Add a 7th number and Reset in any order; the trace survives Reset, and all four milestones gate the reveal.

Advisory (not blocking, cm-cs's call): the predict answer 64 is the count for blind enumeration, the stage's stated method. Pruning (skip any group with 34 in it) or meet-in-the-middle proves 'no 13' with fewer checks. If the question should mean 'how many groups are there', saying so would close that reading.

Sources: CLRS 3e 34.5.5 and Karp (1972) were not opened. walkccc/CLRS docs/Chap34/34.5.md has only exercises: 34.5-4 solves subset sum in polynomial time when the target is in unary (consistent with the pseudo-polynomial caveat), but nothing confirms the section number or NP-completeness.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: each number in or out, 2^n groups; 2^6 = 64, 2^7 = 128. The stage grid is 2^nums.length squares. |
| c2 | verified | Re-ran search() and an independent enumeration of all 64 sums: first sum 9 at index 20 (21st tried) = {4, 5}; groups with sum 9: {4,5} and {3,4,2}; no group sums to 13 (13 is not among the 64 sums), so 64 tried. The reveal's hard-coded '21st' matches FIND9.tried = 21. |
| c3 | verified | Derivation: a group of k numbers needs k - 1 additions; {4, 5} needs 1. |
| c4 | disputed | The phrase 'without a search that grows this fast' is wrong as the stage frames it. 'This fast' points at the doubling the learner just saw (64 -> 128). Meet-in-the-middle (split the numbers into two halves, list each half's sums, match them) finds a group or proves there is none using 2^(n/2) + 2^(n/2) sums: 16 instead of 64 here, 24 instead of 128 with seven numbers. That grows by about 1.41x per number, not 2x. I re-derived and ran it (artifacts/fact-check-wave-j/wj-cs-life/mitm.mjs); it agrees with brute force on 2,000 random cases. The search is still exponential, so 'exponentially' would be true. Fix: '...yet nobody knows a method that finds one quickly in every case.' (or 'without a search that grows exponentially'). Separately held: NP-completeness of subset sum (CLRS 3e 34.5.5) and Karp (1972) were not opened. walkccc/CLRS has only exercises for 34.5 and does not confirm the section number. So after the rewrite, c4 still needs an openable source. |

**Result:** verified 3, disputed 1.

## Pass 37 (2026-10-14, W-732)

Checker: fact-checker, a fresh instance. I did not write, build or record these claims. Scope: the claims changed by the wave-J dispute fixes (fd53f77, merged in 754195b; meta.json v2). Method: I read Demo.tsx (and model.ts or solar.ts) v2 on every reachable path before I read the claims and then the build note's Revision v2. Then I re-ran the numbers in node and python from my own copies of the lesson logic, not imported from the lesson (scripts: artifacts/fact-check-wave-j/w732/). I did not use the dev server. No walkthrough transcript exists for this slug. Sources opened: only GitHub (raw files and public git clones) and PyPI. Each verdict names the file it rests on, and no verdict rests on an unopened source.

Paths read: Check, Search 9, Search 13, Add a 7th number and Reset in any order (unchanged); the reveal's second paragraph now reads '...yet nobody knows a method that finds one quickly in every case. Whether such a method exists is the P versus NP question.'

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Pass 37 (W-732): verified on an opened source in place of the unopened CLRS 34.5.5 / Karp 1972: Boaz Barak, Introduction to Theoretical Computer Science (git clone github.com/boazbk/tcs, commit 68d6dde, 2026-10-06). lec_13_Cook_Levin.md: NP = problems whose solutions can be efficiently verified (definition NP-def, line 64; fig. line 62), and the Cook-Levin theorem that 3SAT is NP-complete (line 241). lec_12_NP.md line 346: theorem 'Hardness of subset sum', 3SAT <=p SSUM, with the input length counted in bits (line 343), which matches the reveal's 'nobody knows' and the pseudo-polynomial caveat. SSUM is in NP (the group is the certificate; checking it is one sum), so it is NP-complete. lec_14_PvsNP.md line 29: whether P = NP (equivalently a polynomial-time algorithm for 3SAT) is 'the great open question'; line 228: 'we don't know efficient algorithms for NP complete problems'. The new wording no longer claims a 2x-per-number search is forced, so the meet-in-the-middle objection is closed. Builder (non-blocking): add the Barak citation to the source field and drop the unopened CLRS/Karp, or mark them unopened. |

**Result:** c4 verified, so the Pass 1 dispute and the held source are both closed. All four claims are now verified.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 3. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived in python: 2^6 = 64 groups (each number in or out, empty group included), 2^7 = 128. The new readout label 'Groups: each number in or out' with value 2⁶ = 64 (2⁷ with the 7th number) states exactly this. |
| c2 | verified | Own enumeration of the 64 groups of [3, 34, 4, 12, 5, 2] in binary counting order: first sum 9 at index 20 (21st tried) = {4, 5}; groups summing to 9: {4, 5}, {3, 4, 2}; 13 is not among the 64 sums, so a one-by-one search tries all 64. The parenthetical shortcut holds: 34 > 13, and 12 + the smallest other number (2) = 14 > 13, so neither can be in a 13. The new question and status text ('one by one') match. |
| c4 | verified | Re-opened Barak, Introduction to TCS (raw.githubusercontent.com/boazbk/tcs/master): lec_12_NP.md line 346 theorem 'Hardness of subset sum'; lec_14_PvsNP.md line 29 (whether P = NP is 'the great open question of Computer Science') and line 228 ('we don't know efficient algorithms for NP complete problems'). The new clause 'A shortcut can help on one list' is shown on this list (c2: 34 and 12 cannot be in a 13) and does not contradict 'nobody knows a method that finds one quickly in every case'. Builder (non-blocking, as in pass 37): cite Barak in the source field in place of the unopened CLRS/Karp. |

**Result (Pass 41):** 3 verified, 0 disputed, 0 unverified (held).
