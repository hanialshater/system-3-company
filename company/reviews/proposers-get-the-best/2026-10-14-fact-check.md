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

## Pass 20

Checker: fact-checker (did not write these claims). Re-check of the builder rewording: claim read against Demo.tsx (stage text and reveal), numbers re-run in own node scripts, Demo.tsx parsed with the TypeScript parser (no syntax errors). No build run.

| Claim | Result | Basis |
|---|---|---|
| c5 | verified | Demo.tsx reveal line 211 matches claim text. Year: primary pages unreachable this pass (stanford.edu, nrmp.org, natmatch.com, AER all blocked); corroborated by search results quoting Roth's Stanford NRMP page (board voted 5 May 1997 to adopt the new algorithm), Wikipedia (first applied March 1998), an NRMP press release of 8 May 1997 (change effective 1998) and medschoolinsiders (first used in the March 1998 Match). Roth and Peranson, AER 89(4): 748-780 (Sept 1999), reports the design and the computational study. Medium confidence: from search text, not a page I opened. |

Sources for c5 (search-result text only; every page fetch was blocked): https://web.stanford.edu/~alroth/nrmp.html (board vote 5 May 1997), https://en.wikipedia.org/wiki/National_Resident_Matching_Program (first applied March 1998), https://courses.cs.duke.edu/cps130/fall98/lectures/lect13/node28.html (NRMP press release, 8 May 1997), https://medschoolinsiders.com/medical-student/nrmp-residency-match-algorithm-explained/ (first used in the 1998 Match). If a human can open Roth and Peranson (1999) or the NRMP history, confirm the year there.
