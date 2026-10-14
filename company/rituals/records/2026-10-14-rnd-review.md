# R&D Review: 2026-10-14

owner: vp-rnd (Vera, chair) · presents (through records): rnd-lead (Bram), research-lead (Wen) · attends (through records): principal-engineer (Kenji), design-lead, cm-math-discrete, cm-economics, cm-geography

**Why now.** `node tools/rituals-due.mjs` reports `DUE rnd-review: last never, a new incident; never held (limit 336 h)`. This is the first R&D Review. The knots bet changed status twice today: evolution closed, then promoted to `src/kit/knots`. Lab code was also in an incident: two other sessions' sweeper commits picked up knots files (283c4c22 swept `src/kit/knots/draw.mjs` + `index.d.ts`, EDD-004 Addendum A; 3e4ac7c5 swept the first kit copy and a scratch file, eng review EDD-004). `npm run company -- status` said "Rituals: all on cadence" while this was DUE, because `tools/company.mjs` only tracks the calendar table and rnd-review is not in it (see Board ask 9).

**How it ran.** The session was at its agent cap, so nobody was dispatched. Presenters and attendees appear through their records, which are linked per row. Every number below either comes from one of those records or is my own re-run today; each one says which.

**My own checks today (load 1-min 14.6 on 4 cores):**
- `cd src/lab/knots && node --test test/*.test.mjs`: 103/103 pass.
- `npm run test:kit`: 97/97 pass.
- `grep -r "@/kit/knots" src/demos src/app src/components`: no hits. **No lesson imports the knots kit.**
- `src/kit/knots/table.mjs` 10_8 line is the Conway 5 1 4 derivation (`provenance/sources.mjs` line 44), so EDD-004 condition C1 is done. `src/lab/knots/README.md` line 7 points to the kit, so C2 is done.
- No `extraCrossings` export in `src/kit/knots/index.d.ts`. The block (a) follow-up has not started.

## 1. Bets

Verdict key: **continue** (spend more), **promote** (move to kit or done), **pause** (no spend until a named trigger), **stop** (kill; files stay as the archive).

| Bet | Since | Progress vs exit criterion | Users waiting | Verdict |
|---|---|---|---|---|
| **Knots library** (`src/lab/knots` → `src/kit/knots`) | 2026-10-13 | **Exit criterion met, with one size exception.** (1) Table up to 7 crossings drawn: yes, 21 kit `KNOTS` entries. (2) Crossing data, writhe, linking number, tricolourability, Alexander and Jones match published values: yes, in the 103 lab and 97 kit tests (re-run today). (3) Reidemeister moves: yes, `moves.test.mjs`. (4) ≤ 10 KB gz for a typical lesson: met for 3 of the 4 evaluator lesson programs, measured on the kit by the principal engineer (EDD-004 Addendum A). draw-a-table-knot 5,623 B, unknot-game 7,261 B, tricolour-check 9,904 B. **random-knot is 11,542 B, 1,302 B over 10 KB** but inside my condition (≤ 11,776) and the evaluator gate (12,288). Promoted: EDD-004 approved with conditions, then Addendum A (fix1-bigon drawing, tier 2) approved and shipped. Lab equals kit (knots-fix1.md update). Spend so far: 1.7M tokens ("rnd-knots", `company/ceo-office/2026-10-14-project-review-1-agenda.md`). **Return so far: 0 lessons, 0 briefs.** | **None today.** cm-math-discrete owns W-146 (knot briefs) and W-419 (brief follow-ups), both in backlog. draw-a-table-knot (5_2) is **not blocked** and could be briefed now. tricolour-check and unknot-game are behind import block (b), which lifts per lesson at design review. random-knot is behind block (a). Life Hacks `long-cord-knots-itself` (in review) uses no library. | **Promote: done.** The library part of the bet is closed. **Pause** all further R&D spend on knots: the block (a) planarity-check follow-up EDD, the 4 U10 monster-unknot tests (W-407 remainder), link drawing (defect c) and the width gate. Trigger to restart: a written cm-math-discrete brief that needs the item. **Kill trigger:** if no knot brief exists by the next R&D Review (on or before 2026-10-28), the bet is recorded as "done, dormant". The kit copy stays (rollback is cheap, and it costs nothing while unused), and the bet leaves the active list. |
| **Knots layout evolution** (gens 0–2, fix1) | 2026-10-13 | Closed after gen 2 (VP ruling in knots-gen2.md; 0 generations left). fix1-bigon was a follow-up, not a generation. It was selected outside the score: a tie inside the 15-point floor, median g −5.39, negative on 3/3 seeds (knots-fix1.md). | none | **Stop** (already closed; confirmed). No new generation without a new VP decision and a project-review approval. |
| gen 1 variant **gen1-tutte** | gen 1 | Dropped at gen 1 selection (knots-gen1.md: cusped table knots, flattened rim bigons, failed looks gate) | none | **Stop.** Files stay in `candidates/` as archive and lineage (`evolve.json` parents). No further work. |
| gen 1 variant **gen1-ortho** | gen 1 | Kept as a parent at gen 1, then superseded by its gen 2 children. It was not scored on the 103-test promotion evaluator. Both children fail the crossing-change test on L2a1 (knots-gen2.md, "Promotion re-score") | none | **Stop.** Archive only. Its idea survives in gen2-ortho-force. |
| gen 1 variant **gen1-force** (old champion) | gen 1 | Gated out on the 103-test evaluator (crossing-change bug on 3_1, the dart-index bug). Replaced by gen2-force-smooth, then by fix1-bigon | none | **Stop.** Archive only. |
| **gen0-baseline** | gen 0 | Seed; superseded | none | **Stop.** Archive only. |
| gen 2 losers **gen2-ortho-round** | gen 2 | Gated out (102/103, L2a1 orientation flip) | none | **Stop.** Archive only. |
| **gen2-ortho-force** | gen 2 | Gated out (102/103, L2a1). Draws better small table knots and a readable Hopf link (objection carried in EDD-004 Q4 and the eng review) | none | **Pause, as the named parent** for any future layout or link-drawing project. No spend. |
| **gen2-force-smooth** | gen 2 | Was the kit's drawing until Addendum A. It is the rollback source (Addendum A, "Rollback") | none | **Stop** (as a candidate). Keep the files: they are the documented rollback. |
| **Agent-based simulation engine** | 2026-10-13 | Exit criterion: promote after both Schelling lessons ship (rule of two). Lesson 1 `economics/mild-preferences-sharp-divides` is **in review** and on the status "Ready to publish" list. Its engine is the lesson-local `abm.ts` (6,853 B raw; Demo.tsx 15,348 B raw). Lesson 2 `schelling-on-new-york` is **not built**: cultural review says build may proceed with conditions, but real data sources are blocked by egress (W-132, fact-checker, backlog; `company/domains/briefs/geography.people-places.md`). The brief already specifies reuse of `abm.ts` plus a wall mask. No lab code exists, and none is needed: this bet incubates in lessons, not in `src/lab`. | cm-economics (lesson 1, waiting on publish); cm-geography (lesson 2, waiting on W-132); cm-life may class `empty-ponds-still-left` (draft) as agent-based (design-lead ABM boundary) | **Continue at zero R&D spend** (waiting). Promotion trigger, unchanged: when lesson 2 ships, the rnd-lead writes the EDD for `src/kit/abm` from the two copies, and the principal engineer reviews it. If `empty-ponds-still-left` is classed agent-based, it becomes a third user and the second import, which strengthens the case. The size observation (lesson code plus `abm.ts` at about 22 KB raw) is evidence for extraction, not a measurement against the gz budget. |

## 2. Promotions

Only one item came through the lab → EDD → principal-engineer path. The other three reached lessons or the kit as engineering changes, not as R&D bets. They are recorded here so the next review can see them, and **no R&D verdict is given on them**: architecture is the principal engineer's call, and gates are the evaluation steward's.

| Item | Path | EDD | Size per lesson | Tests vs published values | Principal engineer's verdict | Open conditions |
|---|---|---|---|---|---|---|
| **Knots kit** (`src/kit/knots`) | lab → EDD → PE (this is the R&D path) | [EDD-004](../../engineering/edd/EDD-004-knots-kit.md) + Addendum A | 5,623 / 7,261 / 9,904 / 11,542 B gz (four lesson programs, measured on the kit) | 97/97 kit, 103/103 lab, against published tables (Rolfsen, KnotInfo, Conway 1970), re-run today | **Approve with conditions** ([eng review](2026-10-14-eng-review-EDD-004.md)); Addendum A **approved and shipped** | C1, C2 done (checked today). **C3** (`npm run verify` on the integrated tree, platform-engineer): no record that it ran. C4 (phone-class draw time at the first lesson using `layout`). Blocks: (a) random-knot until a planarity check, (b) tricolour-check and unknot-game until design review per lesson, (c) no link drawing. 6_3 is not cleared for any lesson picture. Follow-ups W-409 (CI amendment, launch-review line) are with the evaluation steward. |
| **CardSequence** (`src/kit/sequence.tsx`) | design-engineer → EDD → PE; not lab code | [EDD-006](../../engineering/edd/EDD-006-multi-card-sequence.md) | not measured per lesson in the EDD | n/a (UI); `tools/sequence-probe.mjs` phone 8/9, the 4-step trail wraps to 71 px | **Approve with changes** ([review](../../engineering/reviews/2026-10-14-edd-006-review.md)); merged, W-600 done | C1 and C2 done (W-604, W-605 in review). Open: W-601 (interaction design), W-602 (a11y), W-606 (contract properties, steward), W-828 (trail anchor, design review CS1), real-phone swipe check (platform-engineer), W-630 (formats.md row flip). Books depends on it. Gates the first non-reference lesson. |
| **Scale stage 0** (slim paginated feed, `tools/qa-changed.mjs`) | platform-engineer → EDD-001/003 → PE; not lab code | [EDD-003](../../engineering/edd/EDD-003-lesson-storage-at-scale.md) stage 0 | n/a (feed): `/` HTML 5.84 MB → about 282–304 KB | n/a | **Approve with changes** ([review](../../engineering/reviews/2026-10-14-scale-stage0-review.md)); merged in 77f048f with the retry-loop fix; W-666 done | W-076 open until option 4 is measured. CSS strategy EDD (item A of the merge plan). W-607 (per-lesson chunk split). |
| **Life Hacks engines v2** (`src/components/lifehacks/**`, `src/lib/lifehacks/**`) | demo-builder against an interaction-designer spec; **not** through an EDD or a principal-engineer review | none | n/a | `test:lifehacks` 64/64, reveal fit 14/14 W-135 bar, phone fit 13/14, QA 28/28 (builder's own numbers, [build note](../../reviews/lifehacks-200/engines-v2-build-W-608.md)) | **None on record.** The brief for this review says engines v2 reached lessons via the principal engineer. The records do not show that. Commit 3dd4d09 landed at 18:45. The tier map that classes both paths as **tier 2 ("shared-engine")** was confirmed at 19:22 (8811dbf, EDD-007 review), and that review says "it stays tier 2". So the change predates the map, and whether it owes a retroactive review is the principal engineer's call (Board ask 5). | W-738 (Resource, AlphabetSearch, the remaining Study families) is now tier 2 under the map, so it needs an EDD before code. W-739, W-741, W-756 open. W-740 done. |

## 3. Research notes since the last review

There was no earlier review, so this covers everything to date.

| Note | Question | Answer | Confidence | What changes for lessons |
|---|---|---|---|---|
| [2026-10-13-teachable-knot-theory.md](../../research/notes/2026-10-13-teachable-knot-theory.md) (research-scientist Dario) | Which knot ideas give an aha in 60 s, what misconception each answers, and what the library must support | A ranked list of ideas. It set the library's invariant scope, which is now in the kit. **No study lists adult misconceptions about knot theory.** The one empirical anchor is Croom & Firestone 2024 (adults near chance at telling knots from non-knots: medium; strength result: high). Every source was read through search snippets only (proxy blocked full text). | medium at best; misconceptions **inferred (low–medium)** | (1) Used by R&D: yes, it scoped the library. (2) Used by lessons: **not yet**; W-146 briefs unwritten. That is the "research nobody uses" failure mode, waiting to happen. (3) Any knot brief must test its misconception with learners (borrowed-mind review at least), and a verifier with full-text access must open the cited URLs before any claim is marked verified. |

**Research questions in flight (research-lead; no notes written yet):**

| Item | Question | Who needs it | State | Call |
|---|---|---|---|---|
| W-622 | Literature maps for Big Ideas contested briefs (16, 19, 21, 22, 23…) | cm-big-ideas, before build | backlog | **Continue.** It gates contested learner claims. Needs a done-by tied to the Big Ideas build order. |
| W-745 | 17 pinned History data sources (provenance, licences, Maddison licence, OWID drift) + provenance notes for briefs 3, 4, 5, 11, 12 | cm-history, fact-checker | backlog | **Continue, merged with W-770.** |
| W-770 | Provenance notes for the 5 held History briefs (3, 4, 5, 11, 12) | cm-history (W-626 route) | backlog | **Merge into W-745.** Same five briefs; two items invite the work being done twice (Board ask 7). |
| W-810 | Licence note: OpenStax TOCs (CC BY-NC-SA) as mapping reference only | exam-prep mapping (vertical review 2026-10-14) | backlog | **Continue.** Small, and a licence risk if skipped. |

## 4. New bets and questions

**No new bets.** No brief on disk is blocked on a missing library. The only capability gaps in `company/design/formats.md` are kit work that is already in flight (Multi-card sequence, Book deck), and those are not R&D. Under the founder's approval forum (`company/decisions/2026-10-14-founder-token-budget-and-project-approval.md`), any new bet goes to the portfolio manager with a budget, return measure and kill criterion before work starts. **No budget ask to the founder.**

Rules for R&D after this review:
1. **No R&D spend on a library without a written brief that uses it.** The knots bet built a complete library (1.7M tokens) before a single brief existed. Next time the order is: brief first, or at least one named brief with a date, then bet.
2. **Bet-list size budget aligned.** The README says "≤ 10 KB gz for what a lesson imports", and the knots evaluator gate is 12,288 B. I keep 10 KB as the target, and any lesson entry above it needs a named VP exception. Today's only exception is random-knot (≤ 11,776 B, and blocked anyway).

## 5. Objections

| # | Objection | Raised by | Answer |
|---|---|---|---|
| 1 | ortho-force draws better small table knots and a readable Hopf link | rnd-lead (EDD-004 Q4), carried by PE | Answered by the gen-2 VP ruling §1 (tie on score; ortho fails a briefed API requirement). Not reopened. It is kept as the paused parent for any future layout or link project (§1 above). |
| 2 | The 0/10,000 rate justifies narrowing the random-knot block (a) | rnd-lead's evidence (EDD-004 defect a) | Not adopted (PE, eng review item 5; I agree). The fix is an exported planarity check, and that work is now **paused** until a random-knot brief exists. No brief, so no learner is exposed either way. |
| 3 | A width gate costs about a second and would catch a silent looks regression | rnd-lead (knots-fix1.md, considered and rejected by him) | Accepted as he left it: not adopted while `draw.mjs` is frozen. The revisit trigger is the first edit to `draw.mjs` or any reopening of knots work. The design lead's 3_1 ≥ 20 and 4_1 ≥ 15 floors stand as a manual check (`measure-bigons.mjs --table=kit`). |
| 4 | Pausing knots follow-ups wastes the 1.7M already spent | anticipated (chair) | The spend is sunk. What it bought is already in the kit and usable today: draw-a-table-knot is unblocked. More spend buys only random-knot, link drawing and monster-unknot tests, and nobody has asked for any of them. The pause lifts on a brief, with no new decision needed. |
| 5 | Calling the knots bet "done, dormant" if no brief arrives by 2026-10-28 is premature: briefs take time | anticipated (cm-math-discrete's likely view) | It costs nothing to keep: the kit stays, and "dormant" is only a status on the bet list. If a brief appears later, the item comes back by a line on the bet list. The kill trigger exists so the bet cannot sit as "active" for ever without a user. |

## Board asks

I did not edit `company/ops/board.json`. The caller (chief of staff) files these.

1. **"Write the draw-a-table-knot brief (5_2; not import-blocked) from W-146/W-419 by 2026-10-28, or say in W-146 that knots are not on the math plan; the R&D Review marks the knots bet dormant otherwise (company/rituals/records/2026-10-14-rnd-review.md §1)"** (owner: cm-math-discrete)
2. **"W-407: C1 (10_8 Conway 5 1 4) and C2 (lab README pointer) are done (checked in the R&D Review 2026-10-14); close them. The block (a) planarity-check follow-up EDD and the 4 U10 monster-unknot tests are paused until a brief needs them"** (owner: rnd-lead)
3. **"Close W-143 and W-144 (knots gen 0 evaluator review and size gate): superseded by gens 1-2, the per-lesson size gate, and EDD-004"** (owner: rnd-lead)
4. **"W-131 (approve the Agent-based simulation format) still says backlog, but formats.md records it approved with changes on 2026-10-13. Confirm and close"** (owner: design-lead)
5. **"Rule whether Life Hacks engines v2 (commit 3dd4d09: src/components/lifehacks/**, src/lib/lifehacks/**, landed before paths.json classed them tier 2) owes a retroactive engineering review. Confirm W-738 (engines v2 remainder) needs an EDD before code"** (owner: principal-engineer)
6. **"EDD-004 C3: record whether npm run verify has passed on the integrated tree since src/kit/knots landed (no record found)"** (owner: platform-engineer)
7. **"Merge W-770 into W-745 (same 5 History briefs' provenance notes); give W-622, W-745 and W-810 a done-by tied to the build order they gate"** (owner: research-lead)
8. **"When schelling-on-new-york ships (second abm.ts user), write the EDD to promote abm.ts to src/kit/abm (rule of two); if empty-ponds-still-left is classed agent-based, include it"** (owner: rnd-lead; trigger: lesson 2 ships)
9. **"company status reported 'all on cadence' while tools/rituals-due.mjs showed rnd-review and project-review DUE (never held). Propose surfacing rituals-due.mjs in status (tools/company.mjs is protected: needs an amendment)"** (owner: platform-engineer)

## Kudos (optional)

- @rnd-lead: knots-fix1.md reported a negative score (median g −5.39, 3/3 seeds) on the candidate he then selected, kept it as a measurement, and selected openly on the briefed width evidence. That made both Addendum A and this review quick to decide.
- @principal-engineer: EDD-004 Addendum A overruled the handoff's "tier 1" with the reason it matters: design acceptances are made against specific pictures. It also checked the kit's output against the scored candidate on every table entry instead of trusting the copy.

(Not harvested: `kudos.mjs harvest` writes to the shared event log, and this session commits only this record and the bet list. Run it at the next chief-of-staff turn.)

## Next review

On or before **2026-10-28**, or sooner if: a knot brief is written (the knots pause lifts), schelling-on-new-york ships (abm promotion), or there is an incident in `src/lab` or `src/kit/knots`.
