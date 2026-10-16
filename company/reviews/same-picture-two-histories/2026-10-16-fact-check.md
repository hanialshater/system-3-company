# Fact-check: same-picture-two-histories

Date: 2026-10-16. Checker: fact-checker (did not write these claims). Board W-1562, lane = the 4 NCM gap slugs named in the dispatch (same-picture-two-histories, price-tag-or-auction, worth-something-alone, the-swap-that-goes-in-circles). Base: main ccr-4c6c7654-ew9ko1 at f1568498.

Method: read meta.json and every learner-visible string in Demo.tsx (title, hook, predict, stage caption, aria label, key, Seen row, reveal, recall), every reachable branch, before reading company/reviews/same-picture-two-histories/build.md. Re-derived the graph in my own Python (frozensets, not the lesson's code), then compared with company/courses/ncm/checks/rejudged-four.mjs J9 (agrees). No walkthrough transcript exists (artifacts/walkthroughs/ is absent) and I did not start a server; the rendered text was read from Demo.tsx branch by branch.

Result: 4 claims, 4 verified, 0 disputed, 0 withdrawn. No unrecorded claim.

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Own run: two 4-cliques give 6 + 6 = 12 links, 0 crossing. Town 1 after its 3 swaps equals that edge set with colours 00001111 (blue 0-3, orange 4-7); Town 2 after its 2 switches has the same 12 links and the same colours. The stage's "= final" (sameFrame) appears only at each town's last step and is true there. Hook "Every friendship here joins two people of the same colour" and the question's "all 12 friendships join same colours" are this claim. |
| c2 | verified | Own run: Town 1 start = final minus 0-1, 2-3, 5-6 plus 0-4, 3-6, 1-5: 12 links, 3 crossing; colours never change in town1(). Town 2: person 3 starts orange, friends 0, 1, 2 all blue, becomes blue; then person 7 starts blue, friends 4, 5, 6 all orange, becomes orange; links never change. One switch per step. Seen row "3 links swapped / 2 colours changed" and reveal "swapped 3 friendships ... 2 people changed colour" match. "Changes 3 friendships" means 3 swaps (3 removed, 3 added); the parenthesis says so. |
| c3 | verified | The first half is shown on the stage itself: c1 and c2 are an explicit case where a selection history and an influence history end in the identical snapshot, so a snapshot alone cannot decide. Source opened: Aral, Muchnik and Sundararajan (2009), PNAS 106(51): 21544-21549 (Crossref 10.1073/pnas.0908800106 confirms title, volume, issue, pages; full text PMC2799846). Abstract: assortative mixing and temporal clustering are used to claim influence, but "homophily may also explain such evidence"; they separate the two with a dynamic framework on "longitudinal behavioral, demographic, and geographic data". Introduction: "the diffusion patterns created by peer influence-driven contagions and homophilous diffusion are similar". Easley and Kleinberg ch. 4 was NOT opened (cornell.edu and every mirror blocked by the proxy); search results place section 4.2 as the selection and social influence section, so the section_unconfirmed 4.2 is plausible but still unconfirmed. Caveat for the record: "needs data over time" is a necessary condition, not a sufficient one (even longitudinal observational data can leave the two confounded); the card says "needs", which is correct. |
| c4 | verified | Convention. town1() keeps FINAL_COLOURS and swaps links; town2() keeps FINAL_LINKS and changes colours by friends' majority; captions "Town 1 (picking)" and "Town 2 (copying)"; no real town is named anywhere on the card. |

## Rendered text checked with no separate claim

- Aria label "12 friendships, N join different colours": 3 at Town 1 step 0, 6 at Town 2 step 0 (persons 3 and 7 each have 3 friends of the other colour), 0 at the end. Accurate; covered by c2's description of the starting states.
- Recall "Not which: picking friends and copying friends can both leave this pattern" and its why: the same statement as c3.

## Non-blocking notes (for demo-builder, no status depends on them)

- c3's source names Easley and Kleinberg first, unopened. Adding Aral et al. 2009 (PMC2799846) as the opened source would make the trail match this record.
- The source fields still end "Builder-written; unverified." They are the builder's text; I left them.

## After reading build.md

The build note adds nothing that changes a status. Its probe reveal text matches the reveal I read from Demo.tsx.
