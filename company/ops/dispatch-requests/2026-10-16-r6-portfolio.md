# Dispatch request: Triage, priority, budget · round 6 · 2026-10-16
poc: portfolio-manager (Odette)
lane: 17, Triage, priority, budget
slots asked: 1 agent (B1), of which 0 builders. This file is also the W-1442 pricing record: §P1 History and behavioral-econ, §P2 First Light tranche 1, §P3 catalog and maintenance lines. Figures are from `company/ops/ledger.jsonl` after the 14:55Z import (f5597be; usage records end at 14:23:37Z). I summed them myself from the ledger lines, keeping only the largest line of a resumed run (spendBy's dedupe rule). Runs that finished after 14:23Z are **not** in these figures.
since last round:
- r5 B1 (portfolio answers owed since round 2): **accept.** Reported 9f66d4f. §A applied in 34e40a3, and the board lines applied. W-1230's interim Wave J figure is now replaceable: the ledger has wave-j at 5.7M of 7.5M (75%). Selin can lift or keep her hold on that measured figure, not on the interim one.
- W-1231 ledger import (chief of staff, 14:55Z): **accept, with three findings** (§P1.3, asks A3-A5). (a) The `history` register entry has no `budget.countFrom`, so the gate counts History's spend from before approval, which the PR1 basis said it would not. (b) `ledger check` judges runs from before PR1 against today's status. (c) cm-behavioral's two manager runs (249k) are attributed to `catalog`.
- F-38 (founder, ~15:05Z, company/decisions/2026-10-16-founder-first-light-t1-topup.md): First Light T1 +2M. **Recorded in this commit** in `company/ops/projects.json`: `first-light.budget.topUps[0]` = 2,000,000, and `tranches[0].tokens` 3,590,000 → 5,590,000 (with `tokensOriginal`). Lane 18 checks the entry (B1's check covers it). §P2 is projected against 5.59M.
held or declined:
- **The History top-up at ~2.0M (cm-history's suggestion): declined as priced.** The "3-4x low" rests on comparing r4's 1.3-1.8M with the all-time 6.3M. Since approval (10-16 09:05Z), History has measured 2.28M, so the estimates ran about 1.3-1.75x low, not 3-4x. My price is in §P1.1.
- **No historical spend re-tagged** to `catalog` or `maintenance` to clear a STOP. I agree with cm-history's r6 refusal.
- **No standing order for top-ups.** Spend above a tranche is a founder item (dispatch-requests.md §2.3).
standing orders: **SO-17-1 renewed unchanged** (triage on its trigger, expiry 2026-10-23 or 6 rounds). No new order.
for the founder (three items, §5 "spend above the approved tranche"; the chief of staff files them. Each one needs the founder **and one PE**, token-budget.md §4. The 0a delegation is not in force until Project Review 2, so it covers none of them):
1. **History.** (i) Confirm that History's 2.5M counts from approval (2026-10-16), as the PR1 basis (projects.json `history.proposal.basis`, "approved as recommended") said. If confirmed, History is at **2.28M of 2.5M (91%)**, not 251%, and its 25 post-approval check errors clear. (ii) Then a **top-up of 1.1M** (2.5M → 3.6M) buys the smallest set that finishes work in flight: r6 B1-B3 plus their lane-10 checks and two manager rounds. **If (i) is refused** (count all-time spend), the same work needs **~5.1M** (3.8M over + 1.33M). **Hold option:** no top-up. The lane stops, and CO2 v3 and literacy/schooling stay drafts. Nothing published depends on them. My recommendation: (i) yes and (ii) 1.1M, with nothing beyond the in-flight set until Project Review 2 explains History's cost per published lesson (1,572k, against 81k on the catalog line).
2. **behavioral-econ.** Its own stop rule has fired: "pause if ... 1.83M is spent before the five are reviewed". It is at 2.4M all-time (about 2.65M with the two misattributed manager runs), and the DLR five are not reviewed. For this project all-time is the right count, because its 1.83M was sized to include the set-up runs already done. Options: **pause** (the register's default); a **top-up of 0.9M** (in-flight r6 B1-B3, their re-checks and one manager round); or a **top-up of 1.5M** (the same plus brief 5, its checks and the Domain Launch Review). My recommendation: 1.5M or pause. A top-up of 0.9M alone pays for revisions but not for the DLR answer that tranche 1 exists to buy.
3. **First Light T1.** Even after F-38's +2M, tranche 1 runs out about 10-17, six days before the 10-23 checkpoint (§P2). The founder chooses one: **throttle** (lane 4 holds build-scope runs and spends about 0.35M/day to 10-23), or a **bridge drawn from T2's approved 8.17M** (not new money). I would size the bridge at 2.0M, to Project Review 2 on 10-21. This touches the deploy path, so it is the founder's call. Not yet ready to file: lane 4's §4 "Forecast at 80%" (ask A1) should go with it.
objections:
1. **Mine, against my own register entry.** I proposed History's 2.5M "from approval" (the basis text) but did not set `budget.countFrom`. The gate and the check therefore counted ~4.0M of pre-approval spend against it. The STOP reported at 14:55Z is partly my register error. B1 fixes it only after founder item 1(i), because the fix reverses a STOP.
2. **Mine, on History's economics, whichever count is used.** Tranche 1's scope (review, fix and publish the 15 drafts, plus 10 new lessons) has measured ~4.5M so far: ~2.2M in the in-flight grace window on 10-15 and 10-16 morning, plus 2.28M since approval. That is against 2.5M planned (about 1.8x), with 4 lessons published. Moving countFrom does not change that, and the founder sees both figures.
3. **On F-38's route (raised here; the founder's decision stands).** token-budget.md §4 says a top-up is approved by "the founder and one PE". F-38 has the founder only. Asked: A2, a PE's go / object within 24 h, recorded in the F-38 record's objections table.

## §P1 · History and behavioral-econ: priced top-up or hold

### P1.1 History (`history`, approved 2.5M, PR1 2026-10-16 09:05Z)
| Measure | Tokens | From |
|---|---|---|
| All-time | 6.3M (54 runs) | `ledger.mjs report` |
| Before approval (10-15, and 10-16 to 09:05Z) | ~4.0M | 6.3M minus the next row. Of this, ~1.84M is the drafts and the org run that the PR1 basis names as "history under countFrom". The other ~2.2M is in-flight-grace review and fix work on 10-15 and 10-16 morning |
| **Since approval** (27 ledger lines, 09:34-14:10Z, ·893f deduped) | **2.28M (91% of 2.5M)** | my sum from ledger.jsonl |
| ...of which never in a History item | 0.66M: 4 manager runs 0.32M (·4d77, ·e4cd, ·f12a, ·57c0) + 4 lane-10 SO runs 0.34M (·870a, ·feab, ·3e46, ·8764) | answer to cm-history's question. All are History work, none foreign |

**The smallest set that finishes work in flight**, priced from measured History runs today, not from cm-history's figures:
| Item | cm-history est. | My price | Measured basis (10-16, [project:history]) |
|---|---|---|---|
| r6 B1 rulings + scripts | 40k | 100k | cm-history content runs 74k-179k |
| r6 B2 literacy + schooling v2 (one builder) | 150k | 200k | v1 builds 184k + 119k; r4 B4 stopped at 100k |
| r6 B3 CO2 v4 | 110k | 120k | CO2 v3 108k + fix 20k |
| FC (CO2 c2/c8; 23/24 resets) | 120k | 200k | FC runs 71k-125k each, 2 runs |
| Learner reviews (3 lessons) | 120k | 150k | SO-10-3 72k; single re-walks 35k-121k |
| QA (3) | 90k | 75k | SO-10-1 queue run 73k |
| Cultural one-line read | 20k | 55k | smallest cultural run 55k |
| 2 more manager rounds | — | 160k | cm-history manager runs 57k-93k |
| **Total** | 650k | **1.06M; x1.25 ceiling = 1.33M** | |
| less headroom left at 14:23Z | | −0.22M (some already used by runs after 14:23Z) | |
| **Top-up** | (~2.0M suggested) | **1.1M** → History T1 3.6M | if countFrom = 2026-10-16 |
| Top-up if all-time counting stands | | **~5.1M** (6.3M − 2.5M + 1.33M) | |

Stop rule for the top-up: no new `[project:history]` brief is released for build until Project Review 2. Pause if B2 or B3 comes back over its stage budget a second time.
**Hold or kill:** the kill rule (DLR five: more than 40% of claims held, or fewer than 3 of 5 reach launch) has **not** fired: 4 History lessons are published. A hold costs nothing further and blocks nothing published.

### P1.2 behavioral-econ (approved 1.83M; T1 includes set-up)
| Measure | Tokens |
|---|---|
| All-time | 2.4M (24 runs, 1 unmeasured); about 2.65M with ·3ee5 (74k) and ·2997 (175k), cm-behavioral manager runs attributed to `catalog` |
| Since approval (17 measured lines, ·9c12 deduped) | 1.58M |
| Gate crossed 1.83M (all-time) | ~12:40Z. Six runs after that are the 6 behavioral check errors |

| Option | Price | Basis (measured behavioral runs today) |
|---|---|---|
| Pause (stop rule) | 0 | zero-loses keeps its launch verdict; saved-or-die v2 and sure-million v1 stay at revise |
| Top-up A: in-flight only | **0.9M** | B1 60k (content runs 43k-117k) + B2 170k + B3 110k (builders 71k-167k) + re-checks ~320k (one FC ~128k, learner ~65k x2, QA ~60k) + 1 manager round 80k = 0.74M, x1.25 |
| Top-up B: through the DLR | **1.5M** | A plus brief 5 build ~150k, its checks ~200k, DLR ritual 117k (measured unit) = 1.21M, x1.25 |
cm-behavioral's own estimate (0.53M + 0.3M) leaves out its manager runs and prices the re-checks at about 100k per lesson. The measured runs today are larger.

### P1.3 The 38 `ledger check` errors, sorted
| Group | Errors | Real? |
|---|---|---|
| History, 10-15 10:12-10:40Z | 7 | **No.** History was `in-flight` with grace until 10-16 23:59 at the time. The check applies today's status retroactively (ask A4) |
| History, 10-16 09:34-14:10Z | 25 | Only under all-time counting. With countFrom = 2026-10-16 the gate never reached 100%, so 0 |
| behavioral-econ, 10-16 12:42-13:37Z | 6 | **Yes.** The gate would have refused them if it had seen the spend. It could not, because the ledger had not been imported since 10-14 (F-38's open objection, W-1282) |

## §P2 · First Light tranche 1 (now 5.59M after F-38)
- **Spent to date: 3.03M** (30 runs, 1 unmeasured: ·9fd2): 1.12M on 10-15 (9 runs), 1.91M on 10-16 to 14:03Z (20 runs, ·a3f8 deduped). All-time counting is right here, because T1's "buys" include the 10-15 org-role and war-room runs.
- **Against 3.59M: 84%. Against 5.59M: 54%. Left: 2.56M.**
- **Rate today:** 1.91M in the day so far, about 0.13M per clock hour since 09:28Z.
- **Projection to 10-23 23:59Z:** at 1.9M/day, 3.03 + 1.9 x 7.4 ≈ **17M**. At 10-15's 1.12M/day ≈ **11M**. Both are over 5.59M.
- **Will T1 overrun before the checkpoint? Yes,** unless spend drops to **about 0.35M/day** (2.56M over 7.4 days), roughly a fifth of today's. At today's rate the 2.56M is gone **between about 10-17 10:00Z (clock-hour rate) and the evening of 10-17 (1.9M/day)**. Confidence: high on the arithmetic (±0.1M). Runs after 14:23Z only bring the date forward.
- **Why, I believe (medium confidence):** round 3 carries build-scope runs, such as share-a-lesson S1-S5 code runs (B1, 3 runs), accounts readiness and the beacon allow-list. Those look like tranche 2's "build, fix rounds" more than tranche 1's "design, EDDs, spikes". Lane 4 (Beatriz) is the one to say so. If true, the throttle and the bridge in founder item 3 are the same question: start T2 early, or wait.
- The T2 picture (token-budget.md §10: re-based ~19.2M against the 10.2M stop rule) is unchanged by F-38. F-38 moves the program total (5.59M + 8.17M = 13.76M approved, against 11.76M at PR1).

## §P3 · Do catalog and maintenance need budget lines? Yes, both. Lines warn and never block (token-budget.md §4)
| Line | All-time | 10-16 to 14:20Z | Note |
|---|---|---|---|
| catalog | 54.9M (437 runs, 30 unmeasured) | 2.12M (25 runs) | cheapest per lesson in the company (81k/published). 11 of the 25 runs today are lane manager runs (1.01M) |
| maintenance | 9.3M (118 runs) | **4.19M (49 runs)**, against 1.56M on 10-15 | the biggest line today. Tools guards, COE-A/B, PE/PE-ops approvals, and engineering/quality/tools/design manager runs (~0.66M). Unregistered tags `[project:review-publish]` and `[project:hq]` fold into it silently |

**Proposed** (I write them; op-planning sets them, lane 18 checks the proposal): **catalog 15M per 7-day cycle** (~2.1M/day, today's measured rate) and **maintenance 10M per cycle** (~1.4M/day, between 10-15 and 10-16). Return measures stand (lessons published; findings fixed). The 80% warning goes to op-planning. Separately, manager runs across lines measured at least 2.4M today (catalog 1.01M, maintenance 0.66M, First Light 0.34M, History 0.32M, behavioral 0.08M) out of at least 12.1M summed on five lines. That is near dispatch-requests §6's 20% test. That count is Leonie's (WBR), not a budget line.

## B1 · Register and token-budget entries for W-1442: History countFrom (after founder item 1(i)), proposed top-ups, catalog/maintenance line proposals, First Light §4 note · board W-1442
role: portfolio-manager
order: first. The countFrom part waits on founder item 1(i). The rest is ready now
kind: other
worktree: no
model: agent default
project: [project:leadership]
budget: 1 run, ~100k tokens
inputs: this file; company/ops/projects.json; company/ops/token-budget.md; company/ops/ledger.jsonl; company/rituals/records/2026-10-16-project-review.md; the founder's answers to items 1-3 (founder-inbox.json, read-only)
outputs: company/ops/projects.json: `history.budget.countFrom` = "2026-10-16" **only if** item 1(i) is confirmed; any approved top-up in `budget.topUps` with its record; otherwise `proposal.topUp` entries (history 1.1M / 5.1M, behavioral 0.9M / 1.5M) marked "proposed, not approved"; `catalog` and `maintenance` `proposal.budgetTokens` per cycle. company/ops/token-budget.md: a dated §11 with the §P1-§P3 tables and figures re-run on the latest import
done when: `node tools/ledger.mjs report` shows history against the confirmed basis; `node tools/ledger.mjs check` error count is restated by group (§P1.3) in §11; `node -e 'const p=require("./company/ops/projects.json").projects.find(x=>x.id==="first-light");if(p.tranches[0].tokens!==5590000)process.exit(1)'` exits 0; `npm run check` passes
checked by: chief-of-staff-ceo-office (lane 18). These are my own register entries, so I may not approve them
stop if: the founder has not answered item 1(i) (then write everything except countFrom); a top-up has no decision record on disk; the latest import moves any figure here by more than 10% (re-price, and do not edit on the old figures)

## Asks to other lanes
- **A1 → head-of-strategic-initiatives (lane 4):** First Light is past 80% of its original T1. File the §4 "## Forecast at 80%" in the approval record: spend, return so far, tokens still needed to 10-23, and continue / throttle / bridge. Say which round-3 and round-4 runs are T2 build scope. Reflect F-38 in status.json (the F-38 record asks this too).
- **A2 → principal-engineer (lane 7) or principal-engineer-ops (lane 8):** the "one PE" for F-38 (after the fact) and for founder items 1-3. A go / object within 24 h.
- **A3 → chief-of-staff (lane 19):** run `events.mjs backfill` + `ledger.mjs import` before filing founder items 1-3, so the founder sees spend after 14:23Z. File the three items with `budget: history`, `budget: behavioral-econ`, `budget: first-light` (token-budget.md §9). Keep History's and behavioral's gates at STOP until the founder answers.
- **A4 → tools-lead (lane 9):** (a) `ledger check` should judge each line against the project's status at that line's time, not today's (the 7 grace-window errors). (b) Role-default attribution for `cm-behavioral` → behavioral-econ and `cm-history` → history (·3ee5 and ·2997 went to catalog). (c) Warn on unregistered `[project:]` tags (`review-publish`, `hq`). One P3 item, or fold it into W-1298.
- **A5 → cm-history and cm-behavioral (lane 1):** History's estimates since approval ran about 1.3-1.75x low, not 3-4x (§P1.1). Quote the ledger line in batches, as History's r6 objection 1 already commits to. Behavioral's own stop rule has fired. The founder chooses between pause and a top-up.
- **A6 → chief-of-staff-ceo-office (lane 18):** check B1 and the F-38 register entry in this commit.
