# Founder digest · 2026-10-22

> Held through System 3 Meta (order O-6): code scaffolded this record; its chair fills it, a second attendee confirms it, and code commits it.

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json) · 98 h late: the last record was company/rituals/records/2026-10-18-founder-digest.md (tools/rituals-due.mjs: last 2026-10-18 13:09). Covers 2026-10-18 to 2026-10-22, from the integration branch meta/m7 at 2d7c9b6.

## Done since the last digest
- **Production releases r11 to r19**, each recorded in company/ops/releases.json with your approval, the latest being r19 (commit 08b8b361, company/decisions/2026-10-20-founder-r19-deploy.md: calmer lesson card). Along the way:
  - r11 shows every lesson with a status tag (company/ops/deployments/2026-10-19-show-all-lessons.json);
  - r15 to r17 rewrote predict questions and reveals (company/ops/progress.md, 2026-10-20 entries);
  - r18 put sourced locator maps on all 100 city-history lessons (company/ops/deployments/2026-10-21-r18-production.json).
- **System 3 Meta reached M2 and M3** (company/ops/progress.md, 2026-10-21 entries):
  - Benchmark 4 shipped 10/10 orders hands-free at 45.3k tokens per order;
  - Benchmark 4b (like for like) came in at 80.7k per order;
  - Benchmark 5 shipped three waves, and every hidden test passes.
- **13 lessons were published through Meta's flow**, each with all claims verified and a launch-review record dated 2026-10-22 in company/rituals/records/:
  - 12 math lessons: one-metre-more-rope, four-cards-one-rule, three-sticks-one-triangle, push-the-frame-over, ant-on-a-cube, slice-a-corner-off, friends-of-friends-overlap, new-friend-loosens-the-circle, not-every-circle-is-red, regions-from-circle-points, two-corners-off-the-board and pick-two-or-pick-four;
  - 1 CS lesson: one-link-back-grows-the-core.
  - They are published on the branch only. No deploy after r19 is recorded in company/ops/releases.json, so they are not live.
- **Account preferences merged** into the default branch (PR13, AMD-016, company/ops/delivery/2026-10-20-account-preferences-source.json). They are not rolled out (W-1982).
- **Company today** (`npm run company -- status`):
  - 1,634 lessons: 733 published, 234 in review, 667 draft;
  - 8,068 claims are waiting for the fact-checker;
  - the board has 10 doing, 176 in review, 54 next and 1,019 in backlog.

## Decisions waiting for you
company/ops/founder-inbox.json has 29 items open, 30 decided and 1 waiting on review. Since the last digest you decided F-50 to F-61 (the Meta order budgets). Most important first:
1. **Deploy the 13 Meta-published lessons**, if you want them live. Nothing ships without your approval of that specific deploy.
2. **M1 remote:** create the empty repository `hanialshater/system3-meta-co` and give the Claude app access. Then the exported kernel is pushed (company/ops/progress.md, 2026-10-21 top entry). The integration got a 403 when it tried to create it.
3. **First Light legal and safety, due 10-30:**
   - F-25: a lawyer;
   - F-26: a moderator and a cover, due 2026-10-30;
   - F-45: the fra1 region plus one accounts-off preview;
   - F-23: the domain name.
4. **Production env:** confirm that SHOW_REVIEW, ACCOUNTS_ENABLED, LIKES_SAVES_ENABLED and LIKE_COUNTS_PUBLIC are set as intended. The release manager could not read the dashboard (company/ops/progress.md, 2026-10-18 release-manager entry).
5. **Org and process:**
   - F-41: throughput;
   - F-33: park 23 strand managers;
   - F-34: Project Review 1, three reopened items;
   - F-27 to F-29, F-32.
6. **Budgets and dependencies:**
   - F-22: behavioral slots;
   - F-49: rnd-knots tranche 2, 0.6M;
   - F-35: esbuild 0.27.0.
7. **Long-open items:**
   - F-03 and F-12: ratifications;
   - F-11: EXP-002 learners;
   - F-17 to F-20: ads and hosting;
   - F-04, F-06, F-08, F-09, F-10, F-13, F-14 and F-37.

## Next
- **Rituals before new builds.** tools/rituals-due.mjs lists these as DUE: wbr (112 h, limit 24 h), demo-crit, design-review, ops-review, vertical-review, rnd-review and project-review. Under R1 (tools/dispatch-check.mjs --kind=build), the WBR and the founder digest come before new work.
- **Blocked:**
  - **Gates hold the review queue.** `company status` lists in-review lessons blocked on revise verdicts and unverified claims. Life Hacks and History lessons are held until their Domain Launch Review passes (company/rituals/records/2026-10-15-domain-launch.md; head-of-product r5 A1).
  - **Rollouts wait on you.** Account preferences (W-1982) waits on reviewed migrations 003–004 and a separately approved deploy.
  - **M1's push waits on you** (item 2 above).

## Decision
- This digest is the record for 2026-10-18 to 2026-10-22. Founder-digest cadence stays at 12 h (company/rituals/triggers.json), and from now on code places the digest as a Meta ritual order when it falls due.
- The 13 Meta-published lessons stay off production until you approve a specific deploy. Nothing is requested in this record.

## Objections
- Objection (chief-of-staff): this digest is 98 h late against a 12 h limit. Four days of releases (r11–r19) went out with no digest.
  Answer: from now on the digest is placed by code as a ritual order when tools/rituals-due.mjs reads it DUE (plan §M7). Lateness is visible in the order title and needs no one to remember it.
- Objection (chief-of-staff): every number here is read from files the chief of staff's code writes (founder-inbox.json, releases.json, progress.md). They are testimony, not independent checks. In particular, r19's date in releases.json (2026-10-20) comes before the r18 receipt file's date (2026-10-21).
  Carried: release-manager to reconcile the dates in releases.json against the deployment receipts. It travels with this digest.
- Objection (head-of-product, check): "r11 to r19, each recorded … with your approval" is too broad. The 2026-10-18 release-manager entry in company/ops/progress.md (line 354) says r11 (bcd102d7) and r12 (2902594b) were first recorded as unapproved deploys that the founder accepted after the fact (company/decisions/2026-10-18-founder-accepts-unapproved-deploys.md). The 2026-10-19 PR11 reconciliation entry (line 338) then made those two ids PR-only aliases, and the founder-approved show-all release (2026-10-19) also carries the id r11. The digest also says nothing about r12 to r14. So the founder cannot tell from this digest which releases were approved beforehand and what r12 to r14 shipped.
  Carried: release-manager, together with the releases.json date reconciliation carried above. Map each of r11 to r19 to its commit, its approval record (before or after the fact) and its receipt, and the next founder digest says what r12 to r14 shipped.
