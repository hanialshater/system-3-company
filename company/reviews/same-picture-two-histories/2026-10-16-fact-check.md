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

## 2026-10-16 W-1570..W-1573 re-check (W-1571 fix round): c2, c3, c4, c5

Checker: fact-checker (did not write these claims; the W-1571 fix round is demo-builder's). Base: main ccr-4c6c7654-ew9ko1 at 975a4851. Lane as written in the dispatch: this slug c2, c3, c4, c5 only (with price-tag-or-auction c1, worth-something-alone c7 c8, the-swap-that-goes-in-circles c3 c7).

Method: git diff of the lesson directory since f1568498 (the prior check), then read the whole current Demo.tsx branch by branch (caption, svg classes, key row, Seen row, controls, predict, reveal with and without each history seen), styles.module.css and the colour variables in src/app/globals.css, before reading build.md. Graph re-derived by hand from SWAPS, SWITCHES and FINAL_LINKS. No walkthrough transcript; no server started.

Result: 4 verified, 0 disputed, 0 withdrawn. No unrecorded claim.

| id | status | basis |
|---|---|---|
| c2 | verified | Model unchanged since f1568498 (town1, town2, SWAPS, SWITCHES identical in the diff). Town 1 start = 12 links with 0-4, 3-6, 1-5 crossing; 3 swaps, colours constant. Town 2: person 3 (orange, friends 0 1 2 blue) turns blue, then person 7 (blue, friends 4 5 6 orange) turns orange; links constant. New gating checked: onSeen fires only when step reaches STEPS[town] (3 or 2), by the 700 ms timer or by Step; the Seen row hides a town while it is replayed and not yet at its last step; the reveal says 3 and 2 only when seen, otherwise "some friendships" / "some people", which asserts no wrong number. |
| c3 | verified | The reveal's second paragraph still reads the claim text (two sentences instead of a semicolon). The new predict option 3 "Can't tell from this picture alone" is the keyed answer (index 2) and asserts exactly this claim; with Town 1 a picking history and Town 2 a copying history ending in one picture, "can't tell" is the correct answer to "Did people choose friends like themselves?". Source re-opened this run: Aral, Muchnik and Sundararajan, PNAS 106(51): 21544-21549 (Crossref 10.1073/pnas.0908800106: title, authors, volume, issue, pages confirmed; PMC2799846 abstract via the PMC OAI oai_dc record): assortative mixing "is used to support claims of peer influence", but "homophily may also explain such evidence"; they separate the two with "longitudinal behavioral, demographic, and geographic data". Easley and Kleinberg ch. 4 still not opened (section 4.2 unconfirmed). Caveat carried from the first check: time data is necessary, not sufficient; the card says "needs". |
| c4 | verified | Convention. Caption still "Town N (picking/copying) · step k of m"; controls now "▶ Town 1", "▶ Town 2", "Final", "Step"; no real town named; town1 keeps FINAL_COLOURS, town2 keeps FINAL_LINKS. The option no longer names the towns, so nothing on the card contradicts the claim. |
| c5 | verified | Stage(): a link whose end colours differ gets crossLink (stroke var(--bad): #ff7a7a dark theme, #b8222a light; red); a link in the added set gets newLink (var(--good): #4fd1a5 / #09704d; green) and is never crossing, since every added link joins two same-colour people; removed links are drawn as trailLink (stroke-dasharray 4 4; dashed); in Town 2 each switched person gets a ring, ringBlue or ringOrange from frameOf(2, 0).colours, i.e. the colour before the change (person 3 orange ring, person 7 blue ring). Green and dashed appear only in Town 1, rings only in Town 2. The key lists only the codes present in the current frame, with swatches in the same classes; the ring swatch is grey and labelled "colour before", which matches. The trail fades 1 s after a history's last step; the claim says what the codes mean when drawn, so the fade does not contradict it. |

Non-blocking (qa-tester or demo-builder, no status depends on it): on the dark theme the "red" is a salmon #ff7a7a; next to the grey links it reads as red, so the claim's colour word stands.

After reading build.md (W-1571 section): it describes the same option rewording, control labels and key; nothing changes a status.
