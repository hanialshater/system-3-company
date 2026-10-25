# One-demo deployment status

owner: release-manager · date: 2026-10-25 · board: W-2030
status: locally verified; deployment blocked on Vercel team connection access

## Prepared and verified

The founder authorized "Also lets deploy one with the content hub". The isolated pilot selects the published probability/sum-seven-ignores-first-die lesson, version 3. Original production routes, lesson source and protected paths are unchanged.

- Added a trusted React compiler profile to the actual Git-per-space hub. Immutable runtime package pins include the compiled React/kit runtime and matching SDK types. Each write runs full TypeScript checks and compiled model tests before emitting browser artifacts.
- Built delivery revisions A and B from real Git space commits. B only adds an exported delivery marker; the published lesson content/claims are unchanged.
- Created a separate minimal Next.js host. Dynamic slug routes fetch the publication server-side at request time; no lesson source or generated catalogue is part of its build. The artifact URL is restricted to the configured artifact origin. Only a safe public publication identity reaches the client.
- The independent host's production build passes. Its own local browser verification passes desktop/phone full lesson flows, opaque-origin frame isolation, A → B → A → B pointer changes with the same Next process, unknown-demo 404, invalid React build preserving the published pointer, and restored inputs reusing the original artifact. No page errors. Evidence: [deployment-local.json](evidence/deployment-local.json).
- Existing hub/index regressions pass 8/8. Repository check remains the baseline's 811 errors/four warnings; aggregate verify retains its known publication-readiness failures. The isolated host is not a release of that whole-app tree.

The initial failure-injection check exposed that the old transpile-only loader could repair malformed TSX while emitting code. The new React profile therefore performs TypeScript diagnostics before any bundling. The final failure-injection test rejects invalid source correctly. Earlier failed preparation directories remain in ignored artifacts as diagnostic evidence.

## Deployment boundary

Intended cloud resources: one dedicated static artifact project, one dedicated Next.js pilot project and one Global Config containing the publication pointer. No existing System 3 production project/domain should be changed. The Git source, compiler and build operator remain local for this technical pilot; the deployed read path will be cloud-hosted. This does not deploy a distributed write/build control plane.

The artifact upload package contains only the selected immutable compiled files and hosting headers, not source Git history, private claims/reviews, local SQLite state or credentials. The host contains no demo imports and requires server-only CONTENT_HUB_PUBLICATION_URL and CONTENT_HUB_ARTIFACT_ORIGIN configuration. A newly created scoped Global Config read token should be injected directly as an encrypted project environment variable, never printed or committed.

## Blocker and remaining live checks

Vercel lists the existing project but denies scoped access with HTTP 403 for team `team_Ss0FbvX3HyCJMqitsy31SLPj` (hanis-projects-2e2b67f6). The connector explicitly requires authorize_team_access. No cloud project, store, deployment or publication was created. The deployment itself is already authorized; this is missing account/team access, not a request to approve deployment again.

After the user grants team access through the connector's short-lived link: retry get_project in that same scope, create the isolated resources, package exact frame-ancestor headers for the actual host origin, upload artifacts, set the initial A pointer, deploy the independent host, and run live full-flow + A/B/rollback checks. Capture deployment IDs to establish that pointer changes did not rebuild the host. Do not report a live URL until READY and these checks pass.

## Reproduce local preparation

```sh
# Run against a fresh output directory; existing catalogue kit artifacts are required.
node src/lab/content-hub/prepare-deployment.mjs
cd src/lab/content-hub/deploy-host
npm ci --ignore-scripts
npm run build
cd ../../../..
node src/lab/content-hub/test/deployment.mjs
```

The final local artifact state and public upload files are under `artifacts/content-hub-deployment-final/`. Default preparation is intentionally non-destructive and refuses an existing space. See [deployment-plan.md](deployment-plan.md) and [prototype README](../../../src/lab/content-hub/README.md).
