# Data inventory

owner: privacy-reviewer (Elif) · first written 2026-10-16 (W-1166) · batch first-light/2026-10-16-round-1#3 · status: **draft 1, proposed.** The gate it serves (`company/initiatives/first-light/privacy-gate.md`) is itself still proposed until the founder takes it at the 10-23 review. I wrote this file and I do not approve it: the backend-engineer confirms the columns match the migration, and the founder (with counsel) owns the legal columns.

**What this is.** Every personal or learner datum the product stores or sends, today and in the release-1 design. Gate rows P1.1 and P7.2 read from it. Each row has a purpose, a place, a processor, a retention, a deletion path and a basis. **"unknown" means unknown, not "fine".**

**How it was built (what I read, and what I did not).** Code today: `src/kit/progress.ts`, `src/kit/types.ts`, `src/app/api/events/route.ts`, and a grep of `src/` for `localStorage`, `sessionStorage` and `document.cookie`. Release-1 design: EDD-008 §6 to §10 and my review of it (`company/reviews/_privacy/2026-10-16-edd-008-accounts.md`), and `db/migrations/001_accounts.up.sql` read with `git show accounts:` at commit `2f5c500` (md5 of the file `d45c09ff0c54449e69d3181359806826`). Not read: Better Auth's source, any live Vercel, Neon or Resend console, any DPA. I ran no tests. If `001_accounts.up.sql` changes after `2f5c500`, this file is stale until I re-read the diff (gate E7).

**Legal basis column.** I am not a lawyer and do not decide a basis (gate section 9, items 3 and 4). Each cell is **unknown (counsel, F-25)** followed by the *working description* of why we hold the datum, which counsel starts from. Nothing here may be quoted as "compliant".

**Owners** are roles. The owner answers for the datum's reason and its deletion path. Where the owner is "none on record", the row is a finding.

---

## 1. On the learner's device (never sent unless a row says so)

| # | Datum | Purpose | Stored where | Processed by | Retention | Deletion path | Legal basis | Status |
|---|---|---|---|---|---|---|---|---|
| D1 | `s3c:progress:v1` (localStorage): per lesson slug `completedAt`, `predictedCorrectly`, `recalls[{at, correct}]` | spaced revisits the learner asked for | learner's browser | nobody else (stays on the device); merged to the server only by D12 and D13 after sign-up | until the learner clears site data | clear site data in the browser. **No in-app control** (gap, see section 8). With an account: also D12 | unknown (counsel, F-25). Working description: storage strictly needed for the feature the learner uses; ePrivacy exemption to be confirmed (gate 6.2, 9.3) | live. Owner: learner-model-engineer (proposed, **no owner on record**) |
| D2 | `s3c:events:v1` (localStorage): last 500 events: type, slug, option, correct, spacedDays, dwellMs, at | **none found**: nothing in `src/` reads it (gate section 0, P6.5) | learner's browser | nobody | until site data is cleared (capped at 500) | clear site data | none, so none | **live finding, fails "every field has a reason".** Name a consumer or stop writing it. Owner: none. Never uploaded (EDD-008 §8) |
| D3 | `s3c:ageband:session` (sessionStorage), release-1 design: the band only (`under-13`, `13-15`, `16+`), so the age screen does not invite an instant retry | P2.1 | learner's tab | nobody | until the tab closes | closing the tab | unknown (counsel). Working description: needed to run the age screen | designed, not built. Owner: backend-engineer. The birth **year** is never written anywhere |
| D4 | Session cookie `__Secure-…`, `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/api/account`, 30 days, sliding | stay signed in | learner's browser; its token also sits in D8 | our functions (Vercel) | 30 days since last use, or sign-out | sign-out (must be one visible control, my review Q8), expiry, account deletion | unknown (counsel). Working description: strictly needed once the learner has signed in; set only after sign-in, never for anonymous visitors (P1.2) | designed, spike-tested, off by default (`ACCOUNTS_ENABLED`). Owner: backend-engineer |
| D5 | **Experiment markers** (proposed in PRD-003 R12 and PRD-004 §9, **not built, not yet ruled in the build**; ruling in `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`): `s3c:origin:v1` = per slug an origin enum (`swap` or `challenge`), and a local arm assignment (for PRD-004's 20% holdout) | measure whether swaps and challenges help first-revisit recall | learner's browser | nobody (only the enum values in D6 leave the device) | ruled: marker per slug removed once that lesson's first revisit is answered or 30 days after it was written; arm removed when the experiment closes | clear site data; the code removes them as stated | unknown (counsel). Working description: our own measurement of whether a feature works, no identifier | **not live.** Owner: analytics-steward (registers), growth-designer (builds). The marker shows on the device that a learner opened a friend's swap; shared devices exist |

### 1a. Saved lessons on the device (added 2026-10-18; PRD-005 ruling C5.5)

| # | Datum | Purpose | Stored where | Processed by | Retention | Deletion path | Legal basis | Status |
|---|---|---|---|---|---|---|---|---|
| D20 | `s3c:saves:v1` (localStorage): `{slug: savedAt}` for lessons an **anonymous** learner saved | let the learner find lessons they chose to keep | learner's browser | nobody else; 0 network requests on Save (C5.1). Sent only by the learner's own tap on "Keep my history" with the saves line ticked (`POST /api/account/merge`, `saves`), then removed from the device when the server acknowledges (C5.2). Not read by feed order, revisit selection or personalization (P3.3; `tests/platform/engagement-not-ranking.test.mjs`) | until the learner unsaves, imports, or clears site data. **Signed in, nothing is written here**, so sign-out leaves no account saves on a shared device (C5.3, test S15) | unsave; the merge acknowledgement; "Also clear this device" (`clearThisDevice` removes it); clear site data | unknown (counsel, F-25). Working description: a list the learner keeps for themselves | built (branch merge 29a75310d). Owner: backend-engineer (code), privacy-reviewer (inventory) |
| D23 | `s3c:account-device:v1` (localStorage): `{answer: "import" \| "decline" \| "nothing", account: <tag>, own: <a copy of the device's own D1 map from when the sync started>}`. `tag` is an opaque per-account value: the first 16 bytes of HMAC-SHA-256(BETTER_AUTH_SECRET, account id), base64url, 22 characters, returned by GET /api/account/me (no-store when accounts are on) and stored nowhere on the server. **Rotation:** changing `BETTER_AUTH_SECRET` signs every session out and removes every device's state (D23 included) before any tag is compared; rotating through Better Auth's versioned `BETTER_AUTH_SECRETS` leaves `BETTER_AUTH_SECRET`, and so every tag, unchanged. A rotation does not "change every tag" on a device that stays signed in (W-1917). It is **stable: the same on every device of one account** (a persistent pseudonymous identifier on the device, read only to tell whether the account now signed in is the one that answered). It is not the account id, not reversible without the secret, and holds no email. No email, no user id, no account id itself | remember "Import / Don't import" for this account on this device (a page load as a different account, told apart by the tag, asks again, PC3) (so the merge screen is not asked again and a decline is not undone) and put the device's own pre-sign-in history back at sign-out (so no account's history stays on a shared device) | learner's browser; **the tag alone also travels (PC10, ruled 2026-10-18, re-read section 4):** in one request header, `x-s3c-account`, same-origin, to the five account write routes only (progress, merge, saves, likes, delete). The server compares it with the value it derives from the session and drops it. Never in a body, URL, beacon, `/api/events`, `/api/likes/counts` or a third-party request; never logged, stored, cached or shown. The rest of D23 (answer, `own` copy) is never sent. Enforced by test S18 (tests/accounts/tag-scan.mjs). Conditions: section 4.1 of the re-read | while signed in on this device. Removed at sign-out, at deletion, when a page load finds the session ended, and when a new sign-in link lands on an active session. **If the learner never returns after the session ends, it stays until site data is cleared** (no timer on a device key). Never written with accounts off (C2) | sign-out; "Also clear this device" (`clearThisDevice` lists it); clear site data | as D1 (counsel, F-25). The copy adds no field D1 does not hold; the tag is a new pseudonymous identifier, local only (the server already holds the account). Counsel to be told it exists (F-25) | built (branch merge de5ff7013; tag in 27317e69b). Owner: backend-engineer (code), privacy-reviewer (inventory). **Ruled: added 2026-10-18** (re-read, section "Re-read of beb83bfd4"); `account` tag **accepted with conditions 2026-10-18** (re-read section 3.1); its travel in the PC10 header **accepted with conditions 2026-10-18** (section 4.1; code 96e8654fc, merged 98aa6092f) |

## 2. Sent to us with no account: the event beacon and the host's logs

| # | Datum | Purpose | Stored where | Processed by | Retention | Deletion path | Legal basis | Status |
|---|---|---|---|---|---|---|---|---|
| D6 | Beacon `POST /api/events` body today: `{type, slug, ...}` with `option`, `correct`, `spacedDays`, `dwellMs` by type; the server adds `at`. **The whole parsed body is logged, not only these fields** (route.ts line 17) | product analytics, aggregate | Vercel function log | Vercel | **unknown** (Vercel log retention, E13, run 4 has not landed) | **none by us.** The event has no identifier, so a single learner's events cannot be found or deleted | unknown (counsel). Working description: aggregate product measurement; no identifier | **live. Finding P6.1:** extra keys from any client land in the log verbatim. Owner: analytics-steward (meaning), backend-engineer (code) |
| D6a | Beacon, release-1 design: the same fields plus the one `exp` event (ruling above) | as D6 | as D6 | as D6 | as D6; P6.3 target: raw **at most 90 days** once W-706 persists events, then aggregates only. **Not set up.** Today there is no persistence by us | as D6 | as D6 | designed |
| D7 | Request metadata on every request: IP address, user agent, path (including the **sign-in link token** in the query string on the verify route), time; the session cookie on `/api/account/*`; **since accounts: every anonymous page load calls `/api/account/me`**, which writes no row but adds a request line with an IP (my review P1.2) | none of ours: it is the host's logging | Vercel platform logs | Vercel (global edge and logs, unverified); functions in Frankfurt **intended, not in place** (SPIKE-002 R1, G3) | **unknown**, pending E13 (principal-engineer-ops, run 4, not landed as of 2026-10-16). Gate P6.3 wants no IP stored *by us* | none by us for the host's copy; Vercel's retention rules | unknown (counsel). Open question for counsel: whether an IP in a platform log is personal data for a visitor who says they are under 13 (gate 9.1) | live. Owner: platform-engineer. Not in the learner's export or deletion |
| D7a | Function memory: the in-memory rate limiter holds `ip:<ip>` and `email:<email>` keys, unhashed (review F-c, M6); the library's own limiter also holds IPs in memory | abuse limiting, 5 per minute | memory of one function instance, lost on recycle | our code on Vercel | seconds to hours (evicted above 10,000 entries, or when the instance dies) | instance recycle | unknown (counsel) | designed. Never logged. Owner: backend-engineer. Fix: hash the keys (M6) |

## 3. The accounts database (EDD-008, migration `001_accounts.up.sql`, branch `accounts` at `2f5c500`)

Hosting: Neon Postgres, `aws-eu-central-1` Frankfurt, via the Vercel Marketplace. Two projects: `first-light` is the **test** database (staff addresses and fake data only); the **Production project does not exist yet** and must be a separate project in Frankfurt, created at go-live (principal C8, my G4). Nothing below holds a real learner until G1 to G6 hold. Processor for every row in this section: **Neon (storage), Vercel (the functions that read and write it).** DPA: **unknown, not reviewed** (counsel, F-25). Legal basis: **unknown (counsel, F-25)** for every row; the working description is "needed to run the account the learner asked for". Owner: backend-engineer unless named. Deletion path "account deletion" means `POST /api/account/delete` (EDD-008 §7, one transaction, learner-facing, at most 3 taps), tested by `tools/db-deletion-check.mjs`.

**Every column of migration 001 is listed. Columns "forced empty" hold no data by `CHECK`, and are listed because the library requires them.**

### 3.1 `auth_user` (11 columns)

| # | Column | In gate 2.2 | Purpose | Retention | Deletion path | Notes |
|---|---|---|---|---|---|---|
| D8.1 | `id` (random text) | yes | key | with the account | account deletion | the old id is never reused |
| D8.2 | `email` (≤ 254, unique, also unique on `lower(email)`) | yes | sign-in, recovery, the one account-status notice if the founder allows it (O4) | with the account; **24 months** with no activity then deleted (**the idle purge is off** in release 1; first possible about 2028-12) | account deletion; the copy in Resend and Vercel logs is **not** reached (D14, D7) | the only direct identifier we hold |
| D8.3 | `email_verified` | **no, library** | library model; true after a magic link | with the account | account deletion | ruled pass (Q2) |
| D8.4 | `name` (`CHECK = ''`) | **no, library** | none: forced empty | with the account | account deletion | always `""`. **But** the same field can appear in D9's `value` for up to the purge delay (M1 open) |
| D8.5 | `image` (`CHECK IS NULL`) | **no, library** | none: forced empty | with the account | account deletion | always NULL |
| D8.6 | `age_band` (`13-15` or `16+`) | yes | which mode applies | with the account | account deletion | self-declared; the birth year is never stored. `under-13` is never stored (no account) |
| D8.7 | `policy_version` (≤ 32) | yes | proof of what was agreed | with the account | account deletion | to be checked against published versions (M6) |
| D8.8 | `policy_accepted_at` | yes | as above | with the account | account deletion | |
| D8.9 | `last_sign_in_at` | yes | retention clock | with the account | account deletion | **wrong clock for active learners** (M2): must become the latest of this and the newest session `updated_at` before any idle purge runs |
| D8.10 | `created_at` | yes | | with the account | account deletion | |
| D8.11 | `updated_at` | **no, library** | library model | with the account | account deletion | ruled pass |

### 3.2 `auth_session` (8 columns)

| # | Column | Purpose | Retention | Notes |
|---|---|---|---|---|
| D9.1 | `id` | key | until sign-out or expiry (30 days, sliding by use) | expired rows purged only inside `start` (M3: "daily" is not true as built) |
| D9.2 | `token` (stored in plain form) | the session secret | as above | database access equals session access (principal engineer's and Neon access control's problem) |
| D9.3 | `user_id` | link | as above | |
| D9.4 | `expires_at` | | as above | |
| D9.5 | `created_at` | sign-in time; appears in the export as a session list | as above | |
| D9.6 | `updated_at` | slides forward on use; part of the idle clock after M2 | as above | |
| D9.7 | `ip_address` (`CHECK coalesce = ''`) | **forbidden (P1.1)**: forced empty by a hook and by `CHECK` | n/a, always empty | |
| D9.8 | `user_agent` (`CHECK coalesce = ''`) | **forbidden (P1.1)**: same | n/a, always empty | |

Deletion path for D9: sign-out, expiry, account deletion.

### 3.3 `auth_account` (13 columns), expected **0 rows**

`id`, `account_id`, `provider_id`, `user_id`, `access_token`, `refresh_token`, `id_token`, `access_token_expires_at`, `refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at` (D10.1 to D10.13). Purpose: the library's link to a sign-in method; a magic link writes none (test 17). `access_token`, `refresh_token`, `id_token` and `password` are forced NULL by one `CHECK`. Retention: with the account, expected nothing to retain. Deletion: account deletion. **A non-zero count at readiness or go-live is a stop** (my G4).

### 3.4 `auth_verification` (6 columns): holds an email of a person with **no account yet**

| # | Column | Purpose | Retention | Notes |
|---|---|---|---|---|
| D11.1 | `id` | key | link expiry (300 s), **in practice until the next sign-in request purges it** (M3) | |
| D11.2 | `identifier` (hash of the link token, `storeToken: hashed`) | match the click | as above | |
| D11.3 | `value` (JSON `{email, name:""}`) | the email waiting for its click | as above | **holds an email for a person who may never create an account.** `name` is not yet blocked at the database (M1) |
| D11.4 | `expires_at` | | as above | |
| D11.5 | `created_at` | | as above | |
| D11.6 | `updated_at` | | as above | |

Deletion path: consumed on click; purge; account deletion removes pending rows matching the account's email (§7). **For a person who never signs up there is no learner-facing deletion path**, only the purge. Gap, section 8.

### 3.5 `signup_intent` (5 columns), no email, no user id

`token_hash`, `age_band`, `policy_version`, `created_at`, `expires_at` (D12a.1 to D12a.5). Purpose: carry the band from the age screen to account creation. Retention: 300 s, `CHECK` cap 10 minutes, deleted on use, purged in `start` (M3). Deletion: on use or purge. Cannot be tied to a person.

### 3.6 `progress` (4 columns) and `recall` (4 columns)

| # | Column | Purpose | Retention | Deletion |
|---|---|---|---|---|
| D12.1 | `progress.user_id` | owner | with the account | account deletion (FK cascade is the backstop) |
| D12.2 | `progress.slug` (1 to 200) | which lesson | as above | as above |
| D12.3 | `progress.completed_at_ms` | spaced revisits across devices | as above | as above |
| D12.4 | `progress.predicted_correctly` | as above | as above | as above |
| D13.1 | `recall.user_id` | owner | as above | as above |
| D13.2 | `recall.slug` | which lesson | as above | as above |
| D13.3 | `recall.at_ms` | when the recall was answered | as above | as above |
| D13.4 | `recall.correct` | the result | as above | as above |

**Aggregate purpose (EDD-008 Q5), the one new purpose these tables carry:** "measure, in aggregate, whether spaced revisits work" (the revisit recall rate, correct over total by interval). Conditional ruling in my review: the output carries no `user_id` or email, cells with fewer than 20 learners are suppressed (proposal; the analytics steward may argue another number with a reason), no analyst receives raw `recall` rows, and **the query text comes back to me before it runs on real data**. Not yet running; no query exists. The policy must name this purpose.

`settings` (`personalization_on`, `subjects[]`, `less_of[]`) is **not in migration 001**. It ships with F-19 with its own schema diff and review. Nothing is stored for it today.

### 3.7 `deleted_account` (2 columns) and `schema_migrations`

| # | Column | Purpose | Retention | Deletion |
|---|---|---|---|---|
| D14a.1 | `deleted_account.user_id` (random, never reused) | re-apply deletions after a point-in-time restore | 35 days, then purged (request-driven purge, so it can only live longer, which is safe, my Q2) | purge |
| D14a.2 | `deleted_account.deleted_at` | the purge clock | 35 days | purge |
| D14a.3 | `schema_migrations.version`, `.applied_at` (created by `tools/db-migrate.mjs`, not by 001) | migration bookkeeping | indefinite | n/a. No learner data |

### 3.8 The database's own copies

| # | Datum | Retention | Notes |
|---|---|---|---|
| D14b | Neon point-in-time history (the only backup) | plan-dependent: Free 6 h, Launch up to 7 days, Scale up to 30 days (Neon plans page, read 2026-10-15 by backend-engineer; **I did not re-read it**). Gate P1.4 ceiling is **35 days** and the policy must state the number | deletion rolls off with the window; the tombstone (D14a) replays deletions after a restore |
| D14c | Restore-drill dumps | same day, then deleted | no other dumps exist (EDD-008 §9) |
| D14d | Neon branches | production: default branch only; preview: schema only, fake data | R-b: a Preview or Development variable pointed at the Production project would break this (my G4) |

### 3.9 `lesson_like` and `lesson_save` (migration `002_likes_saves.up.sql`; added 2026-10-18; PRD-005 ruling C5.5, C6.1)

Same three columns in each table, primary key `(user_id, slug)`, `user_id` a foreign key to `auth_user` with `ON DELETE CASCADE`. No counter column, no soft delete, no tombstone, no IP, device or band. Read against the migration on 2026-10-18; any further column is a block (C6.1). Both tables are behind `LIKES_SAVES_ENABLED` (default off); `lesson_like` is written for `16+` accounts only (server-enforced, C4.1).

| # | Column | Table | Purpose | Retention | Deletion path | Notes |
|---|---|---|---|---|---|---|
| D21.1 | `user_id` | `lesson_like` | owner of the like | with the account | account deletion (same transaction, counted in the confirmation); unlike deletes the row; FK cascade is the backstop | never returned to another account (C1.1, C1.2) |
| D21.2 | `slug` (1 to 200, catalog slugs only) | `lesson_like` | which lesson was liked | as above | as above | the like is a fact about one learner's taste: not read by feed, personalization, revisit selection or the settings API (PRD-005 rule 2, tested) |
| D21.3 | `created_at_ms` | `lesson_like` | list order for the account's own "Liked" list | as above | as above | **not** used for the public count; the count's 24-hour rule reads `auth_user.created_at` |
| D22.1 | `user_id` | `lesson_save` | owner of the save | with the account | account deletion (same transaction, counted); unsave deletes the row; FK cascade | |
| D22.2 | `slug` | `lesson_save` | which lesson was saved | as above | as above | private to the account; no count, no public read |
| D22.3 | `created_at_ms` | `lesson_save` | list order; carries the device's `savedAt` over at the merge | as above | as above | |

**Purposes, plainly.** Save: a private list for the learner. Like: a private "Liked" list for the learner, plus one input to a **public, bucketed per-lesson label** (`10+`, `25+`, `50+`, `100+`, `250+`, `1k+`; below 10 shows nothing; exact numbers are never returned, cached or logged), computed from rows at read time, counting only accounts at least 24 hours old, and switchable off per lesson (`LIKE_COUNTS_HIDDEN`) and overall (`LIKE_COUNTS_PUBLIC`, default off). Nobody sees who liked or saved anything.

**Export:** `likes` and `saves` arrays of `{slug, at}` in the export file (P1.5). **Idle rule:** covered by the 24-month rule through the cascade (off in release 1). **Also held, derived:** the in-memory like limiter (60 writes per account per 24 hours) keeps a keyed hash of the user id in one function instance's memory, never persisted (C3.2). **Not reachable by deletion:** a response from the count endpoint already cached at the CDN (up to 10 minutes) carries a label, not an identity.

## 4. Email: Resend

| # | Datum | Purpose | Stored where | Processed by | Retention | Deletion path | Legal basis | Status |
|---|---|---|---|---|---|---|---|---|
| D15 | The recipient email address, the sign-in link (it contains the token, dead after 300 s or one use), the sender address, delivery events. One email type only (`email.ts`, grep-tested), plain text plus an HTML twin, no name, band or lesson data (P1.8) | deliver the sign-in link | **Resend's own log and servers; region unknown (possibly US)** | Resend | **unknown** (counsel, F-25; the founder reads it from the console) | **none by us: account deletion cannot reach Resend's log.** Whether Resend can delete a logged email is **unknown** | unknown (counsel). The sending of one email for a login the person requested is the working description | designed, off by default, not live. No SDK: plain HTTPS call (decision record). Open and click tracking is a **sending-domain setting** and a claim until shown off (G2). Until F-23 (own sender domain), Resend's shared sender reaches only the account owner, enough for staff testing. Owner: backend-engineer (code); founder (account and domain); counsel |
| D15a | The same address in Vercel's request log? **No by our code**: we log no email, token or body. The token does appear in the verify URL in D7 | | | | | | | |

## 5. Processors (gate P1.7 reads this table)

| Processor | Receives | Region | DPA status | Verdict |
|---|---|---|---|---|
| Vercel | every request (D7), the email and progress map in function memory, the secrets; logs (D6, D7) | functions: Frankfurt **intended, not in place** (G3); edge and logs: global, unverified | unverified, not reviewed | **fail (unknown)** |
| Neon (via the Vercel Marketplace) | every row in section 3, connection metadata, restore history | `aws-eu-central-1`, Frankfurt, **test project only; Production not created** | unverified, not reviewed; billing and contract run through Vercel, so which DPA applies is itself open | **fail (unknown)** |
| Resend | D15 | unknown | unverified, not reviewed | **fail (unknown)** |
| Better Auth | nothing: a library inside our functions, telemetry off. True only while `BETTER_AUTH_TELEMETRY` is unset in every environment (G4) | n/a | n/a | not a processor |
| Any ad network, analytics SaaS, fonts or script host | nothing: none exists. Release 1 allow-list is our own origin (gate 6.1) | n/a | n/a | n/a |

## 6. Proposed, not yet reviewed (release-1 design from the PRDs; listed so no later table appears without a row)

Both PRDs are in my queue and the full read waits for F-26 and the founder's answer on "light social" (dispatch note). These are **their authors' tables**, copied for completeness, and nothing here is a ruling.

| # | Datum | Source | What I can say now |
|---|---|---|---|
| D16 | `swap`: random `token`, `sender_user_id`, `slug`, `sender_option` (int), `created_at`, `expires_at`, `claimed`, `back_option` (nullable int), `hidden`; retention 30 days at most, account deletion, opt-out | PRD-003 §6 | It records which lesson one learner sent and what they chose: an account-to-account relationship in a table. **Not in any migration. Needs its own schema diff and my read against 5.3 and P2.3 before anything is built.** `/s/<token>` opened anonymously must write nothing (P1.2) |
| D17 | `swap_block`: `blocker_user_id`, `blocked_user_id`, `created_at`; deleted with either account | PRD-003 §6 | as D16 |
| D18 | `swap_report`: `token`, `reason` (enum), `created_at`, `state` (enum); 90 days unless preserved under the child-safety procedure | PRD-003 §6 | The preservation exception needs counsel (gate 5.3 item 7). Not in any migration |
| D19 | PRD-004 challenges | PRD-004 §8 | The PRD says no new table, column or key beyond D5. Not yet read in full |

## 7. What deletion and export cannot reach

State these in the policy, plainly. Account deletion (EDD-008 §7) removes the rows in section 3 and clears the cookie. It does **not** reach:

1. **Resend's copy** of the address and the dead link (D15). Retention unknown.
2. **Vercel's logs** of requests, including the IP and the verify URL with its token (D7), and the anonymous beacon events (D6). Retention unknown.
3. **Neon's point-in-time history**, which rolls off inside the plan window (D14b); the policy states the number (35 days is the ceiling).
4. **The learner's own device** (D1 to D5) unless they tick "also clear this device".
5. **Anything the learner exported.**

Export (EDD-008 §9) covers `auth_user` (email, band, times, policy), the session times (D9.5, D9.4) and the progress map; it excludes beacon events because none are tied to the learner, and the policy says so.

## 8. Gaps (what this inventory cannot yet say, or where the product is short)

Unknowns that I could not close, with who closes them:

1. **Vercel log retention and region** (D6, D7): E13, principal-engineer-ops (run 4, not landed). Until then the number is "unknown".
2. **Resend**: region, log retention, whether a logged email can be deleted, tracking off (G2), DPA. Founder with counsel (F-25); sender domain F-23.
3. **Legal basis for every row**: counsel (F-25). I have written working descriptions only.
4. **DPAs** for Vercel, Neon, Resend: counsel. P1.7 fails on "unknown".
5. **Neon Production project** does not exist; region unverified for production; backup window depends on the plan chosen (6 h to 30 d). Founder and backend-engineer.
6. **Whether the `fra1` pin works** (SPIKE-002 R1, G3): platform-engineer, W-1149 in round 2.
7. **The policy text does not exist** (P7.2): founder with counsel, RC1 11-13.
8. **`migration 001` is read from a branch**, not main, at `2f5c500`. M1 (a name backstop on D11.3) and M2 and M3 (idle clock, retention wording) are open. If M1 adds a `CHECK` to `auth_verification`, this file changes.

Product gaps (data we hold without a satisfying reason, owner or path):

9. **D2 `s3c:events:v1` has no reader and no owner.** Finding since 10-15. Head-of-product names an owner or the code stops writing it (gate board ask 4).
10. **D1 and D2 have no in-app deletion control.** Acceptable while they stay on the device; the account view needs "clear this device" (gate 2.4).
11. **D6 logs the whole body.** Backend-engineer fixes it before the `exp` event ships (P6.1).
12. **No deletion path for an email in D11 or D15 for a person who never made an account**, beyond the purge (D11) and nothing (D15).
13. **Idle deletion at 24 months is off**, and its clock (M2) and its one notice (my review Q3, O4) are not built or approved.
14. **The Q5 aggregate query does not exist**; it returns to me before it touches real data.
15. **D5 is proposed and unbuilt**, and its purge rule is a condition of my ruling, not code.
16. **Nothing in this file covers data an agent or a person could hold outside the product** (founder's mailbox, support requests, a lawyer's files). There is no support channel in release 1; if one is added it needs a row.

## 9. Which gate rows this file lets me read

| Row | What the inventory now supports | What stays open |
|---|---|---|
| **P1.1** minimum data set | Every column of migration 001 (read at `2f5c500`) is in sections 3.1 to 3.7 with a reason, an owner and a deletion path, and the four forbidden things (name, IP, user agent, birth date) are forced empty by `CHECK` or never stored. **I can now run the schema-diff check.** Result still **conditional**, not pass: M1 (name in D11.3), and any later migration changes the file | M1; the re-read after every schema diff |
| **P7.2** policy matches the inventory | The inventory is the thing the policy is read against; sections 5, 7 and 8 list what the text must say | **Not readable yet: there is no policy text.** Counsel's draft is due at RC1 (11-13), after F-25 is decided |
| P1.7 processors | Listed with what each receives | **fails** on "unknown" (DPAs) |
| P1.6 retention | One retention per table, and the honest ones for D6, D7, D15 are "unknown" | M2, M3 and E13 |
| P6.3 beacon retention | Stated as a target; **no persistence exists yet** | W-706 design |

## 10. Status delta, 2026-10-18 (rebuild merged as 29a75310d; re-read in `company/reviews/_privacy/2026-10-18-accounts-rebuild-reread.md`)

The rows above were read at `2f5c500`. Migration 001 was re-read at the rebuild and has the same columns. Where these lines disagree with an earlier row, **these win**:
- D8.4 and D11.3 (M1): the `auth_verification_no_name` CHECK and a `verification.create/update.before` hook are in migration 001 and `auth.ts`. `name` is blocked at the database.
- D7a (M6): limiter keys are HMAC-SHA-256 under an in-memory random key; no raw IP or email is held. The Better Auth library's own limiter still holds IPs in memory.
- D8.9, D9.6 (M2): the idle clock is `greatest(last_sign_in_at, newest auth_session.updated_at)`; `last_sign_in_at` moves on sign-in and on each session refresh. The export names it `lastActiveAt`. The idle purge has no caller.
- D9.1, D11.1, D12a (M3): expired rows are removed at the next `POST /api/account/start`; the wording is now honest; `tools/db-deletion-check.mjs --oldest-expired` reports what waits (cadence: readiness A-15).
- D3: `s3c:ageband:session` is built (`AccountView.tsx`); the birth year is held in a component and discarded.
- D1: with an account, the device **pulls** the account map once per page load and **pushes** one-slug deltas; the device's earlier history goes up only through "Keep my history". See the re-read for two defects in what a delta carries (preview conditions P-1, P-2).
- D7 (P1.2): every page load asks `GET /api/account/me`; with accounts off it answers a 404 that may be cached 5 minutes.
- Section 7 gains: a like or save row is deleted with the account; a cached count label (up to 10 minutes) holds no identity.
- Section 8 gap 8 closes for 001 (read on the merge); migration 002 is read.

- 2026-10-18, second delta (fix commit beb83bfd4, merged de5ff7013): D1 now **pushes only the change an update made** (P-1 closed). D23 added above. Third delta (98aa6092f): the D23 tag now travels in one same-origin header to five write routes (PC10); rotation wording corrected (D23). Sign-out restores the device's own D1 and removes the pulled account copy (W-1710 ruled). **D2** (`s3c:events:v1`) is not restored at sign-out: events played while signed in stay until "Also clear this device"; nothing reads D2, so this is the same open finding (section 8), now with a shared-device reason to stop writing it.

— Elif, 2026-10-16, delta 2026-10-18. Next re-read: when the preview runs (deletion check, A-9) and when E13 lands.
