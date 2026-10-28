# Founder inbox triage, 2026-10-28

owner: chief-of-staff · date: 2026-10-28 · class: ops · asked by: the founder ("triage Lessons inbox")
file: company/ops/founder-inbox.json (default branch `ccr-4c6c7654-ew9ko1`)

I triaged 31 items: the 30 marked `open` (F-03 to F-52) and F-05, which was marked `waiting on review`. The org cut
happened on main after most of them were written: F-50 took the company from 109 roles to 39, F-51 ratified AMD-017,
and main's F-52 to F-54 followed. Those decisions are on main (452 commits ahead, W-2121), so I cite their commits there.

**Results: 18 closed, 5 merged, 8 kept.** Closing an item only means it no longer needs the founder. None of these
verdicts decides anything that is the founder's. Each closed item has `closedAt`, `closedBy`, `closedReason` and a
`triage` block that keeps its old status. Where the founder already answered, the item also has `founderWords` with
the founder's own words. A kept item's old title, options and recommendation are kept under `previous`. Nothing was
deleted.

## Verdicts

| Id | Verdict | Reason |
|---|---|---|
| F-03 | close (stale) | Part (d) was withdrawn as covered by AMD-013 (ratified 10-17, a6333dd0). Parts (a), (b) and (c1) never got the steward's review, and their diffs predate AMD-013 and AMD-017. Back to evaluation-steward to redraft or withdraw. |
| F-04 | close (done) | Deployed since r1 (10-14). The founder approved the catalog deploy in F-47: "Publish now". r1 to r24 are in releases.json. |
| F-05 | **keep** | The engineering review closed on 10-14, so this is ready for the founder. F-34 (item 3) and F-35 are merged into it. |
| F-06 | close (superseded) | F-50's lane M (multi-card sequences) and AMD-017's first-3-lessons design records replace it. |
| F-08 | close (done) | The brief was given and answered (0a9f33358). The founder's decisions of 10-17 and 10-20 followed. |
| F-09 | close (superseded) | F-50 parked localization ("no locale chosen"). The question returns if localization is un-parked. |
| F-10 | close (done) | The fact-checker verified both c1 claims on 10-14 without the human check. W-048 and W-049 can close. |
| F-11 | **keep** | No real learner has been measured. EXP-002 is "designed, not run". |
| F-12 | close (stale) | The OP draft's 500-lesson cycle has been passed. F-50's lane budgets go to the next op-planning. AMD-000 re-ratification goes on the next constitutional review's agenda (W-011). |
| F-13 | close (superseded) | F-50 rests on P1 to P9 and applies them (050845585 on main). P2 is F-14 and P5 is AMD-013. |
| F-14 | close (superseded) | No unpublish is pending. The founder approved the catalog deploy after the fixes (F-47). K2 to K4 stay on W-148. |
| F-17 | **keep** | Whether to pursue ads. F-18, F-19 and F-20 are merged into it. |
| F-18 | merge → F-17 | Hosting for commercial use only matters if ads go ahead. |
| F-19 | merge → F-17 | The Surface Value amendment depends on F-17 (a). |
| F-20 | merge → F-17 | Accounts and contracts come after F-17. The recommendation was to approve none now. |
| F-22 | close (superseded) | The founder ordered 500 behavioral demos on 10-24, so the 2,000-slot budget is moot. behavioral-econ stays at STOP (F-43). |
| F-23 | **keep** | First Light's name and domain. Sign-in's email sender also waits on a domain. |
| F-25 | **keep** | A lawyer for First Light's policy and terms, due 10-30. |
| F-26 | **keep** | A moderator and a cover for social, due 10-30. |
| F-27 | close (superseded) | F-52 (main's numbering, G2, c0967b47f) moved growth-designer under head-of-product. head-of-strategic-initiatives parks on 11-23. |
| F-28 | close (done) | Adopted in F-50. route-reviewer reports to evaluation-steward, and checkers are dispatched only from the quality lane. |
| F-29 | close (done) | dispatch-check takes `batch=` and fails one whose file is missing (c73ddb90e, d11cfca7c). |
| F-32 | close (superseded) | The CLAUDE.md handoff rule and F-39's per-run offboarding entries cover it. Any remaining change is an org-data change. |
| F-33 | close (done) | F-50 parked all 36 strand managers. |
| F-34 | merge → F-05 | Items 1 and 2 are stale: the 10-23 checkpoint has passed and F-46 closed out Life Hacks. Item 3, scale-stage-1, is F-05's question. |
| F-35 | merge → F-05 | esbuild is only needed for the scale-stage-1 bundler. |
| F-37 | close (stale) | It was optional and blocks nothing. The founder can add the PDFs at any time. |
| F-41 | close (superseded) | Replaced by F-50 (lanes, standing orders, one revision round, cost targets) and F-51 (AMD-017). The org-health objection stays open on AMD-017. |
| F-45 | close (done) | vercel.json has had fra1 since the founder's own commit 8bfca75c7 (10-19). |
| F-49 | **keep** | Tranche 2 budget. Its option B condition has now been met. |
| F-52 | **keep** | The r24 regression. r25 is deploying, and the coordinator closes this item. |

## The kept questions, in priority order

1. **F-52.** Should r24's regression be fixed by r25? This is in hand: r25 is deploying now, and the coordinator closes F-52 once it is live.
2. **F-25.** Will you engage a lawyer by 10-30 for First Light's privacy policy and terms? **Recommended: yes, by 10-30**, because the privacy gate needs a lawyer-reviewed policy by RC1 (11-13). Options: by 10-30 / after the re-plan / ship release 1 without accounts or social.
3. **F-26.** Who are the human moderator and the cover who can act on reports within 24 hours, or does release 1 ship share-a-lesson only? **Recommended: you plus one cover**, if you still want the social features you asked for on 10-15. Choose share-a-lesson only if no one can promise the 24 hours. Options: you plus a cover / two people you name / share-a-lesson only. Due 10-30.
4. **F-23.** What is First Light's public name and domain? **Recommended: vp-marketing brings 3 to 5 names with prices this week, and you pick.** Sign-in's email sender also needs a domain you control. Options: a shortlist / you name it / stay on vercel.app.
5. **F-49.** Do you release rnd-knots tranche 2 (0.6M tokens, the kit's exported extraCrossings for knot briefs 5, 7 and 8)? **Recommended: release now.** Knot briefs 1 to 4 are published, which meets portfolio-manager's condition. vp-rnd's objection travels with the decision. Options: release / decline (rnd-lead then parks).
6. **F-17** (absorbs F-18, F-19 and F-20). Do you want ads at all? On the staged plan, release 1 carries house cards only, the Surface Value amendment is ratified alongside, the host is decided before any commercial use, and no accounts are approved yet. **Recommended: yes, staged.** House cards earn $0, so this sets the rules, not revenue. vp-marketing parks on 11-23. Options: staged ads / donations and licences only / no monetization yet.
7. **F-05** (absorbs F-34 item 3 and F-35). Do you approve the EDD-003 stage 1 pilot (50 runtime-bundled lessons, esbuild 0.27.0 pinned exactly, 1.2M of a 1.89M ceiling), or park scale-stage-1? **Recommended: approve only if principal-engineer re-measures today's 3,895-lesson build and finds a trigger crossed; otherwise park it.** Options: approve now / approve on a crossed trigger / park.
8. **F-11.** Will you recruit 5 real learners for EXP-002? **Recommended: yes, now.** AMD-017 samples agent learner walks 1 in 5, and no real learner has been measured. Options: now / at First Light / drop it.

## Things the founder should know

- **First Light has not moved since 10-19.** status.json still shows go/no-go 11-23 and launch 11-30, and they have
  not been re-planned (W-1122 is owed by head-of-strategic-initiatives). If you no longer intend a release on 11-30,
  F-17, F-23, F-25 and F-26 change, and so does their urgency. That proposal is head-of-strategic-initiatives' to
  bring, so I have not added it to the inbox.
- **Two items share the number F-52.** On main, `company/decisions/2026-10-25-founder-f52.md` (the principles G1 to
  G3) uses F-52. Main's inbox file stops at F-51. This branch's F-52 is the r24 regression. The reconciliation
  (W-2121) has to renumber one of them. I left both alone.
- **HQ will still list the closed items.** `src/lib/hq.ts` `founderQueue` hides only `status: "decided"`, and
  `tools/hq/hq-dashboard.mjs` (on main) hides `decided`, `superseded`, `done` and `withdrawn`. Neither hides `closed`.
  `tools/lib/ledger.mjs` does treat `closed` as closed. This is a one-line filter for hq-engineer and tools-lead
  (board), not something the chief of staff changes.

## Follow-ups for the board (owner role)

- evaluation-steward: redraft or withdraw AMD-001 (a), (b) and (c1) against AMD-013 and AMD-017 (from F-03).
- fact-checker or chief-of-staff: close W-048 and W-049, since both claims are verified (from F-10).
- hq-engineer and tools-lead: hide `status: "closed"` in founderQueue and hq-dashboard.
- principal-engineer: measure the EDD-003 triggers on the 3,895-lesson build, for F-05.
- head-of-strategic-initiatives: re-plan First Light's dates (W-1122).

## Objections

- **chief-of-staff (to itself):** closing an item the founder never answered can look like deciding it for them.
  **Answer:** each closure names the commit, file or org change that made the question moot. None closes a choice
  that is still open; where a part is still live (F-03, F-34), it is routed to an owner or carried into a kept item.
  The founder can reopen any item by setting `status` back to `open`. Every field it had is still there.
