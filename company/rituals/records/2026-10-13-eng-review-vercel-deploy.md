# Engineering Review: executable Vercel deployment

owner: implementation author (Codex) · tier: 2 · status: implementation checked; independent review pending PR

- EDD: `company/engineering/edd/EDD-002-vercel-deploy-command.md`
- Decision: `company/decisions/2026-10-13-vercel-deploy-command.md`
- Constitutional paths changed: none. Existing launch and QA gates are unchanged.
- Blast radius: new deployment workflow, release-manager onboarding, and production visibility
  on the map and direct lesson URLs. Preview still supports direct draft URLs for author QA.
- Rollback: revert the implementation commit; deployed releases use the existing Vercel rollback.

## Validation
- Company check, typecheck and preview build passed.
- Full existing browser QA passed: **646/646** on phone and desktop (8.9 minutes).
- Deployment orchestration: **17/17** tests. Missing/conflicting project IDs, mismatched owner,
  dirty production source, failed verification, failed upload, non-READY builds and failed smoke
  checks cannot reach production promotion. CI IDs without a local link are covered.
- CI prebuilt mode: verification precedes pull/build/upload; pull and local-build failures never
  upload or promote. Both build and runtime use target-specific visibility, and local builders
  receive no Vercel authentication token.
- New workflow passes actionlint 1.7.7, shell-syntax checks and deployment-boundary checks:
  default-branch/success/fork guards, read-only GitHub permissions, pinned actions, scoped Vercel
  credentials, exact release checkout and release-only artifacts. Existing protected CI unchanged.
- Production build with `SHOW_REVIEW=off`: 47 published feed cards, no unpublished map links,
  **271/271** unpublished direct URLs return 404. Published lesson/provenance render on phone
  and desktop. The custom output-directory tsconfig edits were restored after validation.
- Vercel CLI help and installed implementation were checked for argument and JSON contracts.
  Project-inspect JSON omits the owner ID; a scoped read-only API request checks that field.
- Existing dependency versions did not change. CLI is pinned at 63.1.2 and used only in tooling.
  Vercel credentials are omitted from local build/test processes and durable release records.
- React review: changes keep existing server components, centralized visibility, stable keys,
  and existing client boundaries; no new browser dependency or event handler.

## Findings and limits
- Cloud upload/promotion were simulated in orchestration tests. This checkout has no linked
  Vercel project, so no live release or project setup was performed.
- Git-integrated deployments are a separate path; the runbook explains production environment
  configuration and Deployment Checks for that path.
- HTTP smoke checks supplement the existing browser contract and do not measure learning.

## Decision
Implementation validation passed. Independent engineering review remains for the PR reviewer;
this record does not claim another engineer reviewed or approved the change.
