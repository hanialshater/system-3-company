# Dependency: add `better-auth` (exact pin 1.7.10) for magic-link sign-in

owner: backend-engineer (Amara), proposes · acknowledgement owed by: principal-engineer (Kenji)
date: 2026-10-15
class: engineering, tier 2 (new runtime dependency on the auth path)
route: backend-engineer → principal-engineer (acknowledge this record, ADR-008) → privacy-reviewer (the fields it writes, EDD-008 §6) → install in the phase-2 spike, on branch `accounts` only
recorded by: backend-engineer
status: proposed. **Not installed.** Revisit when the principal engineer acknowledges, or when the spike (W-1135) reports.
decision it serves: [founder F-01](2026-10-15-founder-f01-accounts.md), item 5 · design: [ADR-008](../engineering/adr/ADR-008-better-auth-magic-link.md), [EDD-008](../engineering/edd/EDD-008-accounts-and-server-progress.md)

## Context
F-01 picked Better Auth with email magic link, with accounts kept in our own Postgres. CLAUDE.md and best practice 5 say no new package without a record, `npm audit` and a licence check. The founder record says this record is owed, not waived.

## What I checked (npm registry, 2026-10-15, from this host)
| Fact | Value | How |
|---|---|---|
| Latest stable | **1.7.10**, published 2026-10-15 13:29 UTC. 1.7.8 and 1.7.9 came out in the previous 24 h. `1.8.0-beta.0` was tagged `beta` the same evening | `npm view better-auth version time dist-tags` |
| Licence | MIT for `better-auth` and every package in its tree, except `@opentelemetry/semantic-conventions` (Apache-2.0, permissive) | lockfile resolved in scratch (`npm install --package-lock-only --ignore-scripts` in an empty scratch folder, **not** in the repo) |
| Tree | **22 packages** in total: `better-auth`, `@better-auth/{core,utils,telemetry,kysely-adapter,memory-adapter,drizzle-adapter,prisma-adapter,mongo-adapter}`, `@better-fetch/fetch`, `better-call`, `kysely` 0.29.6, `zod` 4.6.7, `jose` 6.2.12, `@noble/hashes`, `@noble/ciphers`, `nanostores`, `defu`, `rou3`, `set-cookie-parser`, `@standard-schema/spec`, `@opentelemetry/semantic-conventions` | same lockfile |
| Install footprint | about **26 MB unpacked** (sum of `dist.unpackedSize`). The big three: `@opentelemetry/semantic-conventions` 12.0 MB, `zod` 6.1 MB, `better-auth` 2.1 MB. The server bundle will be much smaller, which the spike measures | `npm view <pkg>@<ver> dist.unpackedSize` per package |
| Install scripts | **none** in the tree | `hasInstallScript` in the lockfile |
| Known vulnerabilities | **0** | `npm audit --package-lock-only` on that lockfile |
| Peers | `next ^14‖^15‖^16`, `react ^18‖^19`, `pg ^8` (all optional). We have next ^16.4.0 and react ^19.2.0 | `npm view better-auth peerDependencies peerDependenciesMeta` |
| Overlap with what we have | `zod` 4.1.11 and `jose` are already in `node_modules` (transitively, via `vercel` and others). npm may dedupe or nest them | `ls node_modules` |

## What I read in the package source (1.7.10, unpacked in scratch)
These matter for the privacy gate. Each one is a setting the code must make, and the spike must test.
1. **Telemetry is off by default.** `@better-auth/telemetry` sends only if `BETTER_AUTH_TELEMETRY=true` or `options.telemetry.enabled` is true, *and* an endpoint is set. We set `telemetry: { enabled: false }` explicitly and never set those variables.
2. **Sessions store the IP and user agent by default** (`internal-adapter.mjs`: `ipAddress: getIP(headers)`, `userAgent: headers.get("user-agent")`). The gate forbids IP and device data (P1.1). `advanced.ipAddress.disableIpTracking` stops the IP, but in `rate-limiter/index.mjs` it also turns the built-in rate limiter off. My plan is in EDD-008 §6.3: blank both fields in a `session.create.before` hook, and add a database `CHECK` so a stored value is impossible.
3. **The user table requires `name`.** The magic-link plugin writes `name: ""` on sign-up. We keep the column, always empty, with `CHECK (name = '')`. `image` is optional and gets `CHECK (image IS NULL)`.
4. **Magic-link tokens are stored in plain text by default** (`storeToken: "plain"`) and last 300 s. We set `storeToken: "hashed"` and keep 300 s.
5. **Sign-up happens on the first click of the link** (`createUser` inside `/magic-link/verify`), so the age band must be known by then. EDD-008 §6.2 says how: a short-lived `signup_intent` row keyed by the token hash.
6. **Rate limits:** the plugin's rule is 5 requests per 60 s per IP on `/sign-in/magic-link` and `/magic-link/verify`. The default store is in memory, per function instance, so the IP never reaches the database. We do not enable `storage: "database"`, because that would write IP-keyed rows.

## Options considered
| Option | For | Against |
|---|---|---|
| **A. `better-auth` 1.7.10, exact pin, magic-link plugin only** | Stable line, MIT, tables live in our database, no password, no third-party origin in the browser | 22-package tree; very fast release cadence (three patches in a day); library defaults that the gate rejects (2 to 4 above) must be overridden |
| B. `next-auth` 5.0.0-beta.32 | Long history | Beta for Next 16 (f01-options.md). The named fallback if the spike fails |
| C. Hand-rolled magic link (`crypto`, our own tables) | 0 dependencies | Session, CSRF, cookie and token-handling code that we would have to review ourselves. More risk, not less |
| D. Neon "Managed Better Auth" (Neon Auth) | No library to host | Not what F-01 decided. Auth runs in Neon's service and schema, with `NEON_AUTH_*` variables. It moves the auth processor and needs its own review |

## Decision (proposed)
A. Add `better-auth` as a **runtime dependency, exact pin `1.7.10`** (no caret), in the spike branch only, after the principal engineer acknowledges this record. Conditions:
- Plugins used: `magicLink` only. No social providers, no `emailAndPassword`, no `anonymous` plugin (the gate refuses an anonymous server id, privacy-gate 2.1), no `organization`, no `admin`.
- Settings fixed in code and tested in the spike: `telemetry.enabled=false`; `storeToken: "hashed"`; `expiresIn: 300`; IP and user agent blanked (EDD-008 §6.3); rate-limit storage in memory; `user.deleteUser` endpoint off (deletion is our own transaction, EDD-008 §7); cookie path scoped to `/api/account` (ADR-008).
- Upgrades are deliberate: a patch bump is a tier-1 change with `npm audit` and a re-run of the auth tests. A minor bump (1.8) is reviewed against this list, because the defaults above could change.
- `npm audit` and the licence list are re-run on the real lockfile at install time and pasted into the spike report.

## Rests on
- The registry facts above (2026-10-15). Scratch evidence: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/acct/resolve/better-auth/package-lock.json` (temporary; the spike report keeps the numbers).
- Source reads of `better-auth@1.7.10`, `@better-auth/core@1.7.10` and `@better-auth/telemetry@1.7.10` (files named in the list above).
- [f01-options.md](../initiatives/first-light/f01-options.md) and the [privacy gate](../initiatives/first-light/privacy-gate.md) §2.2, P1.1, P1.2, P6.2.

## Revisit if
- The spike fails on Next 16.4 (then Auth.js v5, by a follow-up record, per the founder decision).
- A hook cannot blank the IP and user agent, or the cookie path cannot be scoped. Then I would patch around it or drop to option C, and either needs a new review.
- A 1.7.x patch changes a default listed above.
- `npm audit` reports a high or critical advisory in the tree.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| 22 packages and about 26 MB for one sign-in method is a big supply-chain surface | backend-engineer (self, raised for the principal engineer) | evidence | Open: answered so far only by exact pinning, no install scripts, 0 advisories, and audit at install. Option C is the alternative with no packages. The principal engineer decides whether this is enough |
| The release cadence is very fast (1.7.8, 1.7.9 and 1.7.10 within 24 h), so a pin goes stale quickly, and a minor could change privacy-relevant defaults | backend-engineer | evidence | Accepted: exact pin, and the 6-item settings list is re-checked on every minor upgrade |
| The library's defaults store IP and user agent, which the gate forbids | backend-engineer (from source) | evidence | Open, funded by the spike: hook plus DB `CHECK` (EDD-008 §6.3). If either fails, this record is wrong |
| Confidence on Better Auth on Next 16.4 is about 65% | backend-engineer (founder record) | evidence | Open with a trigger: the spike (W-1135) |

## Principal-engineer review (2026-10-15, W-1138)
**Acknowledged, with conditions** (principal-engineer, Kenji). `better-auth` 1.7.10, exact pin, may be installed in the SPIKE-002 worktree (`/home/user/s3c-acct`, branch `accounts`) only, after a fresh `npm ci` there (the current `node_modules` is hard-linked to the main checkout's). It does not reach the main branch until the conditions in the [review](../engineering/reviews/2026-10-15-accounts-f01-review.md) are met, the privacy review passes and `npm run verify` runs on the integrated tree.
- I read the 1.7.10 source and confirmed findings 2 to 5, with one widening: the sign-in body also accepts a caller-supplied `name`, which is stored in `auth_verification` before the `CHECK` can refuse it (review F1.2, condition C3).
- `auth.api.*` calls skip the library's rate limiter and `disabledPaths`. Exactly one HTTP entry may send a sign-in email, with its own limit (C2).
- Conditions for this record: C1 (clean install), C2, C3, C4 (lazy construction, build passes with no accounts variables), C9 (function size; browser bundle unchanged, no `better-auth/*` import in client code), C11 (audit and licences from the real lockfile).
- Objections: supply-chain surface **accepted risk** (answer in the review's objection table); cadence **accepted as written**; IP/UA **confirmed feasible in source, open until the spike test**; 65% on Next 16.4 **open with its trigger**.
