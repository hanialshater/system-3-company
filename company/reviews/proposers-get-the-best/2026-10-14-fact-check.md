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

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: the claim reopened by the v3 wave E revision. Method: read v3 Demo.tsx (cards, switch, log, swap-check lines, reveal; no Reset) before the source, then checked both matchings for blocking pairs in my own node script.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Students' matching: Ann and Bea say no, Y and X yes; hospitals' matching: X and Y say no, Ann and Bea yes; no blocking pair in either. Each mode has one outcome in any press order. Stage check lines and reveal match. |

**Result:** every claim open at this pass is now verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own port of offer(), all 7 press paths: Ann-X, Bea-Y, Cal-Z; students 2, hospitals 0. Example meets its stated selection criteria (3 DOM-order presses, one refusal, partners differ). |
| c2 | verified | Hospitals proposing, all 7 paths: Ann-Y, Bea-Z, Cal-X; hospitals 2, students 0. |
| c3 | verified | swapCount on both: 6 other pairs, 0 double yes; of all 6 matchings only these two are stable. checked-both required, so reveal values are recorded ones. |
| c6 | verified | One refusal per run in every path: Bea at X (X keeps Ann), Z at Ann (Ann keeps Y). |
| c7 | verified | No shared pair; every student prefers the students-proposing partner, every hospital the hospitals-proposing one. 'Same pairs' branch unreachable. |

**Result:** every claim open at this pass is now verified.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read Demo.tsx first. Own DFS over every tap order of offer() (bumped proposers re-tapped): students proposing always ends Ann–X, Bea–Y, Cal–Z; hospitals proposing always ends Ann–Y, Bea–Z, Cal–X. My own swap count (each student × each hospital not theirs = 6 pairs, both-ways yes) gives 0 of 6 for both runs, so checkLine prints 'Stable: 0 of 6 other pairs say yes both ways.' The reveal quotes cs.both and ch.both only after each check. |
| c4 | verified | Verified by derivation, not by the unopened Gale and Shapley paper. Proof: if s and h prefer each other to their final partners, then s proposed to h before reaching its final partner (it proposes in rank order) and was turned down or bumped by h. A receiver only ever trades up, so h's final partner is better for h than s, a contradiction. Exhaustive check: all 6^6 = 46,656 3×3 profiles, each side proposing (93,312 runs), give 0 unstable matchings. Note: the reveal's attribution '(Gale and Shapley 1962)' is learner-facing but is in no claim, and its source was not opened (DNS). |
| c6 | verified | Own DFS over every tap order: students proposing, the only refusal is Bea at X (X: Cal > Ann > Bea keeps Ann, whether Ann or Bea offers first); hospitals proposing, the only refusal is Z at Ann (Ann: X > Y > Z keeps Y). offer() pushes the loser (bumped or refused) into run.refused, drawn dashed with ✕. toggle() resets run to FRESH, so only the current run's clash is drawn. |

**Result:** 3 verified, 0 disputed, 0 held unverified.
