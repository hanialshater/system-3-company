# Triage 2026-10-17: the untriaged backlog (summary and a rule for the founder), the 30 oldest untriaged next/review items, and done-but-not-active closures

owner: portfolio-manager (Odette, CEO office) · method: company/ops/triage.md · tools: `node tools/triage.mjs stats|list` (read-only here) · asked by: the founder, via the external assessment (company/reviews/org/2026-10-17-external-assessment.md, "Measurement fitness": 724 open items lack a triage object; §7 and Appendix B case 3: W-1337)
status: **proposals.** Nothing on the board was changed. `tools/triage.mjs set` writes company/ops/board.json directly, and board.json has one writer (the chief of staff), so the 30 triage objects are in [company/ops/2026-10-17-triage-proposal-30-oldest.json](../../ops/2026-10-17-triage-proposal-30-oldest.json), each with the `triage.mjs set` line that applies it. The rule in section 2 is the founder's to accept.

## 1. The untriaged backlog, by owner and age (board as of c31c1fa)

`node tools/triage.mjs stats`: 1,055 open; by state next 54, backlog 844, review 151, doing 6; by priority P1 3, P2 116, P3 167, P4 22, **untriaged 747** (the tool counts "no priority"). By "no triage object" (the assessment's definition) it is **724**; every one of those also has no priority.

| Created | Untriaged |
|---|---|
| 2026-10-14 (3 days) | 242 |
| 2026-10-15 (2 days) | 207 |
| 2026-10-16 (1 day) | 250 |
| 2026-10-17 (today) | 25 |

By state: backlog 594, review 106, next 20, doing 4. **130 untriaged items are next, review or doing**: someone believes they are live work, and nobody has ranked them.

Owners with the most untriaged items (count · 2+ days old · in next/review/doing): demo-builder 87 · 63 · 37; evaluation-steward 61 · 34 · 10; tools-lead 59 · 17 · 11; platform-engineer 48 · 30 · 8; chief-of-staff 36 · 15 · 5; head-of-product 27 · 20 · 4; fact-checker 26 · 19 · 2; cm-lifehacks 25 · 15 · 7; qa-tester 24 · 16 · 3; principal-engineer 22 · 13 · 2; cm-history 22 · 17 · 7; principal-engineer-ops 22 · 14 · 1; portfolio-manager 21 · 13 · 0; chief-of-staff-ceo-office 16; release-manager 14; design-lead 13; cm-books 13; privacy-reviewer 12; **founder 10** (founder items belong in founder-inbox.json, not on the board); 40 more owners with 1-9 each.

**What this says.** The backlog is young, not stale: nothing untriaged is older than 3 days. The problem is intake rate: about 230 new items a day against one triage role that runs when dispatched. An age rule alone ("park after 30 days") would not touch it for weeks. Section 3 also shows that the oldest "open" items are mostly **already done in substance** (16 of 30): the board's states lag the work, so untriaged counts overstate open work.

## 2. Proposed rule (for the founder; I propose, the founder decides)

**R1. Triage at intake for items that claim to be live.** An item added as `next`, `review` or `doing` carries a priority from the role that adds it (`--p`). The portfolio manager re-ranks; it does not start from nothing. Needs a change to `company board add` in tools/company.mjs, which is protected, so it goes by amendment (with AMD-005, W-714) or as a lint in `npm run check` that warns on unprioritised live items. Until then the chief of staff passes `--p` when merging hand-back reports.

**R2. Auto-park untriaged backlog after 72 hours, with a reason, as a separate mark.** A `backlog` item with no triage object and no `updated` change for 72 h gets `triage: { by: "rule:park-72h", at, note: "parked by rule, not read; any role reopens it by adding a reason" }` and **no priority**. It leaves the "untriaged" count and appears as its own line ("parked unread: N") in the WBR portfolio section, so parking is never reported as triage. Applied today it would park **189** items (untriaged `backlog` created 2026-10-14 with no later `updated`), of the 594 untriaged backlog items. `next`/`review`/`doing` items are never parked by rule; they get real triage (section 3).

**R3. Parked items expire.** A parked item untouched for 14 days is dropped with the reason "parked 14 days, no one reopened it". This extends triage.md's existing P4 rule ("dropped after two plannings with no movement") to unread items. Dropping something unread is the reason R3 needs the founder.

**R4. A weekly triage cap that reads live items first.** Each triage run reads up to 50 items, in this order: anything that names a published lesson, a false claim, a gate or a deploy (P1 signals); then untriaged `next`/`review`/`doing`, oldest first; then the newest backlog. The cap keeps triage honest ("opened the item and its links"), which 700 a run would not be.

**R5. Close what is done.** At each triage run, an untriaged `next`/`review` item whose lesson or record shows the work landed is proposed `done` with the evidence, as in section 3.

What R2-R3 cost: an unread item could be a real defect. R4's P1-signal pass reads those first, and any role can reopen a parked item. What they buy: the untriaged count measures what nobody has read, and `next` stays short enough to be true.

## 3. The 30 oldest untriaged next/review items (proposed; JSON has the evidence per item)

All 30 were created 2026-10-14. None is mine (independence). Proposed: **16 done, 7 next, 3 review, 2 backlog, 2 dropped.**

| Id | Now | Proposed | Why (short; full note in the JSON) |
|---|---|---|---|
| W-568 | review | P3 done | Wave J safety record on disk; brief-skips says "safety DONE" |
| W-573 | review | P3 done | cluster-stops-the-cascade now v5, claims verified, QA 10-16 |
| W-574 | review | P3 done | enemy-of-my-enemy published v4 |
| W-575 | review | P3 done | metal-feels-colder v2 built; v2 walk owed by the review queue |
| W-576 | review | P3 done | bird-on-the-wire v2 built; same |
| W-599 | review | P3 done | batch D patch applied in the W-608 build |
| W-604 | review | P3 review | tools/sequence-probe.mjs exists; EDD-006 reviewer accepts |
| W-605 | review | P3 review | warnings in src/kit/sequence.tsx 151-167; reviewer closes |
| W-608 | review | P2 review | no a11y record of the v2 engines; project at 103% (route the run's budget) |
| W-609 | next | P2 next | W-477/scale-stage-0 post-deploy smoke never recorded; r9 is live |
| W-625 | next | P4 dropped | a standing rule in its decision record, not a deliverable |
| W-628 | review | P4 backlog | waits on founder F4 (W-615 is a board item, not an inbox item) |
| W-631 | review | P4 backlog | Books drafts wait on F1/F2; books-decks returned at PR1 |
| W-632 | next | P2 next | Big Ideas DLR fifth still undecided; big-ideas grace ends 10-21 |
| W-633 | review | P3 done | two-four-six-rule v2: held citations cut to one |
| W-634 | review | P3 done | ten-times-taller-giant v2, c3 verified (medium) |
| W-635 | review | P3 done | earth-history-in-a-day v3, CM ruling, r14 walk (medium) |
| W-683 | next | P3 next | two v2 drafts' departures still unruled |
| W-684 | next | P2 done | walks done; **split**: no a11y record for published same-grey-in-shadow |
| W-686 | review | P3 done | c4 reworded, verified, published |
| W-687 | next | P3 done | c4/c5 verified on published v1 (medium) |
| W-708 | review | P3 done | c3 reworded, verified, published |
| W-710 | review | P3 done | recall gives a width, c5 verified, published |
| W-712 | next | P2 next, owner chief-of-staff | founder decision not in founder-inbox.json; file it there or record it superseded. I do not decide it |
| W-714 | next | P3 next | AMD-005 still a draft |
| W-715 | next | P3 next | dispatch-check tests now exist; tools-lead confirms the three cases |
| W-716 | next | P3 dropped | superseded by W-1231 (done) and W-1280 (root cause) |
| W-717 | review | P3 done | the three COE records exist |
| W-742 | next | P3 done | re-check done in effect; **split**: "Next 88" to P4 backlog (T2 scope, History at STOP) |
| W-743 | next | P3 next | History decision record still owes head-of-product's live answer |

## 4. Closure honesty: done in the last 3 days, but the note says something is not active

Search: board items with state `done` whose latest of `updated`, `triage.at`, `created` is 2026-10-15 or later (261 items, 68 with any note), notes (`note`, `notes`, `triage.note`) matched for inert, inactive, pending, unverified, paper, until, waits, blocked, owed, follow-up, not deployed, open and similar, then each match read by hand. Ten matched; four are real closure gaps, two are honest splits that need a link, four are fine.

| Id | Owner | Note says | Recommended state |
|---|---|---|---|
| **W-1337** | tools-lead | "merged (tools-r5-b1); C3-C6 follow-ups; layers b/c inert until H1" | **review**, close when W-1280 (H1) shows hook events. The COE's own action 3 says the preventive layer "exists only on paper" until live (company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md line 89). W-1280 is backlog; events.jsonl has no `hk-` event ids. Link W-1280, W-1397, W-1398, W-1412 (C3-C6 are backlog). Track merged / installed / active / effective as separate facts |
| **W-1349** | tools-lead | "merged ...; loaded re-time still owed — PE-ops at next ops review" | **review** (reviewer principal-engineer-ops). The item's own done-condition is the re-time ("re-time x3; PE-ops revokes the G5 verify line ... if still over") |
| **W-408** | platform-engineer | "verify on the integrated tree has not run; gate evidence" (triage 10-14; marked done 10-16 in the PR #3 merge) | **review**, and merge W-860 (backlog, "record whether npm run verify has passed on the integrated tree") into it. No pass is recorded that I found; the done state is the merge-branch move, not the evidence |
| **W-1233** | head-of-product | "nine published in repo; not deployed ...; accessibility + W-1333 conditions travel" | **done is right for the nine** (launch review r5; r9 has since deployed). But the title says 15, and the a11y condition (r5 record line 40: no accessibility review for any of the nine) has no item I can find. Keep done; the chief of staff links or files the a11y condition item and says where the other six went |
| W-183 | cm-probability-chance | "(b),(c) resolved, (a) open" | done, **add link W-1419** (backlog, the (a) revision build). An honest split with an empty links array |
| W-1172 | portfolio-manager | "re-attribution waits on W-1231" | done: W-1231 is done. (My role's item, so I state it, I do not approve it) |
| W-902 | research-lead | "Blocked on founder ask F-37 (optional)" | done: the sourcing note is on disk (company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md); F-37 is optional and open, so the note's verdicts that need those sources stay as written |
| W-1543 | chief-of-staff | founder-inbox filing with conditions | done: filed as F-49 (open) |
| W-146, W-419 | cm-math-discrete | "Lab-only until promoted" / "Lab follow-up" | done: describes the library's status, not unfinished work |

## 5. Board items wanted (for the chief of staff; I did not edit the board)

1. accessibility-reviewer, P2: accessibility record for published big-ideas/same-grey-in-shadow (a visual illusion; W-684 split).
2. cm-history, P4 backlog: History "Next 88" briefs (ranks 13-100), tranche-2 scope, after the F-16 triggers and a History budget (W-742 split).
3. tools-lead, P2: versioned authorizations in the ledger checker (company/ops/2026-10-17-ledger-check-reconstruction.md section 5; r6 ask A4 was never filed).
4. chief-of-staff, P2: put the ledger reconstruction's three founder questions (History countFrom; F-43 "tonight's grace"; lifehacks-engine-v2 basis) in founder-inbox.json, with `budget:` set (token-budget.md §9). W-1450 carries the first.
5. chief-of-staff-ceo-office: approve or reject the section 2 rule as a proposal to the founder (I wrote it, so I cannot approve it).
