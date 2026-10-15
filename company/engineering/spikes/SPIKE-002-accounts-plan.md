# SPIKE-002 (plan): Better Auth magic link + pg on Next 16.4, against the EDD-008 schema

owner: backend-engineer (Amara) · for: [EDD-008](../edd/EDD-008-accounts-and-server-progress.md), [ADR-008](../adr/ADR-008-better-auth-magic-link.md), [ADR-009](../adr/ADR-009-postgres-on-neon-eu.md) · board: W-1135 · date: 2026-10-15 · status: **planned (phase 2)**. Not started. Starts only after the principal engineer acknowledges the [better-auth](../../decisions/2026-10-15-dep-better-auth.md) and [pg](../../decisions/2026-10-15-dep-pg.md) records, and when the host has room for a build.
branch: `accounts` (worktree `/home/user/s3c-acct`). Nothing reaches production; `ACCOUNTS_ENABLED` stays unset there.

## Local database (no new installs needed)
Found on this host on 2026-10-15: PostgreSQL **16.15** binaries in `/usr/lib/postgresql/16/bin/` (`initdb`, `postgres`, `pg_ctl`, `psql`, `pg_dump`), and `/usr/bin/psql` (a wrapper). A system cluster `16/main` exists on port 5432, and it is **down**. Do not use it. Start a throwaway cluster in scratch instead:
```bash
D=<scratch>/acct/pg; /usr/lib/postgresql/16/bin/initdb -D $D/data -U spike --auth=trust
/usr/lib/postgresql/16/bin/pg_ctl -D $D/data -o "-p 55432 -k $D -c listen_addresses=''" -l $D/log start
# DATABASE_URL=postgresql://spike@/spike?host=$D&port=55432   (unix socket only, no TCP)
```
Stop it with `pg_ctl -D $D/data stop` and delete the folder at the end. Docker also exists, but is not needed. Neon's production version may be newer than 16. The DDL in EDD-008 §6.4 uses nothing version-specific; the spike re-runs the tests on a schema-only Neon branch before reporting.

## Questions the spike must answer (each one is a would_be_wrong_if in EDD-008)
1. Does Better Auth 1.7.10 run in a Next 16.4 route handler at `/api/account/auth/[...all]`, with `npm run build` passing?
2. Can the session cookie be scoped to `Path=/api/account` (`advanced.defaultCookieAttributes` or `advanced.cookies.session_token.attributes`), with sign-in, `getSession` and sign-out still working? Is `/api/events` sent with no `Cookie` header?
3. Does `databaseHooks.session.create.before` blank `ipAddress` and `userAgent`, and does the DB `CHECK` reject a non-empty value?
4. Can `databaseHooks.user.create.before` read the verify request's token, to find `signup_intent` (EDD-008 §6.2)? If not, what is the fallback? (Candidates: our own verify wrapper route; or a band carried in the callback URL and refused if missing.)
5. Does Better Auth accept the `auth_*` model names and snake_case field mapping against the hand-written DDL? Does magic link write 0 rows to `auth_account`?
6. Are tokens stored hashed (`storeToken: "hashed"`)? Are there 0 telemetry requests? Does no `rateLimit` table appear?
7. Merge, export and deletion tests from EDD-008 §7 to §9 pass, including idempotence and the export round trip.
8. Bundle size added to the server functions; cold-start connect time; `/api/account/me` p95 on a preview in `fra1`.
9. `npm audit` and the licence list on the real lockfile, pasted here.

## Not in the spike
The production database; any deploy beyond a preview the release manager runs; UI copy (growth-designer, E5); `settings` (F-19).
