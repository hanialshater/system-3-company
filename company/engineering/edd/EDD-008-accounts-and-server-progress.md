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
| `auth_verification` | `id`, `identifier` (hash of the link token), `value` (JSON `{email, name:""}`), `expires_at`, `created_at`, `updated_at` | **no** | a pending sign-in link. Holds an email **before** an account may exist: the link dies after 300 s, and the expired row is removed at the next sign-in request by anyone (no cron; in a quiet period that can be hours or longer; M3). Never a name: hook plus `CHECK auth_verification_no_name` (M1) | backend-engineer | consumed on click; expired rows removed at the next `start`; §7 |
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
| `auth_session` | until sign-out or expiry (30 days, refreshed at most daily on use; Q8) | expired rows removed at the next sign-in request (M3) |
| `auth_verification` | the link works 300 s or until clicked; the row waits for the next sign-in request | removed at the next `start` (M3; `tools/db-deletion-check.mjs --oldest-expired` reports what waits, readiness A-15) |
| `signup_intent` | 300 s (hard cap 10 min by `CHECK`) | deleted on use; otherwise removed at the next `start` |
| `deleted_account` | 35 days | purged |
| Neon point-in-time history (the only backup) | Free 6 h · Launch ≤ 7 d · Scale ≤ 30 d (Neon plans page, read 2026-10-15) | rolls off, so **always inside 35 days** on any plan |
| Restore-drill dumps | same day | deleted. No other dumps exist |
| Neon branches | Production: the default branch only. Preview: schema-only, fake data | no child branch of production lives past a drill day |
| Vercel request and function logs | unverified (E13, principal-engineer-ops) | we log no email, no token, no body |
| Resend sent-mail log | unverified | counsel and founder (F-25) |

The purge of expired rows runs inside each `POST /api/account/start` (C10; principal ruling on M3: no cron in release 1). It is four indexed `DELETE`s (`PURGE_EXPIRED_SQL` in `src/lib/server/progress-store.ts`). So an expired row is removed at the next sign-in request by anyone, not at a fixed time. The 24-month idle purge (`src/lib/server/idle-purge.ts`) is written and tested but has no caller (M2).

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

## Addendum, 2026-10-17: the rebuild, likes and saves (PRD-005), and what changed from the text above

author: backend-engineer (Amara) · branch `accounts-1017` (the 10-16 branch `accounts` at 2f5c500 / 6ff15ba was never pushed and is lost; this is a rebuild from the records) · decision: [founder 2026-10-17](../../decisions/2026-10-17-founder-accounts-likes-saves.md) · product: [PRD-005](../../product/prds/PRD-005-likes-and-saves.md) · privacy ruling: `company/reviews/_privacy/2026-10-17-prd-005-likes-saves.md` (C1 to C6; on the privacy-reviewer's branch at the time of writing) · tier 2: needs the principal engineer's review and the privacy reviewer's schema read (migration 002) before merge.

### A1. Saves: merge semantics (PRD-005 backend Q2)
- **Signed in, the server is the source of truth. No tombstones.** A tombstone would store the fact that a learner unsaved a lesson (privacy C5.3). `DELETE /api/account/saves/<slug>` deletes the row and nothing else.
- **Anonymous:** saves live only in `s3c:saves:v1` (`{slug: savedAt}`) and make no request (C5.1). `setSaved` in `src/lib/account-client.ts` reads the `/me` answer it already has and never asks again.
- **"Keep my history" is a one-time union, and saves are their own line with their own choice** (C5.2). The client sends `saves` in the merge body only if the learner ticked that line; the server inserts with `ON CONFLICT DO NOTHING` and never deletes. When the server acknowledges, the device removes `s3c:saves:v1`.
- **While signed in nothing is written to `s3c:saves:v1`**, so sign-out leaves no account saves on a shared device (C5.3).
- Union semantics for progress are unchanged (§8). Saves do not follow §8's "never deletes" across devices: after the one-time import, the device holds no saves and asks the server.

### A2. The public count (PRD-005 backend Q3)
- **`COUNT(*)` per slug at read time, no counter column, no trigger.** `lesson_like` holds exactly `user_id, slug, created_at_ms` (privacy C6.1: any further column is a block), and a counter table would be a second store to keep true inside the deletion transaction. With rows only, unlike and deletion decrement the count by construction.
- The query joins `auth_user` and counts a like only if its account is at least 24 hours old (`created_at`, C3.1). Labels: below 10 `null`, then `10+`, `25+`, `50+`, `100+`, `250+`, `1k+` (C2.1). The raw number never leaves `countLabels` in `progress-store.ts`: not in a response, a cache or a log (C2.4, tested with 1,234 seeded likes).
- Caching is the CDN's: `cache-control: public, max-age=600, s-maxage=600` (C2.2). Index `lesson_like (slug)` keeps a 50-slug query to an index scan. Revisit the design (a materialised count rebuilt from rows) if `lesson_like` passes about a million rows.
- **Hide list:** `LIKE_COUNTS_HIDDEN` (comma-separated slugs, runtime config, no table, no learner field) makes a lesson's label `null` (C3.4). It is read per request like the other switches, so a change needs a redeploy (R3).
- **Off by default, twice:** `LIKE_COUNTS_PUBLIC` and `LIKES_SAVES_ENABLED` must both be `on` (and accounts), else `GET /api/likes/counts` is 404. C3.3: it stays off in production until the founder names a manipulation reviewer.

### A3. API shape as built (PRD-005 backend Q1)
| Route | Method | Who | Answer |
|---|---|---|---|
| `/api/account/likes/<slug>` | PUT, DELETE | signed in, `16+` only (13-15: 403, no row, C4.1); at most 60 writes per account per rolling day (429, hashed in-memory key, C3.2); Origin checked | 204; idempotent |
| `/api/account/saves/<slug>` | PUT, DELETE | signed in, any band; Origin checked | 204; idempotent |
| `/api/account/likes`, `/api/account/saves` | GET | signed in | `{likes: [{slug, at}]}` newest first, own rows only (C1.2) |
| `/api/likes/counts?slugs=a,b` | GET | anyone; outside `/api/account`, so the session cookie never reaches it | `{counts: {slug: label or null}}`, catalog slugs only, at most 50 |
All behind `LIKES_SAVES_ENABLED` (404 when off). `GET /api/account/me` adds `likesSaves` and `canLike` (false for 13-15; the UI must not say why, C4.2). Export adds `likes` and `saves`; deletion removes both in the same transaction and names the numbers; `tools/db-deletion-check.mjs` counts both (C6.2). No beacon change (C6.3).

### A4. What the rebuild does differently from the text above, and why
1. **No full upload on every load.** Proposal 3 merged the whole local map both ways on every load. That would undo "Don't import" on the next page load. As built: the device's earlier history goes up only through the explicit merge (`POST /api/account/merge`, after the "what moves" screen); every page load while signed in pulls the account map into the device (server to device); each local update is pushed as a one-slug delta (`PUT /api/account/progress`). A delta that fails offline is retried when the browser comes back online in the same page. **Cost:** a delta lost when the tab closes offline stays only on that device until the learner runs the merge again from the account view. learner-model-engineer and privacy-reviewer: say if that is not acceptable; the alternative needs a device-side "imported" marker (a new storage key). *(2026-10-18: the "one-slug delta" here was the slug's whole stored entry, principal review F3 / privacy P-1. Replaced by A6.2 and A6.3; the device marker now exists, A6.4.)*
2. **Library endpoints by allow-list.** Instead of `disabledPaths`, the mount at `/api/account/auth/*` forwards exactly two library endpoints: `GET /magic-link/verify` and `POST /sign-out`. Everything else (`/sign-in/magic-link` (C2), `update-user`, `get-session`, `delete-user`, `list-sessions`) is 404 (test 4).
3. **Export key `lastActiveAt`** instead of `lastSignInAt` (privacy re-read R-M2a: the value is "last sign-in or signed-in use, to the day"). The column keeps its name. R-M2b (the value read only by the idle clock and the export) is a test (S6).
4. **`/me` with accounts off answers a 404 the browser and CDN may keep for 5 minutes**, because `AccountSync` in the root layout asks once per page load. A redeploy (the only way the switch changes, R3) clears the CDN copy. *(2026-10-18: the browser half was false, because the client asked with `no-store`, principal review F1. Fixed in A6.1.)*
5. **`/magic-link/verify` limit is 30 per 60 s per IP now** (principal F-f, a go-live condition done early); `start` keeps 5 per 60 s per IP and per email.
6. **The personalization lane's `settings` table** (origin/perso-m1, its own migration, not in this branch): the export includes a `settings` block and the deletion transaction deletes its row **if the table exists**, and `db-deletion-check` counts it. The settings route can wire to `accountUserId`, `query` and `accountsEnabled`, all exported from `src/lib/server/account-route.ts`. No catch-all exists under `/api/account` (test S7). The settings API must not read `lesson_like` or `lesson_save` (PRD-005 Q4; enforced by `tests/platform/engagement-not-ranking.test.mjs`).
7. **Email has a console transport.** With no `RESEND_API_KEY` and not on a Vercel production deployment, the sign-in link (never the address) is printed to the server log. A production deployment with no key refuses to send. A key with no `EMAIL_FROM` refuses too.
8. **Auth refuses to construct** if any `BETTER_AUTH_TELEMETRY*` variable is set or `BETTER_AUTH_SECRET` is shorter than 32 characters (readiness A-5). The library logger prints the level and a SQLSTATE only (A-6, test 23).

### A5. Measurements (local PostgreSQL 16.15, 2026-10-17)
| Metric (from the table above) | Result |
|---|---|
| Rows for a user after deletion, every table | 0, `deleted_account` 1 (test 20, `accountCounts`) |
| Merge idempotence; two-device convergence | identical rows and answers (test 13) |
| Export, then compare with what was imported | deep-equal `ProgressMap` (test 19) |
| `ip_address` / `user_agent` non-empty | 0; a value insert fails with 23514 (tests 6, 7) |
| `auth_account` rows after magic-link sign-ups | 0 (tests 5, 26) |
| DDL at run time | none: the Postgres `log_statement=ddl` log shows only migration and test-setup statements |
| Feed order with random like/save rows | byte-identical (`engagement-not-ranking.test.mjs` (a)) |
| p95 `/me` in `fra1`, cold connect | not measured: needs a preview (A-10) |

## Addendum, 2026-10-18: the review fixes (principal review MC2, MC3, PC1 to PC4, PC7, PC8; privacy re-read P-1, P-2, M5)

author: backend-engineer (Amara) · branch `accounts-fix-1018` (from `7ed0a2c8e`) · answers: [principal merge review 2026-10-18](../reviews/2026-10-18-accounts-rebuild-review.md) (F1 to F7, MC2, MC3, PC1 to PC4, PC7, PC8) and `company/reviews/_privacy/2026-10-18-accounts-rebuild-reread.md` (P-1, P-2, the M5 note, scripts (a) and (b)) · tier 2: the principal engineer re-reads the diff, and the privacy reviewer re-reads P-1, P-2 and the new device key (A6.4). Not owed here: MC1 (`verify` with `qa`, chief of staff), MC4 (readiness approval, principal-engineer-ops), PC5 and PC6 (preview environment and region record).

### A6.1 Accounts off: the accepted list of differences from the app without accounts (MC3, principal F1)
"Accounts off equals today" holds except for these, which are **accepted** (principal merge decision 2026-10-18, F1: "none touches a learner's data, a lesson or the beacon"). Each was measured with every switch unset.
| # | Difference | Measured | Where |
|---|---|---|---|
| 1 | `GET /api/account/me` → 404, `cache-control: public, max-age=300, s-maxage=300`. **At most once per 5 minutes per browser**: the first ask of a page load now uses the HTTP cache (MC2), so a reload inside 5 minutes is answered from the browser's cache. Whether Vercel's CDN also answers it from `s-maxage` is unmeasured | real Chromium against `next start` of the off build: first load 1 network hit, reload 0; a `no-store` control fetch is seen as a 2nd hit (test 34, `tests/accounts/browser-me-cache.test.mjs`). Unit: the first ask has no `cache` option, `refresh` has `no-store` (C2) | `account-client.ts` `accountMe` |
| 2 | One async JS chunk after first paint on every page (`import("@/lib/account-client")`) | **2,594 B gzip** on this branch (was 1,761 B at the merge: the client now holds the merge and device code moved out of the kit, A6.8) | `AccountSync.tsx` |
| 3 | `/account` answers 200 "Accounts are not available here. Your progress stays on this device." (was 404). `noindex`, linked from nowhere. Follows from C5: the page may not read the switch | principal F1.3 | `AccountView.tsx` |
| 4 | First-load JS | principal, vs parent `7436cdcb9`: `/` +779 B, `/d/*` +625 B gzip -9. This branch vs `7ed0a2c8e` (same method, both built here): `/` **−106 B** (the kit's chunk 7,287 → 7,132 B), `/d/*` **+64 B** (two chunks +32 B each, neither holds kit or account code: id churn). No `/api/account`, `mergeIntoLocal` or library string in any first-load script | C9 |
| 5 | None other found. With accounts off nothing is read from or written to the device beyond what the kit did (no `s3c:account-device:v1`, no sink, no `online` listener), and a lesson update sends nothing (test C2). No cookie (tests 31, 34) | | |

### A6.2 Push only what the update added (PC1, privacy P-1)
- `src/kit/progress.ts` hands the sink the slug's entry **before and after** the update (`before` is a fresh read of storage, so the caller's function cannot change it). `progressDelta` in `account-client.ts` sends only: a `completedAt` that was not set before, a `predictedCorrectly` that was not set before, and recalls whose `at` was not there before. Nothing else, ever.
- **Consequences, by design:** replaying a lesson that is in the declined history sends nothing (its completion and prediction are the declined history); a new revisit on it sends that recall only, so the account can hold a `progress` row with no `completedAt` (revisitDue on another device then shows no revisit for it, which is the price of "Don't import"). A lesson first completed while signed in sends its completion and prediction.
- **No sync before the merge screen is answered.** Until the learner answers on `/account`, no sink is registered and nothing is pulled; plays stay on the device and become part of the device's own history the screen offers. Script (a) of the privacy re-read is test C4 (decline, then play: the account holds exactly the one new recall).

### A6.3 The merge screen (PC3, principal F5)
- **Counted before the pull.** When signed in and unanswered, the client reads the account's map (and saves list, if the device has saves) and counts only the device's history the account lacks (`movesAgainst`): lessons completed here and not there, recalls whose `at` the account does not hold, saves not saved there. Nothing is merged into the device until the answer. If there is nothing to offer, it records "nothing" and syncs without asking (test C5: a fresh device shows no screen; a partly shared device is offered only the difference).
- **One starter.** `startAccountSync` is called only by `AccountSync` in the root layout and runs once per page load (one memoised promise); `/account` reads the result with `accountState()`, which starts nothing (test C5: two concurrent callers get one run, one `/me`, one read; `accountState` alone makes no request).
- **Remembered.** The answer is kept in the device key (A6.4) for this sign-in on this device; a reload or another page asks nothing (tests C4, C5).

### A6.4 Shared devices: sign-out and a second account (PC2, privacy P-2)
- **New device key `s3c:account-device:v1`** (localStorage, written only while signed in): `{answer: "import" | "decline" | "nothing", own: <the device's own progress map at the moment the sync started>}`. It is never sent. It is what makes the answer remembered (PC3) and sign-out reversible (PC2). **This is a new device storage key: proposed inventory row D23 below; privacy-reviewer adds or refuses it; it blocks preview-on, not merge (it is never written with accounts off).**
- **Sign-out (safe default, pending the privacy ruling W-1710):** pending deltas are flushed, the server signs out, then the device's progress is put back to `own` and the key is removed. So **the account's pulled copy, and what was played while signed in (which went to the account), leave the device; the device's own pre-sign-in history stays as it was.** The account page now offers **"Also clear this device"** at sign-out (as it did at deletion): it also removes `s3c:progress:v1`, `s3c:events:v1`, `s3c:saves:v1` and the key. A failed sign-out changes nothing on the device (test C8). If W-1710 rules differently, only `endAccountOnDevice` and the sign-out copy change.
- **The session ending elsewhere** (expiry, cleared cookies): the next page load sees `signedIn: false` with the key present and does the same clean-up (test C7).
- **A new sign-in link over an active session** (a second learner, or a link someone mailed: principal F3's login-CSRF path): the link lands on `/account?signed-in=1`; the client reads that marker once, removes it from the address bar, and ends any previous account's state on the device before counting (test C7). So the second account's screen offers only the device's own history.
- **Deletion** does the same clean-up as sign-out; the delete copy now says the device keeps what it had before sign-in unless the box is ticked.
- An imported history file counts as the device's own history (it is merged into `own` too, so it survives sign-out).
- **Cost:** a delta that failed and was not retried before sign-out never reached the account and leaves the device with the account's copy. Sign-out flushes pending deltas first to make this rare.
- Script (b) of the privacy re-read is test C6: A plays and signs out (device back to its exact anonymous map); B signs in on the same profile, is offered only the anonymous history, plays the same lesson; B's rows hold B's two events and nothing of A's.

Proposed inventory row (for the privacy reviewer's `company/engineering/data-inventory.md` section 1; I do not edit that file):
| D23 | `s3c:account-device:v1` (localStorage): the merge answer and a copy of the device's own `s3c:progress:v1` from when the sync started | remember "Import / Don't import" for this sign-in (PC3), and restore the device's own history at sign-out so no account's history stays on a shared device (PC2) | learner's browser | nobody; never sent | while signed in on this device; removed at sign-out, at deletion, when the session is found ended, and when a new sign-in link lands | sign-out; "Also clear this device"; clear site data | as D1 | proposed (branch `accounts-fix-1018`). Owner: backend-engineer |

### A6.5 Server-side bounds (PC4, principal F6, F7)
- **Recall cap across requests:** after each insert, recalls beyond 100 per (account, slug) are deleted, oldest first (`CAP_RECALLS_SQL`, `progress-store.ts`). This is the only deletion in the union merge; a real learner stops at 4 correct recalls per lesson. The principal's probe (20 PUTs × 100 recalls) now leaves **100 rows**, the newest (test 28), and the same through merge.
- **Per-account limits:** `PUT /api/account/progress` 60 per 10 minutes, `POST /api/account/merge` 10 per hour; 429 after (test 28). In-memory and per instance, like the other limiters (principal F8: durable limits are a go-live item). The client drops a 429 delta (it is not retried).
- **Unlike and unsave of a retired lesson** delete the row (204); marking one is still refused (404). The like limiter still counts unlikes (privacy C3.2 counts writes; test 16). Test 29.

### A6.6 Engagement is not ranking (PC7, principal F14)
`tests/platform/engagement-not-ranking.test.mjs` (b) now names `account/likes` and `account/saves`, and a new check fails if any file outside `src/components/account/` imports `account-client` (static, dynamic or `require`), unless listed in `CLIENT_ALLOWED` with its decision record (empty today; the PRD-005 Like and Save controls join it when they exist). Both have planted-reader controls.

### A6.7 M5 note
`tests/accounts/better-auth-regression.json` named `better-auth-bump.test.mjs`, which does not exist in the rebuild; the guard is S14 in `tests/accounts/static.test.mjs`. The record now says so. Versions are unchanged.

### A6.8 The kit (PC8, principal F2)
`mergeIntoLocal` moved from `src/kit/progress.ts` into `src/lib/account-client.ts` (the account chunk). **The sink stays in the kit**, for one reason: `updateProgress` is the only path every progress write takes (protected `src/kit/Lesson.tsx` and `Feed.tsx` call it), so the hook that sees a change has to live there; it is three lines and does nothing while no sink is set. Re-measured: A6.1 row 4.

### A6.9 Tests added (all on local PostgreSQL 16.15 unless marked)
| Test | Condition |
|---|---|
| C1 `progressDelta`, `movesAgainst`, `unionMaps` (no database) | PC1, PC3 |
| C2 accounts off: one `/me`, HTTP cache allowed, device untouched, `refresh` is no-store (no database) | MC2, MC3 row 5 |
| C3 no merge code exported by the kit (no database) | PC8 |
| C4 privacy script (a): decline then play | PC1, P-1 |
| C5 count before the pull, one starter, page starts nothing, answer remembered | PC3 |
| C6 privacy script (b): two accounts on one profile | PC2, P-2 |
| C7 session ended elsewhere; new link over an active session | PC2, F3 login-CSRF path |
| C8 sign-out with "also clear this device"; failed sign-out; deletion | PC2 |
| 28 recall cap (20 × 100 probe) and per-account limits | PC4, F6 |
| 29 unlike/unsave of a retired lesson | PC4, F7 |
| 34 real Chromium, built server, accounts off: reload makes no second `/me` (needs `ACCOUNTS_BASE_URL`, `ACCOUNTS_EXPECT=off`, `ACCOUNTS_BROWSER=1`) | MC2 |
| engagement (b) PC7 importer scan + controls | PC7 |
The client tests run the real `account-client.ts` and `progress.ts` in Node (fresh module copies per simulated page load, `tests/accounts/client-loader.mjs`) against the real handlers. They are not a browser: the account page itself still has not been walked at 390×844 (privacy preview item 2).

## Addendum, 2026-10-18 (second): PC3 account binding, PC9, W-1714 Ruling 1, W-1711 cue

author: backend-engineer (Amara) · branch `accounts-pc3-1018` (from `a6333dd05`) · answers: the principal re-read ("Re-read 2026-10-18" in [the review](../reviews/2026-10-18-accounts-rebuild-review.md): PC3's open clause, probe 1, PC9, probe 2), readiness Ruling 1 (W-1714) and the privacy re-read section 3 (W-1711). Tier 2 (auth, learner device data): the principal engineer re-reads the diff; the privacy reviewer rules on the D23 change below; principal-engineer-ops reads the readiness addition. Nothing here is reachable with `ACCOUNTS_ENABLED` off (A6.1 row 5 is unchanged: `run()` returns before touching storage when `/me` is 404, test C2).

### A7.1 The device state names the account that answered (PC3, W-1716)
- **Gap (probe 1).** A6.4 detected a change of account only by the `?signed-in=1` marker. The marker is the link's `callbackURL`, a query parameter the link's holder can edit (the library's origin check accepts any same-origin path). An attacker's own link with `callbackURL=/` signed the victim into the attacker's account with no marker; the client kept the victim's device state, pulled the attacker's history and pushed the victim's next plays to the attacker.
- **Fix.** `GET /api/account/me`, signed in, now also returns `tag`: HMAC-SHA-256 of the account id under `BETTER_AUTH_SECRET`, first 16 bytes, base64url, 22 characters (`accountTag`, `src/lib/server/http.ts`). It is computed per request and stored nowhere on the server. The device state gains `account: <tag>`, written at every answer ("import", "decline", "nothing"). On each page load, signed in, `run()` ends the previous account on the device (A6.4 clean-up) and asks again if **either** the marker is present **or** the stored tag differs from `/me`'s (a missing tag, from a state written before this change, never matches). So any change of account behaves exactly like the marker: the device goes back to its own history, nothing is pulled, no sink is set and nothing is pushed until the new account's screen is answered.
- **Why a keyed hash and not the id or the email.** The client needs only "same account or not". The tag cannot be reversed, and without the secret it cannot be matched to an id or an email. It is the same on every device of one account, which is what "remembered for this account" needs; it is never sent back (no `fetch` reads the device key). A secret rotation changes every tag, so each signed-in device asks its merge question once more: safe failure, no data moves.
- **Not changed.** The marker still ends the previous state (C7); the merge screen still counts before the pull (C5).
- Tests: **C9** repeats probe 1 against the real handlers (the attacker's link with `callbackURL` edited to `/`, verify answers 302 to `/`, then a page load at `/`): merge screen, the device holds exactly its own history, no write before the answer, neither account's rows change; the answer is then remembered for the attacker's account, and A's session again without a marker is asked again; the tag is 22 base64url characters, differs per account and holds neither id nor email. **C9 and C10 fail on `a6333dd05`** (`syncing` true where false is expected), pass here. **C10**: a state with no `account` field asks again. **S17**: the tag is stable per account, differs between accounts and secrets.

### A7.2 `/account` remount after sign-out or deletion (PC9)
`forgetSession()` (sign-out, deletion) now sets `sessionReset`. After that, `accountState()` starts the memoised `startAccountSync()` itself if nothing is current, because `AccountSync` in the layout will not run again in this page load. Before any reset, `accountState()` still starts nothing (C5's assertion stands). Test **C11**: sign out, then `accountState()` (what `/account` calls when it remounts on Back) resolves to signed-out within 1 s; a second read makes no request; the same after deletion. It timed out on `a6333dd05`.

### A7.3 Library error codes in `logFailure` (W-1714, readiness Ruling 1)
`LOGGED_LIBRARY_CODES` in `http.ts` (frozen; today only `SCHEMA_MISMATCH`, with its reason in the comment). `logFailure` appends ` code=<CODE>` only when `err.code` is a string exactly equal to an entry; the message, findings, table or column names, cause and stack are never read for output. A throwing `code` getter is caught. The SQLSTATE rule is unchanged. The library's own background log stays `better-auth error` (Ruling 1 item 5; `auth.ts` unchanged). Test **S16**: an error built from the installed `@better-auth/core` `SchemaMismatchError` (its message names `auth_user`, `age_band`) logs exactly `account me: failed code=SCHEMA_MISMATCH`, directly and through the real `/me` handler; near misses, lower case, a trailing newline, a code with `@`, a pattern-like string, an array and an object whose `toString` returns the code all log no code. S8 and test 23 pass unchanged.

### A7.4 The login-CSRF cue (privacy re-read 3.1, 3.2; W-1711)
Wired with the reviewer's example words as placeholders for growth-designer: the merge heading is "Send this device's history to {email}?"; when the page load came by the marker, the line under the title reads "You are now signed in as {email}. If you did not just ask for this, sign out", with a Sign out button in the line (same handler as the main button, so the "Also clear this device" box applies). The marker flag lives only in the page's state for that page load (`fromLink`), nothing is stored. Not walked in a browser (the 390x844 walk is the privacy preview item 2). With A7.1, a link with the marker edited away still meets the merge screen naming the account, but without the notice line.

### A7.5 Tests now
`test:accounts` **61: 57 pass, 0 fail, 4 skipped** (built-server tests 31 to 34, run separately against `next start`, readiness addition below). New: C9, C10, C11, S16, S17.

Proposed change to inventory row D23 (privacy-reviewer's file; I do not edit it): see the readiness addition of the same date.
