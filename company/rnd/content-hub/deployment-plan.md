# One-demo content hub deployment

owner: release-manager · date: 2026-10-24 · board: W-2030
status: authorized; preparing isolated pilot; Vercel team access pending

## Authorization

Founder, this conversation: "Also lets deploy one with the content hub".

This authorizes deploying one isolated technical pilot and its required artifact delivery resources. It does not authorize replacing the existing System 3 production app, weakening its gates, migrating the whole catalogue or provisioning a distributed Git/build farm. Existing production project and domains remain outside this change.

## Concrete deployment

- Demo: published probability/sum-seven-ignores-first-die, version 3. Its source path has no readiness error in the unchanged baseline company check. Preserve the lesson and claims; a second delivery revision adds only an exported build marker.
- One local Git-per-space content hub, with an explicit React compiler profile, runs model tests and emits the real lesson plus pinned React/kit runtime as immutable artifacts. Compiler profiles are trusted operator configuration, never user-provided executable paths.
- Dedicated static artifact project and dedicated small Next.js host project on the existing Vercel account. Neither changes the main production app. Global Config holds the one published pointer so switching artifacts does not redeploy Next.js. No new npm dependencies beyond the app's existing Next/React versions; HTTP reads use built-in fetch.
- Ship only selected content-hub artifacts and the independent host source. No Git history, private claims/review data, local SQLite DB, build credentials or full catalogue is included in public artifacts.
- Validate local model tests, host production build, sandboxed full lesson flow, failure/rollback behavior and live artifact delivery. Then verify revision A → B → A → B with the same Next.js deployment to demonstrate publication without a host rebuild.

## Boundaries and checks

This is an isolated technical pilot of an already published lesson, not a deployment of the existing red-check whole-app tree or a claim of independent editorial approval. The main repository's known aggregate failures stay visible. The pilot's own production build and full browser flow must pass. No protected source, production route, auth, learner-data store or event intake changes. Progress messages remain local to the preview UI and never enter learner metrics.

Vercel responded with a team-access 403. The connector's authorize_team_access action produced a user approval link; deployment waits for that connection authorization. No alternate account, credential retrieval or authentication bypass is permitted.

## Acceptance

Public host URL renders the published real lesson from a separate artifact origin. A server-side publication lookup selects the approved content-hub artifact. Switching/rolling back the pointer changes delivered revision while the Next.js deployment ID remains unchanged. All retained artifact bytes remain unchanged. Save source/build/publication/deployment IDs and local/live verification evidence; leave production integration review W-2028 open.
