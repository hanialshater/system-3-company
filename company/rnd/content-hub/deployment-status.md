# One-demo content hub deployment

owner: release-manager · date: 2026-10-25 · board: W-2030
status: deployed READY; live HTTP/publishing checks passed; live interactive browser rerun pending

## Live URL

[Open the content hub pilot](https://system3-content-hub-demo.vercel.app/d/sum-seven-ignores-first-die). It runs the already published probability/sum-seven-ignores-first-die lesson, version 3, on an isolated Next.js project. Existing System 3 production app, domains, lesson source, editorial publication state and learner metrics are unchanged.

## Actual deployed architecture

- Next.js host: system3-content-hub-demo.vercel.app, deployment dpl_FbfQrsfJ7VPppcZvgd4Q7E93HUA4.
- Separate immutable artifacts: system3-content-hub-artifacts.vercel.app, retained A and B releases. Both include both artifact revisions so rollback does not remove old content-addressed files.
- Publication lookup: public publication.json with no-store headers, exported from the operator's content-hub builds. Publishing selects a versioned static release by changing its CDN alias. The Next.js host fetches this pointer at request time and does not import demo code.
- Git-per-space, TypeScript checks, compiled model tests, SDK/runtime pins, artifact hashing, failed-build preservation and cache restoration run in the local operator prototype. This pilot does not deploy a distributed write/build control plane.

## Live validation

The host page, publication API, compiled client asset and artifact frame return HTTP 200. Unknown publication IDs return 404. Verified the served revision sequence **A → B → A → B** through the host API and confirmed that the host deployment stayed **dpl_FbfQrsfJ7VPppcZvgd4Q7E93HUA4** throughout. Final revision is B. The frame serves sandbox/CSP, CORS and immutable-cache headers; manifest/API responses are no-store. Vercel reports no runtime errors in the sampled one-hour window. Full details and source/artifact identities: [deployment receipt](../../ops/deployments/2026-10-25-content-hub-pilot.json).

Local production-host phone/desktop full flows, frame isolation, failed React compilation preserving publication and restored-input cache reuse passed before deployment; the existing hub/index regressions pass 8/8. Root TypeScript checking passes. Main repository check retains 811 errors/four warnings and aggregate verify retains the known publication-readiness failures; this is not a deployment of that whole-app tree.

The live interactive browser recheck did **not** complete: the environment's test Chromium rejected the environment proxy CA, then the execution workspace became unavailable. TLS verification was never disabled. Live HTTP/publishing validation is successful; live full-flow browser acceptance remains open. The local browser evidence must not be presented as live browser evidence.

## Difference from the prepared plan

The Vercel connection's Global Config token tool rejects its own valid config ID against the prefix schema. The supported fallback here is the public CDN manifest/versioned-alias pointer, not a fabricated token or another account. The created Global Config ecfg_x3uekw3reodjp4bifhvhy72p1hla is unused and no read token was created. The available connector has no delete capability, so this unused configuration is recorded for later cleanup/reuse.

No additional host builds were performed to change A/B pointers. This demonstrates independent artifact delivery and release selection; it is not a claim that the full physical production architecture has been deployed.

## Tracking

[PR #20](https://github.com/hanialshater/system-3-company/pull/20), [issue #18](https://github.com/hanialshater/system-3-company/issues/18). W-2030 is ready for review, with the live browser recheck explicitly open. W-2027 independent R&D acceptance and W-2028 production integration review remain open.
