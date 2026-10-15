# Accounts: the environment-variable contract (names only, never values)

backend-engineer (Amara) · 2026-10-15 · board W-1135 · for: founder and chief-of-staff (setup today), platform-engineer and release-manager (later), principal-engineer-ops (readiness)
design: [ADR-008](../adr/ADR-008-better-auth-magic-link.md), [ADR-009](../adr/ADR-009-postgres-on-neon-eu.md), [EDD-008](../edd/EDD-008-accounts-and-server-progress.md)

Engineers never see or handle secret values. Values live only in Vercel's environment-variable settings. Code reads the names below and nothing else.

## 1. Read by our code

| Name | Created by | Secret? | Vercel environments | Read where | What it is |
|---|---|---|---|---|---|
| `DATABASE_URL` | Neon integration (automatic) | yes | **Production only** (see 3) | `src/lib/server/db.ts` (runtime) | pooled (PgBouncer) connection string |
| `DATABASE_URL_UNPOOLED` | Neon integration (automatic) | yes | Production only | `tools/db-migrate.mjs` only, run by an engineer, never at runtime | direct connection string, for migrations |
| `BETTER_AUTH_SECRET` | **founder**, by hand | yes | Production; a **different** value for Preview when the spike needs it | `src/lib/server/auth.ts` | signing and encryption key. At least 32 random characters from a password manager's generator. Rotation later uses `BETTER_AUTH_SECRETS` (Better Auth's documented roll-over name), which nothing reads yet |
| `BETTER_AUTH_URL` | **founder**, by hand | no | Production only | `src/lib/server/auth.ts` | the canonical site URL, for example `https://<project>.vercel.app` until the own domain exists (F-23). Magic links are built from it. On previews Better Auth falls back to Vercel's `VERCEL_URL` |
| `RESEND_API_KEY` | **founder** (Resend dashboard, then paste), or the Resend Vercel integration | yes | Production; a separate key for Preview if needed | `src/lib/server/email.ts` | key with **sending access only** |
| `EMAIL_FROM` | **founder**, by hand | no | Production and Preview | `src/lib/server/email.ts` | placeholder until F-23. With no own domain, Resend's shared test sender only delivers to the Resend account owner's address |
| `ACCOUNTS_ENABLED` | release-manager, when the founder approves | no | any | `src/lib/server/accounts-flag.ts`, read at **run time** | `on` or anything else (= off). Default off. Off means every `/api/account/*` route is 404 and sign-in is hidden |

System variables we read (Vercel sets them): `VERCEL_ENV`, `VERCEL_URL`.

## 2. Created by the Neon integration, deliberately not read

`PGHOST`, `PGHOST_UNPOOLED`, `PGUSER`, `PGDATABASE`, `PGPASSWORD` and the legacy `POSTGRES_*` set. The code always passes `connectionString` explicitly, because `pg` would otherwise pick up `PG*` silently (dependency record for `pg`).

**Must not appear:** `NEON_AUTH_BASE_URL` or `VITE_NEON_AUTH_URL`. They mean Neon's "Managed Better Auth" was switched on, which is a different auth processor from the one F-01 decided.

## 3. What the founder's setup must produce (checklist for the chief of staff)

1. Neon, added from Vercel → Storage, **region Frankfurt (`aws-eu-central-1`)**, Free plan.
2. **No environment-variable prefix.** The code reads `DATABASE_URL`. If a prefix was set, tell backend-engineer which one; do not rename by hand.
3. Connect the project to the **Production** environment only. Leave **Preview and Development unticked**, and leave **Preview branching off**. If Preview were ticked, every preview build would share the production database; with branching on, every preview would get a copy of the production rows.
4. Do **not** enable Neon Auth ("Managed Better Auth").
5. Vercel → Settings → Functions → region **Frankfurt (`fra1`)**, if the plan allows it from the dashboard. Otherwise platform-engineer sets `regions` in `vercel.json` later. That is deploy config and goes through the release manager.
6. Resend: an account, an API key with **sending access only**, pasted into Vercel as `RESEND_API_KEY` (Production). In Resend's domain settings, **open and click tracking off**.
7. By hand in Vercel: `BETTER_AUTH_SECRET` (Production), `BETTER_AUTH_URL` (Production), `EMAIL_FROM` (Production).
8. Do not set `ACCOUNTS_ENABLED` yet.

## 4. What I could not check (the proxy blocked vercel.com, neon.com, resend.com and better-auth.com)

| Item | Status |
|---|---|
| Neon integration variable names | **checked** against Neon's docs source on GitHub (`neondatabase/website`, `content/docs/guides/vercel-managed-integration.md`, updatedOn 2026-10-09): `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, legacy `POSTGRES_*`, `NEON_AUTH_*` |
| Neon region code and restore window per plan | **checked** in the same repository (`introduction/regions.md`, `introduction/plans.md`) |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRETS` | **checked** in Better Auth's docs source on GitHub (`docs/content/docs/installation.mdx`) and in the 1.7.10 package source, which also falls back to `VERCEL_URL` |
| `RESEND_API_KEY` | **checked** as the SDK's default name (`resend/resend-node`). **Not checked:** whether the Resend Vercel integration uses the same name |
| Whether the Hobby plan lets the dashboard pick `fra1` | not checked |
| Whether the Neon integration ticks Preview and Development by default | not checked. Neon's guide only says you "choose" the environments |
| Vercel's function-log retention on our plan | not checked (owed to the inventory by principal-engineer-ops, privacy gate E13) |
