# Mini-lab numerical trace engine: implementation readiness request

owner: platform-engineer
date: 2026-10-24
tier: 2
status: awaiting independent engineering and principal-engineer-ops review; no shipping approval

## Scope

New `src/lib/mini-lab`, `src/components/mini-lab`, and the new behavioral/probability domain entry points only. The engine implements the pre-code route in `company/engineering/2026-10-24-behavioral-probability-200.md` (held in the integrating checkout). There is no kit, protected-path, catalog, dependency, auth, network or storage change.

The domain entry points share only the genuinely identical trace-state and visual geometry semantics. Each lesson imports its own computed spec; numerical teaching models are not encoded in a universal parameter bag, nor is a full batch catalog imported by a wrapper.

## Failure modes and bounds

Wrong lesson-local formulas or unsupported empirical claims remain content risks and need independent checking. The platform validates finite/bounded values, visual shape/size, answer index, unique options/scenario IDs, visible trace changes, contrasting final payloads and explanation length. It does not certify scientific claims or probability/count input domains; those checks belong to each local model.

Unreached cases cannot earn their milestone. Reset retains observed A/B summaries and the final A geometry/metrics with a saved label, preventing a reveal from referring to evidence replaced by question marks. Completed/no-op controls are disabled. Arrays and graphs have hard local bounds; runtime has no additional requests or persistence.

## Evidence

- Eight focused tests pass: all visual kinds, malformed/NaN/infinite payloads, bad graph edges/coordinates, interval ordering, answer/options/IDs, caption-only traces, duplicate final payloads, manual milestones, the DOM-order Run→Compare→Reset path and witness preservation.
- Full `npm run typecheck` passed on the platform worktree before integration; the later saved-frame helper is covered by the rerun below and final integration typecheck.
- React checklist applied: module-level components; stable local specs; lazy state; no derived-state effect; direct imports; deterministic SVG IDs; no data-fetching waterfall; numeric accessible names and semantic tables; 44px buttons and CSS theme variables.
- Actual 200-route phone/desktop QA, visual fit, local model arithmetic tests, full integrated typecheck/build and independent reviews are outstanding. This implementation record is not a QA or learner-review pass.

## Rollback and decision requested

Revert the batch's new engine files and its new lesson wrappers/specs plus curriculum additions in one source revert; no migration, cleanup job or credential rollback is needed. Existing lesson engines remain untouched. Principal engineer reviews the code diff; principal-engineer-ops approves or rejects operational readiness independently before merge/ship. Only the PR is authorized now; publication/deployment are separate decisions.
