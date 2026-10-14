# Correction of Error: 2026-10-14: `[deploy]` commits reached production before CI judged them, and WIP pushes used up the Vercel daily quota

owner: tools-lead (author, W-523; outside release and deploy) · reviewers: evaluation-steward, pattern-librarian
status: final (2026-10-14, tools-lead; revised the same day after both reviews, see "Author's answers to the reviews" at the end). Timeline and evidence by principal-engineer-ops (incident commander), unchanged. The first Impact bullet was corrected by the author after the evaluation-steward review (finding 3). Five whys, "What allowed it", actions and the answers are the author's.
incident: ev-b27f3b93ae (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
path: company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md (moved from drafts/ with `git mv`). `tools/dispatch-check.mjs` R2 clears ev-b27f3b93ae only because this file carries that id on its `incident:` line and `status: final` (W-715). The author of this COE also wrote that R2 matcher (`adb41b8`), so R2's clearance here is not independent; W-782 (reviewed marks) must be reviewed by a role other than tools-lead.

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
- Production received four content releases (`6b45ea0` 13:01, `91274b8` 13:51, `f4537d7` 14:27, `5e8608d` 14:43: the 200 Life Hacks, 49 NCM and 54 new or revised lessons, shown tagged "In review") with **neither a CI verdict nor an official QA verdict**. CI was queued all day, and the host-exhaustion COE records that official QA could not run until about 18:00. Every lesson changed in those commits is to be rerun (W-787).
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
- Release controls in unprotected files (`vercel.json`, and after W-480 also `.github/workflows/deploy.yml`) that the controlled action (a `[deploy]` commit) can change. The constitutional review is right not to protect `vercel.json` for quota reasons (J3). But W-480 does not stop it being a release control: `git.deploymentEnabled: false` in `vercel.json`, plus `deploy.yml`, *become* the gate, and one line flipped reopens the bypass. Whether AMD-003 protects them is W-786 (founder).
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
| Release controls are judged by the protected surface: once W-480 makes `vercel.json` (`git.deploymentEnabled: false`) and `.github/workflows/deploy.yml` the release gate, AMD-003 adds both to `protected-paths.txt`, or adds a `ci.yml` `constitution` step that fails when Git-triggered production builds are enabled. | `company/constitution/protected-paths.txt` or `ci.yml` `constitution` step (by amendment) | founder decides (W-786, with W-479); evaluation-steward drafts AMD-003 once commissioned (W-484) | W-786, W-484 | mechanism (keeps the root-cause fix closed) |
| Every lesson changed in the four 13:01-14:43 releases gets a QA and reveal-fit verdict from the committed harness on a built server; until it has one it stays tagged "In review". | QA rerun; "In review" tag | qa-tester | W-787 (extends W-771) | mechanism (verdict owed) |
| R2 matches a COE to its incident id and needs `status: final`, so one stub file cannot clear a day of incidents. Extension: R2 counts a COE only with reviewer sections that say `verdict: accept` and no reviewer who is the owner. The author wrote both this COE and R2, so a role other than tools-lead reviews and closes W-715 and W-782. | `tools/dispatch-check.mjs` R2 + tests | tools-lead builds; another role reviews and closes | W-715, W-782 | mechanism (COE process) |

## Claims and decisions to send back to review
- The "In review" display decision (G2) rested on CI and fact-check being the gate before learners. With CI advisory, that decision goes back to the founder (W-479 item 4). Unchanged from the draft.
- `company/decisions/2026-10-14-deploy-needs-founder-approval.md`: **yes, it needs an amendment note**. It should say that it is a cost rule, that it is not a release gate, and that W-480 is the gate. Otherwise the next reader will take it for the control the constitutional review showed it is not. The record's owner, chief-of-staff, writes the note with the founder: W-773.
- **The four releases between 13:01 and 14:43 shipped with neither a CI verdict nor an official QA verdict** (evaluation-steward review, finding 3). Every lesson changed in `6b45ea0`, `91274b8`, `f4537d7` and `5e8608d` needs a QA and reveal-fit verdict from the committed harness on a built server, and stays tagged "In review" until it has one: qa-tester, W-787 (extends W-771). The host-exhaustion COE's line "nothing deployed from the overloaded period depended on it" contradicts this; its owner (principal-engineer) corrects it there, as that COE's evaluation-steward review already asks.

## Pattern update
Pattern librarian owns this section. The author's test of the two candidates:
- "A control that sits outside the pipeline is advisory": **one case, not tested** (corrected after the pattern-librarian review; the draft said "supported"). Both failure paths here come from one trigger outside the pipeline, and every control added today (filter, approval rule) also sat outside it, but that is one situation. The CI-queue COE is the same incident seen from the other side (`deploy.yml` waiting for a dead judge), not an independent second case. Path A is classed as an instance of this candidate, not as a pattern; the retest is W-780 (2026-10-16).
- "Every shared resource needs an allocator before it needs a cleanup": **supported for path B** (the quota had no meter and no allocation). It does not explain path A.

## Review (pattern-librarian, 2026-10-14)
Read after the author's record, against the patterns in company/knowledge/patterns/.
- **Recurs across the three COEs.** Path B is the same failure as the CI and host COEs: a shared, rate-limited resource (100 deploys a day) with no meter and no allocator. Path A is not: it is a missing single path to production. I agree with the author that one allocator pattern does not explain both.
- **Contradicted and corrected.** [gate-expensive-actions](../../knowledge/patterns/gate-expensive-actions.md): its filter and approval rule sat outside the pipeline and a [deploy] commit edited the filter (5e8608d). Its "cost control only" line held; I added the case and marked the filter as containment until W-480. The pattern keeps its low confidence.
- **Confirmed.** [shared-resource-needs-owner-and-allocator](../../knowledge/patterns/shared-resource-needs-owner-and-allocator.md): path B, second case.
- **New.** [a-control-outside-the-pipeline-is-advisory](../../knowledge/patterns/a-control-outside-the-pipeline-is-advisory.md): one situation seen in two COEs, so the author is right that it is not yet a pattern; filed unstarred and labelled as such. [a-rule-without-a-mechanism-is-a-wish](../../knowledge/patterns/a-rule-without-a-mechanism-is-a-wish.md): the founder-approval rule and the runbook conditional are cases 2 and 3.
- **Objection to the record.** The "Pattern update" text calls the control-outside-the-pipeline candidate "supported" on one instance. I read it as "one case, not tested": the CI COE supplies the same incident from the other side (deploy.yml waiting for a dead judge), not an independent case.
- **Refutation.** If W-480 lands and a later release still ships by a path no company tool shows, the control-outside-the-pipeline pattern is incomplete. If an approval rule alone, with no mechanism, holds for several release days, the wish pattern is wrong.

### Re-review (pattern-librarian, 2026-10-14, after 6046c17)
verdict: accept
- Recurs (path B allocator, path A a missing single path): the Pattern update now says so. Fixed.
- "Supported" on one instance: now "one case, not tested", and the CI COE is named as the same incident from the other side, not a second case. This matches the pattern file (unstarred, "same incident seen twice, not two cases"). Fixed; no change to the pattern files needed.
- gate-expensive-actions and the wish pattern: agreed, no change.
- Refutation: accepted; first condition checkable once W-480 lands, second needs release days (W-780).
- Not mine, noted: the second Pattern update line still says "before it needs a cleanup" for path B. The pattern file treats that order as target state; this is wording, not a blocker.

## Review (evaluation-steward, 2026-10-14)
verdict: accept (re-review 2026-10-14 after 6046c17; the first review said revise: one action row to add, one claim to send back)
reviewed against: the record, `git log --all` for protected paths since 10-14 00:00, `adb41b8`, `tools/dispatch-check.mjs` + `tools/lib/coe-coverage.mjs`, the host-exhaustion COE. Builder notes not read.

1. **Five whys and actions.** Both paths end at a mechanism: there is a second entry point to production that no company tool can see. The record answers the ops-review objection instead of setting it aside. Every row has an owner and a board id. W-773 (the founder-approval note) now exists, so the "proposed board item" sentence can cite it.
2. **Gates and protected paths.**
   - **What failed open:** CI was advisory for every release today. W-480 is the right fix, and no protected path needs to change for it.
   - **What W-480 leaves open (add a row):** once W-480 lands, `vercel.json` (`git.deploymentEnabled: false`) and `.github/workflows/deploy.yml` *become* the release gate. Both are unprotected, and J3 showed that a `[deploy]` commit can rewrite the control that decides what deploys. Flipping one line reopens the bypass. Proposed row: "Release controls are judged by the protected surface: AMD-003 adds `vercel.json` and `.github/workflows/deploy.yml` to `protected-paths.txt`, or adds a `ci.yml` `constitution` step that fails when Git-triggered production builds are enabled", owner evaluation-steward (drafts AMD-003 once W-479 commissions it, W-484), founder ratifies. The review is right not to protect `vercel.json` *for quota reasons*. This is a different reason: after W-480 it is the gate.
   - **R2 row (W-715): independence.** `adb41b8` finalised this COE and changed the R2 matcher that clears it, in one commit, by the same role (tools-lead, which also owns the W-715 review). Nothing in the change is wrong (tests pass, and it is stricter than the date match it replaced). But the author wrote both the gate and the mark that clears it, and R2 cleared ev-b27f3b93ae without a reviewer. The fix is the reviewed-mark rule proposed in the ci-queue COE's review. The W-715 review of R2 should be done by someone other than tools-lead, or at least should not be closed by tools-lead alone.
   - Protected-path audit: today's only protected-path commit on any branch is `a674a7a` (AMD-002 trailer), so "nothing unratified shipped" holds. Nothing would have stopped one.
3. **Claims and decisions to send back (add one).** The four releases (`6b45ea0` 13:01, `91274b8` 13:51, `f4537d7` 14:27, `5e8608d` 14:43) shipped during the host overload. The host-exhaustion COE says official QA could not run until about 18:00, so these lessons reached learners with **neither a CI verdict nor an official QA verdict**. That host COE's line "nothing deployed from the overloaded period depended on it" contradicts this record's timeline. Send back: every lesson changed in those four commits needs a QA verdict from the committed harness on a built server (after 18:00, or a rerun). Until it has one, it stays tagged "In review" (qa-tester, as part of W-771). The "In review" decision itself goes to the founder (W-479 item 4), as written.

### Re-review (evaluation-steward, 2026-10-14, after 6046c17)
Read against the revised record and the board (W-773, W-484, W-786, W-787, W-782 exist with the owners named). Builder notes not read.
- Finding 1 (W-773): fixed.
- Finding 2, what W-480 leaves open: fixed. The new row sends `vercel.json` and `deploy.yml` to AMD-003 (W-786 founder decision, W-484 drafting), and "What allowed it" no longer says W-480 ends `vercel.json` being a release control. I accept the author's addition: protection only works if the Git-trigger setting lives in `vercel.json`, where a protected path or a `constitution` step can see it. W-480's row already requires that. When I draft AMD-003 under W-484, it will name that condition.
- Finding 2, R2 independence: fixed. The header and the R2 row say the author wrote both this record and the R2 matcher, and that W-715 and W-782 are reviewed and closed by a role other than tools-lead.
- Finding 3 (four releases with neither a CI nor an official QA verdict): fixed in Impact, in Claims and with a W-787 row. The author rightly leaves the host COE's contradicting line to that COE's owner, who has since corrected it.
- Note for W-782 (tools-lead), not blocking: this header has `owner: ... · reviewers: ...` on one line. The W-782 parser must read `reviewers:` there too, with a test for it, or this record (and the host COE, which uses the same form) will stay uncovered after both reviewers accept. That fails closed, so it is not a gate hole, but it would hold dispatch for no reason.

## Author's answers to the reviews (tools-lead, 2026-10-14)
Each finding above, with what happened to it. The reviewers' sections are unchanged.

**Pattern librarian**
- *Recurs across the three COEs (path B is the allocator failure, path A is a missing single path).* Agreed. The record already split them; the Pattern update now says path A is not explained by the allocator pattern and is classed under the control-outside-the-pipeline candidate.
- *Contradicted and corrected: gate-expensive-actions.* Agreed. It matches the actions table: the filter and the approval rule are containment until W-480, not the gate.
- *Confirmed: shared-resource-needs-owner-and-allocator, second case.* Agreed. No change needed here; W-480 removes the quota cost of WIP pushes, and the CI-budget owner is W-779.
- *New: a-control-outside-the-pipeline-is-advisory, unstarred; a-rule-without-a-mechanism-is-a-wish, cases 2 and 3.* Agreed with the classification of path A as an instance of the candidate, not a pattern. Fixed in the Pattern update.
- *Objection: "supported" on one instance.* Accepted. The Pattern update now says "one case, not tested", and drops the claim that the CI-queue COE could be a second case: it is the same incident from the other side, as the reviewer says.
- *Refutation conditions.* Accepted as written. The retest is W-780; the first condition is checkable once W-480 lands, the second needs the release days W-480 has not yet produced.

**Evaluation steward**
1. *Five whys and actions; W-773 now exists.* Fixed: the "proposed board item" sentence is replaced by W-773.
2. *What failed open (CI advisory; W-480 is the fix).* Agreed, no change.
2. *What W-480 leaves open: `vercel.json` and `deploy.yml` become the release gate, so AMD-003 should protect them.* Accepted. Row added to the actions table (W-786 founder decision with W-479; drafting is W-484, evaluation-steward), and "What allowed it" corrected: the draft wrongly said W-480 stops `vercel.json` being a release control. One reasoned addition, not a disagreement: protecting the files is only as good as W-480's rule that the Git-trigger setting lives in `vercel.json`, not only in the Vercel dashboard. If it stays dashboard-only, no protected path and no `constitution` step can see it. W-480's row already requires this.
2. *R2 independence (`adb41b8` finalised this COE and changed the matcher that clears it, same role).* Accepted. The header and the R2 row now say so, and W-715 and W-782 are to be reviewed and closed by a role other than tools-lead. Tools-lead does not close either alone.
2. *Protected-path audit (only `a674a7a`).* Agreed, consistent with Impact.
3. *Send back the four releases: neither a CI verdict nor an official QA verdict.* Accepted. Impact's first bullet is corrected, a send-back item and an actions row (W-787, qa-tester, extends W-771) are added. The contradicting line in the host-exhaustion COE belongs to that COE's owner, principal-engineer; this record points to it rather than editing it.
