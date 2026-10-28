# Number Island: engineering manager direction

owner: principal-engineer
date: 2026-10-27
status: agree with changes; implementation not yet cleared
request: company/decisions/2026-10-27-founder-number-island.md
board: W-2125

## Answer

Agree with an opt-in original SVG world for the twelve existing Mathematics lessons, alongside the existing feed. Keep the first implementation a bounded navigation surface. This consultation approves neither a build dispatch nor a release. Product and Design own the presentation and sequence; Engineering owns the boundaries below.

## Tier and options

The ordered map in `company/engineering/readiness/paths.json` is authoritative:

| Option | Tier | Required before implementation/merge |
|---|---|---|
| Add an opt-in island section/view to the existing catalog, addressed by `/catalog#number-island`, with scoped artwork/components and no learner-history reads, host edits, data-shape changes or new routes | 1 | Product/Design scope agreement; passing build preflight; full verification evidence; changelog; one engineer diff review; tier-1 readiness self-check |
| Add the previously proposed `/learn/world` route | 2 | EDD before code because an added `src/app/**/page.tsx` is a new public surface; engineering review before merge; independent principal-engineer-ops readiness approval; rollback; integrated verification |
| Modify `src/app/d/**` for a return-to-island link, or modify `src/kit/**`, catalog visibility, learner data, auth, or events | 2 | Expand EDD and affected-owner reviews before those changes; no incidental edits |
| Do nothing now | 0 | Retains the catalog and feed while dispatch prerequisites are resolved |

Recommendation: ask Product and Design whether the existing-catalog option satisfies the first SVG prototype. It avoids a new public route and leaves lesson hosting alone. This is an actual scope choice, not permission to hide new-route, kit or learner-data work inside a tier-1 label. If `/learn/world` remains the chosen scope, platform-engineer writes an EDD before code, reviewed by principal-engineer and an affected role. No new framework, package or expensive-to-reverse decision is needed for either option; an ADR is unnecessary unless scope changes.

## Implementation contract for the eventual builder

- Use existing role **platform-engineer** for the catalog shell and new presentation components after manager directions are consolidated. Keep illustration assets separate and reusable; Design chooses whether illustrator supplies standalone SVGs first.
- Resolve the twelve proposed slugs against `visibleDemos()` on the server. Send only an explicit minimal display projection (slug, title, actual status, duration, and safe lesson link) to a client component. Never send whole `DemoMeta`, claims, fact-check notes or the complete generated registry to the client.
- Keep the catalog/lesson visibility policy unchanged. `src/lib/visibility.ts` currently exposes all lesson statuses by founder direction; do not silently reintroduce a published-only rule. Preserve the actual status labels and never imply that navigation through a map grants editorial approval.
- Reuse `/d/<slug>` for opening lessons. An anchor back to the selected stop may be held in URL hash/UI state without modifying the shared lesson host. A dedicated contextual return link in `src/app/d/**` is a separately reviewed tier-2 change, not a free addition to the prototype.
- Use original SVG scenery and path artwork. Put interactive stops in semantic HTML buttons or links with accessible names and visible focus, or equivalently accessible SVG anchors. Provide an ordered list with the same available lessons; keyboard and touch navigation must not depend on dragging a map.
- Expose the real curriculum sequence, allow free exploration, and preserve the existing feed. Do not add lock logic, reward currency, completion-as-mastery claims, invented checkpoints, new scientific explanations, or altered lesson content.
- No progress integration in the first presentation-only slice. Existing `loadProgress()` reads the device store; the feed delays this until ownership readiness via `readOwnedProgress(historyGeneration > 0, loadProgress)` and clears on `s3c:account-session-reset`. A new map that reads on mount could show history before ownership settles. If Product requires progress now, route to vp-personalization/learner-model-engineer and privacy-reviewer through the managers, include the design in the EDD, and test sign-in/reset transitions before release. Never infer mastery from completion.
- CSS must be scoped; no global feed changes. The map must not import lesson implementations or mount hidden lessons. Inline artwork is not a reason to add all twelve lesson bundles to initial load.
- Test actual stop selection, lesson opening, return/navigation semantics, list/map parity, keyboard focus, mobile tap targets, reduced motion, missing/unavailable slugs, truthful status display, and narrow-screen overflow. Capture phone and desktop screenshots for independent Design and accessibility review. Measure new page payload separately; do not infer a performance target was met from a successful build.
- Do not edit protected tests/QA, gates, config, dependencies, metadata schema, lesson claims or generated registry code to make this feature pass.

## Actual dispatch prerequisites

I ran the existing command diagnostically with `--no-claim`; no builder was launched:

```sh
node tools/dispatch-check.mjs --kind=build --role=platform-engineer \
  '--source=§4:Number Island diagnostic preflight only; do not dispatch or claim' \
  --chooser=principal-engineer --running=3 --builders=0 --no-claim --json
```

Observed result: **ok false**. The hard failures were:

1. **C3:** a build needs a real linked Git worktree, not the main checkout.
2. **R1:** WBR overdue (reported 239 hours against a 24-hour limit).
3. **R1:** founder digest overdue (reported 225 hours against a 12-hour limit).

The command also warned that a `§4:` dispatch must use chief-of-staff as chooser. The eventual manager-directed builder brief should be recorded in the supported batch format with its true POC, or dispatched as a legitimate chief-of-staff `§4:` integration instruction referring to this manager answer. Never use another kind to conceal implementation.

`git worktree list --porcelain` shows only `/workspace/system-3-company`, currently on `codex/number-island`. There is no existing linked builder worktree to reuse. Chief-of-staff clarified in this consultation that onboarding is complete and this is the separately authorized feature-implementation task: the founder explicitly requested the company workflow, whose builder instructions require linked-worktree isolation. Use that authorized coding isolation for the implementation task; the onboarding-only restriction is not a request to bypass C3 or block this new task. Chief-of-staff creates/assigns the isolated checkout only after the remaining build prerequisites pass, and records its real path. Do not change C3 or point `--worktree` at an ordinary folder.

Old founder-intake omissions are **warnings for `kind=build`**, and I1 is a hard failure specifically for `kind=wave`, per the actual implementation in `tools/dispatch-check.mjs`. They are not grounds to claim the diagnostic failed on I1. Route documentary repairs to their owners if a wave is planned; do not fabricate historical answers.

Chief-of-staff owns running and honestly recording the due WBR/founder digest before build dispatch, with the existing managers as required. This manager consultation does not repair or waive those prerequisites. No host load/disk refusal or unreviewed-COE refusal was reported by this run. Recheck immediately before a real dispatch using current counts and real paths.

## Validation and release evidence

The pre-change `npm run verify` output at `/tmp/s3-world-verify-before.log` shows deploy tests passing (19/19), then publish tests with two failures (32/34); the chained command stops there. Later suites in that run are **unrun**, not passing. Independent prior setup evidence reports typecheck/build success, representative phone/desktop lesson contracts, a separate 132/133 Life Hacks result, and the global company check at 811 errors/4 warnings. Those results are baseline context, not Number Island verification and not a release waiver.

Release-manager must establish the supported release path and its credentials separately, after feature evidence and reviews exist. The runbook requires full verification before release. The founder's feature-specific deploy instruction is real authorization to request that deploy, but does not make red verification green or authorize bypassing the default-branch workflow and PR-only rules. No claim here establishes deploy access, a deployment, or an approval of current source.

## Ownership and next sequence

1. **Chief-of-staff:** consolidate manager answers, close the genuine ritual prerequisites, record this answer on the intake/board, and assign a real isolated builder worktree for the now-authorized coding task before any build.
2. **Head-of-product + design-lead:** choose existing catalog vs dedicated route, freeze the twelve-lesson navigation scope, and route the category/interaction/illustration work through their existing owners.
3. **Platform-engineer:** if tier 2, write EDD first; otherwise tier-1 builder brief. Start implementation only after the actual build preflight passes. Keep source edits to the agreed boundaries.
4. **Evaluation-steward:** select independent QA and accessibility owners; provide reviewers artifacts first, not builder explanations.
5. **Principal-engineer + principal-engineer-ops:** engineering review/readiness approval if tier 2; one engineer diff review plus self-check for the bounded tier-1 option.
6. **Release-manager:** check feature-specific founder approval, source/branch policy, full verify and readiness before any hosted preview; report a real receipt and live checks or the exact remaining blocker.

No app, artwork, protected path, test, board, progress or event file was edited by this consultation. No builder, worktree, commit or deploy was created by this consultation.

## Objections

- **Progress can look simple while crossing account ownership:** omit it from the first presentation-only slice, or expand the owned tier-2 design and reviews explicitly.
- **A dedicated route adds public surface:** keep it tier 2; the existing-catalog alternative is available only if Product and Design genuinely select that scope.
- **Old red verification can swallow the feature result:** preserve before/after command evidence, run relevant checks independently, and keep failed/unrun outcomes distinct. Release-manager owns resolving the release consequence.
- **Onboarding and feature-work isolation have different scopes:** chief-of-staff confirmed this is the newly authorized company feature task, so the company linked-worktree workflow applies. Preserve C3 and pass its real-path check; do not treat onboarding as permission to build in the main checkout.
