# EDD-008: Optional accounts and server-side progress (anonymous first, history kept on "Keep my history")

author: backend-engineer (Amara) · reviewers: principal-engineer (Kenji) + privacy-reviewer (Elif, W-965, data-model section §6–§10) · affected: growth-designer (age screen, E5), learner-model-engineer (progress shape), analytics-steward (recall rate, Q5), principal-engineer-ops (readiness) · tier: 2 (auth, learner data, new dependencies) · status: **proposed, draft 1 (2026-10-15)**. The data-model section is complete enough to review. Sections marked *spike* are filled by W-1135.
board: W-1135 (this), W-1008, W-965 (privacy review), W-966 (readiness) · decision: [founder F-01](../../decisions/2026-10-15-founder-f01-accounts.md) · ADRs: [ADR-008 auth](../adr/ADR-008-better-auth-magic-link.md), [ADR-009 database](../adr/ADR-009-postgres-on-neon-eu.md) · dependency records: [better-auth](../../decisions/2026-10-15-dep-better-auth.md), [pg](../../decisions/2026-10-15-dep-pg.md), [Resend, no SDK](../../decisions/2026-10-15-provider-resend-no-sdk.md) · env: [contract](../notes/2026-10-15-accounts-env-contract.md) · gate: [privacy-gate.md](../../initiatives/first-light/privacy-gate.md)

## Problem and why now
Progress lives only in one browser (`s3c:progress:v1`). It is lost when site data is cleared and does not follow a learner to another device, so spaced revisits break. The revisit recall rate also cannot be measured beyond one device. First Light (release 1, RC1 on 11-13) includes optional accounts. The founder decided F-01 on 10-15, and the critical path runs through this EDD (approval planned for 10-28).

## Goals / non-goals
- Goal: a learner who opts in keeps the same history on every device, and offline play keeps working.
- Goal: store exactly what privacy gate 2.2 allows, or less, with every column enforced by the database where possible.
- Goal: self-serve deletion (one transaction) and export (one JSON file).
- Goal: the revisit recall data exists per account in a form the analytics steward can query in aggregate (Q5).
- Non-goal: sign-in before or during the first lesson. Sign-in is offered only from the account entry point, never as a wall.
- Non-goal: under-13 accounts, parental consent, social features, reminders, personalization rules (settings arrive with F-19), and changes to the event beacon's fields (W-706).

## Current state (with measurements)
- `src/kit/progress.ts`: `ProgressMap = Record<slug, {completedAt?: number, predictedCorrectly?: boolean, recalls: {at: number, correct: boolean}[]}>`, times in epoch ms. The schedule is `[1, 3, 7, 21]` days.
- No cookies; the beacon carries no id (privacy gate §0). 0 server rows about any learner.
- No database, no auth library. Registry checks of the candidates: [better-auth record](../../decisions/2026-10-15-dep-better-auth.md), [pg record](../../decisions/2026-10-15-dep-pg.md).

## Options considered
Provider options and costs are in [f01-options.md](../../initiatives/first-light/f01-options.md) and are decided (F-01). The design options here:

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing: local only | 0 | No cross-device history; release-1 scope cut | n/a |
| Export and import a file only, no accounts | about 1 day | Weak: learners must move files by hand; recall rate stays unmeasurable | high |
| **Accounts with a union merge, progress as rows** (proposed) | about 8 to 10 days including reviews | Library defaults versus the gate (§6.3) | medium: tables and code can be dropped; the learner data must then be deleted |
| Accounts with progress as one JSON blob per user | slightly less code | No per-recall query for the recall rate; the merge happens in app code, so it is harder to prove idempotent | medium |

## Proposal (summary)
1. Anonymous play is unchanged: local only, no cookie, no server row (P1.2).
2. "Keep my history" → age screen (browser only) → email → magic link (300 s, single use) → account created with the band → merge offered with an explicit list of what moves, and a real "Don't import" choice (P1.3).
3. When signed in, local stays the source of truth on the device. Each update is also sent as a one-slug delta to `/api/account/progress`. On every load the full local map is merged both ways. Offline updates are not queued in a new storage key: the next full merge catches them, because the merge is idempotent.
4. The session cookie is scoped to `/api/account` (ADR-008), so the beacon and pages never carry it (P6.2).
5. `ACCOUNTS_ENABLED` is a run-time switch, default off.

---

## 6. Data model (for W-965 and the principal engineer)

### 6.1 Tables and columns

The gate's `account` table is Better Auth's user table, named `auth_user` here. Better Auth's own `account` model (links to sign-in methods) is named `auth_account`, so that the two are not confused. Times we copy from the browser are kept as **epoch milliseconds (`bigint`)**, so that export gives back exactly the numbers that were imported (P1.5) and de-duplication by `at` is exact.

| Table | Column | In gate 2.2? | Reason | Owner | Deletion path |
|---|---|---|---|---|---|
| `auth_user` | `id` (random text, from Better Auth) | yes, `user_id` | key | backend-engineer | account deletion (§7) |
| | `email` (unique, ≤ 254) | yes | sign-in, recovery | backend-engineer | §7 |
| | `age_band` (`13-15` or `16+`, NOT NULL) | yes | which mode applies (teen mode = `13-15`) | backend-engineer | §7 |
| | `policy_version`, `policy_accepted_at` | yes | proof of what was agreed | backend-engineer | §7 |
| | `last_sign_in_at` | yes | retention clock (P1.6) | backend-engineer | §7 |
| | `created_at` | yes | | backend-engineer | §7 |
| | `email_verified` (always true after a magic link) | **no, required by the library** | Better Auth's model | backend-engineer | §7 |
| | `updated_at` | **no, required by the library** | Better Auth's model | backend-engineer | §7 |
| | `name` | **no, required by the library**; forced empty: `CHECK (name = '')` | the magic-link plugin writes `""` | backend-engineer | §7 |
| | `image` | **no, optional in the library**; forced empty: `CHECK (image IS NULL)` | | backend-engineer | §7 |
| `auth_session` | `id`, `token`, `user_id`, `expires_at`, `created_at`, `updated_at` | **no** (the gate is silent on sessions) | staying signed in | backend-engineer | sign-out; expiry (30 days, Q8); §7 |
| | `ip_address`, `user_agent` | **no; forbidden** (P1.1). Kept only because the library writes them: `CHECK (coalesce(ip_address,'') = '')`, and the same for `user_agent` | | backend-engineer | n/a: always empty |
| `auth_account` | Better Auth's sign-in-method links | **no** | the library's model. Magic link should write **0 rows** (spike verifies). Token and password columns forced NULL by `CHECK` | backend-engineer | §7 |
| `auth_verification` | `id`, `identifier` (hash of the link token), `value` (JSON `{email, name:""}`), `expires_at`, `created_at`, `updated_at` | **no** | a pending sign-in link. Holds an email for at most 300 s, **before** an account may exist | backend-engineer | consumed on click; expired rows purged daily; §7 |
| `signup_intent` | `token_hash`, `age_band`, `policy_version`, `created_at`, `expires_at` | **no** (new, ours) | carries the band from the age screen to the moment the account is created (§6.2). **No email, no id** | backend-engineer | deleted on use; purged after 10 min |
| `progress` | `user_id`, `slug`, `completed_at_ms`, `predicted_correctly` | yes | spaced revisits across devices | backend-engineer (learner-model-engineer reads) | §7 |
| `recall` | `user_id`, `slug`, `at_ms`, `correct` | yes (`recalls[{at, correct}]`, as rows) | revisits; the recall rate (Q5) | backend-engineer | §7 |
| `settings` | `user_id`, `personalization_on`, `subjects[]`, `less_of[]` | yes | stated choices | personalization-lead | §7. **Not in the first migration**: it ships with F-19 and gets its own schema diff |
| `deleted_account` | `user_id`, `deleted_at` | **no** (tombstone) | re-apply deletions after a point-in-time restore (ADR-009) | backend-engineer | purged after 35 days |
| `schema_migrations` | `version`, `applied_at` | no learner data | migration bookkeeping | backend-engineer | n/a |

**Not stored anywhere:** birth year, name, photo, phone, location, IP, user agent, device id, the option a learner chose, dwell, swipes, order shown, lesson version (not proposed: 2.2 does not list it), password, any anonymous id.

### 6.2 Sign-up and the age band (P2.1, P2.2)
1. The age screen asks for the birth **year** in the browser. The browser turns it into a band and forgets the year. `under-13` ends there: no email field, nothing sent, and the band is kept in `sessionStorage` for that tab so the screen does not invite an instant retry (P2.1). *Note for the reviewer: that is a new tab-scoped storage key, `s3c:ageband:session`, holding only the band.*
2. The learner enters an email. `POST /api/account/start {email, ageBand, policyVersion}`. The server rejects any band other than `13-15` or `16+`, then calls Better Auth's `signInMagicLink`.
3. In Better Auth's `sendMagicLink({email, url, token})` callback, we write `signup_intent(token_hash = sha256(token), age_band, policy_version, expires_at = now + 300 s)` and send the email. No email address goes into `signup_intent`.
4. On the click, Better Auth creates the user. Our `databaseHooks.user.create.before` hook hashes the token from the request, reads and deletes the intent, and sets `age_band`, `policy_version` and `policy_accepted_at`. **No intent means no user**: the hook throws, and `age_band NOT NULL` is the backstop. *Spike: confirm the hook can read the verify request's token.*
5. An existing account signing in ignores the band and the intent, which is deleted or expires.

**Turning 16.** The year is discarded, so the server cannot know when a teen turns 16. A `13-15` learner can move themselves to `16+` from the account view by answering the year screen again. The band never moves down automatically. (Q6)

### 6.3 What the library wants that the gate forbids, and how each is held down
| Library default (1.7.10 source) | Gate row | Hold-down | Proof |
|---|---|---|---|
| Session stores IP and user agent | P1.1 | `databaseHooks.session.create.before` blanks both; DB `CHECK` rejects any value | spike test: insert attempt with a value fails; the stored session has empty fields |
| `advanced.ipAddress.disableIpTracking` also disables rate limiting | (abuse) | do not use it; the IP is used only in the in-memory limiter | spike: no `rateLimit` table exists |
| Magic-link token stored plain | security | `storeToken: "hashed"` | spike: `identifier` is not the token |
| `name` required | P1.1 | `CHECK (name = '')` | DB |
| Telemetry package present | P7.1 | off by default; also `telemetry: {enabled: false}` | spike network log: 0 requests outside Neon and Resend |
| Built-in `delete-user` endpoint | P1.4 | off; our §7 transaction instead | route test |

### 6.4 DDL (draft for review, migration `001_accounts.sql`; *spike* checks it against Better Auth's expected schema)
```sql
CREATE TABLE auth_user (
  id                 text PRIMARY KEY,
  email              text NOT NULL CHECK (length(email) <= 254),
  email_verified     boolean NOT NULL DEFAULT false,
  name               text NOT NULL DEFAULT '' CHECK (name = ''),
  image              text CHECK (image IS NULL),
  age_band           text NOT NULL CHECK (age_band IN ('13-15', '16+')),
  policy_version     text NOT NULL CHECK (length(policy_version) <= 32),
  policy_accepted_at timestamptz NOT NULL,
  last_sign_in_at    timestamptz NOT NULL DEFAULT now(),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX auth_user_email_lower ON auth_user (lower(email));

CREATE TABLE auth_session (
  id         text PRIMARY KEY,
  token      text NOT NULL UNIQUE,
  user_id    text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  ip_address text CHECK (coalesce(ip_address, '') = ''),
  user_agent text CHECK (coalesce(user_agent, '') = '')
);
CREATE INDEX auth_session_user ON auth_session (user_id);

CREATE TABLE auth_account (
  id text PRIMARY KEY, account_id text NOT NULL, provider_id text NOT NULL,
  user_id text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  access_token text, refresh_token text, id_token text,
  access_token_expires_at timestamptz, refresh_token_expires_at timestamptz,
  scope text, password text,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (access_token IS NULL AND refresh_token IS NULL AND id_token IS NULL AND password IS NULL)
);

CREATE TABLE auth_verification (
  id text PRIMARY KEY, identifier text NOT NULL, value text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX auth_verification_identifier ON auth_verification (identifier);

CREATE TABLE signup_intent (
  token_hash     text PRIMARY KEY,
  age_band       text NOT NULL CHECK (age_band IN ('13-15', '16+')),
  policy_version text NOT NULL CHECK (length(policy_version) <= 32),
  created_at     timestamptz NOT NULL DEFAULT now(),
  expires_at     timestamptz NOT NULL,
  CHECK (expires_at <= created_at + interval '10 minutes')
);

CREATE TABLE progress (
  user_id             text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  slug                text NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  completed_at_ms     bigint,
  predicted_correctly boolean,
  PRIMARY KEY (user_id, slug)
);

CREATE TABLE recall (
  user_id text   NOT NULL,
  slug    text   NOT NULL,
  at_ms   bigint NOT NULL,
  correct boolean NOT NULL,
  PRIMARY KEY (user_id, slug, at_ms),
  FOREIGN KEY (user_id, slug) REFERENCES progress(user_id, slug) ON DELETE CASCADE
);

CREATE TABLE deleted_account (
  user_id    text PRIMARY KEY,
  deleted_at timestamptz NOT NULL DEFAULT now()
);
```

---

## 7. Deletion: one transaction (P1.4)
Route: `POST /api/account/delete` (signed in, with a confirm step; at most 3 taps from the account view). In one transaction:
```sql
BEGIN;
SELECT email FROM auth_user WHERE id = $1 FOR UPDATE;           -- $email
INSERT INTO deleted_account (user_id) VALUES ($1);
DELETE FROM recall            WHERE user_id = $1;                -- counts returned to the learner
DELETE FROM progress          WHERE user_id = $1;
DELETE FROM auth_session      WHERE user_id = $1;
DELETE FROM auth_account      WHERE user_id = $1;
DELETE FROM auth_verification WHERE (value::jsonb ->> 'email') = $email;  -- pending links
DELETE FROM auth_user         WHERE id = $1;                     -- cascades are the backstop
COMMIT;
```
- The response names what was deleted ("your account, 41 lessons, 63 recalls, 2 signed-in devices") and clears the cookie. Local data is left alone unless the learner ticks "also clear this device" (gate 2.4).
- The auth provider is us, so "the auth-provider record gone" is the `auth_user` row.
- Afterwards, sign-in with the same email creates a new, empty account; the old id is never reused (random).
- **The query script for the privacy reviewer** (`tools/db-deletion-check.mjs`, *spike*): for a given id and email, a count over every table → all 0, except `deleted_account` = 1.
- **After a restore**: before traffic returns, `DELETE FROM auth_user WHERE id IN (SELECT user_id FROM deleted_account)`. That is the only use of the tombstone.
- **Outside the database:** Resend keeps its own log of sent emails, and Vercel keeps request logs with the link URLs. Neither can be cleared by this transaction. They are listed in §10 with their retention. Retention for both is unverified.

## 8. The merge on "Keep my history" (gate 2.3)
- Route: `POST /api/account/merge` with the local `ProgressMap`. It runs only after sign-in, with the band stored. The screen first lists what moves (lessons completed, recalls), and "Don't import" leaves the account empty and local data in place. The local event log (`s3c:events:v1`) is never sent.
- Validation: body ≤ 1 MB; ≤ 5,000 slugs; each slug must be in the current catalog (others dropped); ≤ 100 recalls per slug (the newest kept); times between 2026-01-01 and now + 1 day; booleans only; unknown keys dropped.
- One transaction, union semantics:
```sql
INSERT INTO progress (user_id, slug, completed_at_ms, predicted_correctly)
SELECT $1, x.slug, x.completed_at_ms, x.predicted_correctly
FROM jsonb_to_recordset($2) AS x(slug text, completed_at_ms bigint, predicted_correctly boolean)
ON CONFLICT (user_id, slug) DO UPDATE SET
  completed_at_ms     = LEAST(progress.completed_at_ms, EXCLUDED.completed_at_ms),   -- LEAST ignores NULL: earliest wins
  predicted_correctly = COALESCE(progress.predicted_correctly, EXCLUDED.predicted_correctly); -- never overwrites (Q7)

INSERT INTO recall (user_id, slug, at_ms, correct)
SELECT $1, r.slug, r.at_ms, r.correct
FROM jsonb_to_recordset($3) AS r(slug text, at_ms bigint, correct boolean)
ON CONFLICT DO NOTHING;                                                              -- de-duplicated by at
```
- The response is the merged map, and the client writes it locally (the same union), so a second device converges both ways. Running the merge twice gives the same rows (idempotent). Nothing is ever deleted or lowered.
- A failed upload keeps the local copy and shows a retry (Q1.5).

## 9. Export and retention
**Export** (`GET /api/account/export`, signed in) gives one file, `system3-history.json`:
```json
{ "format": "s3c-export-v1", "exportedAt": "…",
  "account":  { "email": "…", "ageBand": "13-15", "createdAt": "…", "lastSignInAt": "…", "policyVersion": "…", "policyAcceptedAt": "…" },
  "sessions": [ { "createdAt": "…", "expiresAt": "…" } ],
  "progress": { "<slug>": { "completedAt": 0, "predictedCorrectly": true, "recalls": [ { "at": 0, "correct": true } ] } } }
```
`progress` has exactly the shape of `s3c:progress:v1`, so importing the file into a fresh browser gives the same history (P1.5). The account view gets an "import a file" control that writes it locally. Beacon events are not in it, because none are tied to the learner (gate 2.4).

**Retention** (P1.6):
| Data | Kept | Then |
|---|---|---|
| `auth_user`, `progress`, `recall` (and `settings`) | while the account lives | deleted by the learner (§7), or after **24 months** with no sign-in. The notice is Q3 |
| `auth_session` | until sign-out or expiry (30 days, refreshed at most daily on use; Q8) | expired rows purged daily |
| `auth_verification` | 300 s, or until clicked | purged daily |
| `signup_intent` | 300 s (hard cap 10 min) | deleted on use, purged daily |
| `deleted_account` | 35 days | purged |
| Neon point-in-time history (the only backup) | Free 6 h · Launch ≤ 7 d · Scale ≤ 30 d (Neon plans page, read 2026-10-15) | rolls off, so **always inside 35 days** on any plan |
| Restore-drill dumps | same day | deleted. No other dumps exist |
| Neon branches | Production: the default branch only. Preview: schema-only, fake data | no child branch of production lives past a drill day |
| Vercel request and function logs | unverified (E13, principal-engineer-ops) | we log no email, no token, no body |
| Resend sent-mail log | unverified | counsel and founder (F-25) |

The daily purge runs as one SQL statement. It is triggered either by a Vercel Cron job (deploy config, so platform-engineer and the release manager) or by the first sign-in request each day; the spike picks one.

## 10. Processors (P1.7)
| Processor | Role | What it receives | Where | DPA status |
|---|---|---|---|---|
| **Vercel** | host, functions (`fra1`), logs, env vars | every request: IP, user agent, path **including the sign-in link token** in the query string, the session cookie on `/api/account/*`, request bodies (email at start; the progress map at merge) in function memory. Logs hold what Vercel records plus what we print, and we print no email, token or body. Holds the secrets | functions in Frankfurt; edge and logs global (unverified) | **unverified, not reviewed**: counsel (F-25) |
| **Neon** (via the Vercel Marketplace) | database | every row in §6.1, connection metadata, the restore history | `aws-eu-central-1` Frankfurt (Neon is itself on AWS) | **unverified, not reviewed**: counsel. Note: billing and contract run through Vercel; check which DPA applies |
| **Resend** | email sender | the email address, the sign-in link (token), the sender address; delivery events | **unknown** (possibly US): counsel | **unverified, not reviewed**: counsel |
| Better Auth | a library running inside our functions; **not a processor** | nothing: telemetry off (§6.3) | n/a | n/a |

P1.7 fails on "unknown" today. The three DPA rows can pass only after counsel reads them.

---

## Measurements that will show it worked (committed before implementation)
| Metric | Now | Target | Command (*spike* writes them) |
|---|---|---|---|
| Server rows and cookies for an anonymous session with history | 0 / 0 | 0 / 0 | network log + `tools/db-deletion-check.mjs --all-counts` |
| Requests to `/api/events` carrying a `Cookie` header while signed in | n/a | 0 | QA network log (P6.2) |
| Rows for a user after deletion, across every table | n/a | 0 (`deleted_account` 1) | `tools/db-deletion-check.mjs <id> <email>` |
| Merge idempotence: rows after merging the same map twice | n/a | identical | `node --test tests/accounts/merge.test.mjs` |
| Export, then import into a fresh browser, then compare | n/a | byte-identical `ProgressMap` | same suite |
| Under-13 path: rows and emails | n/a | 0 / 0 | script (P2.2) |
| `ip_address` or `user_agent` non-empty in `auth_session` | n/a | 0 (and an insert with a value fails) | SQL |
| p95 of `/api/account/me` from `fra1`, warm | n/a | under 300 ms | spike |
| Cold-start DB connect | n/a | under 1 s | spike |

would_be_wrong_if: a hook cannot blank the IP and user agent; the cookie path cannot be scoped; the user-create hook cannot see the verify token (§6.2); Better Auth refuses the renamed tables; or counsel rejects a processor.

## Operational readiness (sections 1–7, answered once here; draft)
1. **What can fail:** Neon unreachable or cold (sign-in and sync fail; lessons and local progress unaffected); Resend down (no sign-in links); a bad migration; the session secret leaking.
2. **How we would know:** 5xx on `/api/account/*` in Vercel logs; a failing synthetic sign-in on a preview; Resend's delivery dashboard. *Spike: the alert route, with principal-engineer-ops.*
3. **How to roll back:** `ACCOUNTS_ENABLED=off` (run time, no rebuild). Schema: every migration has a `down` that is tested on the preview branch. Data: Neon restore inside its window, then the tombstone replay (§7).
4. **Capacity:** about 6 KB per active learner (10k ≈ 60 MB, inside Neon Free's 1 GB storage per project; plans page). Free compute is 100 CU-hours per project per month. *Spike measures per-request cost.* Resend's free quota is unverified.
5. **Security:** a secret per environment; the cookie is `HttpOnly`, `Secure`, `__Secure-`, path-scoped, `SameSite=Lax`; CSRF via Better Auth's origin check; tokens hashed; rate limit 5 per minute per IP (in memory). Session tokens sit in the database in plain form, so database access equals session access. Every Vercel member who can install integrations is Admin in Neon (Neon FAQ).
6. **Data:** §6 to §10.
7. **Risks** (to propose to principal-engineer-ops for risks.json): R-a, the library's defaults return on upgrade; R-b, preview or development is wired to the production database; R-c, DPAs not reviewed by RC1.

## Rollout and rollback
1. Spike (W-1135, phase 2): local Postgres 16, then a schema-only Neon branch, on a preview with `ACCOUNTS_ENABLED=on` for preview only. Production stays off.
2. EDD review (principal-engineer) and data-model review (privacy-reviewer) in parallel, then the readiness record (principal-engineer-ops approves; not me).
3. Migration `001` applied to production by hand, with accounts off. The founder approves the deploy (release manager).
4. Turn on for production only after the P1 and P2 rows pass. Rollback is step 3 of readiness.

## Open questions and objections
| # | Question | For | Status |
|---|---|---|---|
| Q1 | Is the Neon setup Production-only, with no prefix, Preview branching off and no Neon Auth (env contract §3)? | founder, via chief-of-staff | open: needed **today**, while the setup is happening |
| Q2 | The library and the design add columns and tables not in gate 2.2: `email_verified`, `updated_at`, an always-empty `name` and `image`, `auth_session`, `auth_account` (expected empty), `auth_verification` (an email for ≤ 300 s before an account exists), `signup_intent` (band and token hash, no email), `deleted_account` (random id, 35 days). Pass, or which to cut? | privacy-reviewer | open (W-965) |
| Q3 | P1.6 wants a notice before deleting a 24-month-idle account, and P1.8 allows sign-in and recovery mail only. Is the notice allowed, or do we delete without a notice? | privacy-reviewer | open |
| Q4 | Deletion needs a signed-in session plus a confirm tap, and no confirmation email (that would be a new email use). Enough? | privacy-reviewer | open |
| Q5 | The revisit recall rate can be computed from `recall` (correct over total, by interval). Is an aggregate query across accounts a new purpose that needs a review? What should be measured is not mine to decide | analytics-steward, then privacy-reviewer | open |
| Q6 | "Turning 16" is self-service from the account view, and the band never moves down. OK? | privacy-reviewer; growth-designer (E5) | open |
| Q7 | Merge keeps the account's `predicted_correctly` if it already has one (strict "never overwrites"), even when the device's completion is earlier | privacy-reviewer, learner-model-engineer | open |
| Q8 | Session length is 30 days, the same for teen mode | privacy-reviewer | open |
| Q9 | Signed-in UI is client-rendered, because the cookie never reaches page paths (ADR-008) | principal-engineer | open |
| Q10 | Resend's region, log retention and DPA; Vercel's log retention | founder with counsel (F-25); principal-engineer-ops (E13) | open |

**Objections:** none raised yet by a reviewer. My own, carried from the founder record: confidence about 65% on Better Auth on Next 16.4 (the spike decides), and every vendor fact that I marked unverified.

## Principal-engineer review (2026-10-15, W-1138)
**Architecture: approve with changes** (principal-engineer, Kenji). The data model (§6–§10) is **not** decided here; it is the privacy reviewer's (W-965 / W-1139). Conditions C1–C11 in the [review](../reviews/2026-10-15-accounts-f01-review.md). For the architecture:
- §6.2: the hook path works in principle (hooks receive the endpoint context with `query.token`). Only one door may send sign-in mail (C2), no `name` is accepted (C3), and `sendMagicLink` refuses to send without a valid band.
- Proposal 5: `ACCOUNTS_ENABLED` is run-time only if it is read in handlers and the UI follows `/api/account/me` (C5). Build and routes must work with **no** accounts variables set (C4); Production has none until go-live.
- §9 purge: run the expired-row delete inside `start`, with no cron (C10).
- Proposal 3: one full merge per tab session, not per page load.
- Q9: **accepted**.
- Rollout step 3 now needs a **new Production database** (separate Neon project) first. `first-light` is the test database (founder correction; ADR-009 C8).
