# Correction of Error: 2026-10-14: `[deploy]` commits reached production before CI judged them, and WIP pushes used up the Vercel daily quota

owner: tools-lead (author, W-523; outside release and deploy) · reviewers: evaluation-steward, pattern-librarian
status: final (2026-10-14, tools-lead). Timeline, evidence and impact by principal-engineer-ops (incident commander), unchanged. Five whys, "What allowed it", actions and the answers below are the author's.
incident: ev-b27f3b93ae (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
path: company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md (moved from drafts/ with `git mv`). `tools/dispatch-check.mjs` R2 clears ev-b27f3b93ae only because this file carries that id on its `incident:` line and `status: final` (W-715).

One COE, two failure paths, because both come from Vercel building on git push outside our pipeline (ops review, section 3).

## What happened (facts, timestamps, links)
All times UTC, 2026-10-14. Sources: `git log`, the constitutional review (G1, J3), the retro corrections, the ops review.
- Before 12:58: Vercel's git integration built every pushed commit. WIP snapshot pushes (about 30 today, constitutional review G4) used up Vercel's 100 deployments per day, so production deploys were blocked for the rest of the day.
- 12:58 `f868127`: `vercel.json` `ignoreCommand` added so Vercel builds only commits whose message contains `[deploy]`. Its own message contains the marker (it describes the filter), so it also triggers a build.
- 13:01 `6b45ea0` `[deploy]`: Life Hacks, 200 lessons on the feed tagged "In review".
- 13:51 `91274b8` `[deploy]`: Life Hacks (200) and NCM (49) on the live feed.
- 14:27 `f4537d7` `[deploy]`: 54 new and revised lessons.
- 14:43 `5e8608d` `[deploy]`: edits the filter itself (reads `VERCEL_GIT_COMMIT_MESSAGE`) and redeploys. A `[deploy]` commit changed the control that decides what deploys (constitutional review J3).
- Five commits carry the marker (retro corrections; checked in git for this draft). The founder asked for these deploys; the rule that each deploy needs the founder's approval came after them (`company/decisions/2026-10-14-deploy-needs-founder-approval.md`).
- At every one of these deploys, every `ci` run since at least `f868127` was still `queued` (constitutional review G1). Vercel's git builds do not wait for `ci`, so `constitution` and `verify` were advisory for everything shipped.
- 15:27: SEV2 declared (ev-b27f3b93ae).

## Impact (learners affected, lessons, claims)
- Production received four content releases with no CI result (the 200 Life Hacks, 49 NCM and 54 new or revised lessons, shown tagged "In review").
- No unratified protected-path change is known to have shipped (constitutional review, audit 0), but nothing would have stopped one.
- Quota: production deploys were blocked for part of the day.
- Claims: 238+ unverified claims are visible behind the "In review" tag (G2). That exposure is a founder choice on watch, not part of this SEV2 (ops review section 1, W-479 item 4).

## Five whys (stop when the answers stop being about people)
Author's check of the facts: `git log` shows the five marker commits listed above (f868127 carries `[deploy]` in its description of the filter; the other four are releases). `e2b944f` (2026-10-13) added `deploy.yml` as the designed path; `company/ops/runbook-deploy.md` says only "If Vercel's Git integration is also enabled ... choose which system owns releases". No record shows that choice being made.

**Path A: the bypass.**
1. Why did `[deploy]` commits reach production before CI judged them? Vercel's Git integration built them on push, and those builds do not wait for `ci` (constitutional review G1).
2. Why was the Git integration a production path at all? It was left on when the project was linked on 2026-10-13. `deploy.yml` was added as the sanctioned path beside it, and the runbook made switching the Git path off a conditional ("if ... also enabled"), not a step. The working branch is also the default branch, so the Git integration treats every push as a production candidate.
3. Why did nobody notice that two paths shipped? Nothing in the repository can see which path ships. The Git trigger is a setting in the Vercel dashboard. `check`, `ci` and `company status` read only the repository, so a second entry point to production does not appear in any company tool.
4. Why did the 12:58 quota fix make the bypass the normal path instead of exposing it? `f868127` was framed as a cost change. `vercel.json` is ordinary surface, so it needed only a passing `check`, and the runbook section added with it ("one `[deploy]` commit per publish wave") wrote the Git path down as the release procedure. No rule says a change to *what triggers a deploy* is a release-control change that needs review against the gates. So `5e8608d`, a `[deploy]` commit, could edit the filter that decides what deploys (J3).
5. Why is the founder-approval rule not the missing gate? It is a sentence in CLAUDE.md and a decision record. Nothing enforces it: any agent can type `[deploy]`, and Vercel builds it. It controls cost through good behaviour. It cannot stop an unjudged tree, and it was written after the five deploys.

**Path B: the quota.**
1. Why were the 100 daily deployments used up? About 30 WIP snapshot pushes each triggered a Vercel build (G4).
2. Why did WIP pushes trigger builds? `tools/snapshot.sh` pushes `origin HEAD`, and agents work on the default branch, which Vercel's Git integration builds on every push.
3. Why do durability pushes and release pushes share a branch and a trigger? The company has one working branch, and the deploy trigger is "a push happened", not "a release was decided".
4. Why did nobody see the quota running out? The quota is a shared resource with no allocator and no counter in any company tool. The first signal was Vercel refusing production deploys.
5. This ends at the same place as path A: a trigger outside the pipeline acts on every push, and the pipeline can neither gate it nor meter it.

**Root cause.** Production had two entry points. Only one of them (`deploy.yml`, after green `ci`) sits behind the gates. The other (Vercel's Git integration) is configured outside the repository, where no company tool looks. Every push reached it, so it bypassed CI (path A) and spent the shared quota (path B). The `[deploy]` filter and the approval rule narrowed that second entry point. They did not close it.

## What allowed it
- A runbook that described a conditional ("if Git integration is also enabled, choose") instead of a check that fails when two release paths exist.
- Release controls in an unprotected file (`vercel.json`) that the controlled action (a `[deploy]` commit) can change. The constitutional review is right not to protect it for quota reasons (J3): the fix is to stop it being a release control at all.
- CI that was queued all day (the CI-queue COE, ev-c33bee719d). Even a gated path would have had nothing to wait on. Here that queue made the bypass the only path that worked, which made using it feel normal.
- A cost decision that became the only release control without anyone re-classifying it (J3).
- No meter on a shared, rate-limited resource.

## Actions (each changes a mechanism; tracked on the board until done)
The ops review's objection is answered here and not set aside: the filter and the approval rule are containment for cost and do not close the bypass. The fix is W-480. Every other row either stays as containment until W-480 lands or protects the first deploy through the gated path.

| Action | Mechanism changed | Owner | Board id | Kind |
|---|---|---|---|---|
| Close the second entry point: production deploys only via `deploy.yml` after green `ci`. Turn off Git-triggered production builds in the repository, not only in the dashboard (`vercel.json` `git.deploymentEnabled: false` or the equivalent, so the setting is visible to `check`), or add a Vercel Deployment Check on `ci`. Make drafts unreachable in production. Decision record with the founder. This also ends path B, because WIP pushes then cost no deployments. | Vercel project config, `vercel.json`, `deploy.yml`; decision record | platform-engineer + founder | W-480 | **root-cause fix** |
| Keep the `[deploy]` filter until W-480 lands, then remove it or reduce it to a quota guard that release does not depend on. Any change to it in the meantime goes through the release manager, not a `[deploy]` commit. | `vercel.json` `ignoreCommand` (`f868127`, `5e8608d`) | release-manager | W-480 | containment (quota) |
| Keep the founder-approval rule as cost control and stop treating it as the release gate: it limits *how often*, and W-480 decides *what may ship*. | CLAUDE.md rule + `company/decisions/2026-10-14-deploy-needs-founder-approval.md` | founder; release-manager checks each deploy against it | W-480 | containment (who may ship) |
| Snapshots refuse to stage protected paths and record `check` pass or fail in the commit message. A `[deploy]` commit needs `check` green on that exact tree. | `tools/snapshot.sh`, release-manager checklist | tools-lead (snapshot.sh is in tools-lead scope); release-manager (checklist line) | W-482 | mechanism |
| Hold app deploys while the S1 `/spike` route is open, and run the post-deploy smoke on the first founder-approved deploy, which should be the first one through the W-480 path. | release checklist; post-deploy smoke | release-manager | W-534, W-609 | mechanism |
| R2 matches a COE to its incident id and needs `status: final`, so one stub file cannot clear a day of incidents. | `tools/dispatch-check.mjs` R2 + tests | tools-lead | W-715 | mechanism (COE process) |

## Claims and decisions to send back to review
- The "In review" display decision (G2) rested on CI and fact-check being the gate before learners. With CI advisory, that decision goes back to the founder (W-479 item 4). Unchanged from the draft.
- `company/decisions/2026-10-14-deploy-needs-founder-approval.md`: **yes, it needs an amendment note**. It should say that it is a cost rule, that it is not a release gate, and that W-480 is the gate. Otherwise the next reader will take it for the control the constitutional review showed it is not. The record's owner, chief-of-staff, writes the note with the founder. Proposed board item, listed in the author's report for the chief of staff to add: "Amendment note on 2026-10-14-deploy-needs-founder-approval.md: cost rule, not a release gate; points to W-480 (this COE)", owner chief-of-staff.

## Pattern update
Pattern librarian owns this section. The author's test of the two candidates:
- "A control that sits outside the pipeline is advisory": **supported**. Both failure paths come from one trigger outside the pipeline, and every control added today (filter, approval rule) also sat outside it. One instance does not make a pattern; the CI-queue COE (deploy.yml skipped while `ci` was queued) is the place to look for a second.
- "Every shared resource needs an allocator before it needs a cleanup": **supported for path B** (the quota had no meter and no allocation). It does not explain path A.

## Review (pattern-librarian, 2026-10-14)
Read after the author's record, against the patterns in company/knowledge/patterns/.
- **Recurs across the three COEs.** Path B is the same failure as the CI and host COEs: a shared, rate-limited resource (100 deploys a day) with no meter and no allocator. Path A is not: it is a missing single path to production. I agree with the author that one allocator pattern does not explain both.
- **Contradicted and corrected.** [gate-expensive-actions](../../knowledge/patterns/gate-expensive-actions.md): its filter and approval rule sat outside the pipeline and a [deploy] commit edited the filter (5e8608d). Its "cost control only" line held; I added the case and marked the filter as containment until W-480. The pattern keeps its low confidence.
- **Confirmed.** [shared-resource-needs-owner-and-allocator](../../knowledge/patterns/shared-resource-needs-owner-and-allocator.md): path B, second case.
- **New.** [a-control-outside-the-pipeline-is-advisory](../../knowledge/patterns/a-control-outside-the-pipeline-is-advisory.md): one situation seen in two COEs, so the author is right that it is not yet a pattern; filed unstarred and labelled as such. [a-rule-without-a-mechanism-is-a-wish](../../knowledge/patterns/a-rule-without-a-mechanism-is-a-wish.md): the founder-approval rule and the runbook conditional are cases 2 and 3.
- **Objection to the record.** The "Pattern update" text calls the control-outside-the-pipeline candidate "supported" on one instance. I read it as "one case, not tested": the CI COE supplies the same incident from the other side (deploy.yml waiting for a dead judge), not an independent case.
- **Refutation.** If W-480 lands and a later release still ships by a path no company tool shows, the control-outside-the-pipeline pattern is incomplete. If an approval rule alone, with no mechanism, holds for several release days, the wish pattern is wrong.

## Review (evaluation-steward, 2026-10-14)
verdict: revise (one action row added, one claim to send back; the five whys and the root cause stand)
reviewed against: the record, `git log --all` for protected paths since 10-14 00:00, `adb41b8`, `tools/dispatch-check.mjs` + `tools/lib/coe-coverage.mjs`, the host-exhaustion COE. Builder notes not read.

1. **Five whys and actions.** Both paths end at a mechanism: there is a second entry point to production that no company tool can see. The record answers the ops-review objection instead of setting it aside. Every row has an owner and a board id. W-773 (the founder-approval note) now exists, so the "proposed board item" sentence can cite it.
2. **Gates and protected paths.**
   - **What failed open:** CI was advisory for every release today. W-480 is the right fix, and no protected path needs to change for it.
   - **What W-480 leaves open (add a row):** once W-480 lands, `vercel.json` (`git.deploymentEnabled: false`) and `.github/workflows/deploy.yml` *become* the release gate. Both are unprotected, and J3 showed that a `[deploy]` commit can rewrite the control that decides what deploys. Flipping one line reopens the bypass. Proposed row: "Release controls are judged by the protected surface: AMD-003 adds `vercel.json` and `.github/workflows/deploy.yml` to `protected-paths.txt`, or adds a `ci.yml` `constitution` step that fails when Git-triggered production builds are enabled", owner evaluation-steward (drafts AMD-003 once W-479 commissions it, W-484), founder ratifies. The review is right not to protect `vercel.json` *for quota reasons*. This is a different reason: after W-480 it is the gate.
   - **R2 row (W-715): independence.** `adb41b8` finalised this COE and changed the R2 matcher that clears it, in one commit, by the same role (tools-lead, which also owns the W-715 review). Nothing in the change is wrong (tests pass, and it is stricter than the date match it replaced). But the author wrote both the gate and the mark that clears it, and R2 cleared ev-b27f3b93ae without a reviewer. The fix is the reviewed-mark rule proposed in the ci-queue COE's review. The W-715 review of R2 should be done by someone other than tools-lead, or at least should not be closed by tools-lead alone.
   - Protected-path audit: today's only protected-path commit on any branch is `a674a7a` (AMD-002 trailer), so "nothing unratified shipped" holds. Nothing would have stopped one.
3. **Claims and decisions to send back (add one).** The four releases (`6b45ea0` 13:01, `91274b8` 13:51, `f4537d7` 14:27, `5e8608d` 14:43) shipped during the host overload. The host-exhaustion COE says official QA could not run until about 18:00, so these lessons reached learners with **neither a CI verdict nor an official QA verdict**. That host COE's line "nothing deployed from the overloaded period depended on it" contradicts this record's timeline. Send back: every lesson changed in those four commits needs a QA verdict from the committed harness on a built server (after 18:00, or a rerun). Until it has one, it stays tagged "In review" (qa-tester, as part of W-771). The "In review" decision itself goes to the founder (W-479 item 4), as written.
