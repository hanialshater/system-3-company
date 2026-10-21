# WBR 2026-10-21

## Summary
PRJ-1 shipped 7/7 orders with 0 overdue, 0 refusals and goals 3 green; tokensPerShipped 134,483, leadP50 16.6 min, flow efficiency 0.22 and 0.57 revisions per shipped are recorded as the Benchmark-2 baseline (lifetime, since Page 0 has no start date yet). The shipped pack has 20 distinct, correctly owned answers and the facts checked hold, but R1 Q2's Why gives away R5's Pluto answer: writer-1 replaces it with a fixed 15-word line by 2026-10-24 and reader rechecks by 2026-10-25. G-3 closes after that (editor, by 2026-10-28), G-2 needs cycle-and-batch evidence from cos, and G-1 goes to the founder for acceptance. Page 0 gets a dated window, shipped-after-revise listed as misses, and a per-stage wait breakdown before the next WBR.

## Page 0
| measure | value |
|---|---|
| window | {"from":null,"to":"2026-10-21T16:28:22.536Z"} |
| shipped | 7 |
| tokensPerShipped | 134483 |
| leadP50Min | 16.6 |
| flowEfficiencyMedian | 0.22 |
| revisionsPerShipped | 0.57 |
| refusals | 0 |
| work | {"backlog":0,"todo":0,"in-progress":0,"in-review":0,"done":10,"cancelled":0} |
| overdue | 0 |
| goals | {"green":3,"yellow":0,"red":0} |

## Hits
- O-3 shipped first time
- O-5 shipped first time
- O-7 shipped first time

## Misses
- none

## Roadmap
- Solar System Quiz Pack (editor): 7/7 done · goals G-3 green

## Goals
- G-1 [green] Solar System Quiz Pack: five rounds, true and fun (founder, due 2026-11-20)
-   G-2 [green] Quiz pipeline runs on cycle and batch (cos, due 2026-11-10)
-     G-3 [green] Quiz pack accepted (editor, due 2026-10-31)

## Leadership asks
0 asks · 0 to the founder · 0 rerouted down · 0 escalated with a reason

## Minutes
# WBR 2026-10-21 (MTG-2)

chair: cos · invited: cos, editor · absent: none · room: story-room

## 1. Page 0: metrics
Round 1:
- editor: Page 0 reads clean on volume (7/7 orders shipped, 0 refusals, 0 overdue, board empty) but two numbers need a second look before we call it a good week. (a) revisionsPerShipped 0.57 means about 4 revisions across 7 orders, yet the hits list only O-3, O-5, O-7 as first-time and misses is empty: the other four orders (STYLE, two rounds, PACK or whichever) went through revise and should show up as misses or at least as "shipped after revise", or the page hides where the rework was. (b) flowEfficiencyMedian 0.22 with leadP50 16.6 min means most lead time was waiting, not working; I want the wait broken out by stage (review queue vs writer) before we tune anything. Also: window.from is null, so the page has no start date and the per-week numbers are not comparable to a later WBR; fix the window. tokensPerShipped ~134k is our baseline for the Benchmark-2 comparison; record it as such, no target yet.
- cos: Page 0 (pack numbers): 7 shipped, 10 items done, 0 in backlog/todo/in-progress/in-review, 0 overdue, 0 refusals, goals 3 green / 0 yellow / 0 red. Cost and speed: 134,483 tokens per shipped item, lead time p50 16.6 min, flow efficiency median 0.22, revisions per shipped 0.57. Reading: output is complete; the weak number is flow efficiency 0.22 (most lead time is waiting, not working) and 0.57 revisions per shipped (about 4 revisions over 7 shipments). The window has no start date (from: null), so these are lifetime numbers, not this week's; next WBR needs a dated window to compare against.
**Decision:** Page 0 accepted as lifetime numbers, not a week: 7 shipped, 10 done, 0 open work, 0 overdue, 0 refusals, goals 3 green. Record tokensPerShipped 134,483, leadP50Min 16.6, flowEfficiencyMedian 0.22 and revisionsPerShipped 0.57 as the Benchmark-2 baseline; no targets set this week. Two Page 0 fixes before the next WBR: (1) the window must have a start date (window.from is null today), so the next pack covers 2026-10-21 onward; (2) flow efficiency 0.22 gets a wait breakdown by stage (writer vs review queue) before anyone tunes the pipeline. · actions: ISS-11, ISS-12

## 2. Hits and misses
Round 1:
- editor: Hits: all five rounds plus STYLE and PACK shipped; I re-read the shipped pack and every fact I checked holds (Venus hottest via thick clouds, Ganymede wider than Mercury 5,268 vs 4,879 km, ~1,300 Earths in Jupiter, Olympus Mons ~2.5x Everest, Ceres largest in the belt, Pluto dwarf planet since 2006, 1969 landing); all 20 answers distinct and in their owning rounds; banned traps avoided. Miss I am raising: a cross-round giveaway that PACK saw and did not fix. R1 Q2 Why says "Pluto used to be on the list, but now it is called a dwarf planet", which hands the players the R5 Q2 answer (Pluto, dwarf planet since 2006) three rounds early. PACK notes list it as "agreement" rather than a clash. The order said PACK fixes anything that clashes across rounds; a giveaway is a clash in a quiz even if the answer strings differ. Fix: rewrite R1 Q2 Why without naming Pluto, e.g. "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune all travel around the Sun." (14 words) or keep it shorter. Minor watch items, not blockers: Great Red Spot "wider than our whole Earth" is true today (~1.3 Earths) but it is shrinking; R5 Q2 Why "shares its path with lots of other icy bits" is a fair kid-level gloss of not clearing its orbit. Process miss: the same writer (writer-2) wrote R4, R5 and PACK, so PACK checked its own rounds; next time the cross-round read should be done by someone who wrote none of them.
- cos: Hits per pack: O-3, O-5, O-7 shipped first time. Misses per pack: none. But 3 first-time hits out of 7 shipped plus 0.57 revisions per shipped means 4 orders needed at least one revision, and the misses list does not show them; a revision is a miss worth naming. Content check I did on shipped/PACK/page.md: 20 distinct answers, each in its owning round per STYLE; no banned words (grep clean); every Why line is 20 words or fewer (max 20); facts I checked hold (Venus hottest, Ganymede wider than Mercury, Ceres biggest in the belt, about 8 minutes, about 1,300 Earths, 1969, Pluto dwarf planet since 2006). Soft spot: R1 Q2 Why restates R5's Pluto fact; allowed (a mention, not an answer) but it is overlap. Great Red Spot 'wider than our whole Earth' is true today but the storm is shrinking; keep an eye on it.
**Decision:** Hits: O-3, O-5, O-7 shipped first time; all 20 answers distinct and in their owning rounds; facts checked by both cos and editor hold; no banned words; every Why line is 20 words or fewer. Miss (agreed with editor): R1 Q2 Why names Pluto as a dwarf planet, which gives away the R5 Q2 answer. That is a cross-round clash PACK should have fixed, even though the answer strings differ. Rule from now on: no Question or Why line may name or describe another round's answer. Fix: replace the R1 Q2 Why, in both shipped/ROUND1 and shipped/PACK, with exactly: "Four small rocky planets and four giant planets circle the Sun, so that makes eight." (15 words, no planet names; do not list the planets in order, because that would give away R2 Q1 Mercury closest). Change nothing else. Second miss: the 4 orders that shipped after a revise are not shown under misses; Page 0 must list them. Watch item, no change now: Great Red Spot 'wider than our whole Earth' is true today (about 1.3 Earths) but shrinking; recheck at the next pack revision. Process: the cross-round PACK read is done by a writer who wrote none of the rounds being checked (writer-1 for this revision, since writer-2 wrote R4, R5 and PACK). · actions: ISS-14, ISS-15, ISS-16

## 3. Roadmap and goal status
Round 1:
- editor: PRJ-1 is 7/7 and G-1/G-2/G-3 are green with every success metric met, but none is done=true and I do not think G-3 "Quiz pack accepted" should be marked done yet: its measure counts shipped pages, and acceptance should mean the pack passes an independent cross-round read. Proposal: keep G-3 green-not-done, open one small order (PACK revision, owner editor, writer-1 to do it since writer-1 did not write PACK) to fix the R1 Q2 Pluto giveaway, have test1 re-run the word, reading-ease and banned-word checks on R1 and the assembled pack, then I close G-3 well before its 2026-10-31 due date. G-2 (pipeline on cycle and batch) is met on "orders shipped 7" but that metric does not test the cycle/batch claim itself; cos should say what evidence shows the supervisor cycle ran without hand bookkeeping before marking G-2 done. G-1 stays with the founder to accept.
- cos: Roadmap per pack: PRJ-1 Solar System Quiz Pack, lead editor, 7/7 done, G-3 green. Goals: G-1 (founder, due 2026-11-20) met 5/5 rounds and 1/1 pack; G-2 (cos, due 2026-11-10) met 7/7 orders; G-3 (editor, due 2026-10-31) met 1/1 style, 5/5 rounds, 1/1 pack. All three are met: true but done: false. Proposal: editor does a final acceptance read of PACK and marks G-3 done before its 2026-10-31 due date; G-2 and G-1 close after that, G-1 only by the founder. No new work for PRJ-1.
**Decision:** PRJ-1 is 7/7 and G-1, G-2, G-3 are green with every success metric met, but none is marked done this week. G-3 (editor, due 2026-10-31) closes only after the PACK revision ships and reader's checks pass; editor then reads the revised PACK once and marks G-3 done by 2026-10-28. G-2 (cos, due 2026-11-10): 'orders shipped 7' does not prove the cycle-and-batch claim, so cos writes the evidence (supervisor cycle log, no hand bookkeeping) into G-2 before marking it done. G-1 stays with the founder. No other new work on PRJ-1. · actions: ISS-17, ISS-18

## 4. Leadership asks
Round 1:
- editor: No asks are open (0 total), and I am not raising one to the founder for the fix: the R1 Q2 rewrite is inside my lane and the MTG-1 rules already decide it (an answer has one home; PACK fixes clashes). Two asks I do want on the record: (1) to the founder, once the PACK revision ships: accept the pack (G-1) or name what would block acceptance, since "true and fun" is the founder goal and only the founder can sign it. (2) to cos as chair: add a "shipped after revise" line or count revisions under misses on Page 0, and set window.from, so the next WBR can compare like with like. If cos disagrees that the Pluto mention is a clash, I want that objection recorded with the decision, not closed as noted.
- cos: Asks per pack: 0 open, 0 total, 0 to founder, 0 rerouted, 0 escalated. Nothing for leadership to unblock. One thing to tell the founder in the digest: the pack is complete and met its code-measured criteria, and G-1 (founder-owned) is ready for the founder to accept or reject.
**Decision:** Pack shows 0 asks open, 0 total, 0 to founder, 0 rerouted, 0 escalated. No ask is raised for the R1 Q2 fix: it is inside the editor lane and MTG-1 rules already decide it. One ask goes to the founder after G-3 is done: accept the Solar System Quiz Pack (G-1) or name what blocks acceptance. The Page 0 changes the editor asked for (window start, shipped-after-revise as misses) are taken by cos under items 1 and 2. There was no disagreement on whether the Pluto mention is a clash: cos agrees it is, so nothing is carried. · actions: ISS-19
