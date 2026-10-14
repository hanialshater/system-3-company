# Fact-check: one-road-cuts-the-map (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran Demo.tsx reach() for each road: only 3-4 leaves {1,2,3}; others reach all 6. |
| c2 | verified | Degrees from ROADS: town 3 = 3, town 4 = 3; closing 2-3, 1-3, 4-5, 4-6 keeps all 6. |
| c3 | verified | Cycle/detour equivalence re-derived (both directions). |
| c4 | verified | Implemented low-link DFS (bridge iff low[v] > disc[u]) on this map: returns only 3-4. Tarjan (1974) IPL 2(6) and CLRS 4e problem 20-2 cited from memory, not opened; the description matches the standard algorithm. |
| c5 | verified | Demo.tsx fills reach(closed) towns var(--domain), others var(--bad). |

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Derivation: an edge uv is on a cycle iff u and v stay connected without it; on stage brute force (own node) only 3-4 disconnects (3 of 6 reachable), the other six each lie on a triangle. |
| c4 | verified | Own DFS copy (neighbours high first): disc 1:1, 3:2, 4:3, 6:4, 5:5, 2:6; low[4] = 3 > disc[3] = 2, so 3-4 is the only bridge (matches brute force). Reveal template gives 'town 4 was visited #3 ... ↑#3. Town 3 is #2'. |
| c6 | verified | Own DFS: tree roads 1-3, 3-4, 4-6, 6-5, 3-2; non-tree 1-2 and 4-5 drawn dashed '2 4' after the walk; 3-4 drawn thick domain colour and named in the note 'Bridge: 3–4' (with roads reopened). Badges '#disc ↑#low'. |

**Result:** all open claims verified; no disputes.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own flood fill: closing each road leaves 6, 6, 6, 3, 6, 6, 6 towns reachable (only 3-4 splits). Town 3 roads 2-3, 1-3, 3-4; town 4 roads 3-4, 4-5, 4-6; each of 2-3, 1-3, 4-5, 4-6 lies on a triangle (1-2-3 or 4-5-6), so a detour exists. |
| c4 | verified | Own DFS copy (neighbours high first): disc 1:1, 3:2, 4:3, 6:4, 5:5, 2:6; low 1:1, 3:1, 2:1, 4:3, 6:3, 5:3; only tree road with low[child] > disc[parent] is 3-4 (3 > 2), matching brute force. low[4] = 3 is the smallest visit number reachable from 4's subtree by one non-tree road (4-5 back to #3), so "earliest visit ... can loop back to is #3" is the low-link value read correctly. Reveal and Walk row strings regenerated: "town 4 #3 ↩#3, town 3 #2. Bridge: 3–4." |
| c6 | disputed | Badge values, dotted roads (non-tree 1-2 and 4-5) and the bridge marking are right (own DFS). But the legend "Depth-first from 1. #visit order; ↩ earliest # it loops back to. Dotted: road back." is the note text only when closed === null. On the natural path (tap the seven road chips, then press "Walk depth-first" without "Reopen all"), the note reads "4–6 closed: every town is still reachable." and the badges and ↩ marks appear with no legend; all three milestones are reached, so the reveal can open with the legend never shown. Also, while a road is closed it is drawn red dashed "5 5", so a closed 1-2 or 4-5 loses its "road back" dotting. Fix (builder): show the legend whenever walked (e.g. in the Walk row or as its own line), or have Walk reopen all roads; or narrow the claim to "with roads reopened". |

**Result:** 2 verified, 1 disputed, 0 held unverified.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-252)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Pass 26 dispute resolved. walk() now reopens all roads, and badges, dotted roads (non-tree 1-2, 4-5), thick bridge 3-4 and the legend all share marks = walked && closed === null. Own DFS: disc/low as the badges show, and 3-4 is the only bridge (also by removal test). Exhaustive state check (16 states, all controls): marks and legend never disagree, and every walked-and-closed state adds 'Reopen all to see the walk.'. The failing path (seven chips, then Walk) now shows the legend with the marks. |

**Result:** 1 verified, 0 disputed, 0 held unverified. W-246 (demo-builder) can close.
