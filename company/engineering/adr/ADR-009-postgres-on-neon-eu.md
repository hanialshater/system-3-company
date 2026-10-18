# ADR-009: One Postgres database on Neon (Vercel Marketplace), Frankfurt, plain SQL migrations, no preview copies of learner rows

status: proposed (accepting it needs the phase-2 spike, W-1135, and the principal engineer's review with EDD-008)
date: 2026-10-15
deciders: founder (F-01, host and region), principal-engineer (architecture), privacy-reviewer (residency, backups, P1.4 and P1.7)
source: [founder F-01](../../decisions/2026-10-15-founder-f01-accounts.md) · [f01-options.md](../../initiatives/first-light/f01-options.md) · [EDD-008](../edd/EDD-008-accounts-and-server-progress.md) · [dependency record: pg](../../decisions/2026-10-15-dep-pg.md) · [env contract](../notes/2026-10-15-accounts-env-contract.md)

## Context
Accounts (ADR-008) and server-side progress need a database. Until now the company kept no learner data on any server, and the repository is the memory ([decision on memory](../../decisions/2026-10-14-lesson-bundler-and-memory.md), option B). A database here is **learner data, not company memory**: no record, claim or manifest moves into it.

## Decision
1. **Host:** Neon Postgres, added through the Vercel Marketplace (the "Vercel-Managed Integration"; billing on the Vercel invoice). Region **`aws-eu-central-1` (Frankfurt)**. Vercel functions that touch it run in **`fra1`**.
2. **Driver:** `pg` 8.23.1. The runtime uses `DATABASE_URL` (pooled through PgBouncer); migrations use `DATABASE_URL_UNPOOLED` (direct). The pool is `max` 3 with a 10 s idle timeout.
3. **Migrations:** numbered plain `.sql` files in `db/migrations/`, applied by `tools/db-migrate.mjs` (about 50 lines, uses `pg`, records versions in `schema_migrations`). An engineer runs them by hand against a named branch. **They never run in the Vercel build step.** A build that changes a production schema would be a deploy-time data change without a review. Each migration's schema diff goes to the privacy reviewer before merge (privacy gate E7).
4. **Environments** (rewritten 2026-10-17 for the principal engineer's C8, from the founder's 10-15 correction):
   - **Test: `first-light`**, the Neon resource connected to Vercel **Development and Preview**. Fake data and staff addresses only. Previews with `ACCOUNTS_ENABLED=on` stay behind Vercel Deployment Protection, and only staff sign up there. Migrations are applied to it by hand with `tools/db-migrate.mjs` (Postgres 16 or newer, readiness A-14).
   - **Production: a separate Neon project**, created at go-live (W-1142) by backend-engineer with the release manager, in Frankfurt (`aws-eu-central-1`), connected to Vercel **Production only**. It is not a branch of `first-light`, and `first-light` is never a branch of it: separate counts only if no branch tree joins the two, because a branch, a reset or a restore can carry rows across.
   - **Preview branching off on both.** On the Production project it would give each preview a child branch holding real learner rows.
   - The readiness record (W-966, A-4) checks that no Preview or Development variable points at the Production project.
   - A local PostgreSQL 16 on the engineer's host is for tests (`npm run test:accounts` with `ACCOUNTS_TEST_DATABASE_URL`).
5. **Backups and restore:** Neon's point-in-time history window is the only backup. Neon's published plan table (read 2026-10-15) gives Free 6 hours, Launch up to 7 days, Scale up to 30 days. All of these are inside the gate's 35 days. No `pg_dump` leaves the database except in a restore drill, whose dump is deleted the same day. No long-lived child branches of production: Neon archives unused branches but does not delete them.
6. **Deletion survives a restore:** a `deleted_account` tombstone (random user id and time, no learner data) is kept 35 days. After any restore, the deletions in it are re-applied before traffic returns (EDD-008 §7).

## Consequences (good and bad)
- Good: one bill and one console for the founder, data in the EU, `pg_dump` as the exit, and plain SQL that the privacy reviewer can read against gate 2.2.
- Good: previews cannot see learner rows, so a preview bug or a team member's preview link leaks fake data at worst.
- Bad: functions in `fra1` add latency for learners far from Europe. Lesson pages are static and unaffected; only account calls pay it.
- Bad: the integration gives every Vercel team member who can install integrations Admin in the Neon organisation (Neon's FAQ). Access to learner data is then as wide as the Vercel team. That goes in the readiness record.
- Bad: no automatic preview branches means each schema change is applied by hand to the preview branch. That is slower, and it is on purpose.
- Bad: on the Free plan the restore window is 6 hours. Recovery from a bad migration found the next day would need a manual repair.

## Alternatives rejected and why
- **Neon direct (own account):** same database, a second bill, and the founder pastes the connection string by hand. Kept as the exit if the Marketplace link ever becomes a problem.
- **Supabase:** idle free projects pause, so Pro would be needed. It also brings its own auth, which we would not use.
- **Neon automatic preview branching:** it is what Neon recommends, but it copies production rows into every preview (gate watch-out in f01-options.md).
- **Running migrations in the build** (as Neon's guide suggests): it ties schema changes to deploys and skips the per-migration privacy read.
- **An ORM's migration tool:** a large dependency and a DSL in front of the SQL that the review is about.

## Principal-engineer review (2026-10-15, W-1138)
**Approved with changes** (principal-engineer, Kenji). Status stays `proposed` until SPIKE-002 passes **and** §4 is rewritten (C8). Decisions 1–3, 5 and 6 stand as written.
- **§4 no longer matches the setup.** Founder correction (same evening): the Neon database `first-light` is connected to **Development and Preview**, not Production, and is now the **test database** (fake data only). Rewrite §4 to say:
  - Test: `first-light`, Development + Preview, fake data only. Previews with accounts on stay behind Vercel Deployment Protection, and only staff sign up there.
  - Production: a **separate Neon project** in Frankfurt (not a branch of `first-light`, and `first-light` never a branch of it), connected to Production only, created at go-live by backend-engineer with the release manager. Being separate only counts if no branch tree joins the two, because a branch, reset or restore can carry rows across.
  - Preview branching off on both (the founder confirms for `first-light`).
  - Readiness (W-966) checks that no Preview or Development variable points at the Production project.
- Functions in `fra1` (decision 1) are not set anywhere today: `vercel.json` has no `regions`. The spike sets `preferredRegion = "fra1"` per account route and proves it with `x-vercel-id` (C6).
- Migrations: confirmed by hand only. Better Auth's CLI migrator is not used, and no DDL runs at run time (C10).
- Review: [2026-10-15-accounts-f01-review.md](../reviews/2026-10-15-accounts-f01-review.md)
