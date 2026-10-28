# All-lessons world: inspection-slice architecture and integration

owner: principal-engineer
date: 2026-10-27
tier: 2
status: narrow implementation architecture approved; final artifact review pending
source: founder's current chat instruction; EDD-018 §5–6

The founder now asks to build the world for every actual lesson, including lessons in open PRs, then merge lesson PRs and deploy for inspection while unchecked lessons remain visible. This supersedes EDD-018's prior whole-company-green-before-build sequence for this inspection slice. It does not verify content, promote publication, amend protected paths, or claim clean aggregate checks. Preserve the independent findings already collected. Head-of-product remains the approval owner; VP Personalization stays parked.

## Approved implementation boundary

Platform-engineer may implement the server-side inventory/projection, SVG component library and composed continuous world, Map/List, mobile sheet, navigation restoration and a separate world-context player route reusing the existing DemoCard. This is the bounded presentation/navigation part of EDD-018, approved before the new implementation. Existing Feed, home ranking, auth, account ownership, progress storage, event API, metadata schema, dependencies, lesson kit and gates are outside this slice. Any need to alter them returns to its existing owner rather than silently expanding scope.

Every real catalog lesson must occur exactly once in the world inventory, with a deterministic grouping/order and a real lesson destination. Curated Number Island may lead, followed by subject/topic islands composed from real content. No synthetic endless lessons: render continuously through available inventory, then an honest end. Keep server-only metadata/claims out of the client projection; progressively mount distant scenery, and retain only active/nearby lesson players. Map/List and 44 px tap targets, keyboard operation, reduced motion, mobile/desktop layouts, selected-first player order and usable return restoration are acceptance evidence. No new recall/seal/understood computation or persistence ships in this slice; unknown progress must not appear as zero. “Unchecked” describes verification and must not overwrite existing Published/Draft/In review metadata or imply a checked lesson is proven by inspection.

New production routes are tier 2 under the existing path map. This approval admits implementation, not the final diff or release readiness. Before merge collect independent source review, an actual integrated type/build result, exact inventory coverage, selected lesson/player/return/browser evidence and a rollback plan. Run and record required checks honestly; the founder's inspection exception is not a green result. Principal-engineer-ops supplies independent readiness, release-manager supplies the deployment receipt/smoke. No test or protected-file weakening is authorized.

## Exact open-PR structure observed

Native Git refs were fetched into `refs/remotes/inspection/pr/<number>`. GitHub public PR HTML supplies the actual bases (API access is denied). The repository default is `ccr-4c6c7654-ew9ko1` at `f693857f43e49cb0d0e6a67f22e40e0953125a0e`; remote `main` is a divergent, later platform baseline at `ad291766033d2c7cdc72be9f06aa36f831fb8a4e`.

| PR | Actual base branch | Head | Own content |
|---|---|---|---|
|16|ccr-4c6c7654-ew9ko1|2f63da10d|first 200 lessons|
|17|feat/behavioral-causal-200|dcccefa43|next 200|
|19|feat/source-demos-batch-02|fe6172df5|next 200|
|21|feat/source-demos-batch-03|cee659f00|next 200|
|22|feat/source-demos-batch-04|196c8852b|next 200|
|23|feat/source-demos-batch-05|21c9a0339|next 200|
|24|feat/source-demos-batch-06|decae013d|next 200|
|25|feat/source-demos-batch-07|c2b9ba70e|last 100 and earlier recall repairs|
|28|main|097141d1b|250 new Physics lesson metadata files|
|29|main|3aa689447|347 new metadata files: 171 Chemistry, 176 Life|

PR 25's head contains every earlier batch head as a strict ancestor: 1,500 actual new lessons, 500 Behavioral and 1,000 Probability. Its package change adds a mini-lab test command to verify; no runtime dependencies are introduced. It also brings shared mini-lab/continuation components and curriculum entries, which must accompany the content.

PR 29's title says 500, but the actual head adds only 347 metadata files. Do not manufacture the missing 153, count its title, or report them as present. Together the open lesson PRs add 2,097 actual metadata files; an exact integrated catalog count/duplicate-slug check remains necessary.

PR 20 is an independent R&D content-hub pilot, not a lesson addition. PR 26 proposes unratified AMD-019 and changes protected paths; exclude it from this content integration. No new lesson depends on either PR.

## Integration recommendation

1. Integrate in a linked inspection worktree; preserve the dirty shared checkout and its independent review records. PR 25 can merge into the selected default lineage. `git merge-tree HEAD PR25` found only board/events conflicts; CoS must retain/reconcile those shared operational records rather than overwrite them with a stale branch snapshot.
2. PRs 28/29 descend from remote `main`, not the selected default. Their own deltas from `ad2917660` are narrow lesson additions: Physics curriculum/helper modules/tests/tools for 28, Chemistry/Life curriculum/tests/tools for 29. Physics lessons import only existing kit/controls plus the new PhysicsCase/ScalingStage/CSS modules. Chemistry/Life lessons import existing kit/controls and React. No newer platform dependency is needed for these lesson deltas.
3. A normal merge of either entire head into the selected default would also import unrelated newer-main platform/HQ/dependency/tool changes, including protected `tools/company.mjs`. Do not do that blindly. Either merge each into its actual `main` base and apply its exact content delta to the inspection lineage, or make a deliberately content-scoped merge resolution retaining the selected default's unrelated files, with exact provenance recorded. Never claim a cherry-pick alone closed the original PR. Net protected-path changes are outside this scope.
4. Actual PR closure depends on its actual base. Merging PR 25 only into the default incorporates all batch content but does not by itself close the stacked PRs whose bases are intermediate feature branches. With native Git and founder merge authorization, fast-forward their actual base branches to the reviewed final stack head (no force), then integrate the stack into the default. For 28/29 the actual `main` base must contain the heads before reporting them merged. Verify branch protection and closure through actual remote/HTML evidence, not an assumption. Re-fetch first to avoid racing branch updates.
5. Standard merge-tree probes for 28/29 against current HEAD also found EXP README and `euclid-three-steps` metadata conflicts in inherited ancestry, besides board/events. Preserve committed EXP009 preregistration and current independent claim verification. New lesson metadata stays unchecked and keeps its source publication value.

## Deployment feasibility and owner handoff

The current checked-in `vercel.json` enables Git deployment, with an ignore command that allows a commit carrying the founder-approved deploy marker. Historical r18 records document that exact Git-marker route reaching READY; r21 records document deployment of the exact merged SHA through the existing Vercel connection. This is concrete configuration/history, not proof that a new build will run or reach READY today. The older runbook's blanket Git-disabled statement is stale relative to these artifacts.

The separate manual workflow is default-branch-only and runs the full verify/deploy wrapper. API access is currently denied; local Vercel binding/credentials were not established. Do not invent credentials, change settings, weaken that workflow or call its unrun checks passed. The latest founder explicitly authorizes merging and deployment for inspection, so release-manager should reconcile and use the existing configured Git integration if its current connection is confirmed, choosing an inspection preview where available. After the reviewed merged source exists, obtain the actual deployment/build receipt, exact SHA and hosted URL; smoke the world, all-status visibility, selected lesson playback and return on the hosted build. A pushed marker or guessed alias is not evidence of success. If runtime policy denies the deployment/inspection host, use the supported environment access workflow and report the precise blocker.

Rollback is a normal revert of the world/integration merge on its deployed branch followed by the same approved release route, or the established previous-deployment promotion if the release owner confirms that capability. No history rewrite, content promotion or deletion of prior review findings is part of rollback.

Next owners: CoS integrates exact lesson deltas and reconciles shared records; platform-engineer builds the admitted inspection slice; independent engineer/QA/ops reviewers assess actual artifacts; release-manager deploys and records the real result. This record is architecture/integration advice, not an independent review of source that does not yet exist.
