# Fact-check: proposers-get-the-best (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Hand trace of Demo.tsx PREF/offer(): Ann offers X (free, held), Bea offers Y (free, held); both students at PREF[0]; stage star logic agrees. |
| c2 | verified | Hand trace: X offers Bea, Y offers Ann, no refusals; X and Y at PREF[0]. |
| c3 | verified | Checked all 4 student-hospital pairs against both matchings (same test as isStable()): no blocking pair; in each matching one side has its first choice, so no pair can both improve. |
| c4 | verified | Own node brute force (scratchpad gs.mjs): all 46,656 3x3 preference profiles, deferred acceptance from each side always stable and never beaten by any stable matching for any proposer. Gale-Shapley 1962 not opened (network blocked); its optimal-stable-assignment definition corroborated by search snippet of the paper. Theorem numbering (1, 2) not confirmed. |
| c5 | disputed | Roth and Peranson 1999 could not be opened (network blocked); the claim cites the motive from memory and has no number to re-derive. Search snippets only show secondary sources (NRMP board review 1995; pre-1998 algorithm said to favour programs). The same paper reports the switch changed fewer than 1 in 1000 matches, so "for this reason" needs the paper's own wording. Fix (builder): quote the paper's stated motive with page, or soften to "The US residency match switched to students proposing in 1998 (Roth and Peranson 1999)." |
| c6 | verified | Same traces as c1/c2: two offers per run, refused[] stays empty. |
