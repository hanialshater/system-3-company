# Dispatch request: Triage, priority, budget · round 5 · 2026-10-16
poc: portfolio-manager (Odette)
lane: 17, Triage, priority, budget
slots asked: 1 agent (B1), of which 0 builders. This file is also the round-5 triage record: §T below triages every board item created today from W-1192 on that is in `backlog` or `next` and that no lane batch (r2 to r5, First Light rounds 1 to 3) names, as read at ~13:40Z.
since last round: this is lane 17's first batch file. Nothing was dispatched to lane 17 in rounds 1 to 4. Four asks to this lane have waited since round 2 and I answer them in B1: W-1172 and W-1230 (verticals r2, r3 A6, r5 A6), W-1191 and W-1219 (First Light r3, "depends on" row 17, date 10-23). W-1246 (owner chief-of-staff, but the title names portfolio-manager) joins them.
held or declined: W-1230's **measured** cost line is not possible this round. company/ops/ledger.jsonl stops at 2026-10-14T15:20Z (505 lines, 10 wave-j rows), so a tokens-per-published-Wave-J-lesson figure needs the lane 19 ledger import first (W-1231, W-1282; ask A1). B1 answers W-1230 with an interim figure from company/ops/waves.json, labelled "reported, not ledger-measured", and names the date it is replaced. Selin's build hold stands until then. That is her call, not mine.
standing orders: **new SO-17-1** (triage on its trigger, poc-map row 17): trigger = 10 or more board items created in the last 24 h with no `priority` and no lane batch naming them, or any item arriving as P1 · role portfolio-manager · batch = one triage record (this format, §T) per round, at most one per round · tag [project:leadership] · done check = every item in the trigger set has a row in the record with P, owner lane and state, and the chief of staff's `node tools/triage.mjs set` lines from §A apply without error · expiry 2026-10-23 or 6 rounds, whichever is first. The 625 legacy untriaged items do not fire it (they go to OP planning).
for the founder: none from this lane. W-1193 (domain prices) and W-1198 (off-boarding format) end in founder decisions, but neither is ready to ask: see their rows.
objections: (1) **Mine, on owners.** At least 11 of today's items are owned by `chief-of-staff` with the real owner appended to the title (W-1246, W-1269, W-1281, W-1283, W-1289, W-1291, W-1298, W-1303, W-1305, W-1322, W-1325 and others). triage.md step 3 says never chief-of-staff by default. §A re-owns them. I ask lane 19 (A2) to put the owner in `--owner`, not the title, from now on. (2) **Mine, on publish safety.** `company status` (13:40Z) lists head-on-is-a-wall, small-gap-big-extremes, patience-wins-the-split, cluster-stops-the-cascade and asthma-looks-safe as "Ready to publish". Each has an open revise finding (W-1318, W-1333, W-1329), and none is in company/ops/publish-holds.json. The Life Hacks W3 lessons are held correctly. Ask A3.

## B1 · Portfolio answers owed since round 2: re-own wave-j and catalog, Wave J cost line (interim), First Light tranche 2 re-base, PR1 item 5 wording · board W-1172, W-1230, W-1219, W-1191, W-1246
role: portfolio-manager
order: first
kind: other
worktree: no
model: agent default
project: [project:leadership]
budget: 1 run, ~150k tokens
inputs: company/ops/projects.json; company/ops/token-budget.md; company/ops/waves.json; company/ops/ledger.jsonl; the PR1 record and register named by W-1219 and W-1230 (462bb26, 617dfdb); company/initiatives/first-light/dispatch/2026-10-16-round-3.md ("depends on" row 17); company/ops/dispatch-requests/2026-10-16-r5-verticals.md (objection a, A6); company/ceo-office/poc-map.md (row 2 flag, "catalog line")
cites: First Light: the 8.5M engineering T2 figure in W-1191 is principal-engineer's estimate (Kenji), as quoted in First Light r3; cite his record, not this file
outputs: company/ops/projects.json (`wave-j` owner → principal-pm-verticals; `catalog` owner → head-of-product, with a dated note); the PR1 register and forum lines for items 4, 5, 6 and 0d (W-1219, W-1246, W-1230); a dated answer to W-1191 in token-budget.md (T2 re-based on 8.5M engineering, 19.2M / 16.3M against the 10.2M stop rule, which trips on 10-23 on these figures)
done when: `node -e 'const p=require("./company/ops/projects.json")'` shows wave-j owned by principal-pm-verticals and catalog by head-of-product; the PR1 record has a dated answer under item 6 that labels its Wave J figure "interim, from waves.json" and names the ledger-import item (W-1231) that replaces it; token-budget.md has a dated T2 line citing Kenji's estimate; `npm run check` passes
checked by: chief-of-staff-ceo-office (lane 18). The portfolio-manager may not approve its own register entries; Leonie approves or objects. Lane 10 has no budget checker, so this is the lane-18 check, not a quality check
stop if: projects.json changes need a decision record that does not exist (then write the proposal, do not edit); the PR1 record is under a pending amendment; the interim Wave J figure cannot be traced to a waves.json row (then say "no figure" and keep the hold)

## §T · Triage of today's unclaimed items (W-1192 on, backlog/next, no lane batch)

Read: each item, its links where named, and the batches r2-r5. Checked on disk where the item allowed it (commands in "evidence"). P per company/ops/triage.md. "Lane" = poc-map row of the owner.

### Duplicates and items already done (move them; do not batch them)
| Item | Verdict | Into / evidence |
|---|---|---|
| W-1201 | duplicate | merge into **W-1183** (older, same /dev/null incident). Carry W-1201's widened scope (dispatch-check host invariants, disk floor, reserved ports, COE naming the command) onto W-1183. P2, lane 8 |
| W-1222 | done by another item | First Light r3 B3 (W-1181) did it: 1c2f243 "exp.spacedDays is the schedule step". Drop with that reason |
| W-1224 | done (privacy half) | 350d2db: EDD-009 §5 confirmed, C8 early-stop half written. The backend half is W-1295. Move to done |
| W-1226 | duplicate | merge into **W-1208** (older, same three Rome r13 findings; History r4 holds Rome v5 on W-1170) |
| W-1227 | done | 6d65dc3 "Cultural-reviewer addenda for History briefs 12, 4, 5, 3 (W-1204) ... slug answer". The next cultural step is W-1343. Move to done |
| W-1259 | duplicate | merge into **W-1243** (older; both link W3 QA records via `company qa-record`). W-1243 takes W-1259's learner-record half. Evidence: group-cables, jacket-last-first, sock-pairing, suitcase evidence still lists only 10-14 QA and r11 learner files |
| W-1281 | duplicate | merge into **W-1233** (older; 15 vs 20 Wave J launch candidates). W-1233 takes the 20-lesson scope, the exclusion of calibrated-but-unequal-alarms and cut-the-busiest-link, and Selin's objection (b) (read the newest learner verdict). Re-own W-1233 to head-of-product (lane 5) |
| W-1320 | duplicate | merge into **W-1312** (its own title says "add ... to the kit item W-1312"). Lane 7 |
| W-1322 | duplicate | merge into **W-1170** (the History launch-review five already covers Rome v4; History r4 waits on W-1170). head-of-product, lane 5 |
| W-1324 | duplicate | merge into **W-1228** (older; same W-1094 safety re-look of the W3 cord rows). W-1228 takes the group-cables locked-dots question (1b5fa53, keep or revert) and the tote idea / elastic reveal rows |
| W-1336 | duplicate | merge into **W-1332** (older; same SO tag case-sensitivity question). W-1332 takes W-1336's selector half (a newer qa-tester record clears the W-1235 audit rule) |
| W-1203 | probably satisfied: ask the owner | dispatch-requests.md already has per-lane batch paths (§2), written refusals (§3.3), and poc-map rule 3 sends checks to lane 10. chief-of-staff-ceo-office confirms and closes, or names the missing sentence. P4 until then |
| W-1286 | probably satisfied: to review | Two FC pass 61 runs (4f14ab1: 24 lessons, 33 claims; 8ce9bf0: 22 lessons, 30 claims) cover the Life Hacks reset claims, including keep-the-error-feedback c3. The disputes and holds that remain are already items (W-1234 sock-pairing, W-1108). evaluation-steward confirms the 42 are all in those records, then done. Move to `review` |
| W-1298 | partly satisfied | tools-ledger merged (99de2a4, "F1-F9 answered"). The before-merge half is done. Keep only the before-enforce half (F1, F4, F6, F8 + hook-report fixture). Re-own to tools-lead. P3 |
| W-1342 | claimed | History r4 B4 (queued builder, schooling-and-crime-1830s and literacy-split-france v2). No new item. Link it to that batch |

### Priority, owner and state for the rest
P2 = blocks a launch, a team or a dated dependency this cycle. P3 = makes things better, when capacity allows. P4 = someday. "next" only for items I name in a lane's next batch (below). The rest stay in backlog with a priority.

| Item | P | Owner (lane) | State | Why |
|---|---|---|---|---|
| W-1337 | P2 | tools-lead (9) | next | Pre-rebase guard in the main checkout. The 13:06 autostash lost two agents' work. Without the guard it can happen again in any round |
| W-1338 | P2 | cm-behavioral (1) | next | **Redo, not recover.** Checked: stashes 166ee49 and 13e83c8 hold only history-cycle1/2 checks, history-data.mjs, history.md and the amendments README, with no untracked parent. Neither has the behavioral files. Both files exist at their committed versions (b195793). cm-behavioral must say which edits were lost before r4 B2's builder relies on them |
| W-1319 | P2 | tools-lead (9) | next | publish-ready.mjs edits meta.json on `--help` (8 files). A reviewer's harmless call wrote evidence links. Refuse unknown flags |
| W-1287 | P2 | tools-lead (9) | next | r2-coe.test.mjs reads the live events.jsonl. Once G5 puts test:dispatch in verify (tools-f5, cleared in be2cb91), a torn line fails verify for everyone |
| W-1302 | P2 | tools-lead (9) | next | fold-lock test fails 2 of 3 runs at load 14-18. Same reason as W-1287: it is about to sit inside verify. Run it with W-1287, the same files |
| W-1303 | P2 | platform-engineer (7) | backlog | Checked: `node --test tests/platform/registry-split.test.mjs` passes 7/7 now. The defect comes back with every new draft that has no fact-checked claim yet, and it blocks verify for everyone between build and FC. Re-own from chief-of-staff. Kenji to batch when lane 7 next has room |
| W-1213 | P3 | cm-behavioral (1) | next | Checked: company/ops/claims/sure-million-or-long-shot.json has `"agent":"unknown"`. Mechanical `claim.mjs` release or re-own, in the same run as W-1338 |
| W-1340 | P2 | cm-lifehacks (1) | next | lh-engine-locked condition 4: four lessons draw a target mark while locked. They are held in publish-holds.json, so this is not urgent for safety, but it gates their release (design r5 says it is lane 1's) |
| W-1251 | P2 | cm-lifehacks (1) | next | PE-ops W3 condition 5: laundry-sort-before-walk needs its own readiness record before it can leave publish-holds |
| W-1300 | P3 | cm-lifehacks (1) | next | Orphaned from the refused r3 B2. lh-engine-locked has now merged (0ad1525), so the "after" condition holds. Tote lever arm 150→188, laundry-sort to engine 2, socks hollow label |
| W-1229 | P3 | demo-builder via cm-lifehacks (1) | backlog | The builder restates fix-plan objections 1-3 and 7. Paper only. cm-lifehacks' call whether it rides on the next builder run |
| W-1225 | P3 | cm-history (1) | backlog | Only after History r4 B2 (britain v3, queued builder) moves the directory. Checked: brief-skips.json line 63 is still there. It is a one-line follow-up for cm-history's next content run |
| W-1318 | P2 | principal-pm-verticals (2) | next | Wave J learner r1 revise for head-on-is-a-wall and small-gap-big-extremes. Both show as "Ready to publish" with no hold (objection 2). Revision builds, so they need a builder slot. Not in r5-verticals |
| W-1333 | P3 | principal-pm-verticals (2) for head-on-is-a-wall; cm-economics (1) and cm-math (1) for the other two unless Selin says they are Wave J | backlog | Unsignposted unlock (R4 note). Selin confirms which of patience-wins-the-split and cluster-stops-the-cascade are Wave J slugs (W-585 list). head-on-is-a-wall rides with W-1318 |
| W-1294 | P2 | principal-engineer-ops (8) | next | A6-1: two A-6 log tests against a real Postgres on the rebased accounts tip. A-1 and A-6 stay open until then. First Light merge path, Rhea's readiness approval due 10-27. Waits on A-13 (rebase) |
| W-1183 (+W-1201) | P2 | principal-engineer-ops (8) | next | dispatch-check host invariants plus the COE for 09:45Z. Rhea should also say whether the 13:06 autostash loss (W-1337/W-1338) is a second COE. That is her ruling, not mine |
| W-1220 | P3 | principal-engineer-ops (8) | backlog | tier-2 rule for src/lib/learner/**. Needed before EDD-009 part 2 code, which has not started (First Light r3 row 8) |
| W-1239 | P3 | principal-engineer-ops (8) | backlog | Risk-register entry for 33 dev-tree npm audit advisories. Its trigger is R2 "after accounts merges" |
| W-1261 | P4 | principal-engineer-ops (8) | backlog | Re-measure at 20 MB. Checked: events.jsonl is 6 MB |
| W-1221 | P2 | learner-model-engineer (14) | next | EDD-009 M-1..M-4 and the route text. First Light r3 row 14, due 10-29, approval 10-30 |
| W-1297 | P2 | learner-model-engineer (14) | next | Privacy S1 and S3 into EDD-009 (350d2db). Same file, same run as W-1221 |
| W-1291 | P2 | learner-model-engineer (14) | next | Apply the pedagogy rulings (Q1-a, Q3-a, F1, F2) to EDD-009. Same file, same run. F2's revisitDue change needs an amendment: stop-if. Re-own from chief-of-staff |
| W-1295 | P2 | backend-engineer via head-of-strategic-initiatives (4) | backlog | C8 early-stop line with privacy (E1-E4) and assertion A6-2. accounts work, so lane 4 orders it. Beatriz's round 4 |
| W-1307 | P2 | backend-engineer via head-of-strategic-initiatives (4) | backlog | Beacon E1 gates the first experiment registration (10-31). Lane 4 (First Light), not lane 7 |
| W-1305 | P3 | backend-engineer via head-of-strategic-initiatives (4) | backlog | Optional allow-list bounds. Re-own from chief-of-staff. Rides with W-1307 if Beatriz wants it |
| W-1296 | P3 | growth-designer via head-of-strategic-initiatives (4) | backlog | PRD-004 line 39 wording (privacy S2). Before the challenges build (latest 11-01) |
| W-1283 | P2 | analytics-steward (5) | backlog | Keep or drop exp.spacedDays under C3, now that 1c2f243 made it the schedule step. Decide it together with W-1214 (registration by 10-31). Re-own from chief-of-staff |
| W-1309 | P3 | analytics-steward (5) | backlog | Do draft and retired slugs count as catalog slugs for exp? At registration, with W-1283 |
| W-1215 | P3 | privacy-reviewer via evaluation-steward (10) | backlog | Confirm the growth designer's C4 device-marker reading. First Light r3 says it is lane 10's next First Light privacy run. Before the challenges build |
| W-1218 | P3 | backend-engineer via head-of-strategic-initiatives (4); privacy-reviewer checks | backlog | A data-inventory entry is the author's artifact. The privacy-reviewer checks it and should not write it. Checked: data-inventory.md D8.9 still reads "retention clock". Go-live, not merge |
| W-1216, W-1223 | P2 | backend-engineer (4) | backlog | Already ordered by lane 4: R-M2a/b are First Light r3 B4 (W-1165). The C2 day-5 test and Q4 sort are in r3 B4 and r3's held "beacon fix run". Link them to those items. No new batch |
| W-1228 (+W-1324) | P2 | lifehacks-safety-reviewer via evaluation-steward (10) | next | The W3 cord rows and group-cables locked dots stay provisional until it runs. Artifact-first on the shared server once it is rebuilt at or after 0ad1525 |
| W-1341 | P2 | qa-tester via evaluation-steward (10) | next | lh-engine-locked condition 5: 5-lesson QA of the locked Home stage on the shared server after the rebuild. SO-10-1 fits it |
| W-1343 | P3 | cultural-reviewer via evaluation-steward (10) | backlog | Brief 11 reveal, brief 12 rename, brief 4 name. Its own title says FC P5 first, so it is not ready this round |
| W-1332 (+W-1336) | P3 | evaluation-steward (10) | backlog | SO tag case rule and the selector half. Steward's own run, AMD-011 part 2 evidence |
| W-1232 | P3 | fact-checker via evaluation-steward (10) | backlog | W-975 type (d) statement. Run it with W-1316 (behavioral r4 names it), the same source and correction |
| W-1269 | P4 | evaluation-steward (10, amendment route) | backlog | tools/company.mjs is protected, so this is an amendment proposal, not tools work. Re-own from chief-of-staff |
| W-1325 | P3 | tools-lead (9) | backlog | reveal-fit measures the longer kit verdict on every branch. Re-own from chief-of-staff |
| W-1331 | P3 | tools-lead (9) | backlog | Re-own from platform-engineer: tools/reveal-fit.mjs is a company tool (lane 9) and already has the svg[data-reveal-fit] rule (line 153). Same file as W-1325 and W-1274, so batch them together |
| W-1301 | P3 | tools-lead (9) | backlog | nextBuild in isBuilderSlot. "Whichever merges second" |
| W-1335 | P3 | tools-lead (9) | backlog | The blocked-hosts list. It explains 7 FC holds in pass 61, so it rises to P2 if lane 10 says those holds block a launch |
| W-1289 | P3 | platform-engineer (7) | backlog | measure.mjs (A2 pilot R5). Re-own from chief-of-staff |
| W-1236 | P3 | chief-of-staff-ceo-office (18) | backlog | AMD-010 constitutional review agenda |
| W-1198 | P3 | chief-of-staff-ceo-office (18) | backlog | Off-boarding summary format plus its decision record. The founder approves it later, through Leonie, once the draft exists |
| W-1243 (+W-1259) | P3 | chief-of-staff (19) | next | lhw3 has merged (checked: ancestor of HEAD), so `company qa-record` links for the 8 W3 QA records and the 8 r14 learner records can land. §4 integration |
| W-1231 | P2 | chief-of-staff (19) | next | The event-log and ledger repair. W-1230's measured line and the PR1 kill rules wait on it. Checked: ledger.jsonl ends at 10-14 15:20Z |
| W-1282 | P2 | chief-of-staff (19) | next | The per-round ledger import. It is the standing form of W-1231. Keep it as one item, so it stays separate from W-1231's one-off backfill |
| W-1246 | P3 | portfolio-manager (17) | in B1 | PR1 item 5 wording. Re-own from chief-of-staff. Lane 18 approves it, because it would be my own register line |
| W-1308 | P3 | release-manager (11) | backlog | Only after a founder-approved deploy that contains 7e5207f. Nothing to do until then |
| W-1292 | P3 | research-lead (12) | backlog | Accept or reject the W-902 note §3 (certainty-effect verdict). It rises to P2 if cm-behavioral's same-week, saved-or-die or sure-million claims rest on that verdict. Wen's call |
| W-1193 | P3 | vp-marketing (16) | backlog | Price quotes only. Checked: the brief says the proxy blocked prices, and trademark (F-25, counsel) comes first. No purchase. Any purchase is a founder ask, later |
| W-1194 | P3 | vp-marketing (16) | backlog | positioning.md is missing. Celeste's next batch |
| W-1192 (claimed), W-1235 (next) | n/a | | | Named in batches. Left as they are |

## §L · What each lane POC should put in its next batch (from this triage)
In cross-lane priority order for this round's caps (dispatch-requests.md §3.2). None needs a builder except lane 2's.
1. **Lane 9, tools-lead (Sora):** W-1337 (rebase guard) first. Then W-1319, then W-1287 with W-1302 as one run. No builds.
2. **Lane 1, cm-behavioral:** W-1338 (redo: say what was lost, before r4 B2's builder uses those checks) with W-1213. No build.
3. **Lane 8, principal-engineer-ops (Rhea):** W-1183 (with W-1201's scope), plus the ruling on whether 13:06 is a COE. W-1294 once A-13 has landed.
4. **Lane 10, evaluation-steward (Hilde):** W-1341 (QA, SO-10-1) and W-1228 (safety, with W-1324), both on the shared server after the rebuild at or after 0ad1525. Then confirm W-1286 into done. W-1215 when the next First Light privacy run goes. Not W-1343 yet.
5. **Lane 14, personalization-lead (Mateo):** one learner-model-engineer run on EDD-009 with W-1221, W-1297 and W-1291, [project:first-light], due 10-29. Stop if F2 needs the protected revisitDue change.
6. **Lane 1, cm-lifehacks:** W-1340 and W-1251 (gates that release held lessons). W-1300 when a builder slot opens. W-1229 if a builder run is going anyway.
7. **Lane 19, chief-of-staff (Ada), §4:** W-1231, then W-1282 every round. W-1243 (with W-1259) now that lhw3 has merged.
8. **Lane 2, principal-pm-verticals (Selin):** W-1318 (revision builds for head-on-is-a-wall and small-gap-big-extremes; the only builder in this list, so it waits for load ≤ 8). Confirm W-1333's slugs.
9. **Lane 4, head-of-strategic-initiatives (Beatriz), round 4:** W-1295, W-1307 (with W-1305 if wanted), W-1296, W-1218. Link W-1216 and W-1223 to r3 B4 and the held beacon-fix run.
10. **Lane 5, head-of-product (Priya):** W-1233 (now carrying W-1281) and W-1170 (now carrying W-1322) as launch reviews. analytics-steward on W-1283 with W-1214, and W-1309.
11. **Lane 7, principal-engineer (Kenji):** W-1303 when platform-engineer has room. W-1312 (with W-1320) and W-1289 after it.
12. **Lane 18 (Leonie):** check B1 above. Confirm or reopen W-1203. W-1236 and W-1198 when convenient.
13. **Lanes 11, 12, 16:** nothing new this round (W-1308 waits on a deploy; W-1292, W-1193 and W-1194 are P3).

## Asks to other lanes
- **A1 → chief-of-staff (lane 19):** W-1231 and W-1282 (ledger import). B1's Wave J figure stays "interim" until they land, and Selin's build hold depends on it.
- **A2 → chief-of-staff (lane 19), board (single writer):** apply §A. Put real owners in `--owner`, not appended to the title.
- **A3 → chief-of-staff (lane 19) and head-of-product (lane 5):** check that head-on-is-a-wall, small-gap-big-extremes, patience-wins-the-split, cluster-stops-the-cascade and asthma-looks-safe cannot publish while their revise findings are open. publish-ready.mjs holds a lesson whose newest linked learner verdict is not "launch". If the r1 revise records are not linked into evidence.simulatedLearner, add publish holds that cite W-1318, W-1333 and W-1329. Deploys still need the founder, so this concerns the publish pass, not a live risk today.
- **A4 → evaluation-steward (lane 10):** confirm W-1286 against FC pass 61's two records.

## §A · Board moves for the chief of staff to apply (node tools/triage.mjs; I did not edit board.json)
```sh
node tools/triage.mjs set W-1201 --state=dropped --note="duplicate of W-1183 (same 09:45 /dev/null incident); scope carried to W-1183 · r5 triage"
node tools/triage.mjs set W-1183 --p=2 --state=next --note="absorbs W-1201: host invariants (/dev/null, disk floor, reserved ports) + COE naming the command; Rhea also rules on a COE for the 13:06 autostash · r5 triage"
node tools/triage.mjs set W-1222 --state=dropped --note="done under W-1181 by First Light r3 B3 (1c2f243) · r5 triage"
node tools/triage.mjs set W-1224 --state=done --note="privacy half done in 350d2db (EDD-009 s5, C8 early-stop half); backend half is W-1295 · r5 triage"
node tools/triage.mjs set W-1226 --state=dropped --note="duplicate of W-1208 (same Rome r13 findings, v5 waits on W-1170) · r5 triage"
node tools/triage.mjs set W-1227 --state=done --note="done in 6d65dc3 (addenda 12,4,5,3 + slug answer); next cultural step is W-1343 · r5 triage"
node tools/triage.mjs set W-1259 --state=dropped --note="duplicate of W-1243; learner-record half carried to W-1243 · r5 triage"
node tools/triage.mjs set W-1243 --p=3 --state=next --note="lhw3 merged; link 8 W3 QA + 8 r14 learner records (absorbs W-1259) · r5 triage"
node tools/triage.mjs set W-1281 --state=dropped --note="duplicate of W-1233; 20-lesson scope, exclusions, newest-verdict rule carried to W-1233 · r5 triage"
node tools/triage.mjs set W-1233 --owner=head-of-product --note="absorbs W-1281 (20 candidates, exclude calibrated/cut v2, read newest learner verdict); launch review is lane 5 · r5 triage"
node tools/triage.mjs set W-1320 --state=dropped --note="duplicate of W-1312 (lakes + literacy + lakes SVG bbox carried) · r5 triage"
node tools/triage.mjs set W-1312 --p=3 --note="absorbs W-1320: lakes-misplaced-east-west, literacy-split-france, lakes SVG child bbox y=1684 · r5 triage"
node tools/triage.mjs set W-1322 --state=dropped --note="duplicate of W-1170 (History launch-review five covers Rome v4) · r5 triage"
node tools/triage.mjs set W-1324 --state=dropped --note="duplicate of W-1228; group-cables locked dots (1b5fa53), tote idea, elastic reveal carried · r5 triage"
node tools/triage.mjs set W-1228 --p=2 --state=next --note="absorbs W-1324; artifact-first on shared server after rebuild >= 0ad1525 · r5 triage"
node tools/triage.mjs set W-1336 --state=dropped --note="duplicate of W-1332; selector half carried · r5 triage"
node tools/triage.mjs set W-1332 --p=3 --note="absorbs W-1336 (selector: newer qa-tester record clears W-1235 rule) · r5 triage"
node tools/triage.mjs set W-1203 --p=4 --note="probably satisfied: dispatch-requests.md s2 paths, s3.3 refusals, poc-map rule 3; Leonie confirms or names the gap · r5 triage"
node tools/triage.mjs set W-1286 --p=2 --state=review --note="FC pass 61 x2 (4f14ab1, 8ce9bf0) appear to cover the 42 resets; steward confirms; residual disputes are W-1234/W-1108 · r5 triage"
node tools/triage.mjs set W-1298 --p=3 --owner=tools-lead --note="before-merge half done (99de2a4); keep before-enforce F1,F4,F6,F8 + fixture · r5 triage"
node tools/triage.mjs set W-1342 --p=2 --note="claimed by History r4 B4 (queued builder) · r5 triage"
node tools/triage.mjs set W-1337 --p=2 --state=next --note="pre-rebase guard; 13:06 autostash lost work · r5 triage"
node tools/triage.mjs set W-1338 --p=2 --state=next --note="redo, not recover: stashes 166ee49/13e83c8 contain no behavioral files · r5 triage"
node tools/triage.mjs set W-1319 --p=2 --state=next --note="publish-ready edits meta.json on --help · r5 triage"
node tools/triage.mjs set W-1287 --p=2 --state=next --note="live-log test about to sit in verify (G5); run with W-1302 · r5 triage"
node tools/triage.mjs set W-1302 --p=2 --state=next --note="flaky under load, about to sit in verify; run with W-1287 · r5 triage"
node tools/triage.mjs set W-1303 --p=2 --owner=platform-engineer --note="passes 7/7 now, recurs with each new draft before FC; blocks verify · r5 triage"
node tools/triage.mjs set W-1213 --p=3 --state=next --note="claims/sure-million-or-long-shot.json agent unknown; with W-1338 · r5 triage"
node tools/triage.mjs set W-1340 --p=2 --state=next --note="lh-engine-locked condition 4; gates release of 4 held lessons · r5 triage"
node tools/triage.mjs set W-1251 --p=2 --state=next --note="PE-ops W3 condition 5; gates laundry-sort release · r5 triage"
node tools/triage.mjs set W-1300 --p=3 --state=next --note="lh-engine-locked merged (0ad1525), ready for cm-lifehacks' batch · r5 triage"
node tools/triage.mjs set W-1229 --p=3 --note="paper restatement; rides on next lifehacks builder run · r5 triage"
node tools/triage.mjs set W-1225 --p=3 --note="after History r4 B2 moves the directory; skip line 63 still present · r5 triage"
node tools/triage.mjs set W-1318 --p=2 --state=next --note="Wave J revise; both lessons show Ready to publish with no hold; builder · r5 triage"
node tools/triage.mjs set W-1333 --p=3 --owner=principal-pm-verticals --note="head-on rides W-1318; Selin confirms whether patience/cluster are Wave J, else cm-economics/cm-math · r5 triage"
node tools/triage.mjs set W-1294 --p=2 --state=next --note="First Light merge path (A-1, A-6), readiness due 10-27; after A-13 · r5 triage"
node tools/triage.mjs set W-1220 --p=3 --note="before EDD-009 part 2 code · r5 triage"
node tools/triage.mjs set W-1239 --p=3 --note="trigger is R2 after accounts merges · r5 triage"
node tools/triage.mjs set W-1261 --p=4 --note="events.jsonl 6 MB of 20 · r5 triage"
node tools/triage.mjs set W-1221 --p=2 --state=next --note="First Light row 14, due 10-29; one run with W-1297, W-1291 · r5 triage"
node tools/triage.mjs set W-1297 --p=2 --state=next --note="same EDD-009 run as W-1221 · r5 triage"
node tools/triage.mjs set W-1291 --p=2 --state=next --owner=learner-model-engineer --note="same EDD-009 run as W-1221; F2 revisitDue needs amendment = stop-if · r5 triage"
node tools/triage.mjs set W-1295 --p=2 --note="lane 4 orders it (accounts) · r5 triage"
node tools/triage.mjs set W-1307 --p=2 --note="gates first experiment registration (10-31); lane 4 · r5 triage"
node tools/triage.mjs set W-1305 --p=3 --owner=backend-engineer --note="optional; rides W-1307 if lane 4 wants · r5 triage"
node tools/triage.mjs set W-1296 --p=3 --note="lane 4; before challenges build · r5 triage"
node tools/triage.mjs set W-1283 --p=2 --owner=analytics-steward --note="decide with W-1214 (registration by 10-31) · r5 triage"
node tools/triage.mjs set W-1309 --p=3 --note="at registration, with W-1283 · r5 triage"
node tools/triage.mjs set W-1215 --p=3 --note="lane 10's next First Light privacy run · r5 triage"
node tools/triage.mjs set W-1218 --p=3 --owner=backend-engineer --note="author writes the inventory entry, privacy-reviewer checks; go-live · r5 triage"
node tools/triage.mjs set W-1216 --p=2 --note="ordered by First Light r3 B4 (W-1165) · r5 triage"
node tools/triage.mjs set W-1223 --p=2 --note="ordered by First Light r3 B4 + held beacon-fix run · r5 triage"
node tools/triage.mjs set W-1341 --p=2 --state=next --note="lh-engine-locked condition 5; SO-10-1 after server rebuild · r5 triage"
node tools/triage.mjs set W-1343 --p=3 --note="FC P5 first, per its title · r5 triage"
node tools/triage.mjs set W-1232 --p=3 --note="run with W-1316 · r5 triage"
node tools/triage.mjs set W-1269 --p=4 --owner=evaluation-steward --note="protected tools/company.mjs: amendment route · r5 triage"
node tools/triage.mjs set W-1325 --p=3 --owner=tools-lead --note="batch with W-1274, W-1331 (same file) · r5 triage"
node tools/triage.mjs set W-1331 --p=3 --owner=tools-lead --note="tools/reveal-fit.mjs is lane 9; batch with W-1325 · r5 triage"
node tools/triage.mjs set W-1301 --p=3 --note="after second of tools-ledger/tools-buildslot merges · r5 triage"
node tools/triage.mjs set W-1335 --p=3 --note="rises to P2 if lane 10 says blocked-host holds block a launch · r5 triage"
node tools/triage.mjs set W-1289 --p=3 --owner=platform-engineer --note="lane 7 · r5 triage"
node tools/triage.mjs set W-1236 --p=3 --note="lane 18 · r5 triage"
node tools/triage.mjs set W-1198 --p=3 --note="draft first; founder approves later via Leonie · r5 triage"
node tools/triage.mjs set W-1231 --p=2 --state=next --note="ledger ends 10-14 15:20Z; W-1230 and PR1 kill rules wait · r5 triage"
node tools/triage.mjs set W-1282 --p=2 --state=next --note="per-round ledger import · r5 triage"
node tools/triage.mjs set W-1246 --p=3 --owner=portfolio-manager --note="in lane 17 r5 B1; lane 18 approves · r5 triage"
node tools/triage.mjs set W-1308 --p=3 --note="after a founder-approved deploy containing 7e5207f · r5 triage"
node tools/triage.mjs set W-1292 --p=3 --note="rises to P2 if behavioral claims rest on it; Wen's call · r5 triage"
node tools/triage.mjs set W-1193 --p=3 --note="quotes only; trademark (F-25) first; purchase is a founder ask · r5 triage"
node tools/triage.mjs set W-1194 --p=3 --note="vp-marketing next batch · r5 triage"
```
Independence: none of these items was written by the portfolio-manager, so the approvals to `next` are mine to make. B1's outputs are mine and are approved by lane 18.
