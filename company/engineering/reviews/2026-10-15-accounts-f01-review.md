# Engineering Review: 2026-10-15: F-01 accounts (dependencies, ADR-008, ADR-009, EDD-008 architecture)

owner: principal-engineer (Kenji) · tier: 2 (auth, learner data, new runtime dependencies) · board: W-1138 (this review), W-1135 (spike), W-965 / W-1139 (privacy review of EDD-008 §6–§10), W-966 (readiness) · author: backend-engineer (Amara)

- Decision: [founder F-01](../../decisions/2026-10-15-founder-f01-accounts.md), including the founder's same-evening correction (Neon `first-light` is on Development and Preview, not Production)
- Records reviewed: [dep-better-auth](../../decisions/2026-10-15-dep-better-auth.md), [dep-pg](../../decisions/2026-10-15-dep-pg.md), [provider-resend-no-sdk](../../decisions/2026-10-15-provider-resend-no-sdk.md), [ADR-008](../adr/ADR-008-better-auth-magic-link.md), [ADR-009](../adr/ADR-009-postgres-on-neon-eu.md), [EDD-008](../edd/EDD-008-accounts-and-server-progress.md) (architecture only; §6–§10 data model go to privacy-reviewer), [SPIKE-002](../spikes/SPIKE-002-accounts-plan.md), [env contract](../notes/2026-10-15-accounts-env-contract.md)
- Amendment: none needed. Nothing proposed touches a protected path (`src/kit/Lesson.tsx`, `tests/qa/**`, `tools/company.mjs` and the rest are untouched; new code lives in `src/lib/server/`, `src/app/api/account/`, `db/`, `tools/db-*.mjs`).

How I reviewed: I read every record above and the founder record. I did not take the backend engineer's five source findings on trust: I read the unpacked `better-auth@1.7.10` tarball the backend engineer left in scratch (`plugins/magic-link/index.mjs`, `api/index.mjs`, `cookies/index.mjs`, `db/with-hooks.mjs`, `db/internal-adapter.mjs`). I checked `package.json` (next ^16.4.0, react ^19.2.0, node >= 20), `next.config.mjs`, `vercel.json` (no `regions`), the existing API routes, and the `accounts` worktree. No install, no build, no code.

## Checklist
- [x] The problem is real: progress is one-browser only, and release 1 includes optional accounts (founder F-01).
- [x] Options: do nothing, file export only, rows vs JSON blob; for auth, Auth.js, Clerk, Neon Auth, hand-rolled; for the driver, Neon serverless, porsager, ORMs. Enough.
- [x] Blast radius: new routes under `/api/account/*` only, behind a run-time switch that defaults off. No lesson, no kit file, no beacon field changes.
- [ ] Readiness record approved by principal-engineer-ops: not yet (W-966). Draft section is in EDD-008.
- [x] Rollback: `ACCOUNTS_ENABLED` off at run time; code is a revert; schema has `down` files.
- [ ] `npm run verify` on the integrated tree: not applicable, nothing is built. The spike runs it on `accounts`, and the merge review re-runs it.
- [x] Measurements committed before implementation (EDD-008 table), with would_be_wrong_if.
- [x] Security, privacy, licences: MIT plus one Apache-2.0, no install scripts, 0 advisories (registry, 10-15). Privacy data model is the privacy reviewer's.

## Findings (problems, not fixes)

### F1. The five source findings: all confirmed, and one is wider than written
I read each in the 1.7.10 source.
1. **IP and user agent.** `internal-adapter.mjs` `createSession` writes `ipAddress: getIP(headers) || ""` and `userAgent: headers.get("user-agent") || ""`. Absent values are `""`, so the `CHECK (coalesce(x,'') = '')` design fits. Database hooks receive the endpoint context (`db/with-hooks.mjs` calls `toRun(data, tryGetCurrentAuthEndpointContext())`), so a `session.create.before` hook can rewrite both. Confirmed.
2. **`name`.** Confirmed, and **wider**: the magic-link sign-in body accepts an optional `name` from the caller, stores it in `auth_verification.value` for up to 300 s, and passes it to `createUser`. So a client can make us store a name, which the gate forbids (P1.1). The `CHECK (name = '')` only turns that into a failed sign-up after the row in `auth_verification` already holds the name. See C3.
3. **Plain tokens.** Default `storeToken: "plain"`; `"hashed"` uses the library's key hasher for both the stored identifier and the lookup on verify. Confirmed.
4. **Account created on first click.** `createUser` is inside `/magic-link/verify`, and the verify handler reads `ctx.query.token`. Because hooks get the endpoint context, `user.create.before` can read the token and find `signup_intent`. That answers SPIKE-002 question 4 "probably yes"; the spike still proves it with a test. Also: `sendMagicLink` receives the caller's `metadata` and the plain token, so the band can be handed to the callback without a side channel.
5. **Cookie path.** `cookies/index.mjs` builds every auth cookie as `{ path: "/", ...advanced.defaultCookieAttributes, ...per-cookie attributes }`, and expiry on sign-out keeps the same attributes. So `defaultCookieAttributes: { path: "/api/account" }` scopes the session cookie and the side cookies (`session_data`, `dont_remember`, account data) together, and sign-out clears them on the same path. Confirmed. `__Secure-` (not `__Host-`) allows a non-root path.

### F2. Two ways in, and the second one skips our checks
The Better Auth router mounts its own public `POST /api/account/auth/sign-in/magic-link`. EDD-008 adds `POST /api/account/start`, which validates the band and calls the library. As designed both exist, so a caller can go straight to the library endpoint: no band check, a `name` in the body, and an email sent with no age screen. The click then fails (no intent, so no user), but we have sent mail and stored an email and maybe a name. Separately, `auth.api.*` calls from our own route **bypass the library's rate limiter and `disabledPaths`** (both run only in the router's `onRequest`, `api/index.mjs`). So whichever door we keep, it needs exactly one set of checks.

### F3. Production builds with no accounts variables
Production now has **no** `DATABASE_URL` and no `RESEND_API_KEY` (founder correction), and that will stay true until go-live. If `auth.ts` or `db.ts` constructs Better Auth or the pool at module scope, `next build` (which imports route modules to collect page data) or the first request can throw, even with accounts off. "Merging this code does not turn accounts on" is only true if merging it also cannot break a build that lacks the variables.

### F4. `ACCOUNTS_ENABLED` must stay run-time in practice, not only in name
A server `process.env` read inside a handler is run-time. But if any page or client component reads it, it is fixed at build time (static pages) or absent (client). The UI must learn whether accounts exist from `/api/account/me` (404 means hidden), and never from an env read in a page.

### F5. `fra1` is not set anywhere
`vercel.json` has no `regions`, and no route sets `preferredRegion`. Vercel functions then run in the project default (usually `iad1`, Washington). Account requests would then process the email and progress map in the US and cross the Atlantic to Frankfurt on every query: a residency problem for the privacy gate and about 90 ms per round trip. The env contract leaves it to "the dashboard, if the plan allows". That is not enough for a tier-2 privacy claim. The narrow fix is in code: `export const preferredRegion = "fra1"` and `export const runtime = "nodejs"` on each `src/app/api/account/**/route.ts`, which leaves every other route alone and is not deploy config. The proof is the `x-vercel-id` response header on a preview, which names the region.

### F6. Our own routes are outside Better Auth's CSRF protection
The library's origin check covers only its own router. `/api/account/start`, `merge`, `progress` and `delete` are ours. `SameSite=Lax` stops a cross-site POST from carrying the cookie, which protects the signed-in routes, but `start` is unauthenticated: any site can make a browser POST to it and send our sign-in mail.

### F7. The test database is now Development + Preview (founder correction)
ADR-009 §4 says Production is the Neon default branch with the integration on Production only, and Preview is a schema-only branch set by hand. The real state is the reverse: the integration resource `first-light` is on Development and Preview, and Production has nothing yet. That is a good state for the spike (fake data only, no hand-set preview variables), but ADR-009 and the env contract now describe a setup that does not exist. Three risks follow:
- If Production is later made a **branch** of `first-light`, or `first-light` a branch of Production, the two share a branch tree, and a restore, a reset or a "create branch from" can move rows between them. Separate is only real if they are separate Neon projects (or at least neither is a child of the other).
- With the integration on Development, `vercel env pull` puts the test database's credentials on any engineer's machine. Fine for fake data; it becomes a leak path the day anyone real signs up on a preview.
- Real people must never sign up on a preview: the test database must hold fake data only, or the "no learner rows outside Production" property is lost from the other side.

### F8. The spike's worktree shares files with main
`/home/user/s3c-acct/node_modules` is a real directory, but its files are **hard links** to the main checkout's (`node_modules/next/package.json`: same inode, link count 4; made with `cp -al`). `npm install` in that tree can rewrite a hard-linked file in place and change the main checkout's `node_modules` under every other agent.

### F9. Size: install footprint is not the number that matters
26 MB unpacked is disk, not shipped code. What matters is (a) the server function size (Vercel's limit is 250 MB unzipped; `@opentelemetry/semantic-conventions` is 12 MB and may be traced whole), and (b) the browser bundle, which must not grow at all: the client talks to our routes with `fetch`, so nothing imports `better-auth/client` or `better-auth/react` (that would pull `nanostores`, `better-fetch` and more into the feed).

### F10. Smaller architecture points
- **The daily purge.** EDD-008 §9 leaves cron vs first-request open. A cron is deploy config with its own route and secret. A single indexed `DELETE … WHERE expires_at < now()` on `auth_verification`, `signup_intent` and expired `auth_session` rows, run inside each `start` request, costs microseconds and needs nothing else. `deleted_account` (35 days) and the 24-month idle rule can ride on the same statement set. Prefer that.
- **Runtime schema changes.** Better Auth has a `checkSchema` step in `onRequest` and a CLI migrator. Nothing at run time may issue DDL; migrations are only `tools/db-migrate.mjs` by hand (ADR-009 §3).
- **Full-map merge on every load** (EDD-008 proposal 3) uploads up to 1 MB per page load per signed-in learner. Acceptable for release 1. Once per tab session is enough, because deltas cover the rest.
- **Q9 (signed-in UI is client-rendered):** accepted. One request per load is a fair price for a beacon that cannot carry the cookie by construction.
- **Next 16:** no `proxy.ts` (formerly middleware) for auth. Nothing on page paths can see the cookie, and nothing should try.
- **Fluid compute and `pg`.** One instance serves concurrent requests, so `max: 3` per instance through PgBouncer is fine. Idle connections when an instance is suspended can linger. The spike watches the open connection count in Neon. Vercel's `attachDatabasePool` helper would be a new package (`@vercel/functions`) and is **not** pre-approved.

## Decision

**Dependency records: acknowledged, with conditions.** `better-auth` 1.7.10 and `pg` 8.23.1, exact pins, may be installed **in the spike worktree only**. `@types/pg` (exact pin, devDependency, types only) is acknowledged in advance if `tsc` needs it; the spike report records its version and audit line, and no extra record is needed. The Resend-over-`fetch` record is acknowledged; its processor rows remain with the privacy reviewer and counsel.

**ADR-008: architecture approved with changes; stays `proposed` until the spike passes.** **ADR-009: approved with changes (C8); stays `proposed` until the spike passes and §4 is rewritten.** **EDD-008 architecture: approve with changes.** The data model (§6–§10) is not decided here (W-965 / W-1139).

**SPIKE-002 may install the two packages: yes**, in `/home/user/s3c-acct` on branch `accounts`, after C1. It does not merge to the main branch: the merge needs this review's conditions met, the privacy review, an approved readiness record and `npm run verify` on the integrated tree.

### Conditions (owner: backend-engineer in the spike unless named)
- **C1 (before installing; F8).** In `/home/user/s3c-acct`: `rm -rf node_modules && npm ci`, then install with `--save-exact`. Never install into a hard-linked or symlinked `node_modules`. The main checkout's `package.json`, lockfile and `node_modules` stay unchanged (check `git -C /home/user/system-3-company status` and the inode of one file before and after).
- **C2 (F2).** **One HTTP entry can trigger a sign-in email.** Default: `disabledPaths: ["/sign-in/magic-link"]`, and `/api/account/start` calls `auth.api.signInMagicLink` server-side with `metadata: { ageBand, policyVersion }`. Because that call bypasses the library's limiter, `start` applies its own in-memory limit (the same 5 per 60 s per IP, and per email) before calling. Test: a direct POST to `/api/account/auth/sign-in/magic-link` returns 404.
- **C3 (F1.2).** `start` refuses any body key except `email`, `ageBand`, `policyVersion` (so no `name` ever reaches the library), and `user.create.before` sets `name: ""` and `image: null` regardless. `sendMagicLink` re-validates the band from `metadata` and refuses to send without one. Test: an attempt with a name stores no name anywhere, including `auth_verification`.
- **C4 (F3).** `auth.ts` and `db.ts` construct lazily, on the first request **after** the `ACCOUNTS_ENABLED` check. Test: `npm run build` passes, and every `/api/account/*` route returns 404, with **none** of the accounts variables set.
- **C5 (F4).** `ACCOUNTS_ENABLED` is read only in server route handlers, per request. No page, layout or client component reads it; the UI hides sign-in when `/api/account/me` returns 404. Test: flip it on a preview without a rebuild, and the UI follows.
- **C6 (F5).** Every account route exports `runtime = "nodejs"`, `preferredRegion = "fra1"` and `dynamic = "force-dynamic"`. Proof in the spike report: `x-vercel-id` on a preview response from `/api/account/me` shows `fra1`. No `vercel.json` change in the spike. If a project-wide region is wanted later, that is deploy config for platform-engineer and the release manager.
- **C7 (F6).** Every state-changing `/api/account/*` route of ours checks `Origin` against the site origin (or `BETTER_AUTH_URL` / `VERCEL_URL`) and accepts only `application/json`. Test: a cross-origin POST to `start` is refused.
- **C8 (F7; ADR-009 §4 and the env contract, backend-engineer; go-live step with release-manager).** Rewrite ADR-009 §4 and env-contract §1 and §3 to the real state: `first-light` = test database, Development and Preview, fake data only. Production = a **separate Neon project** (not a branch of `first-light`, and `first-light` never a branch of it), in Frankfurt, connected to **Production only**, created at go-live. Preview branching off on both (the founder confirms for `first-light`). Previews with `ACCOUNTS_ENABLED=on` stay behind Vercel Deployment Protection, and only staff addresses sign up there. The readiness record (W-966) carries a check that no Preview or Development variable points at the Production project.
- **C9 (F9).** The spike report gives the server function size for `/api/account/auth/[...all]` and the feed's first-load JS before and after. The browser bundle must be unchanged: no `better-auth/*` import in any client file (a grep test, next to the `api.resend.com` one).
- **C10 (F10).** Purge expired rows inside `start` (no cron in release 1) unless the spike measures a reason not to. No DDL at run time: the spike's Postgres statement log shows none. Better Auth's CLI migrator is not used.
- **C11 (dependency records).** Paste `npm audit` and the licence list from the **real** lockfile into the spike report. A high or critical advisory stops the spike.

### Objections that travel with this decision
| Objection | Raised by | Answer |
|---|---|---|
| 22 packages and about 26 MB for one sign-in method is a large supply-chain surface | backend-engineer (self) | **Accepted risk, with conditions.** Exact pin, `npm ci` from a lockfile with integrity hashes, no install scripts, 0 advisories, audit on the real lockfile (C11), a deliberate review on every minor. Hand-rolling (option C) swaps a reviewed supply chain for unreviewed session and CSRF code of our own, which is more risk. The 12 MB OpenTelemetry package is a types-and-constants package, and C9 measures what reaches a function. |
| Very fast release cadence; a minor could change privacy defaults | backend-engineer | **Accepted as written** in the record: patch bumps are tier 1 with the auth tests; minors are reviewed against the settings list. I add: the spike's tests for C2, C3 and the IP/UA blanking are the regression suite for every bump. |
| Defaults store IP and user agent | backend-engineer | **Confirmed in source (F1.1), and the hold-down is feasible**: hooks receive the endpoint context. Stays open until the spike's test passes. |
| 65% confidence on Next 16.4 | backend-engineer | **Open with its trigger**, the spike. The fallback stays Auth.js v5 by a new record. |
| TCP pools in serverless can exhaust connections | backend-engineer (pg record) | **Accepted for release 1**: PgBouncer endpoint, `max` 3. The spike reports the open connection count under a small burst. A new package to fix it needs its own record. |
| ADR-009's environment split no longer matches the setup | principal-engineer (this review, from the founder's correction) | **Open: C8.** |
| Signed-in pages cannot read the session server-side (Q9) | backend-engineer | **Accepted** (F10). |

## Kudos
- @backend-engineer: read Better Auth's source rather than its docs, and found all five defaults that collide with the privacy gate before any code was written. Every one checked out in the tarball, and the scratch evidence made it possible to check.
